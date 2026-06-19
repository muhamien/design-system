// Token maps ported verbatim from the "Grid System" prototype.
// These drive the live customizer (accent / base palette / typeface).

export type ThemeMode = "light" | "dark"
export type AccentName = "Forest" | "Clay" | "Indigo" | "Amber" | "Plum"
export type BaseName = "Stone" | "Zinc" | "Slate" | "Sage"
export type FontName = "Inter" | "Grotesk" | "Geometric" | "Humanist" | "Mono"

export type AccentTokens = {
  primary: string
  primaryFg: string
  ring: string
  accent: string
  accentFg: string
  chart1: string
}

export type BaseTokens = {
  bg: string
  fg: string
  card: string
  muted: string
  mutedFg: string
  sec: string
  border: string
}

export type FontTokens = { sans: string; mono: string }

export const accents: Record<AccentName, Record<ThemeMode, AccentTokens>> = {
  Forest: {
    light: { primary: "#2e6b48", primaryFg: "#fbfdfb", ring: "#2e6b48", accent: "#e9f0ea", accentFg: "#234e36", chart1: "#2e6b48" },
    dark: { primary: "#5aa777", primaryFg: "#07140c", ring: "#5aa777", accent: "#1c2a20", accentFg: "#b6d7c1", chart1: "#5aa777" },
  },
  Clay: {
    light: { primary: "#b1543a", primaryFg: "#fdf6f3", ring: "#b1543a", accent: "#f7ebe6", accentFg: "#7c3a27", chart1: "#b1543a" },
    dark: { primary: "#d77a5e", primaryFg: "#1a0a06", ring: "#d77a5e", accent: "#2a1c16", accentFg: "#e3b6a4", chart1: "#d77a5e" },
  },
  Indigo: {
    light: { primary: "#3a55b0", primaryFg: "#f5f6fd", ring: "#3a55b0", accent: "#eaeefa", accentFg: "#283c82", chart1: "#3a55b0" },
    dark: { primary: "#6f88d8", primaryFg: "#070b1a", ring: "#6f88d8", accent: "#181d2e", accentFg: "#b3c2ec", chart1: "#6f88d8" },
  },
  Amber: {
    light: { primary: "#9a6a12", primaryFg: "#fdf9f0", ring: "#9a6a12", accent: "#f6efdf", accentFg: "#6e4c0d", chart1: "#9a6a12" },
    dark: { primary: "#d2a23a", primaryFg: "#1a1303", ring: "#d2a23a", accent: "#2a2414", accentFg: "#ecd49a", chart1: "#d2a23a" },
  },
  Plum: {
    light: { primary: "#8a3b6b", primaryFg: "#fdf5fa", ring: "#8a3b6b", accent: "#f5e9f1", accentFg: "#5f2849", chart1: "#8a3b6b" },
    dark: { primary: "#c06a98", primaryFg: "#1a0712", ring: "#c06a98", accent: "#2a1822", accentFg: "#e6b6d2", chart1: "#c06a98" },
  },
}

export const fonts: Record<FontName, FontTokens> = {
  Inter: { sans: "'Inter',sans-serif", mono: "'JetBrains Mono',monospace" },
  Grotesk: { sans: "'Space Grotesk',sans-serif", mono: "'JetBrains Mono',monospace" },
  Geometric: { sans: "'Sora',sans-serif", mono: "'Space Mono',monospace" },
  Humanist: { sans: "'Archivo',sans-serif", mono: "'IBM Plex Mono',monospace" },
  Mono: { sans: "'IBM Plex Mono',monospace", mono: "'IBM Plex Mono',monospace" },
}

export const bases: Record<BaseName, Record<ThemeMode, BaseTokens>> = {
  Stone: {
    light: { bg: "#fcfcfb", fg: "#1a1a17", card: "#ffffff", muted: "#f2f2ef", mutedFg: "#6b6b64", sec: "#f2f2ef", border: "#e5e5e0" },
    dark: { bg: "#0c0d0b", fg: "#e7e7e1", card: "#141612", muted: "#1d1f1b", mutedFg: "#8c8c83", sec: "#1d1f1b", border: "#272a24" },
  },
  Zinc: {
    light: { bg: "#fcfcfc", fg: "#18181b", card: "#ffffff", muted: "#f4f4f5", mutedFg: "#71717a", sec: "#f4f4f5", border: "#e4e4e7" },
    dark: { bg: "#0a0a0b", fg: "#e8e8ea", card: "#141416", muted: "#1c1c20", mutedFg: "#8a8a93", sec: "#1c1c20", border: "#27272c" },
  },
  Slate: {
    light: { bg: "#fbfcfd", fg: "#172033", card: "#ffffff", muted: "#f0f3f7", mutedFg: "#64748b", sec: "#f0f3f7", border: "#e2e8f0" },
    dark: { bg: "#0a0d12", fg: "#e2e8f0", card: "#11151c", muted: "#1a2029", mutedFg: "#8a96a8", sec: "#1a2029", border: "#232b36" },
  },
  Sage: {
    light: { bg: "#fbfcfb", fg: "#16201a", card: "#ffffff", muted: "#eef2ef", mutedFg: "#677a6f", sec: "#eef2ef", border: "#dfe6e1" },
    dark: { bg: "#0a0e0b", fg: "#e3e9e4", card: "#121712", muted: "#19201b", mutedFg: "#859287", sec: "#19201b", border: "#242c26" },
  },
}

export const accentNames = Object.keys(accents) as AccentName[]
export const baseNames = Object.keys(bases) as BaseName[]
export const fontNames = Object.keys(fonts) as FontName[]
