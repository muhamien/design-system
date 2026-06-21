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

// ---------------------------------------------------------------------------
// Color theory — derive a harmonious, accessible palette from one seed color.
//
// Grounded in the Material color system: work in HSL so every tone keeps the
// chosen hue (instead of muddying toward grey the way sRGB mixing does), build
// light/dark variants by moving *lightness* along a tonal scale, choose "on"
// (foreground) colors that meet WCAG AA contrast, and build the data palette
// from color-wheel *harmonies* (complement + analogous) so each chart color
// relates back to the accent. Picking any color yields a matching system.
// ---------------------------------------------------------------------------

/** Accept "#rgb", "rgb", "#rrggbb", "rrggbb" → "#rrggbb" (lowercase). */
export function normalizeHex(input: string): string {
  let h = input.trim().replace(/^#/, "")
  if (/^[0-9a-f]{3}$/i.test(h)) h = h.split("").map((c) => c + c).join("")
  if (!/^[0-9a-f]{6}$/i.test(h)) return "#000000"
  return `#${h.toLowerCase()}`
}

/** True when `input` is a valid 3- or 6-digit hex (with or without #). */
export function isHex(input: string): boolean {
  const h = input.trim().replace(/^#/, "")
  return /^[0-9a-f]{3}$/i.test(h) || /^[0-9a-f]{6}$/i.test(h)
}

type Rgb = [number, number, number]
const clamp01 = (n: number) => Math.max(0, Math.min(1, n))

function toRgb(hex: string): Rgb {
  const h = normalizeHex(hex).slice(1)
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ]
}

function toHex(rgb: Rgb): string {
  return (
    "#" +
    rgb
      .map((n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0"))
      .join("")
  )
}

/** sRGB hex → HSL (h: 0–360, s/l: 0–1). */
function hexToHsl(hex: string): [number, number, number] {
  const [r, g, b] = toRgb(hex).map((n) => n / 255)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min
  let h = 0
  if (d) {
    if (max === r) h = ((g - b) / d) % 6
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    h = (h * 60 + 360) % 360
  }
  const l = (max + min) / 2
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1))
  return [h, s, l]
}

/** HSL (h: any degrees, s/l: 0–1) → sRGB hex. */
function hslToHex(h: number, s: number, l: number): string {
  h = ((h % 360) + 360) % 360
  s = clamp01(s)
  l = clamp01(l)
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2
  const [r, g, b] =
    h < 60 ? [c, x, 0]
    : h < 120 ? [x, c, 0]
    : h < 180 ? [0, c, x]
    : h < 240 ? [0, x, c]
    : h < 300 ? [x, 0, c]
    : [c, 0, x]
  return toHex([(r + m) * 255, (g + m) * 255, (b + m) * 255] as Rgb)
}

/** Relative luminance (WCAG). */
function luminance(hex: string): number {
  const [r, g, b] = toRgb(hex).map((n) => {
    const c = n / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** WCAG contrast ratio between two colors (1–21). */
function contrast(a: string, b: string): number {
  const la = luminance(a) + 0.05
  const lb = luminance(b) + 0.05
  return la > lb ? la / lb : lb / la
}

/** Same hue as `hex`, retoned to lightness `l` with saturation scaled by `sx`. */
function retone(hex: string, l: number, sx = 1): string {
  const [h, s] = hexToHsl(hex)
  return hslToHex(h, s * sx, l)
}

/** A hue-matched near-white / near-black foreground that reads on `bg`
 *  (Material's "on" color — the higher-contrast of the two tonal extremes). */
function onColor(bg: string): string {
  const [h, s] = hexToHsl(bg)
  const light = hslToHex(h, Math.min(s, 0.16), 0.97)
  const dark = hslToHex(h, Math.min(s, 0.3), 0.12)
  return contrast(dark, bg) >= contrast(light, bg) ? dark : light
}

/** A tone of `hex`'s hue, retoned from `startL` until it clears `min` contrast
 *  on `bg` — keeps colored text legible (e.g. deep-green text on a green tint). */
function legibleTone(hex: string, bg: string, startL: number, min = 4.5): string {
  const [h, s] = hexToHsl(hex)
  const step = startL < hexToHsl(bg)[2] ? -0.025 : 0.025
  let l = startL
  for (let i = 0; i < 36; i++) {
    const c = hslToHex(h, s, l)
    if (contrast(c, bg) >= min || l <= 0.04 || l >= 0.96) return c
    l += step
  }
  return hslToHex(h, s, clamp01(l))
}

/** Build a full, harmonious accent token set from one seed color per mode. */
export function deriveAccent(hex: string, mode: ThemeMode): AccentTokens {
  const seed = normalizeHex(hex)
  const [, , L] = hexToHsl(seed)

  if (mode === "dark") {
    // Lift the brand color to a mid tone so it carries on a dark surface.
    const primary = retone(seed, Math.max(0.58, L), 0.9)
    const tint = retone(seed, 0.16, 0.55) // muted dark block of the hue
    return {
      primary,
      primaryFg: onColor(primary),
      ring: primary,
      accent: tint,
      accentFg: legibleTone(seed, tint, 0.76), // light hue text on the tint
      chart1: primary,
    }
  }

  // Light: keep the chosen color as primary; tint + text are tonal & contrast-fit.
  const tint = retone(seed, 0.94, 0.6) // airy block of the hue
  return {
    primary: seed,
    primaryFg: onColor(seed),
    ring: seed,
    accent: tint,
    accentFg: legibleTone(seed, tint, 0.3), // deep hue text on the tint
    chart1: seed,
  }
}

// Categorical data palette from color-wheel harmonies anchored on the accent:
// the seed (0°), its complement (180°) and analogous / split-complement
// neighbours — distinct enough to read as series, related enough to match.
const chartHarmony = [0, 180, 30, 150, -30]

export function deriveCharts(hex: string, mode: ThemeMode): string[] {
  const [h, s] = hexToHsl(hex)
  const sat = Math.min(Math.max(s, mode === "dark" ? 0.42 : 0.5), 0.72)
  const lig = mode === "dark" ? 0.62 : 0.46
  // Alternate a small lightness offset so adjacent series stay separable.
  const bump = mode === "dark" ? 0.08 : -0.08
  return chartHarmony.map((d, i) => hslToHex(h + d, sat, lig + (i % 2 ? bump : 0)))
}

/** chart-2..5 defaults (mirror index.css) so clearing a custom accent restores
 *  the preset data palette. chart-1 always follows the active accent. */
export const fixedCharts: Record<ThemeMode, [string, string, string, string]> = {
  light: ["#6a994e", "#9a6a12", "#3a6ea5", "#a23b6b"],
  dark: ["#8cbf6a", "#d2a23a", "#5e93cf", "#c96a98"],
}
