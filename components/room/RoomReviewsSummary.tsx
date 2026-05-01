import Link from "next/link";
import Icon from "@/components/shared/Icon";

type RoomReviewsSummaryProps = {
  rating: number;
  isGuestFavorite: boolean;
  caption: string;
  learnMoreHref?: string;
};

export default function RoomReviewsSummary({
  rating,
  isGuestFavorite,
  caption,
  learnMoreHref = "/"
}: RoomReviewsSummaryProps) {
  return (
    <section className="mt-6 border-t border-[color:var(--color-border)] pt-6 text-center">
      <div className="flex items-center justify-center gap-3">
        <Icon className="h-8 w-8" name="medal" />
        <p className="text-4xl font-semibold">{rating.toFixed(2)}</p>
        <Icon className="h-8 w-8" name="medal" />
      </div>
      <h2 className="mt-2 text-lg font-semibold">
        {isGuestFavorite ? "Guest favorite" : "Top-rated stay"}
      </h2>
      <p className="mx-auto mt-1 max-w-sm text-sm text-[color:var(--color-text-secondary)]">
        {caption}
      </p>
      <Link
        className="mt-2 inline-block rounded-md text-sm font-semibold underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
        href={learnMoreHref}
      >
        Learn more
      </Link>
    </section>
  );
}
