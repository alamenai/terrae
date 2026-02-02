import type { SVGProps } from "react"

export const WhyIBuiltTerraeIllustration = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <text
        x="200"
        y="110"
        textAnchor="middle"
        className="fill-foreground/15 font-semibold"
        fontSize="96"
        letterSpacing="-2"
      >
        Terrae
      </text>
    </svg>
  )
}
