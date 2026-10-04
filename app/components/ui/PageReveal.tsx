"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type PageRevealProps = {
  children: React.ReactNode;
};

export default function PageReveal({ children }: PageRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    /*
     * Hero sections have their own entrance animation.
     * All other sections use the global reveal animation.
     */
    const sections = Array.from(
      root.querySelectorAll<HTMLElement>(
        "main section:not(.home-hero):not(.about-hero):not(.solutions-hero):not(.service-hero)",
      ),
    );

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
          threshold: 0.18,
          rootMargin: "0px 0px -80px 0px",
        },
      );

      observer.observe(section);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => {
        observer.disconnect();
      });
    };
  }, [pathname]);

  return <div ref={rootRef}>{children}</div>;
}