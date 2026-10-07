import Image from "next/image";
import Link from "next/link";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import RelatedSectorInsights from "../../components/insights/RelatedSectorInsights";

const typicalAssignments = [
  {
    title: "Software, SaaS & Digital Platforms",
    text: "Cloud-based and licensed software businesses where retention, expansion, margins, and recurring revenue shape value.",
  },
  {
    title: "Technology-Enabled Services",
    text: "IT services, analytics, and digital transformation businesses with project, managed-service, or recurring revenue.",
  },
  {
    title: "Fair Value & Impairment",
    text: "Fair value and impairment analysis for intangible-intensive operations and technology businesses.",
  },
  {
    title: "Transactions & Disputes",
    text: "Valuation of technology businesses, assets, and interests in transactions, reporting, restructuring, and disputes.",
  },
];

const valuationConsiderations = [
  {
    title: "Recurring Revenue & Unit Economics",
    text: "Retention, expansion, and customer acquisition economics can influence the quality and durability of revenue and therefore prospects for future cash flows.",
  },
  {
    title: "Scalability & Profitability",
    text: "Growth needs to be considered alongside operating leverage, pricing, investment requirements, and the path to profitability.",
  },
  {
    title: "Obsolescence & Competition",
    text: "Technological change, competitive intensity, and regulatory exposure can affect the sustainability of future economic performance.",
  },
  {
    title: "Intellectual Property & R&D",
    text: "Intellectual property, R&D, and platform investment can be important to the economic value of technology businesses and should be reflected appropriately in financial models.",
  },
];

const subsectors = [
  {
    title: "Software & SaaS",
    text: "Cloud-based and licensed software businesses where retention, expansion, margins, and recurring revenue shape value.",
  },
  {
    title: "Digital Platforms & Marketplaces",
    text: "Multi-sided platforms where network effects, take rates, liquidity, and user engagement influence economics.",
  },
  {
    title: "Technology-Enabled Services",
    text: "IT services, analytics, and digital transformation businesses with project, managed-service, or recurring revenue.",
  },
  {
    title: "Media & Content",
    text: "Digital media, content libraries, and distribution models where intellectual property and audience determine cash flows.",
  },
];

/*
 * LEGACY RELATED INSIGHTS DATA — kept for rollback.
 * The rendered section now loads the latest 3 published insights
 * from the database through RelatedSectorInsights.
 *
const relatedInsights = [
 *   {
 *     type: "Valuation Perspective",
 *     title: "Recurring revenue and unit economics in software businesses",
 *   },
 *   {
 *     type: "Valuation Perspective",
 *     title: "Scalability and profitability in digital platforms",
 *   },
 *   {
 *     type: "Valuation Perspective",
 *     title: "Intangibles, R&D, and platform investment",
 *   },
 *   {
 *     type: "Current Observation",
 *     title: "SaaS growth and profitability",
 *   },
 *   {
 *     type: "Current Observation",
 *     title: "Digital regulation and platform risk",
 *   },
 * ];
 */

export default function TechnologyDigitalPage() {
  return (
    <>
      <Header />

      <main className="sector-page">
        {/* Hero */}
        <section className="sector-hero">
          <Image
            src="/images/sectors/technology-and-digital.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="sector-hero__image"
          />

          <div className="sector-hero__overlay" />

          <div className="sector-shell sector-hero__content">
            <p className="sector-breadcrumb">
              Sectors / Technology &amp; Digital
            </p>

            <h1>Technology &amp; Digital</h1>

            <p>
              We work with software, SaaS, digital platforms, and
              technology-enabled businesses where intangibles, scalability, and
              rapid change shape value. Our analysis considers recurring
              revenue, customer economics, network effects, intellectual
              property, and the pace of technological change.
            </p>
          </div>
        </section>

        {/* Sector overview */}
        <section className="sector-overview">
          <div className="sector-shell sector-overview__grid">
            <div>
              {/* <p className="sector-section-label">01 / Sector Overview</p> */}
            <h2>Understanding Value in Technology Businesses</h2>

              <p>
                Technology and digital businesses can have economic
                characteristics that differ materially from traditional
                asset-heavy businesses. Intangibles, recurring revenue,
                customer relationships, intellectual property, and network
                effects can play a central role in determining future economic
                performance.
              </p>

              <p>
                We work with software, SaaS, digital platforms, and
                technology-enabled businesses across transactions, reporting,
                restructuring, and disputes. Our analysis considers the
                commercial model alongside the intrinsic revenue and operating
                drivers.
              </p>

              <p>
                Particular attention is given to the economics underlying
                growth — including retention, expansion, scalability, customer
                acquisition, investment requirements, and the pace of
                technological change.
              </p>
            </div>

            <aside className="sector-value-box">
              <p>Value Drivers</p>
              <h3>
                Growth is only one part of the valuation equation.
              </h3>
              <span>
                Retention, revenue economics, margins, investment requirements,
                competitive intensity, and technology can all influence
                expectations of future cash flows.
              </span>
              <span className="sector-value-box__read-more">Read more &gt;</span>
            </aside>
          </div>
        </section>

        {/* Typical assignments */}
        {/* <section className="sector-applied">
          <div className="sector-shell">
            <h2>Where Our Work Is Applied</h2>

            <p className="sector-section-intro">
              Technology and digital valuation assignments arise in several
              contexts. The purpose of the assignment determines the relevant
              evidence, assumptions, methodology, and reporting requirements.
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

        {/* Key valuation considerations */}
        <section className="sector-considerations">
          <div className="sector-shell">
            {/* <p className="sector-section-label">03 / Key Valuation Considerations</p> */}
            <h2>What Can Influence Value?</h2>

            <p className="sector-section-intro">
              Technology businesses are often influenced by a combination of
              financial performance, customer behaviour, competitive
              conditions, intellectual property, and technological change.
            </p>

            <div className="sector-considerations__grid">
              {valuationConsiderations.map((item) => (
                <article  className="sector-consideration sector-card-motion">
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

        {/* Sub-sectors */}
        <section className="sector-subsectors">
          <div className="sector-shell">
            {/* <p className="sector-section-label">04 / Sub-Sectors</p> */}
            <h2>Technology Businesses Across Different Models</h2>

            <p className="sector-subsectors__intro">
              Different technology business models generate value through
              different combinations of customers, intellectual property,
              platforms, distribution, and recurring economics.
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

        {/* Related insights */}
        <RelatedSectorInsights
          sectorSlug="technology-digital"
          sectorTitle="Technology & Digital Insights"
          intro="Selected observations examining the valuation issues affecting technology and digital businesses."
        />
        <section className="sector-cta">
          <div className="sector-shell sector-cta__inner">
            <h2>Discuss a Requirement</h2>

            <p>
              If you are considering a valuation assignment involving a
              technology, software, SaaS, digital platform, or
              technology-enabled business, we would be pleased to understand
              the requirement.
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
