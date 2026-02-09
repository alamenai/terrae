import { cn } from "@/lib/utils"

type CoverageBadgeProps = {
  percentage: number
}

const GOOD_THRESHOLD = 80
const FAIR_THRESHOLD = 50

export const CoverageBadge = ({ percentage }: CoverageBadgeProps) => {
  const colorClass =
    percentage >= GOOD_THRESHOLD
      ? "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400"
      : percentage >= FAIR_THRESHOLD
        ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
        : "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400"

  return (
    <span className={cn("rounded-full border px-2 py-0.5 text-[11px] font-medium tabular-nums", colorClass)}>
      {percentage}% covered
    </span>
  )
}
