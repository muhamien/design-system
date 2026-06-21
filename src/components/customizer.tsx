import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "@/components/theme-provider"
import { buildPrompt, promptFileName } from "@/lib/build-prompt"
import {
  accentNames,
  accents,
  baseNames,
  bases,
  fontNames,
  fonts,
  isHex,
  normalizeHex,
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
    customAccent,
    font,
    radius,
    fullRounded,
    gridOverlay,
    panelOpen,
    setTheme,
    setBase,
    setAccent,
    setCustomAccent,
    setFont,
    setRadius,
    toggleFullRounded,
    toggleGrid,
    togglePanel,
  } = useTheme()

  // Local draft for the hex text field, kept in sync with the applied color.
  const [hexDraft, setHexDraft] = useState(customAccent ?? "")
  useEffect(() => {
    setHexDraft(customAccent ?? "")
  }, [customAccent])

  const onHexInput = (value: string) => {
    setHexDraft(value)
    if (isHex(value)) setCustomAccent(normalizeHex(value))
  }

  // Color the native picker shows when no custom color is active yet.
  const pickerValue = customAccent ?? accents[accent][theme].primary

  const seg = (active: boolean) =>
    cn(
      "h-[28px] flex-1 cursor-pointer rounded-[calc(var(--radius)-1px)] border-none font-mono text-[10px] tracking-[.08em] transition-all",
      active
        ? "bg-card text-foreground shadow-[0_1px_2px_rgba(0,0,0,.14)]"
        : "bg-transparent text-muted-foreground"
    )

  const accentLabel = customAccent ? normalizeHex(customAccent).toUpperCase() : accent
  const radiusLabel = fullRounded ? `${radius}px · pill` : `${radius}px`

  const handleDownload = () => {
    const md = buildPrompt({ theme, accent, customAccent, base, font, radius, fullRounded })
    const url = URL.createObjectURL(
      new Blob([md], { type: "text/markdown;charset=utf-8" })
    )
    const a = document.createElement("a")
    a.href = url
    a.download = promptFileName
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
    toast("Prompt downloaded", {
      description: `${accentLabel} · ${base} · ${font} · ${radiusLabel}`,
    })
  }

  const handleCopy = async () => {
    const md = buildPrompt({ theme, accent, customAccent, base, font, radius, fullRounded })
    try {
      await navigator.clipboard.writeText(md)
      toast("Prompt copied", { description: "Paste it above your build task." })
    } catch {
      toast("Copy failed", {
        description: "Clipboard unavailable — use Download instead.",
      })
    }
  }

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
                const active = !customAccent && accent === name
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

              {/* custom color — pick any hue */}
              <label
                title="Custom color"
                className="relative h-[30px] w-[30px] flex-none cursor-pointer overflow-hidden rounded-full border-2 border-card"
                style={{
                  background: customAccent
                    ? customAccent
                    : "conic-gradient(from 90deg,#f43f5e,#f59e0b,#22c55e,#3b82f6,#a855f7,#f43f5e)",
                  boxShadow: customAccent
                    ? "0 0 0 2px var(--foreground)"
                    : "0 0 0 1px var(--border)",
                }}
              >
                <input
                  type="color"
                  value={pickerValue}
                  onChange={(e) => setCustomAccent(e.target.value)}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
              </label>
            </div>

            {/* hex entry + reset for the custom color */}
            <div className="flex items-center gap-[7px]">
              <span className="font-mono text-[12px] text-muted-foreground">#</span>
              <input
                type="text"
                value={hexDraft.replace(/^#/, "")}
                onChange={(e) => onHexInput(e.target.value)}
                placeholder={pickerValue.replace(/^#/, "")}
                spellCheck={false}
                maxLength={6}
                className="h-[30px] w-[92px] rounded-[calc(var(--radius)-1px)] border border-border bg-background px-[8px] font-mono text-[11px] uppercase tracking-[.06em] text-foreground outline-none focus:border-primary"
                style={{ borderColor: customAccent ? "var(--primary)" : undefined }}
              />
              {customAccent && (
                <button
                  onClick={() => setCustomAccent(null)}
                  title="Back to presets"
                  className="ml-auto flex h-[30px] cursor-pointer items-center rounded-[calc(var(--radius)-1px)] border border-border bg-secondary px-[10px] font-mono text-[9px] tracking-[.1em] text-muted-foreground transition-colors hover:bg-accent"
                >
                  RESET
                </button>
              )}
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
            <button
              onClick={toggleFullRounded}
              title="Fully round status badges, tabs and buttons (others keep the radius above)"
              className={cn(
                "flex h-[30px] w-full cursor-pointer items-center justify-between rounded-[calc(var(--radius)-1px)] border px-[11px] font-mono text-[10px] tracking-[.08em] transition-colors",
                fullRounded
                  ? "border-primary bg-accent text-accent-foreground"
                  : "border-border bg-transparent text-muted-foreground hover:bg-accent"
              )}
            >
              <span>FULL ROUNDED</span>
              <span
                className="h-[16px] w-[28px] flex-none rounded-full border"
                style={{
                  borderColor: fullRounded ? "var(--primary)" : "var(--border)",
                  background: fullRounded ? "var(--primary)" : "transparent",
                }}
              />
            </button>
            <span className="font-mono text-[9px] leading-[1.4] tracking-[.04em] text-muted-foreground">
              Pills status badges, tabs &amp; buttons only — others follow the slider.
            </span>
          </div>

          {/* GRID OVERLAY */}
          <div className="flex items-center justify-between">
            <Caption>GRID OVERLAY</Caption>
            <Switch checked={gridOverlay} onCheckedChange={() => toggleGrid()} />
          </div>
        </div>

        <div className="flex flex-col gap-[9px] border-t border-border px-[18px] py-[14px]">
          <div className="flex items-center justify-between font-mono text-[9px] tracking-[.12em] text-muted-foreground">
            <span>AI BUILD PROMPT</span>
            <span>
              {accentLabel.toUpperCase()} · {base.toUpperCase()} · {radiusLabel.toUpperCase()}
            </span>
          </div>
          <button
            onClick={handleDownload}
            className="flex h-[32px] w-full cursor-pointer items-center justify-center gap-[7px] rounded-[calc(var(--radius)-1px)] border-none bg-primary font-mono text-[10px] tracking-[.1em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            ↓ DOWNLOAD PROMPT
          </button>
          <button
            onClick={handleCopy}
            className="flex h-[32px] w-full cursor-pointer items-center justify-center gap-[7px] rounded-[calc(var(--radius)-1px)] border border-border bg-secondary font-mono text-[10px] tracking-[.1em] text-secondary-foreground transition-colors hover:bg-accent"
          >
            ⧉ COPY TO CLIPBOARD
          </button>
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
