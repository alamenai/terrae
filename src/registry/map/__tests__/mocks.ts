import { vi } from "vitest"

type MockMarkerInstance = {
  setLngLat: ReturnType<typeof vi.fn>
  addTo: ReturnType<typeof vi.fn>
  remove: ReturnType<typeof vi.fn>
  getElement: ReturnType<typeof vi.fn>
}

const createMockMarkerConstructor = () => {
  const instances: MockMarkerInstance[] = []
  const constructorCalls: unknown[][] = []

  const MockMarker = vi.fn(function (this: MockMarkerInstance, ...args: unknown[]) {
    constructorCalls.push(args)
    this.setLngLat = vi.fn().mockReturnThis()
    this.addTo = vi.fn().mockReturnThis()
    this.remove = vi.fn()
    this.getElement = vi.fn(() => {
      return document.createElement("div")
    })
    instances.push(this)
  })

  return { MockMarker, instances, constructorCalls }
}

const createMockMap = () => {
  return {
    on: vi.fn(),
    off: vi.fn(),
    getCenter: vi.fn(() => {
      return { lng: 0, lat: 0 }
    }),
    getZoom: vi.fn(() => {
      return 2
    }),
  } as unknown as mapboxgl.Map
}

export { createMockMarkerConstructor, createMockMap }
