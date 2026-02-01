"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export const Hero = () => {
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
          Components, not layers
        </h1>

        <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto px-4">
          Declarative, composable map components that replace imperative layers with simple props. The perfect companion
          for React.
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
