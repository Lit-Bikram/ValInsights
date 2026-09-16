import Link from "next/link";

interface InsightCardProps {
  title: string;
  slug: string;
  excerpt?: string | null;
  coverImageUrl?: string | null;
  author?: string | null;
  publishedAt?: string | null;
}

export default function InsightCard({
  title,
  slug,
  excerpt,
  coverImageUrl,
  author,
  publishedAt,
}: InsightCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-white transition-all hover:-translate-y-1 hover:shadow-lg">
      {coverImageUrl ? (
        <div className="aspect-[16/9] overflow-hidden bg-surface">
          <img
            src={coverImageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="flex aspect-[16/9] items-center justify-center bg-primary">
          <span className="text-2xl font-bold text-white">
            Val<span className="text-secondary">Insight</span>
          </span>
        </div>
      )}

      <div className="p-6">
        {publishedAt && (
          <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
            {new Date(publishedAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        )}

        <h3 className="mt-3 text-xl font-semibold leading-snug text-primary">
          {title}
        </h3>

        {excerpt && (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">
            {excerpt}
          </p>
        )}

        <div className="mt-5 flex items-center justify-between">
          {author && (
            <span className="text-xs text-muted">
              By {author}
            </span>
          )}

          <Link
            href={`/insights/${slug}`}
            className="text-sm font-semibold text-primary hover:text-secondary"
          >
            Read insight →
          </Link>
        </div>
      </div>
    </article>
  );
}