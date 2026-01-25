"use client"

import { Map, MapMarker, MarkerContent, MarkerAvatarPin, MarkerTooltip } from "@/registry/map"

const people = [
  {
    name: "Alex Rivera",
    city: "Los Angeles",
    lng: -118.2437,
    lat: 34.0522,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
  {
    name: "Sophie Martin",
    city: "Paris",
    lng: 2.3522,
    lat: 48.8566,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
  },
  {
    name: "Kenji Tanaka",
    city: "Tokyo",
    lng: 139.6917,
    lat: 35.6895,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kenji",
  },
]

export const AvatarPinMarkerExample = () => {
  return (
    <div className="h-full w-full">
      <Map accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!} center={[20, 40]} zoom={1}>
        {people.map((person) => (
          <MapMarker key={person.name} coordinates={[person.lng, person.lat]}>
            <MarkerContent>
              <MarkerAvatarPin src={person.avatar} alt={person.name} size={56} />
            </MarkerContent>
            <MarkerTooltip>
              <div className="text-center">
                <div className="font-medium">{person.name}</div>
                <div className="text-xs opacity-80">{person.city}</div>
              </div>
            </MarkerTooltip>
          </MapMarker>
        ))}
      </Map>
    </div>
  )
}
