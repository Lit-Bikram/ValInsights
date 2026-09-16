import Link from "next/link";

interface SectorCardProps {
  name: string;
  slug: string;
  description?: string | null;
}

export default function SectorCard({
  name,
  slug,
  description,
}: SectorCardProps) {
  return (
    <Link
      href={`/sectors/${slug}`}
      className="group block rounded-xl border border-border bg-white p-6 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface text-primary">
        <span className="text-lg font-bold">V</span>
      </div>

      <h3 className="mt-6 text-xl font-semibold text-primary group-hover:text-secondary">
        {name}
      </h3>

      {description && (
        <p className="mt-3 text-sm leading-6 text-muted">
          {description}
        </p>
      )}

      <span className="mt-5 inline-block text-sm font-semibold text-primary">
        Explore sector →
      </span>
    </Link>
  );
}