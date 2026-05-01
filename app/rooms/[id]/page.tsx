import { notFound } from "next/navigation";
import AmenitiesList from "@/components/room/AmenitiesList";
import HostCard from "@/components/room/HostCard";
import OtherStayTypes from "@/components/room/OtherStayTypes";
import RelatedLocations from "@/components/room/RelatedLocations";
import ReviewList from "@/components/room/ReviewList";
import ReviewMentionsList from "@/components/room/ReviewMentionsList";
import RoomBookingControls from "@/components/room/RoomBookingControls";
import RoomDescription from "@/components/room/RoomDescription";
import RoomGallery from "@/components/room/RoomGallery";
import RoomHeader from "@/components/room/RoomHeader";
import RoomHighlights from "@/components/room/RoomHighlights";
import RoomLocation from "@/components/room/RoomLocation";
import RoomRatingBar from "@/components/room/RoomRatingBar";
import RoomReviewsSummary from "@/components/room/RoomReviewsSummary";
import ThingsToKnow from "@/components/room/ThingsToKnow";
import BottomNav from "@/components/shared/BottomNav";
import BrandLogo from "@/components/shared/BrandLogo";
import Footer from "@/components/shared/Footer";
import SearchBar from "@/components/shared/SearchBar";
import { bottomNavItems } from "@/data/bottomNav";
import { footerLegalLinks } from "@/data/footerLegalLinks";
import { footerLinks } from "@/data/footerLinks";
import { footerSocialLinks } from "@/data/footerSocialLinks";
import { rooms } from "@/data/rooms";
import {
  queryStringFromParams,
  searchValuesFromParams,
  type RawSearchParams
} from "@/utils/searchParams";

type RoomPageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<RawSearchParams>;
};

export function generateStaticParams() {
  return rooms.map((room) => ({ id: room.id }));
}

export default async function RoomPage({ params, searchParams }: RoomPageProps) {
  const { id } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const initialSearchValues = searchValuesFromParams(resolvedSearchParams);
  const queryString = queryStringFromParams(resolvedSearchParams);
  const room = rooms.find((candidate) => candidate.id === id);

  if (!room) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-bg)]">
      <header className="sticky top-0 z-[80] border-b border-[color:var(--color-border)] bg-[var(--color-bg)] px-4 py-3 md:px-6 lg:px-10 2xl:px-12">
        <div className="mx-auto w-full max-w-[112rem] md:grid md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center md:gap-6">
          <BrandLogo className="hidden md:inline-flex" />
          <div className="mx-auto w-full max-w-4xl md:col-start-2">
            <SearchBar
              key={queryString || "empty-search"}
              initialValues={initialSearchValues}
            />
          </div>
          <div aria-hidden="true" className="hidden w-40 md:block" />
        </div>
      </header>
      <main className="flex-1 pb-44 md:pb-0">
        <div className="mx-auto w-full max-w-[112rem] px-4 md:px-6 lg:px-10 2xl:px-12">
          <RoomGallery images={room.images} title={room.title} />
          <RoomHeader room={room} />
          <RoomRatingBar
            isGuestFavorite={room.isGuestFavorite}
            rating={room.rating}
            reviewCount={room.reviewCount}
          />
          <RoomBookingControls
            calendar={room.calendar}
            city={room.city}
            guests={room.guests}
            pricePerNight={room.pricePerNight}
            roomTitle={room.title}
          >
            <RoomHighlights items={room.highlights} />
            <RoomDescription text={room.description} />
            <AmenitiesList
              amenities={room.amenities}
              totalCount={room.amenitiesTotalCount}
            />
            <RoomLocation
              city={room.city}
              country={room.country}
              mapQuery={room.mapQuery}
              note={room.locationNote}
            />
            <RoomReviewsSummary
              caption={room.reviewsCaption}
              isGuestFavorite={room.isGuestFavorite}
              rating={room.rating}
            />
            <ReviewMentionsList mentions={room.reviewMentions} />
            <ReviewList
              caption={room.reviewsCaption}
              isGuestFavorite={room.isGuestFavorite}
              mentions={room.reviewMentions}
              rating={room.rating}
              reviews={room.reviews}
              totalCount={room.totalReviews}
            />
            <HostCard host={room.host} />
            <ThingsToKnow sections={room.thingsToKnow} />
            <RelatedLocations items={room.relatedLocations} />
            <OtherStayTypes items={room.otherStayTypes} />
          </RoomBookingControls>
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
