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

type CardinalLabelsProps = {
  fontSize: number
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

const calculateAngleFromCenter = (clientX: number, clientY: number, element: HTMLElement): number => {
  const rect = element.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  const deltaX = clientX - centerX
  const deltaY = clientY - centerY
  let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90
  if (angle < 0) {
    angle += 360
  }
  return angle
}

const normalizeRotation = (degrees: number): number => {
  let normalized = degrees % 360
  if (normalized < 0) {
    normalized += 360
  }
  return normalized
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
  const rotationRef = useRef(0)
  const startAngleRef = useRef(0)
  const isDraggingRef = useRef(false)
  const mapRef = useRef(map)

  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  mapRef.current = map
  rotationRef.current = rotation

  useEffect(() => {
    const onDragMove = (event: MouseEvent) => {
      if (!isDraggingRef.current || !compassRef.current) {
        return
      }
      const currentAngle = calculateAngleFromCenter(event.clientX, event.clientY, compassRef.current)
      const newRotation = normalizeRotation(currentAngle - startAngleRef.current)
      rotationRef.current = newRotation
      setRotation(newRotation)
      mapRef.current?.setBearing(-newRotation)
    }

    const onDragEnd = () => {
      isDraggingRef.current = false
      setIsDragging(false)
    }

    window.addEventListener("mousemove", onDragMove)
    window.addEventListener("mouseup", onDragEnd)

    return () => {
      window.removeEventListener("mousemove", onDragMove)
      window.removeEventListener("mouseup", onDragEnd)
    }
  }, [])

  useEffect(() => {
    if (!map || !isLoaded || autoRotate) {
      return
    }

    const syncBearing = () => {
      if (isDraggingRef.current) {
        return
      }
      // Negate bearing so the compass rotates opposite to the map
      const bearing = -map.getBearing()
      const normalized = normalizeRotation(bearing)
      rotationRef.current = normalized
      setRotation(normalized)
    }

    map.on("rotate", syncBearing)

    return () => {
      map.off("rotate", syncBearing)
    }
  }, [map, isLoaded, autoRotate])

  useEffect(() => {
    if (!autoRotate || isDragging) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      return
    }

    const animate = () => {
      const newRotation = normalizeRotation(rotationRef.current + autoRotateSpeed)
      rotationRef.current = newRotation
      setRotation(newRotation)
      mapRef.current?.setBearing(-newRotation)
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [autoRotate, autoRotateSpeed, isDragging])

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault()
    if (!compassRef.current) {
      return
    }
    isDraggingRef.current = true
    setIsDragging(true)
    const angle = calculateAngleFromCenter(event.clientX, event.clientY, compassRef.current)
    startAngleRef.current = angle - rotationRef.current
  }

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

const CompassRing = () => {
  const majorAngles = [0, 45, 90, 135, 180, 225, 270, 315]
  const minorAngles = [15, 30, 60, 75, 105, 120, 150, 165, 195, 210, 240, 255, 285, 300, 330, 345]

  const createTick = (angle: number, isMajor: boolean) => {
    const angleRadians = (angle * Math.PI) / 180
    const innerRadius = isMajor ? 40 : 42
    const outerRadius = 46
    const innerX = 50 + innerRadius * Math.sin(angleRadians)
    const innerY = 50 - innerRadius * Math.cos(angleRadians)
    const outerX = 50 + outerRadius * Math.sin(angleRadians)
    const outerY = 50 - outerRadius * Math.cos(angleRadians)

    return (
      <line
        key={angle}
        x1={innerX}
        y1={innerY}
        x2={outerX}
        y2={outerY}
        className="stroke-border"
        strokeWidth={isMajor ? 1.5 : 0.75}
      />
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
