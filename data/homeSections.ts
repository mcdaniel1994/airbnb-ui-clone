import type { HomeSection } from "@/types";
import { getCanonicalListing, toListing } from "./listings";

const sectionListing = (id: string) => toListing(getCanonicalListing(id));

export const homeSections: HomeSection[] = [
  {
    id: "dallas",
    title: "Popular homes in Dallas",
    actionHref: "/catalog",
    listings: [
      sectionListing("dallas-cedars-loft"),
      sectionListing("dallas-bishop-arts-bungalow"),
      sectionListing("dallas-deep-ellum-flat"),
      sectionListing("dallas-oak-lawn-townhome")
    ]
  },
  {
    id: "texas-weekends",
    title: "Weekend stays across Texas",
    actionHref: "/catalog",
    listings: [
      sectionListing("austin-eastside-studio"),
      sectionListing("houston-montrose-guesthouse"),
      sectionListing("san-antonio-riverwalk-suite"),
      sectionListing("fort-worth-stockyards-cottage")
    ]
  },
  {
    id: "nearby-escapes",
    title: "Nearby escapes",
    actionHref: "/catalog",
    listings: [
      sectionListing("waco-silo-house"),
      sectionListing("galveston-beach-condo"),
      sectionListing("marfa-desert-casita"),
      sectionListing("broken-bow-cabin")
    ]
  }
];
