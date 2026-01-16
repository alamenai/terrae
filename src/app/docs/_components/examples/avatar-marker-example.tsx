"use client";

import { Map, MapMarker, MarkerContent, MarkerAvatar, MarkerTooltip } from "@/registry/map";

const developers = [
  {
    name: "Sarah Chen",
    city: "San Francisco",
    lng: -122.4194,
    lat: 37.7749,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    online: true,
  },
  {
    name: "Marcus Johnson",
    city: "New York",
    lng: -74.006,
    lat: 40.7128,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    online: true,
  },
  {
    name: "Emma Wilson",
    city: "London",
    lng: -0.1276,
    lat: 51.5074,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    online: false,
  },
];

export function AvatarMarkerExample() {
  return (
    <div className="h-full w-full">
      <Map
        accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!}
        center={[-40, 40]}
        zoom={2}
      >
        {developers.map((dev) => (
          <MapMarker key={dev.name} coordinates={[dev.lng, dev.lat]}>
            <MarkerContent>
              <MarkerAvatar
                src={dev.avatar}
                alt={dev.name}
                size={50}
                online={dev.online}
                statusColor={dev.online ? "green" : "red"}
              />
            </MarkerContent>
            <MarkerTooltip>
              <div className="text-center">
                <div className="font-medium">{dev.name}</div>
                <div className="text-xs opacity-80">{dev.city}</div>
              </div>
            </MarkerTooltip>
          </MapMarker>
        ))}
      </Map>
    </div>
  );
}
