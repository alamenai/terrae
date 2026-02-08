import { highlightCode } from "@/lib/highlight"
import { ComparisonTabsClient } from "./comparison-tabs-client"

interface ComparisonTabsProps {
  imperativeCode: string
  declarativeCode: string
}

export async function ComparisonTabs({ imperativeCode, declarativeCode }: ComparisonTabsProps) {
  const [imperativeHighlighted, declarativeHighlighted] = await Promise.all([
    highlightCode(imperativeCode, "typescript"),
    highlightCode(declarativeCode, "typescript"),
  ])

  return (
    <ComparisonTabsClient
      imperativeCode={imperativeCode}
      imperativeHighlighted={imperativeHighlighted}
      declarativeCode={declarativeCode}
      declarativeHighlighted={declarativeHighlighted}
    />
  )
}
