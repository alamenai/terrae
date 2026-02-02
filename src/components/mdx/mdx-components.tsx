import type { ReactNode } from "react"
import type { MDXComponents } from "mdx/types"
import { CodeBlock } from "@/app/docs/_components/code-block"
import { DocsNote } from "@/app/docs/_components/docs"

type ChildrenProps = {
  children: ReactNode
}

const Highlight = ({ children }: ChildrenProps) => {
  return (
    <p className="text-lg font-medium italic text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text">
      {children}
    </p>
  )
}

const GradientList = ({ children }: ChildrenProps) => {
  return <ul className="space-y-3 pl-2 list-none">{children}</ul>
}

const GradientListItem = ({ children }: ChildrenProps) => {
  return (
    <li className="flex items-start gap-3">
      <span className="relative mt-2 flex size-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-75" />
        <span className="relative inline-flex size-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
      </span>
      <span>{children}</span>
    </li>
  )
}

export const mdxComponents: MDXComponents = {
  a: ({ href, children, ...props }) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors"
        {...props}
      >
        {children}
      </a>
    )
  },
  CodeBlock,
  DocsNote,
  Highlight,
  GradientList,
  GradientListItem,
}
