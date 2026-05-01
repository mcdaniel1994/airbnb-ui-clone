import Link from "next/link";
import Icon from "./Icon";

type BrandLogoProps = {
  className?: string;
};

export default function BrandLogo({ className = "" }: BrandLogoProps) {
  return (
    <Link
      aria-label="Airbnb UI Clone home"
      className={`inline-flex items-center gap-2 rounded-full text-[color:var(--color-primary)] transition-colors duration-150 ease-out hover:text-[color:var(--color-primary-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] ${className}`}
      href="/"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-sm">
        <Icon className="h-5 w-5" name="airbnb" />
      </span>
      <span className="text-sm font-bold tracking-normal">
        Airbnb UI Clone
      </span>
    </Link>
  );
}
