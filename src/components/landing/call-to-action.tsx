import Link from "next/link"
import { Button } from "@/components/ui/button"

const EarthHalf = () => {
  return (
    <svg viewBox="0 0 800 400" className="w-[150%] max-w-none -mx-[25%]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="earth-glow" cx="50%" cy="100%" r="60%">
          <stop offset="0%" stopColor="rgba(128, 128, 128, 0.12)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="earth-surface" cx="50%" cy="100%" r="50%">
          <stop offset="0%" stopColor="rgba(128, 128, 128, 0.08)" />
          <stop offset="60%" stopColor="rgba(128, 128, 128, 0.04)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <clipPath id="earth-clip">
          <rect x="0" y="0" width="800" height="400" />
        </clipPath>
      </defs>

      <circle cx="400" cy="500" r="360" fill="url(#earth-glow)" clipPath="url(#earth-clip)" />
      <circle cx="400" cy="500" r="300" fill="url(#earth-surface)" clipPath="url(#earth-clip)" />

      <circle
        cx="400"
        cy="500"
        r="300"
        fill="none"
        stroke="rgba(128, 128, 128, 0.15)"
        strokeWidth="1"
        clipPath="url(#earth-clip)"
      />

      <ellipse
        cx="400"
        cy="500"
        rx="300"
        ry="100"
        fill="none"
        stroke="rgba(128, 128, 128, 0.1)"
        strokeWidth="0.5"
        clipPath="url(#earth-clip)"
      />
      <ellipse
        cx="400"
        cy="500"
        rx="200"
        ry="300"
        fill="none"
        stroke="rgba(128, 128, 128, 0.1)"
        strokeWidth="0.5"
        clipPath="url(#earth-clip)"
      />
      <ellipse
        cx="400"
        cy="500"
        rx="100"
        ry="300"
        fill="none"
        stroke="rgba(128, 128, 128, 0.08)"
        strokeWidth="0.5"
        clipPath="url(#earth-clip)"
      />

      <line
        x1="100"
        y1="350"
        x2="700"
        y2="350"
        stroke="rgba(128, 128, 128, 0.08)"
        strokeWidth="0.5"
        clipPath="url(#earth-clip)"
      />
      <line
        x1="130"
        y1="300"
        x2="670"
        y2="300"
        stroke="rgba(128, 128, 128, 0.08)"
        strokeWidth="0.5"
        clipPath="url(#earth-clip)"
      />
      <line
        x1="175"
        y1="250"
        x2="625"
        y2="250"
        stroke="rgba(128, 128, 128, 0.06)"
        strokeWidth="0.5"
        clipPath="url(#earth-clip)"
      />
    </svg>
  )
}

export const CallToAction = () => {
  return (
    <div className="relative pt-20 sm:pt-28 pb-0 text-center overflow-hidden">
      <div className="absolute inset-0 flex items-end justify-center">
        <EarthHalf />
      </div>

      <div className="relative z-10 space-y-8 pb-16 sm:pb-24">
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-tight">
          Write Less. Ship Faster.
        </h2>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:opacity-90 w-full sm:w-auto px-8"
          >
            <Link href="/docs">Start Building</Link>
          </Button>
          <Button variant="outline" asChild size="lg" className="rounded-full w-full sm:w-auto px-8">
            <Link href="/docs/components">Browse Components</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
