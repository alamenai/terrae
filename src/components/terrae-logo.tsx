import { cn } from "@/lib/utils"

type TerraeLogoProps = {
  className?: string
}

export const TerraeLogo = ({ className }: TerraeLogoProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={cn("size-6", className)}>
      <g transform="rotate(-15, 12, 12)">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M 12 2 A 10 10 0 0 0 12 22 Z" fill="currentColor" />
      </g>
    </svg>
  )
}
