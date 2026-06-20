# Grid Design System — AI Build Prompt

> Paste this entire document **above your task** when asking an AI to build or modify
> UI. It is the single source of truth for how the product looks. After it, add your
> feature/screen request. Treat every rule below as a hard constraint — when a request
> doesn't specify a visual detail, fall back to these defaults so everything looks like
> it belongs to the same product.

---

## 0. Operating rules

- **Default stack:** React + TypeScript + Tailwind CSS v4 + shadcn/ui (Radix primitives).
  If the target uses another stack (Vue, Svelte, plain HTML, native), reproduce the
  **same visual output** using the same tokens — don't copy framework structure blindly.
- **Use shadcn/ui components as-is.** Install them with the CLI (`npx shadcn@latest add button card …`,
  **new-york** style) and keep their **standard sizes and structure** (`data-slot`, lucide-react icons,
  `focus-visible` rings, `aria-invalid` handling). The Grid identity comes from the **tokens** (§2) +
  **layout conventions** (§7) — *not* from re-sizing components. Also install `tw-animate-css`
  (overlay animations) and `sonner` (toasts).
- **Tokens are law.** Never hardcode a hex/rgb color, font family, radius, or ad-hoc
  spacing that bypasses the tokens in §2. If a value isn't covered, derive it from a
  token (e.g. `color-mix(in srgb, var(--primary) 28%, transparent)`).
- **Ship production quality:** semantic HTML, accessible (labels, roles, keyboard,
  visible focus), responsive, light **and** dark mode, no console errors.
- **Match the aesthetic exactly.** Read §1 before writing markup.

---

## 1. Design philosophy

Grid is a precise, technical, shadcn-compatible system. Five pillars:

1. **Hairline structure.** 1px `--border` lines frame and separate everything. Content
   lives in a centered max-width column with continuous left/right rails.
2. **Monospaced annotations.** Section numbers, eyebrows, metadata captions, and structural
   labels — the page *chrome* — use the **mono** font, **UPPERCASE**, with wide letter-spacing.
   Body, headings, and the shadcn components themselves use the **sans** font.
3. **One signal color.** A single restrained accent (`--primary`, forest green by
   default) for CTAs, focus rings, active/selected states. Everything else is neutral.
4. **Flat & quiet.** No gradients. Shadows only on floating overlays. Low-chroma
   neutrals, generous negative space, calm density.
5. **Token-driven & themeable.** Light/dark plus swappable accent / base palette /
   typeface / radius, all driven by CSS variables that can change at runtime.

---

## 2. Design tokens (CSS) — copy verbatim into your global stylesheet

```css
:root {
  --background: #fcfcfb;
  --foreground: #1a1a17;
  --card: #ffffff;
  --card-foreground: #1a1a17;
  --popover: #ffffff;
  --popover-foreground: #1a1a17;
  --primary: #2e6b48;
  --primary-foreground: #fbfdfb;
  --secondary: #f2f2ef;
  --secondary-foreground: #1a1a17;
  --muted: #f2f2ef;
  --muted-foreground: #6b6b64;
  --accent: #e9f0ea;
  --accent-foreground: #234e36;
  --destructive: #b03a2b;
  --destructive-foreground: #fdf6f5;
  --success: #2e6b48;
  --warning: #9a6a12;
  --border: #e5e5e0;
  --input: #e5e5e0;
  --ring: #2e6b48;
  --chart-1: #2e6b48;
  --chart-2: #6a994e;
  --chart-3: #9a6a12;
  --chart-4: #3a6ea5;
  --chart-5: #a23b6b;
  --radius: 4px;
  --font-sans: "Inter", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}

.dark {
  --background: #0c0d0b;
  --foreground: #e7e7e1;
  --card: #141612;
  --card-foreground: #e7e7e1;
  --popover: #141612;
  --popover-foreground: #e7e7e1;
  --primary: #5aa777;
  --primary-foreground: #07140c;
  --secondary: #1d1f1b;
  --secondary-foreground: #e7e7e1;
  --muted: #1d1f1b;
  --muted-foreground: #8c8c83;
  --accent: #1c2a20;
  --accent-foreground: #b6d7c1;
  --destructive: #d4543f;
  --destructive-foreground: #160605;
  --success: #5aa777;
  --warning: #d2a23a;
  --border: #272a24;
  --input: #272a24;
  --ring: #5aa777;
  --chart-1: #5aa777;
  --chart-2: #8cbf6a;
  --chart-3: #d2a23a;
  --chart-4: #5e93cf;
  --chart-5: #c96a98;
}
```

### Tailwind v4 mapping (so utilities like `bg-primary`, `border-border` track the tokens)

```css
@import "tailwindcss";
@import "tw-animate-css";
@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-success: var(--success);
  --color-warning: var(--warning);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
}

@layer base {
  * { border-color: var(--border); }
  body {
    background: var(--background);
    color: var(--foreground);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
  }
  ::selection { background: var(--primary); color: var(--primary-foreground); }
}
```

> For non-Tailwind / Tailwind v3 stacks: use the `:root`/`.dark` block above and read
> tokens via `var(--token)` directly, or wire them into your `tailwind.config` `theme.extend.colors`.

### Fonts — load in `<head>`

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
```

---

## 3. Typography scale

| Step      | Font | Size / Line | Weight | Tracking | Use                                            |
| --------- | ---- | ----------- | ------ | -------- | ---------------------------------------------- |
| Display   | sans | 44 / 1.0    | 600    | -0.03em  | Hero headline                                  |
| Heading 1 | sans | 30          | 600    | -0.02em  | Page title                                     |
| Heading 2 | sans | 22          | 600    | -0.01em  | Section title                                  |
| Heading 3 | sans | 17          | 500    | normal   | Card / subsection title                        |
| Body      | sans | 14 / 1.5    | 400    | normal   | Paragraphs (use `--muted-foreground` for secondary) |
| Small     | sans | 13          | 400    | normal   | Captions, helper text (`--muted-foreground`)   |
| Mono      | mono | 11–12       | 500    | 0.06em   | **UPPERCASE** chrome: section numbers, eyebrows, metadata captions (often `--primary`) |

Hero headline may use `font-size: clamp(38px, 6vw, 62px)`.

---

## 4. Spacing scale (use these steps; don't invent in-between values)

`space-1 = 2px` · `space-2 = 4px` · `space-3 = 8px` · `space-4 = 12px` ·
`space-5 = 16px` · `space-6 = 24px` · `space-7 = 32px` · `space-8 = 48px`

Common paddings: section content `20–28px`, card padding `24px` (shadcn `py-6`/`px-6`),
control padding `12px` horizontal.

---

## 5. Radius scale

Base token `--radius` defaults to **4px** (customizable at runtime). The Tailwind radius
utilities derive from it, matching shadcn:

- `rounded-sm` = `calc(var(--radius) - 4px)` · `rounded-md` = `calc(var(--radius) - 2px)` ·
  `rounded-lg` = `var(--radius)` · `rounded-xl` = `calc(var(--radius) + 4px)` · `rounded-full` = pill.
- Keep the radius each shadcn component already ships with: `rounded-md` (buttons, inputs, menu items),
  `rounded-lg` (tab list, dialog, table wrapper), `rounded-xl` (cards), `rounded-full`
  (switch track, switch/radio dots, avatars, status pills).
- Don't hand-pick radii — let the scale + the component defaults do the work. Bump the base
  `--radius` (or the customizer slider) if you want everything rounder/sharper at once.

---

## 6. Component specs

Install with the shadcn CLI (`npx shadcn@latest add …`, new-york style) and use them
**unmodified** — the Grid look comes from the tokens (§2) and layout (§7), not from
re-sizing. Below is the standard shadcn sizing/structure so you know what each ships with
and how to compose it. All components carry `data-slot`, lucide icons, `transition`, and
`focus-visible:ring-ring/50 ring-[3px]` focus.

### Button — `add button`
- Sizes: `default` h-9 / px-4 · `sm` h-8 / px-3 · `lg` h-10 / px-6 · `icon` size-9.
  `text-sm font-medium`, `rounded-md`, `gap-2`; lucide icons auto-sized to `size-4`.
- Variants: `default` (`bg-primary`), `secondary`, `outline` (border + `bg-background`),
  `ghost`, `destructive`, `link`. Hover uses token opacity (`hover:bg-primary/90`,
  `hover:bg-accent`). Disabled: `opacity-50`.

### Input / Textarea — `add input textarea`
- `h-9` (textarea `min-h-16`, auto-grows via `field-sizing-content`); `rounded-md`,
  `border-input`, `bg-transparent` (dark `bg-input/30`), `text-sm`, `shadow-xs`.
- Focus: `focus-visible:border-ring focus-visible:ring-ring/50 ring-[3px]`. Invalid: `aria-invalid:ring-destructive/20`.

### Select — `add select`
- Trigger matches Input (`h-9`, `rounded-md`, `border-input`) with a lucide `ChevronDownIcon`.
- Content is a popover (`bg-popover`, `rounded-md`, `shadow-md`) with `CheckIcon` indicators; animated.

### Checkbox — `add checkbox`
- `size-4 rounded-[4px] border-input`; checked `bg-primary border-primary` with a lucide `CheckIcon`.

### Switch — `add switch`
- Track `h-[1.15rem] w-8 rounded-full`; off `bg-input`, on `bg-primary`.
- Thumb `size-4 bg-background`, slides `translate-x-[calc(100%-2px)]`.

### Radio — `add radio-group`
- `size-4 rounded-full border-input`; selected shows a `size-2 fill-primary` dot (lucide `CircleIcon`).

### Badge — `add badge`
- `rounded-md border px-2 py-0.5 text-xs font-medium`. Variants: `default` (primary),
  `secondary`, `destructive`, `outline`.
- Status/"healthy" pill: use `secondary` (or className `bg-accent text-accent-foreground border-transparent`)
  paired with a small `bg-primary` dot. Bad/down states: `destructive`.

### Card — `add card`
- `rounded-xl border bg-card py-6 shadow-sm`, vertical `gap-6`.
- Compose `CardHeader` / `CardTitle` / `CardDescription` / `CardAction` (top-right slot) /
  `CardContent` / `CardFooter`. Add `border-b` on the header / `border-t` on the footer for
  hairline-separated sections (shadcn auto-pads them). Big stat numbers: `text-2xl font-semibold tabular-nums`.

### Tabs — `add tabs`
- List `h-9 bg-muted rounded-lg p-[3px]`; triggers `flex-1 rounded-md text-sm font-medium`,
  active `bg-background shadow-sm` (segmented control).

### Table — `add table`
- Header cells `h-10 px-2 font-medium text-foreground`; rows `border-b hover:bg-muted/50`; cells `p-2`.
- Right-align + `font-mono text-xs` for numeric columns; render status in a `Badge`.
  Wrap in `rounded-lg border overflow-hidden`.

### Dialog — `add dialog`
- Overlay `bg-black/50` (animated). Content centered, `max-w-lg rounded-lg border p-6 gap-4 shadow-lg`,
  with a built-in top-right close (`XIcon`).
- Compose `DialogHeader` / `DialogTitle` (`text-lg font-semibold`) / `DialogDescription` /
  `DialogFooter` (right-aligned: outline cancel + default confirm). Add a mono `--primary`
  eyebrow inside the header for the Grid feel.

### Dropdown menu — `add dropdown-menu`
- `bg-popover rounded-md border p-1 shadow-md`, `min-w-[8rem]`.
- `DropdownMenuLabel`, `DropdownMenuSeparator`, items `rounded-sm px-2 py-1.5 text-sm` with
  `focus:bg-accent`; `DropdownMenuShortcut` right-aligns a muted key.

### Tooltip — `add tooltip`
- `bg-primary text-primary-foreground rounded-md px-3 py-1.5 text-xs` with an arrow; animated.
  (Wraps its own provider.)

### Toast — `add sonner`
- Use **sonner**: render `<Toaster />` once (theme it from `--popover` / `--popover-foreground` /
  `--border`) and fire with `toast("Title", { description })`.

### Alert (inline) — `add alert`
- `Alert` / `AlertTitle` / `AlertDescription`: `rounded-lg border bg-card p-4 text-sm`, optional
  leading lucide icon. Variants: `default`, `destructive`.

### Avatars — `add avatar`
- `size-8 rounded-full`; `AvatarFallback` defaults to `bg-muted`.
- For a stack: overlap with `-ml-2.5` + `ring-2 ring-background`; color individual fallbacks with chart tokens.

### Motion
Animations ship via **tw-animate-css** — the standard shadcn utilities (`animate-in` /
`animate-out`, `fade-in-0`, `zoom-in-95`, `slide-in-from-*`). Overlays include them by
default; respect `prefers-reduced-motion`.

---

## 7. Layout & page conventions

This is where the Grid identity lives — apply it *around* the standard shadcn components.

- Centered column: `max-width 1200px; margin 0 auto; horizontal padding 28px`.
- Frame every major section with **continuous 1px left/right rails** (`border-left`/`border-right` in `--border`); separate stacked blocks with 1px bottom borders.
- **Section header pattern:** mono number in `--primary` · `14px/600` title · a flexible `1px` rule line · optional mono right-label. Example:
  `01 ──  Color tokens ─────────────────── SEMANTIC · LIVE`
- Optional decorative **72px background grid**: `linear-gradient(var(--border) 1px, transparent 1px)` both axes, `background-size: 72px 72px`, `opacity ~.4`, behind content, `pointer-events:none`.
- Two-column layouts split with a 1px vertical `--border` divider.
- Page base: `bg --background; color --foreground; font-sans; antialiased`.

---

## 8. Theming (light/dark + runtime variants)

Light is default; dark via a `.dark` class (or `data-theme="dark"`) on `<html>`. To support
runtime customization (accent / base palette / typeface / radius), rewrite the CSS
variables on `document.documentElement` and persist the choice (e.g. `localStorage`).

```js
const accents = {
  Forest: { light:{primary:'#2e6b48',primaryFg:'#fbfdfb',ring:'#2e6b48',accent:'#e9f0ea',accentFg:'#234e36',chart1:'#2e6b48'}, dark:{primary:'#5aa777',primaryFg:'#07140c',ring:'#5aa777',accent:'#1c2a20',accentFg:'#b6d7c1',chart1:'#5aa777'} },
  Clay:   { light:{primary:'#b1543a',primaryFg:'#fdf6f3',ring:'#b1543a',accent:'#f7ebe6',accentFg:'#7c3a27',chart1:'#b1543a'}, dark:{primary:'#d77a5e',primaryFg:'#1a0a06',ring:'#d77a5e',accent:'#2a1c16',accentFg:'#e3b6a4',chart1:'#d77a5e'} },
  Indigo: { light:{primary:'#3a55b0',primaryFg:'#f5f6fd',ring:'#3a55b0',accent:'#eaeefa',accentFg:'#283c82',chart1:'#3a55b0'}, dark:{primary:'#6f88d8',primaryFg:'#070b1a',ring:'#6f88d8',accent:'#181d2e',accentFg:'#b3c2ec',chart1:'#6f88d8'} },
  Amber:  { light:{primary:'#9a6a12',primaryFg:'#fdf9f0',ring:'#9a6a12',accent:'#f6efdf',accentFg:'#6e4c0d',chart1:'#9a6a12'}, dark:{primary:'#d2a23a',primaryFg:'#1a1303',ring:'#d2a23a',accent:'#2a2414',accentFg:'#ecd49a',chart1:'#d2a23a'} },
  Plum:   { light:{primary:'#8a3b6b',primaryFg:'#fdf5fa',ring:'#8a3b6b',accent:'#f5e9f1',accentFg:'#5f2849',chart1:'#8a3b6b'}, dark:{primary:'#c06a98',primaryFg:'#1a0712',ring:'#c06a98',accent:'#2a1822',accentFg:'#e6b6d2',chart1:'#c06a98'} },
};
const bases = {
  Stone: { light:{bg:'#fcfcfb',fg:'#1a1a17',card:'#ffffff',muted:'#f2f2ef',mutedFg:'#6b6b64',sec:'#f2f2ef',border:'#e5e5e0'}, dark:{bg:'#0c0d0b',fg:'#e7e7e1',card:'#141612',muted:'#1d1f1b',mutedFg:'#8c8c83',sec:'#1d1f1b',border:'#272a24'} },
  Zinc:  { light:{bg:'#fcfcfc',fg:'#18181b',card:'#ffffff',muted:'#f4f4f5',mutedFg:'#71717a',sec:'#f4f4f5',border:'#e4e4e7'}, dark:{bg:'#0a0a0b',fg:'#e8e8ea',card:'#141416',muted:'#1c1c20',mutedFg:'#8a8a93',sec:'#1c1c20',border:'#27272c'} },
  Slate: { light:{bg:'#fbfcfd',fg:'#172033',card:'#ffffff',muted:'#f0f3f7',mutedFg:'#64748b',sec:'#f0f3f7',border:'#e2e8f0'}, dark:{bg:'#0a0d12',fg:'#e2e8f0',card:'#11151c',muted:'#1a2029',mutedFg:'#8a96a8',sec:'#1a2029',border:'#232b36'} },
  Sage:  { light:{bg:'#fbfcfb',fg:'#16201a',card:'#ffffff',muted:'#eef2ef',mutedFg:'#677a6f',sec:'#eef2ef',border:'#dfe6e1'}, dark:{bg:'#0a0e0b',fg:'#e3e9e4',card:'#121712',muted:'#19201b',mutedFg:'#859287',sec:'#19201b',border:'#242c26'} },
};
const fonts = {
  Inter:     { sans:"'Inter',sans-serif",         mono:"'JetBrains Mono',monospace" },
  Grotesk:   { sans:"'Space Grotesk',sans-serif", mono:"'JetBrains Mono',monospace" },
  Geometric: { sans:"'Sora',sans-serif",          mono:"'Space Mono',monospace" },
  Humanist:  { sans:"'Archivo',sans-serif",       mono:"'IBM Plex Mono',monospace" },
  Mono:      { sans:"'IBM Plex Mono',monospace",  mono:"'IBM Plex Mono',monospace" },
};

function applyTheme({ mode='light', accent='Forest', base='Stone', font='Inter', radius=4 }) {
  const r = document.documentElement;
  r.classList.toggle('dark', mode === 'dark');
  const a = accents[accent][mode], b = bases[base][mode], f = fonts[font];
  const set = (k, v) => r.style.setProperty(k, v);
  set('--primary', a.primary); set('--primary-foreground', a.primaryFg); set('--ring', a.ring);
  set('--accent', a.accent); set('--accent-foreground', a.accentFg); set('--chart-1', a.chart1);
  set('--background', b.bg); set('--foreground', b.fg); set('--card', b.card);
  set('--popover', b.card); set('--secondary', b.sec); set('--muted', b.muted);
  set('--muted-foreground', b.mutedFg); set('--border', b.border); set('--input', b.border);
  set('--card-foreground', b.fg); set('--popover-foreground', b.fg); set('--secondary-foreground', b.fg);
  set('--font-sans', f.sans); set('--font-mono', f.mono); set('--radius', radius + 'px');
}
```

If you don't need runtime theming, just ship the `:root` + `.dark` block from §2 and a
class toggle.

---

## 9. Checklist — DO & DON'T

**DO**
- Use tokens for every color/font/radius; derive variants with `color-mix`.
- Install shadcn/ui components (new-york) and use them **as shipped** — restyle via tokens, not by editing sizes.
- Use mono + UPPERCASE + wide tracking for the page chrome (section numbers, eyebrows, metadata captions). Let shadcn components keep their standard sans typography.
- Frame with 1px hairlines; keep surfaces flat.
- Let the radius scale + each component's default corners do the work (`rounded-md` / `-lg` / `-xl`).
- Keep shadcn's focus style (`focus-visible:ring-ring/50 ring-[3px]`) and token-opacity hovers (`hover:bg-primary/90`, `hover:bg-accent`).
- Support light **and** dark; verify contrast in both.
- Use semantic HTML, real labels/`for`, ARIA on overlays, full keyboard support.
- Respect the spacing & radius scales.

**DON'T**
- Never hardcode hex/rgb, or introduce a second accent/brand color.
- Never fork shadcn component sizing or structure — use them as installed; theme only through tokens.
- Never use gradients, glows, or heavy shadows (shadows only on floating overlays).
- Never use large/pill radii except where specified (full = switch, dots, avatars, pills).
- Never mix font families arbitrarily — only sans (content + components) and mono (chrome labels).
- Never add decorative borders thicker than 1px.

---

*Grid Design System · 22 semantic tokens · light + dark · Inter + JetBrains Mono · standard shadcn/ui (new-york).*
