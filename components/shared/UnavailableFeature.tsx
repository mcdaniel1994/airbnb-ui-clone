"use client";

import Icon from "@/components/shared/Icon";

type UnavailableFeatureProps = {
  featureName: string;
  onDismiss?: () => void;
};

export default function UnavailableFeature({
  featureName,
  onDismiss
}: UnavailableFeatureProps) {
  return (
    <section className="rounded-xl border border-[color:var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-muted)] text-[color:var(--color-text-primary)]">
            <Icon className="h-5 w-5" name="sparkles" />
          </span>
          <div>
            <p className="text-base font-semibold text-[color:var(--color-text-primary)]">
              {featureName} are coming soon
            </p>
            <p className="mt-1 text-sm text-[color:var(--color-text-secondary)]">
              We are keeping the focus on homes while this area is prepared.
            </p>
          </div>
        </div>
        {onDismiss ? (
          <button
            aria-label={`Dismiss ${featureName} message`}
            className="shrink-0 rounded-lg px-3 py-2 text-sm font-semibold text-[color:var(--color-text-primary)] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
            type="button"
            onClick={onDismiss}
          >
            Close
          </button>
        ) : null}
      </div>
    </section>
  );
}
