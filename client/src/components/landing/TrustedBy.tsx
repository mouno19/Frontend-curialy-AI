import { cn } from "@/lib/utils";
import { TRUSTED_BY } from "./content";

export default function TrustedBy() {
  const row = [...TRUSTED_BY, ...TRUSTED_BY];
  return (
    <section aria-label="Teams using Curialy" className="border-y border-rule bg-paper-deep/50">
      <div className="container flex flex-col gap-4 py-7 md:flex-row md:items-center md:gap-10">
        <p className="shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-graphite md:w-48">
          Shipping inside 4,200+ teams
          <span className="block normal-case tracking-normal text-graphite/70">
            (fictional, for this mock)
          </span>
        </p>
        <div className="marquee relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <ul className="marquee-track flex w-max items-center gap-14">
            {row.map((brand, i) => (
              <li
                key={`${brand.name}-${i}`}
                aria-hidden={i >= TRUSTED_BY.length}
                className={cn("whitespace-nowrap text-xl text-ink/70", brand.style)}
              >
                {brand.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
