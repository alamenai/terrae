"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { useMap } from "./hooks"

type MapControlPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right"
type MapCompassSize = "sm" | "md" | "lg" | "xl"

type MapCompassProps = {
  size?: MapCompassSize | number
  position?: MapControlPosition
  showCardinals?: boolean
  showRing?: boolean
  showBearing?: boolean
  autoRotate?: boolean
  autoRotateSpeed?: number
  className?: string
}

const DEFAULT_SIZE: MapCompassSize = "md"
const DEFAULT_POSITION: MapControlPosition = "top-right"
const DEFAULT_SHOW_CARDINALS = true
const DEFAULT_SHOW_RING = true
const DEFAULT_SHOW_BEARING = false
const DEFAULT_AUTO_ROTATE = false
const DEFAULT_AUTO_ROTATE_SPEED = 2

const SIZE_MAP: Record<MapCompassSize, number> = {
  sm: 48,
  md: 64,
  lg: 80,
  xl: 96,
}

const POSITION_CLASSES: Record<MapControlPosition, string> = {
  "top-left": "top-2 left-2",
  "top-right": "top-2 right-2",
  "bottom-left": "bottom-2 left-2",
  "bottom-right": "bottom-10 right-2",
}

const resolveSize = (size: MapCompassSize | number): number => {
  if (typeof size === "number") {
    return size
  }
  return SIZE_MAP[size]
}

const CompassRing = () => {
  const majorAngles = [0, 45, 90, 135, 180, 225, 270, 315]
  const minorAngles = [15, 30, 60, 75, 105, 120, 150, 165, 195, 210, 240, 255, 285, 300, 330, 345]

  const createTick = (angle: number, isMajor: boolean) => {
    const rad = (angle * Math.PI) / 180
    const innerRadius = isMajor ? 40 : 42
    const outerRadius = 46
    const x1 = 50 + innerRadius * Math.sin(rad)
    const y1 = 50 - innerRadius * Math.cos(rad)
    const x2 = 50 + outerRadius * Math.sin(rad)
    const y2 = 50 - outerRadius * Math.cos(rad)

    return (
      <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-border" strokeWidth={isMajor ? 1.5 : 0.75} />
    )
  }

  return (
    <g>
      <circle cx="50" cy="50" r="46" fill="none" className="stroke-border" strokeWidth="1" />
      {majorAngles.map((angle) => {
        return createTick(angle, true)
      })}
      {minorAngles.map((angle) => {
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

type CardinalLabelsProps = {
  fontSize: number
}

const CardinalLabels = ({ fontSize }: CardinalLabelsProps) => {
  return (
    <g className="font-sans font-bold" style={{ fontSize }}>
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

export const MapCompass = ({
  size = DEFAULT_SIZE,
  position = DEFAULT_POSITION,
  showCardinals = DEFAULT_SHOW_CARDINALS,
  showRing = DEFAULT_SHOW_RING,
  showBearing = DEFAULT_SHOW_BEARING,
  autoRotate = DEFAULT_AUTO_ROTATE,
  autoRotateSpeed = DEFAULT_AUTO_ROTATE_SPEED,
  className,
}: MapCompassProps) => {
  const { map, isLoaded } = useMap()
  const compassRef = useRef<HTMLDivElement | null>(null)
  const animationRef = useRef<number | null>(null)
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startAngle, setStartAngle] = useState(0)

  const calculateAngle = (event: React.MouseEvent | MouseEvent) => {
    const compass = compassRef.current
    if (!compass) {
      return 0
    }

    const rect = compass.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = event.clientX - centerX
    const mouseY = event.clientY - centerY

    let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI)
    angle = angle + 90

    if (angle < 0) {
      angle += 360
    }

    return angle
  }

  const handleMouseDown = (event: React.MouseEvent | MouseEvent) => {
    event.preventDefault()
    setIsDragging(true)

    const angle = calculateAngle(event)
    setStartAngle(angle - rotation)
  }

  const handleMouseMove = (event: React.MouseEvent | MouseEvent) => {
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

    setRotation(newRotation)

    if (map) {
      map.setBearing(-newRotation)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, startAngle, rotation])

  useEffect(() => {
    if (!autoRotate || isDragging) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      return
    }

    const animate = () => {
      setRotation((prev) => {
        let newRotation = prev + autoRotateSpeed
        if (newRotation >= 360) {
          newRotation -= 360
        }
        if (newRotation < 0) {
          newRotation += 360
        }

        if (map) {
          map.setBearing(-newRotation)
        }

        return newRotation
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [autoRotate, autoRotateSpeed, isDragging, map])

  if (!isLoaded) {
    return null
  }

  const pixelSize = resolveSize(size)
  const fontSize = Math.max(8, pixelSize * 0.14)

  return (
    <div className={cn("absolute z-10", POSITION_CLASSES[position], className)}>
      <div
        ref={compassRef}
        className={cn(
          "rounded-full bg-background/90 backdrop-blur-sm shadow-lg border border-border p-1 select-none",
          !isDragging && "hover:bg-accent/20 transition-colors"
        )}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
        onMouseDown={handleMouseDown}
      >
        <svg
          viewBox="0 0 100 100"
          width={pixelSize}
          height={pixelSize}
          className="pointer-events-none"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {showRing && <CompassRing />}
          <CompassRose />
          {showCardinals && <CardinalLabels fontSize={fontSize} />}
          <CenterPivot />
        </svg>
      </div>
      {showBearing && (
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-mono text-muted-foreground whitespace-nowrap">
          {Math.round(rotation)}°
        </div>
      )}
    </div>
  )
}
