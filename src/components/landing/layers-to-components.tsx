"use client"

import { useEffect, useRef, useState } from "react"
import { codeToHtml } from "shiki"

const LAYER_CARDS = [
  `map.addSource("route", {
  type: "geojson",
  data: geojson,
})`,
  `map.addLayer({
  id: "route",
  type: "line",
  source: "route",
  paint: {
    "line-color": "#3b82f6",
    "line-width": 2,
  },
})`,
  `map.on("click", "route", (e) => {
  console.log(e.lngLat)
})`,
]

const COMPONENT_CARD = `<MapLine
  coordinates={coordinates}
  color="#3b82f6"
  width={2}
  onClick={(e) => console.log(e.lngLat)}
/>`

const TRANSITION_DURATION = 1200
const STAGGER_DELAY = 800
const PAUSE_DURATION = 2000
const HOLD_DURATION = TRANSITION_DURATION + STAGGER_DELAY + PAUSE_DURATION
const CARD_ROTATION_STEP = 2
const INTERSECTION_THRESHOLD = 0.3

const highlightSnippet = async (code: string, lang: string) => {
  return codeToHtml(code, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    defaultColor: false,
  })
}

const useHighlightedCode = (snippets: string[], lang: string) => {
  const [highlighted, setHighlighted] = useState<string[]>([])

  useEffect(() => {
    const highlight = async () => {
      const results = await Promise.all(
        snippets.map((code) => {
          return highlightSnippet(code, lang)
        })
      )
      setHighlighted(results)
    }

    highlight()
  }, [])

  return highlighted
}

type HighlightedCodeProps = {
  html: string
  className?: string
}

const HighlightedCode = ({ html, className = "" }: HighlightedCodeProps) => {
  return (
    <div
      className={`[&_pre]:bg-transparent! [&_code]:bg-transparent! [&_pre]:p-0! [&_pre]:m-0! [&_code]:whitespace-pre-wrap [&_code]:break-words ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

type LayerCardsProps = {
  showComponent: boolean
  highlightedCards: string[]
}

const LayerCards = ({ showComponent, highlightedCards }: LayerCardsProps) => {
  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center gap-3 transition-all duration-[1200ms] ease-in-out ${
        showComponent ? "opacity-0 scale-95 pointer-events-none delay-0" : "opacity-100 scale-100 delay-[800ms]"
      }`}
    >
      {LAYER_CARDS.map((code, index) => {
        return (
          <div
            key={index}
            className="w-full max-w-sm rounded-xl border bg-card p-3 shadow-sm"
            style={{
              transform: `rotate(${(index - 1) * CARD_ROTATION_STEP}deg)`,
            }}
          >
            {highlightedCards[index] ? (
              <HighlightedCode html={highlightedCards[index]} className="text-xs sm:text-sm" />
            ) : (
              <pre className="text-xs sm:text-sm font-mono text-muted-foreground whitespace-pre-wrap break-words">
                <code>{code}</code>
              </pre>
            )}
          </div>
        )
      })}
    </div>
  )
}

type ComponentCardProps = {
  showComponent: boolean
  highlightedHtml: string
}

const ComponentCard = ({ showComponent, highlightedHtml }: ComponentCardProps) => {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center transition-all duration-[1200ms] ease-in-out ${
        showComponent ? "opacity-100 scale-100 delay-[800ms]" : "opacity-0 scale-105 pointer-events-none delay-0"
      }`}
    >
      <div className="w-full max-w-sm rounded-xl border bg-card p-4 shadow-sm">
        {highlightedHtml ? (
          <HighlightedCode html={highlightedHtml} className="text-sm sm:text-base" />
        ) : (
          <pre className="text-sm sm:text-base font-mono text-foreground whitespace-pre-wrap break-words">
            <code>{COMPONENT_CARD}</code>
          </pre>
        )}
      </div>
    </div>
  )
}

export const LayersToComponents = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [showComponent, setShowComponent] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const highlightedLayerCards = useHighlightedCode(LAYER_CARDS, "javascript")
  const highlightedComponentCards = useHighlightedCode([COMPONENT_CARD], "tsx")

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
    const clearScheduledTimeout = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }

    if (!isInView) {
      clearScheduledTimeout()
      setShowComponent(false)
      return
    }

    const schedule = (show: boolean) => {
      timeoutRef.current = setTimeout(() => {
        setShowComponent(show)
        schedule(!show)
      }, HOLD_DURATION)
    }

    setShowComponent(true)
    schedule(false)

    return clearScheduledTimeout
  }, [isInView])

  return (
    <div className="pt-12 sm:pt-16 pb-4 sm:pb-6" ref={sectionRef}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-2">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight">
            Components Replaced Layers
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-lg leading-relaxed">
            No more imperative layers, sources, and paint properties. Just props.
          </p>
        </div>

        <div className="relative min-h-80 sm:min-h-96">
          <LayerCards showComponent={showComponent} highlightedCards={highlightedLayerCards} />
          <ComponentCard showComponent={showComponent} highlightedHtml={highlightedComponentCards[0] || ""} />
        </div>
      </div>
    </div>
  )
}
