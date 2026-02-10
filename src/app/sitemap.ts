import type { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/content"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.terrae.dev"

const DOC_ROUTES = [
  "",
  "/installation",
  "/comparison",
  "/components",
  "/hooks",
  "/api-reference",
  "/story",
  "/changelog",
  "/basic-map",
  "/controls",
  "/compass",
  "/markers",
  "/popups",
  "/markers-animated",
  "/animated-pulse",
  "/footprint",
  "/blur-area",
  "/camera-follow",
  "/compare",
  "/grid",
  "/heatmaps",
  "/minimap",
  "/radar",
  "/sync",
  "/targeting-reticle",
  "/watermark",
  "/arc-animated",
  "/lines-animated",
  "/lines-radial",
  "/lines",
  "/animated-circle",
  "/animated-polygon",
  "/choropleth",
  "/circle",
  "/circle-clusters",
  "/polygon",
  "/image",
  "/music-disc",
  "/raster-video",
  "/cyclone",
  "/explosion",
  "/fire",
  "/lightning",
  "/meteor",
  "/rain",
  "/sandstorm",
  "/snow",
  "/steam",
  "/tsunami",
]

const sitemap = (): MetadataRoute.Sitemap => {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ]

  const docPages: MetadataRoute.Sitemap = DOC_ROUTES.map((route) => {
    return {
      url: `${SITE_URL}/docs${route}`,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 0.9 : 0.7,
    }
  })

  const blogPosts: MetadataRoute.Sitemap = getAllPosts().map((post) => {
    return {
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    }
  })

  return [...staticPages, ...docPages, ...blogPosts]
}

export default sitemap
