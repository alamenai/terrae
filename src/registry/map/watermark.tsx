"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type MapWatermarkPosition =
  | "center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top"
  | "bottom"
  | "left"
  | "right"

type MapWatermarkProps = {
  children: ReactNode
  position?: MapWatermarkPosition
  className?: string
}

const DEFAULT_POSITION: MapWatermarkPosition = "center"

const POSITION_CLASSES: Record<MapWatermarkPosition, string> = {
  center: "inset-0 items-center justify-center",
  top: "inset-x-0 top-0 items-start justify-center pt-4",
  bottom: "inset-x-0 bottom-0 items-end justify-center pb-4",
  left: "inset-y-0 left-0 items-center justify-start pl-4",
  right: "inset-y-0 right-0 items-center justify-end pr-4",
  "top-left": "top-0 left-0 items-start justify-start p-4",
  "top-right": "top-0 right-0 items-start justify-end p-4",
  "bottom-left": "bottom-0 left-0 items-end justify-start p-4",
  "bottom-right": "bottom-0 right-0 items-end justify-end p-4",
}

export const MapWatermark = ({
  children,
  position = DEFAULT_POSITION,
  className = "text-[8rem] font-extrabold leading-none tracking-tighter text-black/10 dark:text-white/10",
}: MapWatermarkProps) => {
  const positionClass = POSITION_CLASSES[position]

  return (
    <div
      className={cn("absolute z-20 flex select-none pointer-events-none", positionClass, className)}
      aria-hidden="true"
    >
      {children}
    </div>
  )
}
