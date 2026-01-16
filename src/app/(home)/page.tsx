import { Header } from "@/components/header";
import { HeaderActions } from "@/components/header-actions";
import { Hero } from "./_components/hero";
import { Examples } from "./_components/examples";
import { Footer } from "./_components/footer";

export default function Page() {
  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <div className="sticky top-0 z-50 w-full bg-background">
        <Header className="max-w-5xl mx-auto w-full px-2 sm:px-6" actions={<HeaderActions />} />
      </div>

      <main className="flex-1 px-3 sm:px-6 py-12 sm:py-20 mx-auto w-full">
        <section className="max-w-5xl w-full mx-auto space-y-12 sm:space-y-20">
          <Hero />
          <Examples />
        </section>
      </main>

      <Footer />
    </div>
  );
}
