"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useMap } from "./hooks"
import type { MapCoordinates } from "./types"

type FireParticle = {
  x: number
  y: number
  velocityX: number
  velocityY: number
  radius: number
  life: number
  maxLife: number
}

type FireSource = {
  x: number
  y: number
  particles: FireParticle[]
  spawnTime: number
  intensity: number
}

type MapFireProps = {
  id: string
  coordinates: MapCoordinates
  size?: number
  intensity?: number
  particleCount?: number
  baseColor?: string
  tipColor?: string
  spread?: boolean
  spreadSpeed?: number
  spreadRadius?: number
  maxSpreadPoints?: number
  autoStart?: boolean
}

type FireRenderer = {
  width: number
  height: number
  data: Uint8ClampedArray
  context?: CanvasRenderingContext2D
  sources: FireSource[]
  isActive: boolean
  startTime: number
  currentIntensity: number
  onAdd: () => void
  render: () => boolean
  start: () => void
  stop: () => void
  addSource: (x: number, y: number) => void
  setIntensity: (intensity: number) => void
}

type FireControl = {
  start: () => void
  stop: () => void
  setIntensity: (intensity: number) => void
  isActive: boolean
  spreadProgress: number
}

type RgbColor = {
  r: number
  g: number
  b: number
}

const DEFAULT_SIZE = 120
const DEFAULT_INTENSITY = 1
const DEFAULT_PARTICLE_COUNT = 50
const DEFAULT_BASE_COLOR = "#ffcc00"
const DEFAULT_TIP_COLOR = "#ff3300"
const DEFAULT_SPREAD_SPEED = 2000
const DEFAULT_SPREAD_RADIUS = 0.4
const DEFAULT_MAX_SPREAD_POINTS = 8

const INITIAL_Y_POSITION = 0.85
const SPREAD_SCALE = 1.5
const MIN_PARTICLES_PER_SOURCE = 15
const VELOCITY_DECAY = 0.98
const FLICKER_BASE = 0.9
const FLICKER_RANGE = 0.2
const COLOR_GRADIENT_INNER = 0.3
const ALPHA_MULTIPLIER = 0.8
const INTENSITY_VARIATION_BASE = 0.7
const INTENSITY_VARIATION_RANGE = 0.3
const MIN_INTENSITY = 0.1
const MAX_INTENSITY = 3
const CANVAS_PADDING = 0.1
const VERTICAL_VARIATION = 0.1
const GLOW_SIZE_SPREAD = 0.08
const GLOW_SIZE_NORMAL = 0.15
const GLOW_OPACITY = 0.25
const PARTICLE_SPREAD_X = 20
const BASE_VELOCITY_Y = -1.5
const VELOCITY_X_RANGE = 0.8
const VELOCITY_Y_RANGE = -1
const PARTICLE_Y_OFFSET = 10
const BASE_RADIUS = 4
const RADIUS_RANGE = 8
const BASE_LIFE = 40
const LIFE_RANGE = 40
const LIFE_RADIUS_DECAY = 0.5
const COLOR_FACTOR_MULTIPLIER = 1.5
const PIXEL_RATIO = 2
const CONTROL_UPDATE_INTERVAL = 100

const fireControls = new Map<string, FireControl>()

const hexToRgb = (hex: string): RgbColor => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  if (!result) {
    return { r: 255, g: 204, b: 0 }
  }

  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  }
}

const interpolateColor = (color1: RgbColor, color2: RgbColor, factor: number): RgbColor => {
  return {
    r: Math.round(color1.r + (color2.r - color1.r) * factor),
    g: Math.round(color1.g + (color2.g - color1.g) * factor),
    b: Math.round(color1.b + (color2.b - color1.b) * factor),
  }
}

const createParticle = (sourceX: number, sourceY: number, intensity: number, scale: number = 1): FireParticle => {
  const spreadX = PARTICLE_SPREAD_X * intensity * scale
  const baseVelocityY = BASE_VELOCITY_Y * intensity * scale

  return {
    x: sourceX + (Math.random() - 0.5) * spreadX,
    y: sourceY + Math.random() * PARTICLE_Y_OFFSET * scale,
    velocityX: (Math.random() - 0.5) * VELOCITY_X_RANGE * scale,
    velocityY: baseVelocityY + Math.random() * VELOCITY_Y_RANGE * scale,
    radius: (BASE_RADIUS + Math.random() * RADIUS_RANGE * intensity) * scale,
    life: 0,
    maxLife: BASE_LIFE + Math.random() * LIFE_RANGE,
  }
}

const createFireSource = (
  x: number,
  y: number,
  particleCount: number,
  intensity: number,
  scale: number = 1
): FireSource => {
  const particles: FireParticle[] = []

  for (let index = 0; index < particleCount; index++) {
    const particle = createParticle(x, y, intensity, scale)
    particle.life = Math.random() * particle.maxLife
    particles.push(particle)
  }

  return {
    x,
    y,
    particles,
    spawnTime: performance.now(),
    intensity,
  }
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

const updateParticle = (particle: FireParticle): boolean => {
  particle.x += particle.velocityX + (Math.random() - 0.5) * 0.5
  particle.y += particle.velocityY
  particle.velocityX *= VELOCITY_DECAY
  particle.life++

  return particle.life >= particle.maxLife
}

const drawParticle = (
  context: CanvasRenderingContext2D,
  particle: FireParticle,
  baseRgb: RgbColor,
  tipRgb: RgbColor,
  flickerIntensity: number
): void => {
  const lifeRatio = particle.life / particle.maxLife
  const alpha = (1 - lifeRatio) * flickerIntensity
  const currentRadius = particle.radius * (1 - lifeRatio * LIFE_RADIUS_DECAY)

  const colorFactor = Math.min(lifeRatio * COLOR_FACTOR_MULTIPLIER, 1)
  const color = interpolateColor(baseRgb, tipRgb, colorFactor)

  const gradient = context.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, currentRadius)

  gradient.addColorStop(0, `rgba(255, 255, 200, ${alpha})`)
  gradient.addColorStop(COLOR_GRADIENT_INNER, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * ALPHA_MULTIPLIER})`)
  gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`)

  context.beginPath()
  context.arc(particle.x, particle.y, currentRadius, 0, Math.PI * 2)
  context.fillStyle = gradient
  context.fill()
}

const drawSourceGlow = (
  context: CanvasRenderingContext2D,
  source: FireSource,
  size: number,
  spread: boolean,
  flickerIntensity: number
): void => {
  const glowSize = spread ? size * GLOW_SIZE_SPREAD : size * GLOW_SIZE_NORMAL
  const glowGradient = context.createRadialGradient(source.x, source.y, 0, source.x, source.y, glowSize)
  glowGradient.addColorStop(0, `rgba(255, 150, 50, ${GLOW_OPACITY * flickerIntensity})`)
  glowGradient.addColorStop(1, "rgba(255, 150, 50, 0)")

  context.beginPath()
  context.arc(source.x, source.y, glowSize, 0, Math.PI * 2)
  context.fillStyle = glowGradient
  context.fill()
}

const createFireRenderer = (
  size: number,
  intensity: number,
  particleCount: number,
  baseColor: string,
  tipColor: string,
  spread: boolean,
  spreadRadius: number,
  maxSpreadPoints: number
): FireRenderer => {
  const baseRgb = hexToRgb(baseColor)
  const tipRgb = hexToRgb(tipColor)
  const centerX = size / 2
  const scale = spread ? SPREAD_SCALE : 1
  const particlesPerSource = spread
    ? Math.max(MIN_PARTICLES_PER_SOURCE, Math.floor(particleCount / Math.max(maxSpreadPoints / 4, 1)))
    : particleCount

  const renderer: FireRenderer = {
    width: size,
    height: size,
    data: new Uint8ClampedArray(size * size * 4),
    sources: [],
    isActive: false,
    startTime: 0,
    currentIntensity: intensity,

    onAdd() {
      const canvas = document.createElement("canvas")
      canvas.width = this.width
      canvas.height = this.height
      this.context = canvas.getContext("2d", { willReadFrequently: true }) || undefined
    },

    start() {
      if (this.isActive) {
        return
      }
      this.isActive = true
      this.startTime = performance.now()
      this.sources = []
      const initialY = size * INITIAL_Y_POSITION
      this.sources.push(createFireSource(centerX, initialY, particlesPerSource, this.currentIntensity, scale))
    },

    stop() {
      this.isActive = false
      this.sources = []
    },

    setIntensity(newIntensity: number) {
      this.currentIntensity = Math.max(MIN_INTENSITY, Math.min(MAX_INTENSITY, newIntensity))
      for (const source of this.sources) {
        source.intensity =
          this.currentIntensity * (INTENSITY_VARIATION_BASE + Math.random() * INTENSITY_VARIATION_RANGE)
      }
    },

    addSource(x: number, y: number) {
      if (this.sources.length < maxSpreadPoints) {
        const sourceIntensity =
          this.currentIntensity * (INTENSITY_VARIATION_BASE + Math.random() * INTENSITY_VARIATION_RANGE)
        this.sources.push(createFireSource(x, y, particlesPerSource, sourceIntensity, scale))
      }
    },

    render() {
      if (!this.context) {
        return false
      }

      this.context.clearRect(0, 0, this.width, this.height)

      if (!this.isActive || this.sources.length === 0) {
        this.data = this.context.getImageData(0, 0, this.width, this.height).data
        return true
      }

      const flickerIntensity = FLICKER_BASE + Math.random() * FLICKER_RANGE

      for (const source of this.sources) {
        for (let particleIndex = 0; particleIndex < source.particles.length; particleIndex++) {
          const particle = source.particles[particleIndex]
          const shouldReset = updateParticle(particle)

          if (shouldReset) {
            source.particles[particleIndex] = createParticle(source.x, source.y, source.intensity, scale)
            continue
          }

          drawParticle(this.context, particle, baseRgb, tipRgb, flickerIntensity)
        }

        drawSourceGlow(this.context, source, size, spread, flickerIntensity)
      }

      fadeCanvasEdges(this.context, this.width, this.height)
      this.data = this.context.getImageData(0, 0, this.width, this.height).data

      return true
    },
  }

  return renderer
}

const calculateSpreadPosition = (canvasSize: number, spreadRadius: number): { x: number; y: number } => {
  const baseY = canvasSize * INITIAL_Y_POSITION
  const horizontalSpread = (Math.random() - 0.5) * 2 * spreadRadius * canvasSize
  const verticalVariation = Math.random() * canvasSize * VERTICAL_VARIATION

  const padding = canvasSize * CANVAS_PADDING
  const newX = Math.max(padding, Math.min(canvasSize - padding, canvasSize / 2 + horizontalSpread))
  const newY = Math.max(padding, Math.min(canvasSize - padding, baseY + verticalVariation))

  return { x: newX, y: newY }
}

const initializeRenderer = (map: mapboxgl.Map, id: string, renderer: FireRenderer, control: FireControl): void => {
  fireControls.set(id, control)

  if (!map.hasImage(id)) {
    map.addImage(id, renderer, { pixelRatio: PIXEL_RATIO })
  }
}

const cleanupRenderer = (map: mapboxgl.Map, id: string, animationFrameId: number | null): void => {
  fireControls.delete(id)

  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
  }

  try {
    if (map.hasImage(id)) {
      map.removeImage(id)
    }
  } catch {
    // Map may already be destroyed during unmount
  }
}

const addSourceAndLayer = (
  map: mapboxgl.Map,
  id: string,
  sourceId: string,
  layerId: string,
  coordinates: MapCoordinates
): void => {
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

const cleanupSourceAndLayer = (map: mapboxgl.Map, sourceId: string, layerId: string): void => {
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

export const useFireControl = (id: string): FireControl | null => {
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

  return fireControls.get(id) || null
}

export const MapFire = ({
  id,
  coordinates,
  size = DEFAULT_SIZE,
  intensity = DEFAULT_INTENSITY,
  particleCount = DEFAULT_PARTICLE_COUNT,
  baseColor = DEFAULT_BASE_COLOR,
  tipColor = DEFAULT_TIP_COLOR,
  spread = false,
  spreadSpeed = DEFAULT_SPREAD_SPEED,
  spreadRadius = DEFAULT_SPREAD_RADIUS,
  maxSpreadPoints = DEFAULT_MAX_SPREAD_POINTS,
  autoStart = true,
}: MapFireProps) => {
  const { map, isLoaded } = useMap()
  const animationFrameRef = useRef<number | null>(null)
  const rendererRef = useRef<FireRenderer | null>(null)
  const lastSpreadTimeRef = useRef<number>(0)
  const spreadProgressRef = useRef<number>(0)

  const sourceId = `${id}-source`
  const layerId = `${id}-layer`
  const canvasSize = spread ? size * 2 : size

  const start = useCallback(() => {
    if (rendererRef.current) {
      rendererRef.current.start()
      lastSpreadTimeRef.current = performance.now()
      spreadProgressRef.current = 0
    }
  }, [])

  const stop = useCallback(() => {
    if (rendererRef.current) {
      rendererRef.current.stop()
      spreadProgressRef.current = 0
    }
  }, [])

  const setIntensity = useCallback((newIntensity: number) => {
    if (rendererRef.current) {
      rendererRef.current.setIntensity(newIntensity)
    }
  }, [])

  useEffect(() => {
    if (!isLoaded || !map) {
      return
    }

    const fireRenderer = createFireRenderer(
      canvasSize,
      intensity,
      particleCount,
      baseColor,
      tipColor,
      spread,
      spreadRadius,
      maxSpreadPoints
    )
    rendererRef.current = fireRenderer

    const control: FireControl = {
      start,
      stop,
      setIntensity,
      get isActive() {
        return rendererRef.current?.isActive || false
      },
      get spreadProgress() {
        return spreadProgressRef.current
      },
    }

    initializeRenderer(map, id, fireRenderer, control)

    if (autoStart) {
      fireRenderer.start()
      lastSpreadTimeRef.current = performance.now()
    }

    const animate = () => {
      if (spread && fireRenderer.isActive) {
        const now = performance.now()
        const elapsed = now - lastSpreadTimeRef.current

        if (elapsed >= spreadSpeed && fireRenderer.sources.length < maxSpreadPoints) {
          const position = calculateSpreadPosition(canvasSize, spreadRadius)
          fireRenderer.addSource(position.x, position.y)
          lastSpreadTimeRef.current = now
          spreadProgressRef.current = fireRenderer.sources.length / maxSpreadPoints
        }
      }

      map.triggerRepaint()
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    animationFrameRef.current = requestAnimationFrame(animate)

    const handleStyleLoad = () => {
      if (!map.hasImage(id)) {
        map.addImage(id, fireRenderer, { pixelRatio: PIXEL_RATIO })
      }
    }

    map.on("style.load", handleStyleLoad)

    return () => {
      map.off("style.load", handleStyleLoad)
      cleanupRenderer(map, id, animationFrameRef.current)
    }
  }, [
    map,
    isLoaded,
    id,
    canvasSize,
    intensity,
    particleCount,
    baseColor,
    tipColor,
    spread,
    spreadSpeed,
    spreadRadius,
    maxSpreadPoints,
    autoStart,
    start,
    stop,
    setIntensity,
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

      addSourceAndLayer(map, id, sourceId, layerId, coordinates)
    }

    addLayers()

    const handleStyleLoad = () => {
      addLayers()
    }

    map.on("style.load", handleStyleLoad)

    return () => {
      cancelAnimationFrame(addLayersFrameId)
      map.off("style.load", handleStyleLoad)
      cleanupSourceAndLayer(map, sourceId, layerId)
    }
  }, [map, isLoaded, coordinates, id, sourceId, layerId])

  return null
}
