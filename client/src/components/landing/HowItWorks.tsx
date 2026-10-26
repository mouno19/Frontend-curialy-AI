import { cn } from "@/lib/utils";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { STEPS } from "./content";
import { Reveal, SectionLabel } from "./primitives";

export default function HowItWorks() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 60%"],
  });
  const spine = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section id="how-it-works" className="relative border-t border-rule bg-paper-deep/40 py-24 md:py-32">
      <div className="container">
        <div className="grid grid-cols-12 gap-x-6">
          <Reveal className="col-span-12 lg:col-span-7">
            <SectionLabel index="02">How it works</SectionLabel>
            <h2 className="mt-6 font-display text-5xl leading-[0.95] tracking-[-0.02em] text-ink md:text-7xl">
              From one sentence
              <br />
              to <em className="text-vermilion">shipped</em> software.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="col-span-12 mt-6 lg:col-span-4 lg:col-start-9 lg:mt-auto">
            <p className="text-lg leading-relaxed text-ink-soft">
              Curialy works like a careful senior engineer: it looks before it leaps, shows its
              plan, and never asks you to review something it hasn't run.
            </p>
          </Reveal>
        </div>

        <ol ref={listRef} className="relative mt-16 md:mt-20">
          {/* Spine */}
          <div className="absolute bottom-2 left-[19px] top-2 w-px bg-rule md:left-1/2" aria-hidden />
          <motion.div
            aria-hidden
            style={{ scaleY: reduce ? 1 : spine }}
            className="absolute bottom-2 left-[19px] top-2 w-px origin-top bg-vermilion md:left-1/2"
          />

          {STEPS.map((step, i) => {
            const right = i % 2 === 1;
            return (
              <li key={step.title} className="relative grid grid-cols-1 pb-14 last:pb-0 md:grid-cols-2 md:pb-20">
                {/* Node */}
                <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-ink bg-paper font-mono text-[12px] text-ink md:left-1/2 md:-translate-x-1/2">
                  0{i + 1}
                </span>

                <Reveal
                  delay={0.05}
                  className={cn(
                    "pl-16 md:pl-0",
                    right ? "md:col-start-2 md:pl-16" : "md:pr-16 md:text-right",
                  )}
                >
                  <h3 className="font-display text-3xl leading-tight text-ink md:text-4xl">
                    {step.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-3 max-w-md leading-relaxed text-ink-soft",
                      !right && "md:ml-auto",
                    )}
                  >
                    {step.body}
                  </p>
                  <code
                    className={cn(
                      "mt-5 inline-block rounded-md border border-dashed border-ink/40 bg-paper px-3 py-1.5 font-mono text-[12.5px] text-ink",
                    )}
                  >
                    {step.snippet}
                  </code>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
