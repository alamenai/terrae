"use client"

import type { ReactNode } from "react"
import { Map } from "./map"
import { cn } from "@/lib/utils"
import type { MapProjection, MapCoordinates, MapCompareOrientation } from "./types"

const DEFAULT_CENTER: MapCoordinates = [0, 0]
const DEFAULT_ZOOM = 2
const DEFAULT_BEARING = 0
const DEFAULT_PITCH = 0
const DEFAULT_SIZE = 50
const DEFAULT_ORIENTATION: MapCompareOrientation = "horizontal"

const LABEL_BASE_STYLES = "absolute z-10 bg-background/95 backdrop-blur-sm border rounded px-2 py-1 text-xs font-medium"

type MapCompareProps = {
  accessToken?: string
  loader?: ReactNode
  beforeStyle?: string
  afterStyle?: string
  center?: MapCoordinates
  zoom?: number
  bearing?: number
  pitch?: number
  projection?: MapProjection
  defaultSize?: number
  orientation?: MapCompareOrientation
  showLabels?: boolean
}

export const MapCompare = ({
  accessToken,
  loader,
  beforeStyle,
  afterStyle,
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  bearing = DEFAULT_BEARING,
  pitch = DEFAULT_PITCH,
  projection,
  defaultSize = DEFAULT_SIZE,
  orientation = DEFAULT_ORIENTATION,
  showLabels = false,
}: MapCompareProps) => {
  const isVertical = orientation === "vertical"

  const beforeLabel = isVertical ? "Top" : "Before"
  const afterLabel = isVertical ? "Bottom" : "After"

  const beforeLabelPosition = "top-3 left-3"
  const afterLabelPosition = isVertical ? "bottom-3 right-3" : "top-3 right-3"

  return (
    <div className={cn("relative w-full h-full", isVertical ? "flex flex-col" : "flex")}>
      <MapPanel
        accessToken={accessToken}
        center={center}
        zoom={zoom}
        bearing={bearing}
        pitch={pitch}
        projection={projection}
        style={beforeStyle}
        loader={loader}
        label={beforeLabel}
        labelPosition={beforeLabelPosition}
        isVertical={isVertical}
        size={defaultSize}
        showLabel={showLabels}
      />
      <MapPanel
        accessToken={accessToken}
        center={center}
        zoom={zoom}
        bearing={bearing}
        pitch={pitch}
        projection={projection}
        style={afterStyle}
        loader={loader}
        label={afterLabel}
        labelPosition={afterLabelPosition}
        isVertical={isVertical}
        size={100 - defaultSize}
        showLabel={showLabels}
      />
    </div>
  )
}

type MapPanelProps = {
  accessToken?: string
  center: MapCoordinates
  zoom: number
  bearing: number
  pitch: number
  isVertical: boolean
  size: number
  showLabel: boolean
  label: string
  labelPosition: string
  projection?: MapProjection
  style?: string
  loader?: ReactNode
}

const MapPanel = ({
  accessToken,
  center,
  zoom,
  bearing,
  pitch,
  isVertical,
  size,
  showLabel,
  label,
  labelPosition,
  projection,
  style,
  loader,
}: MapPanelProps) => {
  return (
    <div
      className={cn("relative", isVertical ? "w-full" : "h-full")}
      style={isVertical ? { height: `${size}%` } : { width: `${size}%` }}
    >
      {showLabel && <div className={cn(LABEL_BASE_STYLES, labelPosition)}>{label}</div>}
      <Map
        accessToken={accessToken}
        center={center}
        zoom={zoom}
        bearing={bearing}
        pitch={pitch}
        projection={projection}
        style={style}
        loader={loader}
      />
    </div>
  )
}
