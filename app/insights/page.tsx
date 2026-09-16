import PageBanner from "../components/sections/PageBanner";
import PageContainer from "../components/layout/PageContainer";
import SectionHeading from "../components/sections/SectionHeading";
import InsightGrid from "../components/insights/InsightGrid";
import InsightFilters from "../components/insights/InsightFilters";
import { supabase } from "../lib/supabase/client";

interface InsightsPageProps {
  searchParams: Promise<{
    sector?: string;
    audience?: string;
  }>;
}

export default async function InsightsPage({
  searchParams,
}: InsightsPageProps) {
  const params = await searchParams;

  const selectedSector = params.sector;
  const selectedAudience = params.audience;

  /*
   * Get sectors and audiences for the filter dropdowns.
   */
  const [
    { data: sectors, error: sectorsError },
    { data: audiences, error: audiencesError },
  ] = await Promise.all([
    supabase
      .from("sectors")
      .select("id, name, slug")
      .order("name"),

    supabase
      .from("audiences")
      .select("id, name, slug")
      .order("name"),
  ]);

  if (sectorsError) {
    console.error("Error loading sectors:", sectorsError);
  }

  if (audiencesError) {
    console.error("Error loading audiences:", audiencesError);
  }

  /*
   * Find the selected sector ID.
   */
  let sectorId: string | null = null;

  if (selectedSector) {
    const sector = sectors?.find(
      (item) => item.slug === selectedSector
    );

    sectorId = sector?.id ?? null;
  }

  /*
   * Find the selected audience ID.
   */
  let audienceId: string | null = null;

  if (selectedAudience) {
    const audience = audiences?.find(
      (item) => item.slug === selectedAudience
    );

    audienceId = audience?.id ?? null;
  }

  /*
   * Start with all published insights.
   */
  let insightIds: string[] | null = null;

  /*
   * Filter by sector.
   */
  if (sectorId) {
    const { data: sectorInsights, error } = await supabase
      .from("insight_sectors")
      .select("insight_id")
      .eq("sector_id", sectorId);

    if (error) {
      console.error("Error loading sector insights:", error);
    }

    insightIds = (sectorInsights ?? []).map(
      (item) => item.insight_id
    );
  }

  /*
   * Filter by audience.
   *
   * If a sector filter is already active, we take the
   * intersection so BOTH filters must match.
   */
  if (audienceId) {
    const { data: audienceInsights, error } = await supabase
      .from("insight_audiences")
      .select("insight_id")
      .eq("audience_id", audienceId);

    if (error) {
      console.error("Error loading audience insights:", error);
    }

    const audienceInsightIds = (audienceInsights ?? []).map(
      (item) => item.insight_id
    );

    if (insightIds !== null) {
      insightIds = insightIds.filter((id) =>
        audienceInsightIds.includes(id)
      );
    } else {
      insightIds = audienceInsightIds;
    }
  }

  /*
   * Retrieve the actual published insights.
   */
  let insightsQuery = supabase
    .from("insights")
    .select(
      "id, title, slug, excerpt, cover_image_url, author, published_at"
    )
    .eq("status", "published")
    .order("published_at", { ascending: false });

  /*
   * If filters were applied, restrict the query to
   * matching insight IDs.
   */
  if (insightIds !== null) {
    insightsQuery = insightsQuery.in("id", insightIds);
  }

  const { data: insights, error: insightsError } =
    await insightsQuery;

  if (insightsError) {
    console.error("Error loading insights:", insightsError);
  }

  return (
    <>
      <PageBanner
        title="Insights"
        description="Perspectives, analysis and observations from ValInsight across valuation, advisory and related sectors."
      />

      <section className="py-20 lg:py-24">
        <PageContainer>
          <SectionHeading
            eyebrow="Knowledge & Perspective"
            title="Insights from ValInsight"
            description="Explore our latest perspectives across sectors, asset classes and client requirements."
          />

          <div className="mt-12">
            <InsightFilters
              sectors={sectors ?? []}
              audiences={audiences ?? []}
            />
          </div>

          <div className="mt-12">
            <InsightGrid insights={insights ?? []} />
          </div>
        </PageContainer>
      </section>
    </>
  );
}