"use client"

import { Bug } from "lucide-react"
import { cn } from "@/lib/utils"

type ReportBugButtonProps = {
  className?: string
}

const GITHUB_ISSUE_URL = "https://github.com/alamenai/terrae/issues/new?title=[BUG]:%20&labels=bug"

export const ReportBugButton = ({ className }: ReportBugButtonProps) => {
  return (
    <a
      href={GITHUB_ISSUE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("p-1.5 rounded hover:bg-muted transition-colors", className)}
      aria-label="Report a bug"
      title="Report a bug"
    >
      <Bug className="size-3.5 text-muted-foreground hover:text-foreground transition-colors" />
    </a>
  )
}
