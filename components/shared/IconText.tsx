import type { IconName } from "@/types";
import Icon from "./Icon";

type IconTextProps = {
  icon: IconName;
  label: string;
  sublabel?: string;
  variant?: "compact" | "stacked";
};

export default function IconText({
  icon,
  label,
  sublabel,
  variant = "compact"
}: IconTextProps) {
  return (
    <div className="flex w-full gap-3 py-2 text-[color:var(--color-text-primary)]">
      <Icon aria-hidden={true} className="mt-0.5 h-6 w-6 shrink-0" name={icon} />
      <div className={variant === "stacked" ? "space-y-1" : ""}>
        <p className="text-base leading-6">{label}</p>
        {sublabel ? (
          <p className="text-sm text-[color:var(--color-text-secondary)]">
            {sublabel}
          </p>
        ) : null}
      </div>
    </div>
  );
}
