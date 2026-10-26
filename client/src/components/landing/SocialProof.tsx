import { METRICS, QUOTES } from "./content";
import { Reveal, SectionLabel } from "./primitives";

export default function SocialProof() {
  const [lead, ...rest] = QUOTES;

  return (
    <section id="proof" className="relative border-t border-rule bg-paper-deep/40 py-24 md:py-32">
      <div className="container">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel index="05">Customers</SectionLabel>
            <h2 className="mt-6 font-display text-5xl leading-[0.95] tracking-[-0.02em] text-ink md:text-7xl">
              Trusted with the
              <br />
              <em className="text-vermilion">whole</em> ticket.
            </h2>
          </div>
          <p className="max-w-xs font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-graphite">
            Figures, companies and people on this page are illustrative — it's a mock.
          </p>
        </Reveal>

        {/* Metrics ledger */}
        <dl className="mt-14 grid grid-cols-2 border-t border-ink md:mt-20 lg:grid-cols-4">
          {METRICS.map((m, i) => (
            <Reveal
              key={m.label}
              delay={i * 0.06}
              className="border-b border-rule py-8 pr-6 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0"
            >
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <span className="block font-display text-6xl leading-none text-ink md:text-7xl">{m.value}</span>
                <span className="mt-3 block max-w-[14rem] text-[14px] leading-snug text-ink-soft">{m.label}</span>
              </dd>
            </Reveal>
          ))}
        </dl>

        {/* Quotes: one pull quote, two marginal quotes */}
        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-12 md:mt-24">
          <Reveal className="col-span-12 lg:col-span-7">
            <figure>
              <span className="block font-display text-[7rem] leading-[0.6] text-vermilion" aria-hidden>
                “
              </span>
              <blockquote className="font-display text-4xl leading-[1.1] text-ink md:text-5xl">
                {lead.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink font-mono text-[12px] text-paper">
                  {lead.initials}
                </span>
                <span>
                  <span className="block font-medium text-ink">{lead.name}</span>
                  <span className="block text-[14px] text-graphite">{lead.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="col-span-12 flex flex-col gap-6 lg:col-span-4 lg:col-start-9">
            {rest.map((q, i) => (
              <Reveal key={q.name} delay={0.08 * (i + 1)}>
                <figure className="relative rounded-xl border border-ink bg-[#fbf9f4] p-6">
                  <blockquote className="text-[16.5px] leading-relaxed text-ink">“{q.quote}”</blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 border-t border-dashed border-rule pt-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ink font-mono text-[11px] text-ink">
                      {q.initials}
                    </span>
                    <span className="text-[13.5px]">
                      <span className="block font-medium text-ink">{q.name}</span>
                      <span className="block text-graphite">{q.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
