import Link from "next/link";
import Icon from "./Icon";

type SectionHeaderProps = {
  title: string;
  actionHref?: string;
  level?: 2 | 3;
  id?: string;
};

export default function SectionHeader({
  title,
  actionHref,
  level = 2,
  id
}: SectionHeaderProps) {
  const Heading = level === 3 ? "h3" : "h2";
  const heading = (
    <Heading
      id={id}
      className="text-lg font-semibold text-[color:var(--color-text-primary)]"
    >
      {title}
    </Heading>
  );

  if (!actionHref) {
    return <div className="mb-3">{heading}</div>;
  }

  return (
    <Link
      className="mb-3 flex items-center justify-between rounded-md text-[color:var(--color-text-primary)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
      href={actionHref}
    >
      {heading}
      <Icon className="h-5 w-5" name="chevron-right" />
    </Link>
  );
}
