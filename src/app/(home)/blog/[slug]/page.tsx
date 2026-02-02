import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllPosts, getPostBySlug } from "@/lib/content"
import { BlogArticleHeader } from "@/components/blog/header"
import { MdxContent } from "@/components/mdx/mdx-content"

export const generateStaticParams = () => {
  const posts = getAllPosts()

  return posts.map((post) => {
    return { slug: post.slug }
  })
}

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

export const generateMetadata = async ({ params }: BlogPostPageProps): Promise<Metadata> => {
  const { slug } = await params
  const postData = getPostBySlug(slug)

  if (!postData) {
    return {}
  }

  return {
    title: postData.frontmatter.title,
    description: postData.frontmatter.description,
  }
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params
  const postData = getPostBySlug(slug)

  if (!postData) {
    notFound()
  }

  const { frontmatter, content } = postData

  return (
    <div className="space-y-8 sm:space-y-10">
      <BlogArticleHeader title={frontmatter.title} date={frontmatter.date} readingTime={frontmatter.readingTime} />
      <MdxContent source={content} />
    </div>
  )
}

export default BlogPostPage
