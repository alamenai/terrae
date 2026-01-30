"use client"

import type mapboxgl from "mapbox-gl"
import type { PopupOptions } from "mapbox-gl"
import { mapgl } from "./map-library"
import { useEffect, useMemo, useRef, type ReactNode } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMap } from "./hooks"
import type { MapCoordinates } from "./types"

type MapPopupProps = {
  /** Coordinates [longitude, latitude] for popup position */
  coordinates: MapCoordinates
  /** Callback when popup is closed */
  onClose?: () => void
  /** Popup content */
  children: ReactNode
  /** Additional CSS classes for the popup container */
  className?: string
  /** Show a close button in the popup (default: false) */
  closeButton?: boolean
} & Omit<PopupOptions, "className" | "closeButton">

export function MapPopup({
  coordinates,
  onClose,
  children,
  className,
  closeButton = false,
  ...popupOptions
}: MapPopupProps) {
  const { map } = useMap()
  const popupRef = useRef<mapboxgl.Popup | null>(null)

  const container = useMemo(() => document.createElement("div"), [])

  useEffect(() => {
    if (!map || !map.isStyleLoaded()) return

    const popup = new mapgl.Popup({
      offset: 16,
      ...popupOptions,
      closeButton: false,
      className: "custom-map-popup",
    })
      .setMaxWidth("none")
      .setDOMContent(container)
      .setLngLat(coordinates)
      .addTo(map)

    const onCloseProp = () => onClose?.()

    popup.on("close", onCloseProp)

    popupRef.current = popup

    return () => {
      popup.off("close", onCloseProp)
      popup.remove()
      popupRef.current = null
    }
  }, [map, coordinates, popupOptions, onClose, container])

  return createPortal(
    <div
      className={cn(
        "relative rounded-md border bg-popover p-3 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
        className
      )}
    >
      {closeButton && (
        <button
          type="button"
          onClick={() => {
            popupRef.current?.remove()
            onClose?.()
          }}
          className="absolute top-1 right-1 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Close popup"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      )}
      {children}
    </div>,
    container
  )
}
