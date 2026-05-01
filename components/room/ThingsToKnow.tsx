import type { ThingsToKnowSection } from "@/types";
import IconText from "@/components/shared/IconText";

type ThingsToKnowProps = {
  sections: ThingsToKnowSection[];
};

export default function ThingsToKnow({ sections }: ThingsToKnowProps) {
  return (
    <section className="mt-6 border-t border-[color:var(--color-border)] pt-6">
      <h2 className="text-lg font-semibold text-[color:var(--color-text-primary)]">Things to know</h2>
      <div className="mt-4 grid gap-6 md:grid-cols-3">
        {sections.map((section) => (
          <div key={section.id}>
            <h3 className="text-sm font-semibold">{section.title}</h3>
            <div className="mt-2 space-y-1">
              {section.items.map((item) => (
                <IconText
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  sublabel={item.sublabel}
                  variant={item.sublabel ? "stacked" : "compact"}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
