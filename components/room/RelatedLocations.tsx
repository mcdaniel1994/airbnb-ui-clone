import Link from "next/link";
import type { RelatedLocation } from "@/types";

type RelatedLocationsProps = {
  items: RelatedLocation[];
};

export default function RelatedLocations({ items }: RelatedLocationsProps) {
  return (
    <section className="mt-6 border-t border-[color:var(--color-border)] pt-6">
      <h2 className="text-lg font-semibold text-[color:var(--color-text-primary)]">Explore other options nearby</h2>
      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-4">
        {items.map((item) => (
          <Link
            key={item.id}
            className="rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
            href={item.href}
          >
            <p className="text-sm font-semibold">{item.name}</p>
            <p className="text-sm text-[color:var(--color-text-secondary)]">
              {item.descriptor}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
