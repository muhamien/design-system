import { TrendingUpIcon } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Section, SectionHeader } from "@/components/sections/section"

// Series colours come straight from the chart tokens (§2) — never a hardcoded
// hue. ChartContainer turns each `color` into a `--color-<key>` variable that the
// Recharts <Area> reads, so the whole chart re-themes live with the customizer.
const chartData = [
  { month: "Jan", desktop: 186, mobile: 80, tablet: 45 },
  { month: "Feb", desktop: 305, mobile: 200, tablet: 90 },
  { month: "Mar", desktop: 237, mobile: 120, tablet: 70 },
  { month: "Apr", desktop: 273, mobile: 190, tablet: 110 },
  { month: "May", desktop: 209, mobile: 130, tablet: 60 },
  { month: "Jun", desktop: 314, mobile: 240, tablet: 130 },
]

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
  tablet: { label: "Tablet", color: "var(--chart-3)" },
} satisfies ChartConfig

export function ChartsSection() {
  return (
    <Section>
      <SectionHeader num="09" title="Charts" right="RECHARTS · CHART-1…5" />
      <div className="grid grid-cols-2">
        {/* stacked area — three series across chart-1 / -2 / -3 */}
        <div className="border-r border-border px-[20px] py-[24px]">
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Traffic by device</CardTitle>
              <CardDescription>Jan – Jun · stacked area</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="aspect-auto h-[220px] w-full">
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{ left: 12, right: 12, top: 12 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                  <Area
                    dataKey="tablet"
                    type="natural"
                    stackId="a"
                    fill="var(--color-tablet)"
                    fillOpacity={0.4}
                    stroke="var(--color-tablet)"
                  />
                  <Area
                    dataKey="mobile"
                    type="natural"
                    stackId="a"
                    fill="var(--color-mobile)"
                    fillOpacity={0.4}
                    stroke="var(--color-mobile)"
                  />
                  <Area
                    dataKey="desktop"
                    type="natural"
                    stackId="a"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* single series — gradient fill on the primary chart token */}
        <div className="px-[20px] py-[24px]">
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Desktop visitors</CardTitle>
              <CardDescription>Jan – Jun · gradient fill</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="aspect-auto h-[220px] w-full">
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{ left: 12, right: 12, top: 12 }}
                >
                  <defs>
                    <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" hideLabel />}
                  />
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="url(#fillDesktop)"
                    stroke="var(--color-desktop)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="border-t">
              <div className="flex items-center gap-2 text-sm font-medium">
                Trending up 5.2% this month
                <TrendingUpIcon className="size-4 text-primary" />
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Section>
  )
}
