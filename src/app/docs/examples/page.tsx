import { Metadata } from "next";
import Link from "next/link";
import { CloudRain, Wind, AlertTriangle, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Examples",
  description: "Interactive examples showcasing Terrae with real-world data",
};

interface ExampleCard {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  status: "coming-soon" | "available";
  color: string;
}

const examples: ExampleCard[] = [
  {
    title: "Real-Time Weather",
    description: "Live weather data visualization across major cities using the Open-Meteo API",
    icon: CloudRain,
    href: "/docs/examples/weather",
    status: "available",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Air Quality Monitor",
    description: "Global air quality data with heatmap overlay using the OpenAQ API",
    icon: Wind,
    href: "/examples/air-quality",
    status: "coming-soon",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Earthquake Tracker",
    description: "Real-time earthquake data visualization from the USGS with magnitude clustering",
    icon: AlertTriangle,
    href: "/examples/earthquakes",
    status: "coming-soon",
    color: "from-red-500 to-orange-500",
  },
  {
    title: "POI Explorer",
    description: "Discover restaurants, cafes, and landmarks using public location data APIs",
    icon: MapPin,
    href: "/examples/poi-explorer",
    status: "coming-soon",
    color: "from-yellow-500 to-amber-500",
  },
];

function ExampleCard({ example }: { example: ExampleCard }) {
  const isAvailable = example.status === "available";

  return (
    <Link
      href={isAvailable ? example.href : "#"}
      className={cn(
        "group relative flex flex-col gap-4 rounded-3xl border bg-card p-6 transition-all duration-300",
        isAvailable
          ? "cursor-pointer hover:border-border hover:shadow-lg hover:bg-accent/5"
          : "cursor-not-allowed opacity-75"
      )}
    >
      <div className={cn(
        "flex size-12 items-center justify-center rounded-lg bg-gradient-to-br text-white",
        example.color
      )}>
        <example.icon className="size-6" />
      </div>

      <div className="flex-1 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {example.title}
          </h3>
          {example.status === "coming-soon" && (
            <span className="whitespace-nowrap text-xs px-2 py-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-semibold">
              Coming Soon
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {example.description}
        </p>
      </div>

      {isAvailable && (
        <div className="pt-2 text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
          Explore Example →
        </div>
      )}
    </Link>
  );
}

export default function ExamplesPage() {
  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight mb-8">Examples</h1>
      <div className="space-y-12">
        {/* Description */}
        <div className="space-y-4">
          <p className="text-xl text-muted-foreground max-w-2xl">
            Explore real-world examples of Terrae in action. Each example showcases different features with live data from public APIs.
          </p>
        </div>

        {/* Example Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {examples.map((example) => (
            <ExampleCard key={example.href} example={example} />
          ))}
        </div>

        {/* Info Section */}
        <div className="space-y-6 mt-16 pt-12 border-t">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">About These Examples</h2>
            <p className="text-muted-foreground">
              These examples use real APIs and live data to showcase Terrae's capabilities for building interactive, production-ready map applications.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-semibold">Free & Public APIs</h3>
              <p className="text-sm text-muted-foreground">
                All examples use publicly available APIs with generous free tiers or no authentication required.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Live Data</h3>
              <p className="text-sm text-muted-foreground">
                Real-time data visualization showing how Terrae handles dynamic, updating content.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Open Source</h3>
              <p className="text-sm text-muted-foreground">
                All example source code is available on GitHub. Build on top of these examples.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Production Ready</h3>
              <p className="text-sm text-muted-foreground">
                Learn patterns and best practices for building production map applications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
