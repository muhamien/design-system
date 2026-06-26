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

const STORAGE_KEY = "grid-customizer-v1"

type PersistedState = {
  theme?: ThemeMode
  base?: BaseName
  accent?: AccentName
  customAccent?: string | null
  font?: FontName
  radius?: number
  fullRounded?: boolean
  gridOverlay?: boolean
}

function readStored(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as PersistedState
  } catch {
    /* ignore */
  }
  return {}
}

function writeStored(state: PersistedState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* ignore */
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const stored = readStored()
  const [theme, setThemeState] = useState<ThemeMode>(
    stored.theme === "light" || stored.theme === "dark" ? stored.theme : "light"
  )
  const [base, setBase] = useState<BaseName>(stored.base ?? "Stone")
  const [accent, setAccentState] = useState<AccentName>(stored.accent ?? "Forest")
  const [customAccent, setCustomAccent] = useState<string | null>(stored.customAccent ?? null)
  const [font, setFont] = useState<FontName>(stored.font ?? "Inter")
  const [radius, setRadius] = useState<number>(stored.radius ?? 4)
  const [fullRounded, setFullRounded] = useState<boolean>(stored.fullRounded ?? false)
  const [gridOverlay, setGridOverlay] = useState<boolean>(stored.gridOverlay ?? true)
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
    // --radius always follows the slider; the optional pill (status badges, tabs,
    // buttons) is applied selectively via the data-pill rule in index.css.
    s.setProperty("--radius", `${radius}px`)
    root.toggleAttribute("data-pill", fullRounded)

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

  // Persist all customizer state on every change.
  useEffect(() => {
    writeStored({ theme, base, accent, customAccent, font, radius, fullRounded, gridOverlay })
  }, [theme, base, accent, customAccent, font, radius, fullRounded, gridOverlay])

  const setTheme = (t: ThemeMode) => setThemeState(t)

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
