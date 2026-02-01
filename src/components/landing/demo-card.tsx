import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type DemoCardProps = {
  label: string
  children: ReactNode
  className?: string
}

export const DemoCard = ({ label, className, children }: DemoCardProps) => {
  return (
    <div
      className={cn(
        "rounded-2xl sm:rounded-3xl overflow-hidden border border-border/50 shadow bg-card relative",
        className
      )}
    >
      <div className="absolute top-3 left-3 z-10 tracking-wider text-[10px] text-muted-foreground bg-background/90 backdrop-blur-sm rounded-full px-3 py-1.5">
        {label}
      </div>
      {children}
    </div>
  )
}
