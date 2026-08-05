# HUYNH THUONG Casino

Vietnamese online casino web app with a full-featured mobile-first UI.

## Run & Operate

- `PORT=20531 BASE_PATH=/ pnpm --filter @workspace/vie999 run dev` — run the frontend (port 20531)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- Required env: `DATABASE_URL` — Postgres connection string (API server only)

## Stack

- pnpm workspaces, Node.js 20, TypeScript 5.9
- Frontend: React 18 + Vite + Tailwind CSS v4 + shadcn/ui + wouter routing
- Animations: Framer Motion
- Carousel: Embla Carousel
- API: Express 5 + Drizzle ORM
- DB: PostgreSQL (not yet required for frontend)

## Where things live

- `artifacts/vie999/` — main React/Vite frontend
- `artifacts/vie999/src/pages/` — all route pages (home, promotions, deposit, withdrawal, profile, history, login, register)
- `artifacts/vie999/src/components/layout/layout.tsx` — shared layout with header, drawer, bottom nav
- `artifacts/vie999/src/index.css` — global styles + CSS variables
- `artifacts/api-server/` — Express 5 backend (not yet needed for frontend)
- `index.html` — standalone vanilla HTML prototype at project root (reference only)

## Routes

| Path | Page |
|------|------|
| `/` | Home — banner, jackpot, quick actions, game hall tabs |
| `/promotions` | Promotions — cards with bottom-sheet detail |
| `/deposit` | Deposit — amount picker, bank/ewallet, confirm |
| `/withdrawal` | Withdrawal — amount picker, bank/ewallet, confirm |
| `/profile` | Profile — VIP progress, account info, menu |
| `/history` | History — grouped transactions with filter tabs |
| `/login` | Login |
| `/register` | Register |

## Design System

- Background: `#0D0D1A` (dark), `#13131F` (main), `#1A1A2E` (card)
- Gold: `#C9A84C` / `#F5D787` (gradient)
- Red: `#C0272D` / `#E85D5D`
- Font: Oswald (headings), Roboto (body)
- Mobile-first, max-width 480px

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Vite must read `PORT` env var from the workflow command: `PORT=20531 BASE_PATH=/ pnpm --filter @workspace/vie999 run dev`
- The API server requires `DATABASE_URL` to start; frontend works independently without it
