"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useMap } from "./hooks"
import type { MapCoordinates } from "./types"

type VolcanoParticle = {
  x: number
  y: number
  velocityX: number
  velocityY: number
  radius: number
  life: number
  maxLife: number
  type: "lava" | "ash" | "ember"
}

type LavaSpreadSource = {
  x: number
  y: number
  particles: VolcanoParticle[]
  spawnTime: number
  intensity: number
}

type EruptionPhase = "dormant" | "rumbling" | "erupting"

type MapVolcanoProps = {
  id: string
  coordinates: MapCoordinates
  size?: number
  intensity?: number
  particleCount?: number
  lavaColor?: string
  ashColor?: string
  phase?: EruptionPhase
  spread?: boolean
  spreadSpeed?: number
  spreadRadius?: number
  maxSpreadPoints?: number
  autoStart?: boolean
}

type VolcanoRenderer = {
  width: number
  height: number
  data: Uint8ClampedArray
  context?: CanvasRenderingContext2D
  particles: VolcanoParticle[]
  spreadSources: LavaSpreadSource[]
  isActive: boolean
  currentIntensity: number
  currentPhase: EruptionPhase
  onAdd: () => void
  render: () => boolean
  start: () => void
  stop: () => void
  setIntensity: (intensity: number) => void
  setPhase: (phase: EruptionPhase) => void
  addSpreadSource: (x: number, y: number) => void
}

type VolcanoControl = {
  start: () => void
  stop: () => void
  setIntensity: (intensity: number) => void
  setPhase: (phase: EruptionPhase) => void
  isActive: boolean
  phase: EruptionPhase
  spreadProgress: number
}

type RgbColor = {
  r: number
  g: number
  b: number
}

const DEFAULT_SIZE = 200
const DEFAULT_INTENSITY = 0.4
const DEFAULT_PARTICLE_COUNT = 100
const DEFAULT_LAVA_COLOR = "#FF4500"
const DEFAULT_ASH_COLOR = "#555555"
const DEFAULT_PHASE: EruptionPhase = "erupting"
const DEFAULT_SPREAD_SPEED = 2000
const DEFAULT_SPREAD_RADIUS = 0.3
const DEFAULT_MAX_SPREAD_POINTS = 6

const CRATER_Y_RATIO = 0.45
const CRATER_WIDTH_RATIO = 0.12
const CONE_BASE_WIDTH_RATIO = 0.4
const CONE_TOP_WIDTH_RATIO = 0.08
const CONE_BASE_Y_RATIO = 0.85

const LAVA_PARTICLE_RATIO = 0.4
const ASH_PARTICLE_RATIO = 0.35
const LAVA_VELOCITY_Y_BASE = -2.5
const LAVA_VELOCITY_Y_RANGE = -2
const LAVA_VELOCITY_X_RANGE = 1.2
const LAVA_RADIUS_BASE = 3
const LAVA_RADIUS_RANGE = 5
const LAVA_LIFE_BASE = 30
const LAVA_LIFE_RANGE = 30

const ASH_VELOCITY_Y_BASE = -1
const ASH_VELOCITY_Y_RANGE = -1.5
const ASH_VELOCITY_X_RANGE = 2
const ASH_RADIUS_BASE = 6
const ASH_RADIUS_RANGE = 10
const ASH_LIFE_BASE = 50
const ASH_LIFE_RANGE = 40

const EMBER_VELOCITY_Y_BASE = -0.8
const EMBER_VELOCITY_Y_RANGE = -1
const EMBER_VELOCITY_X_RANGE = 3
const EMBER_RADIUS_BASE = 1
const EMBER_RADIUS_RANGE = 2
const EMBER_LIFE_BASE = 40
const EMBER_LIFE_RANGE = 50

const LAVA_FLOW_COUNT = 4
const LAVA_FLOW_WIDTH_BASE = 2
const LAVA_FLOW_WIDTH_RANGE = 2
const LAVA_FLOW_SEGMENTS = 8

const VELOCITY_DECAY_X = 0.98
const GRAVITY = 0.04
const ASH_DRIFT = 0.3

const GLOW_RADIUS_RATIO = 0.15
const GLOW_OPACITY = 0.4
const PIXEL_RATIO = 2
const CONTROL_UPDATE_INTERVAL = 100
const MIN_INTENSITY = 0.1
const MAX_INTENSITY = 1

const RUMBLING_INTENSITY_SCALE = 0.2
const RUMBLING_PARTICLE_SCALE = 0.3
const RUMBLING_SHAKE_AMPLITUDE = 1.5
const RUMBLING_GLOW_PULSE_SPEED = 0.003
const RUMBLING_GLOW_PULSE_RANGE = 0.3
const DORMANT_GLOW_OPACITY = 0.08

const SPREAD_PARTICLES_PER_SOURCE = 20
const SPREAD_CANVAS_PADDING = 0.08
const SPREAD_VERTICAL_RANGE = 0.1

const volcanoControls = new Map<string, VolcanoControl>()

const hexToRgb = (hex: string): RgbColor => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  if (!result) {
    return { r: 255, g: 69, b: 0 }
  }

  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  }
}

const getPhaseIntensityScale = (phase: EruptionPhase): number => {
  if (phase === "dormant") {
    return 0
  }

  if (phase === "rumbling") {
    return RUMBLING_INTENSITY_SCALE
  }

  return 1
}

const getPhaseParticleScale = (phase: EruptionPhase): number => {
  if (phase === "dormant") {
    return 0
  }

  if (phase === "rumbling") {
    return RUMBLING_PARTICLE_SCALE
  }

  return 1
}

const createLavaParticle = (
  craterX: number,
  craterY: number,
  craterWidth: number,
  intensity: number
): VolcanoParticle => {
  return {
    x: craterX + (Math.random() - 0.5) * craterWidth,
    y: craterY,
    velocityX: (Math.random() - 0.5) * LAVA_VELOCITY_X_RANGE * intensity,
    velocityY: (LAVA_VELOCITY_Y_BASE + Math.random() * LAVA_VELOCITY_Y_RANGE) * intensity,
    radius: LAVA_RADIUS_BASE + Math.random() * LAVA_RADIUS_RANGE * intensity,
    life: 0,
    maxLife: LAVA_LIFE_BASE + Math.random() * LAVA_LIFE_RANGE,
    type: "lava",
  }
}

const createAshParticle = (
  craterX: number,
  craterY: number,
  craterWidth: number,
  intensity: number
): VolcanoParticle => {
  return {
    x: craterX + (Math.random() - 0.5) * craterWidth * 2,
    y: craterY - Math.random() * 10,
    velocityX: (Math.random() - 0.5) * ASH_VELOCITY_X_RANGE * intensity,
    velocityY: (ASH_VELOCITY_Y_BASE + Math.random() * ASH_VELOCITY_Y_RANGE) * intensity,
    radius: ASH_RADIUS_BASE + Math.random() * ASH_RADIUS_RANGE,
    life: 0,
    maxLife: ASH_LIFE_BASE + Math.random() * ASH_LIFE_RANGE,
    type: "ash",
  }
}

const createEmberParticle = (
  craterX: number,
  craterY: number,
  craterWidth: number,
  intensity: number
): VolcanoParticle => {
  return {
    x: craterX + (Math.random() - 0.5) * craterWidth,
    y: craterY,
    velocityX: (Math.random() - 0.5) * EMBER_VELOCITY_X_RANGE * intensity,
    velocityY: (EMBER_VELOCITY_Y_BASE + Math.random() * EMBER_VELOCITY_Y_RANGE) * intensity,
    radius: EMBER_RADIUS_BASE + Math.random() * EMBER_RADIUS_RANGE,
    life: 0,
    maxLife: EMBER_LIFE_BASE + Math.random() * EMBER_LIFE_RANGE,
    type: "ember",
  }
}

const createParticle = (
  craterX: number,
  craterY: number,
  craterWidth: number,
  intensity: number,
  type: "lava" | "ash" | "ember"
): VolcanoParticle => {
  if (type === "lava") {
    return createLavaParticle(craterX, craterY, craterWidth, intensity)
  }

  if (type === "ash") {
    return createAshParticle(craterX, craterY, craterWidth, intensity)
  }

  return createEmberParticle(craterX, craterY, craterWidth, intensity)
}

const createSpreadParticle = (sourceX: number, sourceY: number, intensity: number): VolcanoParticle => {
  return {
    x: sourceX + (Math.random() - 0.5) * 10,
    y: sourceY,
    velocityX: (Math.random() - 0.5) * 0.6 * intensity,
    velocityY: (-0.5 + Math.random() * -0.8) * intensity,
    radius: 2 + Math.random() * 4 * intensity,
    life: 0,
    maxLife: 20 + Math.random() * 30,
    type: "lava",
  }
}

const createSpreadSource = (x: number, y: number, intensity: number): LavaSpreadSource => {
  const particles: VolcanoParticle[] = []

  for (let index = 0; index < SPREAD_PARTICLES_PER_SOURCE; index++) {
    const particle = createSpreadParticle(x, y, intensity)
    particle.life = Math.random() * particle.maxLife
    particles.push(particle)
  }

  return { x, y, particles, spawnTime: performance.now(), intensity }
}

const updateParticle = (particle: VolcanoParticle): boolean => {
  particle.x += particle.velocityX
  particle.velocityX *= VELOCITY_DECAY_X
  particle.life++

  if (particle.type === "lava") {
    particle.y += particle.velocityY
    particle.velocityY += GRAVITY
  } else if (particle.type === "ash") {
    particle.y += particle.velocityY
    particle.velocityX += (Math.random() - 0.5) * ASH_DRIFT
  } else {
    particle.y += particle.velocityY
    particle.velocityY += GRAVITY * 0.5
  }

  return particle.life >= particle.maxLife
}

const drawLavaParticle = (context: CanvasRenderingContext2D, particle: VolcanoParticle, lavaRgb: RgbColor): void => {
  const lifeRatio = particle.life / particle.maxLife
  const alpha = (1 - lifeRatio) * 0.9
  const currentRadius = particle.radius * (1 - lifeRatio * 0.4)
  const { r, g, b } = lavaRgb

  const gradient = context.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, currentRadius)
  gradient.addColorStop(0, `rgba(255, 255, 200, ${alpha})`)
  gradient.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${alpha * 0.8})`)
  gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)

  context.beginPath()
  context.arc(particle.x, particle.y, currentRadius, 0, Math.PI * 2)
  context.fillStyle = gradient
  context.fill()
}

const drawAshParticle = (context: CanvasRenderingContext2D, particle: VolcanoParticle, ashRgb: RgbColor): void => {
  const lifeRatio = particle.life / particle.maxLife
  const alpha = (1 - lifeRatio) * 0.5
  const currentRadius = particle.radius * (1 + lifeRatio * 0.5)
  const { r, g, b } = ashRgb

  const gradient = context.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, currentRadius)
  gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`)
  gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)

  context.beginPath()
  context.arc(particle.x, particle.y, currentRadius, 0, Math.PI * 2)
  context.fillStyle = gradient
  context.fill()
}

const drawEmberParticle = (context: CanvasRenderingContext2D, particle: VolcanoParticle, lavaRgb: RgbColor): void => {
  const lifeRatio = particle.life / particle.maxLife
  const alpha = (1 - lifeRatio) * 0.8
  const flicker = 0.7 + Math.random() * 0.3
  const { r, g, b } = lavaRgb

  context.beginPath()
  context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
  context.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * flicker})`
  context.fill()
}

const drawVolcanoCone = (
  context: CanvasRenderingContext2D,
  centerX: number,
  craterY: number,
  size: number,
  lavaRgb: RgbColor,
  intensity: number,
  phase: EruptionPhase
): void => {
  const coneBaseY = size * CONE_BASE_Y_RATIO
  const coneBaseWidth = size * CONE_BASE_WIDTH_RATIO
  const coneTopWidth = size * CONE_TOP_WIDTH_RATIO

  const shakeX = phase === "rumbling" ? (Math.random() - 0.5) * RUMBLING_SHAKE_AMPLITUDE : 0
  const shakeY = phase === "rumbling" ? (Math.random() - 0.5) * RUMBLING_SHAKE_AMPLITUDE * 0.5 : 0
  const offsetCenterX = centerX + shakeX
  const offsetCraterY = craterY + shakeY

  const coneGradient = context.createLinearGradient(offsetCenterX, offsetCraterY, offsetCenterX, coneBaseY)
  coneGradient.addColorStop(0, "rgba(80, 50, 30, 0.9)")
  coneGradient.addColorStop(0.5, "rgba(60, 40, 25, 0.8)")
  coneGradient.addColorStop(1, "rgba(40, 25, 15, 0.6)")

  context.beginPath()
  context.moveTo(offsetCenterX - coneTopWidth, offsetCraterY)
  context.lineTo(offsetCenterX - coneBaseWidth, coneBaseY + shakeY)
  context.lineTo(offsetCenterX + coneBaseWidth, coneBaseY + shakeY)
  context.lineTo(offsetCenterX + coneTopWidth, offsetCraterY)
  context.closePath()
  context.fillStyle = coneGradient
  context.fill()

  if (phase === "dormant") {
    return
  }

  const lavaFlowSeed = Math.floor(performance.now() / 200)

  for (let flowIndex = 0; flowIndex < LAVA_FLOW_COUNT; flowIndex++) {
    const startOffset = (flowIndex / LAVA_FLOW_COUNT - 0.5) * coneTopWidth * 2
    const flowWidth = LAVA_FLOW_WIDTH_BASE + Math.random() * LAVA_FLOW_WIDTH_RANGE * intensity

    context.beginPath()
    context.moveTo(offsetCenterX + startOffset, offsetCraterY)

    for (let segment = 1; segment <= LAVA_FLOW_SEGMENTS; segment++) {
      const segmentRatio = segment / LAVA_FLOW_SEGMENTS
      const segmentY = offsetCraterY + (coneBaseY - offsetCraterY) * segmentRatio
      const widthAtSegment = coneTopWidth + (coneBaseWidth - coneTopWidth) * segmentRatio
      const wobble = Math.sin(lavaFlowSeed + flowIndex * 3 + segment) * widthAtSegment * 0.15
      const segmentX = offsetCenterX + startOffset * (1 + segmentRatio * 2) + wobble
      context.lineTo(segmentX, segmentY)
    }

    const { r, g, b } = lavaRgb
    context.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.4 + intensity * 0.4})`
    context.lineWidth = flowWidth
    context.lineCap = "round"
    context.stroke()
  }
}

const drawCraterGlow = (
  context: CanvasRenderingContext2D,
  centerX: number,
  craterY: number,
  size: number,
  lavaRgb: RgbColor,
  intensity: number,
  phase: EruptionPhase
): void => {
  const { r, g, b } = lavaRgb

  if (phase === "dormant") {
    const dimGlowRadius = size * GLOW_RADIUS_RATIO * 0.5
    const gradient = context.createRadialGradient(centerX, craterY, 0, centerX, craterY, dimGlowRadius)
    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${DORMANT_GLOW_OPACITY})`)
    gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)

    context.beginPath()
    context.arc(centerX, craterY, dimGlowRadius, 0, Math.PI * 2)
    context.fillStyle = gradient
    context.fill()
    return
  }

  const glowIntensity =
    phase === "rumbling"
      ? intensity * (0.5 + Math.sin(performance.now() * RUMBLING_GLOW_PULSE_SPEED) * RUMBLING_GLOW_PULSE_RANGE)
      : intensity

  const glowRadius = size * GLOW_RADIUS_RATIO * (0.8 + glowIntensity * 0.5)
  const flicker = 0.85 + Math.random() * 0.15

  const gradient = context.createRadialGradient(centerX, craterY, 0, centerX, craterY, glowRadius)
  gradient.addColorStop(0, `rgba(255, 255, 200, ${GLOW_OPACITY * flicker * glowIntensity})`)
  gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${GLOW_OPACITY * 0.6 * flicker * glowIntensity})`)
  gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)

  context.beginPath()
  context.arc(centerX, craterY, glowRadius, 0, Math.PI * 2)
  context.fillStyle = gradient
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

const calculateSpreadPosition = (
  canvasSize: number,
  spreadRadius: number,
  coneBaseY: number
): { x: number; y: number } => {
  const horizontalSpread = (Math.random() - 0.5) * 2 * spreadRadius * canvasSize
  const verticalOffset = Math.random() * canvasSize * SPREAD_VERTICAL_RANGE

  const padding = canvasSize * SPREAD_CANVAS_PADDING
  const spreadX = Math.max(padding, Math.min(canvasSize - padding, canvasSize / 2 + horizontalSpread))
  const spreadY = Math.max(padding, Math.min(canvasSize - padding, coneBaseY + verticalOffset))

  return { x: spreadX, y: spreadY }
}

const drawSpreadParticle = (context: CanvasRenderingContext2D, particle: VolcanoParticle, lavaRgb: RgbColor): void => {
  const lifeRatio = particle.life / particle.maxLife
  const alpha = (1 - lifeRatio) * 0.7
  const currentRadius = particle.radius * (1 - lifeRatio * 0.3)
  const { r, g, b } = lavaRgb

  const gradient = context.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, currentRadius)
  gradient.addColorStop(0, `rgba(255, 200, 100, ${alpha})`)
  gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${alpha * 0.6})`)
  gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)

  context.beginPath()
  context.arc(particle.x, particle.y, currentRadius, 0, Math.PI * 2)
  context.fillStyle = gradient
  context.fill()
}

const drawSpreadSourceGlow = (context: CanvasRenderingContext2D, source: LavaSpreadSource, lavaRgb: RgbColor): void => {
  const { r, g, b } = lavaRgb
  const flicker = 0.8 + Math.random() * 0.2
  const glowRadius = 8 + source.intensity * 6

  const gradient = context.createRadialGradient(source.x, source.y, 0, source.x, source.y, glowRadius)
  gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.3 * flicker})`)
  gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)

  context.beginPath()
  context.arc(source.x, source.y, glowRadius, 0, Math.PI * 2)
  context.fillStyle = gradient
  context.fill()
}

const createVolcanoRenderer = (
  size: number,
  intensity: number,
  particleCount: number,
  lavaColor: string,
  ashColor: string,
  initialPhase: EruptionPhase,
  spread: boolean,
  maxSpreadPoints: number
): VolcanoRenderer => {
  const lavaRgb = hexToRgb(lavaColor)
  const ashRgb = hexToRgb(ashColor)
  const centerX = size / 2
  const craterY = size * CRATER_Y_RATIO
  const craterWidth = size * CRATER_WIDTH_RATIO
  const coneBaseY = size * CONE_BASE_Y_RATIO

  const lavaCount = Math.floor(particleCount * LAVA_PARTICLE_RATIO)
  const ashCount = Math.floor(particleCount * ASH_PARTICLE_RATIO)
  const emberCount = particleCount - lavaCount - ashCount

  const spawnParticles = (phase: EruptionPhase, currentIntensity: number): VolcanoParticle[] => {
    const particles: VolcanoParticle[] = []
    const phaseScale = getPhaseParticleScale(phase)
    const effectiveIntensity = currentIntensity * getPhaseIntensityScale(phase)
    const scaledLavaCount = Math.floor(lavaCount * phaseScale)
    const scaledAshCount = Math.floor(ashCount * phaseScale)
    const scaledEmberCount = Math.floor(emberCount * phaseScale)

    for (let index = 0; index < scaledLavaCount; index++) {
      const particle = createParticle(centerX, craterY, craterWidth, effectiveIntensity, "lava")
      particle.life = Math.random() * particle.maxLife
      particles.push(particle)
    }

    for (let index = 0; index < scaledAshCount; index++) {
      const particle = createParticle(centerX, craterY, craterWidth, effectiveIntensity, "ash")
      particle.life = Math.random() * particle.maxLife
      particles.push(particle)
    }

    for (let index = 0; index < scaledEmberCount; index++) {
      const particle = createParticle(centerX, craterY, craterWidth, effectiveIntensity, "ember")
      particle.life = Math.random() * particle.maxLife
      particles.push(particle)
    }

    return particles
  }

  const renderer: VolcanoRenderer = {
    width: size,
    height: size,
    data: new Uint8ClampedArray(size * size * 4),
    particles: [],
    spreadSources: [],
    isActive: false,
    currentIntensity: intensity,
    currentPhase: initialPhase,

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
      this.particles = spawnParticles(this.currentPhase, this.currentIntensity)
      this.spreadSources = []
    },

    stop() {
      this.isActive = false
      this.particles = []
      this.spreadSources = []
    },

    setIntensity(newIntensity: number) {
      this.currentIntensity = Math.max(MIN_INTENSITY, Math.min(MAX_INTENSITY, newIntensity))
    },

    setPhase(phase: EruptionPhase) {
      this.currentPhase = phase
      if (this.isActive) {
        this.particles = spawnParticles(phase, this.currentIntensity)
        if (phase === "dormant") {
          this.spreadSources = []
        }
      }
    },

    addSpreadSource(x: number, y: number) {
      if (this.spreadSources.length < maxSpreadPoints) {
        const sourceIntensity = this.currentIntensity * (0.5 + Math.random() * 0.5)
        this.spreadSources.push(createSpreadSource(x, y, sourceIntensity))
      }
    },

    render() {
      if (!this.context) {
        return false
      }

      this.context.clearRect(0, 0, this.width, this.height)

      if (!this.isActive) {
        drawVolcanoCone(this.context, centerX, craterY, size, lavaRgb, 0, "dormant")
        drawCraterGlow(this.context, centerX, craterY, size, lavaRgb, 0, "dormant")
        this.data = this.context.getImageData(0, 0, this.width, this.height).data
        return true
      }

      const effectiveIntensity = this.currentIntensity * getPhaseIntensityScale(this.currentPhase)

      drawVolcanoCone(this.context, centerX, craterY, size, lavaRgb, effectiveIntensity, this.currentPhase)
      drawCraterGlow(this.context, centerX, craterY, size, lavaRgb, effectiveIntensity, this.currentPhase)

      if (this.currentPhase !== "dormant") {
        for (let particleIndex = 0; particleIndex < this.particles.length; particleIndex++) {
          const particle = this.particles[particleIndex]
          const shouldReset = updateParticle(particle)

          if (shouldReset) {
            this.particles[particleIndex] = createParticle(
              centerX,
              craterY,
              craterWidth,
              effectiveIntensity,
              particle.type
            )
            continue
          }

          if (particle.type === "lava") {
            drawLavaParticle(this.context, particle, lavaRgb)
          } else if (particle.type === "ash") {
            drawAshParticle(this.context, particle, ashRgb)
          } else {
            drawEmberParticle(this.context, particle, lavaRgb)
          }
        }
      }

      for (const source of this.spreadSources) {
        for (let particleIndex = 0; particleIndex < source.particles.length; particleIndex++) {
          const particle = source.particles[particleIndex]
          const shouldReset = updateParticle(particle)

          if (shouldReset) {
            source.particles[particleIndex] = createSpreadParticle(source.x, source.y, source.intensity)
            continue
          }

          drawSpreadParticle(this.context, particle, lavaRgb)
        }

        drawSpreadSourceGlow(this.context, source, lavaRgb)
      }

      fadeCanvasEdges(this.context, this.width, this.height)
      this.data = this.context.getImageData(0, 0, this.width, this.height).data

      return true
    },
  }

  return renderer
}

export const useVolcanoControl = (id: string): VolcanoControl | null => {
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

  return volcanoControls.get(id) || null
}

export const MapVolcano = ({
  id,
  coordinates,
  size = DEFAULT_SIZE,
  intensity = DEFAULT_INTENSITY,
  particleCount = DEFAULT_PARTICLE_COUNT,
  lavaColor = DEFAULT_LAVA_COLOR,
  ashColor = DEFAULT_ASH_COLOR,
  phase = DEFAULT_PHASE,
  spread = false,
  spreadSpeed = DEFAULT_SPREAD_SPEED,
  spreadRadius = DEFAULT_SPREAD_RADIUS,
  maxSpreadPoints = DEFAULT_MAX_SPREAD_POINTS,
  autoStart = true,
}: MapVolcanoProps) => {
  const { map, isLoaded } = useMap()
  const animationFrameRef = useRef<number | null>(null)
  const rendererRef = useRef<VolcanoRenderer | null>(null)
  const lastSpreadTimeRef = useRef<number>(0)
  const spreadProgressRef = useRef<number>(0)

  const sourceId = `${id}-source`
  const layerId = `${id}-layer`
  const canvasSize = spread ? Math.floor(size * 1.5) : size

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

  const setPhase = useCallback((newPhase: EruptionPhase) => {
    if (rendererRef.current) {
      rendererRef.current.setPhase(newPhase)
    }
  }, [])

  useEffect(() => {
    if (!isLoaded || !map) {
      return
    }

    const volcanoRenderer = createVolcanoRenderer(
      canvasSize,
      intensity,
      particleCount,
      lavaColor,
      ashColor,
      phase,
      spread,
      maxSpreadPoints
    )
    rendererRef.current = volcanoRenderer

    const control: VolcanoControl = {
      start,
      stop,
      setIntensity,
      setPhase,
      get isActive() {
        return rendererRef.current?.isActive || false
      },
      get phase() {
        return rendererRef.current?.currentPhase || "dormant"
      },
      get spreadProgress() {
        return spreadProgressRef.current
      },
    }

    volcanoControls.set(id, control)

    if (!map.hasImage(id)) {
      map.addImage(id, volcanoRenderer, { pixelRatio: PIXEL_RATIO })
    }

    if (autoStart) {
      volcanoRenderer.start()
      lastSpreadTimeRef.current = performance.now()
    }

    const coneBaseY = canvasSize * CONE_BASE_Y_RATIO

    const animate = () => {
      if (spread && volcanoRenderer.isActive && volcanoRenderer.currentPhase === "erupting") {
        const now = performance.now()
        const elapsed = now - lastSpreadTimeRef.current

        if (elapsed >= spreadSpeed && volcanoRenderer.spreadSources.length < maxSpreadPoints) {
          const position = calculateSpreadPosition(canvasSize, spreadRadius, coneBaseY)
          volcanoRenderer.addSpreadSource(position.x, position.y)
          lastSpreadTimeRef.current = now
          spreadProgressRef.current = volcanoRenderer.spreadSources.length / maxSpreadPoints
        }
      }

      map.triggerRepaint()
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    animationFrameRef.current = requestAnimationFrame(animate)

    const handleStyleLoad = () => {
      if (!map.hasImage(id)) {
        map.addImage(id, volcanoRenderer, { pixelRatio: PIXEL_RATIO })
      }
    }

    map.on("style.load", handleStyleLoad)

    return () => {
      map.off("style.load", handleStyleLoad)
      volcanoControls.delete(id)

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
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
    canvasSize,
    intensity,
    particleCount,
    lavaColor,
    ashColor,
    phase,
    spread,
    spreadSpeed,
    spreadRadius,
    maxSpreadPoints,
    autoStart,
    start,
    stop,
    setIntensity,
    setPhase,
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
            "icon-rotation-alignment": "viewport",
            "icon-pitch-alignment": "viewport",
            "icon-size": ["interpolate", ["linear"], ["zoom"], 4, 0.1, 8, 0.3, 12, 1, 16, 2],
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
  }, [map, isLoaded, coordinates, id, sourceId, layerId])

  return null
}
