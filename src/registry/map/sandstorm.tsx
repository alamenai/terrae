"use client"

import { useEffect, useId, useRef, useState, useCallback } from "react"
import { createPortal } from "react-dom"
import { useMap } from "./hooks"

type RgbColor = {
  red: number
  green: number
  blue: number
}

type SandParticle = {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  wobble: number
  wobbleSpeed: number
}

type SandstormControl = {
  start: () => void
  stop: () => void
  setIntensity: (intensity: number) => void
  isActive: boolean
}

type SandstormOverlayProps = {
  intensity: number
  particleCount: number
  color: string
  windSpeed: number
  windDirection: number
  visibility: number
  turbulence: number
  isActive: boolean
  onControlReady: (control: SandstormControl) => void
}

type MapSandstormProps = {
  id?: string
  intensity?: number
  particleCount?: number
  color?: string
  windSpeed?: number
  windDirection?: number
  visibility?: number
  turbulence?: number
  autoStart?: boolean
}

const DEFAULT_INTENSITY = 1
const DEFAULT_PARTICLE_COUNT = 200
const DEFAULT_COLOR = "#d4a574"
const DEFAULT_WIND_SPEED = 4
const DEFAULT_WIND_DIRECTION = 0
const DEFAULT_VISIBILITY = 0.3
const DEFAULT_TURBULENCE = 0.5

const MIN_INTENSITY = 0.1
const MAX_INTENSITY = 3
const BOUNDS_PADDING = 10
const PARTICLE_MIN_SIZE = 1
const PARTICLE_SIZE_RANGE = 3
const PARTICLE_MIN_SPEED = 2
const PARTICLE_SPEED_RANGE = 4
const PARTICLE_MIN_OPACITY = 0.3
const PARTICLE_OPACITY_RANGE = 0.5
const PARTICLE_MIN_WOBBLE_SPEED = 0.02
const PARTICLE_WOBBLE_SPEED_RANGE = 0.04
const DEGREES_TO_RADIANS = Math.PI / 180
const TURBULENCE_MULTIPLIER = 20
const VERTICAL_WOBBLE_FACTOR = 0.1
const HAZE_OPACITY_FACTOR = 0.4
const CONTROL_UPDATE_INTERVAL = 100
const DEFAULT_SAND_RGB: RgbColor = { red: 212, green: 165, blue: 116 }

const sandstormControls = new Map<string, SandstormControl>()

const hexToRgb = (hex: string): RgbColor => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  if (!result) {
    return DEFAULT_SAND_RGB
  }

  return {
    red: parseInt(result[1], 16),
    green: parseInt(result[2], 16),
    blue: parseInt(result[3], 16),
  }
}

const createParticle = (
  canvasWidth: number,
  canvasHeight: number,
  windDirection: number,
  intensity: number
): SandParticle => {
  const angle = windDirection * DEGREES_TO_RADIANS
  const startFromLeft = Math.cos(angle) > 0

  return {
    x: startFromLeft ? -BOUNDS_PADDING : canvasWidth + BOUNDS_PADDING,
    y: Math.random() * canvasHeight,
    size: PARTICLE_MIN_SIZE + Math.random() * PARTICLE_SIZE_RANGE * intensity,
    speed: PARTICLE_MIN_SPEED + Math.random() * PARTICLE_SPEED_RANGE,
    opacity: PARTICLE_MIN_OPACITY + Math.random() * PARTICLE_OPACITY_RANGE,
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: PARTICLE_MIN_WOBBLE_SPEED + Math.random() * PARTICLE_WOBBLE_SPEED_RANGE,
  }
}

const isParticleOutOfBounds = (
  particle: SandParticle,
  canvasWidth: number,
  canvasHeight: number,
  cosAngle: number
): boolean => {
  return (
    (cosAngle > 0 && particle.x > canvasWidth + BOUNDS_PADDING) ||
    (cosAngle < 0 && particle.x < -BOUNDS_PADDING) ||
    particle.y < -BOUNDS_PADDING ||
    particle.y > canvasHeight + BOUNDS_PADDING
  )
}

const updateParticlePosition = (
  particle: SandParticle,
  cosAngle: number,
  sinAngle: number,
  windSpeed: number,
  turbulence: number
): void => {
  particle.wobble += particle.wobbleSpeed
  const wobbleOffset = Math.sin(particle.wobble) * turbulence * TURBULENCE_MULTIPLIER

  particle.x += cosAngle * particle.speed * windSpeed
  particle.y += sinAngle * particle.speed * windSpeed + wobbleOffset * VERTICAL_WOBBLE_FACTOR
}

const drawParticle = (
  context: CanvasRenderingContext2D,
  particle: SandParticle,
  color: RgbColor,
  intensity: number
): void => {
  const gradient = context.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size)

  const particleOpacity = particle.opacity * intensity
  gradient.addColorStop(0, `rgba(${color.red}, ${color.green}, ${color.blue}, ${particleOpacity})`)
  gradient.addColorStop(1, `rgba(${color.red}, ${color.green}, ${color.blue}, 0)`)

  context.beginPath()
  context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
  context.fillStyle = gradient
  context.fill()
}

const drawHaze = (
  context: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  color: RgbColor,
  visibility: number,
  intensity: number
): void => {
  const hazeOpacity = visibility * intensity * HAZE_OPACITY_FACTOR
  context.fillStyle = `rgba(${color.red}, ${color.green}, ${color.blue}, ${hazeOpacity})`
  context.fillRect(0, 0, canvasWidth, canvasHeight)
}

const adjustParticleCount = (
  particles: SandParticle[],
  targetCount: number,
  canvasWidth: number,
  canvasHeight: number,
  windDirection: number,
  intensity: number
): SandParticle[] => {
  if (particles.length < targetCount) {
    const toAdd = targetCount - particles.length
    for (let index = 0; index < toAdd; index++) {
      particles.push(createParticle(canvasWidth, canvasHeight, windDirection, intensity))
    }
    return particles
  }

  if (particles.length > targetCount) {
    return particles.slice(0, targetCount)
  }

  return particles
}

export const MapSandstorm = ({
  id,
  intensity = DEFAULT_INTENSITY,
  particleCount = DEFAULT_PARTICLE_COUNT,
  color = DEFAULT_COLOR,
  windSpeed = DEFAULT_WIND_SPEED,
  windDirection = DEFAULT_WIND_DIRECTION,
  visibility = DEFAULT_VISIBILITY,
  turbulence = DEFAULT_TURBULENCE,
  autoStart = true,
}: MapSandstormProps) => {
  const { map, isLoaded } = useMap()
  const [container, setContainer] = useState<HTMLElement | null>(null)
  const autoId = useId()
  const controlId = id ?? autoId

  const handleControlReady = (control: SandstormControl) => {
    sandstormControls.set(controlId, control)
  }

  useEffect(() => {
    if (!map || !isLoaded) {
      return
    }

    const mapContainer = map.getContainer()
    setContainer(mapContainer)

    return () => {
      sandstormControls.delete(controlId)
    }
  }, [map, isLoaded, controlId])

  if (!container) {
    return null
  }

  return createPortal(
    <SandstormOverlay
      intensity={intensity}
      particleCount={particleCount}
      color={color}
      windSpeed={windSpeed}
      windDirection={windDirection}
      visibility={visibility}
      turbulence={turbulence}
      isActive={autoStart}
      onControlReady={handleControlReady}
    />,
    container
  )
}

const SandstormOverlay = ({
  intensity,
  particleCount,
  color,
  windSpeed,
  windDirection,
  visibility,
  turbulence,
  isActive: initialActive,
  onControlReady,
}: SandstormOverlayProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const particlesRef = useRef<SandParticle[]>([])
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
    const control: SandstormControl = {
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
        const particle = createParticle(canvas.width, canvas.height, windDirection, intensity)
        particle.x = Math.random() * canvas.width
        particlesRef.current.push(particle)
      }
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)
    initParticles()

    const particleColor = hexToRgb(color)
    const angle = windDirection * DEGREES_TO_RADIANS
    const cosAngle = Math.cos(angle)
    const sinAngle = Math.sin(angle)

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
        windDirection,
        currentIntensity
      )

      drawHaze(context, canvas.width, canvas.height, particleColor, visibility, currentIntensity)

      for (let index = 0; index < particlesRef.current.length; index++) {
        const particle = particlesRef.current[index]

        updateParticlePosition(particle, cosAngle, sinAngle, windSpeed, turbulence)

        if (isParticleOutOfBounds(particle, canvas.width, canvas.height, cosAngle)) {
          particlesRef.current[index] = createParticle(canvas.width, canvas.height, windDirection, currentIntensity)
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
  }, [color, windSpeed, windDirection, visibility, turbulence, particleCount, intensity])

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

export const useSandstormControl = (id: string): SandstormControl | null => {
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

  return sandstormControls.get(id) || null
}
