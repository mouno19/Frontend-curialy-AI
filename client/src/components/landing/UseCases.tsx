import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CornerDownRight } from "lucide-react";
import { useState } from "react";
import { USE_CASES } from "./content";
import { Reveal, SectionLabel } from "./primitives";

export default function UseCases() {
  const [activeId, setActiveId] = useState(USE_CASES[0].id);
  const active = USE_CASES.find(u => u.id === activeId) ?? USE_CASES[0];

  return (
    <section id="use-cases" className="relative py-24 md:py-32">
      <div className="container">
        <Reveal className="max-w-3xl">
          <SectionLabel index="04">Use cases</SectionLabel>
          <h2 className="mt-6 font-display text-5xl leading-[0.95] tracking-[-0.02em] text-ink md:text-7xl">
            What teams hand
            <br />
            to <em className="text-vermilion">Curialy</em> first.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-8 md:mt-20">
          {/* Tab index */}
          <div
            role="tablist"
            aria-label="Use cases"
            className="col-span-12 flex gap-2 overflow-x-auto pb-1 lg:col-span-4 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-ink"
          >
            {USE_CASES.map((u, i) => {
              const selected = u.id === activeId;
              return (
                <button
                  key={u.id}
                  role="tab"
                  id={`tab-${u.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${u.id}`}
                  onClick={() => setActiveId(u.id)}
                  className={cn(
                    "group flex shrink-0 items-center justify-between gap-6 rounded-full border px-4 py-2 text-left transition-colors lg:rounded-none lg:border-0 lg:border-b lg:border-rule lg:px-0 lg:py-6",
                    selected ? "border-ink bg-ink text-paper lg:bg-transparent lg:text-ink" : "border-rule text-ink-soft hover:text-ink",
                  )}
                >
                  <span className="flex items-baseline gap-4">
                    <span className={cn("hidden font-mono text-[12px] lg:inline", selected ? "text-vermilion" : "text-graphite")}>
                      0{i + 1}
                    </span>
                    <span className="whitespace-nowrap text-[15px] lg:font-display lg:text-[2rem] lg:leading-none">
                      {u.tab}
                    </span>
                  </span>
                  <ArrowRight
                    className={cn(
                      "hidden h-5 w-5 transition-all lg:block",
                      selected ? "translate-x-0 text-vermilion opacity-100" : "-translate-x-2 opacity-0 group-hover:opacity-60",
                    )}
                  />
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                id={`panel-${active.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${active.id}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <p className="font-display text-4xl leading-[1.05] text-ink md:text-5xl">{active.headline}</p>

                <figure className="mt-8 rounded-xl border border-ink bg-[#fbf9f4] p-5">
                  <figcaption className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-graphite">
                    Example task
                  </figcaption>
                  <blockquote className="mt-2 font-mono text-[14px] leading-relaxed text-ink">
                    <span className="text-vermilion">› </span>
                    {active.prompt}
                  </blockquote>
                </figure>

                <div className="mt-8 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
                  <ul className="space-y-3">
                    {active.outcomes.map(o => (
                      <li key={o} className="flex items-start gap-3 text-ink-soft">
                        <CornerDownRight className="mt-1 h-4 w-4 shrink-0 text-vermilion" />
                        <span className="text-[16px]">{o}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-l-2 border-vermilion pl-4 sm:text-right sm:border-l-0 sm:border-r-2 sm:pl-0 sm:pr-4">
                    <p className="font-display text-6xl leading-none text-ink">{active.stat.value}</p>
                    <p className="mt-2 max-w-[13rem] font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-graphite sm:ml-auto">
                      {active.stat.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
