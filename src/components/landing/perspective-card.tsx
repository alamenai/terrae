"use client"

import type { ReactNode } from "react"
import { useEffect, useRef, useState } from "react"

const DEFAULT_PERSPECTIVE = 600
const DEFAULT_MAX_ROTATION = 30

type PerspectiveCardProps = {
  children: ReactNode
  className?: string
  perspective?: number
  maxRotation?: number
}

export const PerspectiveCard = ({
  children,
  className,
  perspective = DEFAULT_PERSPECTIVE,
  maxRotation = DEFAULT_MAX_ROTATION,
}: PerspectiveCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState(maxRotation)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) {
        return
      }

      const rect = containerRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const progress = Math.max(0, Math.min(1, 1 - rect.top / viewportHeight))

      setRotation(maxRotation * (1 - progress))
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [maxRotation])

  return (
    <div ref={containerRef} className={className} style={{ perspective }}>
      <div
        className="origin-bottom rounded-2xl sm:rounded-3xl overflow-hidden"
        style={{ transform: `rotateX(${rotation}deg)`, transition: "transform 1.5s ease-out" }}
      >
        {children}
      </div>
    </div>
  )
}
