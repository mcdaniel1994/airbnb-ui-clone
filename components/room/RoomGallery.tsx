"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/shared/Icon";

type RoomGalleryProps = {
  images: string[];
  title: string;
};

function GalleryButton({
  label,
  icon,
  pressed,
  onClick
}: {
  label: string;
  icon: "heart" | "share";
  pressed?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={label}
      aria-pressed={pressed}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-surface)] text-[color:var(--color-text-primary)] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
      type="button"
      onClick={onClick}
    >
      <Icon
        className={`h-5 w-5 ${
          pressed ? "fill-[var(--color-favorite-active)] text-[color:var(--color-favorite-active)]" : ""
        }`}
        name={icon}
      />
    </button>
  );
}

export default function RoomGallery({ images, title }: RoomGalleryProps) {
  const [saved, setSaved] = useState(false);
  const [shareVisible, setShareVisible] = useState(false);
  const [allPhotosOpen, setAllPhotosOpen] = useState(false);
  const desktopImages = images.slice(0, 5);

  useEffect(() => {
    if (!allPhotosOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setAllPhotosOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [allPhotosOpen]);

  return (
    <div className="relative">
      <div
        aria-label="Photo gallery"
        className="-mx-4 flex h-80 snap-x snap-mandatory overflow-x-auto scrollbar-none md:hidden"
        role="region"
      >
        {images.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className="relative h-full min-w-full snap-start"
          >
            <Image
              alt={`${title} - photo ${index + 1}`}
              className="object-cover"
              fill
              priority={index === 0}
              sizes="(min-width: 768px) 768px, 100vw"
              src={image}
            />
          </div>
        ))}
      </div>
      <div
        aria-label="Photo gallery"
        className="hidden h-[34rem] overflow-hidden rounded-xl md:grid md:grid-cols-4 md:grid-rows-2 md:gap-2 xl:h-[38rem]"
        role="region"
      >
        {desktopImages.map((image, index) => (
          <div
            key={`${image}-desktop-${index}`}
            className={`relative overflow-hidden bg-[var(--color-bg-muted)] ${
              index === 0 ? "col-span-2 row-span-2" : ""
            }`}
          >
            <Image
              alt={`${title} - photo ${index + 1}`}
              className="object-cover transition-transform duration-200 ease-out motion-reduce:transform-none md:hover:scale-[1.02]"
              fill
              priority={index === 0}
              sizes={
                index === 0
                  ? "(min-width: 1536px) 50vw, 50vw"
                  : "(min-width: 1536px) 25vw, 25vw"
              }
              src={image}
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 top-4 z-10 flex items-center justify-between px-4">
        <Link
          aria-label="Back to home"
          className="flex h-10 items-center gap-2 rounded-full bg-[var(--color-surface)] px-4 text-sm font-semibold text-[color:var(--color-text-primary)] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
          href="/"
        >
          <Icon className="h-5 w-5" name="arrow-left" />
          <span>Home</span>
        </Link>
        <div className="flex gap-2">
          <GalleryButton
            icon="share"
            label="Share this listing"
            pressed={shareVisible}
            onClick={() => setShareVisible((current) => !current)}
          />
          <GalleryButton
            icon="heart"
            label={
              saved ? "Remove this listing from wishlist" : "Save this listing"
            }
            pressed={saved}
            onClick={() => setSaved((current) => !current)}
          />
        </div>
      </div>
      <button
        className="absolute bottom-4 right-4 z-10 rounded-full bg-black/75 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors duration-150 ease-out hover:bg-black/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        type="button"
        onClick={() => setAllPhotosOpen(true)}
      >
        All photos · {images.length}
      </button>
      {shareVisible ? (
        <div className="absolute right-4 top-16 z-10 max-w-56 rounded-lg bg-[var(--color-surface)] p-3 text-sm text-[color:var(--color-text-primary)] shadow-md">
          Share link ready for this listing.
        </div>
      ) : null}
      {allPhotosOpen ? (
        <div
          aria-label={`${title} photos`}
          aria-modal="true"
          className="fixed inset-0 z-[100] overflow-y-auto bg-[var(--color-bg)]"
          role="dialog"
        >
          <div className="sticky top-0 z-10 border-b border-[color:var(--color-border)] bg-[var(--color-bg)] px-4 py-3">
            <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
              <button
                className="flex h-10 items-center gap-2 rounded-full px-3 text-sm font-semibold text-[color:var(--color-text-primary)] hover:bg-[var(--color-bg-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                type="button"
                onClick={() => setAllPhotosOpen(false)}
              >
                <Icon className="h-5 w-5" name="arrow-left" />
                Photos
              </button>
              <button
                aria-label="Close all photos"
                className="flex h-10 w-10 items-center justify-center rounded-full text-[color:var(--color-text-primary)] hover:bg-[var(--color-bg-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                type="button"
                onClick={() => setAllPhotosOpen(false)}
              >
                <Icon className="h-5 w-5" name="x" />
              </button>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-3 px-4 py-4 md:grid-cols-2 md:gap-4">
            {images.map((image, index) => (
              <div
                key={`${image}-all-${index}`}
                className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--color-bg-muted)]"
              >
                <Image
                  alt={`${title} - photo ${index + 1}`}
                  className="object-cover"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  src={image}
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
