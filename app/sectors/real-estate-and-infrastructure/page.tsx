import Image from "next/image";
import Link from "next/link";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import RelatedSectorInsights from "../../components/insights/RelatedSectorInsights";

const typicalAssignments = [
  {
    number: "01",
    title: "Commercial Real Estate",
    text: "Office, retail, and mixed-use assets where location, lease quality, occupancy, and income stability shape value.",
  },
  {
    number: "02",
    title: "Residential Development",
    text: "Housing projects, townships, and residential platforms where timing, absorption, pricing, and cost-to-complete are central.",
  },
  {
    number: "03",
    title: "Logistics & Warehousing",
    text: "Industrial parks, warehouses, and supply-chain assets influenced by access, location, tenant quality, and demand.",
  },
  {
    number: "04",
    title: "Infrastructure Assets",
    text: "Roads, utilities, and other long-life assets with regulated, contracted, or concession-based revenues.",
  },
];

const valuationConsiderations = [
  {
    number: "01",
    title: "Location, Zoning & Highest-and-Best-Use",
    text: "Site-specific factors can materially affect the economic use, risk, and value of property.",
  },
  {
    number: "02",
    title: "Leases, Occupancy & Income Stability",
    text: "Lease profiles, occupancy, rental growth, and income sustainability influence cash-flow visibility.",
  },
  {
    number: "03",
    title: "Development Risk & Exit Assumptions",
    text: "Cost, timing, financing, absorption, pricing, and market cycles need to be reflected in development analysis.",
  },
  {
    number: "04",
    title: "Concessions, Regulation & Contracted Revenues",
    text: "Regulation, concessions, contracted revenues, and long-term cash-flow visibility can be central to infrastructure valuation.",
  },
];

const subsectors = [
  {
    number: "01",
    title: "Commercial Real Estate",
    text: "Office, retail, and mixed-use assets where location, lease quality, occupancy, and income stability shape value.",
  },
  {
    number: "02",
    title: "Residential Development",
    text: "Housing projects, townships, and residential platforms where timing, absorption, pricing, and cost-to-complete are central.",
  },
  {
    number: "03",
    title: "Logistics & Warehousing",
    text: "Industrial parks, warehouses, and supply-chain assets influenced by access, location, tenant quality, and demand.",
  },
  {
    number: "04",
    title: "Infrastructure Assets",
    text: "Roads, utilities, and other long-life assets with regulated, contracted, or concession-based revenues.",
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
 *     text: "Location, zoning, and highest-and-best-use analysis",
 *   },
 *   {
 *     number: "02",
 *     title: "Valuation Perspective",
 *     text: "Leases, occupancy, and income stability",
 *   },
 *   {
 *     number: "03",
 *     title: "Valuation Perspective",
 *     text: "Development risk and exit assumptions",
 *   },
 *   {
 *     number: "04",
 *     title: "Current Observation",
 *     text: "Real estate market cycles and valuation",
 *   },
 *   {
 *     number: "05",
 *     title: "Current Observation",
 *     text: "Infrastructure concessions in the Gulf",
 *   },
 * ];
 */

export default function RealEstateInfrastructurePage() {
  return (
    <>
      <Header />

      <main className="sector-page">
        <section className="sector-hero">
          <Image
            src="/images/sectors/real-estate-and-infrastructure.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="sector-hero__image"
          />
          <div className="sector-hero__overlay" />
          <div className="sector-shell sector-hero__content">
            <p className="sector-breadcrumb">
              Sectors / Real Estate & Infrastructure
            </p>
            <h1>Real Estate & Infrastructure</h1>
            <p>
              We work with real assets, development projects, income-producing
              property, and infrastructure investments where location, leases,
              contracts, and long-term cash flows are central to value. Our
              analysis considers development risk, income stability, market
              conditions, and the regulatory framework applicable to the asset.
            </p>
          </div>
        </section>

        <section className="sector-overview">
          <div className="sector-shell sector-overview__grid">
            <div>
              <p className="sector-label">01 / Sector Overview</p>
              <h2>Understanding Value in Real Estate & Infrastructure</h2>
              <p>
                Real estate and infrastructure value is closely linked to
                location, contractual arrangements, income visibility,
                development potential, and the long-term economics of the
                underlying asset.
              </p>
              <p>
                We work with development projects, income-producing property,
                real estate portfolios, SPVs, platforms, and
                infrastructure-linked assets across transactions, reporting,
                restructuring, and disputes.
              </p>
              <p>
                Our analysis considers the physical and contractual
                characteristics of the asset alongside market conditions,
                financing, development risk, regulation, and expected cash
                flows.
              </p>
            </div>

            <aside className="sector-value-box">
              <p>Value Driver</p>
              <h3>Cash-flow visibility and asset-specific risk matter.</h3>
              <span>
                Location, lease quality, occupancy, development assumptions,
                financing, regulation, and contracted or concession-based
                revenues can all influence expectations of future cash flows.
              </span>
            </aside>
          </div>
        </section>

        {/* <section className="sector-applied">
          <div className="sector-shell">
            <p className="sector-label">02 / Typical Assignments</p>
            <h2>Where Our Work Is Applied</h2>
            <p className="sector-section-intro">
              Real estate and infrastructure valuation assignments arise across
              income-producing assets, development projects, portfolios, SPVs,
              and infrastructure interests, with the purpose of the assignment
              determining the relevant evidence and methodology.
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
            <p className="sector-label">03 / Key Valuation Considerations</p>
            <h2>What Can Influence Value?</h2>
            <p className="sector-section-intro">
              Real estate and infrastructure assets are influenced by a
              combination of physical characteristics, contractual arrangements,
              market conditions, development assumptions, and long-term
              cash-flow visibility.
            </p>

            <div className="sector-considerations__grid">
              {valuationConsiderations.map((item) => (
                <article key={item.number} className="sector-consideration sector-card-motion">
                  <span>{item.number}</span>
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
            <p className="sector-label">04 / Sub-sectors</p>
            <h2>Real Assets Across Different Models</h2>
            <p className="sector-subsectors__intro">
              Different real estate and infrastructure assets generate value
              through different combinations of location, income, development
              potential, contractual revenue, and market conditions.
            </p>

            <div className="sector-subsectors__grid">
              {subsectors.map((item) => (
                <article key={item.number} className="sector-subsector sector-card-motion">
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <RelatedSectorInsights
          sectorSlug="real-estate-infrastructure"
          sectorTitle="Real Estate & Infrastructure"
          intro="Selected observations examining the valuation issues affecting real estate and infrastructure."
        />

        <section className="sector-cta">
          <div className="sector-shell sector-cta__inner">
            <h2>Discuss a Requirement</h2>
            <p>
              If you are considering a valuation assignment involving real
              estate, infrastructure, a development project, or a related
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
