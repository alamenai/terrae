import type { ReactNode } from "react"
import { GitHubButton } from "@/components/github-button"
import { HeaderNav } from "@/components/header-nav"

type HeaderProps = {
  className?: string
  leftContent?: ReactNode
}

export const Header = ({ className, leftContent }: HeaderProps) => {
  return (
    <HeaderNav className={className} leftContent={leftContent}>
      <GitHubButton />
    </HeaderNav>
  )
}
