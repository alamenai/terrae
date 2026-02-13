import Link from "next/link"
import { Hero } from "@/components/landing/hero"
import { PerspectiveCard } from "@/components/landing/perspective-card"
import { DemoCard } from "@/components/landing/demo-card"
import { RadarDemo } from "@/components/landing/radar-demo"
import { MeteorDemo } from "@/components/landing/meteor-demo"
import { LightningDemo } from "@/components/landing/lightning-demo"
import { FootprintDemo } from "@/components/landing/footprint-demo"
import { FireDemo } from "@/components/landing/fire-demo"
import { TargetAudience } from "@/components/landing/target-audience"
import { CodeComparison } from "@/components/landing/code-comparison"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const Page = () => {
  return (
    <main className="flex-1 px-3 sm:px-6 py-12 sm:py-20 mx-auto w-full">
      <section className="max-w-5xl w-full mx-auto">
        <Hero />
      </section>
      <section className="max-w-7xl w-full mx-auto mt-2 sm:mt-3">
        <PerspectiveCard>
          <DemoCard label="Cyclone Tracking" className="h-128 sm:h-144 lg:h-160">
            <RadarDemo />
          </DemoCard>
        </PerspectiveCard>
      </section>
      <section className="max-w-7xl w-full mx-auto mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <DemoCard label="Meteor Impact" className="h-112 sm:h-128 lg:h-144">
          <MeteorDemo />
        </DemoCard>
        <DemoCard label="Lightning Storm" className="h-112 sm:h-128 lg:h-144">
          <LightningDemo />
        </DemoCard>
        <DemoCard label="Route Tracking" className="h-112 sm:h-128 lg:h-144">
          <FootprintDemo />
        </DemoCard>
        <DemoCard label="Wildfire Spread" className="h-112 sm:h-128 lg:h-144">
          <FireDemo />
        </DemoCard>
      </section>
      <section className="max-w-7xl w-full mx-auto mt-8 sm:mt-10 flex justify-center">
        <Button variant="outline" asChild size="lg" className="rounded-full px-8">
          <Link href="/docs/components" className="flex items-center gap-2">
            Browse All Components
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </section>
      <section className="max-w-7xl w-full mx-auto mt-16 sm:mt-24">
        <TargetAudience />
      </section>
      <section className="max-w-7xl w-full mx-auto mt-16 sm:mt-24">
        <div className="text-center space-y-3 mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            Write maps in minutes, not hours
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
            See how Terrae replaces hundreds of lines of imperative code with clean, declarative components.
          </p>
        </div>
        <CodeComparison />
      </section>
    </main>
  )
}

export default Page
