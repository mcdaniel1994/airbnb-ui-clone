import type { BadgeKind } from "@/types";

type BadgeProps = {
  kind: BadgeKind;
  className?: string;
};

const labels: Record<BadgeKind, string> = {
  guestFavorite: "Guest favorite",
  superhost: "Superhost",
  new: "NEW"
};

export default function Badge({ kind, className = "" }: BadgeProps) {
  const isNew = kind === "new";

  return (
    <span
      className={`inline-flex h-6 items-center rounded-full px-2 text-xs font-semibold ${
        isNew
          ? "bg-[var(--color-badge-new-bg)] text-[color:var(--color-badge-new-text)]"
          : "bg-[var(--color-badge-bg)] text-[color:var(--color-badge-text)]"
      } ${className}`}
    >
      {labels[kind]}
    </span>
  );
}
