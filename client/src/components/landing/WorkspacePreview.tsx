import { cn } from "@/lib/utils";
import { useInView, useReducedMotion } from "framer-motion";
import { Check, Circle, ExternalLink, FileCode2, Globe, Loader2, Lock, RefreshCw, TerminalSquare } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DIFF_LINES, TASK_PROGRESS, TERMINAL_LINES } from "./content";
import { Reveal, SectionLabel } from "./primitives";

const terminalTone: Record<(typeof TERMINAL_LINES)[number]["tone"], string> = {
  cmd: "text-paper",
  out: "text-paper/50",
  ok: "text-[#9bd17b]",
  err: "text-[#ff8a6b]",
  agent: "text-vermilion",
};

/** Reveals terminal lines one by one while visible, then loops. */
function useTerminalPlayback(active: boolean, reduce: boolean | null) {
  const [count, setCount] = useState(reduce ? TERMINAL_LINES.length : 0);

  useEffect(() => {
    if (reduce || !active) return;
    const finished = count >= TERMINAL_LINES.length;
    const timer = setTimeout(
      () => setCount(c => (c >= TERMINAL_LINES.length ? 0 : c + 1)),
      finished ? 3200 : 520 + Math.random() * 380,
    );
    return () => clearTimeout(timer);
  }, [active, count, reduce]);

  return count;
}

function PanelHeader({ icon: Icon, title, meta }: { icon: typeof FileCode2; title: string; meta?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-paper/10 px-4 py-2.5">
      <div className="flex items-center gap-2 font-mono text-[11.5px] text-paper/70">
        <Icon className="h-3.5 w-3.5" />
        {title}
      </div>
      {meta && <span className="font-mono text-[10.5px] text-paper/40">{meta}</span>}
    </div>
  );
}

export default function WorkspacePreview() {
  const windowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(windowRef, { margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const lines = useTerminalPlayback(inView, reduce);
  const deployed = lines >= TERMINAL_LINES.length;

  return (
    <section id="workspace" className="relative overflow-hidden bg-ink py-24 text-paper md:py-32">
      <div className="grid-paper-dark absolute inset-0" aria-hidden />
      <div className="container relative">
        <div className="grid grid-cols-12 gap-x-6">
          <Reveal className="col-span-12 lg:col-span-7">
            <SectionLabel index="03" tone="paper">
              The workspace
            </SectionLabel>
            <h2 className="mt-6 font-display text-5xl leading-[0.95] tracking-[-0.02em] md:text-7xl">
              Watch it work.
              <br />
              <em className="text-vermilion">Or don't</em> — it leaves notes.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="col-span-12 mt-6 lg:col-span-4 lg:col-start-9 lg:mt-auto">
            <p className="text-lg leading-relaxed text-paper/70">
              Every task gets a live, shareable workspace: the plan, every file it touched, every
              command it ran and the running result — streamed as it happens.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={40}>
          <div
            ref={windowRef}
            className="mt-14 overflow-hidden rounded-2xl border border-paper/15 bg-[#1b1a15] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)] md:mt-20"
          >
            {/* Window chrome */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-paper/10 bg-[#211f19] px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]/80" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]/80" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]/80" />
                </div>
                <p className="font-mono text-[12px] text-paper/70">
                  <span className="text-paper/40">curialy ›</span> task #2481 — Add Stripe checkout to storefront
                </p>
              </div>
              <span
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[11px]",
                  deployed ? "bg-[#9bd17b]/15 text-[#9bd17b]" : "bg-vermilion/15 text-vermilion",
                )}
              >
                <span className={cn("h-1.5 w-1.5 rounded-full", deployed ? "bg-[#9bd17b]" : "bg-vermilion animate-pulse")} />
                {deployed ? "Ready for review · 09:12" : "Running · 06:42"}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Task progress */}
              <aside className="border-b border-paper/10 p-5 lg:col-span-3 lg:border-b-0 lg:border-r">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-paper/40">Task progress</p>
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-paper/10">
                  <div
                    className="h-full rounded-full bg-vermilion transition-[width] duration-700"
                    style={{ width: deployed ? "100%" : "72%" }}
                  />
                </div>
                <ul className="mt-5 space-y-3.5">
                  {TASK_PROGRESS.map(step => {
                    const state = deployed ? "done" : step.state;
                    return (
                      <li key={step.label} className="flex items-start gap-2.5 text-[13px]">
                        {state === "done" && <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#9bd17b]" />}
                        {state === "active" && <Loader2 className="mt-0.5 h-4 w-4 shrink-0 animate-spin text-vermilion" />}
                        {state === "pending" && <Circle className="mt-0.5 h-4 w-4 shrink-0 text-paper/30" />}
                        <span className="flex-1">
                          <span className={state === "pending" ? "text-paper/40" : "text-paper/85"}>
                            {step.label}
                          </span>
                          <span className="block font-mono text-[10.5px] text-paper/35">
                            {deployed && step.state !== "done" ? "done" : step.time}
                          </span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-6 rounded-lg border border-dashed border-vermilion/40 bg-vermilion/[0.06] p-3 text-[12.5px] leading-relaxed text-paper/75">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-vermilion">Agent note</p>
                  <p className="mt-1.5">
                    Found a pre-existing bug: discounts were applied after tax. Fixed it and added a regression test.
                  </p>
                </div>
              </aside>

              {/* Code + terminal */}
              <div className="flex min-w-0 flex-col border-b border-paper/10 lg:col-span-6 lg:border-b-0 lg:border-r">
                <PanelHeader icon={FileCode2} title="src/checkout/session.ts" meta="+7 −1" />
                <pre className="overflow-x-auto py-3 font-mono text-[12.5px] leading-[1.75]">
                  {DIFF_LINES.map((line, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex min-w-max px-4",
                        line.kind === "add" && "bg-[#9bd17b]/[0.09]",
                        line.kind === "del" && "bg-[#ff8a6b]/[0.09]",
                      )}
                    >
                      <span className="w-8 shrink-0 select-none text-right text-paper/25">{i + 1}</span>
                      <span
                        className={cn(
                          "w-6 shrink-0 select-none text-center",
                          line.kind === "add" && "text-[#9bd17b]",
                          line.kind === "del" && "text-[#ff8a6b]",
                          line.kind === "ctx" && "text-paper/20",
                        )}
                      >
                        {line.kind === "add" ? "+" : line.kind === "del" ? "−" : " "}
                      </span>
                      <span
                        className={cn(
                          line.kind === "add" && "text-[#d6efc6]",
                          line.kind === "del" && "text-[#ffc1b0] line-through decoration-[#ff8a6b]/50",
                          line.kind === "ctx" && "text-paper/60",
                        )}
                      >
                        {line.text || " "}
                      </span>
                    </div>
                  ))}
                </pre>

                <div className="mt-auto border-t border-paper/10 bg-[#141310]">
                  <PanelHeader icon={TerminalSquare} title="terminal — sandbox-7f3a" meta="node 22 · ubuntu" />
                  <div className="h-[244px] overflow-hidden px-4 py-3 font-mono text-[12.5px] leading-[1.75]" aria-live="off">
                    {TERMINAL_LINES.slice(0, lines).map((line, i) => (
                      <p key={i} className={cn("whitespace-pre-wrap break-words", terminalTone[line.tone])}>
                        {line.text}
                      </p>
                    ))}
                    {!deployed && <span className="caret text-paper/70" />}
                  </div>
                </div>
              </div>

              {/* Live result */}
              <div className="flex flex-col p-5 lg:col-span-3">
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-paper/40">
                    <Globe className="h-3.5 w-3.5" /> Live result
                  </p>
                  <RefreshCw className={cn("h-3.5 w-3.5 text-paper/40", !deployed && !reduce && "animate-spin [animation-duration:3s]")} />
                </div>
                <div className="mt-3 overflow-hidden rounded-xl border border-paper/15 bg-paper text-ink">
                  <div className="flex items-center gap-1.5 border-b border-rule bg-paper-deep px-3 py-2 font-mono text-[10px] text-graphite">
                    <Lock className="h-3 w-3" />
                    <span className="truncate">pr-2481.curialy.app/checkout</span>
                  </div>
                  <div className="p-4">
                    <p className="font-display text-xl leading-none">Checkout</p>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="h-12 w-12 shrink-0 rounded-md bg-[linear-gradient(135deg,#c9b99a,#8a7a5c)]" />
                      <div className="min-w-0 flex-1 text-[12px]">
                        <p className="truncate font-medium">Field Notes Jacket</p>
                        <p className="text-graphite">Size M · Oat</p>
                      </div>
                      <p className="text-[12px] font-medium">$180</p>
                    </div>
                    <div className="mt-4 space-y-1.5 border-t border-dashed border-rule pt-3 text-[12px]">
                      <div className="flex justify-between text-graphite">
                        <span>Discount · CURIOUS10</span>
                        <span className="text-moss">−$18.00</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>$162.00</span>
                      </div>
                    </div>
                    <div className="mt-4 rounded-md bg-ink py-2 text-center text-[12px] font-medium text-paper">
                      Pay with Stripe
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-2 font-mono text-[11px] text-paper/55">
                  <p className="flex justify-between"><span>tests</span><span className={deployed ? "text-[#9bd17b]" : ""}>{deployed ? "14 / 14 ✓" : "12 / 14"}</span></p>
                  <p className="flex justify-between"><span>types</span><span className="text-[#9bd17b]">clean</span></p>
                  <p className="flex justify-between"><span>lighthouse</span><span>98</span></p>
                </div>
                <a
                  href="#waitlist"
                  className="mt-auto inline-flex items-center justify-center gap-2 rounded-full border border-paper/20 px-4 py-2 pt-2 text-[12.5px] text-paper/80 transition-colors hover:border-vermilion hover:text-paper max-lg:mt-5 lg:mt-6"
                >
                  Open pull request <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
