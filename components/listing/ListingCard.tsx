import Image from "next/image";
import Link from "next/link";
import type { Listing } from "@/types";
import Badge from "@/components/shared/Badge";
import FavoriteButton from "@/components/shared/FavoriteButton";
import RatingPill from "@/components/shared/RatingPill";

type ListingCardProps = {
  listing: Listing;
  variant?: "carousel" | "stacked";
  queryString?: string;
};

export default function ListingCard({
  listing,
  variant = "carousel",
  queryString
}: ListingCardProps) {
  const isStacked = variant === "stacked";
  const roomHref = queryString
    ? `/rooms/${listing.id}?${queryString}`
    : `/rooms/${listing.id}`;

  return (
    <article
      className={`group relative ${
        isStacked
          ? "w-full"
          : "w-[calc((100vw-4rem)/2)] max-w-44 shrink-0 md:w-56 md:max-w-none lg:w-full"
      }`}
    >
      <Link
        className="block rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
        href={roomHref}
      >
        <div
          className={`relative mb-2 overflow-hidden rounded-xl bg-[var(--color-bg-muted)] ${
            isStacked ? "h-60 md:h-72" : "aspect-square"
          }`}
        >
          <Image
            alt={listing.title}
            className="object-cover transition-transform duration-200 ease-out motion-reduce:transform-none md:group-hover:scale-[1.02]"
            fill
            sizes={
              isStacked
                ? "(min-width: 1536px) 20vw, (min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                : "(min-width: 1024px) 25vw, 224px"
            }
            src={listing.image}
          />
          {listing.badge ? (
            <Badge className="absolute left-3 top-3 z-10" kind={listing.badge} />
          ) : null}
        </div>
        <div className={isStacked ? "space-y-1" : ""}>
          <h3 className="line-clamp-1 text-sm font-semibold text-[color:var(--color-text-primary)]">
            {listing.title}
          </h3>
          {isStacked ? (
            <p className="text-sm text-[color:var(--color-text-secondary)]">
              {listing.location}
              {listing.bedsLabel ? ` · ${listing.bedsLabel}` : ""}
            </p>
          ) : null}
          <p className="text-sm text-[color:var(--color-text-primary)]">
            <span className="font-semibold">{listing.priceLabel}</span>{" "}
            <span className="text-[color:var(--color-text-secondary)]">
              {listing.nightsLabel}
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <RatingPill
              rating={listing.rating}
              reviewCount={isStacked ? listing.reviewCount : undefined}
            />
            {isStacked && listing.cancellationLabel ? (
              <span className="text-[color:var(--color-text-secondary)]">
                {listing.cancellationLabel}
              </span>
            ) : null}
          </div>
        </div>
      </Link>
      <div className="absolute right-2 top-2 z-10">
        <FavoriteButton
          initialActive={listing.isFavorite}
          listingId={listing.id}
        />
      </div>
    </article>
  );
}
