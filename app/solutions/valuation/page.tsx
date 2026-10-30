import Image from "next/image";
import Link from "next/link";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { supabase } from "../../lib/supabase/client";

type Insight = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  author: string | null;
  published_at: string | null;
};

type Service = {
  id: string;
  name: string;
  slug: string;
};

const valuationExpertise = [
  {
    title: "Securities & Financial Assets",
    description:
      "Valuation of businesses, equity and debt securities, intangible assets, intellectual property, and complex instruments.",
    image: "/images/solutions/securities-card.jpeg",
    imageAlt: "Financial market data representing securities and financial assets",
  },
  {
    title: "Tangible Assets",
    description:
      "Valuation of plant, machinery, specialised equipment, production lines, infrastructure assets, and other physical assets.",
    image: "/images/solutions/tangible-asset-card.jpeg",
    imageAlt: "Industrial machinery and production equipment",
  },
  {
    title: "Real Estate",
    description:
      "Valuation of commercial, residential, industrial, hospitality, infrastructure-linked, and development assets.",
    image: "/images/solutions/real-estate-card.jpg",
    imageAlt: "Modern commercial real estate building",
  },
];

const valuationPurposes = [
  {
    number: "01",
    title: "Transactions & Investment",
    description:
      "Inform acquisition, disposal, investment, and shareholder negotiations through an independent assessment of value.",
  },
  {
    number: "02",
    title: "Financial Reporting",
    description:
      "Support relevant fair value measurements, purchase price allocations, and impairment assessments.",
  },
  {
    number: "03",
    title: "Portfolio & Investor Reporting",
    description:
      "Assess private investments and ownership interests for periodic reporting and portfolio review.",
  },
  {
    number: "04",
    title: "Ownership & Restructuring",
    description:
      "Establish a valuation basis for shareholder changes, internal transfers, and corporate reorganisations.",
  },
  {
    number: "05",
    title: "Disputes & Proceedings",
    description:
      "Assess contested values and examine the methods, evidence, and assumptions underlying competing positions.",
  },
  {
    number: "06",
    title: "Tax & Regulatory Requirements",
    description:
      "Address valuation requirements for the relevant jurisdiction, purpose, and applicable framework.",
  },
];

const valuationApproach = [
  {
    title: "Establish the Valuation Framework",
    description:
      "Define the subject interest, valuation date, purpose, basis of value, and relevant assumptions.",
  },
  {
    title: "Examine the Value Drivers",
    description:
      "Analyse financial performance, forecasts, asset characteristics, contractual rights, and market evidence, as applicable.",
  },
  {
    title: "Apply and Challenge the Analysis",
    description:
      "Select appropriate methods, test material assumptions, and assess sensitivities and alternative indications of value.",
  },
  {
    title: "Present the Conclusion",
    description:
      "Explain the valuation outcome, supporting rationale, material judgements, and limitations in a report aligned with the engagement.",
  },
];

async function getValuationInsights(): Promise<Insight[]> {
  const { data: service, error: serviceError } = await supabase
    .from("services")
    .select("id,name,slug")
    .eq("slug", "valuation")
    .maybeSingle();

  if (serviceError) {
    console.error("Error loading Valuation service:", serviceError);
    return [];
  }

  const selectedService = service as Service | null;
  if (!selectedService) return [];

  const { data: relationships, error: relationshipError } = await supabase
    .from("insight_services")
    .select("insight_id")
    .eq("service_id", selectedService.id);

  if (relationshipError) {
    console.error("Error loading Valuation insight relationships:", relationshipError);
    return [];
  }

  const insightIds = (relationships ?? []).map((row) => row.insight_id);
  if (insightIds.length === 0) return [];

  const { data, error } = await supabase
    .from("insights")
    .select("id,title,slug,excerpt,cover_image_url,author,published_at")
    .eq("status", "published")
    .in("id", insightIds)
    .order("published_at", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Error loading Valuation perspectives:", error);
    return [];
  }

  return (data ?? []) as Insight[];
}

function insightDate(value: string | null) {
  if (!value) return "Valuation Insights";

  return new Date(value).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
}

function insightMeta(item: Insight) {
  return item.author
    ? `${item.author} • ${insightDate(item.published_at)}`
    : `Valuation Insights • ${insightDate(item.published_at)}`;
}

const fallbackInsightImages = [
  "/images/insights/bridge-to-close.jpg",
  "/images/insights/financial-district.jpg",
  "/images/insights/cost-of-capital.jpg",
];

export default async function ValuationPage() {
  const insights = await getValuationInsights();

  return (
    <>
      <Header />

      <main className="service-page valuation-page" data-service-page="valuation">
        {/* BANNER */}
        <section
          className="service-hero service-hero--inner valuation-page__hero"
          aria-labelledby="valuation-hero-title"
        >
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
            <p className="service-breadcrumb">
              Home / Solutions / Valuation
            </p>
            <h1 id="valuation-hero-title">
              Independent valuation. Informed judgement.
            </h1>
            <p className="service-hero__intro">
              Valuations of businesses, securities, real estate, and tangible
              assets, grounded in rigorous analysis and a clear understanding
              of the engagement’s purpose.
            </p>
            {/* <Link href="/contact" className="home-button">
              Discuss a Valuation Requirement
            </Link> */}
          </div>
        </section>

        {/* AREAS OF VALUATION EXPERTISE */}
        <section
          className="transaction-advisory-expertise valuation-expertise"
          aria-labelledby="valuation-expertise-title"
        >
          <div className="transaction-advisory-shell">
            <div className="transaction-advisory-section-heading">
              <p className="transaction-advisory-kicker">Valuation</p>
              <h2 id="valuation-expertise-title">Areas of Expertise</h2>
              <p className="valuation-expertise__intro">
                Expertise across businesses, financial interests, and physical
                assets.
              </p>
            </div>

            <div className="transaction-advisory-expertise-grid">
              {valuationExpertise.map((area) => (
                <article
                  className="transaction-advisory-expertise-card"
                  key={area.title}
                >
                  <div className="transaction-advisory-expertise-card__image">
                    <Image
                      src={area.image}
                      alt={area.imageAlt}
                      fill
                      sizes="(max-width: 680px) 100vw, (max-width: 900px) 50vw, 33vw"
                    />
                  </div>
                  <div className="transaction-advisory-expertise-card__content">
                    <h3>{area.title}</h3>
                    <p>{area.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* VALUATION PURPOSES */}
        <section
          className="transaction-advisory-contexts valuation-purposes"
          aria-labelledby="valuation-purposes-title"
        >
          <div className="transaction-advisory-shell">
            <div className="transaction-advisory-section-heading">
              <p className="transaction-advisory-kicker">Valuation</p>
              <h2 id="valuation-purposes-title">Purposes</h2>
              <p className="valuation-purposes__intro">
                Valuation shaped by its intended use.
              </p>
            </div>

            <div className="transaction-advisory-contexts-grid">
              {valuationPurposes.map((purpose) => (
                <article
                  className="transaction-advisory-context-card"
                  key={purpose.number}
                >
                  <span className="transaction-advisory-context-card__number">
                    {purpose.number}
                  </span>
                  <h3>{purpose.title}</h3>
                  <p>{purpose.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* OUR APPROACH */}
        <section
          className="transaction-advisory-approach valuation-approach"
          aria-labelledby="valuation-approach-title"
        >
          <div className="transaction-advisory-shell">
            <div className="transaction-advisory-section-heading transaction-advisory-section-heading--approach">
              <p className="transaction-advisory-kicker">Our Approach</p>
              <h2 id="valuation-approach-title">Our Approach</h2>
              <p className="transaction-advisory-approach__intro">
                Purpose-led analysis. Reasoned conclusions.
              </p>
            </div>

            <div className="transaction-advisory-approach-grid">
              {valuationApproach.map((step) => (
                <article
                  className="transaction-advisory-approach-card"
                  key={step.title}
                >
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* VALUATION PERSPECTIVES */}
        <section
          className="transaction-advisory-perspectives valuation-perspectives"
          aria-labelledby="valuation-perspectives-title"
        >
          <div className="transaction-advisory-shell">
            <div className="transaction-advisory-section-heading">
              <p className="transaction-advisory-kicker">Insights &amp; Research</p>
              <h2 id="valuation-perspectives-title">
                Valuation Perspectives
              </h2>
            </div>

            {insights.length > 0 ? (
              <div className="insights-publication-grid">
                {insights.map((item, index) => (
                  <Link
                    key={item.id}
                    href={`/insights/${item.slug}`}
                    className="publication-card"
                  >
                    <div className="publication-card__image">
                      {item.cover_image_url ? (
                        <img src={item.cover_image_url} alt={item.title} />
                      ) : (
                        <Image
                          src={fallbackInsightImages[index % fallbackInsightImages.length]}
                          alt=""
                          fill
                          sizes="(max-width: 760px) 100vw, 33vw"
                        />
                      )}
                    </div>

                    <div className="publication-card__body">
                      <p className="publication-card__meta">
                        {insightMeta(item)}
                      </p>
                      <h2>{item.title}</h2>
                      {item.excerpt && (
                        <p className="publication-card__excerpt">
                          {item.excerpt}
                        </p>
                      )}
                      <span className="publication-card__link">
                        Read Full Article →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="transaction-advisory-perspectives__empty">
                Valuation perspectives will be published here.
              </p>
            )}

            <div className="transaction-advisory-perspectives__all">
              <Link href="/insights?service=valuation">
                View All Insights →
              </Link>
            </div>
          </div>
        </section>

        {/* DISCUSS A REQUIREMENT */}
        <section className="service-cta valuation-page__cta">
          <div className="service-shell service-cta__inner">
            <h2>Discuss a Valuation Requirement</h2>
            <p>
              Discuss your valuation needs, intended purpose, and relevant
              financial considerations to establish the appropriate scope of
              support.
            </p>
            <Link href="/contact" className="service-cta__button">
              Contact Us
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
