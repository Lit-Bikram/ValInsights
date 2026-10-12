import Image from "next/image";
import Link from "next/link";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

// Draft copy for layout purposes. Replace the titles and descriptions with approved content later.
const advisoryAreas = [
  {
    number: "01",
    title: "Strategic Investment Decisions",
    description:
      "Independent valuation perspectives to inform acquisitions, investments and strategic capital allocation.",
    image: "/images/solutions/securities-financial-assets.jpg",
    imageAlt: "Financial analysis materials for an investment decision",
    variant: "standard",
  },
  {
    number: "02",
    title: "Business & Equity Valuation",
    description:
      "Structured assessment of businesses, equity interests and the assumptions that shape value.",
    image: "/images/solutions/tangible-assets.jpg",
    imageAlt: "Business and asset valuation context",
    variant: "standard",
  },
  {
    number: "03",
    title: "Investment & Exit Analysis",
    description:
      "Financial analysis to help evaluate investment opportunities, exit options and potential outcomes.",
    image: "/images/solutions/real-estate.jpg",
    imageAlt: "Commercial property considered as an investment asset",
    variant: "standard",
  },
  {
    number: "04",
    title: "Portfolio & Asset Review",
    description:
      "Independent perspectives on portfolio assets, performance drivers and key valuation sensitivities.",
    image: "/images/solutions/securities-financial-assets.jpg",
    imageAlt: "Financial assets reviewed for portfolio analysis",
    variant: "wide",
  },
  {
    number: "05",
    title: "Transaction Support",
    description:
      "Decision-focused valuation input across transaction planning, negotiation and review.",
    image: "/images/solutions/tangible-assets.jpg",
    imageAlt: "Assets and documentation prepared for transaction review",
    variant: "wide",
  },
];

export default function InvestmentAdvisoryPage() {
  return (
    <>
      <Header />

      <main
        className="service-page investment-advisory-page"
        data-service-page="investment-advisory"
      >
        <section
          className="service-hero service-hero--inner investment-advisory-hero"
          aria-labelledby="investment-advisory-hero-title"
        >
          <Image
            src="/images/solutions/securities-financial-assets.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="service-hero__image"
          />
          <div className="service-hero__overlay" aria-hidden="true" />

          <div className="service-shell service-hero__content">
            <p className="service-breadcrumb">
              Home / Solutions / Investment Advisory
            </p>
            <h1 id="investment-advisory-hero-title">Investment Decisions</h1>
            <p className="service-hero__intro">
              Draft introduction: independent valuation and financial analysis
              to help investors assess opportunities, understand risk and make
              informed capital allocation decisions across complex assets and
              transactions.
            </p>
          </div>
        </section>

        <section
          className="investment-advisory-intro"
          aria-labelledby="investment-advisory-intro-title"
        >
          <div className="service-shell investment-advisory-intro__grid">
            <div className="investment-advisory-intro__copy">
              <p className="service-label">Investment Advisory</p>
              <h2 id="investment-advisory-intro-title">
                Clarity Across Capital and Value
              </h2>
              <p>
                Draft copy: investment decisions often depend on a clear view of
                value, commercial context and the assumptions behind financial
                projections. Our work is designed to bring those elements into
                focus.
              </p>
              <p>
                We combine independent analysis with a practical understanding
                of investor priorities, helping decision-makers examine
                opportunities, compare scenarios and assess the factors that may
                influence value over time.
              </p>
            </div>

            <aside className="investment-advisory-focus" aria-label="Our focus">
              <div className="investment-advisory-focus__image">
                <Image
                  src="/images/solutions/securities-financial-assets.jpg"
                  alt="Financial documents and market materials used in investment analysis"
                  fill
                  sizes="(max-width: 760px) 100vw, 520px"
                />
                <div className="investment-advisory-focus__caption">
                  <span>Investment Advisory</span>
                  <strong>Independent perspective. Informed decisions.</strong>
                </div>
              </div>
              <div className="investment-advisory-focus__note">
                <p className="service-label">Our Focus</p>
                <h3>Evidence-Led Insight for Capital Decisions</h3>
                <p>
                  Draft copy: clear analysis of value, assumptions and risk to
                  support investment committees, owners and transaction
                  stakeholders.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section
          className="investment-advisory-areas"
          aria-labelledby="investment-advisory-areas-title"
        >
          <div className="service-shell">
            <div className="investment-advisory-areas__heading">
              <div>
                <p className="service-label">Scope of Work</p>
                <h2 id="investment-advisory-areas-title">
                  Investment Advisory Services
                </h2>
              </div>
              <p>
                Draft overview: tailored valuation and financial analysis across
                investment planning, asset review and transaction decisions,
                shaped around the questions that matter to each mandate.
              </p>
            </div>

            <div className="investment-advisory-grid">
              {advisoryAreas.map((area) => (
                <article
                  key={area.number}
                  className={`investment-advisory-card investment-advisory-card--${area.variant}`}
                >
                  <div className="investment-advisory-card__image">
                    <Image
                      src={area.image}
                      alt={area.imageAlt}
                      fill
                      sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 590px"
                    />
                  </div>
                  <div className="investment-advisory-card__body">
                    {/* <span className="investment-advisory-card__number">{area.number}</span> */}
                    <span className="investment-advisory-card__number"></span>
                    <div>
                      <h3>{area.title}</h3>
                      <p>{area.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="service-cta">
          <div className="service-shell service-cta__inner">
            <h2>Discuss a Requirement</h2>
            <p>
              To discuss a valuation assignment or a related matter, contact us
              at contact@valuationinsights.com.{" "}
            </p>
            <Link href="/contact" className="service-cta__button">
              Contact us
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
