"use client"

import { useEffect, useRef, useState } from "react"
import { useMap } from "./hooks"
import type { MapCoordinates } from "./types"

type RgbColor = {
  r: number
  g: number
  b: number
}

type ExplosionType = "burst" | "nuclear"

type ExplosionParticle = {
  x: number
  y: number
  velocityX: number
  velocityY: number
  radius: number
  life: number
  maxLife: number
  color: RgbColor
  type: "debris" | "fireball" | "mushroom" | "shockwave"
}

type MapExplosionProps = {
  id: string
  coordinates: MapCoordinates
  type?: ExplosionType
  size?: number
  particleCount?: number
  duration?: number
  coreColor?: string
  outerColor?: string
  autoStart?: boolean
  loop?: boolean
  loopDelay?: number
}

type ExplosionRenderer = {
  width: number
  height: number
  data: Uint8ClampedArray
  context?: CanvasRenderingContext2D
  particles: ExplosionParticle[]
  isExploding: boolean
  explosionTime: number
  shockwaveRadius: number
  onAdd: () => void
  render: () => boolean
  trigger: () => void
  reset: () => void
}

type ExplosionControl = {
  trigger: () => void
  reset: () => void
  isExploding: boolean
}

const DEFAULT_SIZE = 150
const DEFAULT_PARTICLE_COUNT = 60
const DEFAULT_DURATION = 3000
const DEFAULT_CORE_COLOR = "#ffffff"
const DEFAULT_OUTER_COLOR = "#ff6600"
const DEFAULT_LOOP_DELAY = 3000
const FRAME_RATE = 60

const BURST_SPEED_MIN = 1.5
const BURST_SPEED_RANGE = 4
const BURST_CORE_PROBABILITY = 0.3
const BURST_LIFE_VARIATION_MIN = 0.7
const BURST_LIFE_VARIATION_RANGE = 0.3
const BURST_CORE_RADIUS_MIN = 4
const BURST_CORE_RADIUS_RANGE = 6
const BURST_OUTER_RADIUS_MIN = 3
const BURST_OUTER_RADIUS_RANGE = 8

const NUCLEAR_LIFE_VARIATION_MIN = 0.6
const NUCLEAR_LIFE_VARIATION_RANGE = 0.4
const NUCLEAR_FIREBALL_DISTANCE_RATIO = 0.1
const NUCLEAR_FIREBALL_VELOCITY_SPREAD = 0.5
const NUCLEAR_FIREBALL_VELOCITY_MIN = -0.8
const NUCLEAR_FIREBALL_VELOCITY_RANGE = -1.2
const NUCLEAR_FIREBALL_RADIUS_MIN = 8
const NUCLEAR_FIREBALL_RADIUS_RANGE = 12
const NUCLEAR_FIREBALL_LIFE_FACTOR = 0.9
const NUCLEAR_MUSHROOM_SPREAD_RATIO = 0.15
const NUCLEAR_MUSHROOM_Y_OFFSET_RATIO = 0.25
const NUCLEAR_MUSHROOM_VELOCITY_MIN = 0.5
const NUCLEAR_MUSHROOM_VELOCITY_RANGE = 1
const NUCLEAR_MUSHROOM_VERTICAL_MIN = -0.3
const NUCLEAR_MUSHROOM_VERTICAL_RANGE = -0.5
const NUCLEAR_MUSHROOM_RADIUS_MIN = 10
const NUCLEAR_MUSHROOM_RADIUS_RANGE = 15
const NUCLEAR_DEBRIS_SPEED_MIN = 2
const NUCLEAR_DEBRIS_SPEED_RANGE = 3
const NUCLEAR_DEBRIS_VERTICAL_FACTOR = 0.6
const NUCLEAR_DEBRIS_RADIUS_MIN = 3
const NUCLEAR_DEBRIS_RADIUS_RANGE = 5
const NUCLEAR_DEBRIS_LIFE_FACTOR = 0.8
const NUCLEAR_FIREBALL_RATIO = 0.3
const NUCLEAR_MUSHROOM_RATIO = 0.4
const NUCLEAR_MIN_SIZE = 200
const NUCLEAR_MIN_PARTICLE_COUNT = 80
const NUCLEAR_MIN_DURATION = 4000
const NUCLEAR_CENTER_Y_RATIO = 0.65

const SHOCKWAVE_ELLIPSE_Y_RATIO = 0.4
const SHOCKWAVE_START_PROGRESS = 0.05
const SHOCKWAVE_END_PROGRESS = 0.5
const SHOCKWAVE_DURATION_RATIO = 0.45
const SHOCKWAVE_MAX_RADIUS_RATIO = 0.5
const SHOCKWAVE_MAX_ALPHA = 0.6
const SHOCKWAVE_MAX_LINE_WIDTH = 4

const FLASH_NUCLEAR_END_PROGRESS = 0.2
const FLASH_NUCLEAR_RADIUS_RATIO = 0.5
const FLASH_NUCLEAR_MIN_SCALE = 0.3
const FLASH_NUCLEAR_SCALE_RANGE = 0.7
const FLASH_BURST_END_PROGRESS = 0.15
const FLASH_BURST_RADIUS_RATIO = 0.35

const FIREBALL_VELOCITY_DECAY_X = 0.995
const FIREBALL_VELOCITY_DECAY_Y = 0.997
const MUSHROOM_VELOCITY_DECAY_X = 0.99
const MUSHROOM_VELOCITY_DECAY_Y = 0.985
const DEBRIS_VELOCITY_DECAY = 0.985
const DEBRIS_GRAVITY = 0.03

const PARTICLE_FADE_START = 0.5
const PARTICLE_FADE_POWER = 1.5
const PARTICLE_SHRINK_FACTOR = 0.15

const hexToRgb = (hex: string): RgbColor => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  if (!result) {
    return { r: 255, g: 102, b: 0 }
  }

  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  }
}

const createBurstParticle = (
  centerX: number,
  centerY: number,
  coreRgb: RgbColor,
  outerRgb: RgbColor,
  durationFrames: number
): ExplosionParticle => {
  const angle = Math.random() * Math.PI * 2
  const speed = BURST_SPEED_MIN + Math.random() * BURST_SPEED_RANGE
  const isCore = Math.random() < BURST_CORE_PROBABILITY
  const lifeVariation = BURST_LIFE_VARIATION_MIN + Math.random() * BURST_LIFE_VARIATION_RANGE

  return {
    x: centerX,
    y: centerY,
    velocityX: Math.cos(angle) * speed,
    velocityY: Math.sin(angle) * speed,
    radius: isCore
      ? BURST_CORE_RADIUS_MIN + Math.random() * BURST_CORE_RADIUS_RANGE
      : BURST_OUTER_RADIUS_MIN + Math.random() * BURST_OUTER_RADIUS_RANGE,
    life: 0,
    maxLife: Math.floor(durationFrames * lifeVariation),
    color: isCore ? coreRgb : outerRgb,
    type: "debris",
  }
}

const createNuclearParticle = (
  centerX: number,
  centerY: number,
  size: number,
  coreRgb: RgbColor,
  outerRgb: RgbColor,
  particleType: "fireball" | "mushroom" | "debris",
  durationFrames: number
): ExplosionParticle => {
  const lifeVariation = NUCLEAR_LIFE_VARIATION_MIN + Math.random() * NUCLEAR_LIFE_VARIATION_RANGE

  if (particleType === "fireball") {
    const angle = Math.random() * Math.PI * 2
    const distance = Math.random() * size * NUCLEAR_FIREBALL_DISTANCE_RATIO
    return {
      x: centerX + Math.cos(angle) * distance,
      y: centerY + Math.sin(angle) * distance,
      velocityX: (Math.random() - 0.5) * NUCLEAR_FIREBALL_VELOCITY_SPREAD,
      velocityY: NUCLEAR_FIREBALL_VELOCITY_MIN + Math.random() * NUCLEAR_FIREBALL_VELOCITY_RANGE,
      radius: NUCLEAR_FIREBALL_RADIUS_MIN + Math.random() * NUCLEAR_FIREBALL_RADIUS_RANGE,
      life: 0,
      maxLife: Math.floor(durationFrames * lifeVariation * NUCLEAR_FIREBALL_LIFE_FACTOR),
      color: coreRgb,
      type: "fireball",
    }
  }

  if (particleType === "mushroom") {
    const angle = Math.random() * Math.PI * 2
    const spread = Math.random() * size * NUCLEAR_MUSHROOM_SPREAD_RATIO
    return {
      x: centerX + Math.cos(angle) * spread,
      y: centerY - size * NUCLEAR_MUSHROOM_Y_OFFSET_RATIO,
      velocityX: Math.cos(angle) * (NUCLEAR_MUSHROOM_VELOCITY_MIN + Math.random() * NUCLEAR_MUSHROOM_VELOCITY_RANGE),
      velocityY: NUCLEAR_MUSHROOM_VERTICAL_MIN + Math.random() * NUCLEAR_MUSHROOM_VERTICAL_RANGE,
      radius: NUCLEAR_MUSHROOM_RADIUS_MIN + Math.random() * NUCLEAR_MUSHROOM_RADIUS_RANGE,
      life: 0,
      maxLife: Math.floor(durationFrames * lifeVariation),
      color: outerRgb,
      type: "mushroom",
    }
  }

  const angle = Math.random() * Math.PI * 2
  const speed = NUCLEAR_DEBRIS_SPEED_MIN + Math.random() * NUCLEAR_DEBRIS_SPEED_RANGE
  return {
    x: centerX,
    y: centerY,
    velocityX: Math.cos(angle) * speed,
    velocityY: Math.sin(angle) * speed * NUCLEAR_DEBRIS_VERTICAL_FACTOR,
    radius: NUCLEAR_DEBRIS_RADIUS_MIN + Math.random() * NUCLEAR_DEBRIS_RADIUS_RANGE,
    life: 0,
    maxLife: Math.floor(durationFrames * lifeVariation * NUCLEAR_DEBRIS_LIFE_FACTOR),
    color: outerRgb,
    type: "debris",
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

const drawNuclearFlash = (
  context: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  size: number,
  progress: number
) => {
  if (progress >= FLASH_NUCLEAR_END_PROGRESS) {
    return
  }

  const flashProgress = progress / FLASH_NUCLEAR_END_PROGRESS
  const flashIntensity = 1 - Math.pow(flashProgress, 2)
  const flashRadius =
    size * FLASH_NUCLEAR_RADIUS_RATIO * (FLASH_NUCLEAR_MIN_SCALE + flashProgress * FLASH_NUCLEAR_SCALE_RANGE)

  const flashGradient = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, flashRadius)
  flashGradient.addColorStop(0, `rgba(255, 255, 255, ${flashIntensity})`)
  flashGradient.addColorStop(0.3, `rgba(255, 255, 200, ${flashIntensity * 0.8})`)
  flashGradient.addColorStop(0.6, `rgba(255, 200, 100, ${flashIntensity * 0.5})`)
  flashGradient.addColorStop(1, "rgba(255, 100, 0, 0)")

  context.beginPath()
  context.arc(centerX, centerY, flashRadius, 0, Math.PI * 2)
  context.fillStyle = flashGradient
  context.fill()
}

const drawShockwave = (
  context: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  size: number,
  progress: number,
  renderer: ExplosionRenderer
) => {
  if (progress <= SHOCKWAVE_START_PROGRESS || progress >= SHOCKWAVE_END_PROGRESS) {
    return
  }

  const shockProgress = (progress - SHOCKWAVE_START_PROGRESS) / SHOCKWAVE_DURATION_RATIO
  renderer.shockwaveRadius = size * SHOCKWAVE_MAX_RADIUS_RATIO * shockProgress
  const shockAlpha = SHOCKWAVE_MAX_ALPHA * (1 - shockProgress)
  const radiusX = renderer.shockwaveRadius
  const radiusY = renderer.shockwaveRadius * SHOCKWAVE_ELLIPSE_Y_RATIO

  context.beginPath()
  context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2)
  context.strokeStyle = `rgba(255, 200, 100, ${shockAlpha})`
  context.lineWidth = SHOCKWAVE_MAX_LINE_WIDTH * (1 - shockProgress) + 1
  context.stroke()
}

const drawBurstFlash = (
  context: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  size: number,
  progress: number
) => {
  if (progress >= FLASH_BURST_END_PROGRESS) {
    return
  }

  const flashIntensity = 1 - progress / FLASH_BURST_END_PROGRESS
  const flashGradient = context.createRadialGradient(
    centerX,
    centerY,
    0,
    centerX,
    centerY,
    size * FLASH_BURST_RADIUS_RATIO
  )
  flashGradient.addColorStop(0, `rgba(255, 255, 255, ${flashIntensity})`)
  flashGradient.addColorStop(0.5, `rgba(255, 200, 100, ${flashIntensity * 0.6})`)
  flashGradient.addColorStop(1, "rgba(255, 100, 0, 0)")
  context.beginPath()
  context.arc(centerX, centerY, size * FLASH_BURST_RADIUS_RATIO, 0, Math.PI * 2)
  context.fillStyle = flashGradient
  context.fill()
}

const updateParticle = (particle: ExplosionParticle) => {
  if (particle.type === "fireball") {
    particle.x += particle.velocityX
    particle.y += particle.velocityY
    particle.velocityX *= FIREBALL_VELOCITY_DECAY_X
    particle.velocityY *= FIREBALL_VELOCITY_DECAY_Y
  } else if (particle.type === "mushroom") {
    particle.x += particle.velocityX
    particle.y += particle.velocityY
    particle.velocityX *= MUSHROOM_VELOCITY_DECAY_X
    particle.velocityY *= MUSHROOM_VELOCITY_DECAY_Y
  } else {
    particle.x += particle.velocityX
    particle.y += particle.velocityY
    particle.velocityX *= DEBRIS_VELOCITY_DECAY
    particle.velocityY *= DEBRIS_VELOCITY_DECAY
    particle.velocityY += DEBRIS_GRAVITY
  }

  particle.life++
}

const drawParticle = (context: CanvasRenderingContext2D, particle: ExplosionParticle) => {
  const lifeRatio = particle.life / particle.maxLife
  const alphaMultiplier =
    lifeRatio < PARTICLE_FADE_START
      ? 1
      : 1 - Math.pow((lifeRatio - PARTICLE_FADE_START) / (1 - PARTICLE_FADE_START), PARTICLE_FADE_POWER)
  const alpha = Math.max(0, alphaMultiplier)
  const currentRadius = particle.radius * (1 - lifeRatio * PARTICLE_SHRINK_FACTOR)

  const gradient = context.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, currentRadius)
  const { r, g, b } = particle.color

  if (particle.type === "fireball") {
    gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`)
    gradient.addColorStop(0.3, `rgba(255, 255, 200, ${alpha * 0.9})`)
    gradient.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, ${alpha * 0.7})`)
    gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
  } else if (particle.type === "mushroom") {
    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.8})`)
    gradient.addColorStop(
      0.5,
      `rgba(${Math.floor(r * 0.7)}, ${Math.floor(g * 0.5)}, ${Math.floor(b * 0.3)}, ${alpha * 0.6})`
    )
    gradient.addColorStop(1, `rgba(100, 80, 60, 0)`)
  } else {
    gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`)
    gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${alpha * 0.8})`)
    gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
  }

  context.beginPath()
  context.arc(particle.x, particle.y, currentRadius, 0, Math.PI * 2)
  context.fillStyle = gradient
  context.fill()
}

const createExplosionRenderer = (
  explosionType: ExplosionType,
  size: number,
  particleCount: number,
  duration: number,
  coreColor: string,
  outerColor: string
): ExplosionRenderer => {
  const coreRgb = hexToRgb(coreColor)
  const outerRgb = hexToRgb(outerColor)
  const centerX = size / 2
  const centerY = explosionType === "nuclear" ? size * NUCLEAR_CENTER_Y_RATIO : size / 2
  const durationFrames = Math.floor((duration / 1000) * FRAME_RATE)

  const renderer: ExplosionRenderer = {
    width: size,
    height: size,
    data: new Uint8ClampedArray(size * size * 4),
    particles: [],
    isExploding: false,
    explosionTime: 0,
    shockwaveRadius: 0,

    onAdd() {
      const canvas = document.createElement("canvas")
      canvas.width = this.width
      canvas.height = this.height
      this.context = canvas.getContext("2d", { willReadFrequently: true }) || undefined
    },

    trigger() {
      this.particles = []
      this.shockwaveRadius = 0

      if (explosionType === "nuclear") {
        const fireballCount = Math.floor(particleCount * NUCLEAR_FIREBALL_RATIO)
        const mushroomCount = Math.floor(particleCount * NUCLEAR_MUSHROOM_RATIO)
        const debrisCount = particleCount - fireballCount - mushroomCount

        for (let index = 0; index < fireballCount; index++) {
          this.particles.push(
            createNuclearParticle(centerX, centerY, size, coreRgb, outerRgb, "fireball", durationFrames)
          )
        }
        for (let index = 0; index < mushroomCount; index++) {
          this.particles.push(
            createNuclearParticle(centerX, centerY, size, coreRgb, outerRgb, "mushroom", durationFrames)
          )
        }
        for (let index = 0; index < debrisCount; index++) {
          this.particles.push(
            createNuclearParticle(centerX, centerY, size, coreRgb, outerRgb, "debris", durationFrames)
          )
        }
      } else {
        for (let index = 0; index < particleCount; index++) {
          this.particles.push(createBurstParticle(centerX, centerY, coreRgb, outerRgb, durationFrames))
        }
      }

      this.isExploding = true
      this.explosionTime = performance.now()
    },

    reset() {
      this.particles = []
      this.isExploding = false
      this.explosionTime = 0
      this.shockwaveRadius = 0
      if (this.context) {
        this.context.clearRect(0, 0, this.width, this.height)
        this.data = this.context.getImageData(0, 0, this.width, this.height).data
      }
    },

    render() {
      if (!this.context) {
        return false
      }

      this.context.clearRect(0, 0, this.width, this.height)

      if (!this.isExploding) {
        this.data = this.context.getImageData(0, 0, this.width, this.height).data
        return true
      }

      const elapsed = performance.now() - this.explosionTime
      const progress = Math.min(elapsed / duration, 1)

      if (explosionType === "nuclear") {
        drawNuclearFlash(this.context, centerX, centerY, size, progress)
        drawShockwave(this.context, centerX, centerY, size, progress, this)
      } else {
        drawBurstFlash(this.context, centerX, centerY, size, progress)
      }

      let activeParticles = 0

      for (let particleIndex = 0; particleIndex < this.particles.length; particleIndex++) {
        const particle = this.particles[particleIndex]
        updateParticle(particle)

        if (particle.life >= particle.maxLife) {
          continue
        }

        activeParticles++
        drawParticle(this.context, particle)
      }

      if (progress >= 1 || activeParticles === 0) {
        this.isExploding = false
      }

      fadeCanvasEdges(this.context, this.width, this.height)
      this.data = this.context.getImageData(0, 0, this.width, this.height).data

      return true
    },
  }

  return renderer
}

const explosionControls = new Map<string, ExplosionControl>()

export const MapExplosion = ({
  id,
  coordinates,
  type: explosionType = "burst",
  size = DEFAULT_SIZE,
  particleCount = DEFAULT_PARTICLE_COUNT,
  duration = DEFAULT_DURATION,
  coreColor = DEFAULT_CORE_COLOR,
  outerColor = DEFAULT_OUTER_COLOR,
  autoStart = true,
  loop = false,
  loopDelay = DEFAULT_LOOP_DELAY,
}: MapExplosionProps) => {
  const { map, isLoaded } = useMap()
  const animationFrameRef = useRef<number | null>(null)
  const rendererRef = useRef<ExplosionRenderer | null>(null)
  const loopTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const sourceId = `${id}-source`
  const layerId = `${id}-layer`

  useEffect(() => {
    if (!isLoaded || !map) {
      return
    }

    const actualSize = explosionType === "nuclear" ? Math.max(size, NUCLEAR_MIN_SIZE) : size
    const actualParticleCount =
      explosionType === "nuclear" ? Math.max(particleCount, NUCLEAR_MIN_PARTICLE_COUNT) : particleCount
    const actualDuration = explosionType === "nuclear" ? Math.max(duration, NUCLEAR_MIN_DURATION) : duration

    const explosionRenderer = createExplosionRenderer(
      explosionType,
      actualSize,
      actualParticleCount,
      actualDuration,
      coreColor,
      outerColor
    )
    rendererRef.current = explosionRenderer

    const control: ExplosionControl = {
      trigger: () => {
        rendererRef.current?.trigger()
      },
      reset: () => {
        rendererRef.current?.reset()
      },
      get isExploding() {
        return rendererRef.current?.isExploding || false
      },
    }
    explosionControls.set(id, control)

    const addImage = () => {
      if (!map.hasImage(id)) {
        map.addImage(id, explosionRenderer, { pixelRatio: 2 })
      }
    }

    addImage()

    if (autoStart) {
      explosionRenderer.trigger()
    }

    const animate = () => {
      const isActive = rendererRef.current?.isExploding || false

      if (isActive) {
        map.triggerRepaint()
      }

      if (loop && rendererRef.current && !rendererRef.current.isExploding && autoStart) {
        if (!loopTimeoutRef.current) {
          loopTimeoutRef.current = setTimeout(() => {
            if (rendererRef.current) {
              rendererRef.current.trigger()
            }
            loopTimeoutRef.current = null
          }, loopDelay)
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }
    animationFrameRef.current = requestAnimationFrame(animate)

    const handleStyleLoad = () => {
      addImage()
    }

    map.on("style.load", handleStyleLoad)

    return () => {
      map.off("style.load", handleStyleLoad)
      explosionControls.delete(id)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (loopTimeoutRef.current) {
        clearTimeout(loopTimeoutRef.current)
      }
      if (!map || !map.getStyle()) {
        return
      }
      if (map.hasImage(id)) {
        map.removeImage(id)
      }
    }
  }, [
    map,
    isLoaded,
    id,
    explosionType,
    size,
    particleCount,
    duration,
    coreColor,
    outerColor,
    autoStart,
    loop,
    loopDelay,
  ])

  useEffect(() => {
    if (!isLoaded || !map) {
      return
    }

    let addLayersFrameId: number

    const addLayers = () => {
      if (!map.isStyleLoaded() || !map.hasImage(id)) {
        addLayersFrameId = requestAnimationFrame(addLayers)
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
                geometry: { type: "Point", coordinates },
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

    addLayers()

    const handleStyleLoad = () => {
      addLayers()
    }

    map.on("style.load", handleStyleLoad)

    return () => {
      cancelAnimationFrame(addLayersFrameId)
      map.off("style.load", handleStyleLoad)
      if (!map || !map.getStyle()) {
        return
      }
      if (map.getLayer(layerId)) {
        map.removeLayer(layerId)
      }
      if (map.getSource(sourceId)) {
        map.removeSource(sourceId)
      }
    }
  }, [map, isLoaded, coordinates, id, sourceId, layerId])

  return null
}

export const useExplosionControl = (id: string): ExplosionControl | null => {
  const [, forceUpdate] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate((previous) => {
        return previous + 1
      })
    }, 100)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return explosionControls.get(id) || null
}
