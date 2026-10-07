# Finance Dashboard Implementation Tasks

This task tracker outlines the step-by-step implementation of the finance dashboard following `gemini.md` rules and `brand-guidelines.md`.

## Task List

- [x] **Task 1: Environment & Project Setup**
  - [x] Copy `brand-guidelines.md` to `docs/brand-guidelines.md` per project structure.
  - [x] Initialize `package.json` with approved stack: React 18, Vite, TypeScript strict, Tailwind CSS, Recharts, TanStack Query, Lucide icons, Vitest, Testing Library.
  - [x] Configure `tsconfig.json` with strict mode (`noImplicitAny`, strict null checks).
  - [x] Configure `tailwind.config.js` mapping all brand tokens (`--ink`, `--marine`, `--saffron`, `--gain`, `--loss`, etc.).
  - [x] Configure `vite.config.ts` and test runner setup.

- [x] **Task 2: Finance & Date Core Libraries (`src/lib/`)**
  - [x] `src/lib/config.ts`: Single source of truth for currency (`USD`) and locale (`en-US`).
  - [x] `src/lib/money.ts`: Integer minor units (cents) arithmetic, format with `Intl.NumberFormat`, true minus sign (`−`), percent change calculation `(current - previous) / |previous|` with `"n/a"` fallback for 0.
  - [x] `src/lib/date.ts`: UTC ISO 8601 formatting to `7 Oct 2026`, relative date formatter with hoverable absolute date.
  - [x] `tests/money.test.ts` & `tests/aggregation.test.ts`: Unit tests verifying financial calculations, zero-handling, and total reconciliation.

- [x] **Task 3: Design Tokens & Typography (`src/styles/`)**
  - [x] `src/styles/tokens.css`: CSS variables for light mode and dark mode (`:root[data-theme="dark"]`), radius tokens (`--radius-control: 4px`, `--radius-panel: 8px`), shadow for modals only.
  - [x] `src/index.css`: IBM Plex Sans font setup, `font-variant-numeric: tabular-nums`, focus-visible outlines (2px `--marine` with 2px offset), reduced-motion media query handling.

- [x] **Task 4: Shared UI Components (`src/components/`)**
  - [x] `Button`: 40px primary (`--marine` fill) and secondary (`--surface` fill, `--line` border), touch target >= 40px.
  - [x] `Input`: 40px height, 1px `--line` border, visible labels above fields.
  - [x] `Table`: 48px rows, sticky header, hover using `--marine-tint`, right-aligned tabular numerals.
  - [x] `StatusChip`: Gain, loss, warning, neutral with icon + text (never color alone), full pill radius.
  - [x] `ChangeIndicator`: Sign (+/−), amount, percent with icon/sign.
  - [x] `Skeleton`: Accessible loading placeholders (never blank panels).
  - [x] `Panel`: 1px `--line` border, 8px radius, no shadows.
  - [x] `NavigationRail`: 232px sidebar collapsing to 64px icon rail below 1024px.
  - [x] `SampleDataBanner`: Prominent indicator that all figures are mock/sample data.
  - [x] `ThemeToggle`: Switch between light and dark modes updating `data-theme`.

- [x] **Task 5: Typed Mock Data & API Access Layer (`src/data/`, `src/api/`)**
  - [x] `src/data/mockData.ts`: Realistic yet clearly simulated data for accounts (masked `•••• 1234`), categorized transactions, monthly budgets, and historical cash flows.
  - [x] `src/api/`: Data-access layer using TanStack Query hooks (`useAccountsQuery`, `useTransactionsQuery`, `useBudgetsQuery`, `useOverviewSummaryQuery`, `useCashFlowHistoryQuery`).

- [x] **Task 6: Feature - Overview (`src/features/overview/`)**
  - [x] Headline figure (Total Net Worth) with period comparison change indicator (`40px/44px`, weight 500).
  - [x] Main cash flow time series chart: `--marine` line, dashed `--slate` comparison, `--saffron` "now" point, screen reader table alternative.
  - [x] Supporting list: Recent transactions, budget status alerts, accounts summary (ledger layout, no card grid).
  - [x] Loading, error, and empty states.

- [x] **Task 7: Feature - Transactions (`src/features/transactions/`)**
  - [x] Transactions table with sticky header, 48px rows, right-aligned tabular amounts, sign conventions.
  - [x] Search input, category filter, account filter, and date sorting.
  - [x] CSV Export with outcome naming ("Export CSV" -> "CSV exported.").
  - [x] Screen-reader accessible empty and error states.

- [x] **Task 8: Feature - Budgets (`src/features/budgets/`)**
  - [x] Category spending vs target with zero-based horizontal bars.
  - [x] Over/under budget status chips with icons and signs.
  - [x] Reconciled category totals and pacing banner.
  - [x] Create budget modal with outcome-named action ("Save budget" -> "Budget saved.").

- [x] **Task 9: Feature - Accounts (`src/features/accounts/`)**
  - [x] Account table with masked account numbers (`•••• 4821`).
  - [x] Balances stored in minor units, reconciled total net balance matching the headline figure.

- [x] **Task 10: App Integration & Responsive Layout (`src/App.tsx`)**
  - [x] View switching (Overview, Transactions, Budgets, Accounts).
  - [x] Responsive container (max 1280px) down to 360px mobile view with horizontal scrolling inside tables.
  - [x] Accessible navigation rail, theme toggle, and keyboard navigation.

- [ ] **Task 11: Verification & Definition of Done**
  - [x] Run `npm run test` (Vitest unit and aggregation tests: 18/18 tests passed).
  - [x] Run `npm run typecheck` (`tsc --noEmit`: 0 errors).
  - [x] Run `npm run build` (Vite production bundle compiled cleanly).
  - [x] Local dev server running at `http://localhost:5173/`.
  - [ ] Browser subagent automated session verification (paused due to Playwright driver 404 environment issue).
