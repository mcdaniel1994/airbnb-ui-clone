import Link from "next/link";
import Icon from "@/components/shared/Icon";

type CatalogHeaderProps = {
  title: string;
  resultSummary?: string;
};

export default function CatalogHeader({
  title,
  resultSummary
}: CatalogHeaderProps) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <Link
            aria-label="Back to home"
            className="flex h-9 shrink-0 items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-[var(--color-surface)] px-3 text-sm font-semibold text-[color:var(--color-text-primary)] shadow-sm transition-colors duration-150 ease-out hover:bg-[var(--color-bg-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
            href="/"
          >
            <Icon className="h-4 w-4" name="arrow-left" />
            <span>Home</span>
          </Link>
          <h1 className="truncate text-base font-semibold text-[color:var(--color-text-primary)]">
            {title}
          </h1>
        </div>
        {resultSummary ? (
          <p className="mt-2 text-sm text-[color:var(--color-text-secondary)] md:ml-[5.75rem]">
            {resultSummary}
          </p>
        ) : null}
      </div>
    </div>
  );
}
