import type { IconName } from "./icon";

export type ReviewMention = {
  id: string;
  icon: IconName;
  label: string;
  score: string;
};

export type Review = {
  id: string;
  name: string;
  tenure: string;
  date: string;
  text: string;
  avatar: string;
};
