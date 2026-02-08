"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { mapgl } from "./map-library"
import { cn } from "@/lib/utils"
import { useMap } from "./hooks"
import type { MapCoordinates } from "./types"

type MusicNote = {
  id: number
  offsetX: number
  delay: number
  duration: number
  type: "note" | "eighth" | "double"
}

type MapMusicDiscProps = {
  coordinates: MapCoordinates
  size?: number
  image?: string
  spinning?: boolean
  spinDuration?: number
  showNotes?: boolean
  noteColor?: string
  discColor?: string
  centerColor?: string
  pitchAlignment?: "map" | "viewport" | "auto"
  className?: string
}

type DiscContentProps = {
  size: number
  image?: string
  spinning: boolean
  spinDuration: number
  discColor: string
  centerColor: string
  className?: string
}

type NotesContentProps = {
  size: number
  noteColor: string
  notes: MusicNote[]
}

type MusicDiscContentProps = {
  size: number
  image?: string
  spinning: boolean
  spinDuration: number
  showNotes: boolean
  noteColor: string
  discColor: string
  centerColor: string
  notes: MusicNote[]
  className?: string
}

type MusicNoteIconProps = {
  note: MusicNote
  color: string
}

const DEFAULT_SIZE = 64
const DEFAULT_SPINNING = true
const DEFAULT_SPIN_DURATION = 4000
const DEFAULT_SHOW_NOTES = true
const DEFAULT_NOTE_COLOR = "#a855f7"
const DEFAULT_DISC_COLOR = "#0a0a0a"
const DEFAULT_CENTER_COLOR = "#171717"
const DEFAULT_PITCH_ALIGNMENT = "viewport" as const

const NOTE_SYMBOLS = {
  note: "♪",
  eighth: "♫",
  double: "♬",
} as const

export const MapMusicDisc = ({
  coordinates,
  size = DEFAULT_SIZE,
  image,
  spinning = DEFAULT_SPINNING,
  spinDuration = DEFAULT_SPIN_DURATION,
  showNotes = DEFAULT_SHOW_NOTES,
  noteColor = DEFAULT_NOTE_COLOR,
  discColor = DEFAULT_DISC_COLOR,
  centerColor = DEFAULT_CENTER_COLOR,
  pitchAlignment = DEFAULT_PITCH_ALIGNMENT,
  className,
}: MapMusicDiscProps) => {
  const { map, isLoaded } = useMap()
  const discMarkerRef = useRef<mapboxgl.Marker | null>(null)
  const notesMarkerRef = useRef<mapboxgl.Marker | null>(null)
  const discContainerRef = useRef<HTMLDivElement | null>(null)
  const notesContainerRef = useRef<HTMLDivElement | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  const needsSeparateMarkers = showNotes && pitchAlignment === "map"

  useEffect(() => {
    if (!map || !isLoaded) {
      return
    }

    const discContainer = document.createElement("div")
    discContainerRef.current = discContainer

    const discMarker = new mapgl.Marker({
      element: discContainer,
      anchor: "center",
      pitchAlignment,
    })
      .setLngLat(coordinates)
      .addTo(map)

    discMarkerRef.current = discMarker

    if (needsSeparateMarkers) {
      const notesContainer = document.createElement("div")
      notesContainerRef.current = notesContainer

      const notesMarker = new mapgl.Marker({
        element: notesContainer,
        anchor: "center",
        pitchAlignment: "viewport",
      })
        .setLngLat(coordinates)
        .addTo(map)

      notesMarkerRef.current = notesMarker
    }

    setIsMounted(true)

    return () => {
      discMarker.remove()
      discMarkerRef.current = null
      discContainerRef.current = null

      if (notesMarkerRef.current) {
        notesMarkerRef.current.remove()
        notesMarkerRef.current = null
        notesContainerRef.current = null
      }

      setIsMounted(false)
    }
  }, [map, isLoaded, needsSeparateMarkers, pitchAlignment])

  useEffect(() => {
    if (discMarkerRef.current) {
      discMarkerRef.current.setLngLat(coordinates)
    }
    if (notesMarkerRef.current) {
      notesMarkerRef.current.setLngLat(coordinates)
    }
  }, [coordinates])

  if (!isMounted || !discContainerRef.current) {
    return null
  }

  if (needsSeparateMarkers) {
    return (
      <>
        {createPortal(
          <DiscContent
            size={size}
            image={image}
            spinning={spinning}
            spinDuration={spinDuration}
            discColor={discColor}
            centerColor={centerColor}
            className={className}
          />,
          discContainerRef.current
        )}
        {notesContainerRef.current &&
          createPortal(<NotesContent size={size} noteColor={noteColor} notes={NOTES} />, notesContainerRef.current)}
      </>
    )
  }

  return createPortal(
    <MusicDiscContent
      size={size}
      image={image}
      spinning={spinning}
      spinDuration={spinDuration}
      showNotes={showNotes}
      noteColor={noteColor}
      discColor={discColor}
      centerColor={centerColor}
      notes={NOTES}
      className={className}
    />,
    discContainerRef.current
  )
}

export const MusicDisc = ({
  size = DEFAULT_SIZE,
  image,
  spinning = DEFAULT_SPINNING,
  spinDuration = DEFAULT_SPIN_DURATION,
  showNotes = DEFAULT_SHOW_NOTES,
  noteColor = DEFAULT_NOTE_COLOR,
  discColor = DEFAULT_DISC_COLOR,
  centerColor = DEFAULT_CENTER_COLOR,
  className,
}: Omit<MapMusicDiscProps, "coordinates" | "pitchAlignment">) => {
  return (
    <MusicDiscContent
      size={size}
      image={image}
      spinning={spinning}
      spinDuration={spinDuration}
      showNotes={showNotes}
      noteColor={noteColor}
      discColor={discColor}
      centerColor={centerColor}
      notes={NOTES}
      className={className}
    />
  )
}

const MusicDiscContent = ({
  size,
  image,
  spinning,
  spinDuration,
  showNotes,
  noteColor,
  discColor,
  centerColor,
  notes,
  className,
}: MusicDiscContentProps) => {
  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      {showNotes && (
        <div style={{ position: "absolute", inset: 0, overflow: "visible" }}>
          {notes.map((note) => {
            return <MusicNoteIcon key={note.id} note={note} color={noteColor} />
          })}
        </div>
      )}
      <DiscContent
        size={size}
        image={image}
        spinning={spinning}
        spinDuration={spinDuration}
        discColor={discColor}
        centerColor={centerColor}
      />
    </div>
  )
}

const NotesContent = ({ size, noteColor, notes }: NotesContentProps) => {
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <div style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        {notes.map((note) => {
          return <MusicNoteIcon key={note.id} note={note} color={noteColor} />
        })}
      </div>
    </div>
  )
}

const DiscContent = ({ size, image, spinning, spinDuration, discColor, centerColor, className }: DiscContentProps) => {
  const grooveCount = Math.floor(size / 8)
  const centerSize = size * 0.35
  const holeSize = size * 0.08

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: discColor,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        overflow: "hidden",
        animation: spinning ? `music-disc-spin ${spinDuration}ms linear infinite` : "none",
      }}
    >
      {Array.from({ length: grooveCount }, (_, grooveIndex) => {
        const grooveRadius = ((grooveIndex + 1) / grooveCount) * 45
        return (
          <div
            key={grooveIndex}
            style={{
              position: "absolute",
              borderRadius: "50%",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              width: `${grooveRadius * 2}%`,
              height: `${grooveRadius * 2}%`,
              top: `${50 - grooveRadius}%`,
              left: `${50 - grooveRadius}%`,
            }}
          />
        )
      })}

      <div
        style={{
          position: "absolute",
          borderRadius: "50%",
          boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          width: centerSize,
          height: centerSize,
          top: (size - centerSize) / 2,
          left: (size - centerSize) / 2,
          backgroundColor: centerColor,
        }}
      >
        {image ? (
          <img src={image} alt="Album cover" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div
            style={{
              borderRadius: "50%",
              background: "linear-gradient(to bottom right, #262626, #0a0a0a)",
              width: centerSize * 0.8,
              height: centerSize * 0.8,
            }}
          />
        )}
      </div>

      <div
        style={{
          position: "absolute",
          borderRadius: "50%",
          backgroundColor: "black",
          width: holeSize,
          height: holeSize,
          top: (size - holeSize) / 2,
          left: (size - holeSize) / 2,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)",
        }}
      />
    </div>
  )
}

const MusicNoteIcon = ({ note, color }: MusicNoteIconProps) => {
  return (
    <span
      style={{
        position: "absolute",
        left: `calc(50% + ${note.offsetX}px)`,
        color,
        fontSize: "18px",
        fontWeight: "bold",
        pointerEvents: "none",
        userSelect: "none",
        animation: `music-disc-float ${note.duration}ms ease-out infinite`,
        animationDelay: `${note.delay}ms`,
      }}
    >
      {NOTE_SYMBOLS[note.type]}
    </span>
  )
}

const NOTES: MusicNote[] = [
  { id: 0, offsetX: -12, delay: 0, duration: 2400, type: "note" },
  { id: 1, offsetX: 8, delay: 500, duration: 2800, type: "eighth" },
  { id: 2, offsetX: -6, delay: 1000, duration: 2200, type: "double" },
  { id: 3, offsetX: 14, delay: 1500, duration: 2600, type: "note" },
  { id: 4, offsetX: -16, delay: 2000, duration: 2400, type: "eighth" },
  { id: 5, offsetX: 4, delay: 2500, duration: 3000, type: "double" },
]
