import Image from "next/image";
import Link from "next/link";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import RelatedSectorInsights from "../../components/insights/RelatedSectorInsights";

const typicalAssignments = [
  {
    title: "Banks & NBFCs",
    text: "Valuation of banks, NBFCs, fintech platforms, and financial intermediaries.",
  },
  {
    title: "Funds & Investment Vehicles",
    text: "Valuation of fund interests, AIF structures, and portfolio vehicles.",
  },
  {
    title: "Fair Value & Impairment",
    text: "Fair value and impairment analysis for financial assets and investments.",
  },
  {
    title: "Transactions, Reporting & Disputes",
    text: "Valuation of financial institutions, securities, and interests in transactions, reporting, restructuring, and disputes.",
  },
];

const valuationConsiderations = [
  {
    title: "Capital, Leverage & Risk",
    text: "Regulatory capital, leverage, and risk-weighted assets can materially affect the economics and valuation of financial institutions.",
  },
  {
    title: "Asset Quality & Earnings Stability",
    text: "Asset quality, provisioning, recoveries, and earnings stability connect credit risk and financial performance to valuation.",
  },
  {
    title: "Liquidity & Funding",
    text: "Liquidity, funding structures, and access to capital can influence financial resilience and value.",
  },
  {
    title: "Distribution, Technology & Market Evidence",
    text: "Distribution, technology, intangible assets, and relevant market comparables can influence business economics and valuation.",
  },
];

const subsectors = [
  {
    title: "Banks & NBFCs",
    text: "Deposit-taking and non-bank lending institutions where asset quality, funding, capital, and regulation shape value.",
  },
  {
    title: "Fintech & Digital Financial Services",
    text: "Payments, lending technology, and wealth technology platforms with technology-led distribution.",
  },
  {
    title: "Funds & Investment Vehicles",
    text: "AIFs, private funds, and portfolio structures where underlying assets, terms, and liquidity drive value.",
  },
  {
    title: "Financial Intermediaries & Services",
    text: "Broking, distribution, and advisory businesses with fee-based or flow-driven models.",
  },
];

/*
 * LEGACY RELATED INSIGHTS DATA — kept for rollback.
 * The rendered section now loads the latest 3 published insights
 * from the database through RelatedSectorInsights.
 *
const relatedInsights = [
 *   {
 *     number: "01",
 *     title: "Valuation Perspective",
 *     text: "Capital, leverage, and risk in financial services",
 *   },
 *   {
 *     number: "02",
 *     title: "Valuation Perspective",
 *     text: "Asset quality and earnings stability",
 *   },
 *   {
 *     number: "03",
 *     title: "Valuation Perspective",
 *     text: "Funding, liquidity, and distribution",
 *   },
 *   {
 *     number: "04",
 *     title: "Current Observation",
 *     text: "NBFC funding and credit cycles in India",
 *   },
 *   {
 *     number: "05",
 *     title: "Current Observation",
 *     text: "Fintech regulation and business-model evolution in the Gulf",
 *   },
 * ];
 */

export default function FinancialServicesPage() {
  return (
    <>
      <Header />

      <main className="sector-page">
        <section className="sector-hero">
          <Image
            src="/images/sectors/financial-services.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="sector-hero__image"
          />
          <div className="sector-hero__overlay" />
          <div className="sector-shell sector-hero__content">
            <p className="sector-breadcrumb">Sectors / Financial Services</p>
            <h1>Financial Services</h1>
            <p>
              We work with banks, NBFCs, fintech platforms, funds, and financial
              intermediaries where capital, risk, regulation, and distribution
              shape value. Our analysis considers balance-sheet quality,
              funding, earnings resilience, and the economics of scale.
            </p>
          </div>
        </section>

        <section className="sector-overview">
          <div className="sector-shell sector-overview__grid">
            <div>
              {/* <p className="sector-section-label">01 / Sector Overview</p> */}
            <h2>Understanding Value in Financial Services</h2>
              <p>
                Financial services businesses are shaped by capital, risk,
                regulation, funding, distribution, balance-sheet quality, and
                earnings resilience.
              </p>
              <p>
                We work with banks, NBFCs, fintech platforms, funds, financial
                intermediaries, fund interests, AIF structures, and portfolio
                vehicles across transactions, reporting, restructuring, and
                disputes.
              </p>
              <p>
                Our analysis considers the underlying economics alongside
                regulatory capital, asset quality, liquidity, funding
                structures, distribution, technology, and relevant market
                evidence.
              </p>
            </div>

            <aside className="sector-value-box">
              <p>Value Drivers</p>
              <h3>Capital, risk, and earnings resilience matter.</h3>
              <span>
                Regulatory capital, leverage, asset quality, provisioning,
                funding, liquidity, distribution, technology, and market
                comparables can all influence expectations of future earnings
                and value.
              </span>
              <span className="sector-value-box__read-more">Read more &gt;</span>
            </aside>
          </div>
        </section>

        {/* <section className="sector-applied">
          <div className="sector-shell">
            <h2>Where Our Work Is Applied</h2>
            <p className="sector-section-intro">
              Financial services valuation assignments arise across
              institutions, platforms, funds, investment vehicles, securities,
              and financial interests, with the assignment purpose determining
              the relevant evidence and analysis.
            </p>

            <div className="sector-applied__grid">
              {typicalAssignments.map((item) => (
                <article key={item.number} className="sector-applied-card">
                  <span>{item.number}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section> */}

        <section className="sector-considerations">
          <div className="sector-shell">
            {/* <p className="sector-section-label">03 / Key Valuation Considerations</p> */}
            <h2>What Can Influence Value?</h2>
            <p className="sector-section-intro">
              Financial services businesses are influenced by balance-sheet
              structure, regulatory constraints, credit and asset quality,
              funding conditions, distribution economics, and technology.
            </p>

            <div className="sector-considerations__grid">
              {valuationConsiderations.map((item) => (
                <article className="sector-consideration sector-card-motion">
                  <span className="sector-card-number"></span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="sector-subsectors">
          <div className="sector-shell">
            {/* <p className="sector-section-label">04 / Sub-Sectors</p> */}
            <h2>Financial Services Across Different Models</h2>
            <p className="sector-subsectors__intro">
              Different financial services models generate value through
              different combinations of capital, risk, funding, distribution,
              underlying assets, and technology.
            </p>

            <div className="sector-subsectors__grid">
              {subsectors.map((item) => (
                <article className="sector-subsector sector-card-motion">
                  <span className="sector-subsector-number"></span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <RelatedSectorInsights
          sectorSlug="financial-services"
          sectorTitle="Financial Services Insights"
          intro="Selected observations examining the valuation issues affecting financial services."
        />

        <section className="sector-cta">
          <div className="sector-shell sector-cta__inner">
            <h2>Discuss a Requirement</h2>
            <p>
              If you are considering a valuation assignment involving a bank,
              NBFC, fintech platform, fund, financial intermediary, or related
              interest, we would be pleased to understand the requirement.
            </p>
            <Link href="/contact" className="sector-cta__button">
              Contact us
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
