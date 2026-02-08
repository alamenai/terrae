"use client"

import { useEffect, useRef, useState } from "react"
import { useMap } from "./hooks"
import type { MapCoordinates, MapPath } from "./types"

type RgbColor = {
  r: number
  g: number
  b: number
}

type CycloneParticle = {
  angle: number
  radius: number
  height: number
  angularVelocity: number
  verticalVelocity: number
  size: number
  opacity: number
  type: "funnel" | "debris" | "dust"
}

type MapCycloneProps = {
  id: string
  coordinates: MapCoordinates
  path?: MapPath
  duration?: number
  loop?: boolean
  size?: number
  intensity?: number
  scale?: number
  particleCount?: number
  funnelColor?: string
  debrisColor?: string
  rotationSpeed?: number
  autoStart?: boolean
}

type CycloneRenderer = {
  width: number
  height: number
  data: Uint8ClampedArray
  context?: CanvasRenderingContext2D
  particles: CycloneParticle[]
  isActive: boolean
  startTime: number
  currentIntensity: number
  targetIntensity: number
  currentScale: number
  targetScale: number
  rotationSpeed: number
  onAdd: () => void
  render: () => boolean
  start: () => void
  stop: () => void
  setIntensity: (intensity: number) => void
  setScale: (scale: number, instant?: boolean) => void
  setRotationSpeed: (speed: number) => void
}

type CycloneControl = {
  start: () => void
  stop: () => void
  setIntensity: (intensity: number) => void
  setScale: (scale: number, instant?: boolean) => void
  setRotationSpeed: (speed: number) => void
  isActive: boolean
  isMoving: boolean
  progress: number
  scale: number
  rotationSpeed: number
}

const DEFAULT_SIZE = 200
const DEFAULT_INTENSITY = 1
const DEFAULT_SCALE = 1
const DEFAULT_PARTICLE_COUNT = 120
const DEFAULT_FUNNEL_COLOR = "#8b9dc3"
const DEFAULT_DEBRIS_COLOR = "#5c4033"
const DEFAULT_ROTATION_SPEED = 1
const DEFAULT_DURATION = 10000

const FUNNEL_BASE_RADIUS_RATIO = 0.05
const FUNNEL_TOP_RADIUS_RATIO = 0.25
const FUNNEL_RADIUS_VARIATION_MIN = 0.8
const FUNNEL_RADIUS_VARIATION_RANGE = 0.4
const FUNNEL_ANGULAR_VELOCITY_BASE = 0.08
const FUNNEL_ANGULAR_VELOCITY_RANGE = 0.04
const FUNNEL_VERTICAL_VELOCITY_BASE = 0.003
const FUNNEL_VERTICAL_VELOCITY_RANGE = 0.002
const FUNNEL_SIZE_BASE = 2
const FUNNEL_SIZE_RANGE = 3
const FUNNEL_OPACITY_BASE = 0.4
const FUNNEL_OPACITY_RANGE = 0.4

const DEBRIS_HEIGHT_MAX = 0.7
const DEBRIS_BASE_RADIUS_RATIO = 0.08
const DEBRIS_TOP_RADIUS_RATIO = 0.2
const DEBRIS_RADIUS_VARIATION_MIN = 1.2
const DEBRIS_RADIUS_VARIATION_RANGE = 0.8
const DEBRIS_ANGULAR_VELOCITY_BASE = 0.06
const DEBRIS_ANGULAR_VELOCITY_RANGE = 0.05
const DEBRIS_VERTICAL_VELOCITY_BASE = 0.004
const DEBRIS_VERTICAL_VELOCITY_RANGE = 0.003
const DEBRIS_SIZE_BASE = 3
const DEBRIS_SIZE_RANGE = 5
const DEBRIS_OPACITY_BASE = 0.6
const DEBRIS_OPACITY_RANGE = 0.4
const DEBRIS_RADIUS_MULTIPLIER = 1.3

const DUST_RADIUS_BASE_RATIO = 0.1
const DUST_RADIUS_RANGE_RATIO = 0.15
const DUST_HEIGHT_MAX = 0.15
const DUST_ANGULAR_VELOCITY_BASE = 0.04
const DUST_ANGULAR_VELOCITY_RANGE = 0.03
const DUST_VERTICAL_VELOCITY_BASE = 0.001
const DUST_VERTICAL_VELOCITY_RANGE = 0.002
const DUST_SIZE_BASE = 4
const DUST_SIZE_RANGE = 8
const DUST_OPACITY_BASE = 0.3
const DUST_OPACITY_RANGE = 0.3
const DUST_RADIUS_BASE = 0.12
const DUST_RADIUS_HEIGHT_FACTOR = 0.05

const INTENSITY_INCREASE_RATE = 0.02
const INTENSITY_DECREASE_RATE = 0.015
const SCALE_TRANSITION_RATE = 0.01
const MIN_SCALE = 0.2
const MAX_SCALE = 2
const MAX_INTENSITY = 2
const MIN_ROTATION_SPEED = 0
const MAX_ROTATION_SPEED = 4

const PARTICLE_HEIGHT_MULTIPLIER = 0.75
const BASE_Y_RATIO = 0.85
const WOBBLE_FACTOR = 0.1
const WOBBLE_FREQUENCY = 3

const FUNNEL_PARTICLE_RATIO = 0.5
const DEBRIS_PARTICLE_RATIO = 0.3

const DUST_CLOUD_RADIUS_RATIO = 0.2
const DUST_CLOUD_HEIGHT_RATIO = 0.08

const cycloneControls = new Map<string, CycloneControl>()

export const MapCyclone = ({
  id,
  coordinates,
  path,
  duration = DEFAULT_DURATION,
  loop = false,
  size = DEFAULT_SIZE,
  intensity = DEFAULT_INTENSITY,
  scale = DEFAULT_SCALE,
  particleCount = DEFAULT_PARTICLE_COUNT,
  funnelColor = DEFAULT_FUNNEL_COLOR,
  debrisColor = DEFAULT_DEBRIS_COLOR,
  rotationSpeed = DEFAULT_ROTATION_SPEED,
  autoStart = true,
}: MapCycloneProps) => {
  const { map, isLoaded } = useMap()
  const animationFrameRef = useRef<number | null>(null)
  const retryFrameRef = useRef<number | null>(null)
  const rendererRef = useRef<CycloneRenderer | null>(null)
  const movementStartTimeRef = useRef<number>(0)
  const isMovingRef = useRef<boolean>(false)
  const progressRef = useRef<number>(0)
  const pathRef = useRef(path)
  const durationRef = useRef(duration)
  const loopRef = useRef(loop)
  const sourceId = `${id}-source`
  const layerId = `${id}-layer`

  pathRef.current = path
  durationRef.current = duration
  loopRef.current = loop

  const registerControl = () => {
    const control: CycloneControl = {
      start: () => {
        if (rendererRef.current) {
          rendererRef.current.start()
        }
        if (pathRef.current && pathRef.current.length >= 2) {
          movementStartTimeRef.current = performance.now()
          isMovingRef.current = true
          progressRef.current = 0
        }
      },
      stop: () => {
        if (rendererRef.current) {
          rendererRef.current.stop()
        }
        isMovingRef.current = false
      },
      setIntensity: (newIntensity: number) => {
        if (rendererRef.current) {
          rendererRef.current.setIntensity(newIntensity)
        }
      },
      setScale: (newScale: number, instant?: boolean) => {
        if (rendererRef.current) {
          rendererRef.current.setScale(newScale, instant)
        }
      },
      setRotationSpeed: (speed: number) => {
        if (rendererRef.current) {
          rendererRef.current.setRotationSpeed(speed)
        }
      },
      get isActive() {
        return rendererRef.current?.isActive || false
      },
      get isMoving() {
        return isMovingRef.current
      },
      get progress() {
        return progressRef.current
      },
      get scale() {
        return rendererRef.current?.currentScale || 1
      },
      get rotationSpeed() {
        return rendererRef.current?.rotationSpeed || DEFAULT_ROTATION_SPEED
      },
    }
    cycloneControls.set(id, control)
  }

  const updateMovementPosition = () => {
    const currentPath = pathRef.current
    if (!currentPath || currentPath.length < 2 || !isMovingRef.current || !map) {
      return
    }

    const elapsed = performance.now() - movementStartTimeRef.current
    let progress = Math.min(elapsed / durationRef.current, 1)

    if (progress >= 1) {
      if (loopRef.current) {
        movementStartTimeRef.current = performance.now()
        progress = 0
      } else {
        isMovingRef.current = false
        progress = 1
      }
    }

    progressRef.current = progress
    const newPosition = getPositionOnPath(currentPath, progress)

    const source = map.getSource(sourceId)
    if (source && "setData" in source) {
      ;(source as mapboxgl.GeoJSONSource).setData({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: { type: "Point", coordinates: newPosition },
            properties: {},
          },
        ],
      })
    }
  }

  const addCycloneLayers = (initialCoordinates: MapCoordinates) => {
    if (!map) {
      return
    }

    if (!map.isStyleLoaded() || !map.hasImage(id)) {
      retryFrameRef.current = requestAnimationFrame(() => {
        return addCycloneLayers(initialCoordinates)
      })
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
              geometry: { type: "Point", coordinates: initialCoordinates },
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

  useEffect(() => {
    if (!isLoaded || !map) {
      return
    }

    const cycloneRenderer = createCycloneRenderer(
      size,
      intensity,
      scale,
      particleCount,
      funnelColor,
      debrisColor,
      rotationSpeed
    )
    rendererRef.current = cycloneRenderer

    if (!map.hasImage(id)) {
      map.addImage(id, cycloneRenderer, { pixelRatio: 2 })
    }

    registerControl()

    if (autoStart) {
      cycloneRenderer.start()
      if (pathRef.current && pathRef.current.length >= 2) {
        movementStartTimeRef.current = performance.now()
        isMovingRef.current = true
      }
    }

    const animate = () => {
      const renderer = rendererRef.current
      const isActive = renderer?.isActive || false
      const isTransitioning = renderer ? renderer.currentIntensity !== renderer.targetIntensity : false

      if (isActive || isTransitioning) {
        updateMovementPosition()
        map.triggerRepaint()
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }
    animationFrameRef.current = requestAnimationFrame(animate)

    const handleStyleLoad = () => {
      if (!map.hasImage(id)) {
        map.addImage(id, cycloneRenderer, { pixelRatio: 2 })
      }
    }

    map.on("style.load", handleStyleLoad)

    return () => {
      map.off("style.load", handleStyleLoad)
      cycloneControls.delete(id)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (!map || !map.getStyle()) {
        return
      }
      if (map.hasImage(id)) {
        map.removeImage(id)
      }
    }
  }, [map, isLoaded, id, size, intensity, scale, particleCount, funnelColor, debrisColor, autoStart])

  useEffect(() => {
    rendererRef.current?.setRotationSpeed(rotationSpeed)
  }, [rotationSpeed])

  useEffect(() => {
    if (!isLoaded || !map) {
      return
    }

    const initialCoordinates = path && path.length >= 2 ? path[0] : coordinates
    addCycloneLayers(initialCoordinates)

    const handleStyleLoad = () => {
      addCycloneLayers(initialCoordinates)
    }

    map.on("style.load", handleStyleLoad)

    return () => {
      map.off("style.load", handleStyleLoad)
      if (retryFrameRef.current) {
        cancelAnimationFrame(retryFrameRef.current)
      }
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
  }, [map, isLoaded, coordinates, path, id, sourceId, layerId])

  return null
}

export const useCycloneControl = (id: string): CycloneControl | null => {
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

  return cycloneControls.get(id) || null
}

const hexToRgb = (hex: string): RgbColor => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  if (!result) {
    return { r: 139, g: 157, b: 195 }
  }

  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  }
}

const createFunnelParticle = (size: number): CycloneParticle => {
  const height = Math.random()
  const baseRadius = size * FUNNEL_BASE_RADIUS_RATIO
  const topRadius = size * FUNNEL_TOP_RADIUS_RATIO
  const radius = baseRadius + (topRadius - baseRadius) * height

  return {
    angle: Math.random() * Math.PI * 2,
    radius: radius * (FUNNEL_RADIUS_VARIATION_MIN + Math.random() * FUNNEL_RADIUS_VARIATION_RANGE),
    height,
    angularVelocity: FUNNEL_ANGULAR_VELOCITY_BASE + Math.random() * FUNNEL_ANGULAR_VELOCITY_RANGE,
    verticalVelocity: FUNNEL_VERTICAL_VELOCITY_BASE + Math.random() * FUNNEL_VERTICAL_VELOCITY_RANGE,
    size: FUNNEL_SIZE_BASE + Math.random() * FUNNEL_SIZE_RANGE,
    opacity: FUNNEL_OPACITY_BASE + Math.random() * FUNNEL_OPACITY_RANGE,
    type: "funnel",
  }
}

const createDebrisParticle = (size: number): CycloneParticle => {
  const height = Math.random() * DEBRIS_HEIGHT_MAX
  const baseRadius = size * DEBRIS_BASE_RADIUS_RATIO
  const topRadius = size * DEBRIS_TOP_RADIUS_RATIO
  const radius = baseRadius + (topRadius - baseRadius) * height

  return {
    angle: Math.random() * Math.PI * 2,
    radius: radius * (DEBRIS_RADIUS_VARIATION_MIN + Math.random() * DEBRIS_RADIUS_VARIATION_RANGE),
    height,
    angularVelocity: DEBRIS_ANGULAR_VELOCITY_BASE + Math.random() * DEBRIS_ANGULAR_VELOCITY_RANGE,
    verticalVelocity: DEBRIS_VERTICAL_VELOCITY_BASE + Math.random() * DEBRIS_VERTICAL_VELOCITY_RANGE,
    size: DEBRIS_SIZE_BASE + Math.random() * DEBRIS_SIZE_RANGE,
    opacity: DEBRIS_OPACITY_BASE + Math.random() * DEBRIS_OPACITY_RANGE,
    type: "debris",
  }
}

const createDustParticle = (size: number): CycloneParticle => {
  return {
    angle: Math.random() * Math.PI * 2,
    radius: size * DUST_RADIUS_BASE_RATIO + Math.random() * size * DUST_RADIUS_RANGE_RATIO,
    height: Math.random() * DUST_HEIGHT_MAX,
    angularVelocity: DUST_ANGULAR_VELOCITY_BASE + Math.random() * DUST_ANGULAR_VELOCITY_RANGE,
    verticalVelocity: DUST_VERTICAL_VELOCITY_BASE + Math.random() * DUST_VERTICAL_VELOCITY_RANGE,
    size: DUST_SIZE_BASE + Math.random() * DUST_SIZE_RANGE,
    opacity: DUST_OPACITY_BASE + Math.random() * DUST_OPACITY_RANGE,
    type: "dust",
  }
}

const calculatePathLength = (path: MapPath): number => {
  let length = 0
  for (let index = 1; index < path.length; index++) {
    const deltaLng = path[index][0] - path[index - 1][0]
    const deltaLat = path[index][1] - path[index - 1][1]
    length += Math.sqrt(deltaLng * deltaLng + deltaLat * deltaLat)
  }
  return length
}

const getPositionOnPath = (path: MapPath, progress: number): MapCoordinates => {
  if (path.length < 2) {
    return path[0]
  }

  const totalLength = calculatePathLength(path)
  const targetDistance = totalLength * progress

  let accumulatedDistance = 0
  for (let index = 1; index < path.length; index++) {
    const deltaLng = path[index][0] - path[index - 1][0]
    const deltaLat = path[index][1] - path[index - 1][1]
    const segmentLength = Math.sqrt(deltaLng * deltaLng + deltaLat * deltaLat)

    if (accumulatedDistance + segmentLength >= targetDistance) {
      const segmentProgress = (targetDistance - accumulatedDistance) / segmentLength
      return [path[index - 1][0] + deltaLng * segmentProgress, path[index - 1][1] + deltaLat * segmentProgress]
    }

    accumulatedDistance += segmentLength
  }

  return path[path.length - 1]
}

const drawFunnelShape = (
  context: CanvasRenderingContext2D,
  centerX: number,
  baseY: number,
  size: number,
  funnelRgb: RgbColor,
  effectiveIntensity: number
) => {
  const funnelGradient = context.createLinearGradient(centerX, baseY, centerX, size * 0.1)
  funnelGradient.addColorStop(0, `rgba(${funnelRgb.r}, ${funnelRgb.g}, ${funnelRgb.b}, ${0.15 * effectiveIntensity})`)
  funnelGradient.addColorStop(0.5, `rgba(${funnelRgb.r}, ${funnelRgb.g}, ${funnelRgb.b}, ${0.25 * effectiveIntensity})`)
  funnelGradient.addColorStop(1, `rgba(${funnelRgb.r}, ${funnelRgb.g}, ${funnelRgb.b}, ${0.1 * effectiveIntensity})`)

  context.beginPath()
  context.moveTo(centerX - size * 0.03, baseY)
  context.quadraticCurveTo(centerX - size * 0.15, size * 0.5, centerX - size * 0.2, size * 0.15)
  context.lineTo(centerX + size * 0.2, size * 0.15)
  context.quadraticCurveTo(centerX + size * 0.15, size * 0.5, centerX + size * 0.03, baseY)
  context.closePath()
  context.fillStyle = funnelGradient
  context.fill()
}

const updateParticle = (particle: CycloneParticle, size: number, rotationSpeed: number, effectiveIntensity: number) => {
  particle.angle += particle.angularVelocity * rotationSpeed * effectiveIntensity
  particle.height += particle.verticalVelocity * effectiveIntensity

  if (particle.height > 1) {
    particle.height = 0
    if (particle.type === "funnel") {
      const newParticle = createFunnelParticle(size)
      particle.radius = newParticle.radius
      particle.size = newParticle.size
    } else if (particle.type === "debris") {
      const newParticle = createDebrisParticle(size)
      particle.radius = newParticle.radius
      particle.size = newParticle.size
    }
  }

  if (particle.type === "dust" && particle.height > DUST_HEIGHT_MAX) {
    particle.height = 0
    particle.angle = Math.random() * Math.PI * 2
  }
}

const calculateParticleRadius = (particle: CycloneParticle, size: number): number => {
  const baseRadius = size * FUNNEL_BASE_RADIUS_RATIO
  const topRadius = size * FUNNEL_TOP_RADIUS_RATIO
  const currentRadius = baseRadius + (topRadius - baseRadius) * particle.height

  if (particle.type === "debris") {
    return currentRadius * DEBRIS_RADIUS_MULTIPLIER
  }

  if (particle.type === "dust") {
    return size * DUST_RADIUS_BASE + particle.height * size * DUST_RADIUS_HEIGHT_FACTOR
  }

  return currentRadius
}

const drawParticle = (
  context: CanvasRenderingContext2D,
  particle: CycloneParticle,
  centerX: number,
  baseY: number,
  size: number,
  funnelRgb: RgbColor,
  debrisRgb: RgbColor,
  effectiveIntensity: number
) => {
  const particleRadius = calculateParticleRadius(particle, size)
  const wobble = Math.sin(particle.angle * WOBBLE_FREQUENCY) * WOBBLE_FACTOR * effectiveIntensity
  const finalRadius = particleRadius * (1 + wobble)

  const particleX = centerX + Math.cos(particle.angle) * finalRadius * effectiveIntensity
  const particleY = baseY - particle.height * size * PARTICLE_HEIGHT_MULTIPLIER
  const alpha = particle.opacity * effectiveIntensity
  const color = particle.type === "funnel" ? funnelRgb : debrisRgb

  const gradient = context.createRadialGradient(
    particleX,
    particleY,
    0,
    particleX,
    particleY,
    particle.size * effectiveIntensity
  )

  if (particle.type === "dust") {
    gradient.addColorStop(0, `rgba(${debrisRgb.r}, ${debrisRgb.g}, ${debrisRgb.b}, ${alpha * 0.5})`)
    gradient.addColorStop(1, `rgba(${debrisRgb.r}, ${debrisRgb.g}, ${debrisRgb.b}, 0)`)
  } else {
    gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`)
    gradient.addColorStop(0.6, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.5})`)
    gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`)
  }

  context.beginPath()
  context.arc(particleX, particleY, particle.size * effectiveIntensity, 0, Math.PI * 2)
  context.fillStyle = gradient
  context.fill()
}

const drawDustCloud = (
  context: CanvasRenderingContext2D,
  centerX: number,
  baseY: number,
  size: number,
  debrisRgb: RgbColor,
  effectiveIntensity: number
) => {
  const dustGradient = context.createRadialGradient(
    centerX,
    baseY,
    0,
    centerX,
    baseY,
    size * DUST_CLOUD_RADIUS_RATIO * effectiveIntensity
  )
  dustGradient.addColorStop(0, `rgba(${debrisRgb.r}, ${debrisRgb.g}, ${debrisRgb.b}, ${0.4 * effectiveIntensity})`)
  dustGradient.addColorStop(0.5, `rgba(${debrisRgb.r}, ${debrisRgb.g}, ${debrisRgb.b}, ${0.2 * effectiveIntensity})`)
  dustGradient.addColorStop(1, `rgba(${debrisRgb.r}, ${debrisRgb.g}, ${debrisRgb.b}, 0)`)

  context.beginPath()
  context.ellipse(
    centerX,
    baseY,
    size * DUST_CLOUD_RADIUS_RATIO * effectiveIntensity,
    size * DUST_CLOUD_HEIGHT_RATIO * effectiveIntensity,
    0,
    0,
    Math.PI * 2
  )
  context.fillStyle = dustGradient
  context.fill()
}

const transitionIntensity = (renderer: CycloneRenderer) => {
  if (renderer.currentIntensity < renderer.targetIntensity) {
    renderer.currentIntensity = Math.min(renderer.targetIntensity, renderer.currentIntensity + INTENSITY_INCREASE_RATE)
  } else if (renderer.currentIntensity > renderer.targetIntensity) {
    renderer.currentIntensity = Math.max(renderer.targetIntensity, renderer.currentIntensity - INTENSITY_DECREASE_RATE)
  }
}

const transitionScale = (renderer: CycloneRenderer) => {
  if (renderer.currentScale < renderer.targetScale) {
    renderer.currentScale = Math.min(renderer.targetScale, renderer.currentScale + SCALE_TRANSITION_RATE)
  } else if (renderer.currentScale > renderer.targetScale) {
    renderer.currentScale = Math.max(renderer.targetScale, renderer.currentScale - SCALE_TRANSITION_RATE)
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

const createCycloneRenderer = (
  size: number,
  intensity: number,
  initialScale: number,
  particleCount: number,
  funnelColor: string,
  debrisColor: string,
  rotationSpeed: number
): CycloneRenderer => {
  const funnelRgb = hexToRgb(funnelColor)
  const debrisRgb = hexToRgb(debrisColor)
  const centerX = size / 2
  const baseY = size * BASE_Y_RATIO

  const renderer: CycloneRenderer = {
    width: size,
    height: size,
    data: new Uint8ClampedArray(size * size * 4),
    particles: [],
    isActive: false,
    startTime: 0,
    currentIntensity: 0,
    targetIntensity: intensity,
    currentScale: initialScale,
    targetScale: initialScale,
    rotationSpeed,

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

      this.particles = []
      const funnelCount = Math.floor(particleCount * FUNNEL_PARTICLE_RATIO)
      const debrisCount = Math.floor(particleCount * DEBRIS_PARTICLE_RATIO)
      const dustCount = particleCount - funnelCount - debrisCount

      for (let index = 0; index < funnelCount; index++) {
        this.particles.push(createFunnelParticle(size))
      }
      for (let index = 0; index < debrisCount; index++) {
        this.particles.push(createDebrisParticle(size))
      }
      for (let index = 0; index < dustCount; index++) {
        this.particles.push(createDustParticle(size))
      }

      this.isActive = true
      this.startTime = performance.now()
      this.targetIntensity = intensity
    },

    stop() {
      this.targetIntensity = 0
    },

    setIntensity(newIntensity: number) {
      this.targetIntensity = Math.max(0, Math.min(MAX_INTENSITY, newIntensity))
    },

    setScale(newScale: number, instant?: boolean) {
      const clampedScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale))
      this.targetScale = clampedScale
      if (instant) {
        this.currentScale = clampedScale
      }
    },

    setRotationSpeed(speed: number) {
      this.rotationSpeed = Math.max(MIN_ROTATION_SPEED, Math.min(MAX_ROTATION_SPEED, speed))
    },

    render() {
      if (!this.context) {
        return false
      }

      this.context.clearRect(0, 0, this.width, this.height)
      transitionIntensity(this)
      transitionScale(this)

      if (this.currentIntensity <= 0 && this.targetIntensity <= 0) {
        this.isActive = false
        this.data = this.context.getImageData(0, 0, this.width, this.height).data
        return true
      }

      const effectiveIntensity = this.currentIntensity
      const effectiveScale = this.currentScale
      this.context.save()
      this.context.translate(centerX, baseY)
      this.context.scale(effectiveScale, effectiveScale)
      this.context.translate(-centerX, -baseY)

      drawFunnelShape(this.context, centerX, baseY, size, funnelRgb, effectiveIntensity)

      for (let particleIndex = 0; particleIndex < this.particles.length; particleIndex++) {
        const particle = this.particles[particleIndex]
        updateParticle(particle, size, this.rotationSpeed, effectiveIntensity)
        drawParticle(this.context, particle, centerX, baseY, size, funnelRgb, debrisRgb, effectiveIntensity)
      }

      drawDustCloud(this.context, centerX, baseY, size, debrisRgb, effectiveIntensity)

      this.context.restore()

      fadeCanvasEdges(this.context, this.width, this.height)
      this.data = this.context.getImageData(0, 0, this.width, this.height).data

      return true
    },
  }

  return renderer
}
