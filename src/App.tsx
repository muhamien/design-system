import { Customizer } from "@/components/customizer"
import { Toaster } from "@/components/ui/sonner"
import { useTheme } from "@/components/theme-provider"
import { ButtonsSection } from "@/components/sections/buttons"
import { CardsSection } from "@/components/sections/cards"
import { ChartsSection } from "@/components/sections/charts"
import { IconsSection } from "@/components/sections/icons"
import { ColorsSection } from "@/components/sections/colors"
import { FormsSection } from "@/components/sections/forms"
import { Masthead } from "@/components/sections/masthead"
import { OverlaysSection } from "@/components/sections/overlays"
import { SpacingRadiusSection } from "@/components/sections/spacing-radius"
import { TabsTableSection } from "@/components/sections/tabs-table"
import { TypographySection } from "@/components/sections/typography"

function GridOverlay() {
  const { gridOverlay, panelOpen } = useTheme()
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 transition-[right,opacity] duration-[250ms]"
      style={{
        right: panelOpen ? 300 : 0,
        opacity: gridOverlay ? 0.4 : 0,
        backgroundImage:
          "linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px)",
        backgroundSize: "72px 72px",
        backgroundPosition: "-1px -1px",
      }}
    />
  )
}

function Footer() {
  const { theme } = useTheme()
  return (
    <footer className="flex items-center justify-between border-b border-l border-r border-border px-[20px] py-[22px] font-mono text-[11px] tracking-[.06em] text-muted-foreground">
      <span>GRID · DESIGN SYSTEM</span>
      <span>{theme === "light" ? "LIGHT" : "DARK"} · 22 TOKENS</span>
    </footer>
  )
}

export default function App() {
  const { panelOpen } = useTheme()
  return (
    <div
      className="relative min-h-screen bg-background font-sans text-foreground transition-[padding] duration-[250ms]"
      style={{ paddingRight: panelOpen ? 300 : 0 }}
    >
      <GridOverlay />

      <div className="relative z-[1] mx-auto max-w-[1200px] px-[28px]">
        <Masthead />
        <ColorsSection />
        <TypographySection />
        <SpacingRadiusSection />
        <ButtonsSection />
        <FormsSection />
        <CardsSection />
        <TabsTableSection />
        <ChartsSection />
        <IconsSection />
        <OverlaysSection />
        <Footer />
        <div className="h-[48px]" />
      </div>

      <Customizer />
      <Toaster />
    </div>
  )
}
