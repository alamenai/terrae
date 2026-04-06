type BlockCardProps = {
  title: string
  description: string
  components: string[]
}

export const BlockCard = ({ title, description, components }: BlockCardProps) => {
  return (
    <div className="mb-4">
      <h2 className="font-semibold text-lg">{title}</h2>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
      <div className="flex flex-wrap gap-1.5 mt-3">
        {components.map((component) => {
          return (
            <span
              key={component}
              className="text-[11px] bg-muted rounded-md px-2 py-0.5 text-muted-foreground font-mono"
            >
              {component}
            </span>
          )
        })}
      </div>
    </div>
  )
}
