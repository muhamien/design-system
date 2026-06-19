import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

/** Outer frame for a numbered showcase section — the continuous hairline rails. */
export function Section({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <section className={cn("border-l border-r border-border bg-background", className)}>
      {children}
    </section>
  )
}

/** The "01 — Title ———— RIGHT LABEL" header row shared by full-width sections. */
export function SectionHeader({
  num,
  title,
  right,
}: {
  num: string
  title: string
  right?: string
}) {
  return (
    <div className="flex items-baseline gap-4 border-b border-border px-[20px] pb-[22px] pt-[26px]">
      <span className="font-mono text-[11px] tracking-[.14em] text-primary">{num}</span>
      <h2 className="m-0 text-[14px] font-semibold tracking-[.02em]">{title}</h2>
      <span className="h-px flex-1 bg-border" />
      {right && (
        <span className="font-mono text-[11px] tracking-[.08em] text-muted-foreground">
          {right}
        </span>
      )}
    </div>
  )
}
