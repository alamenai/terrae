"use client"

import { useEffect, useRef, useCallback, useState, type CSSProperties } from "react"
import { useMap } from "./hooks"
import type { MapCoordinates } from "./types"

const DEFAULT_SIZE = 120
const DEFAULT_BRACKET_LENGTH = 24
const DEFAULT_BRACKET_THICKNESS = 2
const DEFAULT_GAP = 8
const DEFAULT_COLOR = "rgba(59, 130, 246, 0.9)"
const DEFAULT_LOCKED_COLOR = "rgba(34, 197, 94, 0.9)"
const DEFAULT_TRACKING_SPEED = 0.02
const DEFAULT_LOCKED_THICKNESS_MULTIPLIER = 2.5
const DEFAULT_CROSSHAIR_LENGTH = 12

type MapTargetingReticleProps = {
  coordinates: MapCoordinates
  target?: MapCoordinates
  size?: number
  bracketLength?: number
  bracketThickness?: number
  gap?: number
  color?: string
  lockedColor?: string
  locked?: boolean
  trackingSpeed?: number
  showCrosshair?: boolean
  showCoordinates?: boolean
  onLocked?: () => void
}

type Corner = "topLeft" | "topRight" | "bottomLeft" | "bottomRight"

type CornerBracketProps = {
  corner: Corner
  bracketLength: number
  bracketThickness: number
  gap: number
  color: string
}

const CornerBracket = ({ corner, bracketLength, bracketThickness, gap, color }: CornerBracketProps) => {
  const getPosition = (): CSSProperties => {
    switch (corner) {
      case "topLeft":
        return { top: gap, left: gap }
      case "topRight":
        return { top: gap, right: gap }
      case "bottomLeft":
        return { bottom: gap, left: gap }
      case "bottomRight":
        return { bottom: gap, right: gap }
    }
  }

  const getTransform = (): string => {
    switch (corner) {
      case "topLeft":
        return "rotate(0deg)"
      case "topRight":
        return "rotate(90deg)"
      case "bottomLeft":
        return "rotate(-90deg)"
      case "bottomRight":
        return "rotate(180deg)"
    }
  }

  const style: CSSProperties = {
    position: "absolute",
    width: bracketLength,
    height: bracketLength,
    ...getPosition(),
  }

  return (
    <div style={style}>
      <svg
        width={bracketLength}
        height={bracketLength}
        viewBox={`0 0 ${bracketLength} ${bracketLength}`}
        style={{ transform: getTransform() }}
      >
        <path
          d={`M 0 ${bracketLength} L 0 0 L ${bracketLength} 0`}
          fill="none"
          stroke={color}
          strokeWidth={bracketThickness}
          strokeLinecap="square"
        />
      </svg>
    </div>
  )
}

type CrosshairProps = {
  size: number
  color: string
  thickness: number
}

const Crosshair = ({ size, color, thickness }: CrosshairProps) => {
  const center = size / 2

  const style: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: size,
    height: size,
    pointerEvents: "none",
  }

  return (
    <svg style={style} viewBox={`0 0 ${size} ${size}`}>
      <line
        x1={center - DEFAULT_CROSSHAIR_LENGTH / 2}
        y1={center}
        x2={center + DEFAULT_CROSSHAIR_LENGTH / 2}
        y2={center}
        stroke={color}
        strokeWidth={thickness}
      />
      <line
        x1={center}
        y1={center - DEFAULT_CROSSHAIR_LENGTH / 2}
        x2={center}
        y2={center + DEFAULT_CROSSHAIR_LENGTH / 2}
        stroke={color}
        strokeWidth={thickness}
      />
    </svg>
  )
}

type CoordinatesDisplayProps = {
  coordinates: MapCoordinates
  size: number
  color: string
}

const getDirection = (value: number, isLatitude: boolean): string => {
  if (isLatitude) {
    return value >= 0 ? "N" : "S"
  }

  return value >= 0 ? "E" : "W"
}

const formatCoordinate = (value: number, isLatitude: boolean): string => {
  const absolute = Math.abs(value)
  const degrees = Math.floor(absolute)
  const minutes = Math.floor((absolute - degrees) * 60)
  const seconds = ((absolute - degrees - minutes / 60) * 3600).toFixed(1)
  const direction = getDirection(value, isLatitude)

  return `${degrees}°${minutes}'${seconds}"${direction}`
}

const CoordinatesDisplay = ({ coordinates, size, color }: CoordinatesDisplayProps) => {
  const [lng, lat] = coordinates

  const style: CSSProperties = {
    position: "absolute",
    top: size + 4,
    left: "50%",
    transform: "translateX(-50%)",
    whiteSpace: "nowrap",
    fontFamily: "ui-monospace, monospace",
    fontSize: "10px",
    fontWeight: 600,
    color: color,
    textShadow: "0 1px 2px rgba(0,0,0,0.8)",
    letterSpacing: "0.5px",
  }

  return (
    <div style={style}>
      {formatCoordinate(lat, true)} {formatCoordinate(lng, false)}
    </div>
  )
}

export const MapTargetingReticle = ({
  coordinates,
  target,
  size = DEFAULT_SIZE,
  bracketLength = DEFAULT_BRACKET_LENGTH,
  bracketThickness = DEFAULT_BRACKET_THICKNESS,
  gap = DEFAULT_GAP,
  color = DEFAULT_COLOR,
  lockedColor = DEFAULT_LOCKED_COLOR,
  locked = false,
  trackingSpeed = DEFAULT_TRACKING_SPEED,
  showCrosshair = true,
  showCoordinates = false,
  onLocked,
}: MapTargetingReticleProps) => {
  const { map, isLoaded } = useMap()
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const currentPositionRef = useRef<{ x: number; y: number } | null>(null)
  const [isLocked, setIsLocked] = useState(locked)
  const [currentCoordinates, setCurrentCoordinates] = useState<MapCoordinates>(coordinates)

  const targetRef = useRef(target)
  const coordinatesRef = useRef(coordinates)
  const onLockedRef = useRef(onLocked)
  const isLockedRef = useRef(isLocked)

  targetRef.current = target
  coordinatesRef.current = coordinates
  onLockedRef.current = onLocked
  isLockedRef.current = isLocked

  const activeColor = isLocked ? lockedColor : color
  const activeThickness = isLocked ? bracketThickness * DEFAULT_LOCKED_THICKNESS_MULTIPLIER : bracketThickness

  const updatePosition = useCallback(() => {
    if (!overlayRef.current || !map) {
      return
    }

    const currentTarget = targetRef.current
    const currentCoords = coordinatesRef.current
    const positionToUse = isLockedRef.current && currentTarget ? currentTarget : currentCoords
    const projected = map.project(positionToUse)
    const halfSize = size / 2

    overlayRef.current.style.left = `${projected.x - halfSize}px`
    overlayRef.current.style.top = `${projected.y - halfSize}px`
  }, [map, size])

  const animateToTarget = useCallback(() => {
    const currentTarget = targetRef.current

    if (!map || !currentTarget || isLockedRef.current) {
      return
    }

    const targetProjected = map.project(currentTarget)

    if (!currentPositionRef.current) {
      const currentProjected = map.project(coordinatesRef.current)
      currentPositionRef.current = { x: currentProjected.x, y: currentProjected.y }
    }

    const current = currentPositionRef.current
    const dx = targetProjected.x - current.x
    const dy = targetProjected.y - current.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < 2) {
      setIsLocked(true)
      setCurrentCoordinates(currentTarget)
      onLockedRef.current?.()
      return
    }

    current.x += dx * trackingSpeed
    current.y += dy * trackingSpeed

    if (overlayRef.current) {
      const halfSize = size / 2
      overlayRef.current.style.left = `${current.x - halfSize}px`
      overlayRef.current.style.top = `${current.y - halfSize}px`
    }

    if (showCoordinates) {
      const lngLat = map.unproject([current.x, current.y])
      setCurrentCoordinates([lngLat.lng, lngLat.lat])
    }

    animationFrameRef.current = requestAnimationFrame(animateToTarget)
  }, [map, trackingSpeed, size, showCoordinates])

  useEffect(() => {
    setIsLocked(locked)
    if (locked && target) {
      setCurrentCoordinates(target)
    }
  }, [locked, target])

  useEffect(() => {
    if (!map || !isLoaded) {
      return
    }

    if (target && !isLocked) {
      if (!currentPositionRef.current) {
        const currentProjected = map.project(coordinates)
        currentPositionRef.current = { x: currentProjected.x, y: currentProjected.y }
      }
      animateToTarget()
    } else {
      updatePosition()
    }

    const handleMapChange = () => {
      if (!targetRef.current || isLockedRef.current) {
        updatePosition()
      }
    }

    map.on("move", handleMapChange)
    map.on("zoom", handleMapChange)
    map.on("rotate", handleMapChange)
    map.on("pitch", handleMapChange)
    map.on("resize", handleMapChange)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      map.off("move", handleMapChange)
      map.off("zoom", handleMapChange)
      map.off("rotate", handleMapChange)
      map.off("pitch", handleMapChange)
      map.off("resize", handleMapChange)
    }
  }, [map, isLoaded, target, isLocked, coordinates, updatePosition, animateToTarget])

  const containerStyle: CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    pointerEvents: "none",
    zIndex: 10,
    transition: isLocked ? "none" : "opacity 0.2s ease-out",
  }

  const corners: Corner[] = ["topLeft", "topRight", "bottomLeft", "bottomRight"]

  return (
    <div ref={overlayRef} style={containerStyle}>
      {corners.map((corner) => {
        return (
          <CornerBracket
            key={corner}
            corner={corner}
            bracketLength={bracketLength}
            bracketThickness={activeThickness}
            gap={gap}
            color={activeColor}
          />
        )
      })}
      {showCrosshair && <Crosshair size={size} color={activeColor} thickness={activeThickness} />}
      {showCoordinates && <CoordinatesDisplay coordinates={currentCoordinates} size={size} color={activeColor} />}
    </div>
  )
}
