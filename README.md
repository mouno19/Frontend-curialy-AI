# Frontend-curialy-AI — Curialy AI Landing Page

Source code for the Curialy AI mock landing page, a responsive marketing site for a fictional autonomous coding agent.

## Run locally

Requirements: Node.js 20+ and pnpm 10.18.0.

```bash
corepack enable
corepack prepare pnpm@10.18.0 --activate
pnpm install --frozen-lockfile
pnpm dev:static
```

Open `http://localhost:3000`. To create a static production build, run `pnpm build:static`.

## What is mocked

The coding-agent run, workspace progress and waitlist confirmation are front-end demonstrations; there is no real coding agent or email collection service. Customer names, quotes and metrics are fictional sample content.

## Illustrations

The hero and launch illustrations reference Manus-managed `/manus-storage/...` paths and are not included in this repository. For standalone hosting, copy those images to `client/public/images/` and update the `IMAGES` values in `client/src/components/landing/content.ts`.

See [START_HERE.md](START_HERE.md) for further setup notes.
