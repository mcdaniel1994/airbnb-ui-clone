import Link from "next/link";
import type { OtherStayType } from "@/types";

type OtherStayTypesProps = {
  items: OtherStayType[];
};

export default function OtherStayTypes({ items }: OtherStayTypesProps) {
  return (
    <section className="mt-6 border-t border-[color:var(--color-border)] pt-6">
      <h2 className="text-lg font-semibold text-[color:var(--color-text-primary)]">Other types of stays</h2>
      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-4">
        {items.map((item) => (
          <Link
            key={item.id}
            className="rounded-md text-sm font-semibold underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
            href={item.href}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
