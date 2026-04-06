import fs from "fs"
import path from "path"

const BLOCKS_DIR = path.join(process.cwd(), "src/components/blocks")

export const getBlockSource = (filename: string): string => {
  const filePath = path.join(BLOCKS_DIR, filename)
  try {
    return fs.readFileSync(filePath, "utf-8")
  } catch {
    console.warn(`[getBlockSource] File not found: ${filePath}`)
    return ""
  }
}
