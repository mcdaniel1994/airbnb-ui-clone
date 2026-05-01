"use client";

import { useState } from "react";
import type { Amenity } from "@/types";
import IconText from "@/components/shared/IconText";

type AmenitiesListProps = {
  amenities: Amenity[];
  previewCount?: number;
  totalCount: number;
};

export default function AmenitiesList({
  amenities,
  previewCount = 5,
  totalCount
}: AmenitiesListProps) {
  const [expanded, setExpanded] = useState(false);
  const actualTotal = Math.min(totalCount, amenities.length);
  const visibleAmenities = expanded ? amenities : amenities.slice(0, previewCount);
  const canToggle = amenities.length > previewCount;

  return (
    <section className="mt-6 border-t border-[color:var(--color-border)] pt-6">
      <h2 className="text-lg font-semibold text-[color:var(--color-text-primary)]">
        What this place offers
      </h2>
      <div className="mt-4 grid gap-1 md:grid-cols-2">
        {visibleAmenities.map((amenity) => (
          <IconText key={amenity.id} icon={amenity.icon} label={amenity.label} />
        ))}
      </div>
      {canToggle ? (
        <button
          aria-expanded={expanded}
          className="mt-5 rounded-lg border border-[color:var(--color-text-primary)] px-5 py-3 text-sm font-semibold transition-colors duration-150 ease-out hover:bg-[var(--color-bg-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
          type="button"
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded ? "Show fewer amenities" : `Show all ${actualTotal} amenities`}
        </button>
      ) : null}
    </section>
  );
}
