import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

type BlogPostLayoutProps = {
  children: ReactNode
}

const BlogPostLayout = ({ children }: BlogPostLayoutProps) => {
  return (
    <main className="flex-1 px-3 sm:px-6 py-12 sm:py-20 mx-auto w-full">
      <div className="max-w-3xl w-full mx-auto space-y-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to blog
        </Link>
        <article>{children}</article>
      </div>
    </main>
  )
}

export default BlogPostLayout
