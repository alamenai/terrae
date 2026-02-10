import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, cleanup, screen, act } from "@testing-library/react"

const mockMap = {
  on: vi.fn(),
  off: vi.fn(),
  getBearing: vi.fn(() => {
    return 0
  }),
  setBearing: vi.fn(),
} as unknown as mapboxgl.Map

vi.mock("../hooks", () => {
  return {
    useMap: () => {
      return { map: mockMap, isLoaded: true }
    },
  }
})

let MapCompass: typeof import("../compass").MapCompass

beforeEach(async () => {
  vi.clearAllMocks()
  const module = await import("../compass")
  MapCompass = module.MapCompass
})

afterEach(() => {
  cleanup()
})

describe("MapCompass", () => {
  it("renders the compass SVG with default size", () => {
    const { container } = render(<MapCompass />)

    const svg = container.querySelector("svg")
    expect(svg).toBeTruthy()
    expect(svg?.getAttribute("width")).toBe("64")
    expect(svg?.getAttribute("height")).toBe("64")
  })

  it("renders with custom numeric size", () => {
    const { container } = render(<MapCompass size={120} />)

    const svg = container.querySelector("svg")
    expect(svg?.getAttribute("width")).toBe("120")
    expect(svg?.getAttribute("height")).toBe("120")
  })

  it("renders cardinal labels by default", () => {
    const { container } = render(<MapCompass />)

    const texts = container.querySelectorAll("text")
    const labels = Array.from(texts).map((textElement) => {
      return textElement.textContent
    })

    expect(labels).toContain("N")
    expect(labels).toContain("S")
    expect(labels).toContain("E")
    expect(labels).toContain("W")
  })

  it("hides cardinal labels when showCardinals is false", () => {
    const { container } = render(<MapCompass showCardinals={false} />)

    const texts = container.querySelectorAll("text")
    expect(texts).toHaveLength(0)
  })

  it("shows bearing display when showBearing is true", () => {
    render(<MapCompass showBearing />)

    const bearingDisplay = screen.getByText("0°")
    expect(bearingDisplay).toBeTruthy()
  })

  it("hides bearing display by default", () => {
    render(<MapCompass />)

    const bearingDisplay = screen.queryByText("0°")
    expect(bearingDisplay).toBeNull()
  })

  it("registers rotate event listener on mount", () => {
    render(<MapCompass />)

    expect(mockMap.on).toHaveBeenCalledWith("rotate", expect.any(Function))
  })

  it("removes rotate event listener on unmount", () => {
    const { unmount } = render(<MapCompass />)

    unmount()

    expect(mockMap.off).toHaveBeenCalledWith("rotate", expect.any(Function))
  })

  it("syncs rotation from map bearing on rotate event", () => {
    const { container } = render(<MapCompass />)

    const rotateHandler = (mockMap.on as ReturnType<typeof vi.fn>).mock.calls.find((call) => {
      return call[0] === "rotate"
    })?.[1]

    expect(rotateHandler).toBeDefined()

    vi.mocked(mockMap.getBearing).mockReturnValue(-45)

    act(() => {
      rotateHandler()
    })

    const svg = container.querySelector("svg")
    expect(svg?.style.transform).toBe("rotate(45deg)")
  })

  it("applies position class based on position prop", () => {
    const { container } = render(<MapCompass position="bottom-left" />)

    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("bottom-2")
    expect(wrapper?.className).toContain("left-2")
  })
})
