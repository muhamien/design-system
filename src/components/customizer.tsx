import { Switch } from "@/components/ui/switch"
import { useTheme } from "@/components/theme-provider"
import {
  accentNames,
  accents,
  baseNames,
  bases,
  fontNames,
  fonts,
} from "@/lib/theme"
import { cn } from "@/lib/utils"

function Caption({ children }: { children: string }) {
  return (
    <span className="font-mono text-[10px] tracking-[.1em] text-muted-foreground">
      {children}
    </span>
  )
}

export function Customizer() {
  const {
    theme,
    base,
    accent,
    font,
    radius,
    gridOverlay,
    panelOpen,
    setTheme,
    setBase,
    setAccent,
    setFont,
    setRadius,
    toggleGrid,
    togglePanel,
  } = useTheme()

  const seg = (active: boolean) =>
    cn(
      "h-[28px] flex-1 cursor-pointer rounded-[calc(var(--radius)-1px)] border-none font-mono text-[10px] tracking-[.08em] transition-all",
      active
        ? "bg-card text-foreground shadow-[0_1px_2px_rgba(0,0,0,.14)]"
        : "bg-transparent text-muted-foreground"
    )

  return (
    <>
      <div
        className="fixed bottom-0 right-0 top-0 z-[45] flex w-[300px] flex-col border-l border-border bg-card font-sans shadow-[-14px_0_44px_-22px_rgba(0,0,0,.32)] transition-transform duration-[250ms]"
        style={{ transform: panelOpen ? "none" : "translateX(100%)" }}
      >
        <div className="flex items-center justify-between border-b border-border px-[18px] py-[16px]">
          <div className="flex items-center gap-[9px] font-mono text-[11px] tracking-[.14em] text-foreground">
            <span className="h-[7px] w-[7px] bg-primary" />
            CUSTOMIZE
          </div>
          <button
            onClick={togglePanel}
            className="flex h-[26px] w-[26px] items-center justify-center rounded-[calc(var(--radius)-1px)] border border-border bg-secondary text-[11px] text-muted-foreground transition-colors hover:bg-accent"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-[22px] overflow-y-auto p-[18px]">
          {/* MODE */}
          <div className="flex flex-col gap-[9px]">
            <Caption>MODE</Caption>
            <div className="flex gap-[3px] rounded-[var(--radius)] border border-border bg-muted p-[3px]">
              <button onClick={() => setTheme("light")} className={seg(theme === "light")}>
                LIGHT
              </button>
              <button onClick={() => setTheme("dark")} className={seg(theme === "dark")}>
                DARK
              </button>
            </div>
          </div>

          {/* ACCENT */}
          <div className="flex flex-col gap-[11px]">
            <Caption>ACCENT</Caption>
            <div className="flex flex-wrap gap-[11px]">
              {accentNames.map((name) => {
                const active = accent === name
                return (
                  <button
                    key={name}
                    title={name}
                    onClick={() => setAccent(name)}
                    className="h-[30px] w-[30px] flex-none cursor-pointer rounded-full border-2 border-card"
                    style={{
                      background: accents[name][theme].primary,
                      boxShadow: active
                        ? "0 0 0 2px var(--foreground)"
                        : "0 0 0 1px var(--border)",
                    }}
                  />
                )
              })}
            </div>
          </div>

          {/* BASE COLOR */}
          <div className="flex flex-col gap-[11px]">
            <Caption>BASE COLOR</Caption>
            <div className="grid grid-cols-4 gap-[9px]">
              {baseNames.map((name) => {
                const b = bases[name][theme]
                const active = base === name
                return (
                  <button
                    key={name}
                    onClick={() => setBase(name)}
                    className="flex cursor-pointer flex-col items-stretch gap-[6px] border-none bg-transparent p-0"
                  >
                    <span
                      className="relative h-[36px] w-full rounded-[var(--radius)]"
                      style={{
                        background: b.bg,
                        border: `1px solid ${active ? "var(--foreground)" : b.border}`,
                        boxShadow: active
                          ? "0 0 0 2px color-mix(in srgb,var(--foreground) 22%,transparent)"
                          : "none",
                      }}
                    >
                      <span
                        className="absolute left-1/2 top-1/2 h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                        style={{ background: b.fg, boxShadow: `0 0 0 3px ${b.muted}` }}
                      />
                    </span>
                    <span
                      className="text-center font-mono text-[9px] tracking-[.06em]"
                      style={{
                        color: active ? "var(--foreground)" : "var(--muted-foreground)",
                      }}
                    >
                      {name}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* TYPEFACE */}
          <div className="flex flex-col gap-[9px]">
            <Caption>TYPEFACE</Caption>
            <div className="flex flex-col gap-[7px]">
              {fontNames.map((name) => {
                const active = font === name
                return (
                  <button
                    key={name}
                    onClick={() => setFont(name)}
                    className="flex h-[34px] w-full cursor-pointer items-center justify-between rounded-[calc(var(--radius)-1px)] px-[11px] font-sans text-[12px] font-medium transition-colors"
                    style={{
                      border: `1px solid ${active ? "var(--primary)" : "var(--border)"}`,
                      background: active ? "var(--accent)" : "transparent",
                      color: active ? "var(--accent-foreground)" : "var(--foreground)",
                    }}
                  >
                    <span>{name}</span>
                    <span
                      style={{
                        fontFamily: fonts[name].sans,
                        fontSize: 15,
                        fontWeight: 600,
                      }}
                    >
                      Ag
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* RADIUS */}
          <div className="flex flex-col gap-[11px]">
            <div className="flex items-center justify-between">
              <Caption>RADIUS</Caption>
              <span className="font-mono text-[10px] text-foreground">{radius}px</span>
            </div>
            <input
              type="range"
              min={0}
              max={16}
              value={radius}
              onChange={(e) => setRadius(+e.target.value)}
              className="w-full cursor-pointer"
              style={{ accentColor: "var(--primary)" }}
            />
            <div className="flex items-center gap-[10px]">
              <span className="h-[26px] w-[40px] flex-none rounded-[var(--radius)] border border-primary bg-accent" />
              <span className="h-px flex-1 bg-border" />
            </div>
          </div>

          {/* GRID OVERLAY */}
          <div className="flex items-center justify-between">
            <Caption>GRID OVERLAY</Caption>
            <Switch checked={gridOverlay} onCheckedChange={() => toggleGrid()} />
          </div>
        </div>

        <div className="border-t border-border px-[18px] py-[12px] font-mono text-[9px] tracking-[.12em] text-muted-foreground">
          GRID · LIVE TOKENS
        </div>
      </div>

      {/* floating toggle */}
      <button
        onClick={togglePanel}
        title="Toggle customizer"
        className="fixed bottom-[22px] right-[22px] z-[46] flex h-[48px] w-[48px] items-center justify-center rounded-full border-none bg-primary text-[16px] text-primary-foreground shadow-[0_12px_32px_-8px_rgba(0,0,0,.45)] cursor-pointer"
      >
        {panelOpen ? "✕" : "✦"}
      </button>
    </>
  )
}
