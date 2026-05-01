"use client";

import { useEffect, useMemo, useState } from "react";
import type { Review, ReviewMention } from "@/types";
import Icon from "@/components/shared/Icon";
import ReviewCard from "./ReviewCard";
import ReviewMentionsList from "./ReviewMentionsList";

type ReviewListProps = {
  reviews: Review[];
  previewCount?: number;
  totalCount: number;
  rating: number;
  isGuestFavorite: boolean;
  caption: string;
  mentions: ReviewMention[];
};

export default function ReviewList({
  reviews,
  previewCount = 3,
  totalCount,
  rating,
  isGuestFavorite,
  caption,
  mentions
}: ReviewListProps) {
  const [isReviewPanelOpen, setIsReviewPanelOpen] = useState(false);
  const actualTotal = Math.min(totalCount, reviews.length);
  const visibleReviews = reviews.slice(0, previewCount);
  const canToggle = reviews.length > previewCount;
  const reviewBreakdown = useMemo(
    () =>
      [
        { label: "Overall rating", score: rating.toFixed(1) },
        ...mentions.slice(0, 5).map((mention) => ({
          label: mention.label,
          score: mention.score
        }))
      ].map((item) => {
        const numericScore = Number.parseFloat(item.score);

        return {
          ...item,
          percent: Number.isNaN(numericScore)
            ? 0
            : Math.min(100, Math.max(0, (numericScore / 5) * 100))
        };
      }),
    [mentions, rating]
  );

  useEffect(() => {
    if (!isReviewPanelOpen) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsReviewPanelOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isReviewPanelOpen]);

  return (
    <section className="mt-5">
      <div className="-mx-4 overflow-x-auto px-4 pb-2 scrollbar-none md:-mx-6 md:px-6">
        <div className="flex snap-x snap-mandatory gap-4">
          {visibleReviews.map((review) => (
            <div
              key={review.id}
              className="w-[82vw] max-w-[23rem] shrink-0 snap-start md:w-[calc(50%_-_0.5rem)] md:max-w-none lg:w-[calc(33.333%_-_0.67rem)]"
            >
              <ReviewCard className="h-full" review={review} />
            </div>
          ))}
        </div>
      </div>
      {canToggle ? (
        <button
          aria-haspopup="dialog"
          className="mt-5 rounded-lg border border-[color:var(--color-text-primary)] px-5 py-3 text-sm font-semibold transition-colors duration-150 ease-out hover:bg-[var(--color-bg-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
          type="button"
          onClick={() => setIsReviewPanelOpen(true)}
        >
          Show all {actualTotal} reviews
        </button>
      ) : null}
      {isReviewPanelOpen ? (
        <div
          aria-label="All reviews"
          aria-modal="true"
          className="fixed inset-0 z-[130] bg-[var(--color-surface)] md:bg-black/30 md:p-8"
          role="dialog"
        >
          <div className="flex h-full flex-col bg-[var(--color-surface)] md:mx-auto md:max-w-5xl md:overflow-hidden md:rounded-2xl md:shadow-2xl">
            <div className="sticky top-0 z-10 flex shrink-0 items-center justify-between border-b border-[color:var(--color-border)] bg-[var(--color-surface)] px-4 py-3 md:px-6">
              <button
                aria-label="Close all reviews"
                className="flex h-10 w-10 items-center justify-center rounded-full text-[color:var(--color-text-primary)] hover:bg-[var(--color-bg-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                type="button"
                onClick={() => setIsReviewPanelOpen(false)}
              >
                <Icon className="h-5 w-5" name="arrow-left" />
              </button>
              <p className="text-base font-semibold text-[color:var(--color-text-primary)]">
                Reviews
              </p>
              <div className="h-10 w-10" />
            </div>
            <div className="flex-1 overflow-y-auto px-4 pb-8 md:px-8">
              <div className="grid gap-6 py-6 md:grid-cols-[0.9fr_1.1fr] md:items-start md:py-8">
                <section className="rounded-2xl border border-[color:var(--color-border)] p-5 text-center md:p-6">
                  <div className="flex items-center justify-center gap-3">
                    <Icon className="h-9 w-9" name="medal" />
                    <p className="text-5xl font-semibold">
                      {rating.toFixed(2)}
                    </p>
                    <Icon className="h-9 w-9" name="medal" />
                  </div>
                  <h2 className="mt-3 text-xl font-semibold text-[color:var(--color-text-primary)]">
                    {isGuestFavorite ? "Guest favorite" : "Top-rated stay"}
                  </h2>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[color:var(--color-text-secondary)]">
                    {caption}
                  </p>
                </section>
                <section className="rounded-2xl border border-[color:var(--color-border)] p-5 md:p-6">
                  <h3 className="text-base font-semibold text-[color:var(--color-text-primary)]">
                    Rating breakdown
                  </h3>
                  <div className="mt-4 space-y-3">
                    {reviewBreakdown.map((item) => (
                      <div
                        key={item.label}
                        className="grid grid-cols-[7rem_1fr_2rem] items-center gap-3 text-sm"
                      >
                        <span className="truncate font-medium text-[color:var(--color-text-primary)]">
                          {item.label}
                        </span>
                        <span className="h-1.5 overflow-hidden rounded-full bg-[var(--color-bg-muted)]">
                          <span
                            className="block h-full rounded-full bg-[var(--color-text-primary)]"
                            style={{ width: `${item.percent}%` }}
                          />
                        </span>
                        <span className="text-right font-semibold text-[color:var(--color-text-primary)]">
                          {item.score}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
              <ReviewMentionsList mentions={mentions} />
              <div className="mt-8 flex flex-col gap-4 border-t border-[color:var(--color-border)] pt-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xl font-semibold text-[color:var(--color-text-primary)]">
                    {actualTotal} reviews
                  </p>
                  <p className="mt-1 text-sm text-[color:var(--color-text-secondary)]">
                    Browse what guests loved most about this stay.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    className="flex h-11 items-center gap-2 rounded-full border border-[color:var(--color-border)] px-4 text-sm font-semibold text-[color:var(--color-text-primary)] hover:bg-[var(--color-bg-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                    type="button"
                  >
                    Most relevant
                    <Icon className="h-4 w-4" name="chevron-down" />
                  </button>
                  <button
                    aria-label="Search reviews"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-border)] text-[color:var(--color-text-primary)] hover:bg-[var(--color-bg-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                    type="button"
                  >
                    <Icon className="h-5 w-5" name="search" />
                  </button>
                </div>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {reviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    previewChars={260}
                    review={review}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
