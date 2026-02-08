import { Hero } from "@/components/landing/hero"
import { CodeComparison } from "@/components/landing/code-comparison"

const Page = () => {
  return (
    <main className="flex-1 px-3 sm:px-6 py-12 sm:py-20 mx-auto w-full">
      <section className="max-w-5xl w-full mx-auto">
        <Hero />
      </section>
      <section className="max-w-7xl w-full mx-auto mt-8 sm:mt-12">
        <CodeComparison />
      </section>
    </main>
  )
}

export default Page
