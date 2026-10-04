import Image from "next/image";
import Link from "next/link";
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

export default async function RelatedServiceInsights({
  serviceSlug,
}: {
  serviceSlug: string;
}) {
  const { data: service, error: serviceError } = await supabase
    .from("services")
    .select("id, name, slug")
    .eq("slug", serviceSlug)
    .maybeSingle();

  if (serviceError) {
    console.error("Error loading insight service:", serviceError);
  }

  if (!service) {
    return null;
  }

  const { data: relationships, error: relationshipError } = await supabase
    .from("insight_services")
    .select("insight_id")
    .eq("service_id", service.id);

  if (relationshipError) {
    console.error("Error loading service insight relationships:", relationshipError);
    return null;
  }

  const insightIds = (relationships ?? []).map((row) => row.insight_id);

  if (!insightIds.length) {
    return null;
  }

  const { data: insightData, error: insightError } = await supabase
    .from("insights")
    .select(
      "id, title, slug, excerpt, cover_image_url, author, published_at",
    )
    .eq("status", "published")
    .in("id", insightIds)
    .order("published_at", { ascending: false })
    .limit(3);

  if (insightError) {
    console.error("Error loading related service insights:", insightError);
    return null;
  }

  const insights = (insightData ?? []) as Insight[];

  if (!insights.length) {
    return null;
  }

  return (
    <section className="service-insights">
      <div className="service-shell">
        <h2>Related Insights</h2>

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
                <p className="publication-card__meta">{categoryLabel(item)}</p>
                <h2>{item.title}</h2>
                {item.excerpt && (
                  <p className="publication-card__excerpt">{item.excerpt}</p>
                )}
                <span className="publication-card__link">
                  Read Full Article →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <Link href="/insights" className="service-return">
          View all insights →
        </Link>
      </div>
    </section>
  );
}
