import { DocsLayout, DocsSection, DocsCode } from "../_components/docs"
import { ComponentPreview } from "../_components/component-preview"
import { CodeBlock } from "../_components/code-block"
import { MarkersExample } from "../_components/examples/markers-example"
import { PopupExample } from "../_components/examples/popup-example"
import { AvatarMarkerExample } from "../_components/examples/avatar-marker-example"
import { AvatarPinMarkerExample } from "../_components/examples/avatar-pin-marker-example"
import { DraggableMarkerExample } from "../_components/examples/draggable-marker-example"
import { LivePositionMarkerExample } from "../_components/examples/live-position-marker-example"
import { getExampleSource } from "@/lib/get-example-source"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Marker",
}

export default function MarkersPage() {
  const markersSource = getExampleSource("markers-example.tsx")
  const popupSource = getExampleSource("popup-example.tsx")
  const avatarMarkerSource = getExampleSource("avatar-marker-example.tsx")
  const avatarPinMarkerSource = getExampleSource("avatar-pin-marker-example.tsx")
  const draggableMarkerSource = getExampleSource("draggable-marker-example.tsx")
  const livePositionSource = getExampleSource("live-position-marker-example.tsx")

  return (
    <DocsLayout
      title="Marker"
      description="Add interactive markers to your map with popups and tooltips."
      prev={{ title: "Compass", href: "/docs/compass" }}
      next={{ title: "Popup", href: "/docs/popups" }}
    >
      <DocsSection title="Installation">
        <p>First, make sure you have the base map component installed:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/map.json`} language="bash" />
        <p className="mt-4">Then install the marker component:</p>
        <CodeBlock code={`npx shadcn@latest add https://www.terrae.dev/marker.json`} language="bash" />
      </DocsSection>

      <ComponentPreview code={markersSource}>
        <MarkersExample />
      </ComponentPreview>

      <DocsSection title="Rich Popups">
        <p>Build complex popups with images, ratings, and action buttons using shadcn/ui components.</p>
      </DocsSection>

      <ComponentPreview code={popupSource} className="h-125">
        <PopupExample />
      </ComponentPreview>

      <DocsSection title="Avatar Markers">
        <p>
          Use <DocsCode>MarkerAvatar</DocsCode> to display user avatars or profile images on the map. Perfect for
          showing team members, online users, or contributor locations with status indicators.
        </p>
      </DocsSection>

      <ComponentPreview code={avatarMarkerSource} className="h-125">
        <AvatarMarkerExample />
      </ComponentPreview>

      <DocsSection title="Avatar Pin Markers">
        <p>
          Use <DocsCode>MarkerAvatarPin</DocsCode> for a classic map pin shape with a photo inside. The teardrop design
          provides a clear pointer to the exact location while displaying user avatars.
        </p>
      </DocsSection>

      <ComponentPreview code={avatarPinMarkerSource} className="h-125">
        <AvatarPinMarkerExample />
      </ComponentPreview>

      <DocsSection title="Draggable Marker">
        <p>
          Create draggable markers that users can move around the map. Click the marker to see its current coordinates
          in a popup.
        </p>
      </DocsSection>

      <ComponentPreview code={draggableMarkerSource}>
        <DraggableMarkerExample />
      </ComponentPreview>

      <DocsSection title="Live Position Marker">
        <p>
          Track real-time positions with live data updates. This example shows the International Space Station position
          that updates every 5 seconds from a live API.
        </p>
      </DocsSection>

      <ComponentPreview code={livePositionSource} className="h-125">
        <LivePositionMarkerExample />
      </ComponentPreview>
    </DocsLayout>
  )
}
