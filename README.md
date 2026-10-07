# Finance Dashboard

A web dashboard that shows a user's financial position: accounts, transactions, budgets, and cash flow trends over time. It is read-only: it displays and analyzes data without initiating transfers or moving money.

Built with **React 18**, **TypeScript (strict)**, **Vite**, **Tailwind CSS**, **Recharts**, and **TanStack Query**, following the design standards specified in `docs/brand-guidelines.md` and rules in `gemini.md`.

---

## Features

- **Overview:**
  - Consolidated headline figure (Net Worth) with period comparison and assets vs. liabilities breakdown.
  - Net cash flow trend line chart with comparison period and current period highlighted with the brand Saffron marker.
  - Recent transactions and budget pace summaries.
- **Transactions:**
  - Sticky-header table with 48px rows and hover styling.
  - Right-aligned tabular numerals with header currency units (`Amount (USD)`).
  - Search filtering by description, account, and category.
  - Sortable columns (Date, Amount, Category, Description).
  - CSV export functionality.
- **Budgets:**
  - Monthly target caps vs. actual spend pacing.
  - Horizontal bar chart with a zero-based axis.
  - Category breakdown with status indicators and progress tracks.
  - Create budget modal persisted in the data layer.
- **Accounts:**
  - Depository, investment, and credit accounts.
  - Masked account numbers (last 4 digits only, e.g., `•••• 4102`).
  - Reconciled consolidated net balance.
- **Accessibility & Design System:**
  - Strict design token mapping for both Light and Dark modes (`data-theme="dark"`).
  - Typography using **IBM Plex Sans** with `font-variant-numeric: tabular-nums`.
  - Accessible focus outlines (2px solid `--marine` with 2px offset).
  - Screen reader summaries and accessible alternative table views for charts.
  - Responsive layout (collapsible navigation rail, mobile-optimized scrolling).
  - Labeled sample data banner.

---

## Finance & Data Rules

1. **Integer Minor Units:** All monetary values are stored strictly as integers in minor units (cents) to eliminate floating-point precision errors.
2. **Standard Formatting:** Currency and locale are configured in `src/lib/config.ts` and formatted via `Intl.NumberFormat`. Negative values use the true Unicode minus sign (`−`).
3. **Sign Convention:** Inflows are positive (`+`), and outflows are negative (`−`).
4. **Data Reconciliation:** All totals in the UI (headline figure, category totals, net flow) reconcile directly with the underlying data rows.
5. **UTC ISO 8601 Dates:** Stored in UTC and formatted as `7 Oct 2026`.

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Library | React 18 |
| Language | TypeScript (Strict mode) |
| Build Tool | Vite |
| Styling | Tailwind CSS + CSS Variables (`tokens.css`) |
| Data Fetching | TanStack Query (`@tanstack/react-query`) |
| Charts | Recharts |
| Icons | Lucide React |
| Test Runner | Vitest + Testing Library + jsdom |

---

## Project Structure

```
finance-dashboard/
├── docs/
│   └── brand-guidelines.md    # UI and brand design guidelines
├── src/
│   ├── api/                   # Data access layer & React Query hooks
│   │   ├── accountsApi.ts
│   │   ├── budgetsApi.ts
│   │   ├── hooks.ts
│   │   ├── overviewApi.ts
│   │   └── transactionsApi.ts
│   ├── components/            # Reusable UI design system components
│   │   ├── Button/
│   │   ├── ChangeIndicator/
│   │   ├── Input/
│   │   ├── NavigationRail/
│   │   ├── Panel/
│   │   ├── SampleDataBanner/
│   │   ├── Skeleton/
│   │   ├── StatusChip/
│   │   └── Table/
│   ├── data/                  # Typed models and simulated dataset
│   │   ├── mockData.ts
│   │   └── types.ts
│   ├── features/              # Feature modules
│   │   ├── accounts/
│   │   ├── budgets/
│   │   ├── overview/
│   │   └── transactions/
│   ├── lib/                   # Money arithmetic, date helpers, config
│   │   ├── config.ts
│   │   ├── date.ts
│   │   ├── money.ts
│   │   └── utils.ts
│   ├── styles/                # CSS variable design tokens
│   │   └── tokens.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── tests/                     # Unit and aggregation test suite
│   ├── aggregation.test.ts
│   ├── budgets.test.ts
│   ├── ChangeIndicator.test.tsx
│   ├── money.test.ts
│   └── setup.ts
├── gemini.md                  # Project rules and engineering constraints
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

```bash
npm install
```

### Development Server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Running Tests

Execute the unit and component test suite:

```bash
npm run test
```

### Type Checking

Verify strict TypeScript compliance:

```bash
npm run typecheck
```

### Production Build

Compile the production bundle:

```bash
npm run build
```
