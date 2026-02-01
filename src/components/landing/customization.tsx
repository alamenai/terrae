"use client"

import { useEffect, useRef, useState } from "react"
import { codeToHtml } from "shiki"
import { Map, MapRadar } from "@/registry/map"

type PropEntry = {
  name: string
  value: string | number | boolean
}

type Step = {
  props: PropEntry[]
}

const STEPS: Step[] = [
  {
    props: [],
  },
  {
    props: [{ name: "color", value: "rgba(59, 130, 246, 1)" }],
  },
  {
    props: [
      { name: "color", value: "rgba(59, 130, 246, 1)" },
      { name: "gridColor", value: "rgba(59, 130, 246, 0.3)" },
      { name: "backgroundColor", value: "rgba(0, 0, 30, 0.8)" },
    ],
  },
  {
    props: [
      { name: "color", value: "rgba(59, 130, 246, 1)" },
      { name: "gridColor", value: "rgba(59, 130, 246, 0.3)" },
      { name: "backgroundColor", value: "rgba(0, 0, 30, 0.8)" },
      { name: "duration", value: 1200 },
    ],
  },
  {
    props: [
      { name: "color", value: "rgba(59, 130, 246, 1)" },
      { name: "gridColor", value: "rgba(59, 130, 246, 0.3)" },
      { name: "backgroundColor", value: "rgba(0, 0, 30, 0.8)" },
      { name: "duration", value: 1200 },
      { name: "size", value: 300 },
    ],
  },
  {
    props: [
      { name: "color", value: "rgba(59, 130, 246, 1)" },
      { name: "gridColor", value: "rgba(59, 130, 246, 0.3)" },
      { name: "backgroundColor", value: "rgba(0, 0, 30, 0.8)" },
      { name: "duration", value: 1200 },
      { name: "size", value: 300 },
      { name: "rings", value: 6 },
    ],
  },
  {
    props: [
      { name: "color", value: "rgba(59, 130, 246, 1)" },
      { name: "gridColor", value: "rgba(59, 130, 246, 0.3)" },
      { name: "backgroundColor", value: "rgba(0, 0, 30, 0.8)" },
      { name: "duration", value: 1200 },
      { name: "size", value: 300 },
      { name: "rings", value: 6 },
      { name: "showCrosshairs", value: false },
    ],
  },
]

const STEP_PAUSE = 1000
const INTERSECTION_THRESHOLD = 0.3
const MAP_CENTER: [number, number] = [28.0, 38.0]
const DEFAULT_ZOOM = 4

const buildCodeString = (step: Step): string => {
  const propLines = step.props.map((prop) => {
    if (typeof prop.value === "boolean") {
      if (prop.value) {
        return `  ${prop.name}`
      }

      return `  ${prop.name}={false}`
    }

    if (typeof prop.value === "number") {
      return `  ${prop.name}={${prop.value}}`
    }

    return `  ${prop.name}="${prop.value}"`
  })

  if (propLines.length === 0) {
    return "<MapRadar />"
  }

  return `<MapRadar\n${propLines.join("\n")}\n/>`
}

const highlightSnippet = async (code: string) => {
  return codeToHtml(code, {
    lang: "tsx",
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    defaultColor: false,
  })
}

type RadarValues = {
  size: number
  color: string
  gridColor: string
  backgroundColor: string
  duration: number
  rings: number
  showCrosshairs: boolean
}

const getRadarValues = (step: Step): RadarValues => {
  const defaults: RadarValues = {
    size: 200,
    color: "rgba(0, 255, 70, 1)",
    gridColor: "rgba(0, 255, 70, 0.3)",
    backgroundColor: "rgba(0, 20, 0, 0.8)",
    duration: 2000,
    rings: 4,
    showCrosshairs: true,
  }

  for (const prop of step.props) {
    if (prop.name in defaults) {
      ;(defaults as Record<string, string | number | boolean>)[prop.name] = prop.value
    }
  }

  return defaults
}

export const Customization = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [stepIndex, setStepIndex] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const [highlightedHtml, setHighlightedHtml] = useState("")

  const currentStep = STEPS[stepIndex]
  const radarValues = getRadarValues(currentStep)

  useEffect(() => {
    const codeString = buildCodeString(currentStep)
    highlightSnippet(codeString).then(setHighlightedHtml)
  }, [stepIndex])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: INTERSECTION_THRESHOLD }
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!isInView) {
      return
    }

    const interval = setInterval(() => {
      setStepIndex((prev) => {
        return (prev + 1) % STEPS.length
      })
    }, STEP_PAUSE)

    return () => {
      clearInterval(interval)
    }
  }, [isInView])

  return (
    <div className="pt-12 sm:pt-16 pb-4 sm:pb-6" ref={sectionRef}>
      <div className="space-y-2 text-center mb-8 sm:mb-12">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight">
          One Prop Changes Everything
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
          Colors, grids, rings, speed. Swap a prop and watch it transform in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="h-80 sm:h-96 lg:h-[28rem] rounded-xl border bg-card overflow-hidden shadow-sm">
          <Map accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""} center={MAP_CENTER} zoom={DEFAULT_ZOOM}>
            <MapRadar
              id="customization-radar"
              coordinates={MAP_CENTER}
              size={radarValues.size}
              color={radarValues.color}
              gridColor={radarValues.gridColor}
              backgroundColor={radarValues.backgroundColor}
              duration={radarValues.duration}
              rings={radarValues.rings}
              showCrosshairs={radarValues.showCrosshairs}
            />
          </Map>
        </div>

        <div className="rounded-xl border bg-card p-4 shadow-sm flex items-center">
          {highlightedHtml ? (
            <div
              className="text-sm sm:text-base font-mono w-full leading-relaxed [&_pre]:bg-transparent! [&_code]:bg-transparent! [&_pre]:p-0! [&_pre]:m-0! [&_code]:whitespace-pre-wrap [&_code]:break-words"
              dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            />
          ) : (
            <pre className="text-sm sm:text-base font-mono w-full leading-relaxed text-muted-foreground">
              <code>{"<MapRadar />"}</code>
            </pre>
          )}
        </div>
      </div>
    </div>
  )
}
