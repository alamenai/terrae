"use client"

import { useEffect, useId, useRef, useState, useCallback } from "react"
import { createPortal } from "react-dom"
import { useMap } from "./hooks"

type RgbColor = {
  red: number
  green: number
  blue: number
}

type SnowParticle = {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  wobble: number
  wobbleSpeed: number
  wobbleAmount: number
}

type SnowControl = {
  start: () => void
  stop: () => void
  setIntensity: (intensity: number) => void
  isActive: boolean
}

type SnowOverlayProps = {
  intensity: number
  particleCount: number
  color: string
  windSpeed: number
  windDirection: number
  fallSpeed: number
  isActive: boolean
  onControlReady: (control: SnowControl) => void
}

type MapSnowProps = {
  id?: string
  intensity?: number
  particleCount?: number
  color?: string
  windSpeed?: number
  windDirection?: number
  fallSpeed?: number
  autoStart?: boolean
}

const DEFAULT_INTENSITY = 1
const DEFAULT_PARTICLE_COUNT = 150
const DEFAULT_COLOR = "#ffffff"
const DEFAULT_WIND_SPEED = 0.5
const DEFAULT_WIND_DIRECTION = 0
const DEFAULT_FALL_SPEED = 1

const MIN_INTENSITY = 0.1
const MAX_INTENSITY = 3
const PARTICLE_SPAWN_OFFSET = 100
const PARTICLE_MIN_SIZE = 2
const PARTICLE_SIZE_RANGE = 4
const PARTICLE_MIN_SPEED = 0.5
const PARTICLE_SPEED_RANGE = 1.5
const PARTICLE_MIN_OPACITY = 0.4
const PARTICLE_OPACITY_RANGE = 0.6
const PARTICLE_MIN_WOBBLE_SPEED = 0.01
const PARTICLE_WOBBLE_SPEED_RANGE = 0.03
const PARTICLE_MIN_WOBBLE_AMOUNT = 0.5
const PARTICLE_WOBBLE_AMOUNT_RANGE = 1.5
const BOUNDS_PADDING = 20
const DEGREES_TO_RADIANS = Math.PI / 180
const WOBBLE_DRIFT_FACTOR = 0.3
const GRADIENT_MID_OPACITY_FACTOR = 0.6
const CONTROL_UPDATE_INTERVAL = 100

const snowControls = new Map<string, SnowControl>()

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

const createParticle = (canvasWidth: number, canvasHeight: number, intensity: number): SnowParticle => {
  return {
    x: Math.random() * canvasWidth,
    y: -BOUNDS_PADDING - Math.random() * PARTICLE_SPAWN_OFFSET,
    size: PARTICLE_MIN_SIZE + Math.random() * PARTICLE_SIZE_RANGE * intensity,
    speed: PARTICLE_MIN_SPEED + Math.random() * PARTICLE_SPEED_RANGE,
    opacity: PARTICLE_MIN_OPACITY + Math.random() * PARTICLE_OPACITY_RANGE,
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: PARTICLE_MIN_WOBBLE_SPEED + Math.random() * PARTICLE_WOBBLE_SPEED_RANGE,
    wobbleAmount: PARTICLE_MIN_WOBBLE_AMOUNT + Math.random() * PARTICLE_WOBBLE_AMOUNT_RANGE,
  }
}

const updateParticlePosition = (particle: SnowParticle, windX: number, fallSpeed: number): void => {
  particle.wobble += particle.wobbleSpeed
  const wobbleOffset = Math.sin(particle.wobble) * particle.wobbleAmount

  particle.x += windX + wobbleOffset * WOBBLE_DRIFT_FACTOR
  particle.y += particle.speed * fallSpeed
}

const isParticleOutOfBounds = (particle: SnowParticle, canvasWidth: number, canvasHeight: number): boolean => {
  return (
    particle.y > canvasHeight + BOUNDS_PADDING ||
    particle.x < -BOUNDS_PADDING ||
    particle.x > canvasWidth + BOUNDS_PADDING
  )
}

const drawParticle = (
  context: CanvasRenderingContext2D,
  particle: SnowParticle,
  color: RgbColor,
  intensity: number
): void => {
  const gradient = context.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size)

  const particleOpacity = particle.opacity * intensity
  gradient.addColorStop(0, `rgba(${color.red}, ${color.green}, ${color.blue}, ${particleOpacity})`)
  gradient.addColorStop(
    0.5,
    `rgba(${color.red}, ${color.green}, ${color.blue}, ${particleOpacity * GRADIENT_MID_OPACITY_FACTOR})`
  )
  gradient.addColorStop(1, `rgba(${color.red}, ${color.green}, ${color.blue}, 0)`)

  context.beginPath()
  context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
  context.fillStyle = gradient
  context.fill()
}

const adjustParticleCount = (
  particles: SnowParticle[],
  targetCount: number,
  canvasWidth: number,
  canvasHeight: number,
  intensity: number
): SnowParticle[] => {
  if (particles.length < targetCount) {
    const toAdd = targetCount - particles.length
    for (let index = 0; index < toAdd; index++) {
      particles.push(createParticle(canvasWidth, canvasHeight, intensity))
    }
    return particles
  }

  if (particles.length > targetCount) {
    return particles.slice(0, targetCount)
  }

  return particles
}

export const MapSnow = ({
  id,
  intensity = DEFAULT_INTENSITY,
  particleCount = DEFAULT_PARTICLE_COUNT,
  color = DEFAULT_COLOR,
  windSpeed = DEFAULT_WIND_SPEED,
  windDirection = DEFAULT_WIND_DIRECTION,
  fallSpeed = DEFAULT_FALL_SPEED,
  autoStart = true,
}: MapSnowProps) => {
  const { map, isLoaded } = useMap()
  const [container, setContainer] = useState<HTMLElement | null>(null)
  const autoId = useId()
  const controlId = id ?? autoId

  const handleControlReady = (control: SnowControl) => {
    snowControls.set(controlId, control)
  }

  useEffect(() => {
    if (!map || !isLoaded) {
      return
    }

    const mapContainer = map.getContainer()
    setContainer(mapContainer)

    return () => {
      snowControls.delete(controlId)
    }
  }, [map, isLoaded, controlId])

  if (!container) {
    return null
  }

  return createPortal(
    <SnowOverlay
      intensity={intensity}
      particleCount={particleCount}
      color={color}
      windSpeed={windSpeed}
      windDirection={windDirection}
      fallSpeed={fallSpeed}
      isActive={autoStart}
      onControlReady={handleControlReady}
    />,
    container
  )
}

const SnowOverlay = ({
  intensity,
  particleCount,
  color,
  windSpeed,
  windDirection,
  fallSpeed,
  isActive: initialActive,
  onControlReady,
}: SnowOverlayProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const particlesRef = useRef<SnowParticle[]>([])
  const animationFrameRef = useRef<number | null>(null)
  const isActiveRef = useRef(initialActive)
  const intensityRef = useRef(intensity)
  const [, forceUpdate] = useState(0)

  const start = useCallback(() => {
    isActiveRef.current = true
    forceUpdate((previous) => {
      return previous + 1
    })
  }, [])

  const stop = useCallback(() => {
    isActiveRef.current = false
    forceUpdate((previous) => {
      return previous + 1
    })
  }, [])

  const setIntensity = useCallback((newIntensity: number) => {
    intensityRef.current = Math.max(MIN_INTENSITY, Math.min(MAX_INTENSITY, newIntensity))
  }, [])

  useEffect(() => {
    const control: SnowControl = {
      start,
      stop,
      setIntensity,
      get isActive() {
        return isActiveRef.current
      },
    }
    onControlReady(control)
  }, [start, stop, setIntensity, onControlReady])

  useEffect(() => {
    intensityRef.current = intensity
  }, [intensity])

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return
    }

    const context = canvas.getContext("2d")

    if (!context) {
      return
    }

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const initParticles = () => {
      particlesRef.current = []
      const count = Math.floor(particleCount * intensity)

      for (let index = 0; index < count; index++) {
        const particle = createParticle(canvas.width, canvas.height, intensity)
        particle.y = Math.random() * canvas.height
        particlesRef.current.push(particle)
      }
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)
    initParticles()

    const particleColor = hexToRgb(color)
    const windAngle = windDirection * DEGREES_TO_RADIANS
    const windX = Math.cos(windAngle) * windSpeed

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height)

      if (!isActiveRef.current) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }

      const currentIntensity = intensityRef.current
      const targetCount = Math.floor(particleCount * currentIntensity)

      particlesRef.current = adjustParticleCount(
        particlesRef.current,
        targetCount,
        canvas.width,
        canvas.height,
        currentIntensity
      )

      for (let index = 0; index < particlesRef.current.length; index++) {
        const particle = particlesRef.current[index]

        updateParticlePosition(particle, windX, fallSpeed)

        if (isParticleOutOfBounds(particle, canvas.width, canvas.height)) {
          particlesRef.current[index] = createParticle(canvas.width, canvas.height, currentIntensity)
          particlesRef.current[index].x = Math.random() * (canvas.width + BOUNDS_PADDING * 2) - BOUNDS_PADDING
          continue
        }

        drawParticle(context, particle, particleColor, currentIntensity)
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [color, windSpeed, windDirection, fallSpeed, particleCount, intensity])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 10,
      }}
    />
  )
}

export const useSnowControl = (id: string): SnowControl | null => {
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

  return snowControls.get(id) || null
}
