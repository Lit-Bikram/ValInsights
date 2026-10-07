import Image from "next/image";
import Link from "next/link";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import RelatedSectorInsights from "../../components/insights/RelatedSectorInsights";

const typicalAssignments = [
  {
    title: "Conventional & Renewable Energy",
    text: "Valuation of conventional and renewable energy businesses and projects.",
  },
  {
    title: "Generation Assets & Portfolios",
    text: "Valuation of generation assets, portfolios, and energy platforms.",
  },
  {
    title: "Fair Value & Impairment",
    text: "Fair value and impairment analysis for energy-related investments and assets.",
  },
  {
    title: "Transactions, Reporting & Disputes",
    text: "Valuation of energy businesses, projects, and interests in transactions, reporting, restructuring, and disputes.",
  },
];

const valuationConsiderations = [
  {
    title: "Resource Quality & Plant Performance",
    text: "Technical characteristics, plant performance, availability, and operating costs translate into cash flows and risk.",
  },
  {
    title: "Commodity Exposure, Contracts & Hedging",
    text: "Commodity-price exposure, hedging, tariffs, and contract structures need to be reflected in valuation assumptions.",
  },
  {
    title: "Policy, Subsidies & Transition Risk",
    text: "Regulatory frameworks, subsidies, approvals, and the transition to lower-carbon systems can affect economics.",
  },
  {
    title: "Technology, Grid Access & Demand",
    text: "Technology change, grid access, power-market dynamics, and long-term demand can influence asset economics.",
  },
];

const subsectors = [
  {
    title: "Conventional Energy",
    text: "Oil and gas, refining, and traditional power generation with commodity-linked or regulated cash flows.",
  },
  {
    title: "Solar Energy",
    text: "Solar projects and platforms where irradiation, tariffs, land, grid access, and PPA terms influence value.",
  },
  {
    title: "Wind Energy",
    text: "Wind assets shaped by resource quality, turbine technology, availability, and grid connectivity.",
  },
  {
    title: "Energy Platforms & Storage",
    text: "Integrated portfolios, storage assets, and emerging business models across the energy system.",
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
 *     text: "Resource quality and plant performance",
 *   },
 *   {
 *     number: "02",
 *     title: "Valuation Perspective",
 *     text: "Commodity exposure, contracts, and hedging",
 *   },
 *   {
 *     number: "03",
 *     title: "Valuation Perspective",
 *     text: "Policy, subsidies, and transition risk",
 *   },
 *   {
 *     number: "04",
 *     title: "Current Observation",
 *     text: "Power market dynamics and asset valuation",
 *   },
 *   {
 *     number: "05",
 *     title: "Current Observation",
 *     text: "Energy transition and investment priorities in the Gulf",
 *   },
 * ];
 */

export default function EnergyPage() {
  return (
    <>
      <Header />

      <main className="sector-page">
        <section className="sector-hero">
          <Image
            src="/images/sectors/energy.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="sector-hero__image"
          />
          <div className="sector-hero__overlay" />
          <div className="sector-shell sector-hero__content">
            <p className="sector-breadcrumb">Sectors / Energy</p>
            <h1>Energy</h1>
            <p>
              We work with conventional and renewable energy businesses,
              projects, and assets where resource quality, operating
              performance, contracts, and commodity prices shape value. Our
              analysis considers project economics, policy exposure, technology
              change, and the transition to lower-carbon systems.
            </p>
          </div>
        </section>

        <section className="sector-overview">
          <div className="sector-shell sector-overview__grid">
            <div>
              {/* <p className="sector-section-label">01 / Sector Overview</p> */}
            <h2>Understanding Value in Energy</h2>
              <p>
                Energy businesses and assets can be influenced by resource
                quality, plant performance, operating costs, contractual
                structures, commodity prices, regulation, and technology.
              </p>
              <p>
                We work with conventional and renewable energy businesses and
                projects, generation assets, portfolios, and energy platforms
                across transactions, reporting, restructuring, and disputes.
              </p>
              <p>
                Our analysis considers project economics and operating
                performance alongside policy exposure, market dynamics,
                transition risk, grid access, and long-term demand.
              </p>
            </div>

            <aside className="sector-value-box">
              <p>Value Drivers</p>
              <h3>Project economics and contracted cash flows matter.</h3>
              <span>
                Resource quality, plant performance, commodity exposure,
                tariffs, contracts, regulation, technology, grid access, and
                long-term demand can all influence expectations of future cash
                flows.
              </span>
              <span className="sector-value-box__read-more">Read more &gt;</span>
            </aside>
          </div>
        </section>

        {/* <section className="sector-applied">
          <div className="sector-shell">
            <h2>Where Our Work Is Applied</h2>
            <p className="sector-section-intro">
              Energy valuation assignments arise across businesses, projects,
              generation assets, portfolios, and energy platforms, with the
              relevant evidence reflecting the technical and commercial
              characteristics of the asset.
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
              Energy assets are influenced by a combination of technical
              performance, commodity and contract exposure, regulatory
              conditions, and the economics of the energy transition.
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
            <h2>Energy Across Conventional and Emerging Models</h2>
            <p className="sector-subsectors__intro">
              Different energy models generate value through different
              combinations of resource quality, technology, contracted revenues,
              commodity exposure, and operating performance.
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
          sectorSlug="energy"
          sectorTitle="Energy Insights"
          intro="Selected observations examining the valuation issues affecting energy."
        />

        <section className="sector-cta">
          <div className="sector-shell sector-cta__inner">
            <h2>Discuss a Requirement</h2>
            <p>
              If you are considering a valuation assignment involving an energy
              business, project, generation asset, portfolio, or related
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
