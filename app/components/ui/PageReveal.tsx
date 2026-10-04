"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type PageRevealProps = {
  children: React.ReactNode;
};

/*
 * Heroes have their own immediate entrance animation. Every other
 * section is revealed independently when it enters the viewport.
 */
const HERO_SELECTOR = [
  ".home-hero",
  ".about-hero",
  ".sectors-hero",
  ".sector-hero",
  ".solutions-hero",
  ".service-hero",
  ".insights-hero",
].join(", ");

export default function PageReveal({ children }: PageRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const sections = Array.from(
      root.querySelectorAll<HTMLElement>("main section"),
    ).filter((section) => !section.matches(HERO_SELECTOR));

    if (!sections.length) {
      return;
    }

    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      section.classList.remove("page-section-visible");
      section.classList.add("page-section-reveal");
      section.style.setProperty("--page-reveal-delay", "0ms");
    });

    sections.forEach((section) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add("page-section-visible");
            observer.unobserve(entry.target);
          });
        },
        {
          threshold: 0.08,
          rootMargin: "0px 0px -50px 0px",
        },
      );

      observer.observe(section);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [pathname]);

  return <div ref={rootRef}>{children}</div>;
}
