"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const CARDINAL_FONT_SIZE = 12
const AUTO_ROTATE_SPEED = 0.3

const createTick = (angle: number, isMajor: boolean) => {
  const rad = (angle * Math.PI) / 180
  const innerRadius = isMajor ? 40 : 42
  const outerRadius = 46
  const x1 = Math.round((50 + innerRadius * Math.sin(rad)) * 1000) / 1000
  const y1 = Math.round((50 - innerRadius * Math.cos(rad)) * 1000) / 1000
  const x2 = Math.round((50 + outerRadius * Math.sin(rad)) * 1000) / 1000
  const y2 = Math.round((50 - outerRadius * Math.cos(rad)) * 1000) / 1000

  return (
    <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-border" strokeWidth={isMajor ? 1.5 : 0.75} />
  )
}

const MAJOR_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315]
const MINOR_ANGLES = [15, 30, 60, 75, 105, 120, 150, 165, 195, 210, 240, 255, 285, 300, 330, 345]

const CompassRing = () => {
  return (
    <g>
      <circle cx="50" cy="50" r="46" fill="none" className="stroke-border" strokeWidth="1" />
      {MAJOR_ANGLES.map((angle) => {
        return createTick(angle, true)
      })}
      {MINOR_ANGLES.map((angle) => {
        return createTick(angle, false)
      })}
    </g>
  )
}

const CompassRose = () => {
  return (
    <g>
      <path d="M50 14 L56 50 L50 46 Z" className="fill-red-500" />
      <path d="M50 14 L44 50 L50 46 Z" className="fill-red-400" />

      <path d="M50 86 L56 50 L50 54 Z" className="fill-muted-foreground/50" />
      <path d="M50 86 L44 50 L50 54 Z" className="fill-muted-foreground/30" />

      <path d="M86 50 L50 44 L54 50 Z" className="fill-muted-foreground/30" />
      <path d="M86 50 L50 56 L54 50 Z" className="fill-muted-foreground/20" />

      <path d="M14 50 L50 44 L46 50 Z" className="fill-muted-foreground/30" />
      <path d="M14 50 L50 56 L46 50 Z" className="fill-muted-foreground/20" />
    </g>
  )
}

const CardinalLabels = () => {
  return (
    <g className="font-sans font-bold" style={{ fontSize: CARDINAL_FONT_SIZE }}>
      <text x="50" y="28" textAnchor="middle" dominantBaseline="middle" className="fill-red-500">
        N
      </text>
      <text x="50" y="76" textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground">
        S
      </text>
      <text x="76" y="52" textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground">
        E
      </text>
      <text x="24" y="52" textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground">
        W
      </text>
    </g>
  )
}

const CenterPivot = () => {
  return (
    <g>
      <circle cx="50" cy="50" r="4" className="fill-background stroke-border" strokeWidth="1" />
      <circle cx="50" cy="50" r="2" className="fill-muted-foreground/60" />
    </g>
  )
}

const StandaloneCompass = () => {
  const compassRef = useRef<HTMLDivElement | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)
  const bearingRef = useRef<HTMLDivElement | null>(null)
  const animationRef = useRef<number | null>(null)
  const rotationRef = useRef(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startAngle, setStartAngle] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [displayRotation, setDisplayRotation] = useState(0)

  const updateVisuals = (angle: number) => {
    rotationRef.current = angle
    if (svgRef.current) {
      svgRef.current.style.transform = `rotate(${angle}deg)`
    }
    if (bearingRef.current) {
      bearingRef.current.textContent = `${Math.round(angle)}°`
    }
  }

  const calculateAngle = (event: React.MouseEvent | MouseEvent | React.TouchEvent | TouchEvent) => {
    const compass = compassRef.current
    if (!compass) {
      return 0
    }

    const rect = compass.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    let clientX: number
    let clientY: number

    if ("touches" in event) {
      clientX = event.touches[0].clientX
      clientY = event.touches[0].clientY
    } else {
      clientX = event.clientX
      clientY = event.clientY
    }

    const mouseX = clientX - centerX
    const mouseY = clientY - centerY

    let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI)
    angle = angle + 90

    if (angle < 0) {
      angle += 360
    }

    return angle
  }

  const handleStart = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault()
    setIsDragging(true)
    setHasInteracted(true)

    const angle = calculateAngle(event)
    setStartAngle(angle - rotationRef.current)
  }

  const handleMoveRef = useRef<(event: MouseEvent | TouchEvent) => void>(() => {})
  const handleEndRef = useRef<() => void>(() => {})

  handleMoveRef.current = (event: MouseEvent | TouchEvent) => {
    if (!isDragging) {
      return
    }

    const currentAngle = calculateAngle(event)
    let newRotation = currentAngle - startAngle

    if (newRotation < 0) {
      newRotation += 360
    }
    if (newRotation >= 360) {
      newRotation -= 360
    }

    updateVisuals(newRotation)
  }

  handleEndRef.current = () => {
    setIsDragging(false)
    setDisplayRotation(rotationRef.current)
  }

  useEffect(() => {
    if (!isDragging) {
      return
    }

    const handleMove = (event: MouseEvent | TouchEvent) => {
      handleMoveRef.current(event)
    }

    const handleEnd = () => {
      handleEndRef.current()
    }

    window.addEventListener("mousemove", handleMove)
    window.addEventListener("mouseup", handleEnd)
    window.addEventListener("touchmove", handleMove)
    window.addEventListener("touchend", handleEnd)

    return () => {
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("mouseup", handleEnd)
      window.removeEventListener("touchmove", handleMove)
      window.removeEventListener("touchend", handleEnd)
    }
  }, [isDragging])

  useEffect(() => {
    if (isDragging || hasInteracted) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      return
    }

    const animate = () => {
      let newRotation = rotationRef.current + AUTO_ROTATE_SPEED
      if (newRotation >= 360) {
        newRotation -= 360
      }

      updateVisuals(newRotation)
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isDragging, hasInteracted])

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        ref={compassRef}
        className={cn(
          "rounded-full bg-background/90 backdrop-blur-sm shadow-lg border border-border p-3 sm:p-4 select-none",
          !isDragging && "hover:bg-accent/20 transition-colors"
        )}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
        onMouseDown={handleStart}
        onTouchStart={handleStart}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 100 100"
          className="pointer-events-none size-48 sm:size-56 md:size-64 lg:size-72"
          style={{ transform: `rotate(${displayRotation}deg)` }}
        >
          <CompassRing />
          <CompassRose />
          <CardinalLabels />
          <CenterPivot />
        </svg>
      </div>
      <div className="text-center space-y-1">
        <div ref={bearingRef} className="font-mono text-2xl sm:text-3xl tabular-nums text-foreground">
          {Math.round(displayRotation)}°
        </div>
        <p className="text-xs text-muted-foreground">{hasInteracted ? "Drag to rotate" : "Drag to take control"}</p>
      </div>
    </div>
  )
}

export const Interactivity = () => {
  return (
    <div className="pt-12 sm:pt-16 pb-4 sm:pb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-2">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight">
            Interactive by Default
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-lg leading-relaxed">
            Every component is built for interaction. Drag, rotate, click — they respond naturally, just like you
            expect.
          </p>
        </div>

        <div className="flex items-center justify-center py-8 sm:py-12">
          <StandaloneCompass />
        </div>
      </div>
    </div>
  )
}
