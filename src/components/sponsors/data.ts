type IndividualSponsor = {
  name: string
  github: string
}

type CompanySponsor = {
  name: string
  url: string
  logo: string
}

export const individualSponsors: IndividualSponsor[] = [{ name: "Ala Menai", github: "alamenai" }]

export const companySponsors: CompanySponsor[] = []
