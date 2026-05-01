import {
  AlertTriangle,
  ArrowLeft,
  Award,
  Baby,
  Bath,
  BedDouble,
  CalendarRange,
  Car,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Coffee,
  CircleDollarSign,
  CircleUserRound,
  DoorOpen,
  Dumbbell,
  Earth,
  Eye,
  Flame,
  Heart,
  House,
  KeyRound,
  Lock,
  MapPinned,
  MessageCircle,
  Minus,
  PartyPopper,
  Plus,
  Search,
  Share2,
  ShieldCheck,
  Snowflake,
  Sparkle,
  Star,
  Tv,
  Users,
  UtensilsCrossed,
  WashingMachine,
  Waves,
  Wifi,
  type LucideIcon
} from "lucide-react";
import type { IconName } from "@/types";

type IconProps = {
  name: IconName;
  className?: string;
  "aria-hidden"?: boolean;
};

const iconMap: Partial<Record<IconName, LucideIcon>> = {
  alert: AlertTriangle,
  "arrow-left": ArrowLeft,
  medal: Award,
  baby: Baby,
  bath: Bath,
  bed: BedDouble,
  calendar: CalendarRange,
  car: Car,
  check: Check,
  "chevron-down": ChevronDown,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  clock: Clock,
  coffee: Coffee,
  dollar: CircleDollarSign,
  door: DoorOpen,
  dumbbell: Dumbbell,
  eye: Eye,
  flame: Flame,
  globe: Earth,
  heart: Heart,
  home: House,
  key: KeyRound,
  lock: Lock,
  "map-pin": MapPinned,
  message: MessageCircle,
  minus: Minus,
  party: PartyPopper,
  plus: Plus,
  search: Search,
  share: Share2,
  shield: ShieldCheck,
  snowflake: Snowflake,
  sparkles: Sparkle,
  star: Star,
  tv: Tv,
  "user-circle": CircleUserRound,
  users: Users,
  utensils: UtensilsCrossed,
  washer: WashingMachine,
  waves: Waves,
  wifi: Wifi
};

const customPaths: Partial<Record<IconName, React.ReactNode>> = {
  airbnb: (
    <>
      <path d="M12 4.2c-1.9 3-5.4 8.7-5.4 11.7a5.4 5.4 0 0 0 10.8 0C17.4 12.9 13.9 7.2 12 4.2Z" />
      <path d="M9 15.7c0-1.6 1.3-2.8 3-2.8s3 1.2 3 2.8-1.3 2.9-3 2.9-3-1.3-3-2.9Z" />
    </>
  ),
  facebook: (
    <path d="M14 8h2V5h-2.4C10.8 5 9 6.8 9 9.7V12H7v3h2v6h3v-6h2.5l.5-3h-3V9.8c0-1 .5-1.8 2-1.8Z" />
  ),
  instagram: (
    <>
      <rect width="14" height="14" x="5" y="5" rx="4" />
      <circle cx="12" cy="12" r="3.2" />
      <path d="M16.8 7.4h.01" />
    </>
  ),
  x: (
    <>
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </>
  )
};

export default function Icon({
  name,
  className = "h-5 w-5",
  "aria-hidden": ariaHidden = true
}: IconProps) {
  const IconComponent = iconMap[name];

  if (IconComponent) {
    return (
      <IconComponent
        absoluteStrokeWidth
        aria-hidden={ariaHidden}
        className={`overflow-visible ${className}`}
        strokeWidth={2.25}
      />
    );
  }

  return (
    <svg
      aria-hidden={ariaHidden}
      className={`overflow-visible ${className}`}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.25"
      vectorEffect="non-scaling-stroke"
      viewBox="0 0 24 24"
    >
      {customPaths[name] ?? customPaths.search}
    </svg>
  );
}
