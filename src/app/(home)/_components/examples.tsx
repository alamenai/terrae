"use client";

import { useState, useEffect, memo } from "react";
import { Map, MapMarker, MarkerContent, MarkerAvatar, MapLineAnimated, MapClusterLayer, MapMiniMap } from "@/registry/map";
import { Code, Satellite, Activity, Navigation, Ambulance, Users, Map as MapIcon, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface ISSPosition {
  latitude: number;
  longitude: number;
  timestamp: number;
}

interface CovidData {
  country: string;
  cases: number;
  lat: number;
  lng: number;
}

const openSourceHubs = [
  { lng: -122.4194, lat: 37.7749, city: "San Francisco", projects: 2847, size: 16 },
  { lng: -74.006, lat: 40.7128, city: "New York", projects: 1623, size: 14 },
  { lng: -0.1276, lat: 51.5074, city: "London", projects: 1412, size: 13 },
  { lng: 13.405, lat: 52.52, city: "Berlin", projects: 1298, size: 12 },
  { lng: 2.3522, lat: 48.8566, city: "Paris", projects: 987, size: 11 },
  { lng: 139.6917, lat: 35.6895, city: "Tokyo", projects: 856, size: 10 },
  { lng: -122.3321, lat: 47.6062, city: "Seattle", projects: 734, size: 9 },
  { lng: 12.4964, lat: 41.9028, city: "Rome", projects: 623, size: 8 },
  { lng: -3.7038, lat: 40.4168, city: "Madrid", projects: 512, size: 7 },
  { lng: 18.0686, lat: 59.3293, city: "Stockholm", projects: 445, size: 7 },
];

// Online developers around the world
const onlineDevelopers = [
  { lng: -122.4194, lat: 37.7749, name: "Sarah Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", online: true, city: "San Francisco" },
  { lng: -74.006, lat: 40.7128, name: "Marcus Johnson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus", online: true, city: "New York" },
  { lng: -0.1276, lat: 51.5074, name: "Emma Wilson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma", online: true, city: "London" },
  { lng: 13.405, lat: 52.52, name: "Lukas Schmidt", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lukas", online: false, city: "Berlin" },
  { lng: 2.3522, lat: 48.8566, name: "Marie Dubois", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marie", online: true, city: "Paris" },
  { lng: 139.6917, lat: 35.6895, name: "Yuki Tanaka", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki", online: true, city: "Tokyo" },
  { lng: -122.3321, lat: 47.6062, name: "Alex Rivera", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", online: false, city: "Seattle" },
  { lng: 12.4964, lat: 41.9028, name: "Sofia Rossi", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia", online: true, city: "Rome" },
  { lng: -3.7038, lat: 40.4168, name: "Carlos García", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos", online: true, city: "Madrid" },
  { lng: 18.0686, lat: 59.3293, name: "Erik Andersson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Erik", online: false, city: "Stockholm" },
];

// Scenic route from Golden Gate Bridge to Fisherman's Wharf
const animatedRouteCoordinates: [number, number][] = [
  [-122.4783, 37.8199], // Golden Gate Bridge
  [-122.4770, 37.8085],
  [-122.4730, 37.8020],
  [-122.4650, 37.8000],
  [-122.4580, 37.8030],
  [-122.4500, 37.8050],
  [-122.4420, 37.8070],
  [-122.4350, 37.8080],
  [-122.4280, 37.8090],
  [-122.4194, 37.8080], // Fisherman's Wharf
];

// Generate polling stations across US swing states for 2026 elections
const generatePollingStations = () => {
  const states = [
    { name: "Pennsylvania", center: [-77.1945, 41.2033], count: 150 },
    { name: "Georgia", center: [-83.5002, 32.1656], count: 120 },
    { name: "Arizona", center: [-111.6602, 34.0489], count: 100 },
    { name: "Michigan", center: [-84.5555, 44.3148], count: 130 },
    { name: "Wisconsin", center: [-89.6165, 44.2685], count: 90 },
    { name: "Nevada", center: [-116.4194, 38.8026], count: 70 },
    { name: "North Carolina", center: [-79.0193, 35.7596], count: 110 },
  ];

  const features = states.flatMap((state) =>
    Array.from({ length: state.count }, (_, i) => ({
      type: "Feature" as const,
      properties: {
        id: `${state.name}-${i}`,
        state: state.name,
        voters: Math.floor(Math.random() * 2000) + 500,
      },
      geometry: {
        type: "Point" as const,
        coordinates: [
          state.center[0] + (Math.random() - 0.5) * 4,
          state.center[1] + (Math.random() - 0.5) * 3,
        ],
      },
    }))
  );

  return {
    type: "FeatureCollection" as const,
    features,
  };
};

interface ExampleCardProps {
  label: string;
  className?: string;
  children: React.ReactNode;
}

function ExampleCard({ label, className, children }: ExampleCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl sm:rounded-3xl overflow-hidden border border-border/50 shadow bg-card relative",
        className
      )}
    >
      <div className="absolute top-3 left-3 z-10 tracking-wider text-[10px] text-muted-foreground bg-background/90 backdrop-blur-sm rounded-full px-3 py-1.5">
        {label}
      </div>
      {children}
    </div>
  );
}

interface InfoPanelProps {
  title: string;
  children: React.ReactNode;
}

function InfoPanel({ title, children }: InfoPanelProps) {
  return (
    <div className="absolute top-3 right-3 z-10 bg-background/95 backdrop-blur-md rounded-xl p-3 border border-border/50 shadow-lg text-sm">
      <div className="tracking-wider text-[10px] text-muted-foreground uppercase mb-1">
        {title}
      </div>
      {children}
    </div>
  );
}

// Info panel component - updates independently
const ISSInfoPanel = memo(({ position }: { position: ISSPosition | null }) => (
  <InfoPanel title="Space Station">
    {position ? (
      <>
        <div className="font-medium mt-1">
          {position.latitude.toFixed(2)}°, {position.longitude.toFixed(2)}°
        </div>
        <div className="flex items-center gap-1 mt-1">
          <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </>
    ) : (
      <div className="text-muted-foreground">Loading...</div>
    )}
  </InfoPanel>
));
ISSInfoPanel.displayName = "ISSInfoPanel";

// Satellite marker component - only position updates
const ISSSatelliteMarker = memo(({ position }: { position: ISSPosition }) => (
  <MapMarker coordinates={[position.longitude, position.latitude]}>
    <MarkerContent>
      <div className="relative flex items-center justify-center">
        <div className="absolute rounded-full bg-blue-500/20 size-16 animate-pulse" />
        <div className="relative bg-blue-500 p-2 rounded-full shadow-lg shadow-blue-500/50">
          <Satellite className="size-4 text-white" />
        </div>
      </div>
    </MarkerContent>
  </MapMarker>
));
ISSSatelliteMarker.displayName = "ISSSatelliteMarker";

// Static map container - never re-renders, centered on ISS
const ISSMapContainer = memo(({ center, children }: { center: [number, number]; children: React.ReactNode }) => (
  <Map
    accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""}
    center={center}
    zoom={1}
    projection="globe"
  >
    {children}
  </Map>
));
ISSMapContainer.displayName = "ISSMapContainer";

// Separate component for ISS tracking to prevent re-renders of parent
function ISSTrackingExample() {
  const [issPosition, setIssPosition] = useState<ISSPosition | null>(null);
  const [initialCenter, setInitialCenter] = useState<[number, number] | null>(null);

  useEffect(() => {
    const fetchISSPosition = async () => {
      try {
        const response = await fetch("/api/iss");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (!data.iss_position) {
          console.error("Invalid API response:", data);
          return;
        }
        
        const newPosition = {
          latitude: parseFloat(data.iss_position.latitude),
          longitude: parseFloat(data.iss_position.longitude),
          timestamp: data.timestamp,
        };

        setIssPosition(newPosition);

        // Set initial center only once
        if (!initialCenter) {
          setInitialCenter([newPosition.longitude, newPosition.latitude]);
        }
      } catch (error) {
        console.error("Failed to fetch ISS position:", error);
      }
    };

    fetchISSPosition();
    const interval = setInterval(fetchISSPosition, 5000);

    return () => clearInterval(interval);
  }, [initialCenter]);

  return (
    <div className="w-full h-full relative">
      <ISSInfoPanel position={issPosition} />
      {initialCenter ? (
        <ISSMapContainer center={initialCenter}>
          {issPosition && <ISSSatelliteMarker position={issPosition} />}
        </ISSMapContainer>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-muted/20">
          <div className="flex gap-1">
            <span className="size-1.5 rounded-full bg-muted-foreground/60 animate-pulse" />
            <span className="size-1.5 rounded-full bg-muted-foreground/60 animate-pulse [animation-delay:150ms]" />
            <span className="size-1.5 rounded-full bg-muted-foreground/60 animate-pulse [animation-delay:300ms]" />
          </div>
        </div>
      )}
    </div>
  );
}

// Separate component for COVID data to prevent re-renders
// Static COVID-19 data (Top 10 countries by cases as of recent snapshot)
// Using static data for reliability since the disease.sh API can be unreliable
const STATIC_COVID_DATA: CovidData[] = [
  { country: "United States", cases: 107000000, lat: 37.0902, lng: -95.7129 },
  { country: "China", cases: 99000000, lat: 35.8617, lng: 104.1954 },
  { country: "India", cases: 45000000, lat: 20.5937, lng: 78.9629 },
  { country: "Japan", cases: 22000000, lat: 36.2048, lng: 138.2529 },
  { country: "Germany", cases: 35000000, lat: 51.1657, lng: 10.4515 },
  { country: "Brazil", cases: 34000000, lat: -14.2350, lng: -51.9253 },
  { country: "United Kingdom", cases: 24000000, lat: 55.3781, lng: -3.4360 },
  { country: "France", cases: 33000000, lat: 46.2276, lng: 2.2137 },
  { country: "Russia", cases: 21000000, lat: 61.5240, lng: 105.3188 },
  { country: "South Korea", cases: 31000000, lat: 35.9078, lng: 127.7669 },
];

/**
 * Alternative implementation for live COVID data via API
 *
 * NOTE: The disease.sh API can be unreliable and fail intermittently,
 * so we use static data by default for better user experience.
 *
 * To enable live fetching with fallback:
 *
 * const fetchLiveCovidData = async (): Promise<CovidData[]> => {
 *   try {
 *     const response = await fetch("https://disease.sh/v3/covid-19/countries?sort=cases", {
 *       headers: { "Accept": "application/json" },
 *     });
 *
 *     if (!response.ok) {
 *       throw new Error(`API responded with status ${response.status}`);
 *     }
 *
 *     const data = await response.json();
 *
 *     return data
 *       .filter((country: any) => country.countryInfo?.lat && country.countryInfo?.long)
 *       .slice(0, 10)
 *       .map((country: any) => ({
 *         country: country.country,
 *         cases: country.cases,
 *         lat: country.countryInfo.lat,
 *         lng: country.countryInfo.long,
 *       }));
 *   } catch (error) {
 *     console.warn("Failed to fetch live COVID data, falling back to static data:", error);
 *     return STATIC_COVID_DATA;
 *   }
 * };
 */

function CovidTrackingExample() {
  const [covidData, setCovidData] = useState<CovidData[]>(STATIC_COVID_DATA);

  useEffect(() => {
    // Using static data by default for reliability
    // To enable live API data fetching, uncomment the line below:
    // fetchLiveCovidData().then(setCovidData);
  }, []);

  return (
    <div className="w-full h-full relative">
      <InfoPanel title="Total Cases">
        {covidData.length > 0 ? (
          <>
            <div className="text-2xl font-semibold leading-tight">
              {(covidData.reduce((sum, c) => sum + c.cases, 0) / 1000000).toFixed(1)}M
            </div>
            <div className="flex items-center gap-1 mt-1">
              <Activity className="size-3 text-red-500" />
              <span className="text-xs text-muted-foreground">Top 10</span>
            </div>
          </>
        ) : (
          <div className="text-muted-foreground">Loading...</div>
        )}
      </InfoPanel>

      <Map
        accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""}
        center={[0, 20]}
        zoom={1}
      >
        {covidData.map((country, index) => {
          const size = 16 - index * 1.2;
          return (
            <MapMarker key={country.country} coordinates={[country.lng, country.lat]}>
              <MarkerContent>
                <div className="relative flex items-center justify-center">
                  <div
                    className="absolute rounded-full bg-red-500/20"
                    style={{
                      width: size * 2,
                      height: size * 2,
                    }}
                  />
                  <div
                    className="relative rounded-full bg-red-500 shadow-lg shadow-red-500/50"
                    style={{ width: size, height: size }}
                  />
                </div>
              </MarkerContent>
            </MapMarker>
          );
        })}
      </Map>
    </div>
  );
}

export function Examples() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* Widget 1: Open Source Projects */}
      <ExampleCard
        label="Open Source Hubs"
        className="h-80 sm:h-96 lg:h-[28rem]"
        
      >
        <div className="w-full h-full relative">
          <InfoPanel title="Active Projects">
            <div className="text-2xl font-semibold leading-tight">12,847</div>
            <div className="flex items-center gap-1 mt-1">
              <Code className="size-3 text-purple-500" />
              <span className="text-xs text-purple-500">+245</span>
              <span className="text-xs text-muted-foreground">this week</span>
            </div>
          </InfoPanel>

          <Map
            accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""}
            center={[0, 30]}
            zoom={1.5}
          >
            {openSourceHubs.map((loc) => (
              <MapMarker key={loc.city} coordinates={[loc.lng, loc.lat]}>
                <MarkerContent>
                  <div className="relative flex items-center justify-center">
                    <div
                      className="absolute rounded-full bg-purple-500/20"
                      style={{
                        width: loc.size * 2.5,
                        height: loc.size * 2.5,
                      }}
                    />
                    <div
                      className="absolute rounded-full bg-purple-500/40 animate-ping"
                      style={{
                        width: loc.size * 1.5,
                        height: loc.size * 1.5,
                        animationDuration: "2s",
                      }}
                    />
                    <div
                      className="relative rounded-full bg-purple-500 shadow-lg shadow-purple-500/50"
                      style={{ width: loc.size, height: loc.size }}
                    />
                  </div>
                </MarkerContent>
              </MapMarker>
            ))}
          </Map>
        </div>
      </ExampleCard>

      {/* Widget 2: Online Developers */}
      <ExampleCard
        label="Online Developers"
        className="h-80 sm:h-96 lg:h-[28rem]"
        
      >
        <div className="w-full h-full relative">
          <InfoPanel title="Active Now">
            <div className="text-2xl font-semibold leading-tight">
              {onlineDevelopers.filter(d => d.online).length}
            </div>
            <div className="flex items-center gap-1 mt-1">
              <Users className="size-3 text-emerald-500" />
              <span className="text-xs text-muted-foreground">developers online</span>
            </div>
          </InfoPanel>

          <Map
            accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""}
            center={[0, 30]}
            zoom={1.5}
          >
            {onlineDevelopers.map((dev) => (
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
            ))}
          </Map>
        </div>
      </ExampleCard>

      {/* Widget 3: ISS Live Tracking */}
      <ExampleCard label="ISS Live Tracking" className="h-80 sm:h-96 lg:h-[28rem]" >
        <ISSTrackingExample />
      </ExampleCard>

      {/* Widget 4: COVID-19 Cases */}
      <ExampleCard
        label="COVID-19 Global Cases"
        className="h-80 sm:h-96 lg:h-[28rem]"
        
      >
        <CovidTrackingExample />
      </ExampleCard>

      {/* Widget 5: Animated Route */}
      <ExampleCard
        label="Animated Route"
        className="h-80 sm:h-96 lg:h-[28rem]"
        
      >
        <div className="w-full h-full relative">
          <InfoPanel title="Route Animation">
            <div className="font-medium mt-1">
              Golden Gate → Wharf
            </div>
            <div className="flex items-center gap-1 mt-1">
              <Navigation className="size-3 text-orange-500" />
              <span className="text-xs text-muted-foreground">5.2 mi</span>
            </div>
          </InfoPanel>

          <Map
            accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""}
            center={[-122.4483, 37.8140]}
            zoom={12.5}
            pitch={45}
          >
            <MapLineAnimated
              id="animated-route-demo"
              coordinates={animatedRouteCoordinates}
              color="#f97316"
              width={5}
              duration={12000}
              loop
              showMarker
              markerIcon={
                <div className="relative flex items-center justify-center">
                  <div className="absolute rounded-full bg-orange-500/20 size-12 animate-pulse" />
                  <div className="relative bg-orange-500 p-2 rounded-full shadow-lg">
                    <Navigation className="size-5 text-white" />
                  </div>
                </div>
              }
            />
          </Map>
        </div>
      </ExampleCard>

      {/* Widget 6: Ambulance Tracking */}
      <ExampleCard
        label="Emergency Response"
        className="h-80 sm:h-96 lg:h-[28rem]"
        
      >
        <div className="w-full h-full relative">
          <InfoPanel title="Emergency Status">
            <div className="font-medium mt-1">
              The ambulance is on way to you
            </div>
            <div className="flex items-center gap-1 mt-1">
              <Ambulance className="size-3 text-red-500" />
              <span className="text-xs text-muted-foreground">ETA: 8 min</span>
            </div>
          </InfoPanel>

          <Map
            accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""}
            center={[-122.400, 37.785]}
            zoom={13}
            pitch={30}
          >
            <MapLineAnimated
              id="ambulance-route"
              coordinates={[
                [-122.420, 37.775],
                [-122.415, 37.778],
                [-122.410, 37.780],
                [-122.405, 37.782],
                [-122.400, 37.785],
                [-122.395, 37.787],
                [-122.390, 37.790],
              ]}
              color="#ef4444"
              width={4}
              duration={10000}
              loop
              showMarker
              markerIcon={
                <div className="relative flex items-center justify-center">
                  <div className="absolute rounded-full bg-red-500/20 size-12 animate-pulse" />
                  <div className="relative bg-red-500 p-2 rounded-full shadow-lg">
                    <Ambulance className="size-5 text-white" />
                  </div>
                </div>
              }
            />
          </Map>
        </div>
      </ExampleCard>

      {/* Widget 7: MiniMap */}
      <ExampleCard
        label="MiniMap Overview"
        className="h-80 sm:h-96 lg:h-[28rem]"
        
      >
        <div className="w-full h-full relative">
          <InfoPanel title="Navigation">
            <div className="font-medium mt-1">
              Overview Map
            </div>
            <div className="flex items-center gap-1 mt-1">
              <MapIcon className="size-3 text-teal-500" />
              <span className="text-xs text-muted-foreground">Context view</span>
            </div>
          </InfoPanel>

          <Map
            accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""}
            center={[-74.006, 40.7128]}
            zoom={14}
          >
            <MapMarker coordinates={[-74.006, 40.7128]}>
              <MarkerContent>
                <div className="relative flex items-center justify-center">
                  <div className="absolute rounded-full bg-teal-500/20 size-12 animate-pulse" />
                  <div className="relative bg-teal-500 p-2 rounded-full shadow-lg">
                    <MapIcon className="size-4 text-white" />
                  </div>
                </div>
              </MarkerContent>
            </MapMarker>
            <MapMiniMap position="bottom-left" zoomOffset={-5} />
          </Map>
        </div>
      </ExampleCard>

      {/* CTA Card: Help Make Terrae Better */}
      <ExampleCard
        label="Contribute"
        className="h-80 sm:h-96 lg:h-[28rem]"
      >
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
          <div className="space-y-6">
            <Globe className="w-12 h-12 text-primary mx-auto" />
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Help Make Terrae Better</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Contribute components, report issues, or share your ideas. Terrae is built for the community.
              </p>
            </div>
            <a
              href="https://github.com/alamenai/terrae"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity text-sm font-medium"
            >
              Make your Impact
            </a>
          </div>
        </div>
      </ExampleCard>
    </div>
  );
}
