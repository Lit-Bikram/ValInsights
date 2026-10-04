import Image from "next/image";
import Link from "next/link";
import { supabase } from "../../lib/supabase/client";

type RelatedSectorInsightsProps = {
  sectorSlug: string;
  sectorTitle: string;
  intro: string;
};

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

export default async function RelatedSectorInsights({
  sectorSlug,
  sectorTitle,
  intro,
}: RelatedSectorInsightsProps) {
  const { data: sector, error: sectorError } = await supabase
    .from("sectors")
    .select("id")
    .eq("slug", sectorSlug)
    .maybeSingle();

  if (sectorError) {
    console.error("Error loading sector for related insights:", sectorError);
  }

  let insights: Insight[] = [];

  if (sector?.id) {
    const { data: relationships, error: relationshipError } = await supabase
      .from("insight_sectors")
      .select("insight_id")
      .eq("sector_id", sector.id);

    if (relationshipError) {
      console.error(
        "Error loading sector insight relationships:",
        relationshipError,
      );
    } else {
      const insightIds = (relationships ?? []).map((row) => row.insight_id);

      if (insightIds.length > 0) {
        const { data, error } = await supabase
          .from("insights")
          .select(
            "id,title,slug,excerpt,cover_image_url,author,published_at",
          )
          .eq("status", "published")
          .in("id", insightIds)
          .order("published_at", { ascending: false })
          .limit(3);

        if (error) {
          console.error("Error loading related sector insights:", error);
        } else {
          insights = (data ?? []) as Insight[];
        }
      }
    }
  }

  return (
    <section className="sector-insights">
      <div className="sector-shell">
        <p className="sector-label">05 / Related Insights</p>

        <h2>{sectorTitle}</h2>

        <p className="sector-insights__intro">{intro}</p>

        {insights.length > 0 ? (
          <div className="insights-publication-grid sector-insights__grid">
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
            No publications are currently available for this sector.
          </div>
        )}

        <Link href="/sectors" className="sector-return">
          ← Return to Sector Dashboard
        </Link>
      </div>
    </section>
  );
}
