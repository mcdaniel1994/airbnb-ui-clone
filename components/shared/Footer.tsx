import Link from "next/link";
import type { FooterLink, FooterLinkGroup, SocialLink } from "@/types";
import Icon from "./Icon";

type FooterProps = {
  linkGroups: FooterLinkGroup[];
  legalLinks: FooterLink[];
  socialLinks: SocialLink[];
};

export default function Footer({
  linkGroups,
  legalLinks,
  socialLinks
}: FooterProps) {
  return (
    <footer
      className="border-t border-[color:var(--color-border)] bg-[var(--color-bg)] px-4 py-8 md:px-6 lg:px-10 2xl:px-12"
      role="contentinfo"
    >
      <div className="mx-auto grid w-full max-w-[112rem] gap-8 md:grid-cols-3">
        {linkGroups.map((group) => (
          <section key={group.id}>
            <h3 className="text-sm font-semibold text-[color:var(--color-text-primary)]">
              {group.title}
            </h3>
            <ul className="mt-3 space-y-2">
              {group.links.map((link) => (
                <li key={link.id}>
                  <Link
                    className="text-sm text-[color:var(--color-link)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <div className="mx-auto mt-8 flex w-full max-w-[112rem] flex-col gap-4 border-t border-[color:var(--color-border)] pt-6 text-sm text-[color:var(--color-text-primary)] md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-4">
          <span className="inline-flex items-center gap-2">
            <Icon className="h-4 w-4" name="globe" />
            English (US)
          </span>
          <span className="inline-flex items-center gap-2">
            <Icon className="h-4 w-4" name="dollar" />
            USD
          </span>
        </div>
        <div className="flex gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              aria-label={link.label}
              className="rounded-full text-[color:var(--color-text-primary)] hover:text-[color:var(--color-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
              href={link.href}
              rel="noreferrer"
              target="_blank"
            >
              <Icon className="h-5 w-5" name={link.icon} />
            </a>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-4 flex w-full max-w-[112rem] flex-wrap gap-x-4 gap-y-2 text-xs text-[color:var(--color-text-secondary)]">
        <span>© 2026 Airbnb UI Clone</span>
        {legalLinks.map((link) => (
          <Link
            key={link.id}
            className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
