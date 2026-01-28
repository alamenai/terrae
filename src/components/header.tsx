"use client"

import Link from "next/link"
import { Globe } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

interface HeaderProps {
  className?: string
  leftContent?: React.ReactNode
  actions?: React.ReactNode
}

export function Header({ className, leftContent, actions }: HeaderProps) {
  const navItems = [
    { href: "/docs/story", label: "Story" },
    { href: "/docs", label: "Docs" },
    { href: "/docs/components", label: "Components", pulse: true },
    { href: "/docs/changelog", label: "Changelog" },
  ]

  return (
    <header className={cn("w-full px-2 sm:px-6 py-3 sm:py-4", className)}>
      <nav className="flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-8 min-w-0 flex-1">
          {leftContent}
          <Link
            href="/"
            className="flex items-center gap-1.5 hover:opacity-80 transition-opacity shrink-0 cursor-pointer group"
            title="Back to home"
          >
            <Globe className="size-4 sm:size-5 group-hover:scale-110 transition-transform" />
            <span className="font-semibold tracking-tight hidden sm:inline text-sm sm:text-base">terrae</span>
          </Link>
          <div className="hidden lg:flex items-center gap-3 xl:gap-6 text-xs sm:text-sm">
            {navItems.map((item) => {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap ${
                    item.label === "Changelog"
                      ? "bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-semibold"
                      : ""
                  }`}
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
        <div className="flex items-center gap-1.5 sm:gap-2 h-4 flex-shrink-0">
          {actions}
          <Separator orientation="vertical" className="hidden sm:block" />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
