"use client";

import { useState } from "react";

type RoomPriceReserveProps = {
  pricePerNight: string;
  nightsLabel: string;
  dateRange: string;
  guests?: number;
  roomTitle?: string;
  variant?: "card" | "mobileBar";
  onReserve?: () => void;
};

export default function RoomPriceReserve({
  pricePerNight,
  nightsLabel,
  dateRange,
  guests,
  roomTitle,
  variant = "card",
  onReserve
}: RoomPriceReserveProps) {
  const [showSummary, setShowSummary] = useState(false);
  const isMobileBar = variant === "mobileBar";

  return (
    <section
      className={
        isMobileBar
          ? "fixed inset-x-0 bottom-16 z-[70] rounded-t-2xl border border-b-0 border-[color:var(--color-border)] bg-[var(--color-surface)] px-4 py-3 shadow-[0_-10px_30px_rgba(0,0,0,0.12)] md:hidden"
          : "rounded-2xl border border-[color:var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[0_12px_32px_rgba(0,0,0,0.10)]"
      }
    >
      <div
        className={isMobileBar ? "flex items-center justify-between gap-4" : ""}
      >
        <div className="min-w-0">
          {!isMobileBar ? (
            <p className="mb-3 text-sm font-semibold text-[color:var(--color-text-secondary)]">
              Reserve your stay
            </p>
          ) : null}
          <div className="flex items-baseline gap-1">
            <p
              className={`font-semibold text-[color:var(--color-text-primary)] ${
                isMobileBar ? "text-lg leading-5" : "text-[24px] leading-8"
              }`}
            >
              {pricePerNight}
            </p>
            <span className="text-sm font-normal text-[color:var(--color-text-secondary)]">
              night
            </span>
          </div>
          <p
            className={`mt-1 truncate text-sm text-[color:var(--color-text-primary)] ${
              isMobileBar ? "max-w-[52vw]" : ""
            }`}
          >
            {nightsLabel} · {dateRange}
          </p>
        </div>
        {!isMobileBar ? (
          <div className="mt-5 overflow-hidden rounded-xl border border-[color:var(--color-border)]">
            <div className="grid grid-cols-2 divide-x divide-[color:var(--color-border)]">
              <div className="p-3">
                <p className="text-[10px] font-semibold uppercase text-[color:var(--color-text-secondary)]">
                  Dates
                </p>
                <p className="mt-1 text-sm font-semibold text-[color:var(--color-text-primary)]">
                  {dateRange}
                </p>
              </div>
              <div className="p-3">
                <p className="text-[10px] font-semibold uppercase text-[color:var(--color-text-secondary)]">
                  Guests
                </p>
                <p className="mt-1 text-sm font-semibold text-[color:var(--color-text-primary)]">
                  {guests ? `${guests} guests` : "Add guests"}
                </p>
              </div>
            </div>
          </div>
        ) : null}
        <button
          aria-expanded={showSummary}
          className={`shrink-0 rounded-lg bg-[var(--color-primary)] font-semibold text-white shadow-sm transition-colors duration-150 ease-out hover:bg-[var(--color-primary-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] ${
            isMobileBar
              ? "h-11 min-w-[104px] px-4 text-sm"
              : "mt-4 h-12 w-full px-5 text-base"
          }`}
          type="button"
          onClick={() => {
            setShowSummary((current) => !current);
            onReserve?.();
          }}
        >
          Reserve
        </button>
      </div>
      {!isMobileBar ? (
        <p className="mt-3 text-center text-xs text-[color:var(--color-text-secondary)]">
          No payment or sign-in is required for this demo request.
        </p>
      ) : null}
      {showSummary ? (
        <div
          className={`mt-4 rounded-lg bg-[var(--color-bg-muted)] text-sm text-[color:var(--color-text-primary)] ${
            isMobileBar ? "p-3" : "p-4"
          }`}
        >
          <p className="font-semibold">Reservation request</p>
          {roomTitle ? <p className="mt-1">{roomTitle}</p> : null}
          <p className="mt-1">
            {dateRange} · {nightsLabel}
          </p>
          {guests ? <p className="mt-1">{guests} guests</p> : null}
          <p className="mt-3 text-[color:var(--color-text-secondary)]">
            This is a demo request only, with no payment or account step.
          </p>
        </div>
      ) : null}
    </section>
  );
}
