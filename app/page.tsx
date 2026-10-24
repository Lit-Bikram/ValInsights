"use client";

import Image from "next/image";
import Link from "next/link";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import { useEffect, useRef, useState } from "react";

const solutions = [
  {
    title: "Valuation",
    description:
      "Complex financial and valuation analyses for litigation, arbitration, expert determination and settlement — bringing an investor-grade perspective to value assessment.",
    image: "/images/solutions/NYSE.jpeg",
    href: "/solutions/NYSE.jpeg",
  },

  {
    title: "Transaction Advisory",
    description:
      "Supporting investment committees on strategic investment and exit decisions; fair value assessments for global portfolios; valuation and reporting frameworks for complex structures.",
    image: "/images/solutions/transaction-home.jpeg",
    href: "/solutions/securities-financial-assets",
  },

  {
    title: "Disputes",
    description:
      "Loss quantification, shareholder negotiations and disputes, contentious restructurings and cross-border mediations across India, Europe and the Middle East.",
    image: "/images/solutions/disputes-home.jpeg",
    href: "/solutions/disputes-litigation-support",
  },
];

const sectors = [
  {
    title: "Technology and Digital",
    description:
      "Software, SaaS, digital platforms, and technology-enabled businesses where recurring revenue, customer economics, intellectual property, and rapid change influence value.",
    image: "/images/sectors/technology-and-digital.jpg",
    href: "/sectors/technology-and-digital",
  },
  {
    title: "Financial Service",
    description:
      "Banks, non-banking financial companies, fintech businesses, funds, and intermediaries where capital, asset quality, funding, and regulation affect value.",
    image: "/images/sectors/financial-services.jpg",
    href: "/sectors/financial-services",
  },
  {
    title: "Real Estate and Infrastructure",
    description:
      "Development projects, income-producing property, and infrastructure investments where location, leases, contracts, and long-term cash flows are central to value.",
    image: "/images/sectors/real-estate-and-infrastructure.jpg",
    href: "/sectors/real-estate-and-infrastructure",
  },
  {
    title: "Manufacturing and Industrial",
    description:
      "Manufacturing operations and industrial assets where capacity utilisation, operating leverage, capital expenditure, technology, and market cycles influence value.",
    image: "/images/sectors/manufacturing-and-industrial.jpg",
    href: "/sectors/manufacturing-and-industrial",
  },
  {
    title: "Energy",
    description:
      "Conventional and renewable energy assets, platforms, and storage where operating performance, commodity exposure, contracts, regulation, and transition risks shape value.",
    image: "/images/sectors/energy.jpg",
    href: "/sectors/energy",
  },
  {
    title: "Healthcare and Life Sciences",
    description:
      "Healthcare providers, life sciences businesses, medical technologies, and healthcare-related assets where clinical, regulatory, commercial, and operating factors influence value.",
    image: "/images/sectors/healthcare-life-sciences.jpg",
    href: "/sectors/healthcare-life-sciences",
  },
];

function DragRail({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const railRef = useRef<HTMLDivElement>(null);

  const dragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  const lastX = useRef(0);
  const lastTime = useRef(0);
  const velocity = useRef(0);

  const animationFrame = useRef<number | null>(null);
  const didDrag = useRef(false);

  const stopMomentum = () => {
    if (animationFrame.current !== null) {
      cancelAnimationFrame(animationFrame.current);
      animationFrame.current = null;
    }
  };

  const startMomentum = () => {
    const rail = railRef.current;

    if (!rail) return;

    stopMomentum();

    const friction = 0.94;
    const minimumVelocity = 0.15;

    const animate = () => {
      if (!rail) return;

      velocity.current *= friction;

      if (Math.abs(velocity.current) < minimumVelocity) {
        animationFrame.current = null;
        return;
      }

      rail.scrollLeft -= velocity.current;

      animationFrame.current = requestAnimationFrame(animate);
    };

    animationFrame.current = requestAnimationFrame(animate);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;

    if (!rail) return;

    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    stopMomentum();

    dragging.current = true;
    didDrag.current = false;

    startX.current = event.clientX;
    startScrollLeft.current = rail.scrollLeft;

    lastX.current = event.clientX;
    lastTime.current = performance.now();

    velocity.current = 0;

    // Do not capture the pointer or enter dragging mode on pointer-down.
    // A normal click must remain a native Link click on desktop.
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;

    if (!rail || !dragging.current) return;

    const currentX = event.clientX;
    const currentTime = performance.now();

    const deltaX = currentX - startX.current;

    if (Math.abs(deltaX) > 5) {
      if (!didDrag.current) {
        didDrag.current = true;
        rail.classList.add("is-dragging");

        try {
          rail.setPointerCapture(event.pointerId);
        } catch {
          // Ignore pointer capture errors.
        }
      }
    }

    rail.scrollLeft = startScrollLeft.current - deltaX;

    const timeDelta = currentTime - lastTime.current;

    if (timeDelta > 0) {
      velocity.current = (currentX - lastX.current) / timeDelta;
    }

    lastX.current = currentX;
    lastTime.current = currentTime;
  };

  const stopDragging = () => {
    const rail = railRef.current;

    if (!dragging.current) return;

    dragging.current = false;

    if (rail) {
      rail.classList.remove("is-dragging");
    }

    if (Math.abs(velocity.current) > 0.5) {
      startMomentum();
    }
  };

  const handleClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (didDrag.current) {
      event.preventDefault();
      event.stopPropagation();

      didDrag.current = false;
    }
  };

  return (
    <div
      ref={railRef}
      className={`home-card-rail ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") {
          stopDragging();
        }
      }}
      onClickCapture={handleClickCapture}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [insightsSlide, setInsightsSlide] = useState(0);

  const insightSlides = [
    "/images/homepage/slideshow-1.jpg",
    "/images/homepage/slideshow-2.jpg",
    "/images/homepage/slideshow-3.jpg",
    "/images/homepage/slideshow-4.jpg",
  ];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setInsightsSlide((current) => (current + 1) % insightSlides.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <>
      <Header />

      <main className="home-page">
        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="home-hero">
          <Image
            src="/images/homepage/hero-banner.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="home-hero__image"
          />

          <div className="home-hero__overlay" />

          <div className="home-shell home-hero__content">
            <p className="home-eyebrow">Valuation &amp; Transaction Advisory</p>

            <h1>
              Technical insight for decisions
              <br />
              that shape enterprise value
            </h1>

            <p className="home-hero__description">
              We support businesses, investors, boards, and legal teams with
              valuation and advisory services for transactions, financial
              reporting, and disputes—providing conclusions that are
              transparent, well-reasoned, and fit for stakeholder scrutiny.
            </p>

            <Link href="/contact" className="home-button">
              Discuss a Requirement
            </Link>
          </div>
        </section>

        {/* =====================================================
            WHO WE ARE
        ====================================================== */}

        <section className="home-who-we-are">
          <div className="home-shell home-who-we-are__inner">
            <h2 className="home-section-label">Who We Are</h2>

            <div className="home-who-we-are__content">
              <div className="home-who-we-are__copy">
                <p>
                  Valuation Insights is a boutique advisory firm specialising in
                  Valuation, Disputes, and Investment Advisory — bringing over
                  two decades of investor-grade insight to complex mandates
                  across India, Europe and the Middle East.
                  <br />
                  <br />
                  Our work combines technical analysis and commercial judgement
                  - delivering clear, defensible perspectives that support
                  informed decision-making
                </p>
              </div>

              <div className="home-who-we-are__metrics">
                <article className="home-who-we-are__metric">
                  <p className="home-who-we-are__metric-value">20+</p>
                  <h3>Years of Experience</h3>
                  {/* <p className="home-who-we-are__metric-description">
                    Over two decades of investor-grade insight delivered across
                    complex, high-stakes mandates.
                  </p> */}
                </article>

                <article className="home-who-we-are__metric">
                  <p className="home-who-we-are__metric-value">3</p>
                  <h3>Core Practice Areas</h3>
                  {/* <p className="home-who-we-are__metric-description">
                    Disputes, Governance and Valuation — three specialisations
                    that define the practice.
                  </p> */}
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            Areas of Core Expertise
        ====================================================== */}

        <section className="home-services">
          <div className="home-shell">
            <div className="home-section-heading">
              <h2 className="home-section-label">Areas of Core Expertise</h2>

              <p>
                A multidisciplinary practice spanning financial disputes,
                complex valuation and Investment Advisory — with a consistent
                focus on delivering rigorous, defensible analysis in high-stakes
                environments.
              </p>
            </div>

            <DragRail>
              {solutions.map((solution) => (
                <Link
                  key={solution.title}
                  href={solution.href}
                  className="home-service-card"
                  aria-label={`Explore ${solution.title}`}
                >
                  <div className="home-card-image">
                    <Image
                      src={solution.image}
                      alt={solution.title}
                      fill
                      sizes="(max-width: 768px) 88vw, 31vw"
                    />
                  </div>

                  <div className="home-card-body">
                    <h3>{solution.title}</h3>

                    <p>{solution.description}</p>

                    <span className="home-card-link">
                      Explore Service <span>→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </DragRail>
          </div>
        </section>

        {/* =====================================================
            INSIGHTS
        ====================================================== */}

        <section className="home-insights">
          <div className="home-insights__background">
            {insightSlides.map((src, index) => (
              <Image
                key={src}
                src={src}
                alt=""
                fill
                sizes="100vw"
                priority={index === 0}
                className={`home-insights__image ${
                  index === insightsSlide ? "home-insights__image--active" : ""
                }`}
              />
            ))}
          </div>

          <div className="home-insights__overlay" />

          <div className="home-shell home-insights__content">
            {/* <p className="home-eyebrow">Insights &amp; Market Intelligence</p> */}

            <h2>Insights &amp; Market Intelligence</h2>

            <p>
              In-depth analysis, valuation benchmarks, and strategic research
              exploring evolving capital market dynamics, regulatory changes,
              and corporate transaction trends.
            </p>

            <Link href="/insights" className="home-button">
              Read Insights
            </Link>
          </div>
        </section>

        {/* =====================================================
            SECTOR EXPERTISE
        ====================================================== */}
        {/* <section className="home-sectors">
          <div className="home-shell">
            <div className="home-section-heading">
              <div className="home-section-label">
                Sector Expertise
              </div>

              <p>
                We work in sectors where commercial conditions, operating
                performance, and market dynamics have a direct bearing on value.
                Our analysis reflects how these factors affect cash flows, risk,
                capital requirements, and long-term prospects.
              </p>
            </div>

            <DragRail>
              {sectors.map((sector) => (
                <Link
                  key={sector.title}
                  href={sector.href}
                  className="home-sector-card"
                  aria-label={`Explore ${sector.title}`}
                >
                  <div className="home-card-image">
                    <Image
                      src={sector.image}
                      alt={sector.title}
                      fill
                      sizes="(max-width: 768px) 88vw, 31vw"
                    />
                  </div>

                  <div className="home-card-body">
                    <h3>{sector.title}</h3>

                    <p>{sector.description}</p>

                    <span className="home-card-link">
                      Explore Service <span>→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </DragRail>
          </div>
        </section> */}

        {/* =====================================================
            CTA
        ====================================================== */}

        <section className="home-cta">
          <div className="home-cta__curve" />

          <div className="home-shell home-cta__content">
            <h2>Discuss a Requirement</h2>

            <p>
              A confidential conversation about valuation, transactions, or
              strategic decisions.
            </p>

            <Link href="/contact" className="home-button">
              Contact the Firm
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
