"use client"

import { useEffect, useId, useRef, useState, useCallback } from "react"
import { useMap } from "./hooks"
import type { MapCoordinates } from "./types"

type SteamParticle = {
  x: number
  y: number
  velocityX: number
  velocityY: number
  radius: number
  life: number
  maxLife: number
  opacity: number
}

type MapSteamProps = {
  id?: string
  coordinates: MapCoordinates
  size?: number
  intensity?: number
  particleCount?: number
  color?: string
  drift?: number
  riseSpeed?: number
  autoStart?: boolean
}

type SteamRenderer = {
  width: number
  height: number
  data: Uint8ClampedArray
  context?: CanvasRenderingContext2D
  particles: SteamParticle[]
  isActive: boolean
  currentIntensity: number
  onAdd: () => void
  render: () => boolean
  start: () => void
  stop: () => void
  setIntensity: (intensity: number) => void
}

type RgbColor = {
  red: number
  green: number
  blue: number
}

type SteamControl = {
  start: () => void
  stop: () => void
  setIntensity: (intensity: number) => void
  isActive: boolean
}

const DEFAULT_SIZE = 100
const DEFAULT_INTENSITY = 1
const DEFAULT_PARTICLE_COUNT = 40
const DEFAULT_COLOR = "#ffffff"
const DEFAULT_DRIFT = 0.4
const DEFAULT_RISE_SPEED = 1
const CONTROL_UPDATE_INTERVAL = 100

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

const createParticle = (
  centerX: number,
  baseY: number,
  intensity: number,
  drift: number,
  riseSpeed: number
): SteamParticle => {
  const spreadX = 20 * intensity

  return {
    x: centerX + (Math.random() - 0.5) * spreadX,
    y: baseY + Math.random() * 10,
    velocityX: (Math.random() - 0.5) * drift,
    velocityY: -riseSpeed * (0.8 + Math.random() * 0.4),
    radius: 6 + Math.random() * 10 * intensity,
    life: 0,
    maxLife: 60 + Math.random() * 40,
    opacity: 0.3 + Math.random() * 0.4,
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

const createSteamRenderer = (
  size: number,
  intensity: number,
  particleCount: number,
  color: string,
  drift: number,
  riseSpeed: number
): SteamRenderer => {
  const rgb = hexToRgb(color)
  const centerX = size / 2
  const baseY = size * 0.85

  const renderer: SteamRenderer = {
    width: size,
    height: size,
    data: new Uint8ClampedArray(size * size * 4),
    particles: [],
    isActive: false,
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
      this.particles = []

      for (let index = 0; index < particleCount; index++) {
        const particle = createParticle(centerX, baseY, this.currentIntensity, drift, riseSpeed)
        particle.life = Math.random() * particle.maxLife
        this.particles.push(particle)
      }
    },

    stop() {
      this.isActive = false
      this.particles = []
    },

    setIntensity(newIntensity: number) {
      this.currentIntensity = Math.max(0.1, Math.min(3, newIntensity))
    },

    render() {
      if (!this.context) {
        return false
      }

      this.context.clearRect(0, 0, this.width, this.height)

      if (!this.isActive || this.particles.length === 0) {
        this.data = this.context.getImageData(0, 0, this.width, this.height).data
        return true
      }

      for (let index = 0; index < this.particles.length; index++) {
        const particle = this.particles[index]

        particle.x += particle.velocityX + (Math.random() - 0.5) * 0.3
        particle.y += particle.velocityY
        particle.velocityX *= 0.99
        particle.radius += 0.1
        particle.life++

        if (particle.life >= particle.maxLife) {
          this.particles[index] = createParticle(centerX, baseY, this.currentIntensity, drift, riseSpeed)
          continue
        }

        const lifeRatio = particle.life / particle.maxLife
        const fadeIn = Math.min(lifeRatio * 4, 1)
        const fadeOut = 1 - Math.pow(lifeRatio, 2)
        const alpha = particle.opacity * fadeIn * fadeOut * this.currentIntensity

        const gradient = this.context.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius
        )

        gradient.addColorStop(0, `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, ${alpha * 0.8})`)
        gradient.addColorStop(0.4, `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, ${alpha * 0.5})`)
        gradient.addColorStop(1, `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, 0)`)

        this.context.beginPath()
        this.context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        this.context.fillStyle = gradient
        this.context.fill()
      }

      fadeCanvasEdges(this.context, this.width, this.height)
      this.data = this.context.getImageData(0, 0, this.width, this.height).data

      return true
    },
  }

  return renderer
}

const steamControls = new Map<string, SteamControl>()

export const MapSteam = ({
  id,
  coordinates,
  size = DEFAULT_SIZE,
  intensity = DEFAULT_INTENSITY,
  particleCount = DEFAULT_PARTICLE_COUNT,
  color = DEFAULT_COLOR,
  drift = DEFAULT_DRIFT,
  riseSpeed = DEFAULT_RISE_SPEED,
  autoStart = true,
}: MapSteamProps) => {
  const { map, isLoaded } = useMap()
  const animationFrameRef = useRef<number | null>(null)
  const rendererRef = useRef<SteamRenderer | null>(null)
  const autoId = useId()
  const controlId = id ?? autoId
  const sourceId = `${controlId}-source`
  const layerId = `${controlId}-layer`

  const start = useCallback(() => {
    if (rendererRef.current) {
      rendererRef.current.start()
    }
  }, [])

  const stop = useCallback(() => {
    if (rendererRef.current) {
      rendererRef.current.stop()
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

    const steamRenderer = createSteamRenderer(size, intensity, particleCount, color, drift, riseSpeed)
    rendererRef.current = steamRenderer

    const control: SteamControl = {
      start,
      stop,
      setIntensity,
      get isActive() {
        return rendererRef.current?.isActive || false
      },
    }
    steamControls.set(controlId, control)

    const addImage = () => {
      if (!map.hasImage(controlId)) {
        map.addImage(controlId, steamRenderer, { pixelRatio: 2 })
      }
    }

    addImage()

    if (autoStart) {
      steamRenderer.start()
    }

    const animate = () => {
      map.triggerRepaint()
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    animationFrameRef.current = requestAnimationFrame(animate)

    const handleStyleLoad = () => {
      addImage()
    }

    map.on("style.load", handleStyleLoad)

    return () => {
      map.off("style.load", handleStyleLoad)
      steamControls.delete(controlId)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
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
    intensity,
    particleCount,
    color,
    drift,
    riseSpeed,
    autoStart,
    start,
    stop,
    setIntensity,
  ])

  useEffect(() => {
    if (!isLoaded || !map) {
      return
    }

    let pollFrameId: number

    const addLayers = () => {
      if (!map.isStyleLoaded() || !map.hasImage(controlId)) {
        pollFrameId = requestAnimationFrame(addLayers)
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
            "icon-image": controlId,
            "icon-allow-overlap": true,
          },
        })
      }
    }

    pollFrameId = requestAnimationFrame(addLayers)

    const handleStyleLoad = () => {
      addLayers()
    }

    map.on("style.load", handleStyleLoad)

    return () => {
      cancelAnimationFrame(pollFrameId)
      map.off("style.load", handleStyleLoad)
      try {
        if (map.isStyleLoaded()) {
          if (map.getLayer(layerId)) {
            map.removeLayer(layerId)
          }
          if (map.getSource(sourceId)) {
            map.removeSource(sourceId)
          }
        }
      } catch {
        // Map may already be destroyed during unmount
      }
    }
  }, [map, isLoaded, coordinates, controlId, sourceId, layerId])

  return null
}

export const useSteamControl = (id: string): SteamControl | null => {
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

  return steamControls.get(id) || null
}
