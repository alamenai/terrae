import type { ReactNode } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Header } from "@/components/header"
import { DocsSidebar, MobileSidebarTrigger } from "./_components/docs-sidebar"

type DocsLayoutProps = {
  children: ReactNode
}

const DocsLayout = ({ children }: DocsLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col">
        <div className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
          <Header className="px-2 sm:px-6" leftContent={<MobileSidebarTrigger />} />
        </div>
        <div className="flex flex-1">
          <DocsSidebar />
          <main className="flex-1 max-w-3xl mx-auto w-full px-3 sm:px-6 py-8 sm:py-12">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default DocsLayout
