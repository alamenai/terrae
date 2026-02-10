import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"

import { ThemeProvider } from "@/components/theme-provider"
import { WarningBanner } from "@/components/warning-banner"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
const siteName = "terrae"
const creator = "https://github.com/alamenai"
const siteDescription =
  "A collection of beautifully designed, animated, accessible, and customizable map components. Built on Mapbox GL and MapLibre GL. Styled with Tailwind CSS. Works with shadcn/ui."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "terrae - Composable map components for React",
    template: "%s - terrae",
  },
  description: siteDescription,
  keywords: [
    "react map",
    "next.js map",
    "mapbox",
    "mapbox gl",
    "map components",
    "shadcn map",
    "tailwind map",
    "react map library",
    "typescript map",
    "interactive maps",
    "map markers",
    "map controls",
  ],
  authors: [{ name: "Ala Eddine", url: "https://github.com/alamenai" }],
  creator: "Ala Eddine",
  publisher: "terrae",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: siteName,
    title: "terrae - Composable map components for React",
    description: siteDescription,
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "terrae - Composable map components for React",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "terrae - Composable map components for React",
    description: siteDescription,
    creator: creator,
    images: ["/banner.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  name: siteName,
                  url: siteUrl,
                  description: siteDescription,
                  publisher: { "@type": "Organization", name: siteName, url: siteUrl },
                },
                {
                  "@type": "Organization",
                  name: siteName,
                  url: siteUrl,
                  logo: `${siteUrl}/banner.png`,
                  sameAs: ["https://github.com/alamenai/terrae"],
                },
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <WarningBanner />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
