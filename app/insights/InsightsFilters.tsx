"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type TaxonomyItem = {
  id: string;
  name: string;
  slug: string;
};

type Props = {
  sectors: TaxonomyItem[];
  audiences: TaxonomyItem[];
  services: TaxonomyItem[];
  selectedSector: string;
  selectedAudience: string;
  selectedService: string;
};

type FilterKey = "sector" | "audience" | "service";

type FilterDropdownProps = {
  label: string;
  placeholder: string;
  value: string;
  items: TaxonomyItem[];
  open: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
};

function FilterDropdown({
  label,
  placeholder,
  value,
  items,
  open,
  onToggle,
  onSelect,
}: FilterDropdownProps) {
  const selectedItem = items.find((item) => item.slug === value);

  return (
    <div className="insights-filter">
      <span>{label}</span>

      <button
        type="button"
        className="insights-filter__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={onToggle}
      >
        <span className="insights-filter__value">
          {selectedItem?.name ?? placeholder}
        </span>
        <span className="insights-filter__chevron" aria-hidden="true" />
      </button>

      {open && (
        <div className="insights-filter__menu" role="listbox">
          <button
            type="button"
            role="option"
            aria-selected={!value}
            className={`insights-filter__option${!value ? " is-selected" : ""}`}
            onClick={() => onSelect("")}
          >
            {placeholder}
          </button>

          {items.map((item) => {
            const isSelected = item.slug === value;

            return (
              <button
                key={item.id}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={`insights-filter__option${isSelected ? " is-selected" : ""}`}
                onClick={() => onSelect(item.slug)}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function InsightsFilters({
  sectors,
  audiences,
  services,
  selectedSector,
  selectedAudience,
  selectedService,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filterBarRef = useRef<HTMLDivElement>(null);
  const [openFilter, setOpenFilter] = useState<FilterKey | null>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        filterBarRef.current &&
        !filterBarRef.current.contains(event.target as Node)
      ) {
        setOpenFilter(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenFilter(null);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function updateFilter(key: FilterKey, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    const query = params.toString();

    setOpenFilter(null);

    router.push(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }

  function clearFilters() {
    setOpenFilter(null);
    router.push(pathname, { scroll: false });
  }

  const hasFilters = Boolean(
    selectedSector || selectedAudience || selectedService,
  );

  return (
    <div ref={filterBarRef} className="insights-filter-bar">
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
        <FilterDropdown
          label="Sector"
          placeholder="All Sectors"
          value={selectedSector}
          items={sectors}
          open={openFilter === "sector"}
          onToggle={() =>
            setOpenFilter((current) =>
              current === "sector" ? null : "sector",
            )
          }
          onSelect={(value) => updateFilter("sector", value)}
        />

        <FilterDropdown
          label="Who We Serve"
          placeholder="All Categories"
          value={selectedAudience}
          items={audiences}
          open={openFilter === "audience"}
          onToggle={() =>
            setOpenFilter((current) =>
              current === "audience" ? null : "audience",
            )
          }
          onSelect={(value) => updateFilter("audience", value)}
        />

        <FilterDropdown
          label="Core Service"
          placeholder="All Services"
          value={selectedService}
          items={services}
          open={openFilter === "service"}
          onToggle={() =>
            setOpenFilter((current) =>
              current === "service" ? null : "service",
            )
          }
          onSelect={(value) => updateFilter("service", value)}
        />
      </div>
    </div>
  );
}
