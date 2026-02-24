import Divider from "@/components/ui/Divider";
import Text from "@/components/ui/Text";

type FeedAction = "played" | "wishlisted";

type FeedItemProps = {
  username: string;
  action: FeedAction;
  courseName: string;
  city: string;
  state: string;
  timestamp: string;
  showDivider?: boolean;
};

export default function FeedItem({
  username,
  action,
  courseName,
  city,
  state,
  timestamp,
  showDivider = true,
}: FeedItemProps) {
  return (
    <article className="w-full py-8">
      <div className="flex flex-col gap-y-2">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <Text variant="courseTitle" as="span" className="font-medium">
            {username}
          </Text>
          <Text variant="meta" as="span">
            {action}
          </Text>
        </div>
        <Text variant="section">{courseName}</Text>
        <div className="flex justify-between gap-4">
          <Text variant="body">
            {city}, {state}
          </Text>
          <Text variant="meta" as="span" className="opacity-70 text-text-muted">
            {timestamp}
          </Text>
        </div>
      </div>
      {showDivider ? <Divider className="mt-8" /> : null}
    </article>
  );
}
