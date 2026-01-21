import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

// DocsHeader - Page title and description
interface DocsHeaderProps {
  title: string
  description: string
}

export function DocsHeader({ title, description }: DocsHeaderProps) {
  return (
    <div className="space-y-2 sm:space-y-3">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}

// DocsLayout - Full page wrapper with nav
interface DocsLayoutProps {
  title: string
  description: string
  children: React.ReactNode
  prev?: { title: string; href: string }
  next?: { title: string; href: string }
}

export function DocsLayout({ title, description, children, prev, next }: DocsLayoutProps) {
  return (
    <div>
      <DocsHeader title={title} description={description} />

      <div className="mt-6 sm:mt-10 space-y-6 sm:space-y-10">{children}</div>

      {(prev || next) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-8 sm:mt-14 pt-6 sm:pt-8 border-t">
          {prev ? (
            <Link
              href={prev.href}
              className="group flex flex-col items-start gap-1.5 p-3 sm:p-4 rounded-lg border border-border/50 hover:border-border hover:bg-muted/50 transition-colors"
            >
              <span className="text-xs text-muted-foreground">← Previous</span>
              <span className="text-sm font-medium group-hover:underline underline-offset-4 line-clamp-2">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}
          {next && (
            <Link
              href={next.href}
              className="group flex flex-col items-start sm:items-end gap-1.5 p-3 sm:p-4 rounded-lg border border-border/50 hover:border-border hover:bg-muted/50 transition-colors"
            >
              <span className="text-xs text-muted-foreground">Next →</span>
              <span className="text-sm font-medium group-hover:underline underline-offset-4 line-clamp-2 sm:text-right">
                {next.title}
              </span>
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

// DocsSection - Content section with optional title
type DocsSectionProps = {
  title?: string
  id?: string
  badge?: React.ReactNode
  children: React.ReactNode
}

export const DocsSection = ({ title, id, badge, children }: DocsSectionProps) => {
  return (
    <section id={id} className="space-y-4 sm:space-y-5">
      {title && (
        <h2 className="text-lg sm:text-xl font-semibold tracking-tight flex items-center gap-2">
          {title}
          {badge}
        </h2>
      )}
      <div className="text-sm sm:text-base text-muted-foreground leading-7 space-y-3 sm:space-y-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2">
        {children}
      </div>
    </section>
  )
}

// DocsNote - Highlighted note/callout
interface DocsNoteProps {
  children: React.ReactNode
}

export function DocsNote({ children }: DocsNoteProps) {
  return (
    <div className="rounded-2xl sm:rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 px-3 sm:px-5 py-3 sm:py-4 leading-relaxed text-xs sm:text-sm text-foreground [&>strong]:text-foreground [&>strong]:font-semibold">
      {children}
    </div>
  )
}

// DocsLink - Styled link
interface DocsLinkProps {
  href: string
  children: React.ReactNode
  external?: boolean
}

export function DocsLink({ href, children, external }: DocsLinkProps) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors"
    >
      {children}
    </Link>
  )
}

// DocsCode - Inline code
export function DocsCode({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <code className={cn("relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm", className)}>
      {children}
    </code>
  )
}

// DocsBadge - Animated gradient badge for new/updated features
export type BadgeVariant = "new" | "updated"

type DocsBadgeProps = {
  variant?: BadgeVariant
  size?: "sm" | "default"
}

export const DocsBadge = ({ variant = "new", size = "default" }: DocsBadgeProps) => {
  const label = variant === "new" ? "New" : "Updated"

  const sizeClasses = size === "sm" ? "px-1.5 py-px text-[8px]" : "px-2 py-0.5 text-[10px]"

  return (
    <span
      className={`relative inline-flex items-center justify-center ${sizeClasses} font-semibold uppercase tracking-wider rounded-full overflow-hidden`}
    >
      <span className="absolute inset-0 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x" />
      <span className="relative text-white">{label}</span>
    </span>
  )
}

export const NewBadge = ({ size = "default" }: { size?: "sm" | "default" }) => {
  return <DocsBadge variant="new" size={size} />
}

export const UpdatedBadge = ({ size = "default" }: { size?: "sm" | "default" }) => {
  return <DocsBadge variant="updated" size={size} />
}

// DocsPropTable - API reference table for component props
interface DocsPropTableProps {
  props: {
    name: string
    type: string
    default?: string
    description: string
    isNew?: boolean
  }[]
}

export function DocsPropTable({ props }: DocsPropTableProps) {
  return (
    <div className="rounded-lg border overflow-x-auto my-4">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="h-10 sm:h-11 px-2 sm:px-4 font-medium text-xs sm:text-sm">Prop</TableHead>
            <TableHead className="h-10 sm:h-11 px-2 sm:px-4 font-medium text-xs sm:text-sm">Type</TableHead>
            <TableHead className="h-10 sm:h-11 px-2 sm:px-4 font-medium text-xs sm:text-sm hidden md:table-cell">
              Default
            </TableHead>
            <TableHead className="h-10 sm:h-11 px-2 sm:px-4 font-medium text-xs sm:text-sm">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.map((prop) => (
            <TableRow key={prop.name}>
              <TableCell className="px-2 sm:px-4 py-2 sm:py-3.5 font-mono text-primary align-top text-xs sm:text-sm">
                <span className="flex items-center gap-1.5">
                  <DocsCode className="text-[11px] sm:text-[13px]">{prop.name}</DocsCode>
                  {prop.isNew && <NewBadge />}
                </span>
              </TableCell>
              <TableCell className="px-2 sm:px-4 py-2 sm:py-3.5 font-mono text-muted-foreground align-top overflow-hidden whitespace-normal text-xs sm:text-sm">
                <DocsCode className="text-[10px] sm:text-xs">{prop.type}</DocsCode>
              </TableCell>
              <TableCell className="px-2 sm:px-4 py-2 sm:py-3.5 font-mono text-muted-foreground align-top whitespace-normal text-xs sm:text-sm hidden md:table-cell">
                <DocsCode className="text-[10px] sm:text-xs">{prop.default ?? "—"}</DocsCode>
              </TableCell>
              <TableCell className="px-2 sm:px-4 py-2 sm:py-3.5 text-xs sm:text-sm text-muted-foreground whitespace-normal min-w-[120px] sm:min-w-[180px] leading-relaxed">
                {prop.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
