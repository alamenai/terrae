"use client"

import { useEffect, useRef, useState } from "react"
import { codeToHtml } from "shiki"

const COMPOSE_STEPS = [
  `<Map>

</Map>`,
  `<Map>
  <MapMarker coordinates={[lng, lat]} />
</Map>`,
  `<Map>
  <MapMarker coordinates={[lng, lat]} />
  <MapLine coordinates={route} />
</Map>`,
  `<Map>
  <MapMarker coordinates={[lng, lat]} />
  <MapLine coordinates={route} />
  <MapPopup coordinates={[lng, lat]}>
    <p>Hello from here</p>
  </MapPopup>
</Map>`,
  `<Map>
  <MapMarker coordinates={[lng, lat]} />
  <MapLine coordinates={route} />
  <MapPopup coordinates={[lng, lat]}>
    <p>Hello from here</p>
  </MapPopup>
  <MapControls />
</Map>`,
]

const STEP_LABELS = ["Start with a Map", "Drop a Marker", "Draw a Route", "Add a Popup", "Add Controls"]

const STEP_PAUSE = 1000
const INTERSECTION_THRESHOLD = 0.3

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

export const ComposePattern = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [stepIndex, setStepIndex] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const [highlightedHtml, setHighlightedHtml] = useState("")

  useEffect(() => {
    highlightSnippet(COMPOSE_STEPS[stepIndex]).then(setHighlightedHtml)
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
        return (prev + 1) % COMPOSE_STEPS.length
      })
    }, STEP_PAUSE)

    return () => {
      clearInterval(interval)
    }
  }, [isInView])

  return (
    <div className="pt-12 sm:pt-16 pb-4 sm:pb-6" ref={sectionRef}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight">
              Compose, Don&apos;t Configure
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-lg leading-relaxed">
              Nest components inside {"<Map>"} like regular React children. Each one adds a feature. Remove it, and the
              feature is gone.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {STEP_LABELS.map((label, index) => {
              const isActive = index <= stepIndex

              return (
                <span
                  key={label}
                  className={`text-xs sm:text-sm px-3 py-1.5 rounded-full border font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-foreground text-background border-foreground"
                      : "bg-transparent text-muted-foreground border-border"
                  }`}
                >
                  {label}
                </span>
              )
            })}
          </div>
        </div>

        <div className="rounded-xl border bg-card p-4 shadow-sm flex items-center">
          {highlightedHtml ? (
            <div
              className="text-sm sm:text-base font-mono w-full leading-relaxed [&_pre]:bg-transparent! [&_code]:bg-transparent! [&_pre]:p-0! [&_pre]:m-0! [&_code]:whitespace-pre-wrap [&_code]:break-words"
              dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            />
          ) : (
            <pre className="text-sm sm:text-base font-mono w-full leading-relaxed text-muted-foreground">
              <code>{COMPOSE_STEPS[0]}</code>
            </pre>
          )}
        </div>
      </div>
    </div>
  )
}
