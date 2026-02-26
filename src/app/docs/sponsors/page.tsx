import { DocsLayout, DocsSection } from "../_components/docs"
import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import Link from "next/link"
import { BackersShowcase, SponsorsShowcase } from "@/components/sponsors/showcase"

export const metadata: Metadata = {
  title: "Sponsors",
}

const INDIVIDUAL_SPONSOR_URL = process.env.NEXT_PUBLIC_LEMON_SQUEEZY_INDIVIDUAL_URL || "#"
const COMPANY_SPONSOR_URL = process.env.NEXT_PUBLIC_LEMON_SQUEEZY_COMPANY_URL || "#"

const SponsorsPage = () => {
  return (
    <DocsLayout
      title="Sponsors"
      description="Terrae is free and open source. Sponsorships help keep the project alive."
      prev={{ title: "Story", href: "/docs/story" }}
      next={{ title: "Changelog", href: "/docs/changelog" }}
    >
      <DocsSection title="Why Sponsor?">
        <p>
          Terrae is free, open source, and always will be. Every component, animation, and feature is crafted with care.
          But sponsorships are what keep the project alive and moving forward.
        </p>
      </DocsSection>

      <DocsSection title="For Backers">
        <p>
          If Terrae has saved you time, helped you build something great, or you simply like the project and see its
          potential, consider sponsoring to help keep it going.{" "}
          <span className="text-foreground font-medium">
            Your GitHub profile will be featured on the Terrae website.
          </span>{" "}
          Every contribution matters, no matter the size.
        </p>
        <div className="flex pt-2">
          <Button
            asChild
            className="rounded-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:opacity-90 px-8"
          >
            <Link href={INDIVIDUAL_SPONSOR_URL}>
              <Heart className="size-4 mr-1" />
              Become a Backer
            </Link>
          </Button>
        </div>
      </DocsSection>

      <DocsSection title="For Companies">
        <p>
          <span className="text-foreground font-medium">
            Companies that sponsor Terrae get their logo featured on the website.
          </span>{" "}
          It&apos;s a great way to show your support for open source mapping tools while getting visibility in front of
          developers building with maps.
        </p>
        <div className="flex pt-2">
          <Button
            asChild
            className="rounded-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:opacity-90 px-8"
          >
            <Link href={COMPANY_SPONSOR_URL}>
              <Heart className="size-4 mr-1" />
              Sponsor as Company
            </Link>
          </Button>
        </div>
      </DocsSection>

      <DocsSection title="Our Backers">
        <BackersShowcase align="left" />
      </DocsSection>

      <DocsSection title="Our Sponsors">
        <SponsorsShowcase align="left" />
      </DocsSection>
    </DocsLayout>
  )
}

export default SponsorsPage
