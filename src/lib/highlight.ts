import { codeToHtml } from "shiki"

export const highlightCode = async (code: string, lang: string = "tsx"): Promise<string> => {
  return codeToHtml(code, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    defaultColor: false,
  })
}
