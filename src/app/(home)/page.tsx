import { Hero } from "@/components/landing/hero"
import { Showcase } from "@/components/landing/showcase"

const Page = () => {
  return (
    <main className="flex-1 px-3 sm:px-6 py-12 sm:py-20 mx-auto w-full">
      <section className="max-w-5xl w-full mx-auto space-y-4 sm:space-y-8">
        <Hero />
        <Showcase />
      </section>
    </main>
  )
}

export default Page
