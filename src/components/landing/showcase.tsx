"use client"

import { DemoCard } from "./demo-card"
import { PerspectiveCard } from "./perspective-card"
import { TargetAudience } from "./target-audience"
import { LayersToComponents } from "./layers-to-components"
import { PickNotInstall } from "./pick-not-install"
import { ComposePattern } from "./compose-pattern"
import { Customization } from "./customization"
import { RadarDemo } from "./radar-demo"
import { PulsingHubsDemo } from "./pulsing-hubs-demo"
import { AvatarMarkersDemo } from "./avatar-markers-demo"
import { LiveTrackingDemo } from "./live-tracking-demo"
import { CircleMarkersDemo } from "./circle-markers-demo"
import { PulseMarkersDemo } from "./pulse-markers-demo"
import { AnimatedLinesDemo } from "./animated-lines-demo"
import { ChoroplethDemo } from "./choropleth-demo"
import { AnimatedRouteDemo } from "./animated-route-demo"
import { MinimapDemo } from "./minimap-demo"
import { Interactivity } from "./interactivity"
import { CallToAction } from "./call-to-action"

export const Showcase = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <PerspectiveCard className="sm:col-span-2">
        <DemoCard label="Defense Monitoring" className="h-112 sm:h-128 lg:h-144">
          <RadarDemo />
        </DemoCard>
      </PerspectiveCard>

      <div className="sm:col-span-2">
        <TargetAudience />
      </div>

      <DemoCard label="Open Source Hubs" className="h-80 sm:h-96 lg:h-[28rem]">
        <PulsingHubsDemo />
      </DemoCard>

      <DemoCard label="Online Developers" className="h-80 sm:h-96 lg:h-[28rem]">
        <AvatarMarkersDemo />
      </DemoCard>

      <div className="sm:col-span-2">
        <LayersToComponents />
      </div>

      <DemoCard label="ISS Live Tracking" className="h-80 sm:h-80 lg:h-[28rem]">
        <LiveTrackingDemo />
      </DemoCard>

      <DemoCard label="COVID-19 Global Cases" className="h-80 sm:h-96 lg:h-[28rem]">
        <CircleMarkersDemo />
      </DemoCard>

      <div className="sm:col-span-2">
        <PickNotInstall />
      </div>

      <DemoCard label="Europe Population" className="sm:col-span-2 h-96 sm:h-112 lg:h-128">
        <ChoroplethDemo />
      </DemoCard>

      <div className="sm:col-span-2">
        <ComposePattern />
      </div>

      <div className="sm:col-span-2">
        <Interactivity />
      </div>

      <div className="sm:col-span-2">
        <Customization />
      </div>

      <div className="sm:col-span-2 w-screen relative left-1/2 -translate-x-1/2 px-3 sm:px-6 py-12 sm:py-16 bg-linear-to-b from-muted/60 via-muted/30 to-transparent overflow-hidden">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div style={{ perspective: "800px" }}>
            <div className="origin-bottom rounded-2xl overflow-hidden" style={{ transform: "rotateX(10deg)" }}>
              <DemoCard label="COVID-19 Hotspots" className="h-80 sm:h-96 lg:h-[28rem]">
                <PulseMarkersDemo />
              </DemoCard>
            </div>
          </div>

          <div style={{ perspective: "800px" }}>
            <div className="origin-bottom rounded-2xl overflow-hidden" style={{ transform: "rotateX(10deg)" }}>
              <DemoCard label="COVID-19 Spread" className="h-80 sm:h-96 lg:h-[28rem]">
                <AnimatedLinesDemo />
              </DemoCard>
            </div>
          </div>

          <div style={{ perspective: "800px" }}>
            <div className="origin-top rounded-2xl overflow-hidden" style={{ transform: "rotateX(-10deg)" }}>
              <DemoCard label="Emergency Response" className="h-80 sm:h-96 lg:h-[28rem]">
                <AnimatedRouteDemo />
              </DemoCard>
            </div>
          </div>

          <div style={{ perspective: "800px" }}>
            <div className="origin-top rounded-2xl overflow-hidden" style={{ transform: "rotateX(-10deg)" }}>
              <DemoCard label="MiniMap Overview" className="h-80 sm:h-96 lg:h-[28rem]">
                <MinimapDemo />
              </DemoCard>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:col-span-2">
        <CallToAction />
      </div>
    </div>
  )
}
