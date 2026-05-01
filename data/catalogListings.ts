import type { Listing } from "@/types";
import { canonicalListings, toListing } from "./listings";

export const catalogListings: Listing[] = canonicalListings.map(toListing);
