import Link from "next/link";

export default function RoomNotFound() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 text-center">
      <h1 className="text-[22px] font-semibold leading-7">Listing not found</h1>
      <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
        This home is no longer available or the link is incorrect.
      </p>
      <Link
        className="mt-5 rounded-lg bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
        href="/"
      >
        Back to Explore
      </Link>
    </div>
  );
}
