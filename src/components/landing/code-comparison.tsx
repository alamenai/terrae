"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { codeToHtml } from "shiki"
import { cn } from "@/lib/utils"

type CodeExample = {
  label: string
  mapbox: string
  terrae: string
}

const EXAMPLES: CodeExample[] = [
  {
    label: "Marker",
    mapbox: `map.on("load", () => {
  const el = document.createElement("div")
  el.className = "marker"
  el.style.width = "32px"
  el.style.height = "32px"
  el.style.borderRadius = "50%"
  el.style.backgroundColor = "#3b82f6"
  el.style.cursor = "pointer"

  const popup = new mapboxgl.Popup({ offset: 25 })
    .setHTML("<h3>New York</h3><p>The Big Apple</p>")

  el.addEventListener("click", () => {
    popup.addTo(map)
  })

  new mapboxgl.Marker(el)
    .setLngLat([-74.006, 40.7128])
    .setPopup(popup)
    .addTo(map)
})`,
    terrae: `<MapMarker coordinates={[-74.006, 40.7128]}>
  <MarkerContent>
    <div className="size-8 rounded-full bg-blue-500" />
  </MarkerContent>
  <MarkerPopup>
    <h3>New York</h3>
    <p>The Big Apple</p>
  </MarkerPopup>
</MapMarker>`,
  },
  {
    label: "Popup",
    mapbox: `map.on("load", () => {
  const container = document.createElement("div")
  container.className = "popup-content"
  container.innerHTML = \`
    <div style="padding: 12px; min-width: 200px;">
      <div style="display: flex; justify-content: space-between;">
        <h3 style="margin: 0; font-weight: 600;">
          Central Park
        </h3>
        <button id="close-btn" style="
          background: none; border: none;
          cursor: pointer; font-size: 18px;
        ">×</button>
      </div>
      <p style="margin: 8px 0 0; color: #666;">
        The most visited urban park in the US.
      </p>
    </div>
  \`

  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    offset: 25,
    maxWidth: "300px",
  })
    .setLngLat([-73.965, 40.782])
    .setDOMContent(container)
    .addTo(map)

  container.querySelector("#close-btn")
    .addEventListener("click", () => {
      popup.remove()
    })
})`,
    terrae: `<MapPopup
  coordinates={[-73.965, 40.782]}
  closeButton
  offset={25}
  maxWidth="300px"
>
  <div className="p-3 min-w-50">
    <h3 className="font-semibold">Central Park</h3>
    <p className="mt-2 text-muted-foreground">
      The most visited urban park in the US.
    </p>
  </div>
</MapPopup>`,
  },
  {
    label: "Image",
    mapbox: `map.on("load", () => {
  map.addSource("overlay", {
    type: "image",
    url: "/historical-map.png",
    coordinates: [
      [-74.04, 40.735],
      [-73.97, 40.735],
      [-73.97, 40.700],
      [-74.04, 40.700],
    ],
  })

  map.addLayer({
    id: "overlay-layer",
    type: "raster",
    source: "overlay",
    paint: {
      "raster-opacity": 0.75,
    },
  })

  // To update opacity dynamically:
  slider.addEventListener("input", (e) => {
    map.setPaintProperty(
      "overlay-layer",
      "raster-opacity",
      parseFloat(e.target.value)
    )
  })

  // Cleanup on removal
  // map.removeLayer("overlay-layer")
  // map.removeSource("overlay")
})`,
    terrae: `<MapImage
  id="overlay"
  url="/historical-map.png"
  coordinates={[
    [-74.04, 40.735],
    [-73.97, 40.735],
    [-73.97, 40.700],
    [-74.04, 40.700],
  ]}
  opacity={0.75}
/>`,
  },
  {
    label: "Polygon",
    mapbox: `map.on("load", () => {
  const coordinates = [
    [-74.02, 40.72],
    [-74.01, 40.70],
    [-73.99, 40.70],
    [-73.98, 40.72],
    [-74.00, 40.73],
  ]

  // Close the polygon ring
  const closed = [...coordinates, coordinates[0]]

  map.addSource("polygon", {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [closed],
      },
    },
  })

  map.addLayer({
    id: "polygon-fill",
    type: "fill",
    source: "polygon",
    paint: {
      "fill-color": "#3b82f6",
      "fill-opacity": 0.4,
    },
  })

  map.addLayer({
    id: "polygon-outline",
    type: "line",
    source: "polygon",
    paint: {
      "line-color": "#3b82f6",
      "line-width": 2,
      "line-opacity": 1,
    },
  })
})`,
    terrae: `<MapPolygon
  coordinates={[
    [-74.02, 40.72],
    [-74.01, 40.70],
    [-73.99, 40.70],
    [-73.98, 40.72],
    [-74.00, 40.73],
  ]}
  fillColor="#3b82f6"
  fillOpacity={0.4}
  strokeColor="#3b82f6"
  strokeWidth={2}
/>`,
  },
  {
    label: "Pulse",
    mapbox: `map.on("load", () => {
  const size = 100
  const pulsingDot = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),
    onAdd() {
      const canvas = document.createElement("canvas")
      canvas.width = this.width
      canvas.height = this.height
      this.context = canvas.getContext("2d")
    },
    render() {
      const t = (performance.now() % 1000) / 1000
      const ctx = this.context
      const r = (size / 2) * 0.3
      const outerR = (size / 2) * 0.7 * t + r

      ctx.clearRect(0, 0, size, size)

      ctx.beginPath()
      ctx.arc(size/2, size/2, outerR, 0, Math.PI * 2)
      ctx.fillStyle = \`rgba(0,100,255,\${1 - t})\`
      ctx.fill()

      ctx.beginPath()
      ctx.arc(size/2, size/2, r, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(0,100,255,1)"
      ctx.fill()

      this.data = ctx.getImageData(0, 0, size, size).data
      map.triggerRepaint()
      return true
    },
  }

  map.addImage("pulse", pulsingDot, { pixelRatio: 2 })

  map.addSource("pulse", {
    type: "geojson",
    data: {
      type: "Point",
      coordinates: [-74.006, 40.7128],
    },
  })

  map.addLayer({
    id: "pulse",
    type: "symbol",
    source: "pulse",
    layout: { "icon-image": "pulse" },
  })
})`,
    terrae: `<MapAnimatedPulse
  id="pulse"
  coordinates={[-74.006, 40.7128]}
  color="rgba(0, 100, 255, 1)"
  duration={1000}
/>`,
  },
  {
    label: "Animated Line",
    mapbox: `map.on("load", () => {
  const route = [[-74.006,40.71], [-73.98,40.74], [-73.97,40.75]]

  map.addSource("route", {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: { type: "LineString", coordinates: [] },
    },
  })

  map.addLayer({
    id: "route",
    type: "line",
    source: "route",
    paint: { "line-color": "#3b82f6", "line-width": 4 },
  })

  // Marker for the head of the line
  const markerEl = document.createElement("div")
  markerEl.style.width = "12px"
  markerEl.style.height = "12px"
  markerEl.style.borderRadius = "50%"
  markerEl.style.backgroundColor = "#3b82f6"
  const marker = new mapboxgl.Marker(markerEl)
    .setLngLat(route[0])
    .addTo(map)

  // Animate drawing the line
  let start
  const duration = 3000

  const animate = (timestamp) => {
    if (!start) start = timestamp
    const progress = (timestamp - start) / duration
    const index = Math.floor(progress * (route.length - 1))
    const partial = route.slice(0, index + 2)

    map.getSource("route").setData({
      type: "Feature",
      geometry: { type: "LineString", coordinates: partial },
    })

    marker.setLngLat(partial[partial.length - 1])

    if (progress < 1) requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
})`,
    terrae: `<MapLineAnimated
  id="route"
  path={[[-74.006,40.71], [-73.98,40.74], [-73.97,40.75]]}
  color="#3b82f6"
  width={4}
  duration={3000}
  showMarker
  loop
/>`,
  },
  {
    label: "Video",
    mapbox: `map.on("load", () => {
  map.addSource("video", {
    type: "video",
    urls: [
      "/drone-footage.mp4",
      "/drone-footage.webm",
    ],
    coordinates: [
      [-122.51596391658498, 37.56238816766053],
      [-122.51467645498498, 37.56410183312965],
      [-122.51309394604498, 37.56241890498943],
      [-122.51435656698498, 37.56070861023801],
    ],
  })

  map.addLayer({
    id: "video-layer",
    type: "raster",
    source: "video",
    paint: { "raster-opacity": 0.85 },
  })

  // Access the video element for playback control
  const source = map.getSource("video")
  const video = source.getVideo()

  video.loop = true
  video.muted = true

  // Play/pause on map click
  map.on("click", () => {
    if (video.paused) {
      video.play()
    } else {
      video.pause()
    }
  })

  // Handle autoplay policy
  video.play().catch(() => {
    const playBtn = document.createElement("button")
    playBtn.textContent = "Play Video"
    playBtn.style.position = "absolute"
    playBtn.style.top = "10px"
    playBtn.style.right = "10px"
    playBtn.style.zIndex = "10"
    map.getContainer().appendChild(playBtn)

    playBtn.addEventListener("click", () => {
      video.play()
      playBtn.remove()
    })
  })
})`,
    terrae: `<MapRasterVideo
  id="drone"
  urls={["/drone-footage.mp4", "/drone-footage.webm"]}
  coordinates={[
    [-122.515, 37.562],
    [-122.514, 37.564],
    [-122.513, 37.562],
    [-122.514, 37.560],
  ]}
  opacity={0.85}
  autoplay
  loop
  muted
/>`,
  },
  {
    label: "Animated Circle",
    mapbox: `map.on("load", () => {
  const center = [-74.006, 40.7128]
  const radius = 500 // meters
  const segments = 64
  const duration = 2000
  let startTime = null

  // Generate circle coordinates for a given progress
  const generateArc = (progress) => {
    const coords = []
    const count = Math.floor(progress * segments)
    for (let i = 0; i <= count; i++) {
      const angle = (i / segments) * Math.PI * 2
      const dx = radius * Math.cos(angle) / 111320
      const dy = radius * Math.sin(angle)
        / (111320 * Math.cos(center[1] * Math.PI / 180))
      coords.push([center[0] + dy, center[1] + dx])
    }
    return coords
  }

  map.addSource("circle-stroke", {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: { type: "LineString", coordinates: [] },
    },
  })

  map.addSource("circle-fill", {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: { type: "Polygon", coordinates: [[]] },
    },
  })

  map.addLayer({
    id: "circle-stroke",
    type: "line",
    source: "circle-stroke",
    paint: {
      "line-color": "#3b82f6",
      "line-width": 2,
    },
  })

  map.addLayer({
    id: "circle-fill",
    type: "fill",
    source: "circle-fill",
    paint: {
      "fill-color": "#3b82f6",
      "fill-opacity": 0,
    },
  })

  const animate = (timestamp) => {
    if (!startTime) startTime = timestamp
    const elapsed = timestamp - startTime
    const drawProgress = Math.min(elapsed / duration, 1)

    const coords = generateArc(drawProgress)
    map.getSource("circle-stroke").setData({
      type: "Feature",
      geometry: { type: "LineString", coordinates: coords },
    })

    if (drawProgress >= 1) {
      // Animate fill opacity
      const fillProgress = Math.min((elapsed - duration) / 1000, 1)
      if (fillProgress >= 0) {
        const closed = [...generateArc(1), generateArc(1)[0]]
        map.getSource("circle-fill").setData({
          type: "Feature",
          geometry: { type: "Polygon", coordinates: [closed] },
        })
        map.setPaintProperty(
          "circle-fill", "fill-opacity", fillProgress * 0.3
        )
      }
      if (fillProgress < 1) requestAnimationFrame(animate)
    } else {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
})`,
    terrae: `<MapAnimatedCircle
  id="circle"
  center={[-74.006, 40.7128]}
  radius={500}
  strokeColor="#3b82f6"
  strokeWidth={2}
  fillColor="#3b82f6"
  fillOpacity={0.3}
  duration={2000}
  loop
/>`,
  },
  {
    label: "Cluster",
    mapbox: `map.on("load", () => {
  map.addSource("earthquakes", {
    type: "geojson",
    data: "/earthquakes.geojson",
    cluster: true,
    clusterMaxZoom: 14,
    clusterRadius: 50,
  })

  map.addLayer({
    id: "clusters",
    type: "circle",
    source: "earthquakes",
    filter: ["has", "point_count"],
    paint: {
      "circle-color": [
        "step", ["get", "point_count"],
        "#51bbd6", 100, "#f1f075", 750, "#f28cb1",
      ],
      "circle-radius": [
        "step", ["get", "point_count"],
        20, 100, 30, 750, 40,
      ],
    },
  })

  map.addLayer({
    id: "cluster-count",
    type: "symbol",
    source: "earthquakes",
    filter: ["has", "point_count"],
    layout: {
      "text-field": ["get", "point_count_abbreviated"],
      "text-size": 12,
    },
  })

  map.addLayer({
    id: "unclustered-point",
    type: "circle",
    source: "earthquakes",
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-color": "#3b82f6",
      "circle-radius": 6,
    },
  })

  map.on("click", "clusters", async (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ["clusters"],
    })
    const clusterId = features[0].properties.cluster_id
    const zoom = await map.getSource("earthquakes")
      .getClusterExpansionZoom(clusterId)
    map.easeTo({ center: features[0].geometry.coordinates, zoom })
  })
})`,
    terrae: `<MapCircleCluster
  data="/earthquakes.geojson"
  clusterMaxZoom={14}
  clusterRadius={50}
  clusterColors={["#51bbd6", "#f1f075", "#f28cb1"]}
  clusterThresholds={[100, 750]}
  pointColor="#3b82f6"
/>`,
  },
  {
    label: "Choropleth",
    mapbox: `map.on("load", () => {
  map.addSource("countries", {
    type: "geojson",
    data: "/countries.geojson",
  })

  map.addLayer({
    id: "choropleth-fill",
    type: "fill",
    source: "countries",
    paint: {
      "fill-color": [
        "interpolate", ["linear"],
        ["get", "population"],
        0, "#f7fbff",
        1000000, "#c6dbef",
        5000000, "#6baed6",
        10000000, "#2171b5",
        50000000, "#08306b",
      ],
      "fill-opacity": 0.7,
    },
  })

  map.addLayer({
    id: "choropleth-outline",
    type: "line",
    source: "countries",
    paint: {
      "line-color": "#627BC1",
      "line-width": 1,
    },
  })

  // Hover highlight
  let hoveredId = null

  map.on("mousemove", "choropleth-fill", (e) => {
    if (hoveredId !== null) {
      map.setFeatureState(
        { source: "countries", id: hoveredId },
        { hover: false }
      )
    }
    hoveredId = e.features[0].id
    map.setFeatureState(
      { source: "countries", id: hoveredId },
      { hover: true }
    )
  })

  map.on("mouseleave", "choropleth-fill", () => {
    if (hoveredId !== null) {
      map.setFeatureState(
        { source: "countries", id: hoveredId },
        { hover: false }
      )
    }
    hoveredId = null
  })
})`,
    terrae: `<MapChoropleth
  data="/countries.geojson"
  valueProperty="population"
  colorScale={{
    stops: [
      { value: 0, color: "#f7fbff" },
      { value: 1000000, color: "#c6dbef" },
      { value: 5000000, color: "#6baed6" },
      { value: 10000000, color: "#2171b5" },
      { value: 50000000, color: "#08306b" },
    ],
  }}
  fillOpacity={0.7}
  strokeColor="#627BC1"
  hoverEnabled
/>`,
  },
  {
    label: "Compare",
    mapbox: `// Two maps side by side with a draggable slider
const container = document.getElementById("comparison")

const before = new mapboxgl.Map({
  container: "before",
  style: "mapbox://styles/mapbox/light-v11",
  center: [-74.006, 40.7128],
  zoom: 12,
})

const after = new mapboxgl.Map({
  container: "after",
  style: "mapbox://styles/mapbox/dark-v11",
  center: [-74.006, 40.7128],
  zoom: 12,
})

// Sync camera between both maps
const syncMaps = (source, target) => {
  target.setCenter(source.getCenter())
  target.setZoom(source.getZoom())
  target.setBearing(source.getBearing())
  target.setPitch(source.getPitch())
}

before.on("move", () => syncMaps(before, after))
after.on("move", () => syncMaps(after, before))

// Build slider element
const slider = document.createElement("div")
slider.style.position = "absolute"
slider.style.top = "0"
slider.style.bottom = "0"
slider.style.width = "4px"
slider.style.left = "50%"
slider.style.background = "#fff"
slider.style.cursor = "ew-resize"
slider.style.zIndex = "10"
container.appendChild(slider)

// Clip the "after" map on drag
let isDragging = false

slider.addEventListener("mousedown", () => { isDragging = true })
window.addEventListener("mouseup", () => { isDragging = false })
window.addEventListener("mousemove", (e) => {
  if (!isDragging) return
  const rect = container.getBoundingClientRect()
  const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
  slider.style.left = x + "px"
  document.getElementById("after").style.clipPath =
    \`inset(0 0 0 \${x}px)\`
})`,
    terrae: `<MapCompare
  beforeStyle="mapbox://styles/mapbox/light-v11"
  afterStyle="mapbox://styles/mapbox/dark-v11"
  center={[-74.006, 40.7128]}
  zoom={12}
  showLabels
/>`,
  },
  {
    label: "MiniMap",
    mapbox: `// Create a second map instance for the minimap
const miniContainer = document.createElement("div")
miniContainer.style.width = "200px"
miniContainer.style.height = "150px"
miniContainer.style.position = "absolute"
miniContainer.style.bottom = "16px"
miniContainer.style.right = "16px"
miniContainer.style.borderRadius = "8px"
miniContainer.style.overflow = "hidden"
miniContainer.style.border = "2px solid #3b82f6"
map.getContainer().appendChild(miniContainer)

const miniMap = new mapboxgl.Map({
  container: miniContainer,
  style: "mapbox://styles/mapbox/dark-v11",
  center: map.getCenter(),
  zoom: map.getZoom() - 4,
  interactive: false,
})

// Sync minimap on every main map move
map.on("move", () => {
  miniMap.setCenter(map.getCenter())
  miniMap.setZoom(map.getZoom() - 4)
  miniMap.setBearing(map.getBearing())
  miniMap.setPitch(map.getPitch())
})

// Draw viewport bounds box on minimap
miniMap.on("load", () => {
  miniMap.addSource("viewport", {
    type: "geojson",
    data: { type: "Feature", geometry: { type: "Polygon", coordinates: [[]] } },
  })

  miniMap.addLayer({
    id: "viewport-outline",
    type: "line",
    source: "viewport",
    paint: {
      "line-color": "#3b82f6",
      "line-width": 2,
    },
  })

  const updateBounds = () => {
    const bounds = map.getBounds()
    const coords = [
      bounds.getNorthWest().toArray(),
      bounds.getNorthEast().toArray(),
      bounds.getSouthEast().toArray(),
      bounds.getSouthWest().toArray(),
      bounds.getNorthWest().toArray(),
    ]
    miniMap.getSource("viewport").setData({
      type: "Feature",
      geometry: { type: "Polygon", coordinates: [coords] },
    })
  }

  map.on("move", updateBounds)
  updateBounds()
})`,
    terrae: `<MapMiniMap
  position="bottom-right"
  width={200}
  height={150}
  zoomOffset={-4}
  boxColor="#3b82f6"
/>`,
  },
  {
    label: "Camera Follow",
    mapbox: `map.on("load", () => {
  const path = [
    [-74.006, 40.7128],
    [-73.985, 40.748],
    [-73.977, 40.752],
    [-73.968, 40.764],
  ]

  // Create a marker for the moving point
  const el = document.createElement("div")
  el.style.width = "48px"
  el.style.height = "48px"
  el.style.borderRadius = "50%"
  el.style.backgroundColor = "#3b82f6"
  const marker = new mapboxgl.Marker(el)
    .setLngLat(path[0])
    .addTo(map)

  const duration = 20000
  let start = null

  const calculateBearing = (from, to) => {
    const dLon = ((to[0] - from[0]) * Math.PI) / 180
    const lat1 = (from[1] * Math.PI) / 180
    const lat2 = (to[1] * Math.PI) / 180
    const y = Math.sin(dLon) * Math.cos(lat2)
    const x = Math.cos(lat1) * Math.sin(lat2)
      - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon)
    return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360
  }

  const interpolate = (progress) => {
    const total = path.length - 1
    const seg = Math.min(Math.floor(progress * total), total - 1)
    const frac = progress * total - seg
    return [
      path[seg][0] + (path[seg + 1][0] - path[seg][0]) * frac,
      path[seg][1] + (path[seg + 1][1] - path[seg][1]) * frac,
    ]
  }

  const animate = (timestamp) => {
    if (!start) start = timestamp
    const progress = Math.min((timestamp - start) / duration, 1)
    const pos = interpolate(progress)
    const next = interpolate(Math.min(progress + 0.01, 1))
    const bearing = calculateBearing(pos, next)

    marker.setLngLat(pos)
    marker.setRotation(bearing)

    map.easeTo({
      center: pos,
      bearing,
      zoom: 14,
      pitch: 60,
      duration: 0,
    })

    if (progress < 1) requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
})`,
    terrae: `<MapCameraFollow
  path={[
    [-74.006, 40.7128],
    [-73.985, 40.748],
    [-73.977, 40.752],
    [-73.968, 40.764],
  ]}
  duration={20000}
  zoom={14}
  pitch={60}
  marker
  loop
/>`,
  },
  {
    label: "Blur Area",
    mapbox: `// No native Mapbox support for blurring map regions.
// Requires a canvas overlay synced to the map viewport.

const overlay = document.createElement("canvas")
overlay.style.position = "absolute"
overlay.style.top = "0"
overlay.style.left = "0"
overlay.style.pointerEvents = "none"
overlay.style.zIndex = "10"
map.getContainer().appendChild(overlay)

const ctx = overlay.getContext("2d")

const blurCoords = [
  [-74.01, 40.72],
  [-73.99, 40.72],
  [-73.99, 40.70],
  [-74.01, 40.70],
]

const updateBlur = () => {
  const { width, height } = map.getCanvas()
  overlay.width = width
  overlay.height = height
  ctx.clearRect(0, 0, width, height)

  // Project geo coordinates to pixels
  const pixels = blurCoords.map((coord) => {
    return map.project(coord)
  })

  // Draw blurred region
  ctx.save()
  ctx.filter = "blur(8px)"
  ctx.beginPath()
  ctx.moveTo(pixels[0].x, pixels[0].y)
  for (let i = 1; i < pixels.length; i++) {
    ctx.lineTo(pixels[i].x, pixels[i].y)
  }
  ctx.closePath()
  ctx.fillStyle = "rgba(0, 0, 0, 0.3)"
  ctx.fill()
  ctx.restore()

  // Capture the map canvas underneath and
  // re-draw it blurred into the clipped region
  const mapCanvas = map.getCanvas()
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(pixels[0].x, pixels[0].y)
  for (let i = 1; i < pixels.length; i++) {
    ctx.lineTo(pixels[i].x, pixels[i].y)
  }
  ctx.closePath()
  ctx.clip()
  ctx.filter = "blur(8px)"
  ctx.drawImage(mapCanvas, 0, 0)
  ctx.restore()
}

map.on("move", updateBlur)
map.on("zoom", updateBlur)
map.on("resize", updateBlur)
map.on("load", updateBlur)`,
    terrae: `<MapBlurArea
  coordinates={[
    [-74.01, 40.72],
    [-73.99, 40.72],
    [-73.99, 40.70],
    [-74.01, 40.70],
  ]}
  blur={8}
  backgroundColor="rgba(0, 0, 0, 0.3)"
/>`,
  },
  {
    label: "Rain",
    mapbox: `// Mapbox GL JS has no built-in rain API.
// You need a custom WebGL shader or particle system.

const canvas = document.createElement("canvas")
const gl = canvas.getContext("webgl")

// Compile vertex & fragment shaders
const vertexShader = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(vertexShader, \`
  attribute vec2 position;
  attribute float speed;
  uniform float time;
  void main() {
    float y = mod(position.y - time * speed, 2.0) - 1.0;
    gl_Position = vec4(position.x, y, 0.0, 1.0);
    gl_PointSize = 2.0;
  }
\`)
gl.compileShader(vertexShader)

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(fragmentShader, \`
  precision mediump float;
  uniform vec4 color;
  void main() {
    gl_FragColor = color;
  }
\`)
gl.compileShader(fragmentShader)

// Create program, buffers, generate particles...
const program = gl.createProgram()
gl.attachShader(program, vertexShader)
gl.attachShader(program, fragmentShader)
gl.linkProgram(program)

// Generate 10000 rain particles
const particles = new Float32Array(10000 * 3)
for (let i = 0; i < 10000; i++) {
  particles[i * 3] = Math.random() * 2 - 1
  particles[i * 3 + 1] = Math.random() * 2 - 1
  particles[i * 3 + 2] = 0.5 + Math.random() * 0.5
}

// Upload buffers, bind attributes, animate...
const animate = () => {
  gl.uniform1f(timeLoc, performance.now() / 1000)
  gl.drawArrays(gl.POINTS, 0, 10000)
  requestAnimationFrame(animate)
}
animate()`,
    terrae: `<MapRain
  density={0.5}
  intensity={1}
  color="#a0c4ff"
  opacity={0.4}
/>`,
  },
  {
    label: "Radar",
    mapbox: `map.on("load", () => {
  const size = 200
  const radarImage = {
    width: size,
    height: size,
    data: new Uint8ClampedArray(size * size * 4),
    context: null,

    onAdd() {
      const canvas = document.createElement("canvas")
      canvas.width = size
      canvas.height = size
      this.context = canvas.getContext("2d")
    },

    render() {
      const ctx = this.context
      const center = size / 2
      const t = (performance.now() % 2000) / 2000
      const sweepAngle = t * Math.PI * 2

      ctx.clearRect(0, 0, size, size)

      // Background
      ctx.beginPath()
      ctx.arc(center, center, center, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(0, 20, 0, 0.8)"
      ctx.fill()

      // Grid rings
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath()
        ctx.arc(center, center, (center / 4) * i, 0, Math.PI * 2)
        ctx.strokeStyle = "rgba(0, 255, 70, 0.3)"
        ctx.stroke()
      }

      // Crosshairs
      ctx.beginPath()
      ctx.moveTo(0, center)
      ctx.lineTo(size, center)
      ctx.moveTo(center, 0)
      ctx.lineTo(center, size)
      ctx.strokeStyle = "rgba(0, 255, 70, 0.3)"
      ctx.stroke()

      // Sweep gradient
      const segments = 40
      const arcSpan = Math.PI / 2.5
      for (let i = 0; i < segments; i++) {
        const angle = sweepAngle - arcSpan + (arcSpan / segments) * i
        const alpha = (i / segments) * 0.6
        ctx.beginPath()
        ctx.moveTo(center, center)
        ctx.arc(center, center, center - 2,
          angle, angle + arcSpan / segments)
        ctx.fillStyle = \`rgba(0,255,70,\${alpha})\`
        ctx.fill()
      }

      this.data = ctx.getImageData(0, 0, size, size).data
      map.triggerRepaint()
      return true
    },
  }

  map.addImage("radar", radarImage, { pixelRatio: 2 })

  map.addSource("radar", {
    type: "geojson",
    data: {
      type: "Point",
      coordinates: [-74.006, 40.7128],
    },
  })

  map.addLayer({
    id: "radar",
    type: "symbol",
    source: "radar",
    layout: { "icon-image": "radar" },
  })
})`,
    terrae: `<MapRadar
  id="radar"
  coordinates={[-74.006, 40.7128]}
  size={200}
  color="rgba(0, 255, 70, 1)"
  duration={2000}
  rings={4}
  showCrosshairs
/>`,
  },
]

const highlightSnippet = async (code: string, lang: string) => {
  return codeToHtml(code, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    defaultColor: false,
  })
}

type HighlightedExample = {
  mapboxHtml: string
  terraeHtml: string
}

type CodePanelProps = {
  label: ReactNode
  html: string
  fallback: string
}

const CodePanel = ({ label, html, fallback }: CodePanelProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0 px-4 py-2.5 border-b">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
      </div>
      <div className="flex-1 min-h-0 overflow-auto p-4">
        {html ? (
          <div
            className="text-xs sm:text-sm [&_pre]:bg-transparent! [&_code]:bg-transparent! [&_pre]:p-0! [&_pre]:m-0!"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <pre className="text-xs sm:text-sm font-mono text-muted-foreground whitespace-pre">
            <code>{fallback}</code>
          </pre>
        )}
      </div>
    </div>
  )
}

const INTERSECTION_THRESHOLD = 0.15

export const CodeComparison = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [highlighted, setHighlighted] = useState<HighlightedExample[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const highlight = async () => {
      const results = await Promise.all(
        EXAMPLES.map(async (example) => {
          const [mapboxHtml, terraeHtml] = await Promise.all([
            highlightSnippet(example.mapbox, "javascript"),
            highlightSnippet(example.terrae, "tsx"),
          ])
          return { mapboxHtml, terraeHtml }
        })
      )
      setHighlighted(results)
    }

    highlight()
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: INTERSECTION_THRESHOLD }
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
    }
  }, [])

  const active = EXAMPLES[activeTab]
  const activeHighlighted = highlighted[activeTab]

  return (
    <div ref={containerRef} className="rounded-xl border bg-card overflow-hidden">
      <div
        className={cn(
          "flex items-center gap-1 px-4 py-2.5 border-b overflow-x-auto scrollbar-none md:justify-center transition-all duration-700 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
        )}
      >
        {EXAMPLES.map((example, index) => {
          return (
            <button
              key={example.label}
              onClick={() => {
                setActiveTab(index)
              }}
              className={cn(
                "shrink-0 cursor-pointer px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                activeTab === index ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {example.label}
            </button>
          )
        })}
      </div>
      <div className="flex flex-col md:flex-row h-125 sm:h-140 md:h-150">
        <div
          className={cn(
            "flex-1 min-w-0 min-h-0 transition-all duration-700 ease-out delay-200",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          )}
        >
          <CodePanel
            label={<span className="font-semibold">Mapbox GL JS</span>}
            html={activeHighlighted?.mapboxHtml || ""}
            fallback={active.mapbox}
          />
        </div>
        <div
          className={cn(
            "border-b md:border-b-0 md:border-l transition-opacity duration-500 delay-500",
            isVisible ? "opacity-100" : "opacity-0"
          )}
        />
        <div
          className={cn(
            "flex-1 min-w-0 min-h-0 transition-all duration-700 ease-out delay-400",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
          )}
        >
          <CodePanel
            label={
              <span className="relative inline-flex items-center">
                <span className="absolute inset-0 rounded-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500" />
                <span className="absolute inset-px rounded-full bg-card" />
                <span className="relative px-2 py-0.5 font-semibold bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Terrae
                </span>
              </span>
            }
            html={activeHighlighted?.terraeHtml || ""}
            fallback={active.terrae}
          />
        </div>
      </div>
    </div>
  )
}
