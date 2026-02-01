import type { ReactNode } from "react"

type InfoPanelProps = {
  title: string
  children: ReactNode
}

export const InfoPanel = ({ title, children }: InfoPanelProps) => {
  return (
    <div className="absolute top-3 right-3 z-10 bg-background/95 backdrop-blur-md rounded-xl p-3 border border-border/50 shadow-lg text-sm">
      <div className="tracking-wider text-[10px] text-muted-foreground uppercase mb-1">{title}</div>
      {children}
    </div>
  )
}
