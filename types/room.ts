import type { Amenity } from "./amenity";
import type { Highlight } from "./highlight";
import type { Host } from "./host";
import type { Review, ReviewMention } from "./review";
import type { ThingsToKnowSection } from "./thingsToKnow";

export type RoomCalendarData = {
  month: string;
  year: number;
  initialCheckIn?: string;
  initialCheckOut?: string;
};

export type RelatedLocation = {
  id: string;
  name: string;
  descriptor: string;
  href: string;
};

export type OtherStayType = {
  id: string;
  label: string;
  href: string;
};

export type Room = {
  id: string;
  title: string;
  subtitle: string;
  city: string;
  country: string;
  images: string[];
  guests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  rating: number;
  reviewCount: number;
  isGuestFavorite: boolean;
  pricePerNight: string;
  nightsLabel: string;
  dateRange: string;
  description: string;
  highlights: Highlight[];
  amenities: Amenity[];
  amenitiesTotalCount: number;
  mapQuery: string;
  locationNote: string;
  calendar: RoomCalendarData;
  reviewsCaption: string;
  reviewMentions: ReviewMention[];
  reviews: Review[];
  totalReviews: number;
  host: Host;
  thingsToKnow: ThingsToKnowSection[];
  relatedLocations: RelatedLocation[];
  otherStayTypes: OtherStayType[];
};
