"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
  type KeyboardEvent
} from "react";
import { useRouter } from "next/navigation";
import type { SearchValues } from "@/types";
import { categoryTabs } from "@/data/categoryTabs";
import { destinationSuggestions } from "@/data/listings";
import Icon from "@/components/shared/Icon";

type SearchBarProps = {
  initialValues?: SearchValues;
  variant?: "segmented" | "compact";
};

type SearchFormState = {
  where: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  description: string;
};

type MobileSection = "where" | "when" | "who";
type MobileDateTab = "dates" | "flexible";

type FlexibleDateOption = {
  id: string;
  label: string;
  summary: string;
  description: string;
};

type GuestCounts = {
  adults: number;
  children: number;
  infants: number;
  pets: number;
};

const guestCountLabels: {
  id: keyof GuestCounts;
  label: string;
  description: string;
  serviceAnimalNote?: string;
}[] = [
  { id: "adults", label: "Adults", description: "Ages 13 or above" },
  { id: "children", label: "Children", description: "Ages 2-12" },
  { id: "infants", label: "Infants", description: "Under 2" },
  {
    id: "pets",
    label: "Pets",
    description: "",
    serviceAnimalNote: "Bringing a service animal?"
  }
];

const mobileCalendarWeekdays = ["S", "M", "T", "W", "T", "F", "S"];
const mobileCalendarDays = Array.from({ length: 31 }, (_, index) => index + 1);
const mobileCalendarYear = 2026;
const mobileCalendarMonth = 4;
const mobileCalendarFirstDayColumn = new Date(
  mobileCalendarYear,
  mobileCalendarMonth,
  1
).getDay();
const flexibleDateOptions: FlexibleDateOption[] = [
  {
    id: "weekend",
    label: "Weekend",
    summary: "Flexible weekend",
    description: "2 nights, Fri-Sun"
  },
  {
    id: "long-weekend",
    label: "Long weekend",
    summary: "Flexible long weekend",
    description: "3-4 nights"
  },
  {
    id: "week",
    label: "Week",
    summary: "Flexible week",
    description: "7 nights"
  },
  {
    id: "month",
    label: "Month",
    summary: "Flexible month",
    description: "Any month"
  }
];
const defaultFlexibleDateId = "weekend";

function stateFromValues(values?: SearchValues): SearchFormState {
  return {
    where: values?.where ?? "",
    checkIn: values?.checkIn ?? "",
    checkOut: values?.checkOut ?? "",
    guests: values?.guests ? String(values.guests) : "",
    description: values?.description ?? ""
  };
}

function guestCountsFromGuests(guests?: number): GuestCounts {
  return {
    adults: guests ?? 0,
    children: 0,
    infants: 0,
    pets: 0
  };
}

function humanGuestCount(counts: GuestCounts) {
  return counts.adults + counts.children;
}

function dateLabel(value: string) {
  if (!value) {
    return "";
  }

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric"
  }).format(date);
}

function dateSummary(
  checkIn: string,
  checkOut: string,
  flexibleSummary?: string
) {
  if (flexibleSummary) {
    return flexibleSummary;
  }

  if (checkIn && checkOut) {
    return `${dateLabel(checkIn)} - ${dateLabel(checkOut)}`;
  }

  if (checkIn) {
    return `${dateLabel(checkIn)} - Select checkout`;
  }

  return "Add dates";
}

function mobileCalendarDateValue(day: number) {
  return `${mobileCalendarYear}-05-${String(day).padStart(2, "0")}`;
}

function guestSummary(counts: GuestCounts) {
  const guests = humanGuestCount(counts);
  const summaryParts = [];

  if (guests > 0) {
    summaryParts.push(`${guests} guest${guests === 1 ? "" : "s"}`);
  }

  if (counts.infants > 0) {
    summaryParts.push(`${counts.infants} infant${counts.infants === 1 ? "" : "s"}`);
  }

  if (counts.pets > 0) {
    summaryParts.push(`${counts.pets} pet${counts.pets === 1 ? "" : "s"}`);
  }

  if (summaryParts.length === 0) {
    return "Add guests";
  }

  return summaryParts.join(", ");
}

export default function SearchBar({
  initialValues,
  variant = "segmented"
}: SearchBarProps) {
  const router = useRouter();
  const mobileWhereInputRef = useRef<HTMLInputElement>(null);
  const mobileWhoSectionRef = useRef<HTMLElement>(null);
  const mobileSheetOpenedAtRef = useRef(0);
  const [values, setValues] = useState<SearchFormState>(() =>
    stateFromValues(initialValues)
  );
  const [guestCounts, setGuestCounts] = useState<GuestCounts>(() =>
    guestCountsFromGuests(initialValues?.guests)
  );
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isSmallViewport, setIsSmallViewport] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [showWhereSuggestions, setShowWhereSuggestions] = useState(false);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [mobileSheetInteractionsReady, setMobileSheetInteractionsReady] =
    useState(false);
  const [mobileSection, setMobileSection] =
    useState<MobileSection>("where");
  const [mobileDateTab, setMobileDateTab] =
    useState<MobileDateTab>("dates");
  const [selectedFlexibleDateId, setSelectedFlexibleDateId] = useState<
    string | null
  >(null);
  const [mobileFeatureNotice, setMobileFeatureNotice] = useState<string | null>(
    null
  );
  const selectedFlexibleDate = flexibleDateOptions.find(
    (option) => option.id === selectedFlexibleDateId
  );
  const mobileDateSummary = dateSummary(
    values.checkIn,
    values.checkOut,
    selectedFlexibleDate?.summary
  );
  const canAdvanceMobileDates = Boolean(
    values.checkIn || selectedFlexibleDate
  );
  const isReduced =
    (variant === "compact" || hasScrolled || isSmallViewport) && !isActive;

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewportState = () => {
      setIsSmallViewport(mediaQuery.matches);
    };

    updateViewportState();
    mediaQuery.addEventListener("change", updateViewportState);

    return () => mediaQuery.removeEventListener("change", updateViewportState);
  }, []);

  useEffect(() => {
    if (!mobileSheetOpen) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => mobileWhereInputRef.current?.focus());

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileSheetOpen]);

  useEffect(() => {
    if (!mobileSheetOpen) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setMobileSheetInteractionsReady(true);
    }, 350);

    return () => window.clearTimeout(timer);
  }, [mobileSheetOpen]);

  const visibleSuggestions = useMemo(() => {
    const query = values.where.trim().toLowerCase();

    if (!query) {
      return destinationSuggestions;
    }

    return destinationSuggestions.filter((suggestion) =>
      `${suggestion.label} ${suggestion.sublabel}`.toLowerCase().includes(query)
    );
  }, [values.where]);

  const mobileSuggestions = useMemo(
    () => [
      {
        id: "nearby",
        label: "Nearby",
        sublabel: "Find what's around you",
        value: "Nearby",
        icon: "map-pin" as const
      },
      ...visibleSuggestions.map((suggestion) => ({
        ...suggestion,
        icon: "home" as const
      }))
    ],
    [visibleSuggestions]
  );
  const typedMobileDestination = values.where.trim();
  const showTypedMobileDestination =
    typedMobileDestination.length > 0 &&
    !mobileSuggestions.some(
      (suggestion) =>
        suggestion.value.toLowerCase() === typedMobileDestination.toLowerCase()
    );

  const updateValue =
    (key: keyof SearchFormState) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value;

      setValues((current) => ({ ...current, [key]: nextValue }));

      if (key === "where") {
        setShowWhereSuggestions(true);
      }

      if (key === "guests") {
        const nextGuests = Number.parseInt(nextValue, 10);

        setGuestCounts({
          adults: Number.isNaN(nextGuests) ? 0 : Math.max(0, nextGuests),
          children: 0,
          infants: 0,
          pets: 0
        });
      }
    };

  const updateGuestCount = (key: keyof GuestCounts, increment: number) => {
    setGuestCounts((current) => {
      const nextCounts = {
        ...current,
        [key]: Math.max(0, current[key] + increment)
      };
      const nextGuests = humanGuestCount(nextCounts);

      setValues((currentValues) => ({
        ...currentValues,
        guests: nextGuests > 0 ? String(nextGuests) : ""
      }));

      return nextCounts;
    });
  };

  const advanceMobileWhere = (destination = values.where) => {
    const trimmedDestination = destination.trim();

    if (!trimmedDestination) {
      return;
    }

    setValues((current) => ({ ...current, where: trimmedDestination }));
    setShowWhereSuggestions(false);
    setMobileSection("when");
  };

  const handleMobileWhereKeyDown = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();
    advanceMobileWhere();
  };

  const selectMobileDate = (dateValue: string) => {
    setMobileDateTab("dates");
    setSelectedFlexibleDateId(null);
    setValues((current) => {
      if (
        !current.checkIn ||
        current.checkOut ||
        dateValue < current.checkIn
      ) {
        return { ...current, checkIn: dateValue, checkOut: "" };
      }

      if (dateValue === current.checkIn) {
        return current;
      }

      return { ...current, checkOut: dateValue };
    });
  };

  const selectFlexibleDate = (optionId: string) => {
    setMobileDateTab("flexible");
    setSelectedFlexibleDateId(optionId);
    setValues((current) => ({ ...current, checkIn: "", checkOut: "" }));
  };

  const switchMobileDateTab = (tab: MobileDateTab) => {
    setMobileDateTab(tab);

    if (tab === "flexible") {
      setSelectedFlexibleDateId(
        (current) => current ?? defaultFlexibleDateId
      );
      setValues((current) => ({ ...current, checkIn: "", checkOut: "" }));
      return;
    }

    setSelectedFlexibleDateId(null);
  };

  const resetMobileDates = () => {
    setValues((current) => ({ ...current, checkIn: "", checkOut: "" }));
    setSelectedFlexibleDateId(null);
  };

  const advanceMobileDates = () => {
    if (!canAdvanceMobileDates) {
      return;
    }

    setMobileSection("who");
    window.requestAnimationFrame(() => {
      mobileWhoSectionRef.current?.scrollIntoView({
        block: "start",
        behavior: "smooth"
      });
    });
  };

  const searchHref = () => {
    const params = new URLSearchParams();
    const trimmedValues = {
      where: values.where.trim(),
      checkIn: values.checkIn,
      checkOut: values.checkOut,
      guests: values.guests.trim(),
      description: values.description.trim()
    };

    Object.entries(trimmedValues).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    const query = params.toString();
    return query ? `/catalog?${query}` : "/catalog";
  };

  const submitSearch = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    setMobileSheetOpen(false);
    router.push(searchHref());
  };

  const submitDesktopSearch = (event: FormEvent<HTMLFormElement>) => {
    if (openMobileSheet()) {
      event.preventDefault();
      return;
    }

    submitSearch(event);
  };

  const selectDestination = (destination: string, closeSuggestions = true) => {
    setValues((current) => ({ ...current, where: destination }));
    setShowWhereSuggestions(!closeSuggestions);
  };

  const selectMobileDestination = (destination: string) => {
    selectDestination(destination);
    advanceMobileWhere(destination);
  };

  const openMobileSheet = () => {
    const isMobileViewport =
      isSmallViewport ||
      (typeof window !== "undefined" &&
        window.matchMedia("(max-width: 767px)").matches);

    if (!isMobileViewport) {
      return false;
    }

    setMobileSheetOpen(true);
    setMobileSheetInteractionsReady(false);
    mobileSheetOpenedAtRef.current = Date.now();
    setMobileSection("where");
    setMobileFeatureNotice(null);
    setIsActive(false);
    setShowWhereSuggestions(false);
    return true;
  };

  const clearSearch = () => {
    setValues({
      where: "",
      checkIn: "",
      checkOut: "",
      guests: "",
      description: ""
    });
    setGuestCounts({
      adults: 0,
      children: 0,
      infants: 0,
      pets: 0
    });
    setMobileSection("where");
    setMobileFeatureNotice(null);
    setMobileDateTab("dates");
    setSelectedFlexibleDateId(null);
  };

  return (
    <>
      <form
        aria-label="Search stays"
        className={`relative z-10 grid w-full border border-[color:var(--color-border)] bg-[var(--color-surface)] shadow-sm transition-all duration-200 ease-out ${
          isReduced
            ? "grid-cols-[minmax(0,1fr)_2.5rem] items-center rounded-full p-1.5"
            : `gap-2 rounded-3xl p-2 md:grid-cols-[1.3fr_1.5fr_0.9fr_1.2fr_auto] md:items-center md:rounded-full ${
                isActive
                  ? ""
                  : "max-md:grid-cols-[minmax(0,1fr)_2.5rem] max-md:items-center max-md:gap-0 max-md:rounded-full max-md:p-1.5"
              }`
        }`}
        role="search"
        onBlur={(event: FocusEvent<HTMLFormElement>) => {
          const nextTarget = event.relatedTarget;

          if (
            !(nextTarget instanceof Node) ||
            !event.currentTarget.contains(nextTarget)
          ) {
            setIsActive(false);
            setShowWhereSuggestions(false);
          }
        }}
        onFocus={() => {
          if (!isSmallViewport) {
            setIsActive(true);
          }
        }}
        onSubmit={submitDesktopSearch}
      >
        <div
          className={`relative rounded-2xl px-3 ${
            isReduced
              ? "py-1"
              : `py-2 md:rounded-full md:border-r md:border-[color:var(--color-border)] ${
                  isActive ? "" : "max-md:py-1"
                }`
          }`}
        >
          <span
            className={`text-xs font-semibold text-[color:var(--color-text-primary)] ${
              isReduced
                ? "sr-only"
                : `block ${isActive ? "" : "max-md:sr-only"}`
            }`}
          >
            Where
          </span>
          <input
            aria-label="Where"
            autoComplete="off"
            className={`w-full rounded-md bg-transparent text-sm text-[color:var(--color-text-primary)] outline-none placeholder:text-[color:var(--color-text-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] ${
              isReduced
                ? "mt-0 h-8"
                : `mt-1 ${isActive ? "" : "max-md:mt-0 max-md:h-8"}`
            } max-md:font-semibold max-md:placeholder:font-semibold`}
            name="where"
            placeholder="Search destinations"
            readOnly={isSmallViewport}
            type="text"
            value={values.where}
            onPointerDown={(event) => {
              if (isSmallViewport) {
                event.preventDefault();
                openMobileSheet();
              }
            }}
            onClick={() => {
              if (!openMobileSheet()) {
                setShowWhereSuggestions(true);
              }
            }}
            onChange={updateValue("where")}
            onFocus={() => {
              if (!isSmallViewport) {
                setShowWhereSuggestions(true);
              }
            }}
          />
          {showWhereSuggestions &&
          visibleSuggestions.length > 0 &&
          !isSmallViewport ? (
            <div
              className="absolute left-0 right-0 top-full z-[90] mt-2 overflow-hidden rounded-xl border border-[color:var(--color-border)] bg-[var(--color-surface)] py-2 shadow-lg"
              role="listbox"
            >
              {visibleSuggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  className="block w-full px-4 py-3 text-left transition-colors duration-150 ease-out hover:bg-[var(--color-bg-muted)] focus-visible:bg-[var(--color-bg-muted)] focus-visible:outline-none"
                  type="button"
                  onClick={() => selectDestination(suggestion.value)}
                >
                  <span className="block text-sm font-semibold text-[color:var(--color-text-primary)]">
                    {suggestion.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-[color:var(--color-text-secondary)]">
                    {suggestion.sublabel}
                  </span>
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <div
          className={`rounded-2xl px-3 py-2 md:rounded-full md:border-r md:border-[color:var(--color-border)] ${
            isReduced ? "hidden" : isActive ? "" : "max-md:hidden"
          }`}
        >
          <span className="block text-xs font-semibold text-[color:var(--color-text-primary)]">
            When
          </span>
          <div className="mt-1 grid grid-cols-2 gap-2">
            <input
              aria-label="Check-in date"
              className="min-w-0 rounded-md bg-transparent text-sm text-[color:var(--color-text-primary)] outline-none placeholder:text-[color:var(--color-text-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
              name="checkIn"
              type="date"
              value={values.checkIn}
              onChange={updateValue("checkIn")}
            />
            <input
              aria-label="Check-out date"
              className="min-w-0 rounded-md bg-transparent text-sm text-[color:var(--color-text-primary)] outline-none placeholder:text-[color:var(--color-text-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
              name="checkOut"
              type="date"
              value={values.checkOut}
              onChange={updateValue("checkOut")}
            />
          </div>
        </div>
        <label
          className={`rounded-2xl px-3 py-2 md:rounded-full md:border-r md:border-[color:var(--color-border)] ${
            isReduced ? "hidden" : isActive ? "" : "max-md:hidden"
          }`}
        >
          <span className="block text-xs font-semibold text-[color:var(--color-text-primary)]">
            Who
          </span>
          <input
            className="mt-1 w-full rounded-md bg-transparent text-sm text-[color:var(--color-text-primary)] outline-none placeholder:text-[color:var(--color-text-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
            min={1}
            name="guests"
            placeholder="Add guests"
            type="number"
            value={values.guests}
            onChange={updateValue("guests")}
          />
        </label>
        <label
          className={`rounded-2xl px-3 py-2 md:rounded-full ${
            isReduced ? "hidden" : isActive ? "" : "max-md:hidden"
          }`}
        >
          <span className="block text-xs font-semibold text-[color:var(--color-text-primary)]">
            What
          </span>
          <input
            className="mt-1 w-full rounded-md bg-transparent text-sm text-[color:var(--color-text-primary)] outline-none placeholder:text-[color:var(--color-text-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
            name="description"
            placeholder="Add description"
            type="text"
            value={values.description}
            onChange={updateValue("description")}
          />
        </label>
        <button
          aria-label="Search"
          className={`flex items-center justify-center rounded-full bg-[var(--color-primary)] text-white transition-colors duration-150 ease-out hover:bg-[var(--color-primary-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] ${
            isReduced
              ? "h-10 w-10"
              : `h-12 w-full md:w-12 ${
                  isActive ? "" : "max-md:h-10 max-md:w-10"
                }`
          }`}
          type={isSmallViewport ? "button" : "submit"}
          onClick={() => {
            openMobileSheet();
          }}
        >
          <Icon className="h-5 w-5" name="search" />
        </button>
      </form>
      {mobileSheetOpen ? (
        <div className="fixed inset-0 z-[120] bg-[var(--color-bg-muted)] md:hidden">
          <form
            aria-label="Mobile search stays"
            className="flex h-full flex-col"
            role="search"
            onSubmit={submitSearch}
          >
            <div className="shrink-0 px-4 pb-3 pt-3">
              <div className="flex justify-end">
                <button
                  aria-label="Close search"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-surface)] text-[color:var(--color-text-primary)] shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                  type="button"
                  onClick={() => setMobileSheetOpen(false)}
                >
                  <Icon className="h-5 w-5" name="x" />
                </button>
              </div>
              <div className="mt-2 grid w-full grid-cols-3 gap-2">
                {categoryTabs.map((item) => {
                  const isHomes = item.id === "homes";

                  return (
                    <button
                      key={item.id}
                      aria-pressed={isHomes}
                      className={`flex min-w-0 flex-col items-center gap-0.5 border-b-[3px] px-1 pb-2 text-xs font-semibold disabled:pointer-events-none ${
                        isHomes
                          ? "border-[color:var(--color-text-primary)] text-[color:var(--color-text-primary)]"
                          : "border-transparent text-[color:var(--color-text-secondary)]"
                      }`}
                      disabled={!mobileSheetInteractionsReady}
                      type="button"
                      onClick={() => {
                        if (!mobileSheetInteractionsReady) {
                          return;
                        }

                        if (Date.now() - mobileSheetOpenedAtRef.current < 400) {
                          return;
                        }

                        setMobileFeatureNotice(
                          isHomes
                            ? null
                            : `${item.label} are coming soon. Search homes for now.`
                        );
                      }}
                    >
                      <Icon className="h-5 w-5" name={item.icon} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
              {mobileFeatureNotice ? (
                <div
                  className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-[var(--color-surface)] px-4 py-3 text-sm font-semibold text-[color:var(--color-text-primary)] shadow-sm"
                  role="status"
                >
                  <p>{mobileFeatureNotice}</p>
                  <button
                    className="shrink-0 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                    type="button"
                    onClick={() => setMobileFeatureNotice(null)}
                  >
                    Close
                  </button>
                </div>
              ) : null}
            </div>
            <div className="flex-1 overflow-y-auto px-3 pb-28">
              <section
                className={`rounded-[24px] border border-[color:var(--color-border)] bg-[var(--color-surface)] ${
                  mobileSection === "where"
                    ? "p-5 shadow-md"
                    : "cursor-pointer p-4 shadow-sm"
                }`}
                onClick={() => {
                  setMobileSection("where");
                  window.requestAnimationFrame(() =>
                    mobileWhereInputRef.current?.focus()
                  );
                }}
              >
                {mobileSection === "where" ? (
                  <>
                    <h2 className="text-[1.625rem] font-semibold leading-8 text-[color:var(--color-text-primary)]">
                      Where to?
                    </h2>
                    <label className="mt-4 flex h-12 items-center gap-3 rounded-xl border border-[color:var(--color-text-primary)] bg-[var(--color-surface)] px-4 shadow-sm focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--color-primary)]">
                      <Icon className="h-5 w-5" name="search" />
                      <input
                        ref={mobileWhereInputRef}
                        aria-label="Mobile destination"
                        autoComplete="off"
                        className="min-w-0 flex-1 bg-transparent text-base font-semibold text-[color:var(--color-text-primary)] outline-none placeholder:font-semibold placeholder:text-[color:var(--color-text-secondary)]"
                        name="mobileWhere"
                        placeholder="Search destinations"
                        type="text"
                        value={values.where}
                        onChange={updateValue("where")}
                        onKeyDown={handleMobileWhereKeyDown}
                      />
                    </label>
                    <div className="mt-5">
                      <p className="text-sm font-semibold text-[color:var(--color-text-primary)]">
                        Suggested destinations
                      </p>
                      <div className="mt-3 max-h-56 space-y-2 overflow-y-auto pr-1 scrollbar-none">
                        {showTypedMobileDestination ? (
                          <button
                            className="flex w-full items-center gap-3 rounded-2xl px-1 py-2 text-left transition-colors duration-150 ease-out hover:bg-[var(--color-bg-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              advanceMobileWhere(typedMobileDestination);
                            }}
                          >
                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[color:var(--color-border)] bg-[var(--color-surface)] text-[color:var(--color-text-primary)] shadow-sm">
                              <Icon className="h-5 w-5" name="search" />
                            </span>
                            <span className="min-w-0">
                              <span className="block truncate text-base font-semibold text-[color:var(--color-text-primary)]">
                                {typedMobileDestination}
                              </span>
                              <span className="mt-0.5 block text-sm text-[color:var(--color-text-secondary)]">
                                Search this destination
                              </span>
                            </span>
                          </button>
                        ) : null}
                        {mobileSuggestions.map((suggestion) => (
                          <button
                            key={suggestion.id}
                            className="flex w-full items-center gap-3 rounded-2xl px-1 py-2 text-left transition-colors duration-150 ease-out hover:bg-[var(--color-bg-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              selectMobileDestination(suggestion.value);
                            }}
                          >
                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[color:var(--color-border)] bg-[var(--color-surface)] text-[color:var(--color-text-primary)] shadow-sm">
                              <Icon
                                className="h-5 w-5"
                                name={suggestion.icon}
                              />
                            </span>
                            <span className="min-w-0">
                              <span className="block truncate text-base font-semibold text-[color:var(--color-text-primary)]">
                                {suggestion.label}
                              </span>
                              <span className="mt-0.5 block truncate text-sm text-[color:var(--color-text-secondary)]">
                                {suggestion.sublabel}
                              </span>
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-between gap-4 py-1">
                    <span className="text-base font-semibold text-[color:var(--color-text-secondary)]">
                      Where
                    </span>
                    <span className="truncate text-base font-semibold text-[color:var(--color-text-primary)]">
                      {values.where || "Search destinations"}
                    </span>
                  </div>
                )}
              </section>
              <section
                className="mt-3 rounded-[20px] border border-[color:var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm"
                onClick={() => setMobileSection("when")}
              >
                {mobileSection === "when" ? (
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="text-[1.5rem] font-semibold leading-7 text-[color:var(--color-text-primary)]">
                        When?
                      </h2>
                      <span className="mt-1 text-right text-sm font-semibold text-[color:var(--color-text-primary)]">
                        {mobileDateSummary}
                      </span>
                    </div>
                    <div className="mt-3 grid grid-cols-2 rounded-full bg-[var(--color-bg-muted)] p-1">
                      <button
                        aria-controls="mobile-calendar-dates-panel"
                        aria-pressed={mobileDateTab === "dates"}
                        className={`h-10 rounded-full text-sm font-semibold text-[color:var(--color-text-primary)] transition-colors duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] ${
                          mobileDateTab === "dates"
                            ? "bg-[var(--color-surface)] shadow-sm"
                            : ""
                        }`}
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          switchMobileDateTab("dates");
                        }}
                      >
                        Dates
                      </button>
                      <button
                        aria-controls="mobile-flexible-dates-panel"
                        aria-pressed={mobileDateTab === "flexible"}
                        className={`h-10 rounded-full text-sm font-semibold text-[color:var(--color-text-primary)] transition-colors duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] ${
                          mobileDateTab === "flexible"
                            ? "bg-[var(--color-surface)] shadow-sm"
                            : ""
                        }`}
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          switchMobileDateTab("flexible");
                        }}
                      >
                        Flexible dates
                      </button>
                    </div>
                    {mobileDateTab === "dates" ? (
                      <div id="mobile-calendar-dates-panel" className="mt-4">
                        <h3 className="text-lg font-semibold text-[color:var(--color-text-primary)]">
                          May 2026
                        </h3>
                        <div className="mt-3 grid grid-cols-7 text-center text-xs font-semibold text-[color:var(--color-text-secondary)]">
                          {mobileCalendarWeekdays.map((weekday, index) => (
                            <span key={`${weekday}-${index}`}>{weekday}</span>
                          ))}
                        </div>
                        <div className="mt-2 grid grid-cols-7 gap-y-1 text-center">
                          {mobileCalendarDays.map((day) => {
                            const dateValue = mobileCalendarDateValue(day);
                            const isSelected =
                              dateValue === values.checkIn ||
                              dateValue === values.checkOut;
                            const isInRange =
                              values.checkIn &&
                              values.checkOut &&
                              dateValue > values.checkIn &&
                              dateValue < values.checkOut;

                            return (
                              <button
                                key={dateValue}
                                aria-label={`May ${day}, 2026`}
                                aria-pressed={isSelected}
                                className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] ${
                                  isSelected
                                    ? "bg-[var(--color-text-primary)] text-white"
                                    : isInRange
                                      ? "bg-[var(--color-bg-muted)] text-[color:var(--color-text-primary)]"
                                      : "text-[color:var(--color-text-primary)] hover:bg-[var(--color-bg-muted)]"
                                }`}
                                style={
                                  day === 1
                                    ? {
                                        gridColumnStart:
                                          mobileCalendarFirstDayColumn + 1
                                      }
                                    : undefined
                                }
                                type="button"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  selectMobileDate(dateValue);
                                }}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                        <div className="mt-3 grid grid-cols-2 overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[var(--color-surface)] shadow-sm">
                          <button
                            className="flex min-w-0 items-center justify-between gap-2 border-r border-[color:var(--color-border)] px-3 py-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--color-primary)]"
                            type="button"
                            onClick={(event) => event.stopPropagation()}
                          >
                            <span className="min-w-0">
                              <span className="block text-xs text-[color:var(--color-text-secondary)]">
                                Check in
                              </span>
                              <span className="mt-0.5 block truncate text-base font-semibold text-[color:var(--color-text-primary)]">
                                Exact day
                              </span>
                            </span>
                            <Icon
                              className="h-4 w-4 shrink-0"
                              name="chevron-down"
                            />
                          </button>
                          <button
                            className="flex min-w-0 items-center justify-between gap-2 px-3 py-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--color-primary)]"
                            type="button"
                            onClick={(event) => event.stopPropagation()}
                          >
                            <span className="min-w-0">
                              <span className="block text-xs text-[color:var(--color-text-secondary)]">
                                Check out
                              </span>
                              <span className="mt-0.5 block truncate text-base font-semibold text-[color:var(--color-text-primary)]">
                                Exact day
                              </span>
                            </span>
                            <Icon
                              className="h-4 w-4 shrink-0"
                              name="chevron-down"
                            />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        id="mobile-flexible-dates-panel"
                        className="mt-4 grid grid-cols-2 gap-2"
                      >
                        {flexibleDateOptions.map((option) => {
                          const isSelected =
                            selectedFlexibleDateId === option.id;

                          return (
                            <button
                              key={option.id}
                              aria-pressed={isSelected}
                              className={`min-h-20 rounded-2xl border px-3 py-3 text-left transition-colors duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] ${
                                isSelected
                                  ? "border-[color:var(--color-text-primary)] bg-[var(--color-bg-muted)]"
                                  : "border-[color:var(--color-border)] bg-[var(--color-surface)] hover:border-[color:var(--color-text-secondary)]"
                              }`}
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();
                                selectFlexibleDate(option.id);
                              }}
                            >
                              <span className="block text-base font-semibold text-[color:var(--color-text-primary)]">
                                {option.label}
                              </span>
                              <span className="mt-1 block text-sm leading-5 text-[color:var(--color-text-secondary)]">
                                {option.description}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-base font-semibold text-[color:var(--color-text-secondary)]">
                      When
                    </span>
                    <span className="text-base font-semibold text-[color:var(--color-text-primary)]">
                      {mobileDateSummary}
                    </span>
                  </div>
                )}
              </section>
              <section
                ref={mobileWhoSectionRef}
                className="mt-3 rounded-[20px] border border-[color:var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm"
                onClick={() => setMobileSection("who")}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-base font-semibold text-[color:var(--color-text-secondary)]">
                    Who
                  </span>
                  <span className="text-base font-semibold text-[color:var(--color-text-primary)]">
                    {guestSummary(guestCounts)}
                  </span>
                </div>
                {mobileSection === "who" ? (
                  <div className="mt-4 divide-y divide-[color:var(--color-border)]">
                    {guestCountLabels.map((item) => {
                      const count = guestCounts[item.id];

                      return (
                        <div
                          key={item.id}
                          className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                        >
                          <div className="min-w-0">
                            <p className="text-base font-semibold text-[color:var(--color-text-primary)]">
                              {item.label}
                            </p>
                            {item.description ? (
                              <p className="mt-0.5 text-sm text-[color:var(--color-text-secondary)]">
                                {item.description}
                              </p>
                            ) : null}
                            {item.serviceAnimalNote ? (
                              <button
                                className="mt-1 text-left text-sm font-semibold text-[color:var(--color-text-secondary)] underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                                type="button"
                                onClick={(event) => event.stopPropagation()}
                              >
                                {item.serviceAnimalNote}
                              </button>
                            ) : null}
                          </div>
                          <div className="flex shrink-0 items-center gap-3">
                            <button
                              aria-label={`Decrease ${item.label}`}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--color-text-tertiary)] text-[color:var(--color-text-primary)] transition-colors duration-150 ease-out disabled:cursor-not-allowed disabled:border-[color:var(--color-border)] disabled:text-[color:var(--color-text-tertiary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                              disabled={count === 0}
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();
                                updateGuestCount(item.id, -1);
                              }}
                            >
                              <Icon className="h-4 w-4" name="minus" />
                            </button>
                            <span className="w-5 text-center text-base text-[color:var(--color-text-primary)]">
                              {count}
                            </span>
                            <button
                              aria-label={`Increase ${item.label}`}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--color-text-tertiary)] text-[color:var(--color-text-primary)] transition-colors duration-150 ease-out hover:border-[color:var(--color-text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();
                                updateGuestCount(item.id, 1);
                              }}
                            >
                              <Icon className="h-4 w-4" name="plus" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </section>
            </div>
            <div className="fixed inset-x-0 bottom-0 z-10 flex items-center justify-between gap-4 border-t border-[color:var(--color-border)] bg-[var(--color-bg-muted)] px-6 py-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
              <button
                className="text-lg font-semibold text-[color:var(--color-text-primary)] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                type="button"
                onClick={mobileSection === "when" ? resetMobileDates : clearSearch}
              >
                {mobileSection === "when" ? "Reset" : "Clear all"}
              </button>
              <button
                className={`flex h-14 min-w-36 items-center justify-center gap-3 rounded-2xl px-6 text-lg font-semibold text-white shadow-sm transition-colors duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] ${
                  mobileSection === "when"
                    ? "bg-[var(--color-text-primary)] hover:bg-black disabled:bg-[var(--color-text-tertiary)]"
                    : "bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]"
                }`}
                disabled={mobileSection === "when" && !canAdvanceMobileDates}
                type={mobileSection === "when" ? "button" : "submit"}
                onClick={(e) => {
                  if (mobileSection === "when") {
                    e.preventDefault();
                    advanceMobileDates();
                  }
                }}
              >
                {mobileSection === "when" ? (
                  "Next"
                ) : (
                  <>
                    <Icon className="h-6 w-6" name="search" />
                    Search
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
}
