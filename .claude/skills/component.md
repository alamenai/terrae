# Component Skill

Generate new map components following Terrae's established patterns.

## Instructions

When the user requests a new component:

1. **Gather Requirements**
   - Ask for the component name (e.g., `MapHeatmap`, `MapPolygon`)
   - Ask for the core functionality
   - Ask if it needs compound components (like MarkerContent, MarkerPopup)

2. **Create the Component File**
   - Location: `src/registry/map/{component-name}.tsx`
   - Use kebab-case for file names (e.g., `heat-map.tsx`)

3. **Follow the Component Structure**

   ```typescript
   "use client";

   // 1. Imports (React first, then external, then internal)
   import { useEffect, useRef, useState, type ReactNode } from "react";
   import mapboxgl from "mapbox-gl";
   import { cn } from "@/lib/utils";
   import { useMap } from "./hooks";
   import type { MapCoordinates } from "./types";

   // 2. Type definitions (extracted, not inline)
   type ComponentProps = {
     // Required props first
     coordinates: MapCoordinates;
     children: ReactNode;
     // Optional props after
     className?: string;
   };

   // 3. Default constants (SCREAMING_SNAKE_CASE)
   const DEFAULT_VALUE = 10;

   // 4. Parent component first (Stepdown Rule)
   export const MapComponent = ({ coordinates, children, className }: ComponentProps) => {
     // Refs
     const elementRef = useRef<HTMLDivElement | null>(null);

     // State
     const [isMounted, setIsMounted] = useState(false);

     // Hooks
     const { map, isLoaded } = useMap();

     // Effects
     useEffect(() => {
       // Implementation
     }, []);

     // Handlers
     const handleClick = () => {
       // Handler logic
     };

     // Early returns
     if (!isLoaded) {
       return null;
     }

     // Main render
     return (
       <div className={cn("base-styles", className)}>
         {children}
       </div>
     );
   };

   // 5. Child/compound components after
   export const ComponentContent = () => {
     // ...
   };
   ```

4. **Key Patterns to Follow**
   - Use `type` instead of `interface`
   - Use arrow functions with explicit returns
   - Extract complex types into named types
   - Use `useMap()` hook to access the map instance
   - Use `cn()` for className merging
   - Add `"use client"` directive at the top
   - Handle cleanup in useEffect return functions
   - Use refs for Mapbox objects that shouldn't trigger re-renders

5. **Export from Index**
   - Add export to `src/registry/map/index.tsx`

6. **Review with User**
   - Show the generated code before finalizing
   - Ask if any adjustments are needed
