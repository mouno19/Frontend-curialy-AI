# Curialy AI — source download

This is the source code for the Curialy AI mock landing page. The coding-agent run, workspace updates and waitlist confirmation are simulated; this download does not include a real coding agent or email collection service.

## Run locally

Requirements: Node.js 20+ and pnpm 10.18.0 (Corepack can provide pnpm).

```bash
corepack enable
corepack prepare pnpm@10.18.0 --activate
pnpm install --frozen-lockfile
pnpm dev:static
```

Open `http://localhost:3000`. To build static production files, run `pnpm build:static`; the output is in `dist/public`.

## Illustrations

The hero and launch illustrations currently use Manus-managed `/manus-storage/...` paths. They load in the Manus project/Preview, but those managed files are not embedded in this source archive. To run outside Manus with the same art, download the two images from the original project, put them under `client/public/images/`, then update `IMAGES` in `client/src/components/landing/content.ts` to `/images/hero.webp` and `/images/launch.webp`.

The fictional customer names, quotes, and metrics are sample landing-page copy, not real claims.
