"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface FilterOption {
  id: string;
  name: string;
  slug: string;
}

interface InsightFiltersProps {
  sectors: FilterOption[];
  audiences: FilterOption[];
}

export default function InsightFilters({
  sectors,
  audiences,
}: InsightFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedSector = searchParams.get("sector") ?? "";
  const selectedAudience = searchParams.get("audience") ?? "";

  function updateFilter(type: "sector" | "audience", value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(type, value);
    } else {
      params.delete(type);
    }

    const query = params.toString();

    router.push(query ? `/insights?${query}` : "/insights");
  }

  function clearFilters() {
    router.push("/insights");
  }

  const hasFilters = selectedSector || selectedAudience;

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="sector-filter"
            className="mb-2 block text-sm font-semibold text-primary"
          >
            Sector
          </label>

          <select
            id="sector-filter"
            value={selectedSector}
            onChange={(event) =>
              updateFilter("sector", event.target.value)
            }
            className="w-full rounded-md border border-border bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-primary"
          >
            <option value="">All sectors</option>

            {sectors.map((sector) => (
              <option key={sector.id} value={sector.slug}>
                {sector.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="audience-filter"
            className="mb-2 block text-sm font-semibold text-primary"
          >
            Whom We Serve
          </label>

          <select
            id="audience-filter"
            value={selectedAudience}
            onChange={(event) =>
              updateFilter("audience", event.target.value)
            }
            className="w-full rounded-md border border-border bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-primary"
          >
            <option value="">All client types</option>

            {audiences.map((audience) => (
              <option key={audience.id} value={audience.slug}>
                {audience.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {hasFilters && (
        <div className="mt-4">
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm font-semibold text-primary hover:text-secondary"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}