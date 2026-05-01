import type { NavItem } from "@/types";

export const bottomNavItems: NavItem[] = [
  { id: "explore", label: "Explore", href: "/catalog", icon: "search" },
  { id: "wishlists", label: "Wishlists", href: "/", icon: "heart" },
  { id: "login", label: "Log in", href: "/", icon: "user-circle" }
];
