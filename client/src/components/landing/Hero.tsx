import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { IMAGES } from "./content";
import PromptComposer from "./PromptComposer";
import { SectionLabel } from "./primitives";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, ease, delay },
        };

  return (
    <section id="top" className="grain relative overflow-hidden pb-20 pt-28 md:pb-28 md:pt-36">
      <div className="grid-paper fade-mask absolute inset-0 -z-10" aria-hidden />

      <div className="container relative grid grid-cols-12 gap-x-6">
        <div className="col-span-12 lg:col-span-8">
          <motion.div {...enter(0)} className="flex flex-wrap items-center gap-4">
            <SectionLabel index="00">Autonomous coding agent</SectionLabel>
            <a
              href="#waitlist"
              className="inline-flex items-center gap-2 rounded-full border border-rule bg-paper/70 px-3 py-1 font-mono text-[11px] text-ink-soft transition-colors hover:border-ink"
            >
              <span className="rounded-full bg-vermilion px-1.5 py-px text-[10px] font-medium text-paper">
                NEW
              </span>
              v2.4 — public beta
            </a>
          </motion.div>

          <motion.h1
            {...enter(0.08)}
            className="mt-7 font-display text-[clamp(3.1rem,8.2vw,7.6rem)] leading-[0.9] tracking-[-0.025em] text-ink"
          >
            Hand it the ticket.
            <br />
            Get back a <em className="text-vermilion">shipped</em>
            <br className="hidden sm:block" /> pull request.
          </motion.h1>

          <motion.p
            {...enter(0.18)}
            className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl"
          >
            Curialy AI is the autonomous coding agent that plans, writes, debugs, tests and deploys
            real software inside its own cloud workspace — so your team reviews instead of types.
          </motion.p>

          <motion.div {...enter(0.26)} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#composer"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-medium text-paper transition-colors hover:bg-vermilion"
            >
              Assign your first task
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#workspace"
              className="group inline-flex items-center gap-2.5 rounded-full border border-ink/80 px-5 py-3.5 font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-vermilion text-paper">
                <Play className="h-3 w-3 fill-current" />
              </span>
              Watch a 90-second run
            </a>
          </motion.div>
          <motion.p
            {...enter(0.32)}
            className="mt-5 font-mono text-[11.5px] text-graphite"
          >
            No credit card · Works with GitHub, GitLab &amp; Bitbucket · SOC 2 Type II
          </motion.p>
        </div>

        {/* Figure 1 — hero illustration with marginal annotation */}
        <motion.figure
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease, delay: 0.2 }}
          className="relative col-span-12 mx-auto mt-12 w-full max-w-sm lg:col-span-4 lg:mt-0 lg:max-w-none"
        >
          <img
            src={IMAGES.hero}
            alt="Engraved illustration of a spiral of code unfurling into a software structure, with a vermilion spark at its center"
            className="relative z-0 w-full select-none object-contain lg:mt-4"
            draggable={false}
          />
          <figcaption className="mt-2 border-t border-ink/70 pt-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-graphite">
            Fig. 1 — A request, unfurling into software
          </figcaption>
        </motion.figure>

        <motion.div
          {...enter(0.4)}
          className="col-span-12 mt-14 lg:col-span-8 lg:mt-16"
        >
          <PromptComposer />
        </motion.div>

        <motion.aside
          {...enter(0.5)}
          className="col-span-12 mt-10 hidden self-end lg:col-span-3 lg:col-start-10 lg:mt-0 lg:block"
        >
          <div className="border-l border-ink/70 pl-5 font-mono text-[11.5px] leading-relaxed text-ink-soft">
            <p className="text-vermilion">margin note</p>
            <p className="mt-2">
              Every task runs on a private cloud computer — real terminal, real browser, real
              runtime. Nothing touches your machine until you merge.
            </p>
            <p className="mt-4 text-graphite">avg. run · 9m 12s</p>
            <p className="text-graphite">median diff · 186 lines</p>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
