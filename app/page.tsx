import BottomNav from "@/components/shared/BottomNav";
import BrandLogo from "@/components/shared/BrandLogo";
import Footer from "@/components/shared/Footer";
import CategoryTabs from "@/components/home/CategoryTabs";
import InspirationSection from "@/components/home/InspirationSection";
import SearchBar from "@/components/shared/SearchBar";
import ListingSection from "@/components/listing/ListingSection";
import { bottomNavItems } from "@/data/bottomNav";
import { categoryTabs } from "@/data/categoryTabs";
import { footerLegalLinks } from "@/data/footerLegalLinks";
import { footerLinks } from "@/data/footerLinks";
import { footerSocialLinks } from "@/data/footerSocialLinks";
import { homeSections } from "@/data/homeSections";
import {
  inspirationItemsByTab,
  inspirationTabs
} from "@/data/inspirationTabs";
import {
  queryStringFromParams,
  searchValuesFromParams,
  type RawSearchParams
} from "@/utils/searchParams";

type HomePageProps = {
  searchParams?: Promise<RawSearchParams>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const initialSearchValues = searchValuesFromParams(resolvedSearchParams);
  const queryString = queryStringFromParams(resolvedSearchParams);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-bg)]">
      <header className="sticky top-0 z-[80] border-b border-[color:var(--color-border)] bg-[var(--color-bg)] px-4 py-3 md:px-6 lg:px-10 2xl:px-12">
        <div className="mx-auto w-full max-w-[112rem]">
          <h1 className="sr-only">Discover homes</h1>
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
          <CategoryTabs activeId="homes" items={categoryTabs} />
        </div>
      </header>
      <main className="flex-1 pb-20 md:pb-0">
        <div className="mx-auto w-full max-w-[112rem] px-4 py-6 md:px-6 lg:px-10 2xl:px-12">
          {homeSections.map((section) => (
            <ListingSection
              key={section.id}
              actionHref={section.actionHref}
              listings={section.listings}
              queryString={queryString}
              title={section.title}
            />
          ))}
          <InspirationSection
            itemsByTab={inspirationItemsByTab}
            tabs={inspirationTabs}
          />
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
