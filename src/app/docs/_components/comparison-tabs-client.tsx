"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";

interface ComparisonTabsClientProps {
  imperativeCode: string;
  imperativeHighlighted: string;
  declarativeCode: string;
  declarativeHighlighted: string;
}

export function ComparisonTabsClient({
  imperativeCode,
  imperativeHighlighted,
  declarativeCode,
  declarativeHighlighted,
}: ComparisonTabsClientProps) {
  const [activeTab, setActiveTab] = useState<"imperative" | "declarative">(
    "imperative"
  );

  return (
    <div className="w-full rounded-lg border overflow-hidden">
      <div className="flex items-center justify-between border-b bg-muted/30 px-2 h-12">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("imperative")}
            className={cn(
              "px-3 py-1 text-xs font-medium rounded transition-colors",
              activeTab === "imperative"
                ? "text-foreground bg-muted dark:bg-muted/80"
                : "text-muted-foreground hover:text-foreground hover:bg-muted dark:hover:bg-muted/80"
            )}
          >
            Without Terrae
          </button>
          <button
            onClick={() => setActiveTab("declarative")}
            className={cn(
              "px-3 py-1 text-xs font-medium rounded transition-colors",
              activeTab === "declarative"
                ? "text-foreground bg-muted dark:bg-muted/80"
                : "text-muted-foreground hover:text-foreground hover:bg-muted dark:hover:bg-muted/80"
            )}
          >
            With Terrae
          </button>
        </div>

        <CopyButton
          text={activeTab === "imperative" ? imperativeCode : declarativeCode}
        />
      </div>

      <div className="h-[300px] sm:h-[400px] md:h-[500px] overflow-auto">
        <div
          className="p-4 overflow-auto text-sm bg-muted/20 [&_pre]:bg-transparent! [&_code]:bg-transparent!"
          dangerouslySetInnerHTML={{
            __html:
              activeTab === "imperative"
                ? imperativeHighlighted
                : declarativeHighlighted,
          }}
        />
      </div>
    </div>
  );
}
