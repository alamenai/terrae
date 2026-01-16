"use client";

import { useEffect, useRef, useState } from "react";
import { useMap } from "./hooks";

type MapRasterVideoProps = {
  /** Unique identifier for the raster video */
  id: string;
  /** Array of video URLs (provide multiple formats for browser compatibility) */
  urls: string[];
  /** Four corner coordinates [topLeft, topRight, bottomRight, bottomLeft] as [lng, lat] pairs */
  coordinates: [[number, number], [number, number], [number, number], [number, number]];
  /** Layer opacity (0-1) */
  opacity?: number;
  /** Auto-play video on load */
  autoplay?: boolean;
  /** Loop video playback */
  loop?: boolean;
  /** Mute video audio */
  muted?: boolean;
};

export function MapRasterVideo({
  id,
  urls,
  coordinates,
  opacity = 1,
  autoplay = false,
  loop = true,
  muted = true,
}: MapRasterVideoProps) {
  const { map, isLoaded } = useMap();
  const initializedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(autoplay);

  useEffect(() => {
    if (!isLoaded || !map || initializedRef.current) return;

    try {
      // Add video source
      map.addSource(id, {
        type: "video",
        urls,
        coordinates,
      } as any);

      // Add raster layer
      map.addLayer({
        id,
        type: "raster",
        source: id,
        paint: {
          "raster-opacity": opacity,
        },
      });

      // Set video properties and control playback
      const source = map.getSource(id) as any;
      if (source && source.getVideo) {
        const video = source.getVideo();
        if (video) {
          video.loop = loop;
          video.muted = muted;

          if (autoplay) {
            source.play();
          }
        }
      }

      initializedRef.current = true;
    } catch (error) {
      console.error("Error adding raster video:", error);
    }

    return () => {
      if (map && map.getStyle()) {
        try {
          if (map.getLayer(id)) {
            map.removeLayer(id);
          }
          if (map.getSource(id)) {
            map.removeSource(id);
          }
        } catch (error) {
          console.error("Error cleaning up raster video:", error);
        }
      }
      initializedRef.current = false;
    };
  }, [map, isLoaded, id, urls, coordinates, opacity, autoplay, loop, muted]);

  // Expose play/pause methods via ref if needed
  useEffect(() => {
    if (!map || !initializedRef.current) return;

    const source = map.getSource(id) as any;
    if (!source) return;

    if (isPlaying) {
      source.play?.();
    } else {
      source.pause?.();
    }
  }, [map, id, isPlaying]);

  return null;
}

/**
 * Hook to control video playback
 * @param layerId - The raster video ID
 * @returns Object with play, pause, and toggle methods
 */
export function useRasterVideoControl(layerId: string) {
  const { map } = useMap();
  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => {
    if (!map) return;
    const source = map.getSource(layerId) as any;
    source?.play?.();
    setIsPlaying(true);
  };

  const pause = () => {
    if (!map) return;
    const source = map.getSource(layerId) as any;
    source?.pause?.();
    setIsPlaying(false);
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  return { play, pause, toggle, isPlaying };
}
