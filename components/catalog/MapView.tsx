type MapViewProps = {
  query: string;
  title: string;
  zoom?: number;
  className?: string;
};

export default function MapView({
  query,
  title,
  zoom = 12,
  className = ""
}: MapViewProps) {
  const params = new URLSearchParams({
    q: query,
    output: "embed",
    z: String(zoom)
  });
  const embedUrl = `https://www.google.com/maps?${params.toString()}`;
  const largerMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    query
  )}`;

  return (
    <div className={className}>
      <div className="h-64 w-full overflow-hidden rounded-xl bg-[var(--color-bg-muted)]">
        <iframe
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={embedUrl}
          title={title}
        />
      </div>
      <a
        className="mt-2 inline-block rounded-md text-sm font-semibold underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
        href={largerMapUrl}
        rel="noreferrer"
        target="_blank"
      >
        View larger map
      </a>
    </div>
  );
}
