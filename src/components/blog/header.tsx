type BlogArticleHeaderProps = {
  title: string
  date: string
  readingTime: string
}

export const BlogArticleHeader = ({ title, date, readingTime }: BlogArticleHeaderProps) => {
  return (
    <header className="space-y-3">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <time dateTime={date}>
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <span aria-hidden="true">&middot;</span>
        <span>{readingTime}</span>
      </div>
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">{title}</h1>
    </header>
  )
}
