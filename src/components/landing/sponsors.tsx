import { BackersShowcase, SponsorsShowcase } from "@/components/sponsors/showcase"

export const Backers = () => {
  return (
    <div className="text-center space-y-8">
      <div className="space-y-3">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">Backed by the Community</h2>
        <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
          Join the developers who believe in open source mapping. Every backer helps shape what comes next.
        </p>
      </div>
      <BackersShowcase />
    </div>
  )
}

export const Sponsors = () => {
  return (
    <div className="text-center space-y-8">
      <div className="space-y-3">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">Built With Their Support</h2>
        <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
          Your company can be here too. Sponsor Terrae and get your logo in front of hundreds of developers.
        </p>
      </div>
      <SponsorsShowcase />
    </div>
  )
}
