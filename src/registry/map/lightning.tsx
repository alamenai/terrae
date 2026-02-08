"use client"

import { useEffect, useRef, useState } from "react"
import { useMap } from "./hooks"
import type { MapCoordinates } from "./types"

type RgbColor = {
  red: number
  green: number
  blue: number
}

type LightningBranch = {
  startX: number
  startY: number
  endX: number
  endY: number
  width: number
  opacity: number
}

type LightningBolt = {
  segments: LightningBranch[]
  flashOpacity: number
  life: number
  maxLife: number
}

type LightningControl = {
  strike: () => void
  isActive: boolean
}

type LightningRenderer = {
  width: number
  height: number
  data: Uint8ClampedArray
  context?: CanvasRenderingContext2D
  bolts: LightningBolt[]
  isActive: boolean
  lastStrikeTime: number
  onAdd: () => void
  render: () => boolean
  strike: () => void
}

type MapLightningProps = {
  id: string
  coordinates: MapCoordinates
  size?: number
  boltColor?: string
  flashColor?: string
  flashIntensity?: number
  autoStrike?: boolean
  strikeInterval?: number
  boltWidth?: number
  branchProbability?: number
}

const DEFAULT_SIZE = 200
const DEFAULT_BOLT_COLOR = "#ffffff"
const DEFAULT_FLASH_COLOR = "#e0e8ff"
const DEFAULT_FLASH_INTENSITY = 0.6
const DEFAULT_STRIKE_INTERVAL = 4000
const DEFAULT_BOLT_WIDTH = 4
const DEFAULT_BRANCH_PROBABILITY = 0.3

const MIN_STRIKE_INTERVAL = 500
const BOLT_LIFETIME = 8
const FLASH_DECAY_RATE = 0.5
const SEGMENT_MIN_LENGTH = 20
const SEGMENT_MAX_LENGTH = 40
const SEGMENT_OFFSET_RANGE = 30
const BRANCH_LENGTH_FACTOR = 0.5
const BRANCH_WIDTH_FACTOR = 0.5
const BRANCH_ANGLE_RANGE = 60
const GLOW_BLUR_AMOUNT = 20
const CORE_GLOW_BLUR = 10
const DEGREES_TO_RADIANS = Math.PI / 180
const PIXEL_RATIO = 2
const CONTROL_UPDATE_INTERVAL = 50
const MAX_BRANCH_DEPTH = 3
const BRANCH_OPACITY_DECAY = 0.2
const WIDTH_DECAY_FACTOR = 0.05
const FLASH_THRESHOLD = 0.01
const OUTER_GLOW_WIDTH_MULTIPLIER = 3
const OUTER_GLOW_OPACITY_MULTIPLIER = 0.5

const lightningControls = new Map<string, LightningControl>()

export const useLightningControl = (id: string): LightningControl | null => {
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

  return lightningControls.get(id) || null
}

const hexToRgb = (hex: string): RgbColor => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  if (!result) {
    return { red: 255, green: 255, blue: 255 }
  }

  return {
    red: parseInt(result[1], 16),
    green: parseInt(result[2], 16),
    blue: parseInt(result[3], 16),
  }
}

const createLightningSegments = (
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  width: number,
  branchProbability: number,
  depth: number = 0
): LightningBranch[] => {
  const segments: LightningBranch[] = []
  const deltaX = endX - startX
  const deltaY = endY - startY
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

  if (distance < SEGMENT_MIN_LENGTH || depth > MAX_BRANCH_DEPTH) {
    segments.push({
      startX,
      startY,
      endX,
      endY,
      width,
      opacity: 1 - depth * BRANCH_OPACITY_DECAY,
    })
    return segments
  }

  const segmentCount = Math.floor(distance / (SEGMENT_MIN_LENGTH + Math.random() * SEGMENT_MAX_LENGTH))
  const points: { x: number; y: number }[] = [{ x: startX, y: startY }]

  for (let segmentIndex = 1; segmentIndex < segmentCount; segmentIndex++) {
    const ratio = segmentIndex / segmentCount
    const baseX = startX + deltaX * ratio
    const baseY = startY + deltaY * ratio

    const perpendicularX = -deltaY / distance
    const perpendicularY = deltaX / distance
    const offset = (Math.random() - 0.5) * SEGMENT_OFFSET_RANGE

    points.push({
      x: baseX + perpendicularX * offset,
      y: baseY + perpendicularY * offset,
    })
  }

  points.push({ x: endX, y: endY })

  for (let pointIndex = 0; pointIndex < points.length - 1; pointIndex++) {
    const currentPoint = points[pointIndex]
    const nextPoint = points[pointIndex + 1]

    segments.push({
      startX: currentPoint.x,
      startY: currentPoint.y,
      endX: nextPoint.x,
      endY: nextPoint.y,
      width: width * (1 - pointIndex * WIDTH_DECAY_FACTOR),
      opacity: 1 - depth * BRANCH_OPACITY_DECAY,
    })

    const shouldBranch = depth < 2 && Math.random() < branchProbability && pointIndex > 0

    if (shouldBranch) {
      const branchSegments = createBranchSegments(currentPoint, nextPoint, distance, width, branchProbability, depth)
      segments.push(...branchSegments)
    }
  }

  return segments
}

const createBranchSegments = (
  currentPoint: { x: number; y: number },
  nextPoint: { x: number; y: number },
  distance: number,
  width: number,
  branchProbability: number,
  depth: number
): LightningBranch[] => {
  const branchAngle = (Math.random() - 0.5) * BRANCH_ANGLE_RANGE * DEGREES_TO_RADIANS
  const mainAngle = Math.atan2(nextPoint.y - currentPoint.y, nextPoint.x - currentPoint.x)
  const branchDirection = mainAngle + branchAngle + (Math.random() > 0.5 ? Math.PI / 4 : -Math.PI / 4)

  const branchLength = distance * BRANCH_LENGTH_FACTOR * (0.5 + Math.random() * 0.5)
  const branchEndX = currentPoint.x + Math.cos(branchDirection) * branchLength
  const branchEndY = currentPoint.y + Math.sin(branchDirection) * branchLength

  return createLightningSegments(
    currentPoint.x,
    currentPoint.y,
    branchEndX,
    branchEndY,
    width * BRANCH_WIDTH_FACTOR,
    branchProbability * 0.5,
    depth + 1
  )
}

const createLightningBolt = (
  canvasWidth: number,
  canvasHeight: number,
  boltWidth: number,
  branchProbability: number
): LightningBolt => {
  const startX = canvasWidth * (0.3 + Math.random() * 0.4)
  const startY = 0
  const endX = canvasWidth * (0.3 + Math.random() * 0.4)
  const endY = canvasHeight * (0.7 + Math.random() * 0.3)

  const segments = createLightningSegments(startX, startY, endX, endY, boltWidth, branchProbability)

  return {
    segments,
    flashOpacity: 1,
    life: 0,
    maxLife: BOLT_LIFETIME,
  }
}

const drawFlashEffect = (
  context: CanvasRenderingContext2D,
  bolt: LightningBolt,
  flashColor: RgbColor,
  flashIntensity: number,
  canvasWidth: number,
  canvasHeight: number
): void => {
  if (bolt.flashOpacity <= FLASH_THRESHOLD) {
    return
  }

  const centerX = canvasWidth / 2
  const centerY = canvasHeight / 2
  const flashGradient = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, canvasWidth)
  const adjustedFlashOpacity = bolt.flashOpacity * flashIntensity

  flashGradient.addColorStop(
    0,
    `rgba(${flashColor.red}, ${flashColor.green}, ${flashColor.blue}, ${adjustedFlashOpacity})`
  )
  flashGradient.addColorStop(
    0.5,
    `rgba(${flashColor.red}, ${flashColor.green}, ${flashColor.blue}, ${adjustedFlashOpacity * 0.3})`
  )
  flashGradient.addColorStop(1, `rgba(${flashColor.red}, ${flashColor.green}, ${flashColor.blue}, 0)`)

  context.fillStyle = flashGradient
  context.fillRect(0, 0, canvasWidth, canvasHeight)
}

const drawBoltSegments = (
  context: CanvasRenderingContext2D,
  bolt: LightningBolt,
  boltColor: RgbColor,
  fadeOpacity: number
): void => {
  context.save()
  context.shadowColor = `rgba(${boltColor.red}, ${boltColor.green}, ${boltColor.blue}, ${fadeOpacity})`
  context.shadowBlur = GLOW_BLUR_AMOUNT
  context.lineCap = "round"
  context.lineJoin = "round"

  for (const segment of bolt.segments) {
    const segmentOpacity = segment.opacity * fadeOpacity

    context.beginPath()
    context.moveTo(segment.startX, segment.startY)
    context.lineTo(segment.endX, segment.endY)
    context.strokeStyle = `rgba(${boltColor.red}, ${boltColor.green}, ${boltColor.blue}, ${segmentOpacity * OUTER_GLOW_OPACITY_MULTIPLIER})`
    context.lineWidth = segment.width * OUTER_GLOW_WIDTH_MULTIPLIER
    context.stroke()
  }

  context.shadowBlur = CORE_GLOW_BLUR

  for (const segment of bolt.segments) {
    const segmentOpacity = segment.opacity * fadeOpacity

    context.beginPath()
    context.moveTo(segment.startX, segment.startY)
    context.lineTo(segment.endX, segment.endY)
    context.strokeStyle = `rgba(255, 255, 255, ${segmentOpacity})`
    context.lineWidth = segment.width
    context.stroke()
  }

  context.restore()
}

const drawLightningBolt = (
  context: CanvasRenderingContext2D,
  bolt: LightningBolt,
  boltColor: RgbColor,
  canvasWidth: number,
  canvasHeight: number,
  flashColor: RgbColor,
  flashIntensity: number
): void => {
  const lifeRatio = bolt.life / bolt.maxLife
  const fadeOpacity = 1 - lifeRatio

  drawFlashEffect(context, bolt, flashColor, flashIntensity, canvasWidth, canvasHeight)
  drawBoltSegments(context, bolt, boltColor, fadeOpacity)
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

const createLightningRenderer = (
  size: number,
  boltColor: string,
  flashColor: string,
  flashIntensity: number,
  autoStrike: boolean,
  strikeInterval: number,
  boltWidth: number,
  branchProbability: number
): LightningRenderer => {
  const boltRgb = hexToRgb(boltColor)
  const flashRgb = hexToRgb(flashColor)

  const renderer: LightningRenderer = {
    width: size,
    height: size,
    data: new Uint8ClampedArray(size * size * 4),
    bolts: [],
    isActive: false,
    lastStrikeTime: 0,

    onAdd() {
      const canvas = document.createElement("canvas")
      canvas.width = this.width
      canvas.height = this.height
      this.context = canvas.getContext("2d", { willReadFrequently: true }) || undefined
    },

    strike() {
      const bolt = createLightningBolt(this.width, this.height, boltWidth, branchProbability)
      this.bolts.push(bolt)
      this.isActive = true
      this.lastStrikeTime = performance.now()
    },

    render() {
      if (!this.context) {
        return false
      }

      this.context.clearRect(0, 0, this.width, this.height)

      const now = performance.now()

      if (autoStrike && now - this.lastStrikeTime > strikeInterval) {
        this.strike()
      }

      for (let boltIndex = this.bolts.length - 1; boltIndex >= 0; boltIndex--) {
        const bolt = this.bolts[boltIndex]
        bolt.life++
        bolt.flashOpacity *= FLASH_DECAY_RATE

        if (bolt.life >= bolt.maxLife) {
          this.bolts.splice(boltIndex, 1)
          continue
        }

        drawLightningBolt(this.context, bolt, boltRgb, this.width, this.height, flashRgb, flashIntensity)
      }

      this.isActive = this.bolts.length > 0
      fadeCanvasEdges(this.context, this.width, this.height)
      this.data = this.context.getImageData(0, 0, this.width, this.height).data

      return true
    },
  }

  return renderer
}

const initializeRenderer = (map: mapboxgl.Map, id: string, renderer: LightningRenderer, strike: () => void): void => {
  const control: LightningControl = {
    strike,
    get isActive() {
      return renderer.isActive
    },
  }
  lightningControls.set(id, control)

  if (!map.hasImage(id)) {
    map.addImage(id, renderer, { pixelRatio: PIXEL_RATIO })
  }
}

const cleanupRenderer = (map: mapboxgl.Map, id: string, animationFrameId: number | null): void => {
  lightningControls.delete(id)

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

export const MapLightning = ({
  id,
  coordinates,
  size = DEFAULT_SIZE,
  boltColor = DEFAULT_BOLT_COLOR,
  flashColor = DEFAULT_FLASH_COLOR,
  flashIntensity = DEFAULT_FLASH_INTENSITY,
  autoStrike = true,
  strikeInterval = DEFAULT_STRIKE_INTERVAL,
  boltWidth = DEFAULT_BOLT_WIDTH,
  branchProbability = DEFAULT_BRANCH_PROBABILITY,
}: MapLightningProps) => {
  const { map, isLoaded } = useMap()
  const animationFrameRef = useRef<number | null>(null)
  const rendererRef = useRef<LightningRenderer | null>(null)

  const sourceId = `${id}-source`
  const layerId = `${id}-layer`
  const clampedInterval = Math.max(MIN_STRIKE_INTERVAL, strikeInterval)

  const strikeRef = useRef(() => {
    if (rendererRef.current) {
      rendererRef.current.strike()
    }
  })

  useEffect(() => {
    if (!isLoaded || !map) {
      return
    }

    const renderer = createLightningRenderer(
      size,
      boltColor,
      flashColor,
      flashIntensity,
      autoStrike,
      clampedInterval,
      boltWidth,
      branchProbability
    )
    rendererRef.current = renderer

    initializeRenderer(map, id, renderer, strikeRef.current)

    const animate = () => {
      const shouldRepaint = renderer.bolts.length > 0 || autoStrike
      if (shouldRepaint) {
        map.triggerRepaint()
      }
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    animationFrameRef.current = requestAnimationFrame(animate)

    const handleStyleLoad = () => {
      if (!map.hasImage(id)) {
        map.addImage(id, renderer, { pixelRatio: PIXEL_RATIO })
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
    size,
    boltColor,
    flashColor,
    flashIntensity,
    autoStrike,
    clampedInterval,
    boltWidth,
    branchProbability,
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
