import type { Room } from "@/types";

type RoomHeaderProps = {
  room: Room;
};

export default function RoomHeader({ room }: RoomHeaderProps) {
  return (
    <section className="pt-6">
      <h1 className="text-[22px] font-semibold leading-7 text-[color:var(--color-text-primary)]">
        {room.title}
      </h1>
      <p className="mt-1 text-sm text-[color:var(--color-text-secondary)]">
        {room.subtitle}
      </p>
      <p className="mt-2 text-sm text-[color:var(--color-text-primary)]">
        {room.guests} guests · {room.bedrooms} bedrooms · {room.beds} beds ·{" "}
        {room.baths} bath
      </p>
    </section>
  );
}
