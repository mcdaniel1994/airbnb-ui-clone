import type { InspirationItem, InspirationTab } from "@/types";

export const inspirationTabs: InspirationTab[] = [
  { id: "popular", label: "Popular" },
  { id: "arts", label: "Arts & culture" },
  { id: "beach", label: "Beach" },
  { id: "mountain", label: "Mountain" }
];

export const inspirationItemsByTab: Record<string, InspirationItem[]> = {
  popular: [
    { id: "canmore", city: "Canmore", descriptor: "Condo rentals", href: "/catalog?where=Canmore" },
    { id: "benalmadena", city: "Benalmadena", descriptor: "Apartment rentals", href: "/catalog?where=Benalmadena" },
    { id: "marbella", city: "Marbella", descriptor: "Beachfront rentals", href: "/catalog?where=Marbella" },
    { id: "mijas", city: "Mijas", descriptor: "House rentals", href: "/catalog?where=Mijas" },
    { id: "prescott", city: "Prescott", descriptor: "Cabin rentals", href: "/catalog?where=Prescott" },
    { id: "scottsdale", city: "Scottsdale", descriptor: "Pet-friendly rentals", href: "/catalog?where=Scottsdale" }
  ],
  arts: [
    { id: "phoenix", city: "Phoenix", descriptor: "Mansion rentals", href: "/catalog?where=Phoenix" },
    { id: "hot-springs", city: "Hot Springs", descriptor: "Vacation rentals", href: "/catalog?where=Hot%20Springs" },
    { id: "los-angeles", city: "Los Angeles", descriptor: "House rentals", href: "/catalog?where=Los%20Angeles" },
    { id: "san-diego", city: "San Diego", descriptor: "Beach condo rentals", href: "/catalog?where=San%20Diego" },
    { id: "san-francisco", city: "San Francisco", descriptor: "Apartment rentals", href: "/catalog?where=San%20Francisco" },
    { id: "barcelona", city: "Barcelona", descriptor: "Condo rentals", href: "/catalog?where=Barcelona" }
  ],
  beach: [
    { id: "galveston", city: "Galveston", descriptor: "Beach house rentals", href: "/catalog?where=Galveston" },
    { id: "corpus-christi", city: "Corpus Christi", descriptor: "Waterfront rentals", href: "/catalog?where=Corpus%20Christi" },
    { id: "destin", city: "Destin", descriptor: "Condo rentals", href: "/catalog?where=Destin" },
    { id: "miami", city: "Miami", descriptor: "Apartment rentals", href: "/catalog?where=Miami" },
    { id: "honolulu", city: "Honolulu", descriptor: "Oceanfront rentals", href: "/catalog?where=Honolulu" },
    { id: "malibu", city: "Malibu", descriptor: "Beach rentals", href: "/catalog?where=Malibu" }
  ],
  mountain: [
    { id: "aspen", city: "Aspen", descriptor: "Ski-in rentals", href: "/catalog?where=Aspen" },
    { id: "breckenridge", city: "Breckenridge", descriptor: "Cabin rentals", href: "/catalog?where=Breckenridge" },
    { id: "estes-park", city: "Estes Park", descriptor: "Pet-friendly stays", href: "/catalog?where=Estes%20Park" },
    { id: "park-city", city: "Park City", descriptor: "Condo rentals", href: "/catalog?where=Park%20City" },
    { id: "taos", city: "Taos", descriptor: "Adobe rentals", href: "/catalog?where=Taos" },
    { id: "big-bear", city: "Big Bear Lake", descriptor: "Lake house rentals", href: "/catalog?where=Big%20Bear%20Lake" }
  ]
};
