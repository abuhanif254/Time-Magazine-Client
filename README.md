# Time Magazine Client (Vite + React)

Frontend for the Time Magazine project. Built with Vite + React, styled with Tailwind CSS, and connected to the Express API in `../server`.

## What’s inside

- **Pages**: Home, Articles, Categories, Trending, Login, NotFound
- **UI features**:
  - Theme toggle (light/dark)
  - News ticker (realtime via SSE)
  - Project chat widget
  - Social share buttons
  - Live date & time in header

## Requirements

- Node.js + npm

## Setup

```bash
cd client
npm install --legacy-peer-deps
```

## Run (development)

```bash
npm run dev
```

Vite prints a local URL (example: `http://localhost:5173`).

## Environment variables

Create `client/.env` if you want to change which API the client uses:

```env
VITE_API_BASE_URL=http://localhost:5000
```

## Scripts

- `npm run dev` - start dev server
- `npm run build` - typecheck + production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint

## Notes

- If you see API request errors, ensure the server is running at `VITE_API_BASE_URL`.

