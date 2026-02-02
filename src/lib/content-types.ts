type BlogTag = "product" | "practices"

export type BlogFrontmatter = {
  title: string
  slug: string
  description: string
  date: string
  readingTime: string
  tag: BlogTag
  illustration?: string
}
