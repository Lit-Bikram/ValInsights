import Link from "next/link";
import Hero from "./components/sections/Hero";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import PageContainer from "./components/layout/PageContainer";
import SectionHeading from "./components/sections/SectionHeading";
import CTASection from "./components/sections/CTASection";
import StatsSection from "./components/sections/StatsSection";

const solutions = [
  {
    title: "Financial Asset Valuation",
    description:
      "Valuation expertise across securities, financial assets, and complex instruments.",
  },
  {
    title: "Real Estate Valuation",
    description:
      "Independent valuation support across real estate and infrastructure assets.",
  },
  {
    title: "Tangible Asset Valuation",
    description:
      "Valuation of tangible assets to support transactions, reporting, and decision-making.",
  },
  {
    title: "Disputes & Litigations",
    description:
      "Independent valuation expertise supporting disputes, litigation, and related requirements.",
  },
];

const sectors = [
  "Technology and Digital",
  "Energy",
  "Real Estate and Infrastructure",
  "Financial Services",
  "Manufacturing and Industrial",
];

const audiences = [
  "Listed and Privately Held Businesses",
  "Family Offices",
  "Private Equity and Venture Capital Funds",
  "Start Ups",
  "Founders and Promoters",
  "Boards and Audit Committees",
  "Legal Teams and Dispute Stakeholders",
  "NBFCs and Financial Institutions",
  "Cross Border Transaction Parties",
];

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        <Hero
          eyebrow="Independent Valuation & Advisory"
          title="Independent valuation expertise for complex decisions."
          description="ValInsight provides valuation and advisory services across financial assets, real estate, tangible assets, and disputes & litigations."
          primaryButtonText="Discuss a Requirement"
          primaryButtonHref="/contact"
          secondaryButtonText="Explore Our Solutions"
          secondaryButtonHref="/solutions"
        />
        <StatsSection
          stats={[
            {
              value: "4",
              label: "Core Solution Areas",
              description:
                "Valuation and advisory services across key asset classes.",
            },
            {
              value: "5",
              label: "Sector Focus Areas",
              description: "Specialist expertise across multiple industries.",
            },
            {
              value: "9",
              label: "Client Categories",
              description:
                "Supporting businesses, investors, boards and stakeholders.",
            },
            {
              value: "360°",
              label: "Advisory Perspective",
              description: "Independent analysis supporting complex decisions.",
            },
          ]}
        />

        {/* About */}
        <section className="py-20 lg:py-28">
          <PageContainer>
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <SectionHeading
                eyebrow="About ValInsight"
                title="Independent insight for complex valuation requirements."
              />

              <div className="space-y-5 text-base leading-8 text-muted">
                <p>
                  ValInsight provides independent valuation and advisory
                  expertise across a range of financial, real estate, and
                  tangible assets.
                </p>

                <p>
                  Our work is designed to support informed decision-making
                  across transactions, financial reporting, disputes, and
                  strategic requirements.
                </p>

                <Link
                  href="/about"
                  className="inline-block font-semibold text-primary hover:text-primary-light"
                >
                  Learn more about us →
                </Link>
              </div>
            </div>
          </PageContainer>
        </section>

        {/* Solutions */}
        <section className="bg-surface py-20 lg:py-28">
          <PageContainer>
            <SectionHeading
              eyebrow="What We Do"
              title="Solutions built around complex valuation requirements."
              description="Explore our areas of valuation and advisory expertise."
              centered
            />

            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {solutions.map((solution) => (
                <div
                  key={solution.title}
                  className="rounded-xl border border-border bg-white p-8 transition-shadow hover:shadow-lg"
                >
                  <h3 className="text-xl font-semibold text-primary">
                    {solution.title}
                  </h3>

                  <p className="mt-4 leading-7 text-muted">
                    {solution.description}
                  </p>

                  <Link
                    href="/solutions"
                    className="mt-6 inline-block text-sm font-semibold text-primary"
                  >
                    Explore solution →
                  </Link>
                </div>
              ))}
            </div>
          </PageContainer>
        </section>

        {/* Sectors */}
        <section className="py-20 lg:py-28">
          <PageContainer>
            <SectionHeading
              eyebrow="Sector Expertise"
              title="Experience across key sectors."
              description="Our sector-focused approach allows valuation requirements to be considered in their broader commercial context."
              centered
            />

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sectors.map((sector) => (
                <Link
                  key={sector}
                  href="/sectors"
                  className="group rounded-xl border border-border p-6 transition-colors hover:border-primary"
                >
                  <h3 className="font-semibold text-primary">{sector}</h3>

                  <span className="mt-4 inline-block text-sm text-muted group-hover:text-primary">
                    Explore sector →
                  </span>
                </Link>
              ))}
            </div>
          </PageContainer>
        </section>

        {/* Who We Serve */}
        <section className="bg-surface py-20 lg:py-28">
          <PageContainer>
            <SectionHeading
              eyebrow="Whom We Serve"
              title="Supporting a diverse range of stakeholders."
              centered
            />

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {audiences.map((audience) => (
                <Link
                  key={audience}
                  href="/clients"
                  className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <h3 className="font-semibold leading-6 text-primary">
                    {audience}
                  </h3>
                </Link>
              ))}
            </div>
          </PageContainer>
        </section>

        {/* Insights placeholder */}
        <section className="py-20 lg:py-28">
          <PageContainer>
            <SectionHeading
              eyebrow="Insights"
              title="Perspectives on valuation and advisory matters."
              description="Our Insights section will be connected to the ValInsight content management system."
              centered
            />

            <div className="mt-12 text-center">
              <Link
                href="/insights"
                className="inline-flex rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-light"
              >
                Explore Insights
              </Link>
            </div>
          </PageContainer>
        </section>

        {/* CTA */}
        <CTASection />
      </main>

      <Footer />
    </>
  );
}
