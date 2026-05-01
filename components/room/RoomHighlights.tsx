import type { Highlight } from "@/types";
import IconText from "@/components/shared/IconText";

type RoomHighlightsProps = {
  items: Highlight[];
};

export default function RoomHighlights({ items }: RoomHighlightsProps) {
  return (
    <section className="mt-6 border-t border-[color:var(--color-border)] pt-6">
      <div className="space-y-2">
        {items.map((item) => (
          <IconText
            key={item.id}
            icon={item.icon}
            label={item.label}
            sublabel={item.sublabel}
            variant="stacked"
          />
        ))}
      </div>
    </section>
  );
}
