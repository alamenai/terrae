import Link from "next/link"
import { Plus } from "lucide-react"
import { individualSponsors, companySponsors } from "./data"

const AddButton = ({ href }: { href: string }) => {
  return (
    <Link
      href={href}
      className="size-24 rounded-full border-2 border-dashed border-border hover:border-purple-500 flex items-center justify-center transition-colors"
      title="Become a backer"
    >
      <Plus className="size-8 text-muted-foreground" />
    </Link>
  )
}

type ShowcaseProps = {
  align?: "center" | "left"
}

export const BackersShowcase = ({ align = "center" }: ShowcaseProps) => {
  return (
    <div className={`flex flex-wrap gap-4 ${align === "center" ? "justify-center" : "justify-start"}`}>
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
            <img
              src={`https://github.com/${sponsor.github}.png`}
              alt={sponsor.name}
              className="size-24 rounded-full ring-2 ring-border group-hover:ring-purple-500 transition-all"
            />
          </a>
        )
      })}
      <AddButton href="/docs/sponsors" />
    </div>
  )
}

export const SponsorsShowcase = ({ align = "center" }: ShowcaseProps) => {
  return (
    <div className={`flex flex-wrap gap-4 ${align === "center" ? "justify-center" : "justify-start"}`}>
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
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className="h-8 w-auto object-contain grayscale hover:grayscale-0 transition-all"
            />
          </a>
        )
      })}
      <AddButton href="/docs/sponsors" />
    </div>
  )
}
