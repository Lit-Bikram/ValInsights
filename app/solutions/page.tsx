import Image from "next/image";
import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const expertiseCards = [
  {
    eyebrow: "Disputes & Quantum",
    title: "Disputes & Quantum",
    description:
      "Loss quantification, shareholder matters, and complex financial disputes.",
    image: "/images/solutions/litigation-support.jpg",
    imageAlt: "Classical courthouse columns",
    href: "/solutions/disputes",
  },
  {
    eyebrow: "Investment Advisory",
    title: "Investment Advisory",
    description:
      "Decision support for investment committees, portfolios, and transactions.",
    image: "/images/solutions/real-estate.jpg",
    imageAlt: "Modern city skyline at dusk",
    // Update this destination when the dedicated Investment Advisory page is redesigned.
    href: "/solutions/investment",
  },
  {
    eyebrow: "Valuation",
    title: "Valuation",
    description:
      "Independent analysis of businesses, assets, and financial interests.",
    image: "/images/solutions/securities-financial-assets.jpg",
    imageAlt: "Financial market data on a screen",
    href: "/solutions/valuation",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <Header />

      <main className="solutions-page">
        <section className="solutions-hero" aria-labelledby="solutions-page-title">
          <Image
            src="/images/shared/inner-page-banner.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="solutions-hero__image"
          />
          <div className="solutions-hero__overlay" aria-hidden="true" />

          <div className="solutions-hero__content">
            <p className="solutions-breadcrumb">Home / Our Solutions</p>
            <h1 id="solutions-page-title">Our Solutions</h1>
            <p className="solutions-hero__description">
              Specialist valuation and advisory support for complex financial questions, investment
              decisions, and contested matters. Our work combines rigorous analysis with commercial
              context and clear, defensible reasoning.
            </p>
          </div>
        </section>

        <section className="solutions-core" aria-labelledby="solutions-expertise-title">
          <div className="solutions-shell">
            <div className="solutions-core__heading">
              <div className="solutions-core__title-block">
                <p className="solutions-section-label">Areas of Core Expertise</p>
                <h2 id="solutions-expertise-title">
                  Focused expertise. Clear
                  <br />
                  conclusions.
                </h2>
              </div>
              <p className="solutions-section-intro">
                A multidisciplinary practice spanning financial disputes, complex valuation, and
                investment advisory—with a consistent focus on rigorous, defensible analysis in
                high-stakes environments.
              </p>
            </div>

            <div className="solutions-core__grid">
              {expertiseCards.map((card) => (
                <Link
                  className="solutions-service-card"
                  href={card.href}
                  key={card.title}
                >
                  <div className="solutions-service-card__image">
                    <Image
                      src={card.image}
                      alt={card.imageAlt}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 387px"
                    />
                  </div>
                  <div className="solutions-service-card__content">
                    <p className="solutions-service-card__eyebrow">{card.eyebrow}</p>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                    <span className="solutions-service-card__link">
                      Explore expertise <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="solutions-cta" aria-labelledby="solutions-cta-title">
          <div className="solutions-cta__inner">
            <h2 id="solutions-cta-title">Discuss a Requirement</h2>
            <p>
              To discuss a valuation assignment or a related matter, contact us at
              contact@valuationinsights.com.
            </p>
            <Link href="/contact" className="solutions-cta__button">
              Contact us
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
