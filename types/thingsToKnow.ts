import type { IconName } from "./icon";

export type ThingsToKnowItem = {
  id: string;
  icon: IconName;
  label: string;
  sublabel?: string;
};

export type ThingsToKnowSection = {
  id: string;
  title: string;
  items: ThingsToKnowItem[];
};
