"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import type { BlogFrontmatter } from "@/lib/content-types"
import { BlogCard } from "./card"

const BLOG_TAGS = ["all", "product", "practices"] as const

type BlogFilterTag = (typeof BLOG_TAGS)[number]

type BlogTagFilterProps = {
  posts: BlogFrontmatter[]
}

export const BlogTagFilter = ({ posts }: BlogTagFilterProps) => {
  const [activeTag, setActiveTag] = useState<BlogFilterTag>("all")

  const filteredPosts =
    activeTag === "all"
      ? posts
      : posts.filter((post) => {
          return post.tag === activeTag
        })

  const handleTagClick = (tag: BlogFilterTag) => {
    setActiveTag(tag)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        {BLOG_TAGS.map((tag) => {
          return (
            <button
              key={tag}
              onClick={() => {
                handleTagClick(tag)
              }}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors cursor-pointer",
                activeTag === tag
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {tag}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredPosts.map((post) => {
          return <BlogCard key={post.slug} post={post} />
        })}
      </div>
    </div>
  )
}
