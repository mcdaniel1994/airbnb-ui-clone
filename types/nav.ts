import type { IconName } from "./icon";

export type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: IconName;
};

export type CategoryTab = {
  id: string;
  label: string;
  href: string;
  icon: IconName;
  isNew?: boolean;
};
