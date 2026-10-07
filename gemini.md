# GEMINI.md

Project rules for the finance dashboard. Follow these on every task.

## Project

A web dashboard that shows a user's financial position: accounts, transactions, budgets, and trends over time. It is **read-only for now**: it displays and analyzes data, it does not move money.

Brand and UI rules live in `docs/brand-guidelines.md`. Read it before any UI work and follow it exactly. Use its design tokens; never hard-code colors, fonts, or radii.

## Stack

Edit this section if the stack differs.

- React 18 + TypeScript (strict) + Vite
- Tailwind CSS, with brand tokens mapped in the Tailwind config
- Recharts for charts
- TanStack Query for data fetching
- Vitest + Testing Library for tests
- Start with typed mock data in `src/data/`, behind a data-access layer in `src/api/`, so a real backend can replace it without touching components.

## How to work

1. **Plan first.** For any task bigger than a one-file change, write a short plan and wait for approval before coding.
2. **Small steps.** One feature or fix per task. Don't refactor unrelated code.
3. **Minimal code.** Write the least code that meets the request. No unrequested features, abstractions, config options, or dependencies. Ask before adding a package.
4. **Verify.** After changes, run typecheck, lint, and tests. For UI work, open the app in the browser and check it at 360px, 768px, and 1280px, in light and dark mode. Include screenshots in the task summary.
5. **Summarize.** End each task with what changed, which files, and anything left undone. Don't pad it.

## Project structure

```
src/
  api/          data access (mock now, real later)
  components/   reusable UI, one folder per component
  features/     overview, transactions, budgets, accounts
  data/         mock data
  lib/          formatting, money, date helpers
  styles/       tokens.css
docs/
  brand-guidelines.md
```

## Code rules

- TypeScript strict. No `any`; use `unknown` and narrow.
- Function components and hooks only. Keep components small and single-purpose.
- Name files and components by what they are: `TransactionsTable`, not `DataGrid2`.
- No dead code, no commented-out code, no `console.log` left behind.
- Handle loading, empty, and error states for every data view, using the copy rules in the brand guidelines.

## Finance rules (non-negotiable)

- **Never use floating-point for money.** Store amounts as integers in minor units (cents/sen) and convert only for display.
- Format with `Intl.NumberFormat`. Currency and locale come from a single config in `src/lib/config.ts`. Never hard-code a symbol.
- Dates are stored as ISO 8601 in UTC and displayed in the user's locale.
- Sign convention: money in is positive, money out is negative. Keep it consistent across all code and mock data.
- Every figure shown must be computed from data. Never invent numbers, trends, or financial advice in the UI.
- Percent change: `(current − previous) / |previous|`. If `previous` is 0, show "n/a", not infinity.
- Totals shown in the UI must reconcile with the rows beneath them. Add a test for any aggregation.
- Mock data must look obviously fake and be labeled as sample data in the UI.

## UI rules

- Follow `docs/brand-guidelines.md` for color, type, spacing, components, charts, motion, and copy.
- Gain and loss are never shown by color alone; always include a sign or icon.
- Numeric columns are right-aligned and use tabular numerals.
- Keyboard accessible, visible focus, touch targets 40px or larger, text contrast 4.5:1 or better.
- Respect `prefers-reduced-motion`.
- Do not use gradients, decorative animation, all-caps labels, or card grids of identical tiles.

## Security and privacy

- No secrets, API keys, or real financial data in the repo. Use `.env` (gitignored) and keep `.env.example` current.
- Never log account numbers, balances, or transaction details.
- Mask account numbers in the UI (show last 4 digits only).
- Validate and sanitize all input at the boundary, including CSV imports.

## Do not

- Do not add authentication, payments, or write operations unless asked.
- Do not install dependencies, change the stack, or restructure folders without approval.
- Do not edit `docs/brand-guidelines.md` unless asked.
- Do not mark a task done while typecheck, lint, or tests fail.

## Definition of done

- Works at all three breakpoints, in light and dark mode
- Loading, empty, and error states handled
- Typecheck, lint, and tests pass
- Matches the brand guidelines
- Summary written, with screenshots for UI changes
