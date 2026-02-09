"use client"

import { useEffect, useId, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { mapgl } from "./map-library"
import { useMap } from "./hooks"
import type { MapCoordinates } from "./types"

type RgbColor = { r: number; g: number; b: number }

type MapRadarProps = {
  coordinates: MapCoordinates
  size?: number
  color?: string
  gridColor?: string
  backgroundColor?: string
  duration?: number
  rings?: number
  showCrosshairs?: boolean
  pitchAlignment?: "map" | "viewport" | "auto"
}

type RadarContentProps = {
  instanceId: string
  size: number
  color: string
  gridColor: string
  backgroundColor: string
  duration: number
  rings: number
  showCrosshairs: boolean
}

type RadarGridProps = {
  radius: number
  gridColor: string
  rings: number
  showCrosshairs: boolean
}

type RadarSweepProps = {
  instanceId: string
  radius: number
  color: string
  duration: number
}

type SweepGradientProps = {
  radius: number
  sweepRadius: number
  rgb: RgbColor
}

type SweepSegmentProps = {
  radius: number
  sweepRadius: number
  rgb: RgbColor
  segmentIndex: number
}

const DEFAULT_SIZE = 200
const DEFAULT_COLOR = "rgba(0, 255, 70, 1)"
const DEFAULT_GRID_COLOR = "rgba(0, 255, 70, 0.3)"
const DEFAULT_BACKGROUND_COLOR = "rgba(0, 20, 0, 0.8)"
const DEFAULT_DURATION = 2000
const DEFAULT_RINGS = 4
const DEFAULT_CROSSHAIRS = true
const DEFAULT_PITCH_ALIGNMENT = "map" as const
const SWEEP_SEGMENT_COUNT = 20
const SWEEP_ARC = Math.PI / 2.5

const createMarker = (
  map: mapboxgl.Map,
  container: HTMLDivElement,
  coordinates: MapCoordinates,
  pitchAlignment: "map" | "viewport" | "auto"
) => {
  return new mapgl.Marker({
    element: container,
    anchor: "center",
    pitchAlignment,
  })
    .setLngLat(coordinates)
    .addTo(map)
}

export const MapRadar = ({
  coordinates,
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  gridColor = DEFAULT_GRID_COLOR,
  backgroundColor = DEFAULT_BACKGROUND_COLOR,
  duration = DEFAULT_DURATION,
  rings = DEFAULT_RINGS,
  showCrosshairs = DEFAULT_CROSSHAIRS,
  pitchAlignment = DEFAULT_PITCH_ALIGNMENT,
}: MapRadarProps) => {
  const { map, isLoaded } = useMap()
  const instanceId = useId()
  const markerRef = useRef<mapboxgl.Marker | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    if (!map || !isLoaded) {
      return
    }

    const container = document.createElement("div")
    containerRef.current = container

    const marker = createMarker(map, container, coordinates, pitchAlignment)
    markerRef.current = marker
    setIsMounted(true)

    return () => {
      marker.remove()
      markerRef.current = null
      containerRef.current = null
      setIsMounted(false)
    }
  }, [map, isLoaded, pitchAlignment])

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLngLat(coordinates)
    }
  }, [coordinates])

  if (!isMounted || !containerRef.current) {
    return null
  }

  return createPortal(
    <RadarContent
      instanceId={instanceId}
      size={size}
      color={color}
      gridColor={gridColor}
      backgroundColor={backgroundColor}
      duration={duration}
      rings={rings}
      showCrosshairs={showCrosshairs}
    />,
    containerRef.current
  )
}

const RadarContent = ({
  instanceId,
  size,
  color,
  gridColor,
  backgroundColor,
  duration,
  rings,
  showCrosshairs,
}: RadarContentProps) => {
  const radius = size / 2
  const clipId = `radar-clip-${instanceId}`

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
      }}
    >
      <style>{`@keyframes radar-sweep{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <clipPath id={clipId}>
            <circle cx={radius} cy={radius} r={radius - 2} />
          </clipPath>
        </defs>

        <circle cx={radius} cy={radius} r={radius - 2} fill={backgroundColor} />

        <RadarGrid radius={radius} gridColor={gridColor} rings={rings} showCrosshairs={showCrosshairs} />

        <RadarSweep instanceId={instanceId} radius={radius} color={color} duration={duration} />

        <circle cx={radius} cy={radius} r={4} fill={color} />

        <circle cx={radius} cy={radius} r={radius - 2} fill="none" stroke={color} strokeWidth={2} />
      </svg>
    </div>
  )
}

const RadarGrid = ({ radius, gridColor, rings, showCrosshairs }: RadarGridProps) => {
  const gridRadius = radius - 2

  return (
    <g>
      {Array.from({ length: rings }, (_, ringIndex) => {
        const ringRadius = (gridRadius / rings) * (ringIndex + 1)
        return (
          <circle
            key={ringIndex}
            cx={radius}
            cy={radius}
            r={ringRadius}
            fill="none"
            stroke={gridColor}
            strokeWidth={1}
          />
        )
      })}

      {showCrosshairs && (
        <>
          <line
            x1={radius - gridRadius}
            y1={radius}
            x2={radius + gridRadius}
            y2={radius}
            stroke={gridColor}
            strokeWidth={1}
          />
          <line
            x1={radius}
            y1={radius - gridRadius}
            x2={radius}
            y2={radius + gridRadius}
            stroke={gridColor}
            strokeWidth={1}
          />
        </>
      )}
    </g>
  )
}

const RadarSweep = ({ instanceId, radius, color, duration }: RadarSweepProps) => {
  const sweepRadius = radius - 2
  const rgb = parseRgba(color)
  const clipId = `radar-clip-${instanceId}`

  return (
    <g clipPath={`url(#${clipId})`}>
      <g
        style={{
          transformOrigin: `${radius}px ${radius}px`,
          animation: `radar-sweep ${duration}ms linear infinite`,
        }}
      >
        <SweepGradient radius={radius} sweepRadius={sweepRadius} rgb={rgb} />

        <line x1={radius} y1={radius} x2={radius} y2={radius - sweepRadius} stroke={color} strokeWidth={2} />
      </g>
    </g>
  )
}

const SweepGradient = ({ radius, sweepRadius, rgb }: SweepGradientProps) => {
  return (
    <>
      {Array.from({ length: SWEEP_SEGMENT_COUNT }, (_, segmentIndex) => {
        return (
          <SweepSegment
            key={segmentIndex}
            radius={radius}
            sweepRadius={sweepRadius}
            rgb={rgb}
            segmentIndex={segmentIndex}
          />
        )
      })}
    </>
  )
}

const SweepSegment = ({ radius, sweepRadius, rgb, segmentIndex }: SweepSegmentProps) => {
  const segmentArc = SWEEP_ARC / SWEEP_SEGMENT_COUNT
  const startAngle = -Math.PI / 2 - SWEEP_ARC + segmentArc * segmentIndex
  const endAngle = startAngle + segmentArc
  const opacity = (segmentIndex / SWEEP_SEGMENT_COUNT) * 0.4

  const startX = radius + sweepRadius * Math.cos(startAngle)
  const startY = radius + sweepRadius * Math.sin(startAngle)
  const endX = radius + sweepRadius * Math.cos(endAngle)
  const endY = radius + sweepRadius * Math.sin(endAngle)

  const largeArc = segmentArc > Math.PI ? 1 : 0

  return (
    <path
      d={`M ${radius} ${radius} L ${startX} ${startY} A ${sweepRadius} ${sweepRadius} 0 ${largeArc} 1 ${endX} ${endY} Z`}
      fill={`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`}
    />
  )
}

const parseRgba = (color: string): RgbColor => {
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (!match) {
    return { r: 0, g: 255, b: 70 }
  }

  return { r: parseInt(match[1], 10), g: parseInt(match[2], 10), b: parseInt(match[3], 10) }
}
