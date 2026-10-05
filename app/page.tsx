"use client";

import Image from "next/image";
import Link from "next/link";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import { useEffect, useRef, useState } from "react";

const solutions = [
  {
    title: "Valuation of Securities & Financial Assets",
    description:
      "Businesses, equity and debt securities, intangible assets, intellectual property, and complex instruments.",
    image: "/images/solutions/securities-financial-assets.jpg",
    href: "/solutions/securities-financial-assets",
  },
  {
    title: "Valuation of Real Estate",
    description:
      "Commercial, residential, industrial, hospitality, infrastructure-linked assets, portfolios and development interests.",
    image: "/images/solutions/real-estate.jpg",
    href: "/solutions/real-estate",
  },
  {
    title: "Valuation of Tangible Assets",
    description:
      "Plant, machinery, specialised equipment, production lines, infrastructure assets, and other physical assets.",
    image: "/images/solutions/tangible-assets.jpg",
    href: "/solutions/tangible-assets",
  },
  {
    title: "Disputes & Litigation Support",
    description:
      "Valuation, damages analysis, financial modelling, and independent analysis for contested matters across asset classes.",
    image: "/images/solutions/litigation-support.jpg",
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
    title: "Financial Services",
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
      "Manufacturing enterprises, industrial platforms, and specialised assets where capacity, technology, product mix, cost structures, and supply-chain conditions determine value.",
    image: "/images/sectors/manufacturing-and-industrial.jpg",
    href: "/sectors/manufacturing-and-industrial",
  },
  {
    title: "Energy",
    description:
      "Conventional and renewable energy businesses, projects, and assets where resource quality, operating performance, contracts, commodity prices, and policy exposure shape value.",
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
            <p className="home-eyebrow">Independent Valuation Specialists</p>

            <h1>
              Technical insight for decisions
              <br />
              that shape enterprise value
            </h1>

            <p className="home-hero__description">
              We support businesses, investors, boards, and legal teams with
              valuation services for transactions, financial reporting, and
              disputes—providing conclusions that are transparent,
              well-reasoned, and fit for stakeholder scrutiny.
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
            <div className="home-section-label">
              <span />
              Who We Are
            </div>

            <div className="home-who-we-are__content">
              <div>
                <h2>
                  Specialist valuation expertise
                  <br />
                  with a commercial perspective.
                </h2>
              </div>

              <div className="home-who-we-are__copy">
                <p>
                  ValInsight is a specialist valuation firm serving clients
                  across India, the UAE, and the wider Gulf. We combine sector
                  context with disciplined financial analysis for complex
                  valuation requirements across transactions, reporting, and
                  disputes.
                </p>

                <p>
                  Our work is designed for situations where valuation affects
                  reporting, investment, ownership, transaction structure, or
                  the resolution of a contested matter.
                </p>

                <Link href="/about" className="home-text-link">
                  Learn more about us <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            WHAT WE DO
        ====================================================== */}

        <section className="home-services">
          <div className="home-shell">
            <div className="home-section-heading">
              <div className="home-section-label">
                <span />
                What We Do
              </div>

              <p>
                Advice built around important financial and strategic choices.
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
              We publish concise observations on valuation, sector economics,
              and the issues shaping transactions, reporting, and disputes. The
              emphasis is on clarity, relevance, and practical application.
            </p>

            <Link href="/insights" className="home-button">
              Read Insights
            </Link>
          </div>
        </section>

        {/* =====================================================
            SECTOR EXPERTISE
        ====================================================== */}

        <section className="home-sectors">
          <div className="home-shell">
            <div className="home-section-heading">
              <div className="home-section-label">
                <span />
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
                      Explore Sector <span>→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </DragRail>
          </div>
        </section>
        {/* =====================================================
            CTA
        ====================================================== */}

        <section className="home-cta">
          <div className="home-cta__curve" />

          <div className="home-shell home-cta__content">
            <h2>Discuss a Requirement</h2>

            <p>
              A confidential conversation about valuation, transactions,
              reporting, or strategic decisions.
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
