"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type TaxonomyItem = {
  id: string;
  name: string;
  slug: string;
};

type Props = {
  sectors: TaxonomyItem[];
  audiences: TaxonomyItem[];
  selectedSector: string;
  selectedAudience: string;
};

export default function InsightsFilters({
  sectors,
  audiences,
  selectedSector,
  selectedAudience,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateFilter(
    key: "sector" | "audience",
    value: string
  ) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }

  function clearFilters() {
    router.push(pathname, { scroll: false });
  }

  const hasFilters = Boolean(selectedSector || selectedAudience);

  return (
    <div className="insights-filter-bar">
      <div className="insights-filter-bar__heading">
        <span className="insights-publications__filter">
          {hasFilters ? "Filtered Publications" : "All Publications"}
        </span>

        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="insights-filter-bar__clear"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="insights-filter-bar__controls">
        <label className="insights-filter">
          <span>Sector</span>
          <select
            value={selectedSector}
            onChange={(event) =>
              updateFilter("sector", event.target.value)
            }
          >
            <option value="">All Sectors</option>
            {sectors.map((sector) => (
              <option key={sector.id} value={sector.slug}>
                {sector.name}
              </option>
            ))}
          </select>
        </label>

        <label className="insights-filter">
          <span>Who We Serve</span>
          <select
            value={selectedAudience}
            onChange={(event) =>
              updateFilter("audience", event.target.value)
            }
          >
            <option value="">All Categories</option>
            {audiences.map((audience) => (
              <option key={audience.id} value={audience.slug}>
                {audience.name}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
