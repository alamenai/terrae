import { Header } from "@/components/header"
import { HeaderActions } from "@/components/header-actions"
import { Hero } from "@/components/landing/hero"
import { Showcase } from "@/components/landing/showcase"
import { Footer } from "./_components/footer"

const Page = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <div className="sticky top-0 z-50 w-full bg-background">
        <Header className="max-w-5xl mx-auto w-full px-2 sm:px-6" actions={<HeaderActions />} />
      </div>

      <main className="flex-1 px-3 sm:px-6 py-12 sm:py-20 mx-auto w-full">
        <section className="max-w-5xl w-full mx-auto space-y-4 sm:space-y-8">
          <Hero />
          <Showcase />
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Page
