import InsightCard from "./InsightCard";

interface Insight {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  cover_image_url?: string | null;
  author?: string | null;
  published_at?: string | null;
}

interface InsightGridProps {
  insights: Insight[];
}

export default function InsightGrid({ insights }: InsightGridProps) {
  if (insights.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-surface p-10 text-center">
        <p className="text-muted">
          No insights are currently available.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {insights.map((insight) => (
        <InsightCard
          key={insight.id}
          title={insight.title}
          slug={insight.slug}
          excerpt={insight.excerpt}
          coverImageUrl={insight.cover_image_url}
          author={insight.author}
          publishedAt={insight.published_at}
        />
      ))}
    </div>
  );
}