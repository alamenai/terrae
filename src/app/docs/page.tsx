import { Zap, Moon, Puzzle, Code } from "lucide-react";
import { DocsLayout, DocsSection, DocsLink, DocsCode } from "./_components/docs";
import { CodeBlock } from "./_components/code-block";
import { Metadata } from "next";

const features = [
  {
    icon: Moon,
    title: "Theme Aware",
    description: "Automatic light/dark theme switching integrated with next-themes.",
  },
  {
    icon: Puzzle,
    title: "Declarative API",
    description: (
      <>
        React-first declarative patterns instead of{" "}
        <a
          href="https://docs.mapbox.com/mapbox-gl-js/guides/install/"
          className="text-primary hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          imperative
        </a>{" "}
        Mapbox API calls.
      </>
    ),
  },
  {
    icon: Code,
    title: "TypeScript First",
    description: "Full type safety with comprehensive TypeScript definitions.",
  },
  {
    icon: Zap,
    title: "Advanced Animations",
    description: "Smooth animations with playback controls and marker tracking.",
  },
  {
    icon: Puzzle,
    title: "Advanced Effects",
    description: "Support for video layers, rain effects, and advanced visualizations.",
  },
];

export const metadata: Metadata = {
  title: "Terrae",
};

export default function IntroductionPage() {
  return (
    <DocsLayout
      title="Terrae"
      description="Everything you need to build interactive, production-ready maps in React."
      next={{ title: "Installation", href: "/docs/installation" }}
    >
      <DocsSection>
        <p>
          <strong className="text-foreground">Terrae</strong> <span className="italic text-muted-foreground">(pronounced TER-ray)</span> provides
          beautifully designed, accessible, and customizable map components.
          Built on{" "}
          <DocsLink href="https://docs.mapbox.com/mapbox-gl-js/" external>
            Mapbox GL
          </DocsLink>
          , styled with{" "}
          <DocsLink href="https://tailwindcss.com" external>
            Tailwind CSS
          </DocsLink>
          , and designed to work with{" "}
          <DocsLink href="https://ui.shadcn.com" external>
            shadcn/ui
          </DocsLink>
          .
        </p>
      </DocsSection>

      <DocsSection title="Why Terrae?">
        <p>
          Building interactive maps in React has always been frustrating. Existing solutions either require too much boilerplate, follow <DocsLink href="https://docs.mapbox.com/mapbox-gl-js/guides/install/" external>imperative patterns</DocsLink> that don't align with React's declarative philosophy, or lack integration with modern tooling like shadcn/ui. Terrae was created to solve this—providing composable, beautiful map components that feel natural in React applications.
        </p>
        <div className="mt-4">
          <a href="/docs/story" className="text-primary hover:underline font-medium">
            Read the full story →
          </a>
        </div>
      </DocsSection>

      <DocsSection title="Features">
        <div className="grid gap-6 sm:grid-cols-2 mt-6 not-prose">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border bg-card p-6 space-y-4"
            >
              <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="size-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </DocsSection>

      <DocsSection title="Install What You Need">
        <p>
          Similar to shadcn/ui, Terrae lets you install components individually. Start with the base{" "}
          <DocsCode>map</DocsCode> component, then add only the features you need:
        </p>
        <CodeBlock code={`npx shadcn@latest add https://terrae.vercel.app/registry map
npx shadcn@latest add https://terrae.vercel.app/registry map-marker
npx shadcn@latest add https://terrae.vercel.app/registry map-controls`} language="bash" />
        <p className="mt-4">
          <DocsLink href="/docs/installation">
            View all available components →
          </DocsLink>
        </p>
      </DocsSection>
    </DocsLayout>
  );
}
