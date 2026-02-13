"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export const Hero = () => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-6">
        <Link
          href="/docs/components#environment"
          className="relative inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="absolute inset-0 rounded-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500" />
          <span className="absolute inset-[1px] rounded-full bg-background" />
          <span className="relative px-3 py-1 flex items-center gap-1.5">
            Introducing Environment Components
            <ArrowRight className="size-3" />
          </span>
        </Link>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
          Components, not{" "}
          <span className="relative inline-block">
            <span className="absolute top-[0.15em] left-[0.15em] text-pink-500/20 select-none" aria-hidden="true">
              layers
            </span>
            <span className="absolute top-[0.08em] left-[0.08em] text-purple-500/40 select-none" aria-hidden="true">
              layers
            </span>
            <span className="bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              layers
            </span>
          </span>
        </h1>

        <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto px-4">
          Composable and animated components that replace imperative layers with simple props. The perfect companion for
          shadcn/ui.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
        <Button
          asChild
          size="lg"
          className="rounded-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:opacity-90 w-full sm:w-auto px-8"
        >
          <Link href="/docs/installation">Start Building</Link>
        </Button>
        <Button variant="outline" asChild size="lg" className="rounded-full w-full sm:w-auto px-8">
          <Link href="/docs/components">Browse Components</Link>
        </Button>
      </div>
    </div>
  )
}
