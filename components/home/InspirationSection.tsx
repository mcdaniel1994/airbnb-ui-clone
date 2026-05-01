"use client";

import { useState } from "react";
import Link from "next/link";
import type { InspirationItem, InspirationTab } from "@/types";
import SectionHeader from "@/components/shared/SectionHeader";
import Icon from "@/components/shared/Icon";

type InspirationSectionProps = {
  tabs: InspirationTab[];
  itemsByTab: Record<string, InspirationItem[]>;
};

export default function InspirationSection({
  tabs,
  itemsByTab
}: InspirationSectionProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? "");
  const visibleItems = itemsByTab[activeTab] ?? [];

  return (
    <section className="border-t border-[color:var(--color-border)] pt-6">
      <SectionHeader title="Inspiration for future getaways" />
      <div className="overflow-x-auto scrollbar-none">
        <div className="flex min-w-max gap-6 border-b border-[color:var(--color-border)]">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;

            return (
              <button
                key={tab.id}
                aria-pressed={isActive}
                className={`pb-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] ${
                  isActive
                    ? "border-b-2 border-[color:var(--color-text-primary)] text-[color:var(--color-text-primary)]"
                    : "text-[color:var(--color-text-secondary)]"
                }`}
                type="button"
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-4">
        {visibleItems.map((item) => (
          <Link
            key={item.id}
            className="rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
            href={item.href}
          >
            <p className="text-sm font-semibold text-[color:var(--color-text-primary)]">
              {item.city}
            </p>
            <p className="text-sm text-[color:var(--color-text-secondary)]">
              {item.descriptor}
            </p>
          </Link>
        ))}
      </div>
      <Link
        className="mt-6 inline-flex items-center gap-1 rounded-md text-sm font-semibold text-[color:var(--color-text-primary)] underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
        href="/catalog"
      >
        Show more
        <Icon className="h-4 w-4" name="chevron-down" />
      </Link>
    </section>
  );
}
