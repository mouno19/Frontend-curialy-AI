import { FOOTER_COLUMNS } from "./content";
import { Wordmark } from "./Logo";

export default function Footer() {
  return (
    <footer className="relative border-t border-ink bg-paper pt-16 md:pt-20">
      <div className="container">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 lg:col-span-4">
            <Wordmark />
            <p className="mt-5 max-w-xs leading-relaxed text-ink-soft">
              The autonomous coding agent for teams who would rather review than type.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 font-mono text-[11.5px] text-graphite">
              <span className="h-2 w-2 rounded-full bg-moss" />
              All systems curious
            </p>
          </div>

          <nav aria-label="Footer" className="col-span-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-8">
            {FOOTER_COLUMNS.map(col => (
              <div key={col.title}>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-vermilion">{col.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map(link => (
                    <li key={link}>
                      <a href="#top" className="ink-link text-[14.5px] text-ink-soft transition-colors hover:text-ink">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Oversized closing wordmark */}
        <div className="mt-20 overflow-hidden border-t border-rule pb-6 pt-8" aria-hidden>
          <p className="select-none whitespace-nowrap font-display text-[clamp(5rem,24vw,21rem)] leading-[0.9] tracking-[-0.03em] text-ink">
            curialy<span className="text-vermilion">.</span>
          </p>
        </div>

        <div className="flex flex-col gap-3 border-t border-rule py-6 font-mono text-[11.5px] text-graphite sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Curialy AI, Inc. — a mock landing page.</p>
          <p>Made with curiosity, compiled with care.</p>
        </div>
      </div>
    </footer>
  );
}
