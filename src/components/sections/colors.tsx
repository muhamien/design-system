import { Section, SectionHeader } from "@/components/sections/section"
import { useTheme } from "@/components/theme-provider"
import { accents, bases, deriveAccent } from "@/lib/theme"

type ColorToken = { v: string; r: string; l: string; d: string }

const chartTokens = ["--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5"]

export function ColorsSection() {
  const { accent, base, customAccent } = useTheme()

  // Hex labels are derived from the live selection so they track the customizer
  // (preset accent/base or a custom color) instead of showing stale defaults.
  const accL = customAccent ? deriveAccent(customAccent, "light") : accents[accent].light
  const accD = customAccent ? deriveAccent(customAccent, "dark") : accents[accent].dark
  const bL = bases[base].light
  const bD = bases[base].dark

  const colorTokens: ColorToken[] = [
    { v: "--background", r: "Page base", l: bL.bg, d: bD.bg },
    { v: "--foreground", r: "Body text", l: bL.fg, d: bD.fg },
    { v: "--card", r: "Surface", l: bL.card, d: bD.card },
    { v: "--muted", r: "Subtle fill", l: bL.muted, d: bD.muted },
    { v: "--muted-foreground", r: "Secondary text", l: bL.mutedFg, d: bD.mutedFg },
    { v: "--primary", r: "Signal / CTA", l: accL.primary, d: accD.primary },
    { v: "--secondary", r: "Quiet action", l: bL.sec, d: bD.sec },
    { v: "--accent", r: "Hover tint", l: accL.accent, d: accD.accent },
    // Fixed per mode — not exposed by the customizer (mirrors index.css).
    { v: "--destructive", r: "Danger", l: "#b03a2b", d: "#d4543f" },
    { v: "--border", r: "Hairlines", l: bL.border, d: bD.border },
    { v: "--ring", r: "Focus ring", l: accL.ring, d: accD.ring },
  ]

  return (
    <Section>
      <SectionHeader num="01" title="Color tokens" right="SEMANTIC · LIVE" />

      <div className="grid [grid-template-columns:repeat(auto-fill,minmax(214px,1fr))]">
        {colorTokens.map((c) => (
          <div
            key={c.v}
            className="border-b border-r border-border bg-card p-[16px]"
          >
            <div
              className="h-[54px] rounded-[var(--radius)] border border-border"
              style={{ background: `var(${c.v})` }}
            />
            <div className="mt-[12px] font-mono text-[12px] font-medium text-foreground">
              {c.v}
            </div>
            <div className="mt-[3px] text-[12px] text-muted-foreground">{c.r}</div>
            <div className="mt-[10px] flex gap-[8px] font-mono text-[10px] tracking-[.04em] text-muted-foreground">
              <span className="rounded-[2px] border border-border px-[5px] py-[2px]">
                L {c.l.toUpperCase()}
              </span>
              <span className="rounded-[2px] border border-border px-[5px] py-[2px]">
                D {c.d.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-[14px] border-b border-border px-[20px] py-[18px]">
        <span className="font-mono text-[11px] tracking-[.1em] text-muted-foreground">
          CHART / DATA
        </span>
        <div className="flex gap-[8px]">
          {chartTokens.map((ch) => (
            <div
              key={ch}
              className="flex items-center gap-[7px] rounded-[var(--radius)] border border-border py-[5px] pl-[6px] pr-[9px]"
            >
              <span
                className="h-[14px] w-[14px] rounded-[2px]"
                style={{ background: `var(${ch})` }}
              />
              <span className="font-mono text-[10px] text-muted-foreground">
                {ch}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
