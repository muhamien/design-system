import { useTheme } from "@/components/theme-provider"
import { fonts } from "@/lib/theme"

const familyName = (css: string) => css.split(",")[0].replace(/['"]/g, "").trim()

export function Masthead() {
  const { theme, font, toggleTheme } = useTheme()
  const themeLabel = theme === "light" ? "LIGHT" : "DARK"
  const themeToggleLabel = theme === "light" ? "◐ DARK" : "◑ LIGHT"

  // Live typeface chip — tracks the customizer instead of a hardcoded label.
  const sansName = familyName(fonts[font].sans)
  const monoName = familyName(fonts[font].mono)
  const fontChip = (sansName === monoName ? sansName : `${sansName} · ${monoName}`).toUpperCase()
  const chipClass =
    "rounded-[var(--radius)] border border-border px-[11px] py-[7px] font-mono text-[11px] tracking-[.06em] text-muted-foreground"

  return (
    <header className="border-l border-r border-border bg-[color-mix(in_srgb,var(--background)_78%,transparent)] backdrop-blur-[2px]">
      {/* top status bar */}
      <div className="flex min-h-[52px] items-stretch justify-between border-b border-border px-[20px]">
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[.14em] text-muted-foreground">
          <span className="inline-block h-[7px] w-[7px] bg-primary" />
          GRID / DESIGN SYSTEM
        </div>
        <div className="flex items-center gap-[14px] font-mono text-[11px] tracking-[.1em] text-muted-foreground">
          <span>v1.0.0</span>
          <span className="opacity-40">·</span>
          <span>{themeLabel}</span>
          <button
            onClick={toggleTheme}
            className="flex h-[30px] cursor-pointer items-center gap-[7px] rounded-[var(--radius)] border border-border bg-secondary px-[12px] font-mono text-[11px] tracking-[.08em] text-secondary-foreground transition-colors hover:bg-accent"
          >
            {themeToggleLabel}
          </button>
        </div>
      </div>

      {/* hero */}
      <div className="border-b border-border px-[20px] pb-[40px] pt-[44px]">
        <div className="mb-[18px] font-mono text-[11px] tracking-[.16em] text-primary">
          A FOUNDATION FOR PRECISE INTERFACES
        </div>
        <h1 className="m-0 max-w-[14ch] text-[clamp(38px,6vw,62px)] font-semibold leading-[.98] tracking-[-.03em]">
          The Grid design system.
        </h1>
        <p className="mt-[22px] max-w-[52ch] text-[15px] leading-[1.55] text-muted-foreground">
          A shadcn-compatible token set rebuilt with intent — monospaced
          annotations, hairline structure, and a forest-green signal color. Every
          value below is a real design token, mapped 1:1 to CSS custom properties.
        </p>
        <div className="mt-[28px] flex flex-wrap gap-[10px]">
          <div className={chipClass}>22 SEMANTIC TOKENS</div>
          {/* mode chip — active side emphasised, follows the live theme */}
          <div className={chipClass}>
            <span className={theme === "light" ? "text-foreground" : undefined}>LIGHT</span>
            <span className="opacity-40"> · </span>
            <span className={theme === "dark" ? "text-foreground" : undefined}>DARK</span>
          </div>
          {/* typeface chip — live with the selected font */}
          <div className={chipClass}>{fontChip}</div>
        </div>
      </div>
    </header>
  )
}
