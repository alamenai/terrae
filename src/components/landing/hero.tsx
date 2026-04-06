import { Button } from "@/components/ui/button"
import { ArrowRight, Heart } from "lucide-react"
import Link from "next/link"

export const Hero = () => {
  return (
    <div className="relative space-y-8">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl rounded-full pointer-events-none animate-fade-in" />

      <div className="relative text-center space-y-6">
        <Link
          href="/blocks"
          className="relative inline-flex items-center text-sm text-muted-foreground hover:opacity-90 transition-opacity"
        >
          <span className="absolute inset-0 rounded-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500" />
          <span className="absolute inset-[1px] rounded-full bg-background" />
          <span className="relative px-3 py-1 flex items-center gap-1.5">
            Introducing Blocks
            <ArrowRight className="size-3" />
          </span>
        </Link>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
          Map components that{" "}
          <span className="bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            just work
          </span>
        </h1>

        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
          Composable and animated React components that replace hundreds of lines of imperative map code with simple,
          declarative props.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
        <Button
          asChild
          size="lg"
          className="rounded-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:opacity-90 w-full sm:w-auto px-8"
        >
          <Link href="/docs/sponsors">
            <Heart className="size-4 mr-1" />
            Become a Sponsor
          </Link>
        </Button>
        <Button variant="outline" asChild size="lg" className="rounded-full w-full sm:w-auto px-8">
          <Link href="/docs/components">Browse Components</Link>
        </Button>
      </div>
    </div>
  )
}
