"use client";

import { useState } from "react";
import Icon from "./Icon";

type FavoriteButtonProps = {
  listingId: string;
  initialActive?: boolean;
};

export default function FavoriteButton({
  listingId,
  initialActive = false
}: FavoriteButtonProps) {
  const [active, setActive] = useState(initialActive);

  return (
    <button
      aria-label={active ? "Remove from wishlist" : "Save to wishlist"}
      aria-pressed={active}
      className="flex h-10 w-10 items-center justify-center rounded-full text-white drop-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        setActive((current) => !current);
      }}
    >
      <Icon
        aria-hidden={true}
        className={`h-6 w-6 transition-transform duration-150 ease-out motion-reduce:transform-none active:scale-90 ${
          active
            ? "fill-[var(--color-favorite-active)] text-[color:var(--color-favorite-active)]"
            : "fill-[rgba(0,0,0,0.35)] text-white"
        }`}
        name="heart"
      />
      <span className="sr-only">{listingId}</span>
    </button>
  );
}
