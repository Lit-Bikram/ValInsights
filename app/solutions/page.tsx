import Image from "next/image";
import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const coreServices = [
  {
    title: "Securities & Financial Assets",
    description:
      "Valuation of businesses, equity and debt securities, intangible assets, intellectual property, and complex instruments.",
    image: "/images/solutions/securities-financial-assets.jpg",
    href: "/solutions/securities-financial-assets",
  },
  {
    title: "Real Estate",
    description:
      "Valuation of commercial, residential, industrial, hospitality, infrastructure-linked, and development assets.",
    image: "/images/solutions/real-estate.jpg",
    href: "/solutions/real-estate",
  },
  {
    title: "Tangible Assets",
    description:
      "Valuation of plant, machinery, specialised equipment, production lines, infrastructure assets, and other physical assets.",
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

const purposes = [
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

const workPrinciples = [
  {
    title: "Sector-aware analysis",
    description:
      "We begin with the commercial and operating factors that influence value in the relevant business, asset, or instrument.",
  },
  {
    title: "Appropriate methodology",
    description:
      "We select and, where necessary, reconcile income, market, cost, option-pricing, and scenario-based approaches according to the assignment.",
  },
  {
    title: "Transparent reasoning",
    description:
      "We explain assumptions, evidence, sensitivities, and limitations clearly so that the conclusion can be understood and assessed by relevant stakeholders.",
  },
  {
    title: "Purpose-led reporting",
    description:
      "Our deliverables are structured around the requirements of the assignment, whether the audience is a board, investor, auditor, lender, regulator, counsel, tribunal, or transaction party.",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <Header />

      <main className="solutions-page">

        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="solutions-hero">
          <Image
            src="/images/shared/inner-page-banner.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="solutions-hero__image"
          />

          <div className="solutions-hero__overlay" />

          <div className="solutions-shell solutions-hero__content">
            <p className="solutions-breadcrumb">
              Home / Our Solution
            </p>

            <h1>Our Solution</h1>

            <p>
              Our work is organised around four valuation disciplines:
              securities and financial assets, real estate, tangible assets,
              and contested matters. Within each, we bring together
              commercial context, financial evidence, and appropriate
              methodology to produce conclusions that are clear,
              well-supported, and fit for their intended use.
            </p>
          </div>
        </section>


        {/* =====================================================
            CORE SERVICES
        ====================================================== */}

        <section className="solutions-core">
          <div className="solutions-shell">

            <h2>Core Services</h2>

            <p className="solutions-section-intro">
              Explore our main operational disciplines:
            </p>

            <div className="solutions-core__grid">
              {coreServices.map((service) => (
                <Link
                  key={service.title}
                  href={service.href}
                  className="solutions-service-card"
                >
                  <div className="solutions-service-card__content">
                    <h3>{service.title}</h3>

                    <p>{service.description}</p>

                    <span className="solutions-service-card__link">
                      Learn more{" "}
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>

                  <div className="solutions-service-card__image">
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 620px"
                    />
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </section>


        {/* =====================================================
            PURPOSES OF VALUATION
        ====================================================== */}

        <section className="solutions-purposes">
          <div className="solutions-shell">

            <h2>Purposes of Valuation</h2>

            <p className="solutions-section-intro">
              Across these disciplines, assignments commonly arise in three
              primary contexts:
            </p>

            <div className="solutions-purposes__grid">
              {purposes.map((purpose) => (
                <article
                  key={purpose.title}
                  className="solutions-purpose-card"
                >
                  <h3>{purpose.title}</h3>

                  <p>{purpose.description}</p>
                </article>
              ))}
            </div>

          </div>
        </section>


        {/* =====================================================
            HOW WE WORK
        ====================================================== */}

        <section className="solutions-work">
          <div className="solutions-shell">

            <h2>How We Work</h2>

            <p className="solutions-section-intro">
              Our systematic approach ensures structural robustness across
              every engagement framework:
            </p>

            <div className="solutions-work__grid">
              {workPrinciples.map((item) => (
                <article
                  key={item.title}
                  className="solutions-work-card"
                >
                  <h3>{item.title}</h3>

                  <p>{item.description}</p>
                </article>
              ))}
            </div>

          </div>
        </section>


        {/* =====================================================
            CTA
        ====================================================== */}

        <section className="solutions-cta">
          <div className="solutions-shell solutions-cta__inner">

            <h2>Discuss a Requirement</h2>

            <p>
              To discuss a valuation assignment or a related matter,
              contact us at contact@valuationinsights.com or [phone].
            </p>

            <Link
              href="/contact"
              className="solutions-cta__button"
            >
              Contact us
            </Link>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}