import Link from "next/link"

export const Footer = () => {
  return (
    <footer className="w-full overflow-hidden border-t border-border/40">
      <div className="relative h-32 sm:h-40">
        <div className="relative z-10 mx-auto max-w-5xl flex items-center justify-between px-6 py-6 text-xs text-muted-foreground">
          <span>
            Built by{" "}
            <a
              href="https://github.com/alamenai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:underline"
            >
              Ala Eddine
            </a>
          </span>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/alamenai/terrae"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <Link href="/docs" className="hover:text-foreground transition-colors">
              Docs
            </Link>
          </div>
        </div>

        <span
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[40%] text-[8rem] sm:text-[12rem] md:text-[16rem] font-extrabold leading-none tracking-tighter text-foreground/5 select-none pointer-events-none"
          aria-hidden="true"
        >
          Terrae
        </span>
      </div>
    </footer>
  )
}
