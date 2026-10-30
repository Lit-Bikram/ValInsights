import Image from "next/image";
import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { supabase } from "../lib/supabase/client";

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

type Solution = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  serviceName: string;
  insightFallbackImage: string;
};

const expertiseCards: Solution[] = [
  {
    eyebrow: "Valuation",
    title: "Valuation",
    description:
      "Independent valuations of businesses, investments, and assets, grounded in rigorous analysis and informed judgement for transactions, reporting, and strategic decisions.",
    image: "/images/solutions/NYSE.jpeg",
    imageAlt: "Financial market data on a screen",
    href: "/solutions/valuation",
    serviceName: "Valuation",
    insightFallbackImage: "/images/insights/financial-district.jpg",
  },
  {
    eyebrow: "Transaction Advisory",
    title: "Transaction Advisory",
    description:
      "Transaction analysis assessing earnings sustainability, cash conversion, and financial exposures to inform investment underwriting, structuring, and negotiations.",
    image: "/images/solutions/transaction-home.jpeg",
    imageAlt: "Modern city skyline at dusk",
    href: "/solutions/transaction-advisory",
    serviceName: "Transaction Advisory",
    insightFallbackImage: "/images/insights/bridge-to-close.jpg",
  },
  {
    eyebrow: "Disputes",
    title: "Disputes",
    description:
      "Specialist experience in financial disputes, spanning loss quantification, expert evidence, arbitration, testimony, and settlement support.",
    image: "/images/solutions/disputes-home.jpeg",
    imageAlt: "Classical courthouse columns",
    href: "/solutions/disputes",
    serviceName: "Disputes",
    insightFallbackImage: "/images/insights/shareholder-disputes.jpg",
  },
];

const workSteps = [
  {
    title: "Frame the Mandate",
    description:
      "Establish the valuation purpose, investment objectives, or matters in dispute, defining the scope, analytical priorities, and intended use of our work.",
  },
  {
    title: "Examine the Fundamentals",
    description:
      "Apply rigorous financial analysis to assess value, evaluate transaction economics, or quantify disputed amounts, testing the evidence and assumptions underpinning each assessment.",
  },
  {
    title: "Deliver Defensible Conclusions",
    description:
      "Present reasoned conclusions with a clear account of their analytical basis, material judgements, and limitations—for investment, reporting, negotiation, or dispute resolution.",
  },
];

async function getLatestInsightForService(
  service: Service | undefined,
): Promise<Insight | null> {
  if (!service) return null;

  const { data: relationships, error: relationshipError } = await supabase
    .from("insight_services")
    .select("insight_id")
    .eq("service_id", service.id);

  if (relationshipError) {
    console.error(
      `Error loading insight relationships for ${service.name}:`,
      relationshipError,
    );
    return null;
  }

  const insightIds = (relationships ?? []).map(
    (relationship) => relationship.insight_id,
  );

  if (insightIds.length === 0) return null;

  const { data, error } = await supabase
    .from("insights")
    .select("id,title,slug,excerpt,cover_image_url,author,published_at")
    .eq("status", "published")
    .in("id", insightIds)
    .order("published_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error(`Error loading latest insight for ${service.name}:`, error);
    return null;
  }

  return (data as Insight | null) ?? null;
}

function insightDate(value: string | null) {
  if (!value) return null;

  return new Date(value).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
}

export default async function SolutionsPage() {
  const { data: services, error: servicesError } = await supabase
    .from("services")
    .select("id,name,slug");

  if (servicesError) {
    console.error("Error loading solution services:", servicesError);
  }

  const serviceList = (services ?? []) as Service[];

  const solutionsWithInsights = await Promise.all(
    expertiseCards.map(async (solution) => {
      const service = serviceList.find(
        (item) =>
          item.name.trim().toLowerCase() === solution.serviceName.toLowerCase(),
      );

      const insight = await getLatestInsightForService(service);

      return {
        ...solution,
        insight,
      };
    }),
  );

  return (
    <>
      <Header />

      <main className="solutions-page">
        {/* HERO */}
        <section
          className="solutions-hero"
          aria-labelledby="solutions-page-title"
        >
          <Image
            src="/images/shared/inner-page-banner.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="solutions-hero__image"
          />
          <div className="solutions-hero__overlay" aria-hidden="true" />

          <div className="solutions-hero__content">
            <p className="solutions-breadcrumb">Home / Our Solutions</p>
            <h1 id="solutions-page-title">
              Specialist analysis for financial decisions.
            </h1>
            <p className="solutions-hero__description">
              Independent valuation, transaction advisory, and disputes
              expertise to assess value, examine financial risk, and address
              contested financial matters.
            </p>
          </div>
        </section>

        {/* AREAS OF EXPERTISE */}
        <section
          className="solutions-core"
          aria-labelledby="solutions-expertise-title"
        >
          <div className="solutions-shell">
            <div className="solutions-core__heading">
              <p className="solutions-section-label">Areas of Expertise</p>
            </div>

            <div className="solutions-core__grid">
              {expertiseCards.map((card) => (
                <Link
                  className="solutions-service-card"
                  href={card.href}
                  key={card.title}
                >
                  <div className="solutions-service-card__image">
                    <Image
                      src={card.image}
                      alt={card.imageAlt}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 387px"
                    />
                  </div>

                  <div className="solutions-service-card__content">
                    <p className="solutions-service-card__eyebrow"></p>
                    <h3>{card.title}</h3>

                    <p>{card.description}</p>
                    <span className="solutions-service-card__link">
                      Explore expertise <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* HOW WE WORK */}
        <section
          className="solutions-how-we-work"
          aria-labelledby="solutions-how-we-work-title"
        >
          <div className="solutions-shell">
            <div className="solutions-section-heading">
              <p className="solutions-section-label">Our Approach</p>
              <h2 id="solutions-how-we-work-title">How We Work</h2>
            </div>

            <div className="solutions-how-we-work__grid">
              {workSteps.map((step) => (
                <article
                  className="solutions-how-we-work__card"
                  key={step.title}
                >
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SELECTED PERSPECTIVES */}
        <section
          className="solutions-perspectives"
          aria-labelledby="solutions-perspectives-title"
        >
          <div className="solutions-shell">
            <div className="solutions-section-heading">
              <p className="solutions-section-label">Insights &amp; Research</p>
              <h2 id="solutions-perspectives-title">Selected Perspectives</h2>
            </div>

            <div className="insights-publication-grid">
              {solutionsWithInsights.map((solution) => {
                if (!solution.insight) return null;

                const insight = solution.insight;
                const date = insightDate(insight.published_at);

                return (
                  <Link
                    key={solution.serviceName}
                    href={`/insights/${insight.slug}`}
                    className="publication-card"
                  >
                    <div className="publication-card__image">
                      {insight.cover_image_url ? (
                        <img
                          src={insight.cover_image_url}
                          alt={insight.title}
                        />
                      ) : (
                        <Image
                          src={solution.insightFallbackImage}
                          alt=""
                          fill
                          sizes="(max-width: 760px) 100vw, 33vw"
                        />
                      )}
                    </div>

                    <div className="publication-card__body">
                      <p className="publication-card__meta">
                        {insight.author
                          ? `${insight.author} • ${date ?? "Valuation Insights"}`
                          : `Valuation Insights • ${date ?? "Valuation Insights"}`}
                      </p>

                      <h2>{insight.title}</h2>

                      {insight.excerpt && (
                        <p className="publication-card__excerpt">
                          {insight.excerpt}
                        </p>
                      )}

                      <span className="publication-card__link">
                        Read Full Article →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="solutions-perspectives__all">
              <Link href="/insights">View All Insights →</Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="solutions-cta"
          aria-labelledby="solutions-cta-title"
        >
          <div className="solutions-cta__inner">
            <h2 id="solutions-cta-title">Discuss a Requirement</h2>
            <p>
              To discuss a valuation assignment or a related matter, contact us
              at contact@valuationinsights.com.
            </p>
            <Link href="/contact" className="solutions-cta__button">
              Contact us
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
