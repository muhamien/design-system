import { Section, SectionHeader } from "@/components/sections/section"

type ColorToken = { v: string; r: string; l: string; d: string }

const colorTokens: ColorToken[] = [
  { v: "--background", r: "Page base", l: "#FCFCFB", d: "#0C0D0B" },
  { v: "--foreground", r: "Body text", l: "#1A1A17", d: "#E7E7E1" },
  { v: "--card", r: "Surface", l: "#FFFFFF", d: "#141612" },
  { v: "--muted", r: "Subtle fill", l: "#F2F2EF", d: "#1D1F1B" },
  { v: "--muted-foreground", r: "Secondary text", l: "#6B6B64", d: "#8C8C83" },
  { v: "--primary", r: "Signal / CTA", l: "#2E6B48", d: "#5AA777" },
  { v: "--secondary", r: "Quiet action", l: "#F2F2EF", d: "#1D1F1B" },
  { v: "--accent", r: "Hover tint", l: "#E9F0EA", d: "#1C2A20" },
  { v: "--destructive", r: "Danger", l: "#B03A2B", d: "#D4543F" },
  { v: "--border", r: "Hairlines", l: "#E5E5E0", d: "#272A24" },
  { v: "--ring", r: "Focus ring", l: "#2E6B48", d: "#5AA777" },
]

const chartTokens = ["--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5"]

export function ColorsSection() {
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
                L {c.l}
              </span>
              <span className="rounded-[2px] border border-border px-[5px] py-[2px]">
                D {c.d}
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
