# Shell Platform

A host micro-frontend shell built with **Vite**, **React 18**, **TypeScript**, and **`@originjs/vite-plugin-federation`**.

This project aims to provide a skeleton framework for a front end React application to act as a platform that can load smaller clients through module federation.

Extend this how you'd like!


## Quick Start

```bash
npm install
npm run dev        # starts on http://localhost:5000
```

## Project Structure

```
shell-platform/
├── src/
│   ├── bootstrap.tsx          # Async entry point (required by federation)
│   ├── main.tsx               # React root mount
│   ├── App.tsx                # Root component — auth + router setup
│   ├── components/
│   │   ├── Shell.tsx          # Persistent nav/layout chrome
│   │   ├── Shell.css
│   │   └── RemoteLoader.tsx   # Suspense + error boundary wrapper for remotes
│   ├── context/
│   │   └── AuthContext.tsx    # Shell-level auth state (user, token, login, logout)
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   └── NotFoundPage.tsx
│   ├── routes/
│   │   └── routes.tsx         # Central route definitions — add remote routes here
│   └── types/
│       └── federation.d.ts    # TypeScript declarations for remote module imports
├── docs/
│   └── REMOTE_SETUP.md        # How to create and register a remote app
├── vite.config.ts             # Federation plugin config — register remotes here
├── tsconfig.json
└── package.json
└── eslint.config.mjs          # eslint configuration

```

## Adding a Remote App

See [`docs/REMOTE_SETUP.md`](./docs/REMOTE_SETUP.md) for a step-by-step guide.

The short version — three files to touch in this shell:

| File | What to add |
|---|---|
| `vite.config.ts` | Entry in `remotes: {}` |
| `src/types/federation.d.ts` | `declare module` block |
| `src/routes/routes.tsx` | Route with `<RemoteLoader>` |

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server on port 5000 |
| `npm run build` | Type-check + Vite production build |
| `npm run preview` | Preview production build locally |
| `npm run type-check` | TypeScript check without building |
| `npm run test` | Runs tests, with coverage, within the project |
| `npm run lint` | Uses eslint with some sensible rules to lint the code |
| `npm run format` | Will attempt to fix formatting issues |
