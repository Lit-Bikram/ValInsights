"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

/*
 * =========================================================
 * LEGACY DATA — PRESERVED FOR EASY ROLLBACK
 *
 * Used by the removed "Questions That Differ by Sector" section.
 * The owner requested that section to be removed from the rendered
 * page, so the data is retained here as comments rather than deleted.
 * =========================================================
 *
 * const valuationContext = [
 *   {
 *     number: "01",
 *     title: "Sources of Cash Flow",
 *     text: "Revenue quality, customer relationships, contracted income, occupancy, and production performance can affect the visibility of future cash flows.",
 *   },
 *   {
 *     number: "02",
 *     title: "Investment Requirements",
 *     text: "Working capital, development expenditure, technology investment, and asset replacement can shape the capital needed to sustain operations and growth.",
 *   },
 *   {
 *     number: "03",
 *     title: "Market and Operating Risk",
 *     text: "Competitive conditions, regulation, cyclicality, and technological change can influence assumptions about performance and long-term prospects.",
 *   },
 * ];
 */

const sectors = [
  {
    number: "01",
    title: "Technology & Digital",
    image: "/images/sectors/technology-and-digital.jpg",
    description:
      "Software, SaaS, digital platforms, and technology-enabled businesses where recurring revenue, customer economics, intellectual property, and rapid change influence value.",
    href: "/sectors/technology-and-digital",
  },
  {
    number: "02",
    title: "Financial Services",
    image: "/images/sectors/financial-services.jpg",
    description:
      "Banks, non-banking financial companies, fintech businesses, funds, and intermediaries where capital, asset quality, funding, and regulation affect value.",
    href: "/sectors/financial-services",
  },
  {
    number: "03",
    title: "Real Estate & Infrastructure",
    image: "/images/sectors/real-estate-and-infrastructure.jpg",
    description:
      "Development projects, income-producing property, and infrastructure investments where location, leases, contracts, and long-term cash flows are central to value.",
    href: "/sectors/real-estate-and-infrastructure",
  },
  {
    number: "04",
    title: "Manufacturing & Industrial",
    image: "/images/sectors/manufacturing-and-industrial.jpg",
    description:
      "Manufacturing operations and industrial assets where capacity utilisation, operating leverage, capital expenditure, technology, and market cycles influence value.",
    href: "/sectors/manufacturing-and-industrial",
  },
  {
    number: "05",
    title: "Energy",
    image: "/images/sectors/energy.jpg",
    description:
      "Conventional and renewable energy assets, platforms, and projects where operating performance, commodity exposure, contracts, regulation, and transition risk shape value.",
    href: "/sectors/energy",
  },
  {
    number: "06",
    title: "Healthcare & Life Sciences",
    image: "/images/sectors/healthcare-life-sciences.jpg",
    description:
      "Healthcare providers, life sciences businesses, medical technologies, and healthcare-related assets where clinical, regulatory, commercial, and operating factors influence value.",
    href: "/sectors/healthcare-life-sciences",
  },
];

export default function SectorsPage() {
  const sectorsListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = sectorsListRef.current;
    if (!list) return;

    const rows = Array.from(
      list.querySelectorAll<HTMLElement>(".sectors-row--reveal"),
    );

    if (!rows.length) return;

    const observers: IntersectionObserver[] = [];

    rows.forEach((row) => {
      row.classList.remove("sectors-row--visible");

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("sectors-row--visible");
            observer.unobserve(entry.target);
          });
        },
        {
          threshold: 0.18,
          rootMargin: "0px 0px -70px 0px",
        },
      );

      observer.observe(row);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <>
      <Header />

      <main className="sectors-page">
        {/* =========================================================
            HERO
            Owner requested "Sector Context Shapes Valuation" in hero.
            ========================================================= */}
        <section className="sectors-hero">
          <Image
            src="/images/shared/inner-page-banner.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="sectors-hero__image"
          />

          <div className="sectors-hero__overlay" />

          <div className="sectors-shell sectors-hero__content">
            <p className="sectors-breadcrumb">Home / Sector Expertise</p>

            <h1>Sector Context Shapes Valuation</h1>

            <p>
              Businesses and assets do not operate in isolation. Their
              economic characteristics, market conditions, and investment
              requirements influence how value is assessed. Our sector focus
              connects commercial context with the financial analysis relevant
              to each assignment.
            </p>
          </div>
        </section>

        {/*
         * =========================================================
         * LEGACY SECTION — PRESERVED FOR EASY ROLLBACK
         *
         * Owner requested the old "Our Perspective" section to be
         * incorporated into the hero. It is intentionally commented
         * rather than deleted.
         * =========================================================
         *
         * <section className="sectors-perspective">
         *   <div className="sectors-shell sectors-perspective__grid">
         *     <div>
         *       <p className="sectors-label">01 / Our Perspective</p>
         *       <h2>Sector Context Shapes Valuation</h2>
         *       <p>
         *         Businesses and assets do not operate in isolation. Their
         *         economic characteristics, market conditions, and investment
         *         requirements influence how value is assessed.
         *       </p>
         *       <p>
         *         Across our core sectors, we consider the operating factors
         *         behind financial performance alongside the evidence relevant
         *         to the assignment. Explore a sector below for its typical
         *         assignments, key valuation considerations, and sub-sectors.
         *       </p>
         *     </div>
         *
         *     <aside className="sectors-perspective__callout">
         *       <p>Across Our Work</p>
         *       <h3>From Commercial Context to Financial Analysis</h3>
         *       <span>
         *         Our sector focus connects the underlying business model, its
         *         sources of cash flow, and the risks and capital needs that
         *         influence long-term prospects.
         *       </span>
         *     </aside>
         *   </div>
         * </section>
         */}

        {/* =========================================================
            CORE SECTOR EXPERTISE
            ========================================================= */}
        <section className="sectors-explore">
          <div className="sectors-shell">
            <div className="sectors-explore__heading">
              <div>
                <p className="sectors-label">01 / Explore Our Sectors</p>
                <h2>Core Sector Expertise</h2>
              </div>

              <p>
                Select a sector to explore the commercial factors that shape
                value and the types of assignments undertaken in that area.
              </p>
            </div>

            <div className="sectors-list" ref={sectorsListRef}>
              {sectors.map((sector) => (
                <Link
                  key={sector.title}
                  href={sector.href}
                  className="sectors-row sectors-row--reveal"
                >
                  <div className="sectors-row__image">
                    <Image
                      src={sector.image}
                      alt=""
                      fill
                      sizes="180px"
                      className="sectors-row__image-inner"
                    />
                  </div>

                  <div className="sectors-row__number">
                    {sector.number} / SECTOR
                  </div>

                  <div className="sectors-row__content">
                    <h3>{sector.title}</h3>
                    <p>{sector.description}</p>
                  </div>

                  <span className="sectors-row__link">
                    Explore sector <span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/*
         * =========================================================
         * OWNER NOTE — SECTOR INSIGHTS NAVIGATION
         *
         * The owner/design note mentioned a separate "Sector Insights"
         * navigation tab. The final design direction explicitly states
         * that this is not added because "Explore sector" already
         * triggers the sector insight page itself.
         *
         * Therefore no duplicate Sector Insights tab is rendered here.
         * This comment is retained so the decision is reversible.
         * =========================================================
         */}

        {/*
         * =========================================================
         * LEGACY SECTION — PRESERVED FOR EASY ROLLBACK
         *
         * Owner explicitly requested "Questions That Differ by Sectors"
         * to be removed. The complete old section is kept commented.
         * =========================================================
         *
         * <section className="sectors-context">
         *   <div className="sectors-shell">
         *     <p className="sectors-label">03 / Valuation Context</p>
         *
         *     <h2>Questions That Differ by Sector</h2>
         *
         *     <p className="sectors-context__intro">
         *       The factors that matter to value vary with the economics of
         *       the business or asset. Our sector pages examine these
         *       differences in more detail.
         *     </p>
         *
         *     <div className="sectors-context__list">
         *       {valuationContext.map((item) => (
         *         <article
         *           key={item.number}
         *           className="sectors-context__row"
         *         >
         *           <span>{item.number}</span>
         *           <div>
         *             <h3>{item.title}</h3>
         *             <p>{item.text}</p>
         *           </div>
         *         </article>
         *       ))}
         *     </div>
         *   </div>
         * </section>
         */}

        {/* CTA */}
        <section className="sectors-cta">
          <div className="sectors-shell sectors-cta__inner">
            <h2>Discuss a Requirement</h2>

            <p>
              If you are considering a valuation assignment, transaction,
              reporting matter, or dispute, we would be pleased to understand
              the requirement.
            </p>

            <Link href="/contact" className="sectors-cta__button">
              Contact us
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
