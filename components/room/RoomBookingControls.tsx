"use client";

import { useState, type ReactNode } from "react";
import type { RoomCalendarData } from "@/types";
import RoomCalendar from "./RoomCalendar";
import RoomPriceReserve from "./RoomPriceReserve";

type DateRange = {
  checkIn?: string;
  checkOut?: string;
  nights: number;
};

type RoomBookingControlsProps = {
  calendar: RoomCalendarData;
  city: string;
  guests: number;
  pricePerNight: string;
  roomTitle: string;
  children?: ReactNode;
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function dayDifference(checkIn?: string, checkOut?: string) {
  if (!checkIn || !checkOut) {
    return 0;
  }

  const start = new Date(`${checkIn}T00:00:00`);
  const end = new Date(`${checkOut}T00:00:00`);
  return Math.max(0, Math.round((end.getTime() - start.getTime()) / 86400000));
}

function formatDate(value: string) {
  const [, month, day] = value.split("-").map(Number);
  const monthName = month ? monthNames[month - 1] : undefined;

  return monthName && day ? `${monthName} ${day}` : value;
}

function formatDateRange(checkIn?: string, checkOut?: string) {
  if (checkIn && checkOut) {
    const checkInLabel = formatDate(checkIn);
    const [, checkInMonth] = checkIn.split("-").map(Number);
    const [, checkOutMonth, checkOutDay] = checkOut.split("-").map(Number);

    if (checkInMonth === checkOutMonth && checkOutDay) {
      return `${checkInLabel} - ${checkOutDay}`;
    }

    return `${checkInLabel} - ${formatDate(checkOut)}`;
  }

  if (checkIn) {
    return `${formatDate(checkIn)} - Select checkout`;
  }

  return "Add dates";
}

export default function RoomBookingControls({
  calendar,
  children,
  city,
  guests,
  pricePerNight,
  roomTitle
}: RoomBookingControlsProps) {
  const [range, setRange] = useState<DateRange>({
    checkIn: calendar.initialCheckIn,
    checkOut: calendar.initialCheckOut,
    nights: dayDifference(calendar.initialCheckIn, calendar.initialCheckOut)
  });
  const nightsLabel =
    range.nights > 0
      ? `${range.nights} night${range.nights === 1 ? "" : "s"}`
      : "Select dates";

  return (
    <div className="md:grid md:grid-cols-[minmax(0,1fr)_320px] md:items-start md:gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12 2xl:grid-cols-[minmax(0,1fr)_400px] 2xl:gap-16">
      <div className="min-w-0">
        <RoomCalendar
          city={city}
          initialCheckIn={calendar.initialCheckIn}
          initialCheckOut={calendar.initialCheckOut}
          month={calendar.month}
          year={calendar.year}
          onDateRangeChange={setRange}
        />
        {children}
      </div>
      <aside className="hidden self-start md:sticky md:top-28 md:block">
        <RoomPriceReserve
          dateRange={formatDateRange(range.checkIn, range.checkOut)}
          guests={guests}
          nightsLabel={nightsLabel}
          pricePerNight={pricePerNight}
          roomTitle={roomTitle}
        />
      </aside>
      <RoomPriceReserve
        dateRange={formatDateRange(range.checkIn, range.checkOut)}
        guests={guests}
        nightsLabel={nightsLabel}
        pricePerNight={pricePerNight}
        roomTitle={roomTitle}
        variant="mobileBar"
      />
    </div>
  );
}
