import MapView from "@/components/catalog/MapView";

type RoomLocationProps = {
  city: string;
  country: string;
  mapQuery: string;
  note: string;
};

export default function RoomLocation({
  city,
  country,
  mapQuery,
  note
}: RoomLocationProps) {
  return (
    <section className="mt-6 border-t border-[color:var(--color-border)] pt-6">
      <h2 className="text-lg font-semibold text-[color:var(--color-text-primary)]">
        Where you&apos;ll be
      </h2>
      <p className="mt-1 text-sm text-[color:var(--color-text-primary)]">
        {city}, {country}
      </p>
      <div className="mt-4">
        <MapView query={mapQuery} title={`Map near ${city}`} />
      </div>
      <p className="mt-3 text-sm text-[color:var(--color-text-secondary)]">{note}</p>
    </section>
  );
}
