import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import {
  accents,
  bases,
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
  font: FontName
  radius: number
  gridOverlay: boolean
  panelOpen: boolean
}

type ThemeContextValue = ThemeState & {
  setTheme: (t: ThemeMode) => void
  toggleTheme: () => void
  setBase: (b: BaseName) => void
  setAccent: (a: AccentName) => void
  setFont: (f: FontName) => void
  setRadius: (r: number) => void
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
  const [accent, setAccent] = useState<AccentName>("Forest")
  const [font, setFont] = useState<FontName>("Inter")
  const [radius, setRadius] = useState<number>(4)
  const [gridOverlay, setGridOverlay] = useState<boolean>(true)
  const [panelOpen, setPanelOpen] = useState<boolean>(true)

  // Apply tokens to <html> — a 1:1 port of the prototype's applyTokens().
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute("data-theme", theme)
    root.classList.toggle("dark", theme === "dark")

    const s = root.style
    const a = (accents[accent] ?? accents.Forest)[theme]
    s.setProperty("--primary", a.primary)
    s.setProperty("--primary-foreground", a.primaryFg)
    s.setProperty("--ring", a.ring)
    s.setProperty("--accent", a.accent)
    s.setProperty("--accent-foreground", a.accentFg)
    s.setProperty("--chart-1", a.chart1)
    s.setProperty("--radius", `${radius}px`)

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
  }, [theme, base, accent, font, radius])

  const setTheme = (t: ThemeMode) => {
    setThemeState(t)
    try {
      localStorage.setItem("grid-theme", t)
    } catch {
      /* ignore */
    }
  }

  const value: ThemeContextValue = {
    theme,
    base,
    accent,
    font,
    radius,
    gridOverlay,
    panelOpen,
    setTheme,
    toggleTheme: () => setTheme(theme === "light" ? "dark" : "light"),
    setBase,
    setAccent,
    setFont,
    setRadius,
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
