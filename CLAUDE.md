# forher (AnnoyHer.exe)

A small prank web app: React 19, Vite, TypeScript, Tailwind, framer-motion, React Router. Deployed on Vercel. Runs on Sai's build pipeline (shipyard); settings in `.github/pipeline.yml`.

- **Project type:** web
- **Flag mechanism:** `src/flags.ts`, read from `VITE_FLAG_*` environment variables, off by default. Unfinished or risky features go behind a flag. Never add another flag mechanism.

## Commands

| Command | What it does |
| --- | --- |
| `pnpm install --frozen-lockfile` | Install exactly what the lockfile says |
| `pnpm lint` | ESLint, zero warnings allowed |
| `pnpm build` | Type check (`tsc -b`) and production build |
| `pnpm test` | Unit tests (Vitest, jsdom) |
| `pnpm e2e` | End-to-end tests (Playwright); builds and serves the app itself unless `E2E_BASE_URL` is set |

Run lint, build and test before you finish. Run `pnpm e2e` when you change a page or a user flow.

## Layout

- `src/pages/` one component per route (`/`, `/games`, `/settings`, `/about`), wired in `src/App.tsx`
- `src/components/` shared UI; `src/components/PrankCards.tsx` holds the dashboard cards
- `src/context/ChaosContext.tsx` app-wide state (clicks, visits, achievements, settings, toasts)
- `src/lib/` plain logic: `storage.ts` (localStorage), `data.ts` (static content), `sound.ts`
- `src/types.ts` shared types

## Rules

- Follow the existing style: function components, Tailwind classes, framer-motion for animation.
- Respect `settings.reducedMotion` for any new animation.
- Persist state only through `readStorage` / `writeStorage` with a key in `STORAGE_KEYS`.
- Tests: unit tests next to the code as `*.test.ts(x)`; end-to-end tests in `e2e/`. A fix comes with a test that fails without it.
- Never edit `.github/`, `.claude/`, `.github/pipeline.yml` or the lockfile by hand. Add or change dependencies only when the plan says so.
