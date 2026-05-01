import type { SearchValues } from "@/types";

export type RawSearchParams = Record<string, string | string[] | undefined>;

const searchKeys = ["where", "checkIn", "checkOut", "guests", "description"] as const;

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export function searchValuesFromParams(params: RawSearchParams): SearchValues {
  const guestsValue = firstValue(params.guests);
  const guests = guestsValue ? Number(guestsValue) : undefined;

  return {
    where: firstValue(params.where),
    checkIn: firstValue(params.checkIn),
    checkOut: firstValue(params.checkOut),
    guests: guests && Number.isFinite(guests) ? guests : undefined,
    description: firstValue(params.description)
  };
}

export function queryStringFromParams(params: RawSearchParams) {
  const query = new URLSearchParams();

  searchKeys.forEach((key) => {
    const value = firstValue(params[key]);

    if (value) {
      query.set(key, value);
    }
  });

  return query.toString();
}

export function catalogSummaryFromSearch(values: SearchValues) {
  const parts = [
    values.checkIn && values.checkOut
      ? `${values.checkIn} to ${values.checkOut}`
      : undefined,
    values.guests ? `${values.guests} guest${values.guests === 1 ? "" : "s"}` : undefined,
    values.description
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(" · ") : undefined;
}
