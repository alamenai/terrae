import type { ComponentType, SVGProps } from "react"
import { ClaudeCodeComponentsIllustration } from "./post-2"
import { WhyIBuiltTerraeIllustration } from "./post-1"

export const BLOG_ILLUSTRATIONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  "claude-code-components": ClaudeCodeComponentsIllustration,
  "why-i-built-terrae": WhyIBuiltTerraeIllustration,
}
