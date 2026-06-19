import type { CSSProperties } from "react"

import { Section, SectionHeader } from "@/components/sections/section"

type TypeRow = { n: string; spec: string; sample: string; style: CSSProperties }

const sans: CSSProperties = {
  fontFamily: "var(--font-sans)",
  color: "var(--foreground)",
}

const typeScale: TypeRow[] = [
  {
    n: "Display",
    spec: "Grotesk 600 · 44/-2",
    sample: "Precision by default",
    style: { ...sans, fontSize: 44, fontWeight: 600, letterSpacing: "-.03em", lineHeight: 1 },
  },
  {
    n: "Heading 1",
    spec: "Grotesk 600 · 30",
    sample: "Deploy with confidence",
    style: { ...sans, fontSize: 30, fontWeight: 600, letterSpacing: "-.02em" },
  },
  {
    n: "Heading 2",
    spec: "Grotesk 600 · 22",
    sample: "Edge cluster status",
    style: { ...sans, fontSize: 22, fontWeight: 600, letterSpacing: "-.01em" },
  },
  {
    n: "Heading 3",
    spec: "Grotesk 500 · 17",
    sample: "Configure region pinning",
    style: { ...sans, fontSize: 17, fontWeight: 500 },
  },
  {
    n: "Body",
    spec: "Grotesk 400 · 14",
    sample: "The quick brown fox jumps over 14 edge nodes.",
    style: { ...sans, fontSize: 14, fontWeight: 400, lineHeight: 1.5, color: "var(--muted-foreground)" },
  },
  {
    n: "Small",
    spec: "Grotesk 400 · 13",
    sample: "Last sync 2 minutes ago · auto-refresh on",
    style: { ...sans, fontSize: 13, color: "var(--muted-foreground)" },
  },
  {
    n: "Mono",
    spec: "JetBrains 500 · 11",
    sample: "SYSTEM / TOKEN / 0x1A — a3f9c1d",
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      fontWeight: 500,
      letterSpacing: ".06em",
      color: "var(--primary)",
    },
  },
]

export function TypographySection() {
  return (
    <Section>
      <SectionHeader num="02" title="Typography" right="2 FAMILIES · 7 STEPS" />
      {typeScale.map((t) => (
        <div
          key={t.n}
          className="grid grid-cols-[128px_1fr] border-b border-border"
        >
          <div className="flex flex-col gap-[6px] border-r border-border px-[16px] py-[18px]">
            <span className="font-mono text-[11px] tracking-[.04em] text-foreground">
              {t.n}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">
              {t.spec}
            </span>
          </div>
          <div className="flex items-center overflow-hidden px-[20px] py-[16px]">
            <span style={t.style}>{t.sample}</span>
          </div>
        </div>
      ))}
    </Section>
  )
}
