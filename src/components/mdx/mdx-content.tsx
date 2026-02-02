import { MDXRemote } from "next-mdx-remote/rsc"
import { mdxComponents } from "./mdx-components"

type MdxContentProps = {
  source: string
}

export const MdxContent = ({ source }: MdxContentProps) => {
  return (
    <div className="prose-custom text-base sm:text-lg text-muted-foreground leading-loose space-y-6 [&>h2]:text-xl [&>h2]:sm:text-2xl [&>h2]:font-semibold [&>h2]:tracking-tight [&>h2]:text-foreground [&>h2]:pt-4 [&>h3]:text-base [&>h3]:sm:text-lg [&>h3]:font-semibold [&>h3]:tracking-tight [&>h3]:text-foreground [&>h3]:pt-2 [&>p]:leading-loose [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2">
      <MDXRemote source={source} components={mdxComponents} />
    </div>
  )
}
