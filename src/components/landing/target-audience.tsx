"use client"

import type { ReactNode } from "react"

type Audience = {
  graphic: ReactNode
  title: string
  description: string
}

const DesignGraphic = () => {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-44 text-foreground">
      <circle cx="60" cy="60" r="20" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.2">
        <animate attributeName="r" values="20;30;20" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="60" cy="60" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4">
        <animate attributeName="r" values="8;16;8" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="60" cy="60" r="3" fill="currentColor" opacity="0.8">
        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
      </circle>
      <line x1="140" y1="30" x2="140" y2="90" stroke="currentColor" strokeWidth="1.5" opacity="0.15" />
      <circle cx="140" cy="60" r="4" fill="currentColor" opacity="0.6">
        <animate attributeName="cy" values="30;90;30" dur="4s" repeatCount="indefinite" />
      </circle>
      <path
        d="M100 80 L120 40 L140 60 L160 30 L180 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.3"
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
    <svg viewBox="0 0 200 120" className="w-full h-44 text-foreground">
      <rect
        x="20"
        y="15"
        width="160"
        height="90"
        rx="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.15"
      />
      <line x1="20" y1="30" x2="180" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.1" />
      <circle cx="32" cy="22.5" r="3" fill="currentColor" opacity="0.2" />
      <circle cx="42" cy="22.5" r="3" fill="currentColor" opacity="0.2" />
      <circle cx="52" cy="22.5" r="3" fill="currentColor" opacity="0.2" />
      <text x="35" y="50" fill="currentColor" fontSize="9" fontFamily="monospace" opacity="0">
        {"<Map>"}
        <animate attributeName="opacity" values="0;0.6;0.6" dur="3s" repeatCount="indefinite" />
      </text>
      <text x="45" y="62" fill="currentColor" fontSize="9" fontFamily="monospace" opacity="0">
        {"<MapCyclone />"}
        <animate attributeName="opacity" values="0;0;0.5;0.5" dur="3s" repeatCount="indefinite" />
      </text>
      <text x="35" y="74" fill="currentColor" fontSize="9" fontFamily="monospace" opacity="0">
        {"</Map>"}
        <animate attributeName="opacity" values="0;0;0;0.6" dur="3s" repeatCount="indefinite" />
      </text>
      <rect x="33" y="42" width="1" height="10" fill="currentColor" opacity="0.6">
        <animate attributeName="opacity" values="0.6;0;0.6" dur="0.8s" repeatCount="indefinite" />
        <animate attributeName="x" values="33;120;33" dur="3s" repeatCount="indefinite" />
        <animate attributeName="y" values="42;54;66" dur="3s" repeatCount="indefinite" />
      </rect>
    </svg>
  )
}

const VibeGraphic = () => {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-44 text-foreground">
      <circle
        cx="100"
        cy="60"
        r="25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.15"
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
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.1"
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
      <g opacity="0.7">
        <polygon
          points="100,35 103,42 110,42 105,47 107,54 100,50 93,54 95,47 90,42 97,42"
          fill="currentColor"
          opacity="0"
        >
          <animate attributeName="opacity" values="0;0.7;0" dur="2s" repeatCount="indefinite" />
        </polygon>
      </g>
      <circle cx="60" cy="40" r="2" fill="currentColor" opacity="0">
        <animate attributeName="opacity" values="0;0.6;0" dur="1.5s" begin="0.3s" repeatCount="indefinite" />
        <animate attributeName="r" values="1;3;1" dur="1.5s" begin="0.3s" repeatCount="indefinite" />
      </circle>
      <circle cx="145" cy="75" r="2" fill="currentColor" opacity="0">
        <animate attributeName="opacity" values="0;0.5;0" dur="2s" begin="0.8s" repeatCount="indefinite" />
        <animate attributeName="r" values="1;3;1" dur="2s" begin="0.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="50" cy="80" r="1.5" fill="currentColor" opacity="0">
        <animate attributeName="opacity" values="0;0.4;0" dur="1.8s" begin="1.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="155" cy="35" r="1.5" fill="currentColor" opacity="0">
        <animate attributeName="opacity" values="0;0.5;0" dur="2.2s" begin="0.5s" repeatCount="indefinite" />
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

export const TargetAudience = () => {
  return (
    <div className="space-y-8 sm:space-y-12">
      <div className="text-center space-y-3">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">Built for builders</h2>
        <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
          For design engineers, developers, and everyone who wants to ship stunning, modern maps — in no time.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {AUDIENCES.map((audience) => {
          return (
            <div
              key={audience.title}
              className="rounded-2xl border border-border/50 bg-card overflow-hidden hover:border-border transition-colors"
            >
              <div className="bg-muted/30 border-b border-border/30 flex items-center justify-center py-6 sm:py-8">
                {audience.graphic}
              </div>
              <div className="p-6 space-y-2">
                <h3 className="font-semibold text-base">{audience.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{audience.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
