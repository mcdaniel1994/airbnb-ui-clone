import type { BadgeKind, Listing } from "@/types";

export type CanonicalListing = {
  id: string;
  cardTitle: string;
  roomTitle: string;
  subtitle: string;
  city: string;
  region: string;
  country: string;
  image: string;
  priceLabel: string;
  rating: number;
  reviewCount: number;
  badge?: BadgeKind;
  bedsLabel: string;
  hostName: string;
  guests: number;
  bedrooms: number;
  beds: number;
  baths: number;
};

export const canonicalListings: CanonicalListing[] = [
  {
    id: "dallas-cedars-loft",
    cardTitle: "Apartment in Cedars",
    roomTitle: "Modern apartment in Cedars",
    subtitle: "Entire rental unit in Dallas, Texas",
    city: "Dallas",
    region: "Texas",
    country: "United States",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    priceLabel: "$183",
    rating: 4.98,
    reviewCount: 8,
    badge: "guestFavorite",
    bedsLabel: "2 beds",
    hostName: "Maya",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 1
  },
  {
    id: "dallas-bishop-arts-bungalow",
    cardTitle: "Bungalow in Bishop Arts",
    roomTitle: "Sunny bungalow in Bishop Arts",
    subtitle: "Entire bungalow in Dallas, Texas",
    city: "Dallas",
    region: "Texas",
    country: "United States",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    priceLabel: "$214",
    rating: 4.93,
    reviewCount: 7,
    badge: "superhost",
    bedsLabel: "3 beds",
    hostName: "Jordan",
    guests: 5,
    bedrooms: 2,
    beds: 3,
    baths: 2
  },
  {
    id: "dallas-deep-ellum-flat",
    cardTitle: "Flat near Deep Ellum",
    roomTitle: "Bright flat near Deep Ellum",
    subtitle: "Entire rental unit in Dallas, Texas",
    city: "Dallas",
    region: "Texas",
    country: "United States",
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
    priceLabel: "$166",
    rating: 4.87,
    reviewCount: 6,
    badge: "new",
    bedsLabel: "1 queen bed",
    hostName: "Sam",
    guests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1
  },
  {
    id: "dallas-oak-lawn-townhome",
    cardTitle: "Townhome in Oak Lawn",
    roomTitle: "Quiet townhome in Oak Lawn",
    subtitle: "Entire townhouse in Dallas, Texas",
    city: "Dallas",
    region: "Texas",
    country: "United States",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
    priceLabel: "$246",
    rating: 4.91,
    reviewCount: 7,
    bedsLabel: "4 beds",
    hostName: "Priya",
    guests: 6,
    bedrooms: 3,
    beds: 4,
    baths: 2
  },
  {
    id: "austin-eastside-studio",
    cardTitle: "Studio in East Austin",
    roomTitle: "Minimal studio in East Austin",
    subtitle: "Entire guest suite in Austin, Texas",
    city: "Austin",
    region: "Texas",
    country: "United States",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    priceLabel: "$198",
    rating: 4.95,
    reviewCount: 9,
    badge: "guestFavorite",
    bedsLabel: "1 king bed",
    hostName: "Ari",
    guests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1
  },
  {
    id: "houston-montrose-guesthouse",
    cardTitle: "Guesthouse in Montrose",
    roomTitle: "Private guesthouse in Montrose",
    subtitle: "Entire guesthouse in Houston, Texas",
    city: "Houston",
    region: "Texas",
    country: "United States",
    image:
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80",
    priceLabel: "$172",
    rating: 4.9,
    reviewCount: 8,
    bedsLabel: "2 beds",
    hostName: "Elena",
    guests: 3,
    bedrooms: 1,
    beds: 2,
    baths: 1
  },
  {
    id: "fort-worth-stockyards-cottage",
    cardTitle: "Cottage near the Stockyards",
    roomTitle: "Cottage near the Stockyards",
    subtitle: "Entire cottage in Fort Worth, Texas",
    city: "Fort Worth",
    region: "Texas",
    country: "United States",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    priceLabel: "$205",
    rating: 4.88,
    reviewCount: 6,
    badge: "superhost",
    bedsLabel: "3 beds",
    hostName: "Devon",
    guests: 4,
    bedrooms: 2,
    beds: 3,
    baths: 1
  },
  {
    id: "san-antonio-riverwalk-suite",
    cardTitle: "Suite by the River Walk",
    roomTitle: "Suite by the River Walk",
    subtitle: "Entire rental unit in San Antonio, Texas",
    city: "San Antonio",
    region: "Texas",
    country: "United States",
    image:
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=1200&q=80",
    priceLabel: "$221",
    rating: 4.96,
    reviewCount: 9,
    bedsLabel: "2 beds",
    hostName: "Nico",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 2
  },
  {
    id: "waco-silo-house",
    cardTitle: "Silo district guest suite",
    roomTitle: "Guest suite near the silos",
    subtitle: "Entire guest suite in Waco, Texas",
    city: "Waco",
    region: "Texas",
    country: "United States",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    priceLabel: "$149",
    rating: 4.85,
    reviewCount: 6,
    badge: "new",
    bedsLabel: "1 bed",
    hostName: "Riley",
    guests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1
  },
  {
    id: "galveston-beach-condo",
    cardTitle: "Condo near the beach",
    roomTitle: "Condo near the Galveston beach",
    subtitle: "Entire condo in Galveston, Texas",
    city: "Galveston",
    region: "Texas",
    country: "United States",
    image:
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80",
    priceLabel: "$238",
    rating: 4.92,
    reviewCount: 8,
    badge: "guestFavorite",
    bedsLabel: "2 beds",
    hostName: "Camila",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 2
  },
  {
    id: "marfa-desert-casita",
    cardTitle: "Desert casita in Marfa",
    roomTitle: "Desert casita with big skies",
    subtitle: "Entire home in Marfa, Texas",
    city: "Marfa",
    region: "Texas",
    country: "United States",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    priceLabel: "$190",
    rating: 4.89,
    reviewCount: 6,
    bedsLabel: "2 beds",
    hostName: "June",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 1
  },
  {
    id: "broken-bow-cabin",
    cardTitle: "Cabin near Broken Bow",
    roomTitle: "Cabin tucked near Broken Bow",
    subtitle: "Entire cabin in Broken Bow, Oklahoma",
    city: "Broken Bow",
    region: "Oklahoma",
    country: "United States",
    image:
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1200&q=80",
    priceLabel: "$258",
    rating: 4.97,
    reviewCount: 10,
    badge: "superhost",
    bedsLabel: "4 beds",
    hostName: "Morgan",
    guests: 6,
    bedrooms: 3,
    beds: 4,
    baths: 2
  }
];

export function toListing(listing: CanonicalListing): Listing {
  return {
    id: listing.id,
    title: listing.cardTitle,
    location: `${listing.city}, ${listing.region}`,
    image: listing.image,
    priceLabel: listing.priceLabel,
    nightsLabel: "for 2 nights",
    rating: listing.rating,
    reviewCount: listing.reviewCount,
    badge: listing.badge,
    bedsLabel: listing.bedsLabel,
    cancellationLabel: "Free cancellation"
  };
}

export const destinationSuggestions = Array.from(
  new Map(
    canonicalListings.map((listing) => {
      const label = `${listing.city}, ${listing.region}`;

      return [
        label,
        {
          id: `${listing.city}-${listing.region}`.toLowerCase().replaceAll(" ", "-"),
          label,
          sublabel: listing.country,
          value: label
        }
      ];
    })
  ).values()
);

export function getCanonicalListing(id: string): CanonicalListing {
  const listing = canonicalListings.find((candidate) => candidate.id === id);

  if (!listing) {
    throw new Error(`Unknown canonical listing id: ${id}`);
  }

  return listing;
}
