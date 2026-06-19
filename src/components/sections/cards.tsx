import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Section, SectionHeader } from "@/components/sections/section"

const stats = [
  { k: "REQ/S", v: "12.4k" },
  { k: "P99", v: "38ms" },
  { k: "ERR", v: "0.02%" },
]

const avatars = [
  { initials: "AK", bg: "var(--chart-1)" },
  { initials: "RM", bg: "var(--chart-4)" },
  { initials: "JL", bg: "var(--chart-5)" },
]

export function CardsSection() {
  return (
    <Section>
      <SectionHeader num="07" title="Cards, badges & avatars" />
      <div className="grid grid-cols-[1.3fr_1fr]">
        {/* status card */}
        <div className="border-r border-border px-[20px] py-[24px]">
          <Card className="overflow-hidden">
            <div className="flex items-start justify-between gap-[12px] border-b border-border p-[18px] pb-[14px]">
              <div>
                <div className="text-[16px] font-semibold tracking-[-.01em]">
                  Edge Cluster — eu-west
                </div>
                <div className="mt-[3px] text-[13px] text-muted-foreground">
                  14 nodes · last sync 2m ago
                </div>
              </div>
              <span
                className="inline-flex items-center gap-[6px] rounded-full border bg-accent px-[9px] py-[4px] font-mono text-[10px] tracking-[.08em] text-primary"
                style={{
                  borderColor: "color-mix(in srgb,var(--primary) 30%,transparent)",
                }}
              >
                <span className="h-[6px] w-[6px] rounded-full bg-primary" />
                HEALTHY
              </span>
            </div>
            <div className="flex gap-[24px] p-[18px]">
              {stats.map((s) => (
                <div key={s.k}>
                  <div className="font-mono text-[11px] tracking-[.06em] text-muted-foreground">
                    {s.k}
                  </div>
                  <div className="mt-[4px] text-[24px] font-semibold tracking-[-.02em]">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-[10px] border-t border-border px-[18px] py-[14px]">
              <Button className="h-[34px] px-[14px]">Inspect</Button>
              <Button variant="ghost" className="h-[34px] border-border px-[14px]">
                Logs
              </Button>
            </div>
          </Card>
        </div>

        {/* badges + avatars */}
        <div className="flex flex-col gap-[24px] px-[20px] py-[24px]">
          <div className="flex flex-col gap-[12px]">
            <span className="font-mono text-[11px] tracking-[.06em] text-muted-foreground">
              BADGES
            </span>
            <div className="flex flex-wrap gap-[8px]">
              <Badge>DEFAULT</Badge>
              <Badge variant="secondary">SECONDARY</Badge>
              <Badge variant="outline">OUTLINE</Badge>
              <Badge variant="destructive">DESTRUCTIVE</Badge>
              <Badge variant="accent">ACCENT</Badge>
            </div>
          </div>

          <div className="flex flex-col gap-[12px]">
            <span className="font-mono text-[11px] tracking-[.06em] text-muted-foreground">
              AVATARS
            </span>
            <div className="flex items-center">
              {avatars.map((a, i) => (
                <Avatar
                  key={a.initials}
                  className={i > 0 ? "-ml-[10px] border-2 border-background" : "border-2 border-background"}
                >
                  <AvatarFallback className="text-white" style={{ background: a.bg }}>
                    {a.initials}
                  </AvatarFallback>
                </Avatar>
              ))}
              <Avatar className="-ml-[10px] border-2 border-background">
                <AvatarFallback className="bg-muted text-[11px] text-muted-foreground">
                  +6
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
