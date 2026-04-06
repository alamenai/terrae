"use client"

import {
  Map,
  MapPolygon,
  MapCircle,
  MapAnimatedPulse,
  MapLine,
  MapMarker,
  MarkerContent,
  MarkerTooltip,
} from "@/registry/map"
import { cn } from "@/lib/utils"

type IncidentType = "theft" | "break-in" | "vandalism"
type IncidentStatus = "open" | "investigating" | "resolved"

type Incident = {
  id: string
  ref: string
  type: IncidentType
  location: string
  time: string
  coordinates: [number, number]
  status: IncidentStatus
}

type IncidentMarkerProps = {
  incident: Incident
}

const INCIDENTS: Incident[] = [
  {
    id: "inc-1",
    ref: "INC-0042",
    type: "theft",
    location: "N Michigan Ave",
    time: "14:32",
    coordinates: [-87.624, 41.883],
    status: "open",
  },
  {
    id: "inc-2",
    ref: "INC-0039",
    type: "break-in",
    location: "W Monroe St",
    time: "11:15",
    coordinates: [-87.632, 41.879],
    status: "investigating",
  },
  {
    id: "inc-3",
    ref: "INC-0051",
    type: "vandalism",
    location: "S State St",
    time: "09:48",
    coordinates: [-87.628, 41.872],
    status: "open",
  },
  {
    id: "inc-4",
    ref: "INC-0038",
    type: "theft",
    location: "E Wacker Dr",
    time: "16:05",
    coordinates: [-87.619, 41.886],
    status: "resolved",
  },
  {
    id: "inc-5",
    ref: "INC-0055",
    type: "break-in",
    location: "W Jackson Blvd",
    time: "08:20",
    coordinates: [-87.635, 41.876],
    status: "open",
  },
  {
    id: "inc-6",
    ref: "INC-0047",
    type: "vandalism",
    location: "N Clark St",
    time: "13:10",
    coordinates: [-87.631, 41.881],
    status: "investigating",
  },
  {
    id: "inc-7",
    ref: "INC-0060",
    type: "theft",
    location: "S Wabash Ave",
    time: "15:45",
    coordinates: [-87.625, 41.869],
    status: "open",
  },
]

const HIGH_RISK_ZONE: [number, number][] = [
  [-87.636, 41.882],
  [-87.618, 41.882],
  [-87.618, 41.875],
  [-87.636, 41.875],
]

const PATROL_ROUTE_NORTH: [number, number][] = [
  [-87.636, 41.885],
  [-87.63, 41.885],
  [-87.618, 41.885],
  [-87.618, 41.88],
]

const PATROL_ROUTE_SOUTH: [number, number][] = [
  [-87.636, 41.875],
  [-87.628, 41.87],
  [-87.618, 41.87],
]

const TYPE_COLORS: Record<IncidentType, string> = {
  theft: "#ef4444",
  "break-in": "#f97316",
  vandalism: "#f59e0b",
}

const TYPE_PULSE_COLORS: Record<IncidentType, string> = {
  theft: "rgba(239, 68, 68, 0.4)",
  "break-in": "rgba(249, 115, 22, 0.4)",
  vandalism: "rgba(245, 158, 11, 0.4)",
}

const TYPE_LABELS: Record<IncidentType, string> = {
  theft: "Theft",
  "break-in": "Break-In",
  vandalism: "Vandalism",
}

const STATUS_CLASSES: Record<IncidentStatus, string> = {
  open: "text-red-500",
  investigating: "text-amber-500",
  resolved: "text-green-500",
}

const STATUS_LABELS: Record<IncidentStatus, string> = {
  open: "Open",
  investigating: "Investigating",
  resolved: "Resolved",
}

const OPEN_INCIDENTS = INCIDENTS.filter((incident) => {
  return incident.status === "open"
})

const INVESTIGATING_INCIDENTS = INCIDENTS.filter((incident) => {
  return incident.status === "investigating"
})

const RESOLVED_INCIDENTS = INCIDENTS.filter((incident) => {
  return incident.status === "resolved"
})

const IncidentMarker = ({ incident }: IncidentMarkerProps) => {
  const color = TYPE_COLORS[incident.type]

  return (
    <MapMarker coordinates={incident.coordinates}>
      <MarkerContent>
        <div
          className="size-4 rounded-full border-2 border-white shadow-md flex items-center justify-center text-[8px] font-bold text-white hover:scale-125 transition-transform"
          style={{ backgroundColor: color }}
        >
          {incident.type[0].toUpperCase()}
        </div>
      </MarkerContent>
      <MarkerTooltip className="rounded-xl bg-popover text-popover-foreground p-3">
        <div className="min-w-40 text-sm">
          <div className="flex items-center gap-2 mb-1">
            <div className="size-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
            <span className="font-semibold">{TYPE_LABELS[incident.type]}</span>
          </div>
          <div className="text-[10px] text-muted-foreground mb-2">{incident.ref}</div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between gap-6">
              <span className="text-muted-foreground">Location</span>
              <span className="font-medium">{incident.location}</span>
            </div>
            <div className="flex justify-between gap-6">
              <span className="text-muted-foreground">Time</span>
              <span className="font-medium">{incident.time} today</span>
            </div>
            <div className="flex justify-between gap-6">
              <span className="text-muted-foreground">Status</span>
              <span className={cn("font-medium", STATUS_CLASSES[incident.status])}>
                {STATUS_LABELS[incident.status]}
              </span>
            </div>
          </div>
        </div>
      </MarkerTooltip>
    </MapMarker>
  )
}

export const TheftMonitorBlock = () => {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-3 right-3 z-10 bg-background/95 backdrop-blur-md rounded-xl p-3 border border-border/50 shadow-lg text-sm min-w-44">
        <div className="tracking-wider text-[10px] text-muted-foreground uppercase mb-2">
          Security Monitor · Chicago
        </div>
        <div className="text-xs text-muted-foreground mb-1.5">Today — {INCIDENTS.length} incidents</div>
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-xs text-muted-foreground">Open</span>
            <span className="text-xs font-medium text-red-500">{OPEN_INCIDENTS.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-muted-foreground">Investigating</span>
            <span className="text-xs font-medium text-amber-500">{INVESTIGATING_INCIDENTS.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-muted-foreground">Resolved</span>
            <span className="text-xs font-medium text-green-500">{RESOLVED_INCIDENTS.length}</span>
          </div>
        </div>
      </div>

      <Map accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""} center={[-87.628, 41.878]} zoom={13.5}>
        <MapPolygon
          coordinates={HIGH_RISK_ZONE}
          fillColor="#ef4444"
          fillOpacity={0.06}
          strokeColor="#ef4444"
          strokeWidth={1}
          strokeOpacity={0.3}
          dashArray={[4, 4]}
        />

        <MapCircle
          center={[-87.627, 41.882]}
          radius={400}
          fillColor="#ef4444"
          fillOpacity={0.04}
          strokeColor="#ef4444"
          strokeWidth={1}
          strokeOpacity={0.4}
        />

        <MapCircle
          center={[-87.628, 41.871]}
          radius={350}
          fillColor="#f97316"
          fillOpacity={0.04}
          strokeColor="#f97316"
          strokeWidth={1}
          strokeOpacity={0.4}
        />

        <MapLine coordinates={PATROL_ROUTE_NORTH} color="#3b82f6" width={2} opacity={0.5} dashArray={[6, 4]} />
        <MapLine coordinates={PATROL_ROUTE_SOUTH} color="#3b82f6" width={2} opacity={0.5} dashArray={[6, 4]} />

        {OPEN_INCIDENTS.map((incident) => {
          return (
            <MapAnimatedPulse
              key={`pulse-${incident.id}`}
              id={`pulse-${incident.id}`}
              coordinates={incident.coordinates}
              size={50}
              color={TYPE_COLORS[incident.type]}
              pulseColor={TYPE_PULSE_COLORS[incident.type]}
              duration={1400}
            />
          )
        })}

        {INCIDENTS.map((incident) => {
          return <IncidentMarker key={incident.id} incident={incident} />
        })}
      </Map>
    </div>
  )
}
