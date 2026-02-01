"use client"

import { useEffect, useRef, useState } from "react"
import { Map, MapMarker, MarkerContent, MapAnimatedCircle, MapLineAnimated } from "@/registry/map"
import { Navigation } from "lucide-react"

const INSTALL_COMMANDS = [
  "npx shadcn@latest add https://terrae.dev/maps/map-marker.json",
  "npx shadcn@latest add https://terrae.dev/maps/map-animated-circle.json",
  "npx shadcn@latest add https://terrae.dev/maps/map-line-animated.json",
]

const INTERSECTION_THRESHOLD = 0.3
const TYPING_DURATION = 1000
const PAUSE_BETWEEN_COMMANDS = 800
const LOOP_DELAY = 1200

const MAP_CENTER: [number, number] = [-74.006, 40.7128]

const ANIMATED_PATH: [number, number][] = [
  [-74.02, 40.705],
  [-74.015, 40.71],
  [-74.008, 40.713],
  [-74.0, 40.715],
  [-73.993, 40.718],
]

export const PickNotInstall = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeCommand, setActiveCommand] = useState(-1)
  const [typedLength, setTypedLength] = useState(0)
  const [completedCommands, setCompletedCommands] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect()
          setActiveCommand(0)
        }
      },
      { threshold: INTERSECTION_THRESHOLD }
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (activeCommand < 0 || activeCommand >= INSTALL_COMMANDS.length) {
      return
    }

    const command = INSTALL_COMMANDS[activeCommand]
    const charInterval = TYPING_DURATION / command.length

    setTypedLength(0)

    let currentChar = 0
    const interval = setInterval(() => {
      currentChar++
      setTypedLength(currentChar)

      if (currentChar >= command.length) {
        clearInterval(interval)
        setCompletedCommands(activeCommand + 1)

        if (activeCommand < INSTALL_COMMANDS.length - 1) {
          setTimeout(() => {
            setActiveCommand(activeCommand + 1)
          }, PAUSE_BETWEEN_COMMANDS)
        } else {
          setTimeout(() => {
            setCompletedCommands(0)
            setTypedLength(0)
            setActiveCommand(0)
          }, LOOP_DELAY)
        }
      }
    }, charInterval)

    return () => {
      clearInterval(interval)
    }
  }, [activeCommand])

  return (
    <div className="pt-12 sm:pt-16 pb-4 sm:pb-6" ref={sectionRef}>
      <div className="space-y-2 text-center mb-8 sm:mb-12">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight">
          Install a Component, Not a Library
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
          Install only what you need. No bloated bundles, no unused code. Just the components you pick.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-950 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800">
            <div className="flex items-center gap-1.5">
              <div className="size-3 rounded-full bg-red-500" />
              <div className="size-3 rounded-full bg-yellow-500" />
              <div className="size-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs text-zinc-500 ml-2 font-mono">Terminal</span>
          </div>
          <div className="flex flex-col gap-2 p-4 flex-1">
            {INSTALL_COMMANDS.map((command, index) => {
              const isCompleted = index < completedCommands
              const isTyping = index === activeCommand

              if (!isCompleted && !isTyping) {
                return null
              }

              const displayedText = isCompleted ? command : command.slice(0, typedLength)
              const prefixClass = isCompleted ? "text-green-500" : "text-zinc-500"
              const textClass = isCompleted ? "text-zinc-500" : "text-zinc-200"

              return (
                <div key={command} className="flex items-start gap-2 min-w-0">
                  <span className={`select-none shrink-0 font-mono text-xs ${prefixClass}`}>
                    {isCompleted ? "✓" : "$"}
                  </span>
                  <pre className={`text-xs font-mono ${textClass}`}>
                    <code>
                      {displayedText}
                      {isTyping && <span className="animate-pulse text-zinc-200">▌</span>}
                    </code>
                  </pre>
                </div>
              )
            })}
          </div>
        </div>

        <div className="h-80 sm:h-96 lg:h-[28rem] rounded-xl border bg-card overflow-hidden shadow-sm">
          <Map accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""} center={MAP_CENTER} zoom={13}>
            {completedCommands >= 1 && (
              <MapMarker coordinates={MAP_CENTER}>
                <MarkerContent>
                  <div className="bg-blue-500 p-2 rounded-full shadow-lg shadow-blue-500/50">
                    <div className="size-2 bg-white rounded-full" />
                  </div>
                </MarkerContent>
              </MapMarker>
            )}
            {completedCommands >= 2 && (
              <MapAnimatedCircle
                id="pick-demo-circle"
                center={MAP_CENTER}
                radius={500}
                strokeColor="#3b82f6"
                strokeWidth={2}
                fillColor="#3b82f6"
                fillOpacity={0.15}
                duration={1500}
                fillDuration={800}
                animationMode="fill"
                loop
                loopDelay={1000}
              />
            )}
            {completedCommands >= 3 && (
              <MapLineAnimated
                id="pick-demo-line"
                path={ANIMATED_PATH}
                color="#f97316"
                width={4}
                duration={6000}
                loop
                showMarker
                markerIcon={
                  <div className="bg-orange-500 p-1.5 rounded-full shadow-lg">
                    <Navigation className="size-3 text-white" />
                  </div>
                }
              />
            )}
          </Map>
        </div>
      </div>
    </div>
  )
}
