import Icon from "@/components/shared/Icon";

export default function PriceDisclaimer() {
  return (
    <div className="flex justify-center">
      <p className="inline-flex h-8 items-center gap-2 rounded-full border border-[color:var(--color-primary)] bg-[var(--color-bg)] px-3 text-xs font-semibold text-[color:var(--color-primary)]">
        <Icon className="h-4 w-4" name="dollar" />
        Prices include all fees
      </p>
    </div>
  );
}
