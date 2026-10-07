# Brand Guidelines: Finance Dashboard

Replace `[Product name]` with the real name once chosen. Everything below is a rule the UI follows, not a suggestion.

## 1. Essence

**What it is:** a dashboard that shows people where their money stands and what changed.
**Who it's for:** people who check their finances regularly and want answers fast, not a tour.
**Primary job:** make the current position, and what moved since last period, obvious within three seconds.

**Personality:** calm, exact, unhurried. It reads like a good ledger: nothing decorative, every figure traceable.

**The one memorable thing:** Saffron marks "now" (the current period, the selected point, the item that needs a look). Everything else stays quiet so that single mark carries meaning.

## 2. Voice and copy

- Plain words, active voice, sentence case everywhere. No exclamation marks.
- Say what happened and by how much: "Spending is up 12% from last month," not "Whoa, big month!"
- Name things the way users do: "Transactions," "Budgets," "Accounts." Not "Entities" or "Records."
- A button names its outcome: "Save budget," "Export CSV." The confirmation uses the same verb: "Budget saved."
- Errors say what went wrong and how to fix it, and never apologize: "Couldn't load accounts. Check your connection and try again."
- Empty states point to the next action: "No transactions yet. Add one or import a CSV."
- Never invent figures, trends, or advice in copy. If a number isn't computed from data, it doesn't appear.

## 3. Color

Light mode is the default. Use tokens only; never hard-code hex values in components.

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#15212B` | Primary text |
| `--slate` | `#566474` | Secondary text, axis labels |
| `--canvas` | `#F1F3F5` | App background |
| `--surface` | `#FFFFFF` | Panels, tables, inputs |
| `--line` | `#D9DFE5` | Borders, dividers |
| `--marine` | `#0B5C73` | Primary actions, links, main chart series |
| `--marine-deep` | `#084A5D` | Hover and pressed for primary |
| `--marine-tint` | `#DCEEF2` | Selected rows, subtle fills |
| `--saffron` | `#F2A81D` | "Now" marker, selected data point, attention dot |
| `--saffron-tint` | `#FDF1D6` | Warning background (text uses `#8A5A00`) |
| `--gain` | `#1B7F5A` | Positive change |
| `--gain-tint` | `#E1F2EA` | Positive background |
| `--loss` | `#B83A2E` | Negative change |
| `--loss-tint` | `#F8E4E1` | Negative background |

Dark mode:

| Token | Hex |
|---|---|
| `--ink` | `#E8EDF1` |
| `--slate` | `#9AA8B5` |
| `--canvas` | `#0E161D` |
| `--surface` | `#16212A` |
| `--line` | `#263441` |
| `--marine` | `#4FB3CC` |
| `--gain` | `#4CC38A` |
| `--loss` | `#F0776B` |
| `--saffron` | `#F2A81D` |

Rules:
- Saffron is never used as text color on a light background (insufficient contrast) and never as a decorative accent.
- Gain and loss are never communicated by color alone. Always pair with a sign (+ / −) or an arrow icon.
- No gradients. No colored page backgrounds beyond `--canvas`.

## 4. Typography

One family: **IBM Plex Sans** (400, 500, 600). Fallback: `system-ui, sans-serif`.

- All figures use `font-variant-numeric: tabular-nums` so columns align.
- Numeric table columns are right-aligned, with the currency or unit in the header, not repeated in every cell.
- Body line length stays under 80 characters.

| Role | Size / line height | Weight |
|---|---|---|
| Headline figure | 40 / 44 | 500 |
| Page title | 28 / 34 | 600 |
| Section title | 20 / 28 | 600 |
| Body | 16 / 24 | 400 |
| Table and control text | 14 / 20 | 400 |
| Caption, axis label | 12 / 16 | 400 |

Avoid: all-caps labels, tracked-out eyebrows above headings, emphasizing a single word in a heading, monospace for data.

## 5. Layout and spacing

- 4px base unit. Spacing steps: 4, 8, 12, 16, 24, 32, 48.
- Left navigation, 232px wide, collapsing to a 64px icon rail below 1024px. Content max width 1280px.
- Text is left-aligned. Numbers in tables are right-aligned.
- Overview structure: one headline figure with its period comparison, then the main chart, then supporting lists. Do not split content into rows of identical cards.
- Responsive down to 360px wide. Tables scroll inside their own container; the page never scrolls sideways.

## 6. Shape and elevation

- Radius follows hierarchy: 4px for inputs, buttons, and chips' inner elements; 8px for panels and dialogs; full pill only for status chips.
- Panels are separated by 1px `--line` borders, not shadows. The only shadow is on popovers, menus, and modals: `0 8px 24px rgba(21, 33, 43, 0.12)`.

## 7. Components

- **Primary button:** `--marine` fill, white text, 40px tall. One primary action per view.
- **Secondary button:** `--surface` fill, `--line` border, `--ink` text.
- **Inputs:** 40px tall, 1px `--line` border, label always visible above the field (placeholder is never the label).
- **Tables:** 48px rows, sticky header, hover uses `--marine-tint`, sortable columns show direction.
- **Status chips:** gain, loss, warning, neutral. Text plus icon, never color alone.
- **Change indicator:** sign, amount, percent, e.g. `+RM 320.00 (+4.2%)`, in `--gain` or `--loss`.
- **Skeletons** while loading; never a blank panel.

## 8. Data visualization

- Time series use lines; category comparisons use horizontal bars. No 3D, no pie charts with more than 4 slices, no dual axes.
- Main series `--marine`; comparison period dashed `--slate`. Only the selected or current point uses `--saffron`.
- Label directly on the chart where possible; keep the legend for 3+ series.
- Y-axis starts at zero for bars. Gridlines use `--line`, horizontal only.
- Tooltips show exact figure, date, and change from the previous period.
- Every chart has a text summary or table alternative for screen readers.

## 9. Numbers and formats

- Currency and locale come from one config value. Never hard-code a currency symbol.
- Format with `Intl.NumberFormat`. Negative amounts use a true minus sign (−).
- Large figures abbreviate only in tight spaces (charts, small tiles), with the full value on hover or focus.
- Dates display as `7 Oct 2026`; relative dates ("3 days ago") always have the absolute date available on hover.

## 10. Motion

- No ambient or decorative animation.
- State changes (open, expand, confirm) take 150ms ease-out.
- Charts may draw once on first load, 400ms. Nothing replays on re-render.
- Honor `prefers-reduced-motion` by disabling all of the above.

## 11. Accessibility floor

- Text contrast at least 4.5:1; UI element contrast at least 3:1.
- Visible keyboard focus: 2px `--marine` outline with 2px offset.
- Full keyboard operation; logical tab order; dialogs trap focus.
- Touch targets at least 40px.

## 12. Tokens (CSS)

```css
:root {
  --ink: #15212b; --slate: #566474;
  --canvas: #f1f3f5; --surface: #ffffff; --line: #d9dfe5;
  --marine: #0b5c73; --marine-deep: #084a5d; --marine-tint: #dceef2;
  --saffron: #f2a81d; --saffron-tint: #fdf1d6;
  --gain: #1b7f5a; --gain-tint: #e1f2ea;
  --loss: #b83a2e; --loss-tint: #f8e4e1;
  --radius-control: 4px; --radius-panel: 8px;
}
:root[data-theme="dark"] {
  --ink: #e8edf1; --slate: #9aa8b5;
  --canvas: #0e161d; --surface: #16212a; --line: #263441;
  --marine: #4fb3cc; --gain: #4cc38a; --loss: #f0776b;
}
body { font-family: "IBM Plex Sans", system-ui, sans-serif; font-variant-numeric: tabular-nums; }
```
