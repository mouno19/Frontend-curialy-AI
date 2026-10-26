/**
 * Copy and mock data for the Curialy AI landing page.
 * All companies, people and figures are fictional — this is a mock site.
 */

export const IMAGES = {
  hero: "/manus-storage/async-images/5mZYRlkmFBqP503fBq77p5/image-1.webp",
  launch: "/manus-storage/async-images/NzxfDGf9zMxCdVHsThOrR4/image-1.webp",
};

export const NAV_LINKS = [
  { href: "#capabilities", label: "Capabilities" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#workspace", label: "Workspace" },
  { href: "#use-cases", label: "Use cases" },
  { href: "#proof", label: "Customers" },
];

export const COMPOSER_EXAMPLES = [
  "Add Stripe checkout to our storefront and write tests for it",
  "Find out why /api/orders is slow under load and fix it",
  "Migrate the Express API to TypeScript, one module at a time",
  "Explain how auth works in this repo and draw me a diagram",
];

export const COMPOSER_SUGGESTIONS = [
  { label: "Build an app", prompt: "Build an internal dashboard for weekly signups with auth and CSV export" },
  { label: "Fix a bug", prompt: "Sentry #88213: TypeError in OrderSummary — reproduce, fix, add a regression test" },
  { label: "Write tests", prompt: "Raise test coverage of src/billing to 90% without changing behaviour" },
  { label: "Explain this repo", prompt: "Give me a guided tour of this monorepo for my first week on the team" },
];

export const RUN_STEPS = [
  { label: "Cloning repository", detail: "acme/storefront · 412 files indexed" },
  { label: "Reading context", detail: "README, 3 linked issues, package.json" },
  { label: "Drafting plan", detail: "plan.md · 5 steps · waiting for your OK" },
  { label: "Provisioning sandbox", detail: "node 22 · pnpm 10 · postgres 16" },
];

export const TRUSTED_BY = [
  { name: "Northwind", style: "font-sans font-semibold tracking-tight" },
  { name: "Halcyon Labs", style: "font-display italic text-[1.6rem]" },
  { name: "PARALLAX", style: "font-mono tracking-[0.3em] text-sm" },
  { name: "oakridge", style: "font-sans font-light lowercase tracking-wide" },
  { name: "Lumen & Co.", style: "font-display text-[1.6rem]" },
  { name: "VECTORFIELD", style: "font-sans font-bold tracking-[0.12em] text-sm" },
  { name: "Kestrel", style: "font-display italic text-[1.6rem]" },
  { name: "monolith/bank", style: "font-mono text-sm" },
];

export const CAPABILITIES = [
  {
    verb: "Plans",
    title: "Turns a vague ask into a reviewable plan.",
    body: "Curialy reads the repo, the issue and the docs, then writes a step-by-step plan you can edit before a single line changes.",
    artifact: "plan.md · 6 steps · 2 open questions",
  },
  {
    verb: "Codes",
    title: "Writes code that looks like your team wrote it.",
    body: "It follows your conventions, lint rules and folder structure — and keeps diffs small enough to actually review.",
    artifact: "+482 −37 across 14 files",
  },
  {
    verb: "Debugs",
    title: "Reads the stack trace so you don't have to.",
    body: "Reproduces failures in an isolated sandbox, bisects the cause across services and fixes the root, not the symptom.",
    artifact: "TypeError traced → cart.ts:88",
  },
  {
    verb: "Tests",
    title: "Proves it works before it asks for review.",
    body: "Runs your suite, writes the missing cases, and screenshots the UI so you can see the change, not just read it.",
    artifact: "127 tests · 0 failing · 2 added",
  },
  {
    verb: "Deploys",
    title: "Ships a live preview with every pull request.",
    body: "Builds, deploys to an ephemeral URL and opens a PR with a plain-English summary of what changed and why.",
    artifact: "live → pr-2481.curialy.app",
  },
];

export const STEPS = [
  {
    title: "You describe the outcome.",
    body: "Write the task the way you'd brief a senior engineer. Link an issue, paste a stack trace or drop in a Figma frame.",
    snippet: "“Add Stripe checkout. Keep discount codes working.”",
  },
  {
    title: "It investigates first.",
    body: "Curialy maps the codebase, reads related issues and asks only the questions that change the answer.",
    snippet: "? Should guest checkout be supported — yes / no",
  },
  {
    title: "It plans in the open.",
    body: "A plan.md lands in the thread. Approve it, edit it, or let Curialy run on full autonomy.",
    snippet: "plan.md ── 5 steps · est. 9 min",
  },
  {
    title: "It builds in its own sandbox.",
    body: "A private cloud computer with a real terminal, browser and runtime. It writes, runs, breaks and fixes — on its own.",
    snippet: "$ pnpm test  ✓ 14 passed",
  },
  {
    title: "It verifies the result.",
    body: "Tests, types, lint and visual checks run before anything reaches you. Uncertain parts are flagged, never hidden.",
    snippet: "⚑ 1 note: refund flow not covered by spec",
  },
  {
    title: "You review a finished PR.",
    body: "Summary, diff, test evidence and a live preview link — ready to merge, or to send back with a comment.",
    snippet: "PR #2481 · ready for review",
  },
];

export const TASK_PROGRESS = [
  { label: "Read repo & issue #2481", time: "0:42", state: "done" },
  { label: "Plan approved by @dana", time: "1:10", state: "done" },
  { label: "Install Stripe SDK", time: "1:31", state: "done" },
  { label: "Implement createSession()", time: "3:58", state: "done" },
  { label: "Fix failing discount test", time: "running", state: "active" },
  { label: "Deploy preview & open PR", time: "—", state: "pending" },
] as const;

export const DIFF_LINES: { kind: "ctx" | "add" | "del"; text: string }[] = [
  { kind: "ctx", text: 'import Stripe from "stripe";' },
  { kind: "add", text: 'import { getCart, applyDiscount } from "../cart";' },
  { kind: "ctx", text: "" },
  { kind: "ctx", text: "export async function createSession(userId: string) {" },
  { kind: "del", text: "  const total = cart.total;" },
  { kind: "add", text: "  const cart = await getCart(userId);" },
  { kind: "add", text: "  const items = cart.items.map(toLineItem);" },
  { kind: "add", text: "  const lineItems = applyDiscount(items, cart.code);" },
  { kind: "ctx", text: "  return stripe.checkout.sessions.create({" },
  { kind: "ctx", text: '    mode: "payment",' },
  { kind: "add", text: "    line_items: lineItems," },
  { kind: "add", text: "    success_url: `${origin}/thank-you`," },
  { kind: "ctx", text: "  });" },
  { kind: "ctx", text: "}" },
];

export const TERMINAL_LINES: { tone: "cmd" | "out" | "ok" | "err" | "agent"; text: string }[] = [
  { tone: "cmd", text: "$ pnpm add stripe @stripe/stripe-js" },
  { tone: "out", text: "  + stripe 17.4.0   + @stripe/stripe-js 5.2.0" },
  { tone: "cmd", text: "$ pnpm test checkout" },
  { tone: "ok", text: "  ✓ creates a session from cart line items (42ms)" },
  { tone: "ok", text: "  ✓ rejects empty carts (8ms)" },
  { tone: "err", text: "  ✗ applies discount codes — expected 16200, got 18000" },
  { tone: "agent", text: "  ● curialy: discount applied after tax → moving it before tax in cart.ts:88" },
  { tone: "cmd", text: "$ pnpm test checkout" },
  { tone: "ok", text: "  ✓ 14 passed · 0 failed · 1.9s" },
  { tone: "cmd", text: "$ curialy deploy --preview" },
  { tone: "ok", text: "  ▲ live → storefront-pr-2481.curialy.app" },
];

export const USE_CASES = [
  {
    id: "build",
    tab: "Build apps",
    headline: "From a paragraph to a deployed product.",
    prompt: "Build an internal dashboard that shows weekly signups from our Postgres DB, with SSO and CSV export.",
    outcomes: [
      "Scaffolds frontend, API and schema in your stack",
      "Wires auth, environment and secrets safely",
      "Deploys a live preview you can share in Slack",
    ],
    stat: { value: "38 min", label: "median time to first deploy" },
  },
  {
    id: "fix",
    tab: "Fix bugs",
    headline: "Paste the stack trace. Go get coffee.",
    prompt: "Sentry #88213: TypeError: cannot read 'id' of undefined in OrderSummary. Fix it and add a regression test.",
    outcomes: [
      "Reproduces the failure in an isolated sandbox",
      "Traces the root cause across services and commits",
      "Ships the fix together with a regression test",
    ],
    stat: { value: "71%", label: "of bug tickets merged without edits" },
  },
  {
    id: "automate",
    tab: "Automate engineering work",
    headline: "The chores, handled on a schedule.",
    prompt: "Every Monday, bump minor dependencies, run the full suite, and open one PR per package that passes.",
    outcomes: [
      "Dependency upgrades, codemods and migrations",
      "Flaky-test triage and lint-debt cleanup",
      "Release notes drafted from merged PRs",
    ],
    stat: { value: "11 hrs", label: "reclaimed per engineer, per week" },
  },
  {
    id: "understand",
    tab: "Understand codebases",
    headline: "A guided tour of code nobody remembers writing.",
    prompt: "Explain how a payment flows through this monorepo, then draw the sequence diagram.",
    outcomes: [
      "Architecture maps and sequence diagrams",
      "Answers with file-and-line citations",
      "Onboarding docs that stay in sync with main",
    ],
    stat: { value: "2 hrs", label: "to a new hire's first meaningful PR" },
  },
];

export const METRICS = [
  { value: "4,200+", label: "engineering teams shipping with Curialy" },
  { value: "2.1M", label: "pull requests opened by the agent" },
  { value: "3.8×", label: "faster from issue to merged PR" },
  { value: "71%", label: "of agent PRs merged without human edits" },
];

export const QUOTES = [
  {
    quote:
      "We stopped writing tickets for humans first. Curialy takes the first pass on everything — and half the time, the first pass is the merge.",
    name: "Priya Natarajan",
    role: "Staff Engineer, Halcyon Labs",
    initials: "PN",
  },
  {
    quote:
      "It's the first agent that tells me what it's unsure about. That's exactly why I trust the parts it is sure about.",
    name: "Marcus Oyelaran",
    role: "CTO, Parallax",
    initials: "MO",
  },
  {
    quote:
      "On-call got quieter within a month. Curialy has reproduced the incident before I've finished reading the alert.",
    name: "Lena Hoffmann",
    role: "Engineering Manager, Kestrel Mobility",
    initials: "LH",
  },
];

export const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: ["Agent", "Workspace", "Integrations", "Pricing", "Changelog"],
  },
  {
    title: "Resources",
    links: ["Documentation", "API reference", "Guides", "Status", "Community"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Press kit", "Contact"],
  },
  {
    title: "Legal",
    links: ["Terms of service", "Privacy policy", "Security", "DPA", "Cookie settings"],
  },
];
