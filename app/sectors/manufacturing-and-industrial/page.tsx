import Image from "next/image";
import Link from "next/link";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

const typicalAssignments = [
  {
    number: "01",
    title: "Manufacturing Enterprises & Industrial Platforms",
    text: "Valuation of manufacturing enterprises and industrial platforms.",
  },
  {
    number: "02",
    title: "Production Lines, Plants & Equipment",
    text: "Valuation of production lines, plants, and specialised equipment.",
  },
  {
    number: "03",
    title: "Fair Value & Impairment",
    text: "Fair value and impairment analysis for operating assets and subsidiaries.",
  },
  {
    number: "04",
    title: "Transactions, Reporting & Disputes",
    text: "Valuation of industrial businesses, assets, and interests in transactions, reporting, restructuring, and disputes.",
  },
];

const valuationConsiderations = [
  {
    number: "01",
    title: "Capacity, Operating Leverage & Cost Structure",
    text: "Fixed and variable costs, capacity utilisation, and operating leverage can shape risk and value.",
  },
  {
    number: "02",
    title: "Technology, Automation & Asset Life",
    text: "Technology, automation, capex intensity, and remaining useful life can affect asset economics and obsolescence.",
  },
  {
    number: "03",
    title: "Cyclicality, Order Books & Input Costs",
    text: "Commercial volatility, order books, input costs, and supply-chain conditions need to be translated into financial assumptions.",
  },
  {
    number: "04",
    title: "Customer Concentration & Competitive Position",
    text: "Customer concentration, product mix, pricing power, and competitive position can influence the durability of cash flows.",
  },
];

const subsectors = [
  {
    number: "01",
    title: "Engineered Products & Components",
    text: "Precision manufacturing and industrial components where design, quality, and customer relationships support margins.",
  },
  {
    number: "02",
    title: "Process & Heavy Industries",
    text: "Chemicals, metals, cement, and other process-based operations with significant capital intensity.",
  },
  {
    number: "03",
    title: "Consumer & Discrete Manufacturing",
    text: "FMCG-linked products, durables, and assembly-based businesses shaped by brand, distribution, and product mix.",
  },
  {
    number: "04",
    title: "Industrial Services & Equipment",
    text: "Equipment providers, maintenance businesses, and service platforms with recurring or aftermarket revenue.",
  },
];

const relatedInsights = [
  {
    number: "01",
    title: "Valuation Perspective",
    text: "Capacity, operating leverage, and cost structure",
  },
  {
    number: "02",
    title: "Valuation Perspective",
    text: "Technology, automation, and asset life",
  },
  {
    number: "03",
    title: "Valuation Perspective",
    text: "Cyclicality, order books, and input costs",
  },
  {
    number: "04",
    title: "Current Observation",
    text: "Manufacturing capital expenditure and asset values",
  },
  {
    number: "05",
    title: "Current Observation",
    text: "Industrial diversification and localisation in the Gulf",
  },
];

export default function ManufacturingIndustrialPage() {
  return (
    <>
      <Header />

      <main className="sector-page">
        <section className="sector-hero">
          <Image
            src="/images/sectors/manufacturing-and-industrial.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="sector-hero__image"
          />
          <div className="sector-hero__overlay" />
          <div className="sector-shell sector-hero__content">
            <p className="sector-breadcrumb">
              Sectors / Manufacturing & Industrial
            </p>
            <h1>Manufacturing & Industrial</h1>
            <p>
              We work with manufacturing enterprises, industrial platforms, and
              specialised assets where capacity, technology, product mix, and
              cost structures determine value. Our analysis reflects operating
              leverage, cyclicality, capital intensity, customer concentration,
              and supply-chain conditions.
            </p>
          </div>
        </section>

        <section className="sector-overview">
          <div className="sector-shell sector-overview__grid">
            <div>
              <p className="sector-label">01 / Sector Overview</p>
              <h2>Understanding Value in Manufacturing & Industrial</h2>
              <p>
                Manufacturing and industrial businesses are influenced by
                capacity, operating leverage, capital intensity, technology,
                product mix, customer concentration, and supply-chain
                conditions.
              </p>
              <p>
                We work with manufacturing enterprises, industrial platforms,
                production lines, plants, specialised equipment, operating
                assets, and subsidiaries across transactions, reporting,
                restructuring, and disputes.
              </p>
              <p>
                Our analysis considers commercial performance alongside capacity
                utilisation, cost structures, cyclicality, order books, input
                costs, technology, automation, and asset life.
              </p>
            </div>

            <aside className="sector-value-box">
              <p>Value Driver</p>
              <h3>Operating leverage and asset intensity matter.</h3>
              <span>
                Capacity utilisation, fixed and variable costs, capex, asset
                life, order books, input costs, customer concentration, pricing
                power, and competitive position can all influence expectations
                of future cash flows.
              </span>
            </aside>
          </div>
        </section>

        <section className="sector-applied">
          <div className="sector-shell">
            <p className="sector-label">02 / Typical Assignments</p>
            <h2>Where Our Work Is Applied</h2>
            <p className="sector-section-intro">
              Manufacturing and industrial valuation assignments arise across
              enterprises, platforms, production assets, plants, equipment, and
              operating interests, with the purpose of the assignment
              determining the relevant analysis.
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
        </section>

        <section className="sector-considerations">
          <div className="sector-shell">
            <p className="sector-label">03 / Key Valuation Considerations</p>
            <h2>What Can Influence Value?</h2>
            <p className="sector-section-intro">
              Manufacturing and industrial value is influenced by operating
              leverage, asset intensity, commercial cyclicality, technology,
              customer relationships, and supply-chain conditions.
            </p>

            <div className="sector-considerations__grid">
              {valuationConsiderations.map((item) => (
                <article key={item.number} className="sector-consideration">
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
            <h2>Industrial Businesses Across Different Models</h2>
            <p className="sector-subsectors__intro">
              Different manufacturing and industrial models generate value
              through different combinations of capacity, technology, product
              mix, customers, assets, and recurring or aftermarket revenue.
            </p>

            <div className="sector-subsectors__grid">
              {subsectors.map((item) => (
                <article key={item.number} className="sector-subsector">
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="sector-insights">
          <div className="sector-shell">
            <p className="sector-label">05 / Related Insights</p>
            <h2>Manufacturing & Industrial</h2>
            <p className="sector-insights__intro">
              Selected observations examining the valuation issues affecting
              manufacturing and industrial businesses.
            </p>

            <div className="sector-insights__list">
              {relatedInsights.map((item) => (
                <Link
                  key={item.text}
                  href="/insights?sector=__SLUG__"
                  className="sector-insight-row"
                >
                  <span>{item.title}</span>
                  <strong>{item.text}</strong>
                  <b>→</b>
                </Link>
              ))}
            </div>

            <Link href="/sectors" className="sector-return">
              ← Return to Sector Dashboard
            </Link>
          </div>
        </section>

        <section className="sector-cta">
          <div className="sector-shell sector-cta__inner">
            <h2>Discuss a Requirement</h2>
            <p>
              If you are considering a valuation assignment involving a
              manufacturing enterprise, industrial platform, plant, production
              line, specialised equipment, or related interest, we would be
              pleased to understand the requirement.
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
