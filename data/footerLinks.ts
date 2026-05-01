import type { FooterLinkGroup } from "@/types";

export const footerLinks: FooterLinkGroup[] = [
  {
    id: "support",
    title: "Support",
    links: [
      { id: "help-center", label: "Help Center", href: "/" },
      { id: "air-cover", label: "AirCover", href: "/" },
      { id: "anti-discrimination", label: "Anti-discrimination", href: "/" },
      { id: "disability-support", label: "Disability support", href: "/" }
    ]
  },
  {
    id: "hosting",
    title: "Hosting",
    links: [
      { id: "host-home", label: "Airbnb your home", href: "/" },
      { id: "host-cover", label: "AirCover for Hosts", href: "/" },
      { id: "resources", label: "Hosting resources", href: "/" },
      { id: "community", label: "Community forum", href: "/" }
    ]
  },
  {
    id: "airbnb",
    title: "Airbnb UI Clone",
    links: [
      { id: "newsroom", label: "Newsroom", href: "/" },
      { id: "features", label: "New features", href: "/" },
      { id: "careers", label: "Careers", href: "/" },
      { id: "investors", label: "Investors", href: "/" }
    ]
  }
];
