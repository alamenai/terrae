import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { BlogFrontmatter } from "./content-types"

const CONTENT_DIR = path.join(process.cwd(), "src/content/blog")

type BlogPostData = {
  frontmatter: BlogFrontmatter
  content: string
}

export const getAllPosts = (): BlogFrontmatter[] => {
  const files = fs.readdirSync(CONTENT_DIR)

  const posts = files
    .filter((file) => {
      return file.endsWith(".mdx")
    })
    .map((file) => {
      const filePath = path.join(CONTENT_DIR, file)
      const fileContents = fs.readFileSync(filePath, "utf8")
      const { data } = matter(fileContents)

      return data as BlogFrontmatter
    })
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

  return posts
}

export const getPostBySlug = (slug: string): BlogPostData | null => {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContents)

  return {
    frontmatter: data as BlogFrontmatter,
    content,
  }
}
