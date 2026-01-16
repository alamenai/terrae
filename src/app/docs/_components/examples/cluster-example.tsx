"use client";

import { useState } from "react";
import { Map, MapClusterLayer, MapPopup, MapControls, MapZoom } from "@/registry/map";

interface EarthquakeProperties {
  mag: number;
  place: string;
  tsunami: number;
}

export default function ClusterExample() {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";
  const [selectedPoint, setSelectedPoint] = useState<{
    coordinates: [number, number];
    properties: EarthquakeProperties;
  } | null>(null);

  return (
    <div className="h-full w-full">
      <Map accessToken={accessToken} center={[-103.59, 40.66]} zoom={3.4}>
        <MapClusterLayer<EarthquakeProperties>
          data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
          clusterRadius={50}
          clusterMaxZoom={14}
          clusterColors={["#22c55e", "#eab308", "#ef4444"]}
          pointColor="#3b82f6"
          onPointClick={(feature, coordinates) => {
            setSelectedPoint({
              coordinates,
              properties: feature.properties,
            });
          }}
        />

        {selectedPoint && (
          <MapPopup
            key={`${selectedPoint.coordinates[0]}-${selectedPoint.coordinates[1]}`}
            coordinates={[selectedPoint.coordinates[0], selectedPoint.coordinates[1]]}
            onClose={() => setSelectedPoint(null)}
            closeOnClick={false}
            focusAfterOpen={false}
            closeButton
          >
            <div className="space-y-1 p-1">
              <p className="text-sm">
                Magnitude: {selectedPoint.properties.mag}
              </p>
              <p className="text-sm">
                Tsunami:{" "}
                {selectedPoint.properties?.tsunami === 1 ? "Yes" : "No"}
              </p>
            </div>
          </MapPopup>
        )}

        <MapControls>
          <MapZoom />
        </MapControls>
      </Map>
    </div>
  );
}
