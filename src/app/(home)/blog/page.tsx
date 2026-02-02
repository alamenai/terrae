import type { Metadata } from "next"
import { BlogTagFilter } from "@/components/blog/tag-filter"
import { getAllPosts } from "@/lib/content"

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles about building beautiful map experiences with Terrae, React, and Mapbox GL.",
}

const BlogPage = () => {
  const posts = getAllPosts()

  return (
    <main className="flex-1 px-3 sm:px-6 py-12 sm:py-20 mx-auto w-full">
      <section className="max-w-5xl w-full mx-auto space-y-8 sm:space-y-12">
        <div className="space-y-2 sm:space-y-3">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Blog</h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Thoughts, ideas, lessons, practices, and more.
          </p>
        </div>

        <BlogTagFilter posts={posts} />
      </section>
    </main>
  )
}

export default BlogPage
