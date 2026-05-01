import type { BadgeKind } from "./badge";

export type Listing = {
  id: string;
  title: string;
  location: string;
  image: string;
  priceLabel: string;
  nightsLabel: string;
  rating: number;
  reviewCount: number;
  badge?: BadgeKind;
  bedsLabel?: string;
  cancellationLabel?: string;
  isFavorite?: boolean;
};

export type HomeSection = {
  id: string;
  title: string;
  actionHref?: string;
  listings: Listing[];
};
