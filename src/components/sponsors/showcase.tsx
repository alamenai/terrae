import Image from "next/image"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { individualSponsors, companySponsors } from "./data"

const INDIVIDUAL_SPONSOR_URL = process.env.NEXT_PUBLIC_LEMON_SQUEEZY_INDIVIDUAL_URL || "/docs/sponsors"
const COMPANY_SPONSOR_URL = process.env.NEXT_PUBLIC_LEMON_SQUEEZY_COMPANY_URL || "/docs/sponsors"

type AddButtonProps = {
  href: string
}

const AddButton = ({ href }: AddButtonProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="size-24 rounded-full border-2 border-dashed border-border hover:border-purple-500 flex items-center justify-center transition-colors"
      title="Become a sponsor"
    >
      <Plus className="size-8 text-muted-foreground" />
    </a>
  )
}

type ShowcaseProps = {
  align?: "center" | "left"
}

export const BackersShowcase = ({ align = "center" }: ShowcaseProps) => {
  return (
    <div className={cn("flex flex-wrap gap-4", align === "center" ? "justify-center" : "justify-start")}>
      {individualSponsors.map((sponsor) => {
        return (
          <a
            key={sponsor.github}
            href={`https://github.com/${sponsor.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            title={sponsor.name}
          >
            <Image
              src={`https://github.com/${sponsor.github}.png`}
              alt={sponsor.name}
              width={96}
              height={96}
              className="size-24 rounded-full ring-2 ring-border group-hover:ring-purple-500 transition-all"
            />
          </a>
        )
      })}
      <AddButton href={INDIVIDUAL_SPONSOR_URL} />
    </div>
  )
}

export const SponsorsShowcase = ({ align = "center" }: ShowcaseProps) => {
  return (
    <div className={cn("flex flex-wrap gap-4", align === "center" ? "justify-center" : "justify-start")}>
      {companySponsors.map((sponsor) => {
        return (
          <a
            key={sponsor.name}
            href={sponsor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
            title={sponsor.name}
          >
            <Image
              src={sponsor.logo}
              alt={sponsor.name}
              width={0}
              height={32}
              className="h-8 w-auto object-contain grayscale hover:grayscale-0 transition-all"
            />
          </a>
        )
      })}
      <AddButton href={COMPANY_SPONSOR_URL} />
    </div>
  )
}
