import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, cleanup } from "@testing-library/react"
import { createMockMarkerConstructor, createMockMap } from "./mocks"
import type { MapCoordinates } from "../types"

const mockMap = createMockMap()
const { MockMarker, instances, constructorCalls } = createMockMarkerConstructor()

vi.mock("../hooks", () => {
  return {
    useMap: () => {
      return { map: mockMap, isLoaded: true }
    },
  }
})

vi.mock("../map-library", () => {
  return {
    mapgl: {
      Marker: MockMarker,
    },
  }
})

let MapRadar: typeof import("../radar").MapRadar

beforeEach(async () => {
  vi.clearAllMocks()
  instances.length = 0
  constructorCalls.length = 0
  const module = await import("../radar")
  MapRadar = module.MapRadar
})

afterEach(() => {
  cleanup()
})

describe("MapRadar", () => {
  const defaultCoordinates: MapCoordinates = [-74.006, 40.7128]

  it("renders with pitchAlignment 'map' by default", () => {
    render(<MapRadar coordinates={defaultCoordinates} />)

    expect(MockMarker).toHaveBeenCalledWith(
      expect.objectContaining({
        pitchAlignment: "map",
      })
    )
  })

  it("respects custom pitchAlignment 'viewport'", () => {
    render(<MapRadar coordinates={defaultCoordinates} pitchAlignment="viewport" />)

    expect(MockMarker).toHaveBeenCalledWith(
      expect.objectContaining({
        pitchAlignment: "viewport",
      })
    )
  })

  it("creates a marker and adds it to the map", () => {
    render(<MapRadar coordinates={defaultCoordinates} />)

    expect(instances).toHaveLength(1)
    const marker = instances[0]
    expect(marker.setLngLat).toHaveBeenCalledWith(defaultCoordinates)
    expect(marker.addTo).toHaveBeenCalledWith(mockMap)
  })

  it("removes marker on unmount", () => {
    const { unmount } = render(<MapRadar coordinates={defaultCoordinates} />)

    expect(instances).toHaveLength(1)
    const marker = instances[0]

    unmount()

    expect(marker.remove).toHaveBeenCalled()
  })

  it("updates coordinates when prop changes", () => {
    const newCoordinates: MapCoordinates = [-118.2437, 34.0522]

    const { rerender } = render(<MapRadar coordinates={defaultCoordinates} />)

    const marker = instances[0]
    expect(marker.setLngLat).toHaveBeenCalledWith(defaultCoordinates)

    rerender(<MapRadar coordinates={newCoordinates} />)

    expect(marker.setLngLat).toHaveBeenCalledWith(newCoordinates)
  })
})
