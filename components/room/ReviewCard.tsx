"use client";

import { useState } from "react";
import Image from "next/image";
import type { Review } from "@/types";

type ReviewCardProps = {
  review: Review;
  previewChars?: number;
  className?: string;
};

export default function ReviewCard({
  review,
  previewChars = 150,
  className = ""
}: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false);
  const canToggle = review.text.length > previewChars;
  const visibleText =
    canToggle && !expanded
      ? `${review.text.slice(0, previewChars).trim()}...`
      : review.text;

  return (
    <article
      className={`rounded-xl border border-[color:var(--color-border)] p-4 ${className}`}
    >
      <div className="flex items-center gap-3">
        <Image
          alt={`${review.name}'s profile photo`}
          className="h-12 w-12 rounded-full object-cover"
          height={48}
          src={review.avatar}
          width={48}
        />
        <div>
          <h3 className="text-sm font-semibold">{review.name}</h3>
          <p className="text-xs text-[color:var(--color-text-secondary)]">
            {review.tenure}
          </p>
        </div>
      </div>
      <p className="mt-3 text-xs font-semibold">{review.date}</p>
      <p className="mt-2 text-sm leading-6 text-[color:var(--color-text-primary)]">
        {visibleText}
      </p>
      {canToggle ? (
        <button
          aria-expanded={expanded}
          className="mt-2 text-sm font-semibold underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
          type="button"
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      ) : null}
    </article>
  );
}
