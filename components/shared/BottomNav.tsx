"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/types";
import Icon from "./Icon";

type BottomNavProps = {
  items: NavItem[];
};

export default function BottomNav({ items }: BottomNavProps) {
  const pathname = usePathname();
  const [dialogItem, setDialogItem] = useState<NavItem | undefined>();

  return (
    <>
      {dialogItem ? (
        <div
          aria-label={dialogItem.label}
          aria-modal="true"
          className="fixed inset-x-4 bottom-20 z-20 mx-auto max-w-sm rounded-xl border border-[color:var(--color-border)] bg-[var(--color-surface)] p-4 text-sm text-[color:var(--color-text-primary)] shadow-md md:hidden"
          role="dialog"
        >
          <p className="font-semibold">{dialogItem.label}</p>
          <p className="mt-1 text-[color:var(--color-text-secondary)]">
            {dialogItem.id === "wishlists"
              ? "Saved homes stay local in this demo."
              : dialogItem.id === "login"
                ? "Log in is not available in this demo."
                : "Explore real listings in this demo."}
          </p>
          <button
            className="mt-3 rounded-lg border border-[color:var(--color-text-primary)] px-4 py-2 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
            type="button"
            onClick={() => setDialogItem(undefined)}
          >
            Close
          </button>
        </div>
      ) : null}
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-20 h-16 bg-[var(--color-bg)] shadow-[0_-1px_0_rgba(0,0,0,0.06)] md:hidden"
      >
        <div className="mx-auto flex h-full max-w-md">
          {items.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.id === "explore" && pathname.startsWith("/catalog"));
            const itemClass = `flex flex-1 flex-col items-center justify-center gap-1 text-[10px] font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--color-primary)] ${
              isActive
                ? "text-[color:var(--color-primary)]"
                : "text-[color:var(--color-text-secondary)]"
            }`;

            if (item.id === "explore") {
              return (
                <Link
                  key={item.id}
                  aria-current={isActive ? "page" : undefined}
                  className={itemClass}
                  href={item.href}
                >
                  <Icon className="h-7 w-7" name={item.icon} />
                  <span>{item.label}</span>
                </Link>
              );
            }

            return (
              <button
                key={item.id}
                aria-haspopup="dialog"
                className={itemClass}
                type="button"
                onClick={() => setDialogItem(item)}
              >
                <Icon className="h-7 w-7" name={item.icon} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
