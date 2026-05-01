import type { ReviewMention } from "@/types";
import Icon from "@/components/shared/Icon";

type ReviewMentionsListProps = {
  mentions: ReviewMention[];
};

export default function ReviewMentionsList({ mentions }: ReviewMentionsListProps) {
  return (
    <div className="-mx-4 mt-5 overflow-x-auto px-4 scrollbar-none md:-mx-6 md:px-6">
      <ul className="flex min-w-max gap-3">
        {mentions.map((mention) => (
          <li
            key={mention.id}
            className="flex min-w-32 shrink-0 items-center gap-3 rounded-xl border border-[color:var(--color-border)] px-4 py-3"
          >
            <Icon className="h-5 w-5" name={mention.icon} />
            <div>
              <p className="text-sm font-semibold">{mention.label}</p>
              <p className="text-sm text-[color:var(--color-text-secondary)]">
                {mention.score}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
