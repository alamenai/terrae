import { cn } from "@/lib/utils"

type TerraeLogoProps = {
  className?: string
}

export const TerraeLogo = ({ className }: TerraeLogoProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={cn("size-6", className)}>
      <mask id="t-cutout">
        <rect width="24" height="24" fill="white" />
        <text
          x="12"
          y="18"
          textAnchor="middle"
          fill="black"
          fontSize="18"
          fontWeight="600"
          fontFamily="system-ui, sans-serif"
        >
          t
        </text>
      </mask>
      <circle cx="12" cy="12" r="11" fill="currentColor" mask="url(#t-cutout)" />
    </svg>
  )
}
