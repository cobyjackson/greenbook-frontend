import Link from "next/link";
import Divider from "@/components/ui/Divider";
import Text from "@/components/ui/Text";
import Icon from "@/components/ui/Icon";

type FeedAction = "played" | "wishlisted";

type FeedItemProps = {
  username: string;
  action: FeedAction;
  courseName: string;
  courseId?: string;
  city: string;
  state: string;
  timestamp: string;
  showDivider?: boolean;
};

function ActionBadge({ action }: { action: FeedAction }) {
  const isPlayed = action === "played";
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
      style={{
        backgroundColor: isPlayed
          ? "rgba(45, 90, 61, 0.1)"
          : "rgba(139, 105, 20, 0.1)",
        color: isPlayed
          ? "var(--sys-color-status-played)"
          : "var(--sys-color-status-wishlisted)",
      }}
    >
      <Icon name={isPlayed ? "check" : "bookmark"} size={12} />
      <span
        className="text-xs font-medium"
        style={{ fontFamily: "var(--sys-typography-family-sans)" }}
      >
        {isPlayed ? "Played" : "Wishlisted"}
      </span>
    </span>
  );
}

export default function FeedItem({
  username,
  action,
  courseName,
  courseId,
  city,
  state,
  timestamp,
  showDivider = true,
}: FeedItemProps) {
  const courseContent = (
    <Text variant="section" className="group-hover:underline underline-offset-2">
      {courseName}
    </Text>
  );

  return (
    <article className="w-full py-6 group">
      <div className="flex flex-col gap-y-3">
        {/* Header with username and action */}
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <div className="flex items-center gap-2">
            {/* Avatar placeholder */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: "var(--sys-color-surface-secondary)" }}
            >
              <Icon name="user" size={16} className="text-text-secondary" />
            </div>
            <Text variant="body" as="span" className="font-medium">
              {username}
            </Text>
          </div>
          <ActionBadge action={action} />
        </div>

        {/* Course name - clickable */}
        {courseId ? (
          <Link href={`/course/${courseId}`} className="block">
            {courseContent}
          </Link>
        ) : (
          courseContent
        )}

        {/* Location and timestamp */}
        <div className="flex flex-wrap justify-between items-center gap-x-4 gap-y-1">
          <div className="flex items-center gap-1.5">
            <Icon name="map-pin" size={14} className="text-text-muted" />
            <Text variant="body" className="text-text-secondary">
              {city}, {state}
            </Text>
          </div>
          <Text variant="meta" as="span" className="text-text-muted">
            {timestamp}
          </Text>
        </div>
      </div>
      {showDivider ? <Divider className="mt-6" /> : null}
    </article>
  );
}
