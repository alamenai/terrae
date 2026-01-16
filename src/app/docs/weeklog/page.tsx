import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weeklog",
  description: "Follow along with Terrae's weekend development journey. Weekly updates, new features, and improvements crafted during weekend coding sessions.",
};

export default function WeeklogPage() {
  const weeklogs = [
    {
      title: "Hello, Terrae! 🚀",
      date: "Sunday, January 19, 2026",
      announcement: true,
    },
  ];

  return (
    <>
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Weekend Development Log
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
          Welcome to the Terrae weeklog. Every weekend, I dedicate time to building and improving this library.
          Here you'll find detailed updates on new features, improvements, and fixes shipped during each weekend development session.
        </p>
      </div>

      <div className="space-y-12">
        {weeklogs.map((weeklog, index) => (
          <div
            key={index}
            className="rounded-3xl bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 p-12 text-center space-y-6"
          >
            <div className="space-y-4">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {weeklog.title}
              </h2>
              <p className="text-lg text-muted-foreground">{weeklog.date}</p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6 text-foreground/90">
              <p className="text-lg leading-relaxed">
                I'm excited to introduce Terrae—a modern, declarative map library built for design engineers who want beautiful, 
                interactive maps without the complexity. Built with React, TypeScript, shadcn/ui, and Mapbox GL JS.
              </p>
              <div className="text-left space-y-4 pt-4">
                <h3 className="text-xl font-semibold">What's included in the initial release:</h3>
                <ul className="space-y-2 text-base list-disc list-inside">
                  <li>Core map component with theme support</li>
                  <li>Markers with customizable content and avatars</li>
                  <li>Popups and tooltips</li>
                  <li>Navigation controls (zoom, rotation, fullscreen)</li>
                  <li>MiniMap for context overview</li>
                  <li>Lines and animated route paths</li>
                  <li>Animated markers with path following</li>
                  <li>Animated pulse effects</li>
                  <li>Circle clusters for data visualization</li>
                  <li>Side-by-side map comparison</li>
                  <li>Image and video overlays</li>
                  <li>Rain weather effects</li>
                </ul>
              </div>
              <p className="text-base text-muted-foreground pt-4">
                This is just the beginning. More components, features, and improvements are coming in future weekend updates.
                Thank you for being part of this journey!
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 p-8 rounded-3xl border border-dashed bg-muted/20 text-center space-y-3">
        <h3 className="text-xl font-semibold">Want to shape the future of Terrae?</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Your feedback and ideas help guide development priorities. Share your suggestions, feature requests,
          or use cases on the{" "}
          <a
            href="/docs/ideas"
            className="text-primary hover:underline font-medium"
          >
            ideas page
          </a>
          .
        </p>
      </div>
    </>
  );
}
