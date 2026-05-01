"use client";

import { useState } from "react";

type RoomDescriptionProps = {
  text: string;
  previewChars?: number;
};

export default function RoomDescription({
  text,
  previewChars = 190
}: RoomDescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const canToggle = text.length > previewChars;
  const visibleText =
    canToggle && !expanded ? `${text.slice(0, previewChars).trim()}...` : text;

  return (
    <section className="mt-6 border-t border-[color:var(--color-border)] pt-6">
      <p className="text-base leading-6 text-[color:var(--color-text-primary)]">
        {visibleText}
      </p>
      {canToggle ? (
        <button
          aria-expanded={expanded}
          className="mt-3 text-sm font-semibold underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
          type="button"
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      ) : null}
    </section>
  );
}
