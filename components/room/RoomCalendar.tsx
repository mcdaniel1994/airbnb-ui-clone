"use client";

import { useEffect, useMemo, useState } from "react";
import Icon from "@/components/shared/Icon";

type DateRange = {
  checkIn?: string;
  checkOut?: string;
  nights: number;
};

type RoomCalendarProps = {
  city: string;
  month: string;
  year: number;
  initialCheckIn?: string;
  initialCheckOut?: string;
  onDateRangeChange?: (range: DateRange) => void;
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

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type VisibleMonth = {
  monthIndex: number;
  year: number;
};

function isoDate(year: number, monthIndex: number, day: number) {
  return `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(
    day
  ).padStart(2, "0")}`;
}

function parseDateValue(
  value: string | undefined,
  fallbackYear: number,
  fallbackMonthIndex: number
) {
  if (!value) {
    return undefined;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  const monthDay = value.match(/^([a-z]+)\s+(\d{1,2})$/i);
  if (monthDay) {
    const monthLabel = monthDay[1];
    const dayLabel = monthDay[2];

    if (!monthLabel || !dayLabel) {
      return undefined;
    }

    const parsedMonthIndex = monthNames.findIndex(
      (monthName) => monthName.toLowerCase() === monthLabel.toLowerCase()
    );
    return isoDate(
      fallbackYear,
      parsedMonthIndex >= 0 ? parsedMonthIndex : fallbackMonthIndex,
      Number(dayLabel)
    );
  }

  return undefined;
}

function buildWeeks(monthIndex: number, year: number) {
  const firstDay = new Date(year, monthIndex, 1).getDay();
  const totalDays = new Date(year, monthIndex + 1, 0).getDate();
  const cells: (number | null)[] = [];

  for (let index = 0; index < firstDay; index += 1) {
    cells.push(null);
  }

  for (let day = 1; day <= totalDays; day += 1) {
    cells.push(day);
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  const weeks: (number | null)[][] = [];
  for (let index = 0; index < cells.length; index += 7) {
    weeks.push(cells.slice(index, index + 7));
  }

  return weeks;
}

function dateParts(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) {
    return undefined;
  }

  return { day, monthIndex: month - 1, year };
}

function dayDifference(checkIn?: string, checkOut?: string) {
  if (!checkIn || !checkOut) {
    return 0;
  }

  const start = new Date(`${checkIn}T00:00:00`);
  const end = new Date(`${checkOut}T00:00:00`);
  return Math.max(0, Math.round((end.getTime() - start.getTime()) / 86400000));
}

function formatDate(value: string) {
  const parts = dateParts(value);

  if (!parts) {
    return value;
  }

  return `${monthNames[parts.monthIndex]} ${parts.day}`;
}

function formatRange(checkIn?: string, checkOut?: string) {
  if (checkIn && checkOut) {
    const checkInParts = dateParts(checkIn);
    const checkOutParts = dateParts(checkOut);

    if (
      checkInParts &&
      checkOutParts &&
      checkInParts.monthIndex === checkOutParts.monthIndex &&
      checkInParts.year === checkOutParts.year
    ) {
      return `${formatDate(checkIn)} - ${checkOutParts.day}`;
    }

    return `${formatDate(checkIn)} - ${formatDate(checkOut)}`;
  }

  if (checkIn) {
    return `${formatDate(checkIn)} - Select checkout`;
  }

  return "Add your travel dates";
}

export default function RoomCalendar({
  city,
  month,
  year,
  initialCheckIn,
  initialCheckOut,
  onDateRangeChange
}: RoomCalendarProps) {
  const initialMonthIndex = monthNames.indexOf(month);
  const fallbackMonthIndex = initialMonthIndex >= 0 ? initialMonthIndex : 0;
  const [visibleMonth, setVisibleMonth] = useState<VisibleMonth>({
    monthIndex: fallbackMonthIndex,
    year
  });
  const [checkInDate, setCheckInDate] = useState<string | undefined>(() =>
    parseDateValue(initialCheckIn, year, fallbackMonthIndex)
  );
  const [checkOutDate, setCheckOutDate] = useState<string | undefined>(() =>
    parseDateValue(initialCheckOut, year, fallbackMonthIndex)
  );
  const visibleMonthName = monthNames[visibleMonth.monthIndex];
  const weeks = useMemo(
    () => buildWeeks(visibleMonth.monthIndex, visibleMonth.year),
    [visibleMonth.monthIndex, visibleMonth.year]
  );
  const nights = dayDifference(checkInDate, checkOutDate);
  const nightsLabel =
    nights > 0 ? `${nights} night${nights === 1 ? "" : "s"}` : "Select dates";
  const rangeLabel = formatRange(checkInDate, checkOutDate);

  useEffect(() => {
    onDateRangeChange?.({
      checkIn: checkInDate,
      checkOut: checkOutDate,
      nights
    });
  }, [checkInDate, checkOutDate, nights, onDateRangeChange]);

  const moveMonth = (offset: number) => {
    setVisibleMonth((current) => {
      const next = new Date(current.year, current.monthIndex + offset, 1);

      return {
        monthIndex: next.getMonth(),
        year: next.getFullYear()
      };
    });
  };

  return (
    <section className="mt-6 border-t border-[color:var(--color-border)] pt-6">
      <h2 className="text-lg font-semibold text-[color:var(--color-text-primary)]">
        {nightsLabel} in {city}
      </h2>
      <p className="mt-1 text-sm text-[color:var(--color-text-secondary)]">
        {rangeLabel}
      </p>
      <div className="mt-5 flex items-center justify-between gap-3">
        <button
          aria-label="Previous month"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-border)] text-[color:var(--color-text-primary)] transition-colors duration-150 ease-out hover:bg-[var(--color-bg-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
          type="button"
          onClick={() => moveMonth(-1)}
        >
          <Icon className="h-4 w-4" name="chevron-left" />
        </button>
        <h3 className="text-base font-semibold text-[color:var(--color-text-primary)]">
          {visibleMonthName} {visibleMonth.year}
        </h3>
        <button
          aria-label="Next month"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-border)] text-[color:var(--color-text-primary)] transition-colors duration-150 ease-out hover:bg-[var(--color-bg-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
          type="button"
          onClick={() => moveMonth(1)}
        >
          <Icon className="h-4 w-4" name="chevron-right" />
        </button>
      </div>
      <table className="mt-3 w-full table-fixed border-separate border-spacing-y-2 text-center text-sm">
        <caption className="sr-only">
          {visibleMonthName} {visibleMonth.year} availability calendar
        </caption>
        <thead>
          <tr>
            {weekdays.map((weekday) => (
              <th
                key={weekday}
                className="pb-2 text-xs font-normal text-[color:var(--color-text-secondary)]"
                scope="col"
              >
                {weekday}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, weekIndex) => (
            <tr key={`${visibleMonthName}-${visibleMonth.year}-${weekIndex}`}>
              {week.map((day, dayIndex) => {
                const dayIso = day
                  ? isoDate(visibleMonth.year, visibleMonth.monthIndex, day)
                  : undefined;
                const isSelected =
                  dayIso === checkInDate || dayIso === checkOutDate;
                const isInRange =
                  dayIso !== undefined &&
                  checkInDate !== undefined &&
                  checkOutDate !== undefined &&
                  dayIso > checkInDate &&
                  dayIso < checkOutDate;

                return (
                  <td
                    key={`${weekIndex}-${dayIndex}`}
                    className={isInRange ? "bg-[var(--color-bg-muted)]" : ""}
                  >
                    {day ? (
                      <button
                        aria-label={
                          isSelected
                            ? `${visibleMonthName} ${day}, selected`
                            : `${visibleMonthName} ${day}`
                        }
                        aria-pressed={isSelected}
                        className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] ${
                          isSelected
                            ? "bg-[var(--color-text-primary)] text-white"
                            : "text-[color:var(--color-text-primary)] hover:bg-[var(--color-bg-muted)]"
                        }`}
                        type="button"
                        onClick={() => {
                          if (!dayIso) {
                            return;
                          }

                          if (
                            !checkInDate ||
                            checkOutDate ||
                            dayIso <= checkInDate
                          ) {
                            setCheckInDate(dayIso);
                            setCheckOutDate(undefined);
                            return;
                          }

                          setCheckOutDate(dayIso);
                        }}
                      >
                        {day}
                      </button>
                    ) : (
                      <span aria-hidden="true" />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="mt-4 text-sm font-semibold underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
        type="button"
        onClick={() => {
          setCheckInDate(undefined);
          setCheckOutDate(undefined);
        }}
      >
        Clear dates
      </button>
    </section>
  );
}
