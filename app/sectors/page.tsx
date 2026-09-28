import Image from "next/image";
import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const sectors = [
  {
    number: "01",
    title: "Technology & Digital",
    image: "/images/sectors/technology-and-digital.jpg",
    description:
      "Software, SaaS, digital platforms, and technology-enabled businesses where recurring revenue, customer economics, intellectual property, and rapid change influence value.",
    href: "/sectors/technology-and-digital",
  },
  {
    number: "02",
    title: "Financial Services",
    image: "/images/sectors/financial-services.jpg",
    description:
      "Banks, non-banking financial companies, fintech businesses, funds, and intermediaries where capital, asset quality, funding, and regulation affect value.",
    href: "/sectors/financial-services",
  },
  {
    number: "03",
    title: "Real Estate & Infrastructure",
    image: "/images/sectors/real-estate-and-infrastructure.jpg",
    description:
      "Development projects, income-producing property, and infrastructure investments where location, leases, contracts, and long-term cash flows are central to value.",
    href: "/sectors/real-estate-and-infrastructure",
  },
  {
    number: "04",
    title: "Manufacturing & Industrial",
    image: "/images/sectors/manufacturing-and-industrial.jpg",
    description:
      "Manufacturing operations and industrial assets where capacity utilisation, operating leverage, capital expenditure, technology, and market cycles influence value.",
    href: "/sectors/manufacturing-and-industrial",
  },
  {
    number: "05",
    title: "Energy",
    image: "/images/sectors/energy.jpg",
    description:
      "Conventional and renewable energy assets, platforms, and projects where operating performance, commodity exposure, contracts, regulation, and transition risk shape value.",
    href: "/sectors/energy",
  },
];

const valuationContext = [
  {
    number: "01",
    title: "Sources of Cash Flow",
    text: "Revenue quality, customer relationships, contracted income, occupancy, and production performance can affect the visibility of future cash flows.",
  },
  {
    number: "02",
    title: "Investment Requirements",
    text: "Working capital, development expenditure, technology investment, and asset replacement can shape the capital needed to sustain operations and growth.",
  },
  {
    number: "03",
    title: "Market and Operating Risk",
    text: "Competitive conditions, regulation, cyclicality, and technological change can influence assumptions about performance and long-term prospects.",
  },
];

export default function SectorsPage() {
  return (
    <>
      <Header />

      <main className="sectors-page">
        {/* Hero */}
        <section className="sectors-hero">
          <Image
            src="/images/shared/inner-page-banner.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="sectors-hero__image"
          />

          <div className="sectors-hero__overlay" />

          <div className="sectors-shell sectors-hero__content">
            <p className="sectors-breadcrumb">Home / Sector Expertise</p>

            <h1>Sector Expertise</h1>

            <p>
              We work in sectors where commercial conditions, operating
              performance, and market dynamics have a direct bearing on value.
              Our analysis reflects how these factors affect cash flows, risk,
              capital requirements, and long-term prospects.
            </p>
          </div>
        </section>

        {/* Our perspective */}
        <section className="sectors-perspective">
          <div className="sectors-shell sectors-perspective__grid">
            <div>
              <p className="sectors-label">01 / Our Perspective</p>

              <h2>Sector Context Shapes Valuation</h2>

              <p>
                Businesses and assets do not operate in isolation. Their
                economic characteristics, market conditions, and investment
                requirements influence how value is assessed.
              </p>

              <p>
                Across our core sectors, we consider the operating factors
                behind financial performance alongside the evidence relevant to
                the assignment. Explore a sector below for its typical
                assignments, key valuation considerations, and sub-sectors.
              </p>
            </div>

            <aside className="sectors-perspective__callout">
              <p>Across Our Work</p>

              <h3>From Commercial Context to Financial Analysis</h3>

              <span>
                Our sector focus connects the underlying business model, its
                sources of cash flow, and the risks and capital needs that
                influence long-term prospects.
              </span>
            </aside>
          </div>
        </section>

        {/* Explore sectors */}
        <section className="sectors-explore">
          <div className="sectors-shell">
            <div className="sectors-explore__heading">
              <div>
                <p className="sectors-label">02 / Explore Our Sectors</p>
                <h2>Five Areas of Sector Expertise</h2>
              </div>

              <p>
                Select a sector to explore the commercial factors that shape
                value and the types of assignments undertaken in that area.
              </p>
            </div>

            <div className="sectors-list">
              {sectors.map((sector) => (
                <Link
                  key={sector.title}
                  href={sector.href}
                  className="sectors-row"
                >
                  <div className="sectors-row__image">
                    <Image
                      src={sector.image}
                      alt=""
                      fill
                      sizes="120px"
                      className="sectors-row__image-inner"
                    />
                  </div>

                  <div className="sectors-row__number">
                    {sector.number} / SECTOR
                  </div>

                  <div className="sectors-row__content">
                    <h3>{sector.title}</h3>
                    <p>{sector.description}</p>
                  </div>

                  <span className="sectors-row__link">
                    Explore sector →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Valuation context */}
        <section className="sectors-context">
          <div className="sectors-shell">
            <p className="sectors-label">03 / Valuation Context</p>

            <h2>Questions That Differ by Sector</h2>

            <p className="sectors-context__intro">
              The factors that matter to value vary with the economics of the
              business or asset. Our sector pages examine these differences in
              more detail.
            </p>

            <div className="sectors-context__list">
              {valuationContext.map((item) => (
                <article key={item.number} className="sectors-context__row">
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

        {/* CTA */}
        <section className="sectors-cta">
          <div className="sectors-shell sectors-cta__inner">
            <h2>Discuss a Requirement</h2>

            <p>
              If you are considering a valuation assignment, transaction,
              reporting matter, or dispute, we would be pleased to understand
              the requirement.
            </p>

            <Link href="/contact" className="sectors-cta__button">
              Contact us
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
