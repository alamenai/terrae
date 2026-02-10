import fs from "node:fs"
import path from "node:path"

const COVERAGE_SUMMARY_PATH = path.resolve("coverage/coverage-summary.json")
const OUTPUT_DIR = path.resolve("src/data/coverage")

const COMPONENT_MAP = {
  compass: "src/registry/map/compass.tsx",
  radar: "src/registry/map/radar.tsx",
}

const extractCoverage = () => {
  if (!fs.existsSync(COVERAGE_SUMMARY_PATH)) {
    console.error("Coverage summary not found. Run `npm run test:coverage` first.")
    process.exit(1)
  }

  const summary = JSON.parse(fs.readFileSync(COVERAGE_SUMMARY_PATH, "utf-8"))

  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  for (const [componentName, sourcePath] of Object.entries(COMPONENT_MAP)) {
    const absolutePath = path.resolve(sourcePath)
    const fileData = summary[absolutePath]

    if (!fileData) {
      console.warn(`No coverage data found for ${componentName} (${absolutePath})`)
      continue
    }

    const output = {
      statements: fileData.statements.pct,
      branches: fileData.branches.pct,
      functions: fileData.functions.pct,
      lines: fileData.lines.pct,
    }

    const outputPath = path.join(OUTPUT_DIR, `${componentName}.json`)
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + "\n")
    console.log(`Wrote ${outputPath} — lines: ${output.lines}%`)
  }
}

extractCoverage()
