import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import {
  accents,
  bases,
  deriveAccent,
  deriveCharts,
  deriveDestructive,
  fixedCharts,
  fonts,
  type AccentName,
  type BaseName,
  type FontName,
  type ThemeMode,
} from "@/lib/theme"

type ThemeState = {
  theme: ThemeMode
  base: BaseName
  accent: AccentName
  /** User-picked hex that overrides the preset accent, or null for a preset. */
  customAccent: string | null
  font: FontName
  radius: number
  /** When true, corners are fully rounded (pill) regardless of `radius`. */
  fullRounded: boolean
  gridOverlay: boolean
  panelOpen: boolean
}

type ThemeContextValue = ThemeState & {
  setTheme: (t: ThemeMode) => void
  toggleTheme: () => void
  setBase: (b: BaseName) => void
  setAccent: (a: AccentName) => void
  setCustomAccent: (hex: string | null) => void
  setFont: (f: FontName) => void
  setRadius: (r: number) => void
  toggleFullRounded: () => void
  toggleGrid: () => void
  togglePanel: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function readStoredTheme(): ThemeMode {
  try {
    const t = localStorage.getItem("grid-theme")
    if (t === "light" || t === "dark") return t
  } catch {
    /* ignore */
  }
  return "light"
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(readStoredTheme)
  const [base, setBase] = useState<BaseName>("Stone")
  const [accent, setAccentState] = useState<AccentName>("Forest")
  const [customAccent, setCustomAccent] = useState<string | null>(null)
  const [font, setFont] = useState<FontName>("Inter")
  const [radius, setRadius] = useState<number>(4)
  const [fullRounded, setFullRounded] = useState<boolean>(false)
  const [gridOverlay, setGridOverlay] = useState<boolean>(true)
  const [panelOpen, setPanelOpen] = useState<boolean>(true)

  // Apply tokens to <html> — a 1:1 port of the prototype's applyTokens().
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute("data-theme", theme)
    root.classList.toggle("dark", theme === "dark")

    const s = root.style
    const a = customAccent
      ? deriveAccent(customAccent, theme)
      : (accents[accent] ?? accents.Forest)[theme]
    s.setProperty("--primary", a.primary)
    s.setProperty("--primary-foreground", a.primaryFg)
    s.setProperty("--ring", a.ring)
    s.setProperty("--accent", a.accent)
    s.setProperty("--accent-foreground", a.accentFg)
    // 9999px reads as a full pill at any element size; otherwise the slider px.
    s.setProperty("--radius", fullRounded ? "9999px" : `${radius}px`)

    // Chart palette: a custom accent harmonises all 5 series around its hue;
    // presets keep chart-1 on-accent and restore the fixed data palette.
    const charts = customAccent
      ? deriveCharts(customAccent, theme)
      : [a.chart1, ...fixedCharts[theme]]
    charts.forEach((c, i) => s.setProperty(`--chart-${i + 1}`, c))

    // Destructive: harmonise the danger red to the active accent's hue so the
    // semantic colors feel like one theme (custom or preset).
    const accentHex = customAccent ?? a.primary
    const dz = deriveDestructive(accentHex, theme)
    s.setProperty("--destructive", dz.color)
    s.setProperty("--destructive-foreground", dz.fg)

    const f = fonts[font] ?? fonts.Inter
    s.setProperty("--font-sans", f.sans)
    s.setProperty("--font-mono", f.mono)

    const b = (bases[base] ?? bases.Stone)[theme]
    s.setProperty("--background", b.bg)
    s.setProperty("--foreground", b.fg)
    s.setProperty("--card", b.card)
    s.setProperty("--card-foreground", b.fg)
    s.setProperty("--popover", b.card)
    s.setProperty("--popover-foreground", b.fg)
    s.setProperty("--secondary", b.sec)
    s.setProperty("--secondary-foreground", b.fg)
    s.setProperty("--muted", b.muted)
    s.setProperty("--muted-foreground", b.mutedFg)
    s.setProperty("--border", b.border)
    s.setProperty("--input", b.border)
  }, [theme, base, accent, customAccent, font, radius, fullRounded])

  const setTheme = (t: ThemeMode) => {
    setThemeState(t)
    try {
      localStorage.setItem("grid-theme", t)
    } catch {
      /* ignore */
    }
  }

  // Selecting a preset accent clears any active custom color.
  const setAccent = (a: AccentName) => {
    setAccentState(a)
    setCustomAccent(null)
  }

  const value: ThemeContextValue = {
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
    toggleTheme: () => setTheme(theme === "light" ? "dark" : "light"),
    setBase,
    setAccent,
    setCustomAccent,
    setFont,
    setRadius,
    toggleFullRounded: () => setFullRounded((v) => !v),
    toggleGrid: () => setGridOverlay((v) => !v),
    togglePanel: () => setPanelOpen((v) => !v),
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider")
  return ctx
}
