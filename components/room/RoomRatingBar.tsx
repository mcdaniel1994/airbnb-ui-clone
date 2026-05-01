import Icon from "@/components/shared/Icon";

type RoomRatingBarProps = {
  rating: number;
  isGuestFavorite: boolean;
  reviewCount: number;
};

export default function RoomRatingBar({
  rating,
  isGuestFavorite,
  reviewCount
}: RoomRatingBarProps) {
  return (
    <section className="mt-6 grid grid-cols-3 divide-x divide-[color:var(--color-border)] rounded-xl border border-[color:var(--color-border)] py-4 text-center">
      <div>
        <p className="text-xl font-semibold">{rating.toFixed(2)}</p>
        <p className="text-xs text-[color:var(--color-text-secondary)]">Rating</p>
      </div>
      <div className="px-3">
        <div className="mx-auto flex items-center justify-center gap-1">
          <Icon className="h-5 w-5" name="medal" />
          <p className="text-sm font-semibold">
            {isGuestFavorite ? "Guest favorite" : "Top-rated"}
          </p>
        </div>
        <p className="mt-1 text-xs text-[color:var(--color-text-secondary)]">
          Loved by guests
        </p>
      </div>
      <div>
        <p className="text-xl font-semibold">{reviewCount}</p>
        <p className="text-xs text-[color:var(--color-text-secondary)]">Reviews</p>
      </div>
    </section>
  );
}
