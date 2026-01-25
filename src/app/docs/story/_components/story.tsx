"use client"

export function Story() {
  return (
    <section className="space-y-8">
      <div className="max-w-3xl mx-auto space-y-6 text-foreground/90">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Inspiration</h3>
          <p>
            This project is inspired by{" "}
            <a
              href="https://mapcn.vercel.app/"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              MapCN
            </a>
            , a project by{" "}
            <a
              href="https://github.com/AnmolSaini16"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Anmol Saini
            </a>
            . Building on these foundations, I created Terrae to bring declarative map components to React with a focus
            on simplicity and composability.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Challenge</h3>
          <p>
            Working with interactive maps has been a challenge since my first experience with{" "}
            <a
              href="https://leafletjs.com/"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Leaflet
            </a>{" "}
            and{" "}
            <a
              href="https://vuejs.org/"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vue.js
            </a>{" "}
            back in 2018. The imperative nature of most map libraries, lack of community resources, and difficulty in
            building complex, animated, declarative components made it frustrating.
          </p>
          <p>
            Years later, while working at{" "}
            <a
              href="https://www.credium.de/"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Credium
            </a>
            , I faced similar frustrations with Next.js. I was looking for a solution that would work seamlessly with
            modern tooling like{" "}
            <a
              href="https://github.com/shadcn-ui/ui"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              shadcn/ui
            </a>
            , provide a declarative pattern instead of imperative code, and reduce the complexity of implementing
            interactive maps.
          </p>
          <p className="text-lg font-medium italic text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text">
            Unfortunately, I couldn't find anything that met all these requirements.
          </p>
          <p>
            My initial idea was to build on top of{" "}
            <a
              href="https://developers.google.com/maps"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Maps
            </a>
            , but I quickly realized it was too challenging and not opinionated enough for the kind of composable,
            declarative components I wanted to create.{" "}
            <a
              href="https://www.mapbox.com/"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mapbox GL JS
            </a>{" "}
            proved to be the perfect fit—it's flexible, powerful, and has the right level of opinion to build beautiful,
            composable components on top of it. But Mapbox itself has fundamental design decisions that make React
            integration awkward:
          </p>
          <ul className="space-y-3 pl-2">
            <li className="flex items-start gap-3">
              <span className="relative mt-2 flex size-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
              </span>
              <span>
                <span className="font-medium">Everything is a layer</span> — Mapbox treats markers, lines, polygons, and
                animations all as layers with sources, making simple tasks verbose and complex
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="relative mt-2 flex size-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
              </span>
              <span>
                <span className="font-medium">Animations are imperative</span> — Creating animated routes or moving
                markers requires manual frame-by-frame updates, timers, and state management
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="relative mt-2 flex size-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
              </span>
              <span>
                <span className="font-medium">React libraries copy the same anatomy</span> — Existing wrappers like
                react-map-gl mirror Mapbox's layer-source pattern, forcing you to think in Mapbox terms rather than
                React components
              </span>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Solution</h3>
          <p>
            Existing Mapbox implementations in React felt clunky and required too much boilerplate. So I built Terrae{" "}
            <span className="italic text-muted-foreground">(pronounced TER-ray)</span>—a collection of beautiful,
            animated, composable map components that embrace declarative patterns, focus on the interactive parts of
            maps, and work seamlessly with React and shadcn/ui.
          </p>
          <p className="text-lg font-medium italic text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text">
            No more layers—everything is a component.
          </p>
          <p>What makes Terrae different:</p>
          <ul className="space-y-3 pl-2">
            <li className="flex items-start gap-3">
              <span className="relative mt-2 flex size-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
              </span>
              <span>
                <span className="font-medium">Component-first anatomy</span> — Instead of layers and sources, you work
                with intuitive components like <code className="text-sm bg-muted px-1.5 py-0.5 rounded">MapMarker</code>
                , <code className="text-sm bg-muted px-1.5 py-0.5 rounded">MapLine</code>, and{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">MapPolygon</code>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="relative mt-2 flex size-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
              </span>
              <span>
                <span className="font-medium">Declarative animations</span> — Animated routes, pulsing markers, and
                camera follows are just props, not imperative loops. Write{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">{"<MapLineAnimated />"}</code> instead of
                managing requestAnimationFrame
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="relative mt-2 flex size-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
              </span>
              <span>
                <span className="font-medium">Idiomatic React</span> — Compose components naturally with children, use
                familiar props, and let React handle the lifecycle
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="relative mt-2 flex size-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
              </span>
              <span>
                <span className="font-medium">No Mapbox mental model</span> — Forget layers, sources, and GeoJSON specs.
                Just use components that do what their names say
              </span>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Join the Mission</h3>
          <p>
            Have an idea to make Terrae better? Whether it's a new component, a bug fix, or an improvement—I'd love to
            hear from you! Help me build a project that lasts for the open source community.
          </p>
          <div className="flex gap-4 pt-2">
            <a
              href="https://github.com/alamenai/terrae/issues/new?title=[IDEA]:%20"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Submit an idea
            </a>
            <a
              href="https://github.com/alamenai/terrae"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Contribute
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
