import Image from "next/image";
import Link from "next/link";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

const coreServices = [
  {
    title: "Securities & Financial Assets",
    description:
      "Valuation of businesses, equity and debt securities, intangible assets, intellectual property, and complex instruments.",
    image: "/images/solutions/securities-financial-assets.jpg",
    imageAlt: "Financial market data representing securities and financial assets",
    href: "/solutions/securities-financial-assets",
  },
  {
    title: "Tangible Assets",
    description:
      "Valuation of plant, machinery, specialised equipment, production lines, infrastructure assets, and other physical assets.",
    image: "/images/solutions/tangible-assets.jpg",
    imageAlt: "Industrial machinery and production equipment",
    href: "/solutions/tangible-assets",
  },
  {
    title: "Real Estate",
    description:
      "Valuation of commercial, residential, industrial, hospitality, infrastructure-linked, and development assets.",
    image: "/images/solutions/real-estate.jpg",
    imageAlt: "Modern commercial real estate building",
    href: "/solutions/real-estate",
  },
];

const valuationPurposes = [
  {
    title: "Financial Reporting",
    description:
      "Fair value measurement, purchase price allocation, impairment testing, intangible assets, financial instruments, and other requirements under Ind AS and IFRS.",
  },
  {
    title: "Investments and Transactions",
    description:
      "Acquisitions, disposals, capital raises, co-investments, exits, portfolio reviews, restructuring, and related corporate actions.",
  },
  {
    title: "Disputes",
    description:
      "Shareholder and ownership matters, commercial claims, M&A disputes, damages assessments, arbitration, mediation, and litigation.",
  },
];

const approachItems = [
  {
    title: "Sector-Aware Analysis",
    description:
      "We begin with the commercial and operating factors that influence value in the relevant business, asset, or instrument.",
  },
  {
    title: "Appropriate Methodology",
    description:
      "We select and, where necessary, reconcile income, market, cost, option-pricing, and scenario-based approaches according to the assignment.",
  },
  {
    title: "Transparent Reasoning",
    description:
      "We explain assumptions, evidence, sensitivities, and limitations clearly so that the conclusion can be understood and assessed by relevant stakeholders.",
  },
  {
    title: "Purpose-Led Reporting",
    description:
      "Our deliverables are structured around the requirements of the assignment, whether the audience is a board, investor, auditor, lender, regulator, counsel, tribunal, or transaction party.",
  },
];

export default function ValuationPage() {
  return (
    <>
      <Header />

      <main className="service-page valuation-page" data-service-page="valuation">
        <section className="service-hero service-hero--inner valuation-page__hero" aria-labelledby="valuation-hero-title">
          <Image
            src="/images/shared/inner-page-banner.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="service-hero__image"
          />
          <div className="service-hero__overlay" aria-hidden="true" />
          <div className="service-shell service-hero__content valuation-page__hero-content">
            <p className="service-breadcrumb">Home / Our Solution / Valuation</p>
            <h1 id="valuation-hero-title">Valuation</h1>
            <p className="service-hero__intro">
              Our work is organised around four valuation disciplines: securities and financial assets, real estate, tangible assets, and contested matters. Within each, we bring together commercial context, financial evidence, and appropriate methodology to produce conclusions that are clear, well-supported, and fit for their intended use.
            </p>
          </div>
        </section>

        <section className="valuation-core-services" aria-labelledby="valuation-core-services-title">
          <div className="valuation-shell">
            <div className="valuation-section-heading">
              <h2 id="valuation-core-services-title">Core Services</h2>
              <p>Explore our main operational disciplines:</p>
            </div>

            <div className="valuation-services-grid">
              {coreServices.map((service) => (
                <Link className="valuation-service-card" href={service.href} key={service.title}>
                  <div className="valuation-service-card__content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <span className="valuation-service-card__link">
                      Learn more <span aria-hidden="true">→</span>
                    </span>
                  </div>
                  <div className="valuation-service-card__image">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 390px"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="valuation-purposes" aria-labelledby="valuation-purposes-title">
          <div className="valuation-shell">
            <div className="valuation-section-heading">
              <h2 id="valuation-purposes-title">Purposes of Valuation</h2>
              <p>Across these disciplines, assignments commonly arise in three primary contexts:</p>
            </div>
            <div className="valuation-purposes-grid">
              {valuationPurposes.map((purpose) => (
                <article className="valuation-purpose-card" key={purpose.title}>
                  <h3>{purpose.title}</h3>
                  <p>{purpose.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="valuation-approach" aria-labelledby="valuation-approach-title">
          <div className="valuation-shell">
            <div className="valuation-section-heading">
              <h2 id="valuation-approach-title">How We Work</h2>
              <p>Our systematic approach ensures structural robustness across every engagement framework:</p>
            </div>
            <div className="valuation-approach-grid">
              {approachItems.map((item) => (
                <article className="valuation-approach-item" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="service-cta valuation-page__cta">
          <div className="service-shell service-cta__inner">
            <h2>Discuss a Requirement</h2>
            <p>
              To discuss a valuation assignment or a related matter, contact us at contact@valuationinsights.com.
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
