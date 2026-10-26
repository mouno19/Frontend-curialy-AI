import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "./content";
import { Wordmark } from "./Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-b border-rule bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="container flex h-16 items-center justify-between gap-6">
        <a href="#top" aria-label="Curialy AI home" className="shrink-0">
          <Wordmark />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="ink-link text-[0.92rem] text-ink-soft transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#waitlist"
            className="rounded-full px-4 py-2 text-[0.92rem] text-ink-soft transition-colors hover:text-ink"
          >
            Sign in
          </a>
          <a
            href="#composer"
            className="group inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[0.92rem] font-medium text-paper transition-colors hover:bg-vermilion"
          >
            Try Curialy
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <Sheet>
          <SheetTrigger
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rule text-ink lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-[86vw] max-w-sm border-rule bg-paper p-0">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="flex h-full flex-col px-6 pb-8 pt-6">
              <Wordmark />
              <ul className="mt-10 flex flex-col">
                {NAV_LINKS.map((link, i) => (
                  <li key={link.href} className="border-b border-rule">
                    <SheetClose asChild>
                      <a
                        href={link.href}
                        className="flex items-baseline justify-between py-4 font-display text-3xl text-ink"
                      >
                        {link.label}
                        <span className="font-mono text-[11px] text-vermilion">0{i + 1}</span>
                      </a>
                    </SheetClose>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-3">
                <SheetClose asChild>
                  <a
                    href="#composer"
                    className="rounded-full bg-ink px-5 py-3 text-center font-medium text-paper"
                  >
                    Try Curialy
                  </a>
                </SheetClose>
                <SheetClose asChild>
                  <a
                    href="#waitlist"
                    className="rounded-full border border-ink px-5 py-3 text-center font-medium text-ink"
                  >
                    Join the waitlist
                  </a>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
