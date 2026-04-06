"use client"

import {
  Map,
  MapPolygon,
  MapExplosion,
  MapRadar,
  MapTargetingReticle,
  MapMarker,
  MarkerContent,
  MarkerTooltip,
} from "@/registry/map"
import { cn } from "@/lib/utils"

type FactionId = "allied" | "enemy"

type Unit = {
  id: string
  name: string
  type: string
  coordinates: [number, number]
  faction: FactionId
  strength: number
  status: "active" | "engaging" | "retreating"
}

type Strike = {
  id: string
  coordinates: [number, number]
}

type Target = {
  id: string
  coordinates: [number, number]
  locked: boolean
}

type UnitMarkerProps = {
  unit: Unit
}

const ALLIED_TERRITORY: [number, number][] = [
  [30, 50],
  [36.5, 50],
  [36, 46],
  [33, 44],
  [30, 44],
]

const ENEMY_TERRITORY: [number, number][] = [
  [36.5, 50],
  [44, 50],
  [44, 44],
  [38, 44],
  [36, 46],
]

const RADAR_COORDINATES: [number, number] = [32.5, 47.5]

const UNITS: Unit[] = [
  {
    id: "alpha-armor",
    name: "Alpha Armored Div.",
    type: "Armored",
    coordinates: [33, 48.5],
    faction: "allied",
    strength: 84,
    status: "engaging",
  },
  {
    id: "air-wing",
    name: "Air Wing 7",
    type: "Aviation",
    coordinates: [31, 46.5],
    faction: "allied",
    strength: 100,
    status: "active",
  },
  {
    id: "infantry-3",
    name: "3rd Infantry",
    type: "Infantry",
    coordinates: [35, 47],
    faction: "allied",
    strength: 62,
    status: "engaging",
  },
  {
    id: "red-strike",
    name: "Strike Force 7",
    type: "Artillery",
    coordinates: [39, 48.8],
    faction: "enemy",
    strength: 71,
    status: "engaging",
  },
  {
    id: "red-mobile",
    name: "Mobile Unit 3",
    type: "Armored",
    coordinates: [42, 47],
    faction: "enemy",
    strength: 90,
    status: "active",
  },
]

const STRIKES: Strike[] = [
  { id: "strike-1", coordinates: [37.5, 48.2] },
  { id: "strike-2", coordinates: [39.8, 47.5] },
  { id: "strike-3", coordinates: [41.2, 48.8] },
]

const TARGETS: Target[] = [
  { id: "target-1", coordinates: [37, 47.8], locked: true },
  { id: "target-2", coordinates: [40.5, 46.8], locked: false },
  { id: "target-3", coordinates: [38, 48.5], locked: false },
]

const FACTION_COLORS: Record<FactionId, string> = {
  allied: "#3b82f6",
  enemy: "#ef4444",
}

const STATUS_CLASSES: Record<Unit["status"], string> = {
  active: "text-green-500",
  engaging: "text-amber-500",
  retreating: "text-red-500",
}

const UnitMarker = ({ unit }: UnitMarkerProps) => {
  const color = FACTION_COLORS[unit.faction]

  return (
    <MapMarker coordinates={unit.coordinates}>
      <MarkerContent>
        <div
          className="size-3 rounded-full border-2 border-white shadow-lg hover:scale-150 transition-transform"
          style={{ backgroundColor: color }}
        />
      </MarkerContent>
      <MarkerTooltip className="rounded-xl bg-popover text-popover-foreground p-3">
        <div className="min-w-40 text-sm">
          <div className="flex items-center gap-2 mb-1">
            <div className="size-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
            <span className="font-semibold">{unit.name}</span>
          </div>
          <div className="text-xs text-muted-foreground mb-2">
            {unit.type} · {unit.faction === "allied" ? "Allied" : "Enemy"}
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Strength</span>
              <span className="font-medium">{unit.strength}%</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Status</span>
              <span className={cn("font-medium capitalize", STATUS_CLASSES[unit.status])}>{unit.status}</span>
            </div>
          </div>
        </div>
      </MarkerTooltip>
    </MapMarker>
  )
}

export const ConflictZoneBlock = () => {
  const alliedUnits = UNITS.filter((unit) => {
    return unit.faction === "allied"
  })
  const enemyUnits = UNITS.filter((unit) => {
    return unit.faction === "enemy"
  })

  return (
    <div className="w-full h-full relative">
      <div className="absolute top-3 right-3 z-10 bg-background/95 backdrop-blur-md rounded-xl p-3 border border-border/50 shadow-lg text-sm min-w-40">
        <div className="tracking-wider text-[10px] text-muted-foreground uppercase mb-2">Eastern Front</div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="size-2 rounded-full bg-blue-500" />
              <span className="text-xs">Allied</span>
            </div>
            <span className="text-xs font-medium">{alliedUnits.length} units</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="size-2 rounded-full bg-red-500" />
              <span className="text-xs">Enemy</span>
            </div>
            <span className="text-xs font-medium">{enemyUnits.length} units</span>
          </div>
          <div className="flex items-center justify-between pt-1.5 border-t border-border/50">
            <span className="text-xs text-muted-foreground">Active strikes</span>
            <span className="text-xs font-medium text-orange-500">{STRIKES.length}</span>
          </div>
        </div>
      </div>

      <Map accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""} center={[37, 47]} zoom={5}>
        <MapPolygon
          coordinates={ALLIED_TERRITORY}
          fillColor="#3b82f6"
          fillOpacity={0.15}
          strokeColor="#3b82f6"
          strokeWidth={2}
          strokeOpacity={0.6}
          dashArray={[4, 4]}
        />

        <MapPolygon
          coordinates={ENEMY_TERRITORY}
          fillColor="#ef4444"
          fillOpacity={0.15}
          strokeColor="#ef4444"
          strokeWidth={2}
          strokeOpacity={0.6}
          dashArray={[4, 4]}
        />

        <MapRadar coordinates={RADAR_COORDINATES} size={120} color="#3b82f6" rings={3} duration={2000} showCrosshairs />

        {STRIKES.map((strike) => {
          return (
            <MapExplosion
              key={strike.id}
              id={strike.id}
              coordinates={strike.coordinates}
              size={120}
              loop
              loopDelay={2000}
              duration={2500}
            />
          )
        })}

        {TARGETS.map((target) => {
          return (
            <MapTargetingReticle
              key={target.id}
              coordinates={target.coordinates}
              locked={target.locked}
              size={80}
              color="rgba(239, 68, 68, 0.9)"
              lockedColor="rgba(234, 179, 8, 0.9)"
            />
          )
        })}

        {UNITS.map((unit) => {
          return <UnitMarker key={unit.id} unit={unit} />
        })}
      </Map>
    </div>
  )
}
