"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-6">
        <Link
          href="/docs/installation#using-maplibre-gl"
          className="relative inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
          <span className="absolute inset-[1px] rounded-full bg-background" />
          <span className="relative px-3 py-1 flex items-center gap-1.5">
            Now with MapLibre GL support
            <ArrowRight className="size-3" />
          </span>
        </Link>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
          Map library for Design Engineers
        </h1>

        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
          Beautiful map components built with{" "}
          <a
            href="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#61DAFB] hover:underline font-medium"
          >
            React
          </a>
          ,{" "}
          <a
            href="https://www.typescriptlang.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3178C6] hover:underline font-medium"
          >
            TypeScript
          </a>
          ,{" "}
          <a
            href="https://tailwindcss.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#06B6D4] hover:underline font-medium"
          >
            Tailwind CSS
          </a>
          ,{" "}
          <a
            href="https://www.mapbox.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4264FB] hover:underline font-medium"
          >
            Mapbox GL JS
          </a>
          , and{" "}
          <a
            href="https://maplibre.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#396CB2] hover:underline font-medium"
          >
            MapLibre GL JS
          </a>
          . Perfect companion for{" "}
          <a
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:underline font-medium"
          >
            shadcn/ui
          </a>
          .
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
        <Button
          asChild
          size="lg"
          className="rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:opacity-90 w-full sm:w-auto px-8"
        >
          <Link href="/docs">
            Get Started <ArrowRight className="size-4 ml-2" />
          </Link>
        </Button>
        <Button variant="outline" asChild size="lg" className="rounded-full w-full sm:w-auto px-8">
          <Link href="/docs/components">Browse Components</Link>
        </Button>
      </div>
    </div>
  )
}
