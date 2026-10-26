import { ArrowUpRight } from "lucide-react";
import { CAPABILITIES } from "./content";
import { Reveal, SectionLabel } from "./primitives";

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative py-24 md:py-32">
      <div className="container grid grid-cols-12 gap-x-6 gap-y-12">
        {/* Sticky editorial column */}
        <div className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <SectionLabel index="01">Capabilities</SectionLabel>
              <h2 className="mt-6 font-display text-5xl leading-[0.95] tracking-[-0.02em] text-ink md:text-6xl">
                Five verbs.
                <br />
                <em className="text-vermilion">One</em> agent.
              </h2>
              <p className="mt-6 max-w-sm text-lg leading-relaxed text-ink-soft">
                Most AI tools autocomplete a line. Curialy owns the whole loop — from reading the
                ticket to handing you a deployed, tested pull request.
              </p>
              <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-rule px-4 py-2 font-mono text-[11.5px] text-ink-soft">
                <span className="h-2 w-2 rounded-full bg-moss" />
                Supports 40+ languages &amp; every major framework
              </div>
            </Reveal>
          </div>
        </div>

        {/* Capability ledger */}
        <ol className="col-span-12 border-t border-ink lg:col-span-8">
          {CAPABILITIES.map((cap, i) => (
            <Reveal as="li" key={cap.verb} delay={i * 0.05} className="group border-b border-rule">
              <div className="grid grid-cols-12 items-start gap-x-4 gap-y-3 py-8 transition-colors md:py-10">
                <span className="col-span-2 pt-3 font-mono text-[12px] text-graphite md:col-span-1">
                  0{i + 1}
                </span>
                <div className="col-span-10 md:col-span-4">
                  <h3 className="font-display text-5xl leading-none text-ink transition-colors group-hover:text-vermilion md:text-6xl">
                    {cap.verb}
                  </h3>
                </div>
                <div className="col-span-12 md:col-span-7 md:pt-2">
                  <p className="text-lg font-medium leading-snug text-ink">{cap.title}</p>
                  <p className="mt-2 leading-relaxed text-ink-soft">{cap.body}</p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <code className="rounded-md bg-ink px-2.5 py-1 font-mono text-[12px] text-paper/90">
                      <span className="text-vermilion">›</span> {cap.artifact}
                    </code>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-graphite transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-vermilion" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
