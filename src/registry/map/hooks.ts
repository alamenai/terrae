import { useContext } from "react";
import { MapContext } from "./map";

export function useMap() {
  const context = useContext(MapContext);
  if (!context) {
    return { map: null, isLoaded: false };
  }
  return context;
}
