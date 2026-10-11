import Image from "next/image";
import Link from "next/link";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

const practiceAreas = [
  {
    number: "01",
    title: "Shareholder Negotiations & Disputes",
    description:
      "Financial analysis to support contested ownership and shareholder matters.",
    image: "/images/shared/inner-page-banner.jpg",
    imageAlt: "Legal and financial reference materials",
    variant: "standard",
  },
  {
    number: "02",
    title: "Loss Quantification Claims",
    description:
      "Assessment of financial loss and the evidence supporting quantum positions.",
    image: "/images/solutions/litigation-support.jpg",
    imageAlt: "Documents reviewed for a financial dispute",
    variant: "standard",
  },
  {
    number: "03",
    title: "Contentious Restructurings",
    description:
      "Analysis of value and financial positions in complex restructuring contexts.",
    image: "/images/solutions/securities-financial-assets.jpg",
    imageAlt: "Commercial buildings representing corporate restructuring",
    variant: "standard",
  },
  {
    number: "04",
    title: "Cross-Border Mediation & Arbitration",
    description:
      "Support for matters involving parties, assets, or proceedings across jurisdictions.",
    image: "/images/solutions/real-estate.jpg",
    imageAlt: "Professionals collaborating on a cross-border matter",
    variant: "wide",
  },
  {
    number: "05",
    title: "Expert Determination Mandates",
    description:
      "Clear, evidence-led analysis for independent expert review and determination.",
    image: "/images/solutions/litigation-support.jpg",
    imageAlt: "Courthouse architecture representing expert determination",
    variant: "wide",
  },
];

export default function DisputesLitigationSupportPage() {
  return (
    <>
      <Header />

      <main
        className="service-page disputes-detail-page"
        data-service-page="disputes-litigation-support"
      >
        <section
          className="service-hero service-hero--inner disputes-detail-hero"
          aria-labelledby="disputes-hero-title"
        >
          <Image
            src="/images/solutions/litigation-support.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="service-hero__image"
          />
          <div className="service-hero__overlay" aria-hidden="true" />

          <div className="service-shell service-hero__content">
            <p className="service-breadcrumb">
              Home / Solutions / Disputes &amp; Quantum
            </p>
            <h1 id="disputes-hero-title">Financial Disputes</h1>
            <p className="service-hero__intro">
              With over two decades of specialist experience, the practice
              encompasses the full lifecycle of financial disputes, from initial
              quantification through to expert testimony, arbitration and final
              settlement.
            </p>
          </div>
        </section>

        <section
          className="disputes-intro"
          aria-labelledby="disputes-intro-title"
        >
          <div className="service-shell disputes-intro__grid">
            <div className="disputes-intro__copy">
              <p className="service-label">Disputes Practice</p>
              <h2 id="disputes-intro-title">
                Financial Analysis for Contested Matters
              </h2>
              <p>
                Clients include corporates, sovereign wealth funds, private
                capital investors and financial institutions operating across
                India, Europe and the Middle East.
              </p>
              <p>
                The approach combines rigorous financial analysis with an
                investor-grade perspective, ensuring that quantum positions are
                both technically robust and commercially credible in contested
                environments.
              </p>
            </div>

            <aside className="disputes-focus" aria-label="Our focus">
              <div className="disputes-focus__image">
                <Image
                  src="/images/solutions/litigation-support.jpg"
                  alt="Classical courthouse architecture representing financial disputes and legal proceedings"
                  fill
                  sizes="(max-width: 760px) 100vw, 520px"
                />
                <div className="disputes-focus__caption">
                  <span>Disputes &amp; Quantum</span>
                  <strong>Evidence-led analysis for complex matters</strong>
                </div>
              </div>
              <div className="disputes-focus__note">
                <p className="service-label">Our Focus</p>
                <h3>Independent Analysis. Defensible Conclusions.</h3>
                <p>
                  Support across the lifecycle of a dispute, from initial
                  assessment and loss quantification to expert determination,
                  arbitration and settlement.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section
          className="disputes-practice-areas"
          aria-labelledby="disputes-practice-title"
        >
          <div className="service-shell">
            <div className="disputes-practice-areas__heading">
              <div>
                <p className="service-label">Scope of Work</p>
                <h2 id="disputes-practice-title">Disputes Practice Areas</h2>
              </div>
              <p>
                Specialist support across complex financial and commercial
                disputes, tailored to the questions at the centre of each
                matter.
              </p>
            </div>

            <div className="disputes-practice-grid">
              {practiceAreas.map((area) => (
                <article
                  key={area.number}
                  className={`disputes-practice-card disputes-practice-card--${area.variant}`}
                >
                  <div className="disputes-practice-card__image">
                    <Image
                      src={area.image}
                      alt={area.imageAlt}
                      fill
                      sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 590px"
                    />
                  </div>
                  <div className="disputes-practice-card__body">
                    {/* <span className="disputes-practice-card__number">{area.number}</span> */}
                    <span className="disputes-practice-card__number"></span>
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
              at contact@valuationinsights.com.
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
