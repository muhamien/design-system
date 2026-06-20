import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Section, SectionHeader } from "@/components/sections/section"

type Row = { name: string; region: string; p99: string; status: string; ok: boolean }

const rowsByTab: Record<string, Row[]> = {
  overview: [
    { name: "api-gateway", region: "eu-west-1", p99: "38ms", status: "LIVE", ok: true },
    { name: "auth-service", region: "us-east-1", p99: "52ms", status: "LIVE", ok: true },
    { name: "image-resize", region: "ap-south-1", p99: "140ms", status: "DEGRADED", ok: false },
    { name: "billing-cron", region: "eu-west-1", p99: "12ms", status: "LIVE", ok: true },
  ],
  activity: [
    { name: "deploy a3f9c1d", region: "eu-west-1", p99: "now", status: "QUEUED", ok: true },
    { name: "rollback 8821ee", region: "us-east-1", p99: "2m", status: "DONE", ok: true },
    { name: "scale +4 nodes", region: "ap-south-1", p99: "9m", status: "DONE", ok: true },
  ],
  settings: [
    { name: "region pinning", region: "global", p99: "—", status: "ON", ok: true },
    { name: "canary rollout", region: "global", p99: "10%", status: "OFF", ok: false },
  ],
}

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "activity", label: "Activity" },
  { id: "settings", label: "Settings" },
]

function DataTable({ rows }: { rows: Row[] }) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead>Region</TableHead>
            <TableHead className="text-right">P99</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.name}>
              <TableCell className="font-medium">{r.name}</TableCell>
              <TableCell className="text-muted-foreground font-mono text-xs">
                {r.region}
              </TableCell>
              <TableCell className="text-right font-mono text-xs">
                {r.p99}
              </TableCell>
              <TableCell className="text-right">
                <Badge variant={r.ok ? "secondary" : "destructive"}>
                  {r.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export function TabsTableSection() {
  return (
    <Section>
      <SectionHeader num="08" title="Tabs & table" />
      <div className="px-[20px] py-[24px]">
        <Tabs defaultValue="overview">
          <TabsList>
            {tabs.map((t) => (
              <TabsTrigger key={t.id} value={t.id}>
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((t) => (
            <TabsContent key={t.id} value={t.id}>
              <DataTable rows={rowsByTab[t.id]} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Section>
  )
}
