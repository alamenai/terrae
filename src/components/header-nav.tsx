"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { TerraeLogo } from "@/components/terrae-logo"

type HeaderNavProps = {
  className?: string
  leftContent?: ReactNode
  children?: ReactNode
}

const NAV_ITEMS = [
  { href: "/docs/story", label: "Story" },
  { href: "/docs", label: "Docs" },
  { href: "/docs/components", label: "Components", pulse: true },
  { href: "/blog", label: "Blog" },
  { href: "/docs/changelog", label: "Changelog" },
]

export const HeaderNav = ({ className, leftContent, children }: HeaderNavProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleToggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleCloseMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className={cn("w-full px-2 sm:px-6 py-3 sm:py-4", className)}>
      <nav className="flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-8 min-w-0 flex-1">
          {leftContent}
          {!leftContent && (
            <button
              className="lg:hidden flex items-center justify-center size-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              onClick={handleToggleMobileMenu}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          )}
          <Link
            href="/"
            className="flex items-center gap-1.5 hover:opacity-80 transition-opacity shrink-0 cursor-pointer group"
            title="Back to home"
          >
            <TerraeLogo className="size-4 sm:size-5 group-hover:scale-110 transition-transform" />
            <span className="font-semibold tracking-tight hidden sm:inline text-sm sm:text-base">terrae</span>
          </Link>
          <div className="hidden lg:flex items-center gap-3 xl:gap-6 text-xs sm:text-sm">
            {NAV_ITEMS.map((item) => {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap",
                    item.label === "Changelog" &&
                      "bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-semibold"
                  )}
                >
                  {item.label}
                  {item.pulse && (
                    <span className="absolute -top-1 -right-2 flex size-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-purple-500" />
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 h-4 shrink-0">
          {children}
          <Separator orientation="vertical" className="hidden sm:block" />
          <ThemeToggle />
        </div>
      </nav>

      {mobileMenuOpen && !leftContent && (
        <div className="lg:hidden border-t border-border/50 mt-3 pt-3">
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleCloseMobileMenu}
                  className={cn(
                    "relative px-3 py-2 rounded-md text-sm transition-colors",
                    item.label === "Changelog"
                      ? "bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {item.label}
                  {item.pulse && (
                    <span className="absolute top-2 ml-1 flex size-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-purple-500" />
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
