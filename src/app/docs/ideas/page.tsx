import { Metadata } from "next";
import { Lightbulb } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ideas",
  description: "Upcoming features and planned components for Terrae",
};

export default function IdeasPage() {
  const ideas = [
    {
      title: "MapArc Component",
      description:
        "Create curved arc lines between two points on a map, perfect for visualizing flight paths, network connections, or migration routes.",
      status: "planned",
    },
    {
      title: "MapTimeline Component",
      description:
        "Interactive timeline control for temporal data visualization. Scrub through time-based datasets, animate historical events, and visualize changes over time with smooth transitions.",
      status: "planned",
    },
    {
      title: "MapContextMenu Component",
      description:
        "Right-click context menu for map interactions with customizable options, coordinate information, and action callbacks. Perfect for adding advanced interaction patterns to your maps.",
      status: "planned",
    },
    {
      title: "MapPolygon Component",
      description:
        "Draw and display polygonal shapes on the map with customizable fill colors, borders, and opacity. Ideal for highlighting regions, zones, and geographic boundaries.",
      status: "planned",
    },
    {
      title: "MapChart Component",
      description:
        "Display data visualizations and charts directly on map locations, including bar charts, pie charts, and line graphs anchored to specific coordinates.",
      status: "planned",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planned":
        return "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white border-0";
      case "under review":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight mb-4">
        Ideas
      </h1>
      <p className="text-muted-foreground text-lg mb-12">
        Explore upcoming features and components I'm planning to build. Have your own idea? Share it with me!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ideas.map((idea, index) => (
          <div
            key={index}
            className="group relative rounded-3xl border bg-card p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {idea.title}
                </h3>
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${getStatusColor(
                    idea.status
                  )}`}
                >
                  {idea.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {idea.description}
              </p>
            </div>
          </div>
        ))}

        {/* Suggest Your Idea Card */}
        <Link
          href="https://github.com/alamenai/terrae/issues/new?title=[IDEA]%20"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative rounded-3xl border bg-card p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300 flex flex-col items-center justify-center text-center min-h-50"
        >
          <div className="space-y-4">
            <Lightbulb className="w-12 h-12 text-primary mx-auto" />
            <div className="space-y-2">
              <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                Suggest Your Idea
              </h3>
              <p className="text-sm text-muted-foreground">
                Have a feature request or idea? Share it with me and help shape the future of Terrae.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
