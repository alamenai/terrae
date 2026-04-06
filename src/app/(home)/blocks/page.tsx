import { BlockCard } from "@/components/blocks/card"
import { FuelStationBlock } from "@/components/blocks/fuel-station"
import { ConflictZoneBlock } from "@/components/blocks/conflict-zone"
import { TheftMonitorBlock } from "@/components/blocks/theft-monitor"
import { ComponentPreview } from "@/app/docs/_components/component-preview"
import { getBlockSource } from "@/lib/get-block-source"

const BlocksPage = async () => {
  const fuelStationSource = getBlockSource("fuel-station/index.tsx")
  const conflictZoneSource = getBlockSource("conflict-zone/index.tsx")
  const theftMonitorSource = getBlockSource("theft-monitor/index.tsx")

  return (
    <main className="flex-1 px-3 sm:px-6 py-12 sm:py-20 mx-auto w-full">
      <div className="max-w-5xl w-full mx-auto">
        <section className="mb-12 sm:mb-16">
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">Blocks</h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-xl">
              Real-world map examples built with Terrae components. Copy, paste, and customize.
            </p>
          </div>
        </section>

        <section className="space-y-16">
          <div>
            <BlockCard
              title="Fuel Station Finder"
              description="Display fuel stations with live price comparisons on hover."
              components={["Map", "MapMarker", "MarkerContent", "MarkerTooltip"]}
            />
            <ComponentPreview code={fuelStationSource} className="h-128">
              <FuelStationBlock />
            </ComponentPreview>
          </div>

          <div>
            <BlockCard
              title="Theft Monitor"
              description="Track incidents across a city district with hotspot zones, patrol routes, and live alert pulses."
              components={[
                "Map",
                "MapPolygon",
                "MapCircle",
                "MapAnimatedPulse",
                "MapLine",
                "MapMarker",
                "MarkerContent",
                "MarkerTooltip",
              ]}
            />
            <ComponentPreview code={theftMonitorSource} className="h-128">
              <TheftMonitorBlock />
            </ComponentPreview>
          </div>

          <div>
            <BlockCard
              title="Conflict Zone Monitor"
              description="Visualize territorial control, active strikes, radar, and unit positions on a military operations map."
              components={[
                "Map",
                "MapPolygon",
                "MapExplosion",
                "MapRadar",
                "MapTargetingReticle",
                "MapMarker",
                "MarkerContent",
                "MarkerTooltip",
              ]}
            />
            <ComponentPreview code={conflictZoneSource} className="h-128">
              <ConflictZoneBlock />
            </ComponentPreview>
          </div>
        </section>
      </div>
    </main>
  )
}

export default BlocksPage
