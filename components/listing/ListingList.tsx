import type { Listing } from "@/types";
import ListingCard from "./ListingCard";

type ListingListProps = {
  listings: Listing[];
  queryString?: string;
};

export default function ListingList({ listings, queryString }: ListingListProps) {
  if (listings.length === 0) {
    return (
      <p className="text-sm text-[color:var(--color-text-secondary)]">
        No homes match this area.
      </p>
    );
  }

  return (
    <ul className="space-y-6 md:grid md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {listings.map((listing) => (
        <li key={listing.id}>
          <ListingCard
            listing={listing}
            queryString={queryString}
            variant="stacked"
          />
        </li>
      ))}
    </ul>
  );
}
