const spacing = [
  { token: "space-1", px: "2px" },
  { token: "space-2", px: "4px" },
  { token: "space-3", px: "8px" },
  { token: "space-4", px: "12px" },
  { token: "space-5", px: "16px" },
  { token: "space-6", px: "24px" },
  { token: "space-7", px: "32px" },
  { token: "space-8", px: "48px" },
]

const radii = [
  { n: "radius-sm", v: "2px" },
  { n: "radius-md", v: "4px" },
  { n: "radius-lg", v: "6px" },
  { n: "radius-xl", v: "8px" },
  { n: "radius-2xl", v: "12px" },
  { n: "radius-full", v: "9999px" },
]

function SubHeader({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-baseline gap-[14px] border-b border-border px-[20px] pb-[22px] pt-[26px]">
      <span className="font-mono text-[11px] tracking-[.14em] text-primary">{num}</span>
      <h2 className="m-0 text-[14px] font-semibold tracking-[.02em]">{title}</h2>
    </div>
  )
}

export function SpacingRadiusSection() {
  return (
    <section className="grid grid-cols-2 border-l border-r border-border bg-background">
      {/* 03 — Spacing */}
      <div className="border-r border-border">
        <SubHeader num="03" title="Spacing" />
        <div className="px-[20px] pb-[16px] pt-[8px]">
          {spacing.map((s) => (
            <div key={s.token} className="flex items-center gap-[14px] py-[7px]">
              <span className="w-[52px] font-mono text-[11px] text-muted-foreground">
                {s.token}
              </span>
              <span
                className="h-[12px] rounded-[1px] bg-primary"
                style={{ width: s.px }}
              />
              <span className="font-mono text-[11px] text-muted-foreground">
                {s.px}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 04 — Radius */}
      <div>
        <SubHeader num="04" title="Radius" />
        <div className="grid grid-cols-2 gap-[14px] px-[20px] py-[16px]">
          {radii.map((rr) => (
            <div key={rr.n} className="flex items-center gap-[12px]">
              <span
                className="h-[44px] w-[44px] flex-none border border-primary bg-accent"
                style={{ borderRadius: rr.v }}
              />
              <div className="flex flex-col gap-[2px]">
                <span className="whitespace-nowrap font-mono text-[11px] text-foreground">
                  {rr.n}
                </span>
                <span className="whitespace-nowrap font-mono text-[10px] text-muted-foreground">
                  {rr.v}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
