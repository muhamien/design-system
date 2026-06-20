// Generates the "Grid Design System" AI build prompt from the *live* customizer
// state. The prose lives in grid-design-system.prompt.md (imported raw); only the
// settings-dependent regions — §2 token blocks, the font <head> link, the default
// radius, the §8 applyTheme defaults, and the accent/typeface labels — are rewritten
// here so a downloaded prompt always matches what the user configured.

import promptTemplate from "../../grid-design-system.prompt.md?raw"
import {
  accents,
  bases,
  fonts,
  type AccentName,
  type BaseName,
  type FontName,
  type ThemeMode,
} from "./theme"

export type PromptConfig = {
  theme: ThemeMode
  accent: AccentName
  base: BaseName
  font: FontName
  radius: number
}

export const promptFileName = "grid-design-system.prompt.md"

// Tokens the customizer does NOT expose — fixed per mode, mirroring index.css.
const fixedTokens: Record<
  ThemeMode,
  {
    destructive: string
    destructiveFg: string
    success: string
    warning: string
    chart2: string
    chart3: string
    chart4: string
    chart5: string
  }
> = {
  light: {
    destructive: "#b03a2b",
    destructiveFg: "#fdf6f5",
    success: "#2e6b48",
    warning: "#9a6a12",
    chart2: "#6a994e",
    chart3: "#9a6a12",
    chart4: "#3a6ea5",
    chart5: "#a23b6b",
  },
  dark: {
    destructive: "#d4543f",
    destructiveFg: "#160605",
    success: "#5aa777",
    warning: "#d2a23a",
    chart2: "#8cbf6a",
    chart3: "#d2a23a",
    chart4: "#5e93cf",
    chart5: "#c96a98",
  },
}

// Google Fonts families (sans + mono) per typeface — drives the <head> link.
const fontFamilies: Record<FontName, string[]> = {
  Inter: ["Inter:wght@400;500;600;700", "JetBrains+Mono:wght@400;500;600"],
  Grotesk: ["Space+Grotesk:wght@400;500;600;700", "JetBrains+Mono:wght@400;500;600"],
  Geometric: ["Sora:wght@400;500;600;700", "Space+Mono:wght@400;700"],
  Humanist: ["Archivo:wght@400;500;600;700", "IBM+Plex+Mono:wght@400;500;600"],
  Mono: ["IBM+Plex+Mono:wght@400;500;600;700"],
}

// Human phrase used in §1 ("…, <phrase> by default…").
const accentPhrase: Record<AccentName, string> = {
  Forest: "forest green",
  Clay: "terracotta",
  Indigo: "indigo",
  Amber: "amber",
  Plum: "plum",
}

const familyName = (css: string) => css.split(",")[0].replace(/['"]/g, "").trim()

// Build a :root / .dark token list from the selected accent + base (+ radius/font
// on :root only), in the exact order index.css declares them.
function tokenBlock(mode: ThemeMode, cfg: PromptConfig): string {
  const a = accents[cfg.accent][mode]
  const b = bases[cfg.base][mode]
  const fx = fixedTokens[mode]

  const rows: [string, string][] = [
    ["--background", b.bg],
    ["--foreground", b.fg],
    ["--card", b.card],
    ["--card-foreground", b.fg],
    ["--popover", b.card],
    ["--popover-foreground", b.fg],
    ["--primary", a.primary],
    ["--primary-foreground", a.primaryFg],
    ["--secondary", b.sec],
    ["--secondary-foreground", b.fg],
    ["--muted", b.muted],
    ["--muted-foreground", b.mutedFg],
    ["--accent", a.accent],
    ["--accent-foreground", a.accentFg],
    ["--destructive", fx.destructive],
    ["--destructive-foreground", fx.destructiveFg],
    ["--success", fx.success],
    ["--warning", fx.warning],
    ["--border", b.border],
    ["--input", b.border],
    ["--ring", a.ring],
    ["--chart-1", a.chart1],
    ["--chart-2", fx.chart2],
    ["--chart-3", fx.chart3],
    ["--chart-4", fx.chart4],
    ["--chart-5", fx.chart5],
  ]

  // Radius + fonts live only on :root (light) and are shared by both modes.
  if (mode === "light") {
    rows.push(
      ["--radius", `${cfg.radius}px`],
      ["--font-sans", fonts[cfg.font].sans],
      ["--font-mono", fonts[cfg.font].mono]
    )
  }

  return rows.map(([k, v]) => `  ${k}: ${v};`).join("\n")
}

export function buildPrompt(cfg: PromptConfig): string {
  const modeLabel = cfg.theme === "light" ? "Light" : "Dark"
  const sans = familyName(fonts[cfg.font].sans)
  const mono = familyName(fonts[cfg.font].mono)
  const fontLabel = sans === mono ? sans : `${sans} + ${mono}`
  const fontHref = `https://fonts.googleapis.com/css2?family=${fontFamilies[cfg.font].join(
    "&family="
  )}&display=swap`

  const configNote =
    "> **Active configuration** — generated from the live customizer: " +
    `**${modeLabel}** mode · **${cfg.accent}** accent · **${cfg.base}** base · ` +
    `**${cfg.font}** typeface · **${cfg.radius}px** radius. ` +
    "These choices are baked into the §2 tokens, the font `<head>` link, and the §8 " +
    "defaults below — re-export from the customizer whenever you change them."

  return (
    promptTemplate
      // active-config banner directly under the H1
      .replace(/^# .*\n/, (h1) => `${h1}\n${configNote}\n`)
      // §1 — accent description
      .replace("forest green by", `${accentPhrase[cfg.accent]} by`)
      // §2 — light + dark token blocks
      .replace(/:root \{\n[\s\S]*?\n\}/, `:root {\n${tokenBlock("light", cfg)}\n}`)
      .replace(/\.dark \{\n[\s\S]*?\n\}/, `.dark {\n${tokenBlock("dark", cfg)}\n}`)
      // §2 — font <head> link
      .replace(
        /<link href="https:\/\/fonts\.googleapis\.com[^"]*" rel="stylesheet" \/>/,
        `<link href="${fontHref}" rel="stylesheet" />`
      )
      // §5 — default radius
      .replace("defaults to **4px**", `defaults to **${cfg.radius}px**`)
      // §8 — applyTheme defaults match the current selection
      .replace(
        /function applyTheme\(\{[^}]*\}\)/,
        `function applyTheme({ mode='${cfg.theme}', accent='${cfg.accent}', base='${cfg.base}', font='${cfg.font}', radius=${cfg.radius} })`
      )
      // footer — typeface label
      .replace("Inter + JetBrains Mono", fontLabel)
  )
}
