# Customer Spending Insights Dashboard

A responsive, web-based analytics dashboard for analysing customer spending patterns, insights and financial activity.

Analysts can search a customer by CIF (Client Information File - identifier), account number, ID (South African Identity) number or Name, then explore 12 months of spending trends, category breakdowns, merchant activity and key financial insights.

The application includes seven realistic customer profiles and is fully self-contained, with no backend or database required.

---

## Key features

| Page | What it does |
|---|---|
| **Customer Overview** | Get a quick view of the customer’s spending profile, 12-month trends, top categories and key financial insights. |
| **Analytics** | Review key spending metrics, income vs. spend trends, category breakdowns, notable insights and top merchants. |
| **Spending Trends** | Explore how spending changes over time with period filters and category comparisons. |
| **Transactions** | Understand money movement through income and spending charts, category breakdowns and year-on-year comparisons. |
| **Categories** | Explore expense and income categories, compare spending across periods, view trends and sort categories by value. |
| **Merchant Insights** | See where customers spend most, rank merchants by spend and filter results by period, category or merchant. |
| **Settings** | Switch between light and dark mode, with the selected preference remembered between sessions, persisted to `localStorage` |

Additional capabilities:

- **Global search** — Find customers by CIF, account number, ID number or name and navigate directly from the header
- **Period filter** — Switch between 1, 3, 6, 9 or 12 months across charts and merchant views.
- **7 mock customer profiles** — Explore realistic sample profiles across key retail banking segments.
- **Fully responsive** — Optimised for mobile, tablet and desktop.
- **Dark mode** — Automatically respects system settings, with a manual theme toggle.

---

## Tech stack

| Layer | Choice | Version |
|---|---|---|
| Framework | React + TypeScript | 18 / 5.5 |
| Build tool | Vite (SWC compiler) | 5.4 |
| Styling | Tailwind CSS | 3.4 |
| Charts | Recharts | 2.12 |
| Routing | React Router DOM | 7 |
| Icons | Lucide React | 0.446 |
| State | React Context API | — |
| Testing | Vitest + Testing Library | 4 / 16 |
| Linting | oxlint | 1.85 |
| Formatting | Prettier | 3.9 |
| Container | Docker (node:20-alpine → nginx:alpine) | — |

---

## Prerequisites

| Tool | Minimum version | Notes |
|---|---|---|
| Node.js | 18 | 20 LTS recommended; matches the Docker build image |
| npm | 9 | Bundled with Node 18+ |
| Docker | any recent | Only needed for the container workflow; Rancher Desktop or Docker Desktop both work |

Check your versions:

```bash
node -v
npm -v
docker --version
```

---

## Clone and run

```bash
# 1. Clone the repo
git clone https://github.com/brucespider11/spending-insights-dashboard.git
cd spending-insights-dashboard

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## Environment variables

This project has **no environment variables**. 
All data is statically defined in `src/data/` and the application makes no external network calls.

---

## Available npm scripts

| Script | Command | What it does |
|---|---|---|
| `dev` | `npm run dev` | Start Vite dev server with HMR on :5173 |
| `build` | `npm run build` | Type-check then produce an optimised production build in `dist/` |
| `preview` | `npm run preview` | Serve the production build locally for smoke-testing |
| `test` | `npm test` | Run all Vitest unit tests once |
| `test:watch` | `npm run test:watch` | Run tests in watch mode (re-runs on file save) |
| `test:ui` | `npm run test:ui` | Open the Vitest browser UI |
| `typecheck` | `npm run typecheck` | Run `tsc --noEmit` (type-check without emitting files) |
| `lint` | `npm run lint` | Run oxlint across `src/` |
| `format` | `npm run format` | Auto-fix formatting with Prettier |
| `format:check` | `npm run format:check` | Check formatting without writing (used in CI) |
| `validate` | `npm run validate` | Full pipeline: format (auto-fix) → lint → typecheck → test → build |
| `docker` | `npm run docker` | Build and run the Docker container on :8080 (removes any existing container first) |

---

## Testing

Tests live alongside their subjects and use **Vitest** with **jsdom** and **@testing-library/react**.

```bash
# Run all tests once
npm test

# Watch mode (re-runs on save — best for active development)
npm run test:watch

# Browser-based UI (interactive pass/fail tree)
npm run test:ui
```

Test files:

| File | What it covers |
|---|---|
| `src/data/customers.test.ts` | `lookupCustomer` and `searchCustomersByName` helpers |
| `src/data/categories.test.ts` | `getPeriodAmount` period-scaling logic |
| `src/data/merchants.test.ts` | `getPeriodSpend` seasonal weight calculations |
| `src/components/common/PeriodFilter.test.tsx` | PeriodFilter render and interaction |

There are no E2E tests. The data layer helpers are the highest-value unit-test targets because they underpin every chart's numbers.

---

## Docker

The Dockerfile uses a two-stage build: Node 20 Alpine builds the application and Nginx Alpine serves the production files. 
Nginx is configured to fall back to `index.html` for all routes, ensuring React Router navigation works correctly.


**Prerequisites:** [Rancher Desktop](https://rancherdesktop.io/) or Docker Desktop must be running.

> On macOS, open **Rancher Desktop** from Applications and wait for the engine to start before running any `docker` commands.

```bash
# One-command build and run (recommended)
npm run docker
```

Or step by step:

```bash
# Build the image
docker build -t spending-insights-dashboard .

# Run the container (detached, port 8080)
docker run -d --name spending-insights-dashboard -p 8080:80 spending-insights-dashboard

# Stop and remove
docker stop spending-insights-dashboard
docker rm spending-insights-dashboard
```

Open **http://localhost:8080** once the container is running.

---

## Project structure

```
customer-spending-insights-dashboard/
├── public/
├── src/
│   ├── components/
│   │   ├── categories/       # CategoryCard (sparkline, rank badge, type pill)
│   │   ├── common/           # GlobalSearch, NoCustomerSelected, PeriodFilter
│   │   ├── customers/        # CustomerLookup, CustomerDashboard
│   │   ├── dashboard/        # KPICard, SpendingChart, SpendingCategories, TopMerchantsWidget
│   │   ├── layout/           # Header, Sidebar, MainLayout
│   │   ├── merchants/        # MerchantSpendChart, MerchantTable
│   │   ├── transactions/     # CategoryBreakdown, MoneyFlowChart
│   │   └── trends/           # SpendingTrendChart, CategoryTrendChart, TopMovers
│   ├── context/
│   │   ├── CustomerContext.tsx   # Active customer state (global)
│   │   ├── SidebarContext.tsx    # Sidebar open/close state
│   │   └── ThemeContext.tsx      # Light / dark mode + localStorage persistence
│   ├── data/
│   │   ├── categories.ts     # 16 categories, monthly weight patterns, getPeriodAmount()
│   │   ├── customers.ts      # 7 mock profiles, lookupCustomer(), searchCustomersByName()
│   │   └── merchants.ts      # 12 merchants per customer, MONTHLY_PATTERNS, getPeriodSpend()
│   ├── pages/
│   │   ├── DashboardPage.tsx
│   │   ├── CustomerOverviewPage.tsx
│   │   ├── SpendingTrendsPage.tsx
│   │   ├── TransactionsPage.tsx
│   │   ├── CategoriesPage.tsx
│   │   ├── MerchantInsightsPage.tsx
│   │   └── SettingsPage.tsx
│   └── test/
│       └── setup.ts          # @testing-library/jest-dom matchers
├── Dockerfile
├── nginx.conf
├── vite.config.ts
├── tailwind.config.js
└── package.json
```

The `@` path alias resolves to `src/` throughout the codebase (e.g. `@/data/customers`).

---

## Architecture decisions

### Mock data over a backend API
All customer, transaction, category and merchant data is kept in `src/data/`, making the application fully self-contained and easy to run without external services. Access to that data is handled through typed interfaces and helper functions such as `lookupCustomer`, `getPeriodSpend` and `getPeriodAmount`, so the UI never works with raw data directly and can be connected to a real API later with minimal changes.

### Period filtering via monthly weight distributions
The mock data stores annual totals rather than individual transaction records. Each category and merchant carries a `MONTHLY_PATTERNS` array (12 weights summing to 1.0) that models realistic seasonal spend for that category (e.g. Retail peaks in Oct–Dec, Travel peaks in Jun–Aug). Selecting "Last 3 months" slices the final 3 weights and scales the annual total accordingly. This produces coherent, period-consistent numbers without a transaction database.

### React Context API over a state library
The application only needs a small amount of shared state: the active customer, sidebar state and theme preference. React Context handles these cleanly without introducing the additional complexity of Redux or Zustand.

### Recharts over D3 or a lower-level library
Recharts provides flexible, React-friendly chart components that integrate cleanly with the application. It offers the right balance of customisation and simplicity without the added complexity of a lower-level library such as D3.

### `darkMode: 'class'` with localStorage persistence
Dark mode is controlled using a `dark` class on the root HTML element, with the user’s preference saved between sessions. This gives the application reliable theme control and helps prevent visual flicker during page load.

### Vendor chunk splitting
The Vite build separates React, Recharts and Lucide into dedicated vendor chunks. This improves browser caching, so returning users only download application code that has changed instead of reloading large shared libraries.

---

## Assumptions and limitations

- **Data is static and illustrative.** 
The seven customer profiles are fictional and designed for demonstration purposes. The figures are internally consistent but do not represent real customers.
- **No authentication.** 
Customer data is openly accessible within the demo. A production version would require secure login and role-based access control.
- **No real-time updates.** 
The dashboard uses a fixed 12-month period from October 2025 to September 2026 and does not include live updates.
- **Period spend is approximated.** 
Shorter periods are calculated from monthly weighting patterns rather than individual transaction records.
- **No internationalisation.**
The application uses ZAR, English and en-ZA date and number formatting.

---

## Production considerations / next steps

| Area | What would change |
|---|---|
| **Real data** | Replace `src/data/` helpers with API calls to a core banking or analytics service; the typed interfaces remain unchanged |
| **Authentication** | Add an OAuth2/OIDC layer (e.g. corporate SSO); protect routes with a `<PrivateRoute>` wrapper |
| **Search** | Replace client-side name matching with a server-side full-text search endpoint for large customer bases |
| **Accessibility** | Audit with axe-core; add `aria-label` to all icon-only buttons and chart containers |
| **E2E tests** | Add Playwright or Cypress smoke tests covering the customer lookup → dashboard → merchant insights flow |
| **Error boundaries** | Wrap page-level components with React error boundaries so a bad API response doesn't crash the whole app |
| **Performance** | The current bundle is small; at production scale, virtualise the merchant table (react-virtual) and paginate API results |
| **CI/CD** | `npm run validate` maps directly to a GitHub Actions pipeline step: format check → lint → typecheck → test → build → Docker push |

---

## Demo profiles

Use any identifier below in the search bar or click a customer card on the home screen:

| Name | CIF | Account Number | Segment | Risk |
|---|---|---|---|---|
| Riyaad van Damme | 100234567 | 1234567890 | Young Professional | Medium |
| Thandi Mokoena | 100567890 | 0987654321 | Family | Low |
| Sipho Motsepe | 100891234 | 1357924680 | Business Owner | High |
| Lwazi Dube | 100345678 | 2345678901 | Youth | Low |
| Vikesh Govender | 100456789 | 3456789012 | Professional | Medium |
| Kobus van der Berg | 100678901 | 4567890123 | Lifestyle | High |
| Anna-Marie Botha | 100789012 | 5678901234 | Retired | Low |

---

## Troubleshooting

**`npm run dev` fails with "address already in use"**
Port 5173 is already in use. Stop the conflicting process or run `npm run dev -- --port 5174`.

**`docker: Cannot connect to the Docker daemon`**
REnsure Docker Desktop or Rancher Desktop is running and the container engine has started before retrying.

**`npm run validate` fails on format check**
Run `npm run format` to apply formatting fixes, then run `npm run validate`. again.

**TypeScript path alias `@/...` not resolving in your editor**
Make sure your editor is using the workspace TypeScript configuration. 
In VS Code, select TypeScript: Select TypeScript Version → Use Workspace Version.

**Dev server is slow to start after a dependency update**
Delete the Vite cache and reinstall: `rm -rf node_modules/.vite && npm install`.
