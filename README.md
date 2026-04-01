# React Template

A production-ready React starter template with a carefully chosen, modern stack. Clone it, rename it, and ship.

---

## Stack

| Category | Library | Purpose |
|---|---|---|
| Framework | React 18 + Vite | UI rendering and fast dev/build tooling |
| Language | TypeScript (strict) | Type safety across the entire codebase |
| Routing | TanStack Router | Fully type-safe client-side routing |
| State (server) | Redux Toolkit | Typed slices, async thunks, predictable state |
| Data fetching | Axios | HTTP client with interceptors |
| Styling | Tailwind CSS | Utility-first CSS |
| Linting/Formatting | Biome | Replaces ESLint + Prettier in one tool |
| Testing | Jest + React Testing Library | Unit and component tests |
| Git hooks | Husky + lint-staged | Runs Biome on staged files before every commit |
| Deployment | Vercel | Zero-config SPA hosting |
| CI/CD | GitHub Actions | Lint + test + build on every push/PR |

---

## Prerequisites

- **Node.js** >= 20
- **Yarn** >= 4 (`corepack enable && corepack prepare yarn@stable --activate`)

---

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/your-username/react-template.git
cd react-template

# 2. Install dependencies
yarn install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# 4. Start the dev server
yarn dev
```

The app will be running at `http://localhost:5173`.

---

## Available Scripts

| Command | Description |
|---|---|
| `yarn dev` | Start local dev server |
| `yarn build` | Type-check and build for production |
| `yarn preview` | Preview the production build locally |
| `yarn test` | Run all tests with coverage |
| `yarn test:watch` | Run tests in watch mode |
| `yarn lint` | Lint with Biome |
| `yarn format` | Auto-format with Biome |
| `yarn check` | Run both lint + format check (used in CI) |

---

## Folder Structure

```
src/
├── api/                  # Axios instance, base config, interceptors
├── components/           # Shared UI components (ErrorBoundary, etc.)
├── constants/            # App-wide constants (routes, config values)
├── features/             # Feature modules — each is self-contained
│   └── users/
│       ├── __tests__/    # Jest + RTL tests for this feature
│       ├── components/   # UI components scoped to this feature
│       ├── types.ts      # TypeScript types for this feature
│       ├── usersApi.ts   # Axios API calls for this feature
│       └── usersSlice.ts # RTK slice (actions, thunks, reducer)
├── hooks/                # Shared custom hooks (typed Redux hooks, etc.)
├── pages/                # Page-level components mapped to routes
├── routes/               # TanStack Router route tree
├── store/                # Redux store setup and root reducer
├── styles/               # Global CSS (Tailwind entry point)
├── types/                # Shared TypeScript interfaces
└── utils/                # Pure utility/helper functions
```

---

## Environment Variables

All variables must be prefixed with `VITE_` to be accessible in the browser.

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Base URL for all Axios requests |
| `VITE_APP_NAME` | App name shown in the UI |

**Files:**
- `.env.example` — Committed. Template showing all required variables.
- `.env.local` — Not committed. Your local overrides.
- `.env.production` — Not committed. Set these in Vercel's dashboard instead.

> Never commit `.env.local` or `.env.production` — they are in `.gitignore`.

---

## Adding a New Feature

Follow this pattern for every new domain (e.g. `posts`, `products`, `auth`):

```bash
src/features/your-feature/
├── __tests__/
│   └── YourFeature.test.tsx
├── components/
│   └── YourFeatureList.tsx
├── types.ts
├── yourFeatureApi.ts
└── yourFeatureSlice.ts
```

**Step-by-step:**

1. **Create the types** in `types.ts`
2. **Write the API call** in `yourFeatureApi.ts` using `apiClient` from `@/api/apiClient`
3. **Create the RTK slice** in `yourFeatureSlice.ts` with an async thunk calling your API
4. **Register the reducer** in `src/store/index.ts`
5. **Build the components** in `components/` using `useAppSelector` and `useAppDispatch`
6. **Create a page** in `src/pages/` that renders your feature
7. **Add the route** in `src/routes/routeTree.ts`
8. **Write tests** in `__tests__/` covering loading, error, and success states

---

## Testing

Tests live in `__tests__/` folders next to the code they test.

```bash
yarn test           # Run all tests + coverage report
yarn test:watch     # Watch mode for development
```

**Conventions:**
- Use `renderWithStore()` helper pattern to wrap components with a pre-configured Redux store
- Test **behaviour**, not implementation — assert on what the user sees, not internal state
- Cover three states for any async component: loading, error, and success

---

## Deployment to Vercel

1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import your repo
3. Vercel auto-detects Vite — no build config needed
4. Add your environment variables under **Settings → Environment Variables**
5. Every push to `main` triggers an automatic deployment

The `vercel.json` at the root ensures all routes redirect to `index.html`, so TanStack Router handles navigation correctly without 404s on page refresh.

---

## CI/CD (GitHub Actions)

The workflow in `.github/workflows/ci.yml` runs on every push and pull request to `main` or `develop`:

1. Install dependencies
2. Run Biome lint + format check
3. TypeScript type check
4. Run Jest tests with coverage
5. Production build

PRs that fail any of these steps are blocked from merging. Add your `VITE_*` variables as **GitHub Secrets** for the build step.

---

## Git Hooks

Husky runs `lint-staged` before every commit. This automatically runs Biome's check + auto-fix on any staged `.ts` / `.tsx` files — so only clean, formatted code ever gets committed.
