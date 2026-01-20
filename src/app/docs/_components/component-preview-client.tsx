"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { CopyButton } from "./copy-button"
import { ReportBugButton } from "./report-bug-button"

interface ComponentPreviewClientProps {
  children: React.ReactNode
  code: string
  highlightedCode: string
  className?: string
}

export function ComponentPreviewClient({ children, code, highlightedCode, className }: ComponentPreviewClientProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview")

  return (
    <div className="w-full rounded-lg border overflow-hidden">
      <div className="flex items-center justify-between border-b bg-muted/30 px-2 h-12">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("preview")}
            className={cn(
              "px-2 py-1 text-xs font-medium rounded transition-colors",
              activeTab === "preview"
                ? "text-foreground bg-muted dark:bg-muted/80"
                : "text-muted-foreground hover:text-foreground hover:bg-muted dark:hover:bg-muted/80"
            )}
          >
            Preview
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={cn(
              "px-3 py-1 text-xs font-medium rounded transition-colors",
              activeTab === "code"
                ? "text-foreground bg-muted dark:bg-muted/80"
                : "text-muted-foreground hover:text-foreground hover:bg-muted dark:hover:bg-muted/80"
            )}
          >
            Code
          </button>
        </div>

        <div className="flex items-center gap-1">
          <ReportBugButton />
          <CopyButton text={code} />
        </div>
      </div>

      <div className={cn("h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden", className)}>
        {activeTab === "preview" ? (
          <div className="h-full">{children}</div>
        ) : (
          <div
            className="h-full p-4 overflow-auto text-sm bg-muted/20 [&_pre]:bg-transparent! [&_code]:bg-transparent!"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        )}
      </div>
    </div>
  )
}
