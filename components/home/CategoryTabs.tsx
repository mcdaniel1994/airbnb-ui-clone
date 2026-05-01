"use client";

import { useState } from "react";
import Link from "next/link";
import type { CategoryTab } from "@/types";
import Badge from "@/components/shared/Badge";
import Icon from "@/components/shared/Icon";
import UnavailableFeature from "@/components/shared/UnavailableFeature";

type CategoryTabsProps = {
  items: CategoryTab[];
  activeId: string;
};

export default function CategoryTabs({ items, activeId }: CategoryTabsProps) {
  const [unavailableItem, setUnavailableItem] = useState<CategoryTab | null>(
    null
  );

  return (
    <>
      <nav
        aria-label="Categories"
        className="relative z-20 mt-5 overflow-x-auto scrollbar-none md:mt-4"
      >
        <div className="flex min-w-0 justify-around gap-2 border-b border-[color:var(--color-border)] md:min-w-max md:justify-center md:gap-6">
          {items.map((item) => {
            const isUnavailable =
              item.id === "experiences" || item.id === "services";
            const isActive = unavailableItem
              ? item.id === unavailableItem.id
              : item.id === activeId;
            const tabClass = `relative flex min-w-[5.25rem] flex-col items-center gap-0.5 whitespace-nowrap border-b-2 px-1 pb-2 pt-1 text-[11px] font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] md:min-w-20 md:gap-1 md:px-2 md:pb-3 md:text-xs ${
              isActive
                ? "border-[color:var(--color-text-primary)] text-[color:var(--color-text-primary)]"
                : "border-transparent text-[color:var(--color-text-secondary)]"
            }`;
            const content = (
              <>
                <span className="relative flex h-8 w-8 items-end justify-center">
                  <Icon className="h-5 w-5 md:h-6 md:w-6" name={item.icon} />
                  {item.isNew ? (
                    <Badge
                      className="absolute -right-8 top-0 z-10 !h-4 !px-1.5 !text-[9px] leading-none"
                      kind="new"
                    />
                  ) : null}
                </span>
                <span>{item.label}</span>
              </>
            );

            if (isUnavailable) {
              return (
                <button
                  key={item.id}
                  aria-pressed={isActive}
                  className={tabClass}
                  type="button"
                  onClick={() => setUnavailableItem(item)}
                >
                  {content}
                </button>
              );
            }

            return (
              <Link
                key={item.id}
                aria-current={isActive ? "page" : undefined}
                className={tabClass}
                href={item.href}
                onClick={() => setUnavailableItem(null)}
              >
                {content}
              </Link>
            );
          })}
        </div>
      </nav>
      {unavailableItem ? (
        <div className="mt-4">
          <UnavailableFeature
            featureName={unavailableItem.label}
            onDismiss={() => setUnavailableItem(null)}
          />
        </div>
      ) : null}
    </>
  );
}
