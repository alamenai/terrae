import fs from "fs"
import path from "path"

const COVERAGE_DIR = path.join(process.cwd(), "src/data/coverage")

export const getCoveragePercentage = (componentName: string): number | null => {
  const filePath = path.join(COVERAGE_DIR, `${componentName}.json`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"))

  return data.lines ?? null
}
