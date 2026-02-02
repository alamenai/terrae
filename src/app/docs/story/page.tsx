import type { Metadata } from "next"
import { getPostBySlug } from "@/lib/content"
import { MdxContent } from "@/components/mdx/mdx-content"

export const metadata: Metadata = {
  title: "Story",
  description: "The story behind Terrae - why it was built and what problems it solves",
}

const StoryPage = () => {
  const postData = getPostBySlug("why-i-built-terrae")

  if (!postData) {
    return null
  }

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight mb-2">The Story Behind Terrae</h1>
      <p className="text-muted-foreground text-lg mb-8">Why I built this library and what problems it solves</p>
      <MdxContent source={postData.content} />
    </>
  )
}

export default StoryPage
