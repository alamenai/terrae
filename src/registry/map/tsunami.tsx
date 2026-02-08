"use client"

import { useEffect, useId, useMemo, useRef, useState } from "react"
import { useMap } from "./hooks"
import type { MapCoordinates } from "./types"

type FoamParticle = {
  positionX: number
  positionY: number
  radius: number
  opacity: number
  velocityX: number
  velocityY: number
  life: number
  maxLife: number
}

type DebrisParticle = {
  positionX: number
  positionY: number
  size: number
  rotation: number
  rotationSpeed: number
  opacity: number
  velocityX: number
  velocityY: number
}

type RgbColor = {
  red: number
  green: number
  blue: number
}

type TsunamiPhase = "approaching" | "crashing" | "receding" | "idle"

type TsunamiRenderer = {
  width: number
  height: number
  data: Uint8ClampedArray
  context?: CanvasRenderingContext2D
  foamParticles: FoamParticle[]
  debrisParticles: DebrisParticle[]
  isActive: boolean
  startTime: number
  waveProgress: number
  phase: TsunamiPhase
  restartTimerId: number
  onAdd: () => void
  render: () => boolean
  start: () => void
  stop: () => void
  reset: () => void
}

type TsunamiControl = {
  start: () => void
  stop: () => void
  reset: () => void
  isActive: boolean
  progress: number
  phase: TsunamiPhase
}

type MapTsunamiProps = {
  id?: string
  origin: MapCoordinates
  target: MapCoordinates
  size?: number
  waveHeight?: number
  waveWidth?: number
  speed?: number
  waterColor?: string
  foamColor?: string
  particleCount?: number
  autoStart?: boolean
  loop?: boolean
  loopDelay?: number
}

const DEFAULT_SIZE = 300
const DEFAULT_WAVE_HEIGHT = 0.4
const DEFAULT_WAVE_WIDTH = 0.8
const DEFAULT_SPEED = 3000
const DEFAULT_WATER_COLOR = "#0077be"
const DEFAULT_FOAM_COLOR = "#ffffff"
const DEFAULT_PARTICLE_COUNT = 40
const DEFAULT_LOOP_DELAY = 2000

const PARTICLE_SPREAD_ANGLE = 60
const DEGREES_TO_RADIANS = Math.PI / 180
const HALF_CIRCLE_DEGREES = 180
const FULL_CIRCLE_DEGREES = 360
const CRASH_DURATION_MULTIPLIER = 0.5
const WAVE_START_DISTANCE = 0.45
const CRASH_OFFSET = 0.1
const TRAIL_LENGTH = 0.5
const TRAIL_WIDTH = 0.6
const FOAM_HEIGHT_RATIO = 0.8
const WAVE_SEGMENTS = 20
const FOAM_PARTICLE_MIN_RADIUS = 3
const FOAM_PARTICLE_MAX_RADIUS = 8
const FOAM_MIN_OPACITY = 0.6
const FOAM_MAX_OPACITY = 0.4
const FOAM_MIN_LIFE = 30
const FOAM_MAX_LIFE = 30
const DEBRIS_MIN_SIZE = 2
const DEBRIS_MAX_SIZE = 4
const DEBRIS_MIN_OPACITY = 0.4
const DEBRIS_MAX_OPACITY = 0.3
const DEBRIS_COLOR = "101, 67, 33"
const GRAVITY = 0.1
const DEBRIS_GRAVITY = 0.15
const FRICTION = 0.98
const DEBRIS_FRICTION = 0.97
const OPACITY_DECAY = 0.98
const MIN_VISIBLE_OPACITY = 0.05
const PIXEL_RATIO = 2
const CONTROL_UPDATE_INTERVAL = 100

const hexToRgb = (hex: string): RgbColor => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  if (!result) {
    return { red: 0, green: 119, blue: 190 }
  }

  return {
    red: parseInt(result[1], 16),
    green: parseInt(result[2], 16),
    blue: parseInt(result[3], 16),
  }
}

const calculateDirection = (origin: MapCoordinates, target: MapCoordinates): number => {
  const deltaLongitude = target[0] - origin[0]
  const deltaLatitude = target[1] - origin[1]
  const radians = Math.atan2(deltaLongitude, deltaLatitude)
  const degrees = radians / DEGREES_TO_RADIANS

  return (degrees + FULL_CIRCLE_DEGREES) % FULL_CIRCLE_DEGREES
}

const calculateMidpoint = (origin: MapCoordinates, target: MapCoordinates): MapCoordinates => {
  return [(origin[0] + target[0]) / 2, (origin[1] + target[1]) / 2]
}

const createFoamParticle = (originX: number, originY: number, direction: number): FoamParticle => {
  const spread = (Math.random() - 0.5) * PARTICLE_SPREAD_ANGLE
  const radians = (direction + HALF_CIRCLE_DEGREES) * DEGREES_TO_RADIANS
  const perpendicularAngle = radians + Math.PI / 2

  return {
    positionX: originX + spread * Math.cos(perpendicularAngle),
    positionY: originY + spread * Math.sin(perpendicularAngle),
    radius: FOAM_PARTICLE_MIN_RADIUS + Math.random() * FOAM_PARTICLE_MAX_RADIUS,
    opacity: FOAM_MIN_OPACITY + Math.random() * FOAM_MAX_OPACITY,
    velocityX: Math.cos(radians) * (2 + Math.random() * 4) + (Math.random() - 0.5) * 2,
    velocityY: Math.sin(radians) * (2 + Math.random() * 4) - Math.random() * 3,
    life: 0,
    maxLife: FOAM_MIN_LIFE + Math.random() * FOAM_MAX_LIFE,
  }
}

const createDebrisParticle = (originX: number, originY: number, direction: number): DebrisParticle => {
  const radians = (direction + HALF_CIRCLE_DEGREES) * DEGREES_TO_RADIANS

  return {
    positionX: originX,
    positionY: originY,
    size: DEBRIS_MIN_SIZE + Math.random() * DEBRIS_MAX_SIZE,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.3,
    opacity: DEBRIS_MIN_OPACITY + Math.random() * DEBRIS_MAX_OPACITY,
    velocityX: Math.cos(radians) * (1 + Math.random() * 3),
    velocityY: Math.sin(radians) * (1 + Math.random() * 3) - Math.random() * 2,
  }
}

const renderWaterTrail = (
  context: CanvasRenderingContext2D,
  waveX: number,
  waveY: number,
  radians: number,
  size: number,
  waveWidthPx: number,
  easeProgress: number,
  waterRgb: RgbColor
): void => {
  const perpendicularX = Math.cos(radians + Math.PI / 2)
  const perpendicularY = Math.sin(radians + Math.PI / 2)

  const trailGradient = context.createLinearGradient(
    waveX - Math.cos(radians) * size * TRAIL_LENGTH,
    waveY - Math.sin(radians) * size * TRAIL_LENGTH,
    waveX,
    waveY
  )
  trailGradient.addColorStop(0, `rgba(${waterRgb.red}, ${waterRgb.green}, ${waterRgb.blue}, 0)`)
  trailGradient.addColorStop(0.5, `rgba(${waterRgb.red}, ${waterRgb.green}, ${waterRgb.blue}, ${0.3 * easeProgress})`)
  trailGradient.addColorStop(1, `rgba(${waterRgb.red}, ${waterRgb.green}, ${waterRgb.blue}, ${0.5 * easeProgress})`)

  context.beginPath()
  context.moveTo(
    waveX - Math.cos(radians) * size * TRAIL_LENGTH + perpendicularX * waveWidthPx * TRAIL_WIDTH,
    waveY - Math.sin(radians) * size * TRAIL_LENGTH + perpendicularY * waveWidthPx * TRAIL_WIDTH
  )
  context.lineTo(waveX + perpendicularX * waveWidthPx * 0.5, waveY + perpendicularY * waveWidthPx * 0.5)
  context.lineTo(waveX - perpendicularX * waveWidthPx * 0.5, waveY - perpendicularY * waveWidthPx * 0.5)
  context.lineTo(
    waveX - Math.cos(radians) * size * TRAIL_LENGTH - perpendicularX * waveWidthPx * TRAIL_WIDTH,
    waveY - Math.sin(radians) * size * TRAIL_LENGTH - perpendicularY * waveWidthPx * TRAIL_WIDTH
  )
  context.closePath()
  context.fillStyle = trailGradient
  context.fill()
}

const renderWaveBody = (
  context: CanvasRenderingContext2D,
  waveX: number,
  waveY: number,
  radians: number,
  waveWidthPx: number,
  currentHeight: number,
  easeProgress: number,
  waterRgb: RgbColor
): void => {
  const perpendicularX = Math.cos(radians + Math.PI / 2)
  const perpendicularY = Math.sin(radians + Math.PI / 2)
  const time = performance.now() * 0.003
  const points: { pointX: number; pointY: number }[] = []

  for (let segmentIndex = 0; segmentIndex <= WAVE_SEGMENTS; segmentIndex++) {
    const normalizedPosition = segmentIndex / WAVE_SEGMENTS - 0.5
    const baseX = waveX + perpendicularX * waveWidthPx * normalizedPosition
    const baseY = waveY + perpendicularY * waveWidthPx * normalizedPosition

    const waveOffset = Math.sin(normalizedPosition * Math.PI * 3 + time) * 5 * easeProgress
    const heightVariation = Math.cos(normalizedPosition * Math.PI) * 0.3 + 0.7

    points.push({
      pointX: baseX + Math.cos(radians) * (currentHeight * heightVariation + waveOffset),
      pointY: baseY + Math.sin(radians) * (currentHeight * heightVariation + waveOffset),
    })
  }

  context.beginPath()
  context.moveTo(waveX + perpendicularX * waveWidthPx * -0.5, waveY + perpendicularY * waveWidthPx * -0.5)

  for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
    if (pointIndex === 0) {
      context.lineTo(points[pointIndex].pointX, points[pointIndex].pointY)
    } else {
      const previousPoint = points[pointIndex - 1]
      const currentPoint = points[pointIndex]
      const controlPointX = (previousPoint.pointX + currentPoint.pointX) / 2
      const controlPointY = (previousPoint.pointY + currentPoint.pointY) / 2
      context.quadraticCurveTo(previousPoint.pointX, previousPoint.pointY, controlPointX, controlPointY)
    }
  }

  context.lineTo(waveX + perpendicularX * waveWidthPx * 0.5, waveY + perpendicularY * waveWidthPx * 0.5)
  context.closePath()

  const waveGradient = context.createLinearGradient(
    waveX - Math.cos(radians) * currentHeight,
    waveY - Math.sin(radians) * currentHeight,
    waveX + Math.cos(radians) * currentHeight,
    waveY + Math.sin(radians) * currentHeight
  )
  const lighterRed = Math.min(255, waterRgb.red + 40)
  const lighterGreen = Math.min(255, waterRgb.green + 40)
  const lighterBlue = Math.min(255, waterRgb.blue + 40)
  const darkerRed = Math.max(0, waterRgb.red - 20)
  const darkerGreen = Math.max(0, waterRgb.green - 20)

  waveGradient.addColorStop(0, `rgba(${lighterRed}, ${lighterGreen}, ${lighterBlue}, ${0.9 * easeProgress})`)
  waveGradient.addColorStop(0.4, `rgba(${waterRgb.red}, ${waterRgb.green}, ${waterRgb.blue}, ${0.85 * easeProgress})`)
  waveGradient.addColorStop(1, `rgba(${darkerRed}, ${darkerGreen}, ${waterRgb.blue}, ${0.7 * easeProgress})`)

  context.fillStyle = waveGradient
  context.fill()
}

const renderFoamCrest = (
  context: CanvasRenderingContext2D,
  waveX: number,
  waveY: number,
  radians: number,
  waveWidthPx: number,
  currentHeight: number,
  easeProgress: number,
  foamRgb: RgbColor
): void => {
  const perpendicularX = Math.cos(radians + Math.PI / 2)
  const perpendicularY = Math.sin(radians + Math.PI / 2)
  const time = performance.now() * 0.003
  const foamOffsetY = currentHeight * FOAM_HEIGHT_RATIO

  for (let foamIndex = 0; foamIndex <= WAVE_SEGMENTS; foamIndex++) {
    const normalizedPosition = foamIndex / WAVE_SEGMENTS - 0.5
    const baseX = waveX + perpendicularX * waveWidthPx * normalizedPosition
    const baseY = waveY + perpendicularY * waveWidthPx * normalizedPosition
    const foamX = baseX + Math.cos(radians) * foamOffsetY
    const foamY = baseY + Math.sin(radians) * foamOffsetY

    const foamSize = (8 + Math.sin(normalizedPosition * 10 + time * 2) * 3) * easeProgress
    const foamOpacity = (0.7 + Math.sin(normalizedPosition * 8 + time * 3) * 0.3) * easeProgress

    const foamGradient = context.createRadialGradient(foamX, foamY, 0, foamX, foamY, foamSize)
    foamGradient.addColorStop(0, `rgba(${foamRgb.red}, ${foamRgb.green}, ${foamRgb.blue}, ${foamOpacity})`)
    foamGradient.addColorStop(0.5, `rgba(${foamRgb.red}, ${foamRgb.green}, ${foamRgb.blue}, ${foamOpacity * 0.5})`)
    foamGradient.addColorStop(1, `rgba(${foamRgb.red}, ${foamRgb.green}, ${foamRgb.blue}, 0)`)

    context.beginPath()
    context.arc(foamX, foamY, foamSize, 0, Math.PI * 2)
    context.fillStyle = foamGradient
    context.fill()
  }
}

const updateAndRenderFoamParticles = (
  context: CanvasRenderingContext2D,
  particles: FoamParticle[],
  foamRgb: RgbColor
): void => {
  for (let particleIndex = particles.length - 1; particleIndex >= 0; particleIndex--) {
    const particle = particles[particleIndex]
    particle.positionX += particle.velocityX
    particle.positionY += particle.velocityY
    particle.velocityY += GRAVITY
    particle.velocityX *= FRICTION
    particle.life++

    if (particle.life >= particle.maxLife) {
      particles.splice(particleIndex, 1)
      continue
    }

    const lifeRatio = particle.life / particle.maxLife
    const alpha = particle.opacity * (1 - lifeRatio)
    const currentRadius = particle.radius * (1 - lifeRatio * 0.5)

    const gradient = context.createRadialGradient(
      particle.positionX,
      particle.positionY,
      0,
      particle.positionX,
      particle.positionY,
      currentRadius
    )
    gradient.addColorStop(0, `rgba(${foamRgb.red}, ${foamRgb.green}, ${foamRgb.blue}, ${alpha})`)
    gradient.addColorStop(1, `rgba(${foamRgb.red}, ${foamRgb.green}, ${foamRgb.blue}, 0)`)

    context.beginPath()
    context.arc(particle.positionX, particle.positionY, currentRadius, 0, Math.PI * 2)
    context.fillStyle = gradient
    context.fill()
  }
}

const updateAndRenderDebrisParticles = (context: CanvasRenderingContext2D, particles: DebrisParticle[]): void => {
  for (let debrisIndex = particles.length - 1; debrisIndex >= 0; debrisIndex--) {
    const particle = particles[debrisIndex]
    particle.positionX += particle.velocityX
    particle.positionY += particle.velocityY
    particle.velocityY += DEBRIS_GRAVITY
    particle.velocityX *= DEBRIS_FRICTION
    particle.rotation += particle.rotationSpeed
    particle.opacity *= OPACITY_DECAY

    if (particle.opacity < MIN_VISIBLE_OPACITY) {
      particles.splice(debrisIndex, 1)
      continue
    }

    context.save()
    context.translate(particle.positionX, particle.positionY)
    context.rotate(particle.rotation)
    context.fillStyle = `rgba(${DEBRIS_COLOR}, ${particle.opacity})`
    context.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)
    context.restore()
  }
}

const fadeCanvasEdges = (context: CanvasRenderingContext2D, width: number, height: number) => {
  const edgeSize = Math.max(4, Math.floor(width * 0.06))
  context.globalCompositeOperation = "destination-out"

  const topGradient = context.createLinearGradient(0, 0, 0, edgeSize)
  topGradient.addColorStop(0, "rgba(0, 0, 0, 1)")
  topGradient.addColorStop(1, "rgba(0, 0, 0, 0)")
  context.fillStyle = topGradient
  context.fillRect(0, 0, width, edgeSize)

  const bottomGradient = context.createLinearGradient(0, height - edgeSize, 0, height)
  bottomGradient.addColorStop(0, "rgba(0, 0, 0, 0)")
  bottomGradient.addColorStop(1, "rgba(0, 0, 0, 1)")
  context.fillStyle = bottomGradient
  context.fillRect(0, height - edgeSize, width, edgeSize)

  const leftGradient = context.createLinearGradient(0, 0, edgeSize, 0)
  leftGradient.addColorStop(0, "rgba(0, 0, 0, 1)")
  leftGradient.addColorStop(1, "rgba(0, 0, 0, 0)")
  context.fillStyle = leftGradient
  context.fillRect(0, 0, edgeSize, height)

  const rightGradient = context.createLinearGradient(width - edgeSize, 0, width, 0)
  rightGradient.addColorStop(0, "rgba(0, 0, 0, 0)")
  rightGradient.addColorStop(1, "rgba(0, 0, 0, 1)")
  context.fillStyle = rightGradient
  context.fillRect(width - edgeSize, 0, edgeSize, height)

  context.globalCompositeOperation = "source-over"
}

const createTsunamiRenderer = (
  size: number,
  waveHeight: number,
  waveWidth: number,
  direction: number,
  speed: number,
  waterColor: string,
  foamColor: string,
  particleCount: number,
  loop: boolean,
  loopDelay: number
): TsunamiRenderer => {
  const waterRgb = hexToRgb(waterColor)
  const foamRgb = hexToRgb(foamColor)
  const centerX = size / 2
  const centerY = size / 2
  const waveHeightPx = size * waveHeight
  const waveWidthPx = size * waveWidth
  const radians = direction * DEGREES_TO_RADIANS

  const renderer: TsunamiRenderer = {
    width: size,
    height: size,
    data: new Uint8ClampedArray(size * size * 4),
    foamParticles: [],
    debrisParticles: [],
    isActive: false,
    startTime: 0,
    waveProgress: 0,
    phase: "idle",
    restartTimerId: 0,

    onAdd() {
      const canvas = document.createElement("canvas")
      canvas.width = this.width
      canvas.height = this.height
      this.context = canvas.getContext("2d", { willReadFrequently: true }) || undefined
    },

    start() {
      if (this.isActive && this.phase !== "idle") {
        return
      }

      this.isActive = true
      this.startTime = performance.now()
      this.waveProgress = 0
      this.phase = "approaching"
      this.foamParticles = []
      this.debrisParticles = []
    },

    stop() {
      this.isActive = false
      this.phase = "idle"
      clearTimeout(this.restartTimerId)
    },

    reset() {
      this.isActive = false
      this.waveProgress = 0
      this.phase = "idle"
      this.foamParticles = []
      this.debrisParticles = []
      this.startTime = 0
      clearTimeout(this.restartTimerId)
    },

    render() {
      if (!this.context) {
        return false
      }

      this.context.clearRect(0, 0, this.width, this.height)

      if (!this.isActive && this.phase === "idle") {
        this.data = this.context.getImageData(0, 0, this.width, this.height).data
        return true
      }

      const elapsed = performance.now() - this.startTime

      if (this.phase === "approaching") {
        this.waveProgress = Math.min(elapsed / speed, 1)
        if (this.waveProgress >= 1) {
          this.phase = "crashing"
          this.startTime = performance.now()

          const crashX = centerX + Math.cos(radians) * (size * CRASH_OFFSET)
          const crashY = centerY + Math.sin(radians) * (size * CRASH_OFFSET)

          for (let index = 0; index < particleCount; index++) {
            this.foamParticles.push(createFoamParticle(crashX, crashY, direction))
          }
          for (let index = 0; index < particleCount / 3; index++) {
            this.debrisParticles.push(createDebrisParticle(crashX, crashY, direction))
          }
        }
      } else if (this.phase === "crashing") {
        const crashDuration = speed * CRASH_DURATION_MULTIPLIER
        const crashProgress = Math.min((performance.now() - this.startTime) / crashDuration, 1)
        if (crashProgress >= 1) {
          this.phase = "receding"
          this.startTime = performance.now()
        }
      } else if (this.phase === "receding") {
        const recedeDuration = speed
        const recedeProgress = Math.min((performance.now() - this.startTime) / recedeDuration, 1)
        this.waveProgress = 1 - recedeProgress

        if (recedeProgress >= 1) {
          if (loop) {
            this.phase = "idle"
            this.startTime = performance.now()
            this.restartTimerId = window.setTimeout(() => {
              if (this.isActive) {
                this.start()
              }
            }, loopDelay)
          } else {
            this.phase = "idle"
            this.isActive = false
          }
        }
      }

      if (this.phase !== "idle" && this.waveProgress > 0) {
        const easeProgress = 1 - Math.pow(1 - this.waveProgress, 3)
        const startDistance = size * WAVE_START_DISTANCE
        const waveDistance = startDistance * (1 - easeProgress)

        const waveX = centerX - Math.cos(radians) * waveDistance
        const waveY = centerY - Math.sin(radians) * waveDistance

        this.context.save()

        renderWaterTrail(this.context, waveX, waveY, radians, size, waveWidthPx, easeProgress, waterRgb)

        const heightMultiplier = this.phase === "crashing" ? 0.7 : 1
        const currentHeight = waveHeightPx * easeProgress * heightMultiplier

        renderWaveBody(this.context, waveX, waveY, radians, waveWidthPx, currentHeight, easeProgress, waterRgb)
        renderFoamCrest(this.context, waveX, waveY, radians, waveWidthPx, currentHeight, easeProgress, foamRgb)

        this.context.restore()
      }

      updateAndRenderFoamParticles(this.context, this.foamParticles, foamRgb)
      updateAndRenderDebrisParticles(this.context, this.debrisParticles)

      fadeCanvasEdges(this.context, this.width, this.height)
      this.data = this.context.getImageData(0, 0, this.width, this.height).data

      return true
    },
  }

  return renderer
}

const tsunamiControls = new Map<string, TsunamiControl>()

export const MapTsunami = ({
  id,
  origin,
  target,
  size = DEFAULT_SIZE,
  waveHeight = DEFAULT_WAVE_HEIGHT,
  waveWidth = DEFAULT_WAVE_WIDTH,
  speed = DEFAULT_SPEED,
  waterColor = DEFAULT_WATER_COLOR,
  foamColor = DEFAULT_FOAM_COLOR,
  particleCount = DEFAULT_PARTICLE_COUNT,
  autoStart = true,
  loop = false,
  loopDelay = DEFAULT_LOOP_DELAY,
}: MapTsunamiProps) => {
  const { map, isLoaded } = useMap()
  const animationFrameRef = useRef<number | null>(null)
  const rendererRef = useRef<TsunamiRenderer | null>(null)
  const autoId = useId()
  const controlId = id ?? autoId

  const direction = calculateDirection(origin, target)
  const canvasCenter = useMemo(() => {
    return calculateMidpoint(origin, target)
  }, [origin, target])
  const sourceId = `${controlId}-source`
  const layerId = `${controlId}-layer`

  const startAnimation = () => {
    if (rendererRef.current) {
      rendererRef.current.start()
    }
  }

  const stopAnimation = () => {
    if (rendererRef.current) {
      rendererRef.current.stop()
    }
  }

  const resetAnimation = () => {
    if (rendererRef.current) {
      rendererRef.current.reset()
    }
  }

  useEffect(() => {
    if (!isLoaded || !map) {
      return
    }

    const tsunamiRenderer = createTsunamiRenderer(
      size,
      waveHeight,
      waveWidth,
      direction,
      speed,
      waterColor,
      foamColor,
      particleCount,
      loop,
      loopDelay
    )
    rendererRef.current = tsunamiRenderer

    const control: TsunamiControl = {
      start: startAnimation,
      stop: stopAnimation,
      reset: resetAnimation,
      get isActive() {
        return rendererRef.current?.isActive || false
      },
      get progress() {
        return rendererRef.current?.waveProgress || 0
      },
      get phase() {
        return rendererRef.current?.phase || "idle"
      },
    }
    tsunamiControls.set(controlId, control)

    if (!map.hasImage(controlId)) {
      map.addImage(controlId, tsunamiRenderer, { pixelRatio: PIXEL_RATIO })
    }

    if (autoStart) {
      tsunamiRenderer.start()
    }

    const animate = () => {
      map.triggerRepaint()
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    animationFrameRef.current = requestAnimationFrame(animate)

    const handleStyleLoad = () => {
      if (!map.hasImage(controlId)) {
        map.addImage(controlId, tsunamiRenderer, { pixelRatio: PIXEL_RATIO })
      }
    }

    map.on("style.load", handleStyleLoad)

    return () => {
      map.off("style.load", handleStyleLoad)
      tsunamiControls.delete(controlId)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (rendererRef.current) {
        clearTimeout(rendererRef.current.restartTimerId)
      }
      try {
        if (map.hasImage(controlId)) {
          map.removeImage(controlId)
        }
      } catch {
        // Map may already be destroyed during unmount
      }
    }
  }, [
    map,
    isLoaded,
    controlId,
    size,
    waveHeight,
    waveWidth,
    direction,
    speed,
    waterColor,
    foamColor,
    particleCount,
    autoStart,
    loop,
    loopDelay,
  ])

  useEffect(() => {
    if (!isLoaded || !map) {
      return
    }

    let pollFrameId: number

    const addSourceAndLayer = () => {
      if (!map.isStyleLoaded() || !map.hasImage(controlId)) {
        pollFrameId = requestAnimationFrame(addSourceAndLayer)
        return
      }

      if (!map.getSource(sourceId)) {
        map.addSource(sourceId, {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: { type: "Point", coordinates: canvasCenter },
                properties: {},
              },
            ],
          },
        })
      }

      if (!map.getLayer(layerId)) {
        map.addLayer({
          id: layerId,
          type: "symbol",
          source: sourceId,
          layout: {
            "icon-image": controlId,
            "icon-allow-overlap": true,
            "icon-pitch-alignment": "map",
            "icon-rotation-alignment": "map",
          },
        })
      }
    }

    pollFrameId = requestAnimationFrame(addSourceAndLayer)

    const handleStyleLoad = () => {
      addSourceAndLayer()
    }

    map.on("style.load", handleStyleLoad)

    return () => {
      cancelAnimationFrame(pollFrameId)
      map.off("style.load", handleStyleLoad)
      if (map.isStyleLoaded()) {
        if (map.getLayer(layerId)) {
          map.removeLayer(layerId)
        }
        if (map.getSource(sourceId)) {
          map.removeSource(sourceId)
        }
      }
    }
  }, [map, isLoaded, canvasCenter, controlId, sourceId, layerId])

  return null
}

export const useTsunamiControl = (id: string): TsunamiControl | null => {
  const [, forceUpdate] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate((previous) => {
        return previous + 1
      })
    }, CONTROL_UPDATE_INTERVAL)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return tsunamiControls.get(id) || null
}
