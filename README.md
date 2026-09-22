# Customer Spending Insights Dashboard

A responsive analytics dashboard for exploring customer spending behaviour.

The application allows an analyst to search for a customer using a CIF, account number, ID number, or name, then explore their spending patterns across several focused dashboards.

The project is fully self-contained and uses realistic mock data, so it can be run locally without any backend services or external infrastructure.

---

## Features

| Page | What it does |
|---|---|
| **Customer Overview** | Look up any customer and view their full spending profile, trend chart, and category breakdown |
| **Analytics** | KPI cards, income vs. spend area chart, category donut, analyst insight banner, top merchants widget |
| **Spending Trends** | Monthly/quarterly/yearly trend lines with period filter and category comparison |
| **Transactions** | Transaction ledger with category breakdown and money-flow chart |
| **Categories** | All expense and income categories with period-filtered amounts and sparklines |
| **Merchant Insights** | Merchants ranked by spend for any selected period, with visit counts and trend |
| **Settings** | Light / dark theme toggle |

Additional capabilities:
- **Global search** — search customers by CIF, account number, ID number, or name; navigate to any page
- **Period filter** — 1 M / 3 M / 6 M / 9 M / 12 M available on all chart and merchant pages
- **7 mock customer profiles** — covering Youth, Young Professional, Family, Professional, Business Owner, Lifestyle, and Retired segments
- **Fully responsive** — works on mobile, tablet, and desktop
- **Dark mode** — system-aware with manual override

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite 5 |
| Styling | Tailwind CSS v3 |
| Charts | Recharts |
| Routing | React Router DOM v7 |
| Icons | Lucide React |
| State | React Context API |
| Container | Docker + Nginx |

---

## Running locally

**Prerequisites:** Node.js 18+

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

The app will be available at **http://localhost:5173**

```bash
# Type-check without emitting
npx tsc --noEmit

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Production build
npm run build

# Preview the production build locally
npm run preview
```

---

## Validation

Run the full validation pipeline (format check, lint, type-check, tests, build):

```bash
npm run validate
```

To auto-fix formatting before validating:

```bash
npm run format    # auto-fix formatting
npm run validate  # then validate
```

---

## Running with Docker

**Prerequisites:** [Rancher Desktop](https://rancherdesktop.io/) (or Docker Desktop) installed and running

> On macOS, open **Rancher Desktop** from Applications and wait for the daemon to start before running the commands below.

```bash
# Build and run in one command
npm run docker
```

Or manually:

```bash
# Build the image
docker build -t spending-insights-dashboard .

# Run the container
docker run -d --name spending-insights-dashboard -p 8080:80 spending-insights-dashboard
```

The app will be available at **http://localhost:8080**

---

## Project structure

```
src/
├── components/
│   ├── categories/       # CategoryCard
│   ├── common/           # GlobalSearch, NoCustomerSelected, PeriodFilter
│   ├── customers/        # CustomerLookup, CustomerDashboard
│   ├── dashboard/        # KPICard, SpendingChart, SpendingCategories, TopMerchantsWidget
│   ├── layout/           # Header, Sidebar, MainLayout
│   ├── merchants/        # MerchantSpendChart, MerchantTable
│   ├── transactions/     # CategoryBreakdown, MoneyFlowChart
│   └── trends/           # SpendingTrendChart, CategoryTrendChart, TopMovers
├── context/
│   ├── CustomerContext.tsx   # Active customer state (global)
│   ├── SidebarContext.tsx    # Sidebar open/close state
│   └── ThemeContext.tsx      # Light / dark mode
├── data/
│   ├── categories.ts     # 16 categories + monthly distribution patterns
│   ├── customers.ts      # 7 mock customer profiles + lookup helper
│   └── merchants.ts      # 12 merchants per customer + period spend helper
└── pages/
    ├── DashboardPage.tsx
    ├── CustomerOverviewPage.tsx
    ├── SpendingTrendsPage.tsx
    ├── TransactionsPage.tsx
    ├── CategoriesPage.tsx
    ├── MerchantInsightsPage.tsx
    └── SettingsPage.tsx
```

---

## Architecture decisions

**Mock data over a backend API**
All customer, transaction, category, and merchant data is statically defined in `src/data/`. This keeps the project self-contained and runnable without any infrastructure. The data layer is isolated behind typed interfaces and helper functions (`lookupCustomer`, `getPeriodSpend`, `getPeriodAmount`) — swapping in real API calls requires changes only in those files.

**Period filtering via monthly weight distributions**
Because the mock data stores annual totals rather than individual transactions, each category and merchant carries a `MONTHLY_PATTERNS` array (12 weights summing to 1.0) that models realistic seasonal spend. Selecting "Last 3 months" slices the last 3 weights and scales the annual total accordingly. This produces coherent period-filtered numbers without a transaction database.

**Context API over a state library**
The application has three narrow, well-defined global concerns (active customer, sidebar state, colour mode). React Context is sufficient and avoids the added complexity and bundle size of Redux or Zustand for a dashboard of this scope.

**Recharts over a lower-level library**
Recharts provides composable, React-idiomatic chart primitives that integrate cleanly with Tailwind-styled tooltips and custom active dots. The tradeoff is less fine-grained SVG control compared to D3, which is acceptable for this use case.

**Tailwind CSS with `darkMode: 'class'`**
Class-based dark mode gives explicit control — the theme toggle in Settings writes a `dark` class to `<html>` and persists the preference to `localStorage`. This avoids flickers on page load and allows future server-side rendering without hydration mismatches.

---

## Demo profiles

Use any of the following identifiers to search or click a profile card directly:

| Name | CIF | Account Number | Segment | Risk |
|---|---|---|---|---|
| Madlanga Dlamini | 100234567 | 1234567890 | Young Professional | Medium |
| Thandi Mokoena | 100567890 | 0987654321 | Family | Low |
| Sipho Motsepe | 100891234 | 1357924680 | Business Owner | High |
| Lwazi Dube | 100345678 | 2345678901 | Youth | Low |
| Vikesh Govender | 100456789 | 3456789012 | Professional | Medium |
| Kobus van der Berg | 100678901 | 4567890123 | Lifestyle | High |
| Anna-Marie Botha | 100789012 | 5678901234 | Retired | Low |
