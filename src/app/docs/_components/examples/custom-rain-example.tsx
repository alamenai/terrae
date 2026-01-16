import { Map, MapRain } from "@/registry/map";

export function CustomRainExample() {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

  return (
    <div className="h-full w-full">
      <Map
        accessToken={accessToken}
        center={[-74.006, 40.7128]}
        zoom={14}
        pitch={60}
        bearing={0}
        style="mapbox://styles/mapbox/standard"
      >
        <MapRain
          density={0.8}
          intensity={1.0}
          color="#6699cc"
          opacity={0.9}
          vignette={0.8}
          vignetteColor="#2b2b2b"
          direction={[20, 90]}
          dropletSize={[3, 20]}
          distortionStrength={0.9}
        />
      </Map>
    </div>
  );
}
