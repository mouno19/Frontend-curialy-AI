import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUp,
  Check,
  GitBranch,
  Github,
  Loader2,
  Paperclip,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { COMPOSER_EXAMPLES, COMPOSER_SUGGESTIONS, RUN_STEPS } from "./content";

type Mode = "plan" | "auto";
type Phase = "idle" | "running" | "done";

/** Types and deletes example prompts in a loop while `active` is true. */
function useTypewriter(lines: string[], active: boolean) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (!active) return;
    let line = 0;
    let char = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = lines[line];
      if (!deleting) {
        char += 1;
        setText(current.slice(0, char));
        if (char >= current.length) {
          deleting = true;
          timer = setTimeout(tick, 2200);
          return;
        }
        timer = setTimeout(tick, 26 + Math.random() * 38);
      } else {
        char -= 3;
        if (char <= 0) {
          char = 0;
          deleting = false;
          line = (line + 1) % lines.length;
          setText("");
          timer = setTimeout(tick, 380);
          return;
        }
        setText(current.slice(0, char));
        timer = setTimeout(tick, 14);
      }
    };

    timer = setTimeout(tick, 700);
    return () => clearTimeout(timer);
  }, [active, lines]);

  return text;
}

export default function PromptComposer() {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [mode, setMode] = useState<Mode>("plan");
  const [phase, setPhase] = useState<Phase>("idle");
  const [submitted, setSubmitted] = useState("");
  const [stepCount, setStepCount] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const typing = useTypewriter(
    COMPOSER_EXAMPLES,
    !value && !focused && phase === "idle"
  );

  // Advance the simulated run one step at a time.
  useEffect(() => {
    if (phase !== "running") return;
    if (stepCount >= RUN_STEPS.length) {
      const done = setTimeout(() => setPhase("done"), 500);
      return () => clearTimeout(done);
    }
    const next = setTimeout(() => setStepCount(c => c + 1), 850);
    return () => clearTimeout(next);
  }, [phase, stepCount]);

  const submit = (event?: FormEvent) => {
    event?.preventDefault();
    if (phase === "running") return;
    const task = value.trim() || COMPOSER_EXAMPLES[0];
    setSubmitted(task);
    setStepCount(0);
    setPhase("running");
  };

  const reset = () => {
    setPhase("idle");
    setValue("");
    setSubmitted("");
    setStepCount(0);
    textareaRef.current?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  };

  return (
    <div id="composer" className="relative">
      <div className="relative">
        {/* offset ink shadow — a printed-card feel */}
        <div
          className="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl bg-ink"
          aria-hidden
        />
        <form
          onSubmit={submit}
          className="relative rounded-2xl border border-ink bg-[#fbf9f4] p-4 sm:p-5"
        >
          <div className="flex items-center justify-between gap-3 border-b border-dashed border-rule pb-3">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-graphite">
              <span className="h-2 w-2 rounded-full bg-vermilion animate-spark" />
              New task
            </div>
            <div
              role="radiogroup"
              aria-label="Autonomy mode"
              className="flex rounded-full border border-rule bg-paper p-0.5 text-[12px]"
            >
              {(
                [
                  { id: "plan", label: "Plan first" },
                  { id: "auto", label: "Full autonomy" },
                ] as const
              ).map(option => (
                <button
                  key={option.id}
                  type="button"
                  role="radio"
                  aria-checked={mode === option.id}
                  onClick={() => setMode(option.id)}
                  className={cn(
                    "rounded-full px-3 py-1 transition-colors",
                    mode === option.id
                      ? "bg-ink text-paper"
                      : "text-ink-soft hover:text-ink"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <label htmlFor="task" className="sr-only">
            Describe a coding task for Curialy
          </label>
          <div className="relative mt-3">
            <textarea
              id="task"
              ref={textareaRef}
              value={value}
              onChange={e => setValue(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={onKeyDown}
              rows={3}
              disabled={phase === "running"}
              className="peer w-full resize-none bg-transparent text-lg leading-relaxed text-ink outline-none placeholder:text-transparent disabled:opacity-60 sm:text-xl"
              placeholder="Describe what you want built, fixed or explained"
            />
            {!value && (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 text-lg leading-relaxed text-graphite/80 sm:text-xl"
              >
                {focused || phase !== "idle" ? (
                  "Describe what you want built, fixed or explained…"
                ) : (
                  <span className="caret">{typing}</span>
                )}
              </div>
            )}
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-rule bg-paper px-2.5 py-1.5 font-mono text-[11.5px] text-ink-soft">
                <Github className="h-3.5 w-3.5" />
                acme/storefront
                <span className="text-rule">/</span>
                <GitBranch className="h-3.5 w-3.5" />
                main
              </span>
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-rule bg-paper text-ink-soft transition-colors hover:text-ink"
                aria-label="Attach files"
              >
                <Paperclip className="h-4 w-4" />
              </button>
            </div>
            <button
              type="submit"
              disabled={phase === "running"}
              className="group inline-flex items-center gap-2 rounded-full bg-vermilion py-2 pl-4 pr-2 text-sm font-medium text-paper transition-colors hover:bg-vermilion-deep disabled:opacity-70"
            >
              {phase === "running" ? "Curialy is working" : "Assign to Curialy"}
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-paper/20">
                {phase === "running" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                )}
              </span>
            </button>
          </div>

          <AnimatePresence initial={false}>
            {phase !== "idle" && (
              <motion.div
                key="run"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-4 rounded-xl bg-ink p-4 font-mono text-[12.5px] text-paper/85">
                  <p className="text-paper/50">
                    <span className="text-vermilion">you ›</span> {submitted}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {RUN_STEPS.slice(0, Math.max(stepCount, 1)).map(
                      (step, i) => {
                        const finished = i < stepCount;
                        return (
                          <motion.li
                            key={step.label}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-start gap-2.5"
                          >
                            {finished ? (
                              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#9bd17b]" />
                            ) : (
                              <Loader2 className="mt-0.5 h-3.5 w-3.5 shrink-0 animate-spin text-vermilion" />
                            )}
                            <span>
                              {step.label}
                              <span className="text-paper/45">
                                {" "}
                                — {step.detail}
                              </span>
                            </span>
                          </motion.li>
                        );
                      }
                    )}
                  </ul>
                  {phase === "done" && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 flex flex-col gap-3 border-t border-paper/10 pt-4 font-sans text-[13.5px] sm:flex-row sm:items-center sm:justify-between"
                    >
                      <p className="flex items-start gap-2 text-paper/80">
                        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-vermilion" />
                        {mode === "plan"
                          ? "Plan is ready for review. This is a mock run — join the waitlist to point Curialy at your own repo."
                          : "Running on full autonomy. This is a mock run — join the waitlist to point Curialy at your own repo."}
                      </p>
                      <div className="flex shrink-0 gap-2">
                        <button
                          type="button"
                          onClick={reset}
                          className="inline-flex items-center gap-1.5 rounded-full border border-paper/20 px-3 py-1.5 text-paper/80 transition-colors hover:text-paper"
                        >
                          <RotateCcw className="h-3.5 w-3.5" /> New task
                        </button>
                        <a
                          href="#waitlist"
                          className="rounded-full bg-paper px-3 py-1.5 font-medium text-ink transition-colors hover:bg-vermilion hover:text-paper"
                        >
                          Join waitlist
                        </a>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>

      <div className="relative mt-7 flex flex-wrap items-center gap-2 pl-1">
        <span className="mr-1 font-mono text-[11px] uppercase tracking-[0.18em] text-graphite">
          Try
        </span>
        {COMPOSER_SUGGESTIONS.map(s => (
          <button
            key={s.label}
            type="button"
            onClick={() => {
              if (phase === "running") return;
              setPhase("idle");
              setValue(s.prompt);
              textareaRef.current?.focus();
            }}
            className="rounded-full border border-rule bg-paper px-3 py-1.5 text-[13px] text-ink-soft transition-colors hover:border-ink hover:text-ink"
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
