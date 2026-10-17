# Tabdeal Aparat Videos

Production-ready Next.js frontend for [Tabdeal](https://tabdeal.org)'s official Aparat channel (`tabdealplatform`).

## Features

- Server-rendered video listing from Tabdeal's Aparat channel
- Title search across the entire channel (server-side catalog filter)
- Pagination synchronized with URL search params (`q`, `page`)
- Video detail pages with Aparat embed player
- Feature-based architecture with shared UI primitives
- RTL Persian UI aligned with the provided Figma dark theme
- Responsive layouts for desktop, tablet, and mobile

## Tech stack

- Next.js 15 (App Router) + React 19
- TypeScript (strict)
- Tailwind CSS v4
- Axios

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Key | Description | Default |
| --- | --- | --- |
| `APARAT_CHANNEL_USERNAME` | Aparat channel username | `tabdealplatform` |
| `APARAT_API_BASE_URL` | Aparat API origin | `https://www.aparat.com` |
| `APARAT_PER_PAGE` | Videos per page | `12` |
| `NEXT_PUBLIC_SITE_URL` | Public site URL for metadata | `http://localhost:3000` |

No API secrets are required for the public Aparat read endpoints used here.

## Scripts

```bash
npm run dev      # local development
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint
```

## Architecture

```text
src/
├── app/                    # routes (SSR composition)
├── features/videos/        # API, components, hooks, types, utils
├── shared/                 # ui, layout, lib, config
└── styles/globals.css      # design tokens + typography
```

## Aparat API notes

- Listing uses `videoByUser` with `perpage` + `curoffset` pagination.
- Detail uses `video` with `videohash`.
- Channel profile uses `profile`.
- Aparat does not expose channel-scoped title search. Search loads the channel catalog on the server (cached ~5 minutes), filters by title, then paginates results.

## Design assumptions

Figma MCP edit access was unavailable for pixel extraction. Visual implementation follows the publicly viewable Figma frames:

- Dark surface background
- Yellow accent for search CTA and active pagination
- Aparat-branded header
- 3-column desktop grid, collapsing to 1/2 columns on smaller screens
- RTL layout with Vazirmatn
