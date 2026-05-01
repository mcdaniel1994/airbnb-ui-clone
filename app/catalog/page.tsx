import CatalogHeader from "@/components/catalog/CatalogHeader";
import MapView from "@/components/catalog/MapView";
import PriceDisclaimer from "@/components/catalog/PriceDisclaimer";
import ListingList from "@/components/listing/ListingList";
import BottomNav from "@/components/shared/BottomNav";
import BrandLogo from "@/components/shared/BrandLogo";
import Footer from "@/components/shared/Footer";
import SearchBar from "@/components/shared/SearchBar";
import { bottomNavItems } from "@/data/bottomNav";
import { catalogListings } from "@/data/catalogListings";
import { footerLegalLinks } from "@/data/footerLegalLinks";
import { footerLinks } from "@/data/footerLinks";
import { footerSocialLinks } from "@/data/footerSocialLinks";
import {
  catalogSummaryFromSearch,
  queryStringFromParams,
  searchValuesFromParams,
  type RawSearchParams
} from "@/utils/searchParams";

type CatalogPageProps = {
  searchParams?: Promise<RawSearchParams>;
};

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const initialSearchValues = searchValuesFromParams(resolvedSearchParams);
  const queryString = queryStringFromParams(resolvedSearchParams);
  const mapQuery = initialSearchValues.where || "Dallas, Texas";
  const title = initialSearchValues.where
    ? `Homes in ${initialSearchValues.where}`
    : "Homes in map area";
  const resultSummary = catalogSummaryFromSearch(initialSearchValues);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-bg)]">
      <header className="sticky top-0 z-[80] border-b border-[color:var(--color-border)] bg-[var(--color-bg)] px-4 py-3 md:px-6 lg:px-10 2xl:px-12">
        <div className="mx-auto w-full max-w-[112rem]">
          <div className="md:grid md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center md:gap-6">
            <BrandLogo className="hidden md:inline-flex" />
            <div className="mx-auto w-full max-w-4xl md:col-start-2">
              <SearchBar
                key={queryString || "empty-search"}
                initialValues={initialSearchValues}
              />
            </div>
            <div aria-hidden="true" className="hidden w-40 md:block" />
          </div>
          <CatalogHeader resultSummary={resultSummary} title={title} />
        </div>
      </header>
      <main className="flex-1 pb-20 md:pb-0">
        <div className="mx-auto w-full max-w-[112rem] space-y-6 px-4 py-5 md:px-6 lg:px-10 2xl:px-12">
          <MapView query={mapQuery} title={`Map of ${mapQuery}`} />
          <PriceDisclaimer />
          <ListingList listings={catalogListings} queryString={queryString} />
        </div>
      </main>
      <Footer
        legalLinks={footerLegalLinks}
        linkGroups={footerLinks}
        socialLinks={footerSocialLinks}
      />
      <BottomNav items={bottomNavItems} />
    </div>
  );
}
