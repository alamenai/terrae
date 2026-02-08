"use client"

import { useEffect, useRef, useState } from "react"
import { useMap } from "./hooks"
import type { MapCoordinates } from "./types"

type TrailParticle = {
  positionX: number
  positionY: number
  radius: number
  opacity: number
  velocityX: number
  velocityY: number
  life: number
  maxLife: number
}

type ImpactParticle = {
  positionX: number
  positionY: number
  radius: number
  opacity: number
  velocityX: number
  velocityY: number
  color: string
}

type MeteorInstance = {
  startX: number
  startY: number
  currentX: number
  currentY: number
  progress: number
  trailParticles: TrailParticle[]
  delay: number
  active: boolean
}

type RgbColor = {
  red: number
  green: number
  blue: number
}

type MeteorPhase = "falling" | "impact" | "fading" | "idle"

type MeteorRenderer = {
  width: number
  height: number
  data: Uint8ClampedArray
  context?: CanvasRenderingContext2D
  meteors: MeteorInstance[]
  impactParticles: ImpactParticle[]
  isActive: boolean
  startTime: number
  progress: number
  phase: MeteorPhase
  flashOpacity: number
  restartTimerId: number
  onAdd: () => void
  render: () => boolean
  start: () => void
  stop: () => void
  reset: () => void
}

type MeteorControl = {
  start: () => void
  stop: () => void
  reset: () => void
  isActive: boolean
  progress: number
  phase: MeteorPhase
}

type MapMeteorProps = {
  id: string
  target: MapCoordinates
  size?: number
  angle?: number
  speed?: number
  intensity?: number
  meteorColor?: string
  trailColor?: string
  impactColor?: string
  tailLength?: number
  meteorSize?: number
  impactSize?: number
  autoStart?: boolean
  loop?: boolean
  loopDelay?: number
  shower?: boolean
  showerCount?: number
}

const DEFAULT_SIZE = 300
const DEFAULT_ANGLE = 45
const DEFAULT_SPEED = 2000
const DEFAULT_INTENSITY = 1
const DEFAULT_METEOR_COLOR = "#ffaa00"
const DEFAULT_TRAIL_COLOR = "#ff6600"
const DEFAULT_IMPACT_COLOR = "#ffdd00"
const DEFAULT_TAIL_LENGTH = 0.4
const DEFAULT_METEOR_SIZE = 8
const DEFAULT_IMPACT_SIZE = 0.3
const DEFAULT_LOOP_DELAY = 2000
const DEFAULT_SHOWER_COUNT = 4

const DEGREES_TO_RADIANS = Math.PI / 180
const TRAIL_SPAWN_RATE = 3
const TRAIL_MIN_RADIUS = 2
const TRAIL_MAX_RADIUS = 6
const TRAIL_MIN_LIFE = 20
const TRAIL_MAX_LIFE = 40
const TRAIL_VELOCITY_SPREAD = 0.5
const TRAIL_POSITION_SPREAD = 4
const TRAIL_VELOCITY_DAMPING = 0.1
const TRAIL_BASE_OPACITY = 0.8
const TRAIL_OPACITY_VARIANCE = 0.2
const TRAIL_GRAVITY_MULTIPLIER = 0.3
const TRAIL_LIFE_DECAY_FACTOR = 0.5
const IMPACT_PARTICLE_COUNT = 30
const IMPACT_MIN_VELOCITY = 2
const IMPACT_MAX_VELOCITY = 8
const IMPACT_MIN_RADIUS = 2
const IMPACT_MAX_RADIUS = 6
const IMPACT_COLOR_OFFSET_RED = 50
const IMPACT_COLOR_OFFSET_GREEN = 30
const IMPACT_UPWARD_BIAS = 2
const GRAVITY = 0.15
const FRICTION = 0.98
const OPACITY_DECAY = 0.96
const MIN_VISIBLE_OPACITY = 0.02
const FLASH_DURATION = 200
const FLASH_OPACITY_MULTIPLIER = 0.7
const PIXEL_RATIO = 2
const CONTROL_UPDATE_INTERVAL = 100
const SHOWER_DELAY_SPREAD = 500
const SHOWER_ANGLE_SPREAD = 30
const SHOWER_DISTANCE_SPREAD = 0.2
const VELOCITY_SCALE = 10
const START_DISTANCE_RATIO = 0.6
const TAIL_WIDTH_RATIO = 0.5
const TAIL_END_WIDTH_RATIO = 0.2
const METEOR_TIP_RATIO = 0.5
const CORE_GRADIENT_INNER_STOP = 0.3
const EASE_POWER = 2
const TRAIL_SPAWN_PROBABILITY = 0.5
const FRAME_RATE = 60
const MS_PER_SECOND = 1000

const hexToRgb = (hex: string): RgbColor => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  if (!result) {
    return { red: 255, green: 170, blue: 0 }
  }

  return {
    red: parseInt(result[1], 16),
    green: parseInt(result[2], 16),
    blue: parseInt(result[3], 16),
  }
}

const createTrailParticle = (originX: number, originY: number, velocityX: number, velocityY: number): TrailParticle => {
  return {
    positionX: originX + (Math.random() - 0.5) * TRAIL_POSITION_SPREAD,
    positionY: originY + (Math.random() - 0.5) * TRAIL_POSITION_SPREAD,
    radius: TRAIL_MIN_RADIUS + Math.random() * TRAIL_MAX_RADIUS,
    opacity: TRAIL_BASE_OPACITY + Math.random() * TRAIL_OPACITY_VARIANCE,
    velocityX: -velocityX * TRAIL_VELOCITY_DAMPING + (Math.random() - 0.5) * TRAIL_VELOCITY_SPREAD,
    velocityY: -velocityY * TRAIL_VELOCITY_DAMPING + (Math.random() - 0.5) * TRAIL_VELOCITY_SPREAD,
    life: 0,
    maxLife: TRAIL_MIN_LIFE + Math.random() * TRAIL_MAX_LIFE,
  }
}

const createImpactParticle = (originX: number, originY: number, impactRgb: RgbColor): ImpactParticle => {
  const spreadAngle = Math.random() * Math.PI * 2
  const velocity = IMPACT_MIN_VELOCITY + Math.random() * IMPACT_MAX_VELOCITY
  const useLighterColor = Math.random() > 0.5
  const particleColor = useLighterColor
    ? `${impactRgb.red}, ${impactRgb.green}, ${impactRgb.blue}`
    : `${Math.min(255, impactRgb.red + IMPACT_COLOR_OFFSET_RED)}, ${Math.min(255, impactRgb.green + IMPACT_COLOR_OFFSET_GREEN)}, ${impactRgb.blue}`

  return {
    positionX: originX,
    positionY: originY,
    radius: IMPACT_MIN_RADIUS + Math.random() * IMPACT_MAX_RADIUS,
    opacity: 1,
    velocityX: Math.cos(spreadAngle) * velocity,
    velocityY: Math.sin(spreadAngle) * velocity - Math.random() * IMPACT_UPWARD_BIAS,
    color: particleColor,
  }
}

const renderMeteorBody = (
  context: CanvasRenderingContext2D,
  meteorX: number,
  meteorY: number,
  meteorSize: number,
  velocityX: number,
  velocityY: number,
  tailLengthPx: number,
  meteorRgb: RgbColor,
  trailRgb: RgbColor
): void => {
  const velocityMagnitude = Math.sqrt(velocityX * velocityX + velocityY * velocityY)
  const normalizedVelocityX = velocityX / velocityMagnitude
  const normalizedVelocityY = velocityY / velocityMagnitude

  const tailEndX = meteorX - normalizedVelocityX * tailLengthPx
  const tailEndY = meteorY - normalizedVelocityY * tailLengthPx

  const tailGradient = context.createLinearGradient(tailEndX, tailEndY, meteorX, meteorY)
  tailGradient.addColorStop(0, `rgba(${trailRgb.red}, ${trailRgb.green}, ${trailRgb.blue}, 0)`)
  tailGradient.addColorStop(0.3, `rgba(${trailRgb.red}, ${trailRgb.green}, ${trailRgb.blue}, 0.3)`)
  tailGradient.addColorStop(0.7, `rgba(${meteorRgb.red}, ${meteorRgb.green}, ${meteorRgb.blue}, 0.7)`)
  tailGradient.addColorStop(1, `rgba(${meteorRgb.red}, ${meteorRgb.green}, ${meteorRgb.blue}, 1)`)

  context.beginPath()
  context.moveTo(tailEndX, tailEndY)

  const perpendicularX = -normalizedVelocityY
  const perpendicularY = normalizedVelocityX
  const tailWidth = meteorSize * TAIL_WIDTH_RATIO

  context.lineTo(
    tailEndX + perpendicularX * tailWidth * TAIL_END_WIDTH_RATIO,
    tailEndY + perpendicularY * tailWidth * TAIL_END_WIDTH_RATIO
  )
  context.lineTo(meteorX + perpendicularX * tailWidth, meteorY + perpendicularY * tailWidth)
  context.lineTo(
    meteorX + normalizedVelocityX * meteorSize * METEOR_TIP_RATIO,
    meteorY + normalizedVelocityY * meteorSize * METEOR_TIP_RATIO
  )
  context.lineTo(meteorX - perpendicularX * tailWidth, meteorY - perpendicularY * tailWidth)
  context.lineTo(
    tailEndX - perpendicularX * tailWidth * TAIL_END_WIDTH_RATIO,
    tailEndY - perpendicularY * tailWidth * TAIL_END_WIDTH_RATIO
  )
  context.closePath()

  context.fillStyle = tailGradient
  context.fill()

  const coreGradient = context.createRadialGradient(meteorX, meteorY, 0, meteorX, meteorY, meteorSize)
  coreGradient.addColorStop(0, `rgba(255, 255, 255, 1)`)
  coreGradient.addColorStop(
    CORE_GRADIENT_INNER_STOP,
    `rgba(${meteorRgb.red}, ${meteorRgb.green}, ${meteorRgb.blue}, 1)`
  )
  coreGradient.addColorStop(1, `rgba(${meteorRgb.red}, ${meteorRgb.green}, ${meteorRgb.blue}, 0)`)

  context.beginPath()
  context.arc(meteorX, meteorY, meteorSize, 0, Math.PI * 2)
  context.fillStyle = coreGradient
  context.fill()
}

const updateAndRenderTrailParticles = (
  context: CanvasRenderingContext2D,
  particles: TrailParticle[],
  trailRgb: RgbColor
): void => {
  for (let particleIndex = particles.length - 1; particleIndex >= 0; particleIndex--) {
    const particle = particles[particleIndex]
    particle.positionX += particle.velocityX
    particle.positionY += particle.velocityY
    particle.velocityY += GRAVITY * TRAIL_GRAVITY_MULTIPLIER
    particle.velocityX *= FRICTION
    particle.life++

    if (particle.life >= particle.maxLife) {
      particles.splice(particleIndex, 1)
      continue
    }

    const lifeRatio = particle.life / particle.maxLife
    const alpha = particle.opacity * (1 - lifeRatio)
    const currentRadius = particle.radius * (1 - lifeRatio * TRAIL_LIFE_DECAY_FACTOR)

    const gradient = context.createRadialGradient(
      particle.positionX,
      particle.positionY,
      0,
      particle.positionX,
      particle.positionY,
      currentRadius
    )
    gradient.addColorStop(0, `rgba(${trailRgb.red}, ${trailRgb.green}, ${trailRgb.blue}, ${alpha})`)
    gradient.addColorStop(1, `rgba(${trailRgb.red}, ${trailRgb.green}, ${trailRgb.blue}, 0)`)

    context.beginPath()
    context.arc(particle.positionX, particle.positionY, currentRadius, 0, Math.PI * 2)
    context.fillStyle = gradient
    context.fill()
  }
}

const updateAndRenderImpactParticles = (context: CanvasRenderingContext2D, particles: ImpactParticle[]): void => {
  for (let particleIndex = particles.length - 1; particleIndex >= 0; particleIndex--) {
    const particle = particles[particleIndex]
    particle.positionX += particle.velocityX
    particle.positionY += particle.velocityY
    particle.velocityY += GRAVITY
    particle.velocityX *= FRICTION
    particle.opacity *= OPACITY_DECAY

    if (particle.opacity < MIN_VISIBLE_OPACITY) {
      particles.splice(particleIndex, 1)
      continue
    }

    const gradient = context.createRadialGradient(
      particle.positionX,
      particle.positionY,
      0,
      particle.positionX,
      particle.positionY,
      particle.radius
    )
    gradient.addColorStop(0, `rgba(${particle.color}, ${particle.opacity})`)
    gradient.addColorStop(1, `rgba(${particle.color}, 0)`)

    context.beginPath()
    context.arc(particle.positionX, particle.positionY, particle.radius, 0, Math.PI * 2)
    context.fillStyle = gradient
    context.fill()
  }
}

const renderImpactFlash = (
  context: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  flashOpacity: number,
  impactSizePx: number,
  impactRgb: RgbColor
): void => {
  if (flashOpacity <= 0) {
    return
  }

  const flashGradient = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, impactSizePx)
  flashGradient.addColorStop(0, `rgba(255, 255, 255, ${flashOpacity})`)
  flashGradient.addColorStop(
    CORE_GRADIENT_INNER_STOP,
    `rgba(${impactRgb.red}, ${impactRgb.green}, ${impactRgb.blue}, ${flashOpacity * FLASH_OPACITY_MULTIPLIER})`
  )
  flashGradient.addColorStop(1, `rgba(${impactRgb.red}, ${impactRgb.green}, ${impactRgb.blue}, 0)`)

  context.beginPath()
  context.arc(centerX, centerY, impactSizePx, 0, Math.PI * 2)
  context.fillStyle = flashGradient
  context.fill()
}

const fadeCanvasEdges = (context: CanvasRenderingContext2D, width: number, height: number): void => {
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

const createMeteorRenderer = (
  size: number,
  angle: number,
  speed: number,
  intensity: number,
  meteorColor: string,
  trailColor: string,
  impactColor: string,
  tailLength: number,
  meteorSize: number,
  impactSize: number,
  loop: boolean,
  loopDelay: number,
  shower: boolean,
  showerCount: number
): MeteorRenderer => {
  const meteorRgb = hexToRgb(meteorColor)
  const trailRgb = hexToRgb(trailColor)
  const impactRgb = hexToRgb(impactColor)
  const centerX = size / 2
  const centerY = size / 2
  const scaledMeteorSize = meteorSize * intensity
  const scaledTailLength = tailLength * intensity
  const scaledImpactSize = impactSize * intensity
  const tailLengthPx = size * scaledTailLength
  const impactSizePx = size * scaledImpactSize
  const trailSpawnRate = Math.ceil(TRAIL_SPAWN_RATE * intensity)
  const impactParticleCount = Math.ceil(IMPACT_PARTICLE_COUNT * intensity)
  const radians = angle * DEGREES_TO_RADIANS
  const startDistance = size * START_DISTANCE_RATIO
  const directionVelocityX = Math.cos(radians) * VELOCITY_SCALE
  const directionVelocityY = Math.sin(radians) * VELOCITY_SCALE

  const createMeteorInstance = (delayMs: number, offsetAngle: number, offsetDistance: number): MeteorInstance => {
    const instanceRadians = (angle + offsetAngle) * DEGREES_TO_RADIANS
    const startX = centerX - Math.cos(instanceRadians) * (startDistance + offsetDistance)
    const startY = centerY - Math.sin(instanceRadians) * (startDistance + offsetDistance)

    return {
      startX,
      startY,
      currentX: startX,
      currentY: startY,
      progress: 0,
      trailParticles: [],
      delay: delayMs,
      active: false,
    }
  }

  const spawnTrailParticles = (meteor: MeteorInstance): void => {
    if (Math.random() < TRAIL_SPAWN_PROBABILITY) {
      for (let trailIndex = 0; trailIndex < trailSpawnRate; trailIndex++) {
        meteor.trailParticles.push(
          createTrailParticle(meteor.currentX, meteor.currentY, directionVelocityX, directionVelocityY)
        )
      }
    }
  }

  const spawnImpactParticles = (renderer: MeteorRenderer): void => {
    renderer.flashOpacity = 1
    for (let impactIndex = 0; impactIndex < impactParticleCount; impactIndex++) {
      renderer.impactParticles.push(createImpactParticle(centerX, centerY, impactRgb))
    }
  }

  const updateMeteorInstances = (
    renderer: MeteorRenderer,
    elapsed: number
  ): { allComplete: boolean; anyFalling: boolean } => {
    let allComplete = true
    let anyFalling = false

    for (const meteor of renderer.meteors) {
      if (elapsed < meteor.delay) {
        allComplete = false
        continue
      }

      const meteorElapsed = elapsed - meteor.delay

      if (!meteor.active && meteorElapsed >= 0) {
        meteor.active = true
      }

      if (!meteor.active || meteor.progress >= 1) {
        continue
      }

      meteor.progress = Math.min(meteorElapsed / speed, 1)
      allComplete = false
      anyFalling = true

      const easeProgress = 1 - Math.pow(1 - meteor.progress, EASE_POWER)
      meteor.currentX = meteor.startX + (centerX - meteor.startX) * easeProgress
      meteor.currentY = meteor.startY + (centerY - meteor.startY) * easeProgress

      spawnTrailParticles(meteor)

      if (meteor.progress >= 1) {
        spawnImpactParticles(renderer)
      }
    }

    return { allComplete, anyFalling }
  }

  const updateRendererState = (renderer: MeteorRenderer, allComplete: boolean, anyFalling: boolean): void => {
    if (anyFalling) {
      renderer.phase = "falling"
    } else if (renderer.impactParticles.length > 0 || renderer.flashOpacity > 0) {
      renderer.phase = "impact"
    }

    if (renderer.flashOpacity > 0) {
      renderer.flashOpacity -= MS_PER_SECOND / FRAME_RATE / FLASH_DURATION
      if (renderer.flashOpacity < 0) {
        renderer.flashOpacity = 0
      }
    }

    const hasActiveParticles =
      renderer.impactParticles.length > 0 || renderer.meteors.some((meteor) => meteor.trailParticles.length > 0)

    if (allComplete && !hasActiveParticles && renderer.flashOpacity <= 0) {
      if (loop) {
        renderer.phase = "idle"
        renderer.restartTimerId = window.setTimeout(() => {
          if (renderer.isActive) {
            renderer.start()
          }
        }, loopDelay)
      } else {
        renderer.phase = "idle"
        renderer.isActive = false
      }
    }
  }

  const renderMeteorScene = (context: CanvasRenderingContext2D, renderer: MeteorRenderer): void => {
    for (const meteor of renderer.meteors) {
      updateAndRenderTrailParticles(context, meteor.trailParticles, trailRgb)

      if (meteor.active && meteor.progress < 1) {
        renderMeteorBody(
          context,
          meteor.currentX,
          meteor.currentY,
          scaledMeteorSize,
          directionVelocityX,
          directionVelocityY,
          tailLengthPx,
          meteorRgb,
          trailRgb
        )
      }
    }

    renderImpactFlash(context, centerX, centerY, renderer.flashOpacity, impactSizePx, impactRgb)
    updateAndRenderImpactParticles(context, renderer.impactParticles)
  }

  const renderer: MeteorRenderer = {
    width: size,
    height: size,
    data: new Uint8ClampedArray(size * size * 4),
    meteors: [],
    impactParticles: [],
    isActive: false,
    startTime: 0,
    progress: 0,
    phase: "idle",
    flashOpacity: 0,
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
      this.progress = 0
      this.phase = "falling"
      this.flashOpacity = 0
      this.meteors = []
      this.impactParticles = []

      if (shower) {
        for (let meteorIndex = 0; meteorIndex < showerCount; meteorIndex++) {
          const delay = meteorIndex * SHOWER_DELAY_SPREAD + Math.random() * SHOWER_DELAY_SPREAD
          const offsetAngle = (Math.random() - 0.5) * SHOWER_ANGLE_SPREAD
          const offsetDistance = Math.random() * size * SHOWER_DISTANCE_SPREAD
          this.meteors.push(createMeteorInstance(delay, offsetAngle, offsetDistance))
        }
      } else {
        this.meteors.push(createMeteorInstance(0, 0, 0))
      }
    },

    stop() {
      this.isActive = false
      this.phase = "idle"
      clearTimeout(this.restartTimerId)
    },

    reset() {
      this.isActive = false
      this.progress = 0
      this.phase = "idle"
      this.flashOpacity = 0
      this.meteors = []
      this.impactParticles = []
      this.startTime = 0
      clearTimeout(this.restartTimerId)
    },

    render() {
      if (!this.context) {
        return false
      }

      this.context.clearRect(0, 0, this.width, this.height)

      if (!this.isActive && this.phase === "idle") {
        this.data = new Uint8ClampedArray(this.width * this.height * 4)
        return true
      }

      const elapsed = performance.now() - this.startTime
      const { allComplete, anyFalling } = updateMeteorInstances(this, elapsed)
      updateRendererState(this, allComplete, anyFalling)
      renderMeteorScene(this.context, this)

      fadeCanvasEdges(this.context, this.width, this.height)
      this.data = this.context.getImageData(0, 0, this.width, this.height).data

      return true
    },
  }

  return renderer
}

const meteorControls = new Map<string, MeteorControl>()

export const MapMeteor = ({
  id,
  target,
  size = DEFAULT_SIZE,
  angle = DEFAULT_ANGLE,
  speed = DEFAULT_SPEED,
  intensity = DEFAULT_INTENSITY,
  meteorColor = DEFAULT_METEOR_COLOR,
  trailColor = DEFAULT_TRAIL_COLOR,
  impactColor = DEFAULT_IMPACT_COLOR,
  tailLength = DEFAULT_TAIL_LENGTH,
  meteorSize = DEFAULT_METEOR_SIZE,
  impactSize = DEFAULT_IMPACT_SIZE,
  autoStart = true,
  loop = false,
  loopDelay = DEFAULT_LOOP_DELAY,
  shower = false,
  showerCount = DEFAULT_SHOWER_COUNT,
}: MapMeteorProps) => {
  const { map, isLoaded } = useMap()
  const animationFrameRef = useRef<number | null>(null)
  const rendererRef = useRef<MeteorRenderer | null>(null)

  useEffect(() => {
    if (!isLoaded || !map) {
      return
    }

    const meteorRenderer = createMeteorRenderer(
      size,
      angle,
      speed,
      intensity,
      meteorColor,
      trailColor,
      impactColor,
      tailLength,
      meteorSize,
      impactSize,
      loop,
      loopDelay,
      shower,
      showerCount
    )
    rendererRef.current = meteorRenderer

    const control: MeteorControl = {
      start: () => {
        rendererRef.current?.start()
      },
      stop: () => {
        rendererRef.current?.stop()
      },
      reset: () => {
        rendererRef.current?.reset()
      },
      get isActive() {
        return rendererRef.current?.isActive || false
      },
      get progress() {
        return rendererRef.current?.progress || 0
      },
      get phase() {
        return rendererRef.current?.phase || "idle"
      },
    }
    meteorControls.set(id, control)

    if (!map.hasImage(id)) {
      map.addImage(id, meteorRenderer, { pixelRatio: PIXEL_RATIO })
    }

    if (autoStart) {
      meteorRenderer.start()
    }

    const animate = () => {
      const renderer = rendererRef.current
      const shouldRepaint = renderer?.isActive || (renderer?.impactParticles?.length ?? 0) > 0
      if (shouldRepaint) {
        map.triggerRepaint()
      }
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    animationFrameRef.current = requestAnimationFrame(animate)

    const handleStyleLoad = () => {
      if (!map.hasImage(id)) {
        map.addImage(id, meteorRenderer, { pixelRatio: PIXEL_RATIO })
      }
    }

    map.on("style.load", handleStyleLoad)

    return () => {
      map.off("style.load", handleStyleLoad)
      meteorControls.delete(id)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (rendererRef.current) {
        clearTimeout(rendererRef.current.restartTimerId)
      }
      try {
        if (map.hasImage(id)) {
          map.removeImage(id)
        }
      } catch {
        // Map may already be destroyed during unmount
      }
    }
  }, [
    map,
    isLoaded,
    id,
    size,
    angle,
    speed,
    intensity,
    meteorColor,
    trailColor,
    impactColor,
    tailLength,
    meteorSize,
    impactSize,
    autoStart,
    loop,
    loopDelay,
    shower,
    showerCount,
  ])

  useEffect(() => {
    if (!isLoaded || !map) {
      return
    }

    const sourceId = `${id}-source`
    const layerId = `${id}-layer`
    let pollFrameId: number

    const addSourceAndLayer = () => {
      if (!map.getSource(sourceId)) {
        map.addSource(sourceId, {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: { type: "Point", coordinates: target },
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
            "icon-image": id,
            "icon-allow-overlap": true,
          },
        })
      }
    }

    const cleanupSourceAndLayer = () => {
      try {
        if (!map.isStyleLoaded()) {
          return
        }

        if (map.getLayer(layerId)) {
          map.removeLayer(layerId)
        }

        if (map.getSource(sourceId)) {
          map.removeSource(sourceId)
        }
      } catch {
        // Map may already be destroyed during unmount
      }
    }

    const pollAndAddLayers = () => {
      if (!map.isStyleLoaded() || !map.hasImage(id)) {
        pollFrameId = requestAnimationFrame(pollAndAddLayers)
        return
      }

      addSourceAndLayer()
    }

    pollFrameId = requestAnimationFrame(pollAndAddLayers)
    map.on("style.load", pollAndAddLayers)

    return () => {
      cancelAnimationFrame(pollFrameId)
      map.off("style.load", pollAndAddLayers)
      cleanupSourceAndLayer()
    }
  }, [map, isLoaded, target, id])

  return null
}

export const useMeteorControl = (id: string): MeteorControl | null => {
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

  return meteorControls.get(id) || null
}
