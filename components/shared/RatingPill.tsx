import Icon from "./Icon";

type RatingPillProps = {
  rating: number;
  reviewCount?: number;
  size?: "inline" | "large";
};

export default function RatingPill({
  rating,
  reviewCount,
  size = "inline"
}: RatingPillProps) {
  const formattedRating = rating.toFixed(2);
  const label =
    reviewCount === undefined
      ? `Rated ${formattedRating} out of 5`
      : `Rated ${formattedRating} out of 5, ${reviewCount} reviews`;

  return (
    <span
      aria-label={label}
      className={`inline-flex items-center gap-1 text-[color:var(--color-text-primary)] ${
        size === "large" ? "text-2xl font-semibold" : "text-sm"
      }`}
    >
      <Icon
        className={`fill-[var(--color-rating-star)] text-[color:var(--color-rating-star)] ${
          size === "large" ? "h-5 w-5" : "h-3.5 w-3.5"
        }`}
        name="star"
      />
      <span>{formattedRating}</span>
      {reviewCount !== undefined ? (
        <span className={size === "large" ? "text-sm font-normal" : ""}>
          ({reviewCount})
        </span>
      ) : null}
    </span>
  );
}
