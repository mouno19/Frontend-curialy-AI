import { cn } from "@/lib/utils";

/** The Curialy mark: an opening curly brace holding a vermilion "spark". */
export function CurialyMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("h-7 w-7 shrink-0", className)}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="7" fill="var(--ink)" />
      <path
        d="M14.5 7.5c-2.7 0-3.8 1.3-3.8 3.7v2.1c0 1.7-.8 2.5-2.5 2.7 1.7.2 2.5 1 2.5 2.7v2.1c0 2.4 1.1 3.7 3.8 3.7"
        fill="none"
        stroke="var(--paper)"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20.5" cy="16" r="3.4" fill="var(--vermilion)" />
    </svg>
  );
}

type WordmarkProps = {
  className?: string;
  size?: "sm" | "lg";
  tone?: "ink" | "paper";
};

/** Lowercase serif wordmark with a raised mono "ai" suffix. */
export function Wordmark({ className, size = "sm", tone = "ink" }: WordmarkProps) {
  const large = size === "lg";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5",
        tone === "paper" ? "text-paper" : "text-ink",
        className,
      )}
    >
      <CurialyMark className={large ? "h-12 w-12" : undefined} />
      <span className="relative inline-flex items-start">
        <span
          className={cn(
            "font-display leading-none tracking-[-0.01em]",
            large ? "text-7xl md:text-8xl" : "text-[1.7rem]",
          )}
        >
          curialy
        </span>
        <span
          className={cn(
            "font-mono font-medium uppercase tracking-[0.2em] text-vermilion",
            large ? "ml-2 mt-2 text-sm" : "ml-1 mt-0.5 text-[0.62rem]",
          )}
        >
          ai
        </span>
      </span>
    </span>
  );
}
