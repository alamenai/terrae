import Link from "next/link"
import type { BlogFrontmatter } from "@/lib/content-types"
import { BLOG_ILLUSTRATIONS } from "@/illustrations"

type BlogCardProps = {
  post: BlogFrontmatter
}

export const BlogCard = ({ post }: BlogCardProps) => {
  const illustrationKey = post.illustration ?? post.slug
  const Illustration = BLOG_ILLUSTRATIONS[illustrationKey]

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-3xl border border-border/50 overflow-hidden hover:border-border hover:bg-muted/50 transition-colors"
    >
      {Illustration && (
        <div className="flex items-center justify-center bg-muted/30 px-4 py-6 sm:px-6 sm:py-8">
          <Illustration className="w-full max-w-[280px] h-auto" />
        </div>
      )}
      <div className="flex flex-col gap-2 sm:gap-3 p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-muted px-2 py-0.5 font-medium capitalize">{post.tag}</span>
          <span aria-hidden="true">&middot;</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span aria-hidden="true">&middot;</span>
          <span>{post.readingTime}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">{post.title}</h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{post.description}</p>
      </div>
    </Link>
  )
}
