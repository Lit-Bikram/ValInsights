import Image from "next/image";
import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import InsightsFilters from "./InsightsFilters";
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

type TaxonomyItem = {
  id: string;
  name: string;
  slug: string;
};

const fallbackImages = [
  "/images/insights/financial-district.jpg",
  "/images/insights/shareholder-disputes.jpg",
  "/images/insights/bridge-to-close.jpg",
  "/images/insights/regulatory-reporting-intangibles.jpg",
  "/images/insights/cost-of-capital.jpg",
  "/images/insights/portfolio-optimization.jpg",
];

function dateLabel(value: string | null) {
  if (!value) return "Valuation Insights";
  return new Date(value).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
}

function categoryLabel(item: Insight) {
  return item.author
    ? `${item.author} • ${dateLabel(item.published_at)}`
    : `Valuation Insights • ${dateLabel(item.published_at)}`;
}

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: Promise<{
    sector?: string;
    audience?: string;
    service?: string;
  }>;
}) {
  const params = await searchParams;
  const sectorSlug = params.sector?.trim() || "";
  const audienceSlug = params.audience?.trim() || "";
  const serviceSlug = params.service?.trim() || "";

  const [
    { data: sectors, error: sectorsError },
    { data: audiences, error: audiencesError },
    { data: services, error: servicesError },
  ] = await Promise.all([
    supabase
      .from("sectors")
      .select("id,name,slug")
      .order("name", { ascending: true }),
    supabase
      .from("audiences")
      .select("id,name,slug")
      .order("name", { ascending: true }),
    supabase
      .from("services")
      .select("id,name,slug")
      .order("name", { ascending: true }),
  ]);

  if (sectorsError) {
    console.error("Error loading insight sectors:", sectorsError);
  }

  if (audiencesError) {
    console.error("Error loading insight audiences:", audiencesError);
  }

  if (servicesError) {
    console.error("Error loading insight core services:", servicesError);
  }

  const sectorList = (sectors ?? []) as TaxonomyItem[];
  const audienceList = (audiences ?? []) as TaxonomyItem[];
  const serviceList = (services ?? []) as TaxonomyItem[];

  const selectedSector = sectorList.find((item) => item.slug === sectorSlug);
  const selectedAudience = audienceList.find(
    (item) => item.slug === audienceSlug
  );
  const selectedService = serviceList.find(
    (item) => item.slug === serviceSlug
  );

  let matchingInsightIds: string[] | null = null;

  // Each selected filter narrows the result set. When both are selected,
  // an insight must belong to both relationships.
  if (selectedSector) {
    const { data, error } = await supabase
      .from("insight_sectors")
      .select("insight_id")
      .eq("sector_id", selectedSector.id);

    if (error) {
      console.error("Error loading sector insight relationships:", error);
      matchingInsightIds = [];
    } else {
      matchingInsightIds = (data ?? []).map((row) => row.insight_id);
    }
  }

  if (selectedAudience) {
    const { data, error } = await supabase
      .from("insight_audiences")
      .select("insight_id")
      .eq("audience_id", selectedAudience.id);

    if (error) {
      console.error("Error loading audience insight relationships:", error);
      matchingInsightIds = [];
    } else {
      const audienceIds = (data ?? []).map((row) => row.insight_id);

      if (matchingInsightIds === null) {
        matchingInsightIds = audienceIds;
      } else {
        const audienceIdSet = new Set(audienceIds);
        matchingInsightIds = matchingInsightIds.filter((id) =>
          audienceIdSet.has(id)
        );
      }
    }
  }

  if (selectedService) {
    const { data, error } = await supabase
      .from("insight_services")
      .select("insight_id")
      .eq("service_id", selectedService.id);

    if (error) {
      console.error("Error loading service insight relationships:", error);
      matchingInsightIds = [];
    } else {
      const serviceIds = (data ?? []).map((row) => row.insight_id);

      if (matchingInsightIds === null) {
        matchingInsightIds = serviceIds;
      } else {
        const serviceIdSet = new Set(serviceIds);
        matchingInsightIds = matchingInsightIds.filter((id) =>
          serviceIdSet.has(id)
        );
      }
    }
  }

  let query = supabase
    .from("insights")
    .select("id,title,slug,excerpt,cover_image_url,author,published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(6);

  if (matchingInsightIds !== null) {
    if (matchingInsightIds.length === 0) {
      query = query.in("id", ["00000000-0000-0000-0000-000000000000"]);
    } else {
      query = query.in("id", matchingInsightIds);
    }
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error loading insights:", error);
  }

  const insights = (data ?? []) as Insight[];

  return (
    <>
      <Header />

      <main className="insights-page">
        {/* HERO */}
        <section className="insights-hero">
          <Image
            src="/images/insights/page-header-banner.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="insights-hero__image"
          />
          <div className="insights-hero__overlay" />

          <div className="insights-shell insights-hero__content">
            <p className="insights-eyebrow">
              Market Intelligence &amp; Research
            </p>

            <h1>Insights &amp; Publications</h1>

            <p className="insights-hero__description">
              In-depth analysis, valuation benchmarks, and strategic research
              exploring evolving capital market dynamics, regulatory changes,
              and corporate transaction trends.
            </p>
          </div>
        </section>

        {/* PUBLICATIONS */}
        <section className="insights-publications" id="publications">
          <div className="insights-shell">
            <InsightsFilters
              sectors={sectorList}
              audiences={audienceList}
              services={serviceList}
              selectedSector={sectorSlug}
              selectedAudience={audienceSlug}
              selectedService={serviceSlug}
            />

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
                          src={fallbackImages[index % fallbackImages.length]}
                          alt=""
                          fill
                          sizes="(max-width: 760px) 100vw, 33vw"
                        />
                      )}
                    </div>

                    <div className="publication-card__body">
                      <p className="publication-card__meta">
                        {categoryLabel(item)}
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
              <div className="insights-empty">
                No publications match the selected filters.
              </div>
            )}

            {/* NEWSLETTER */}
            <section className="insights-newsletter">
              <div className="insights-newsletter__copy">
                <h2>Receive Quarterly Intelligence</h2>
                <p>
                  Get curated valuation benchmarks and economic insights
                  delivered straight to your inbox.
                </p>
              </div>

              <form className="insights-newsletter__form">
                <input
                  type="email"
                  aria-label="Professional email"
                  placeholder="Enter your professional email"
                />
                <button type="button">Subscribe</button>
              </form>
            </section>
          </div>
        </section>

        {/* CTA */}
        <section className="insights-cta">
          <div className="insights-shell insights-cta__inner">
            <h2>Discuss a Requirement</h2>

            <p>
              A confidential conversation about valuation, transactions, or
              strategic decisions.
            </p>

            <Link href="/contact" className="insights-cta__button">
              Contact the Firm
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
