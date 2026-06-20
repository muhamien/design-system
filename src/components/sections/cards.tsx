import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Section, SectionHeader } from "@/components/sections/section"
import { cn } from "@/lib/utils"

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
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Edge Cluster — eu-west</CardTitle>
              <CardDescription>14 nodes · last sync 2m ago</CardDescription>
              <CardAction>
                <Badge variant="secondary" className="gap-1.5">
                  <span className="size-1.5 rounded-full bg-primary" />
                  Healthy
                </Badge>
              </CardAction>
            </CardHeader>
            <CardContent className="flex gap-[24px]">
              {stats.map((s) => (
                <div key={s.k}>
                  <div className="text-muted-foreground text-xs font-medium">
                    {s.k}
                  </div>
                  <div className="mt-1 text-2xl font-semibold tabular-nums tracking-[-.02em]">
                    {s.v}
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="gap-2 border-t">
              <Button size="sm">Inspect</Button>
              <Button size="sm" variant="outline">
                Logs
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* badges + avatars */}
        <div className="flex flex-col gap-[24px] px-[20px] py-[24px]">
          <div className="flex flex-col gap-[12px]">
            <span className="font-mono text-[11px] tracking-[.06em] text-muted-foreground">
              BADGES
            </span>
            <div className="flex flex-wrap gap-[8px]">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge className="border-transparent bg-accent text-accent-foreground">
                Accent
              </Badge>
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
                  className={cn("ring-2 ring-background", i > 0 && "-ml-2.5")}
                >
                  <AvatarFallback className="text-white" style={{ background: a.bg }}>
                    {a.initials}
                  </AvatarFallback>
                </Avatar>
              ))}
              <Avatar className="-ml-2.5 ring-2 ring-background">
                <AvatarFallback className="text-xs">+6</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
