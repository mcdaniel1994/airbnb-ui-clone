import type { IconName } from "./icon";

export type FooterLink = {
  id: string;
  label: string;
  href: string;
};

export type FooterLinkGroup = {
  id: string;
  title: string;
  links: FooterLink[];
};

export type SocialLink = FooterLink & {
  icon: Extract<IconName, "facebook" | "instagram" | "x">;
};
