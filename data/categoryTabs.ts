import type { CategoryTab } from "@/types";

export const categoryTabs: CategoryTab[] = [
  { id: "homes", label: "Homes", href: "/", icon: "home" },
  {
    id: "experiences",
    label: "Experiences",
    href: "/",
    icon: "sparkles",
    isNew: true
  },
  { id: "services", label: "Services", href: "/", icon: "utensils", isNew: true }
];
