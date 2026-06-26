// Generates the "Grid Design System" AI build prompt from the *live* customizer
// state. The prose lives in grid-design-system.prompt.md (imported raw); only the
// settings-dependent regions — §2 token blocks, the font <head> link, the default
// radius, the §8 applyTheme defaults, and the accent/typeface labels — are rewritten
// here so a downloaded prompt always matches what the user configured.

import promptTemplate from "../../grid-design-system.prompt.md?raw"
import {
  accents,
  bases,
  deriveAccent,
  deriveCharts,
  deriveDestructive,
  fixedCharts,
  fonts,
  normalizeHex,
  type AccentName,
  type BaseName,
  type FontName,
  type ThemeMode,
} from "./theme"

export type PromptConfig = {
  theme: ThemeMode
  accent: AccentName
  /** User-picked hex overriding the preset accent, or null for a preset. */
  customAccent?: string | null
  base: BaseName
  font: FontName
  radius: number
  /** When true, --radius is emitted as a full pill (9999px) regardless of radius. */
  fullRounded?: boolean
}

export const promptFileName = "grid-design-system.prompt.md"

// CSS that reproduces the "full rounded" toggle: only status badges, tabs and
// buttons go fully pill, everything else keeps the --radius scale.
const PILL_OVERRIDE_CSS = [
  '[data-slot="button"], [data-slot="badge"],',
  '[data-slot="tabs-list"], [data-slot="tabs-trigger"] {',
  "  border-radius: 9999px;",
  "}",
].join("\n")

// Fixed semantic tokens not exposed in the customizer (success/warning only —
// chart2-5 are sourced from fixedCharts in theme.ts to avoid duplication).
const semanticFixed: Record<ThemeMode, { success: string; warning: string }> = {
  light: { success: "#2e6b48", warning: "#9a6a12" },
  dark: { success: "#5aa777", warning: "#d2a23a" },
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
  const a = cfg.customAccent ? deriveAccent(cfg.customAccent, mode) : accents[cfg.accent][mode]
  const b = bases[cfg.base][mode]
  const fx = semanticFixed[mode]
  // Custom accents harmonise all 5 chart series; presets keep the fixed palette.
  const charts = cfg.customAccent
    ? deriveCharts(cfg.customAccent, mode)
    : [a.chart1, ...fixedCharts[mode]]
  // Danger red harmonised to the active accent so the palette reads as one theme.
  const dz = deriveDestructive(cfg.customAccent ?? a.primary, mode)

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
    ["--destructive", dz.color],
    ["--destructive-foreground", dz.fg],
    ["--success", fx.success],
    ["--warning", fx.warning],
    ["--border", b.border],
    ["--input", b.border],
    ["--ring", a.ring],
    ["--chart-1", charts[0]],
    ["--chart-2", charts[1]],
    ["--chart-3", charts[2]],
    ["--chart-4", charts[3]],
    ["--chart-5", charts[4]],
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
  const accentLabel = cfg.customAccent
    ? `Custom ${normalizeHex(cfg.customAccent)}`
    : cfg.accent
  const accentDesc = cfg.customAccent
    ? `a custom ${normalizeHex(cfg.customAccent)}`
    : accentPhrase[cfg.accent]
  const sans = familyName(fonts[cfg.font].sans)
  const mono = familyName(fonts[cfg.font].mono)
  const fontLabel = sans === mono ? sans : `${sans} + ${mono}`
  const fontHref = `https://fonts.googleapis.com/css2?family=${fontFamilies[cfg.font].join(
    "&family="
  )}&display=swap`

  const configNote =
    "> **Active configuration** — generated from the live customizer: " +
    `**${modeLabel}** mode · **${accentLabel}** accent · **${cfg.base}** base · ` +
    `**${cfg.font}** typeface · **${cfg.radius}px** radius` +
    (cfg.fullRounded ? " · **full-rounded** status badges, tabs & buttons" : "") +
    ". These choices are baked into the §2 tokens, the font `<head>` link, and the §8 " +
    "defaults below — re-export from the customizer whenever you change them."

  // §5 addendum describing the active full-rounded toggle (selective pill).
  const fullRoundedNote = cfg.fullRounded
    ? "\n- **Full-rounded toggle (active):** status badges, tabs and buttons are fully " +
      "pill regardless of `--radius`; every other component keeps the scale above. " +
      "Reproduce with:\n\n```css\n" +
      PILL_OVERRIDE_CSS +
      "\n```"
    : ""

  return (
    promptTemplate
      // active-config banner directly under the H1
      .replace(/^# .*\n/, (h1) => `${h1}\n${configNote}\n`)
      // §1 — accent description
      .replace("forest green by", `${accentDesc} by`)
      // §2 — light + dark token blocks
      .replace(/:root \{\n[\s\S]*?\n\}/, `:root {\n${tokenBlock("light", cfg)}\n}`)
      .replace(/\.dark \{\n[\s\S]*?\n\}/, `.dark {\n${tokenBlock("dark", cfg)}\n}`)
      // §2 — font <head> link
      .replace(
        /<link href="https:\/\/fonts\.googleapis\.com[^"]*" rel="stylesheet" \/>/,
        `<link href="${fontHref}" rel="stylesheet" />`
      )
      // §5 — default radius + optional full-rounded addendum
      .replace("defaults to **4px**", `defaults to **${cfg.radius}px**`)
      .replace(
        "everything rounder/sharper at once.",
        `everything rounder/sharper at once.${fullRoundedNote}`
      )
      // §8 — applyTheme defaults match the current selection
      .replace(
        /function applyTheme\(\{[^}]*\}\)/,
        `function applyTheme({ mode='${cfg.theme}', accent='${cfg.accent}', base='${cfg.base}', font='${cfg.font}', radius=${cfg.radius} })`
      )
      // footer — typeface label
      .replace("Inter + JetBrains Mono", fontLabel)
  )
}
