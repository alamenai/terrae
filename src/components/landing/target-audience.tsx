"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

type Audience = {
  graphic: ReactNode
  title: string
  description: string
}

const DesignGraphic = () => {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-44">
      <defs>
        <linearGradient id="design-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>

      <circle cx="60" cy="60" r="20" fill="none" stroke="url(#design-grad)" strokeWidth="1.5" opacity="0.3">
        <animate attributeName="r" values="20;30;20" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="60" cy="60" r="8" fill="none" stroke="url(#design-grad)" strokeWidth="1.5" opacity="0.5">
        <animate attributeName="r" values="8;16;8" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="60" cy="60" r="3" fill="#3b82f6" opacity="0.9">
        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
      </circle>

      <line x1="140" y1="30" x2="140" y2="90" stroke="currentColor" strokeWidth="1.5" opacity="0.1" />
      <circle cx="140" cy="60" r="4" fill="#8b5cf6" opacity="0.7">
        <animate attributeName="cy" values="30;90;30" dur="4s" repeatCount="indefinite" />
      </circle>

      <path
        d="M100 80 L120 40 L140 60 L160 30 L180 50"
        fill="none"
        stroke="url(#design-grad)"
        strokeWidth="1.5"
        opacity="0.4"
        strokeDasharray="120"
        strokeDashoffset="120"
      >
        <animate attributeName="stroke-dashoffset" values="120;0" dur="2s" repeatCount="indefinite" />
      </path>
    </svg>
  )
}

const CodeGraphic = () => {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-44">
      <defs>
        <linearGradient id="code-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>

      <rect
        x="20"
        y="15"
        width="160"
        height="90"
        rx="8"
        fill="none"
        stroke="url(#code-grad)"
        strokeWidth="1.2"
        opacity="0.2"
      />
      <line x1="20" y1="30" x2="180" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.08" />

      <circle cx="32" cy="22.5" r="3" fill="#ef4444" opacity="0.4" />
      <circle cx="42" cy="22.5" r="3" fill="#eab308" opacity="0.4" />
      <circle cx="52" cy="22.5" r="3" fill="#22c55e" opacity="0.4" />

      <line x1="38" y1="30" x2="38" y2="105" stroke="currentColor" strokeWidth="0.5" opacity="0.06" />

      <text x="27" y="44" fill="currentColor" fontSize="6" fontFamily="monospace" opacity="0.15">
        1
      </text>
      <text x="27" y="54" fill="currentColor" fontSize="6" fontFamily="monospace" opacity="0.15">
        2
      </text>
      <text x="27" y="64" fill="currentColor" fontSize="6" fontFamily="monospace" opacity="0.15">
        3
      </text>
      <text x="27" y="74" fill="currentColor" fontSize="6" fontFamily="monospace" opacity="0.15">
        4
      </text>
      <text x="27" y="84" fill="currentColor" fontSize="6" fontFamily="monospace" opacity="0.15">
        5
      </text>
      <text x="27" y="94" fill="currentColor" fontSize="6" fontFamily="monospace" opacity="0.15">
        6
      </text>

      <rect x="20" y="56" width="160" height="11" fill="#8b5cf6" opacity="0" rx="0">
        <animate attributeName="opacity" values="0;0;0.04;0.04;0.04;0" dur="6s" repeatCount="indefinite" />
        <animate attributeName="y" values="35;35;56;56;76;76" dur="6s" repeatCount="indefinite" />
      </rect>

      <g opacity="0">
        <animate attributeName="opacity" values="0;0.55;0.55;0.55;0.55;0.55" dur="6s" repeatCount="indefinite" />
        <text x="42" y="44" fill="#c084fc" fontSize="7" fontFamily="monospace">
          import
        </text>
        <text x="78" y="44" fill="currentColor" fontSize="7" fontFamily="monospace" opacity="0.5">
          {"{"}
        </text>
        <text x="84" y="44" fill="#60a5fa" fontSize="7" fontFamily="monospace">
          Map
        </text>
        <text x="102" y="44" fill="currentColor" fontSize="7" fontFamily="monospace" opacity="0.5">
          {"}"}
        </text>
        <text x="108" y="44" fill="#c084fc" fontSize="7" fontFamily="monospace">
          from
        </text>
        <text x="130" y="44" fill="#4ade80" fontSize="7" fontFamily="monospace">
          {'"terrae"'}
        </text>
      </g>

      <g opacity="0">
        <animate attributeName="opacity" values="0;0;0.55;0.55;0.55;0.55" dur="6s" repeatCount="indefinite" />
        <text x="42" y="54" fill="#c084fc" fontSize="7" fontFamily="monospace">
          import
        </text>
        <text x="78" y="54" fill="currentColor" fontSize="7" fontFamily="monospace" opacity="0.5">
          {"{"}
        </text>
        <text x="84" y="54" fill="#60a5fa" fontSize="7" fontFamily="monospace">
          MapRain
        </text>
        <text x="124" y="54" fill="currentColor" fontSize="7" fontFamily="monospace" opacity="0.5">
          {"}"}
        </text>
        <text x="130" y="54" fill="#c084fc" fontSize="7" fontFamily="monospace">
          from
        </text>
        <text x="152" y="54" fill="#4ade80" fontSize="7" fontFamily="monospace">
          {'"..."'}
        </text>
      </g>

      <g opacity="0">
        <animate attributeName="opacity" values="0;0;0;0.6;0.6;0.6" dur="6s" repeatCount="indefinite" />
        <text x="42" y="68" fill="#8b5cf6" fontSize="7" fontFamily="monospace">
          {"<"}
        </text>
        <text x="48" y="68" fill="#60a5fa" fontSize="7" fontFamily="monospace">
          Map
        </text>
        <text x="66" y="68" fill="#fb923c" fontSize="7" fontFamily="monospace">
          zoom
        </text>
        <text x="88" y="68" fill="currentColor" fontSize="7" fontFamily="monospace" opacity="0.5">
          =
        </text>
        <text x="93" y="68" fill="currentColor" fontSize="7" fontFamily="monospace" opacity="0.5">
          {"{"}
        </text>
        <text x="98" y="68" fill="#f472b6" fontSize="7" fontFamily="monospace">
          4
        </text>
        <text x="104" y="68" fill="currentColor" fontSize="7" fontFamily="monospace" opacity="0.5">
          {"}"}
        </text>
        <text x="110" y="68" fill="#8b5cf6" fontSize="7" fontFamily="monospace">
          {">"}
        </text>
      </g>

      <g opacity="0">
        <animate attributeName="opacity" values="0;0;0;0;0.6;0.6" dur="6s" repeatCount="indefinite" />
        <text x="52" y="78" fill="#8b5cf6" fontSize="7" fontFamily="monospace">
          {"<"}
        </text>
        <text x="58" y="78" fill="#60a5fa" fontSize="7" fontFamily="monospace">
          MapRain
        </text>
        <text x="98" y="78" fill="#fb923c" fontSize="7" fontFamily="monospace">
          density
        </text>
        <text x="138" y="78" fill="currentColor" fontSize="7" fontFamily="monospace" opacity="0.5">
          =
        </text>
        <text x="143" y="78" fill="currentColor" fontSize="7" fontFamily="monospace" opacity="0.5">
          {"{"}
        </text>
        <text x="148" y="78" fill="#f472b6" fontSize="7" fontFamily="monospace">
          .5
        </text>
        <text x="158" y="78" fill="currentColor" fontSize="7" fontFamily="monospace" opacity="0.5">
          {"}"}
        </text>
        <text x="163" y="78" fill="#8b5cf6" fontSize="7" fontFamily="monospace">
          {"/>"}
        </text>
      </g>

      <g opacity="0">
        <animate attributeName="opacity" values="0;0;0;0;0;0.6" dur="6s" repeatCount="indefinite" />
        <text x="42" y="88" fill="#8b5cf6" fontSize="7" fontFamily="monospace">
          {"</"}
        </text>
        <text x="52" y="88" fill="#60a5fa" fontSize="7" fontFamily="monospace">
          Map
        </text>
        <text x="70" y="88" fill="#8b5cf6" fontSize="7" fontFamily="monospace">
          {">"}
        </text>
      </g>

      <rect x="42" y="36" width="1.5" height="8" fill="#a855f7" rx="0.5">
        <animate attributeName="opacity" values="0.9;0;0.9" dur="0.8s" repeatCount="indefinite" />
        <animate attributeName="y" values="36;36;46;46;59;59;69;69;80;80" dur="6s" repeatCount="indefinite" />
      </rect>
    </svg>
  )
}

const VibeGraphic = () => {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-44">
      <defs>
        <linearGradient id="vibe-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
      </defs>

      <circle
        cx="100"
        cy="60"
        r="25"
        fill="none"
        stroke="url(#vibe-grad)"
        strokeWidth="1.2"
        opacity="0.2"
        strokeDasharray="4 4"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 100 60;360 100 60"
          dur="8s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="100"
        cy="60"
        r="40"
        fill="none"
        stroke="url(#vibe-grad)"
        strokeWidth="1"
        opacity="0.12"
        strokeDasharray="6 6"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="360 100 60;0 100 60"
          dur="12s"
          repeatCount="indefinite"
        />
      </circle>

      <g opacity="0.8">
        <polygon
          points="100,35 103,42 110,42 105,47 107,54 100,50 93,54 95,47 90,42 97,42"
          fill="url(#vibe-grad)"
          opacity="0"
        >
          <animate attributeName="opacity" values="0;0.8;0" dur="2s" repeatCount="indefinite" />
        </polygon>
      </g>

      <circle cx="60" cy="40" r="2" fill="#ec4899" opacity="0">
        <animate attributeName="opacity" values="0;0.7;0" dur="1.5s" begin="0.3s" repeatCount="indefinite" />
        <animate attributeName="r" values="1;3;1" dur="1.5s" begin="0.3s" repeatCount="indefinite" />
      </circle>
      <circle cx="145" cy="75" r="2" fill="#f472b6" opacity="0">
        <animate attributeName="opacity" values="0;0.6;0" dur="2s" begin="0.8s" repeatCount="indefinite" />
        <animate attributeName="r" values="1;3;1" dur="2s" begin="0.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="50" cy="80" r="1.5" fill="#ec4899" opacity="0">
        <animate attributeName="opacity" values="0;0.5;0" dur="1.8s" begin="1.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="155" cy="35" r="1.5" fill="#f472b6" opacity="0">
        <animate attributeName="opacity" values="0;0.6;0" dur="2.2s" begin="0.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

const AUDIENCES: Audience[] = [
  {
    graphic: <DesignGraphic />,
    title: "Design Engineers",
    description:
      "Create stunning map animations with smooth, GPU-accelerated performance. Cyclones, meteors, lightning — all ready to go.",
  },
  {
    graphic: <CodeGraphic />,
    title: "Frontend Engineers",
    description: "Drop composable components into your React app. Enjoy TypeScript-first APIs with full type safety.",
  },
  {
    graphic: <VibeGraphic />,
    title: "Vibe Coders",
    description: "Just vibe and ship. Prompt a map, drop in a cyclone, add some fire — no docs needed.",
  },
]

const INTERSECTION_THRESHOLD = 0.15

export const TargetAudience = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: INTERSECTION_THRESHOLD }
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={sectionRef} className="space-y-8 sm:space-y-12">
      <div className="text-center space-y-3">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
          Made for{" "}
          <span className="bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            builders
          </span>
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
          For design engineers, developers, and everyone who wants to ship stunning, modern maps — in no time.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {AUDIENCES.map((audience, index) => {
          return (
            <div
              key={audience.title}
              className={cn(
                "rounded-2xl transition-all duration-700 ease-out",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: isVisible ? `${index * 150}ms` : "0ms" }}
            >
              <div className="h-full rounded-2xl bg-card overflow-hidden border border-border/50">
                <div className="bg-muted/20 border-b border-border/30 flex items-center justify-center py-6 sm:py-8">
                  {audience.graphic}
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="font-semibold text-base">{audience.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{audience.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
