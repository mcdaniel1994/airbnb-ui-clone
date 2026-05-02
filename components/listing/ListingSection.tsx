import type { Listing } from "@/types";
import SectionHeader from "@/components/shared/SectionHeader";
import ListingCard from "./ListingCard";

type ListingSectionProps = {
  title: string;
  listings: Listing[];
  actionHref?: string;
  queryString?: string;
};

export default function ListingSection({
  title,
  listings,
  actionHref,
  queryString
}: ListingSectionProps) {
  const titleId = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-heading`;
  const sectionHref =
    actionHref && queryString ? `${actionHref}?${queryString}` : actionHref;

  return (
    <section aria-labelledby={titleId} className="mb-8">
      <SectionHeader actionHref={sectionHref} id={titleId} title={title} />
      <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-1 scrollbar-none md:-mx-6 md:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:px-0 2xl:gap-6">
        {listings.map((listing, index) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            priority={index === 0}
            queryString={queryString}
            variant="carousel"
          />
        ))}
      </div>
    </section>
  );
}
