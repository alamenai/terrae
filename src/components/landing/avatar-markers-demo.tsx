"use client"

import { Map, MapMarker, MarkerContent, MarkerAvatar } from "@/registry/map"
import { Users } from "lucide-react"
import { InfoPanel } from "./info-panel"

const DEVELOPERS = [
  {
    lng: -122.4194,
    lat: 37.7749,
    name: "Sarah Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    online: true,
  },
  {
    lng: -74.006,
    lat: 40.7128,
    name: "Marcus Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    online: true,
  },
  {
    lng: -0.1276,
    lat: 51.5074,
    name: "Emma Wilson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    online: true,
  },
  {
    lng: 13.405,
    lat: 52.52,
    name: "Lukas Schmidt",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lukas",
    online: false,
  },
  {
    lng: 2.3522,
    lat: 48.8566,
    name: "Marie Dubois",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marie",
    online: true,
  },
  {
    lng: 139.6917,
    lat: 35.6895,
    name: "Yuki Tanaka",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki",
    online: true,
  },
  {
    lng: -122.3321,
    lat: 47.6062,
    name: "Alex Rivera",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    online: false,
  },
  {
    lng: 12.4964,
    lat: 41.9028,
    name: "Sofia Rossi",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
    online: true,
  },
  {
    lng: -3.7038,
    lat: 40.4168,
    name: "Carlos García",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    online: true,
  },
  {
    lng: 18.0686,
    lat: 59.3293,
    name: "Erik Andersson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Erik",
    online: false,
  },
]

const ONLINE_COUNT = DEVELOPERS.filter((d) => {
  return d.online
}).length

export const AvatarMarkersDemo = () => {
  return (
    <div className="w-full h-full relative">
      <InfoPanel title="Active Now">
        <div className="text-2xl font-semibold leading-tight">{ONLINE_COUNT}</div>
        <div className="flex items-center gap-1 mt-1">
          <Users className="size-3 text-emerald-500" />
          <span className="text-xs text-muted-foreground">developers online</span>
        </div>
      </InfoPanel>

      <Map accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""} center={[0, 30]} zoom={1.5}>
        {DEVELOPERS.map((dev) => {
          return (
            <MapMarker key={dev.name} coordinates={[dev.lng, dev.lat]}>
              <MarkerContent>
                <MarkerAvatar
                  src={dev.avatar}
                  alt={dev.name}
                  size={45}
                  online={dev.online}
                  statusColor={dev.online ? "green" : "red"}
                />
              </MarkerContent>
            </MapMarker>
          )
        })}
      </Map>
    </div>
  )
}
