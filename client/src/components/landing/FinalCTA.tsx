import { ArrowRight, Check } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { IMAGES } from "./content";
import { Reveal, SectionLabel } from "./primitives";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function FinalCTA() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [joined, setJoined] = useState(false);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const value = email.trim();
    if (!EMAIL_PATTERN.test(value)) {
      setError("That doesn't look like a work email yet — mind checking it?");
      return;
    }
    setError("");
    setJoined(true);
    toast.success("You're on the list.", {
      description: `We'll write to ${value} the moment your seat opens.`,
    });
  };

  return (
    <section id="waitlist" className="relative overflow-hidden py-24 md:py-32">
      <div className="container">
        <Reveal y={30}>
          <div className="relative overflow-hidden rounded-3xl border border-ink bg-[#f7f3ea]">
            <img
              src={IMAGES.launch}
              alt="Engraved illustration of a paper airplane folded from printed code, launching from a desk and trailing a vermilion line toward a skyline"
              className="aspect-[21/9] w-full object-cover mix-blend-multiply"
              loading="lazy"
            />

            <div className="grid grid-cols-12 gap-x-6 gap-y-10 border-t border-ink p-6 md:p-12">
              <div className="col-span-12 lg:col-span-7">
                <SectionLabel index="06">Start shipping</SectionLabel>
                <h2 className="mt-6 font-display text-5xl leading-[0.95] tracking-[-0.02em] text-ink md:text-7xl">
                  Your backlog called.
                  <br />
                  <em className="text-vermilion">Curialy</em> picked up.
                </h2>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
                  Seats in the public beta open every week. Join the waitlist, connect a repo, and hand
                  over your first ticket in under five minutes.
                </p>
              </div>

              <div className="col-span-12 lg:col-span-5 lg:self-end">
                {joined ? (
                  <div className="rounded-2xl bg-ink p-6 text-paper">
                    <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-vermilion">
                      <Check className="h-4 w-4" /> Confirmed
                    </p>
                    <p className="mt-3 font-display text-3xl leading-tight">You're on the list.</p>
                    <p className="mt-2 text-paper/70">
                      While you wait, assign a mock task to the composer at the top of the page.
                    </p>
                    <a
                      href="#composer"
                      className="mt-5 inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-vermilion hover:text-paper"
                    >
                      Try the demo <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} noValidate>
                    <label htmlFor="waitlist-email" className="font-mono text-[11px] uppercase tracking-[0.18em] text-graphite">
                      Work email
                    </label>
                    <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                      <input
                        id="waitlist-email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        value={email}
                        onChange={e => {
                          setEmail(e.target.value);
                          if (error) setError("");
                        }}
                        placeholder="you@company.com"
                        aria-invalid={Boolean(error)}
                        aria-describedby={error ? "waitlist-error" : undefined}
                        className="min-w-0 flex-1 rounded-full border border-ink bg-paper px-5 py-3.5 text-ink outline-none transition-shadow placeholder:text-graphite/70 focus:shadow-[0_0_0_3px_rgba(255,74,28,0.25)]"
                      />
                      <button
                        type="submit"
                        className="group inline-flex items-center justify-center gap-2 rounded-full bg-vermilion px-6 py-3.5 font-medium text-paper transition-colors hover:bg-vermilion-deep"
                      >
                        Join the waitlist
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                    {error ? (
                      <p id="waitlist-error" role="alert" className="mt-3 text-[14px] text-vermilion-deep">
                        {error}
                      </p>
                    ) : (
                      <p className="mt-3 text-[13.5px] text-graphite">
                        Or{" "}
                        <a href="#composer" className="ink-link text-ink">
                          try Curialy on a sample repo
                        </a>{" "}
                        right now — no sign-up needed.
                      </p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
