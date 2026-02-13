import Link from "next/link"
import { TerraeLogo } from "@/components/terrae-logo"

const PRODUCT_LINKS = [
  { href: "/docs/components", label: "Components" },
  { href: "/docs/installation", label: "Installation" },
  { href: "/docs", label: "Documentation" },
  { href: "/docs/changelog", label: "Changelog" },
]

const RESOURCES_LINKS = [
  { href: "/docs/story", label: "Story" },
  { href: "/blog", label: "Blog" },
  { href: "/docs/api-reference", label: "API Reference" },
  { href: "/docs/hooks", label: "Hooks" },
]

const COMMUNITY_LINKS = [
  { href: "https://github.com/alamenai/terrae", label: "GitHub", external: true },
  { href: "https://github.com/alamenai/terrae/issues", label: "Issues", external: true },
  { href: "https://github.com/alamenai/terrae/discussions", label: "Discussions", external: true },
]

export const Footer = () => {
  return (
    <footer className="w-full overflow-hidden border-t border-border/40">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-1.5 mb-4">
              <TerraeLogo className="size-5" />
              <span className="font-semibold tracking-tight">terrae</span>
            </Link>
            <p className="text-xs text-muted-foreground max-w-48">
              Composable map components for React. The perfect companion for shadcn/ui.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Product</h3>
            <ul className="space-y-2">
              {PRODUCT_LINKS.map((link) => {
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Resources</h3>
            <ul className="space-y-2">
              {RESOURCES_LINKS.map((link) => {
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Community</h3>
            <ul className="space-y-2">
              {COMMUNITY_LINKS.map((link) => {
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className="relative h-20 sm:h-28">
        <span
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[40%] text-[8rem] sm:text-[12rem] md:text-[16rem] font-extrabold leading-none tracking-tighter text-foreground/5 select-none pointer-events-none"
          aria-hidden="true"
        >
          Terrae
        </span>
      </div>
    </footer>
  )
}
