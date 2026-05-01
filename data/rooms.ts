import type {
  Amenity,
  Highlight,
  Host,
  Review,
  ReviewMention,
  Room,
  ThingsToKnowSection
} from "@/types";
import { canonicalListings } from "./listings";

const commonRoomPhotos = [
  "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
];

const highlights: Highlight[] = [
  {
    id: "self-check-in",
    icon: "key",
    label: "Self check-in",
    sublabel: "Check yourself in with the keypad."
  },
  {
    id: "peace-and-quiet",
    icon: "shield",
    label: "Peace and quiet",
    sublabel: "Guests say this home is in a calm area."
  },
  {
    id: "city-view",
    icon: "eye",
    label: "City view",
    sublabel: "Take in the skyline from the living room."
  }
];

const amenities: Amenity[] = [
  { id: "wifi", icon: "wifi", label: "Fast wifi" },
  { id: "kitchen", icon: "utensils", label: "Kitchen" },
  { id: "parking", icon: "car", label: "Free parking on premises" },
  { id: "washer", icon: "washer", label: "Washer" },
  { id: "air-conditioning", icon: "snowflake", label: "Air conditioning" },
  { id: "tv", icon: "tv", label: "TV" },
  { id: "coffee", icon: "coffee", label: "Coffee maker" },
  { id: "fitness", icon: "dumbbell", label: "Fitness-friendly workspace" }
];

const reviewMentions: ReviewMention[] = [
  { id: "accuracy", icon: "check", label: "Accuracy", score: "5.0" },
  { id: "location", icon: "map-pin", label: "Location", score: "4.9" },
  { id: "check-in", icon: "key", label: "Check-in", score: "5.0" },
  { id: "communication", icon: "message", label: "Communication", score: "5.0" },
  { id: "value", icon: "dollar", label: "Value", score: "4.8" }
];

type ReviewTemplate = Omit<Review, "id" | "text"> & {
  id: string;
  text: (city: string) => string;
};

const reviewTemplates: ReviewTemplate[] = [
  {
    id: "natalie",
    name: "Natalie",
    tenure: "6 years on Airbnb",
    date: "March 2026",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    text: (city) =>
      `The place was spotless, peaceful, and close to the ${city} neighborhoods we wanted to explore. Check-in was simple and the host replied quickly.`
  },
  {
    id: "omar",
    name: "Omar",
    tenure: "3 years on Airbnb",
    date: "February 2026",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    text: () =>
      "Great stay for a quick city weekend. The bed was comfortable, the kitchen had everything we needed, and it was easy to walk to dinner."
  },
  {
    id: "leslie",
    name: "Leslie",
    tenure: "8 years on Airbnb",
    date: "January 2026",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    text: () =>
      "Loved the natural light and thoughtful touches. It felt like a real home base rather than a generic rental."
  },
  {
    id: "mina",
    name: "Mina",
    tenure: "5 years on Airbnb",
    date: "December 2025",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    text: () =>
      "The space was quiet at night and had plenty of room to unpack. We especially appreciated the fast wifi and easy parking."
  },
  {
    id: "eli",
    name: "Eli",
    tenure: "2 years on Airbnb",
    date: "November 2025",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    text: () =>
      "Everything matched the listing. The host sent clear instructions, and the place had a comfortable living area for winding down."
  },
  {
    id: "renee",
    name: "Renee",
    tenure: "10 years on Airbnb",
    date: "October 2025",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
    text: () =>
      "We had a smooth stay from start to finish. The home was clean, well located, and stocked with the basics for a long weekend."
  },
  {
    id: "marcus",
    name: "Marcus",
    tenure: "4 years on Airbnb",
    date: "September 2025",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=200&q=80",
    text: () =>
      "Comfortable beds, simple check-in, and a great coffee setup. I would book again for another work trip."
  },
  {
    id: "talia",
    name: "Talia",
    tenure: "7 years on Airbnb",
    date: "August 2025",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    text: () =>
      "The neighborhood was easy to navigate and the home felt calm after busy days out. The photos were accurate."
  },
  {
    id: "chris",
    name: "Chris",
    tenure: "1 year on Airbnb",
    date: "July 2025",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    text: () =>
      "Good value, responsive host, and a comfortable setup for our group. The washer and kitchen made the trip easier."
  },
  {
    id: "ava",
    name: "Ava",
    tenure: "9 years on Airbnb",
    date: "June 2025",
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80",
    text: () =>
      "A lovely stay with plenty of small details handled well. We slept well and had everything we needed."
  }
];

const makeReviews = (roomId: string, city: string, count: number): Review[] =>
  reviewTemplates.slice(0, count).map((review) => ({
    ...review,
    id: `${roomId}-${review.id}`,
    text: review.text(city)
  }));

const thingsToKnow: ThingsToKnowSection[] = [
  {
    id: "cancellation",
    title: "Cancellation policy",
    items: [
      {
        id: "free-cancel",
        icon: "calendar",
        label: "Free cancellation before May 1."
      },
      {
        id: "partial-refund",
        icon: "clock",
        label: "Review the host's full policy before booking."
      }
    ]
  },
  {
    id: "house-rules",
    title: "House rules",
    items: [
      { id: "check-in", icon: "door", label: "Check-in after 3:00 PM" },
      { id: "guests", icon: "users", label: "4 guests maximum" },
      { id: "no-parties", icon: "party", label: "No parties or events" }
    ]
  },
  {
    id: "safety",
    title: "Safety & property",
    items: [
      { id: "smoke-alarm", icon: "flame", label: "Smoke alarm installed" },
      { id: "lock", icon: "lock", label: "Exterior security camera" },
      {
        id: "quiet-hours",
        icon: "alert",
        label: "Quiet hours after 10:00 PM"
      }
    ]
  }
];

const relatedLocations = [
  {
    id: "brazos-river",
    name: "Brazos River",
    descriptor: "Vacation rentals",
    href: "/catalog?where=Brazos%20River"
  },
  {
    id: "lake-whitney",
    name: "Lake Whitney",
    descriptor: "Cabin rentals",
    href: "/catalog?where=Lake%20Whitney"
  },
  {
    id: "fort-worth",
    name: "Fort Worth",
    descriptor: "Apartment rentals",
    href: "/catalog?where=Fort%20Worth"
  },
  {
    id: "arlington",
    name: "Arlington",
    descriptor: "House rentals",
    href: "/catalog?where=Arlington"
  }
];

const otherStayTypes = [
  {
    id: "dallas-vacation",
    label: "Dallas vacation rentals",
    href: "/catalog?where=Dallas"
  },
  {
    id: "fitness-friendly",
    label: "Fitness-friendly vacation rentals",
    href: "/catalog?description=Fitness-friendly"
  },
  {
    id: "family-friendly",
    label: "Family-friendly rentals",
    href: "/catalog?description=Family-friendly"
  },
  {
    id: "monthly-stays",
    label: "Monthly stays",
    href: "/catalog?description=Monthly"
  }
];

const makeHost = (name: string, reviewCount: number, rating: number): Host => ({
  name,
  avatar:
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
  isSuperhost: true,
  reviewCount,
  rating,
  yearsHosting: 7,
  bio:
    "I love sharing local coffee shops, walkable dinner spots, and quiet corners of the city with guests.",
  responseRate: "100%",
  responseTime: "within an hour"
});

const makeImages = (heroImage: string): string[] => [heroImage, ...commonRoomPhotos];

export const rooms: Room[] = canonicalListings.map((listing) => {
  const reviews = makeReviews(listing.id, listing.city, listing.reviewCount);
  const isGuestFavorite = listing.badge === "guestFavorite";

  return {
    id: listing.id,
    title: listing.roomTitle,
    subtitle: listing.subtitle,
    city: listing.city,
    country: listing.country,
    images: makeImages(listing.image),
    guests: listing.guests,
    bedrooms: listing.bedrooms,
    beds: listing.beds,
    baths: listing.baths,
    rating: listing.rating,
    reviewCount: reviews.length,
    isGuestFavorite,
    pricePerNight: listing.priceLabel,
    nightsLabel: "1 night",
    dateRange: "May 5 - 6",
    description:
      "Settle into a bright, comfortable home designed for a relaxed city stay. The living area has soft seating, fast wifi, and room to unpack, while the kitchen is ready for easy breakfasts or takeout nights. Restaurants, coffee, and neighborhood favorites are close by without making the space feel busy.",
    highlights,
    amenities,
    amenitiesTotalCount: amenities.length,
    mapQuery: `${listing.city}, ${listing.region}`,
    locationNote: "Exact location will be provided after booking.",
    calendar: {
      month: "May",
      year: 2026,
      initialCheckIn: "2026-05-05",
      initialCheckOut: "2026-05-06"
    },
    reviewsCaption: isGuestFavorite
      ? "One of the most loved homes on Airbnb, according to guests."
      : "Guests consistently rate this stay highly for comfort, location, and host communication.",
    reviewMentions,
    reviews,
    totalReviews: reviews.length,
    host: makeHost(listing.hostName, reviews.length, listing.rating),
    thingsToKnow,
    relatedLocations,
    otherStayTypes
  };
});
