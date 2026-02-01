import type { ReactNode } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

type HomeLayoutProps = {
  children: ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <div className="sticky top-0 z-50 w-full bg-background">
        <Header className="max-w-5xl mx-auto w-full px-2 sm:px-6" />
      </div>
      {children}
      <Footer />
    </div>
  )
}

export default HomeLayout
