import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type SectionLabelProps = {
  index: string;
  children: ReactNode;
  className?: string;
  tone?: "ink" | "paper";
};

/** Marginalia-style section marker, e.g. "§ 02 —— How it works". */
export function SectionLabel({ index, children, className, tone = "ink" }: SectionLabelProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em]",
        tone === "paper" ? "text-paper/60" : "text-graphite",
        className,
      )}
    >
      <span className="text-vermilion">§ {index}</span>
      <span className="h-px w-8 bg-current opacity-50" />
      <span>{children}</span>
    </div>
  );
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section";
};

/** Fades and lifts content into place once, when it scrolls into view. */
export function Reveal({ children, className, delay = 0, y = 18, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Component>
  );
}
