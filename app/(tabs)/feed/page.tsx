"use client";

import { useEffect, useState } from "react";
import { getFeed, type FeedEntry } from "@/lib/api";
import FeedItem from "@/components/feed/FeedItem";
import ErrorView from "@/components/ui/ErrorView";
import SafeArea from "@/components/ui/SafeArea";
import Skeleton from "@/components/ui/Skeleton";
import Text from "@/components/ui/Text";
import Divider from "@/components/ui/Divider";
import Icon from "@/components/ui/Icon";

function FeedItemSkeleton({ showDivider }: { showDivider: boolean }) {
  return (
    <article className="w-full py-6">
      <div className="flex flex-col gap-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-5 w-24 rounded-sm" />
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <Skeleton className="h-8 w-3/4 rounded-sm" />
        <div className="flex justify-between gap-4">
          <Skeleton className="h-5 w-32 rounded-sm" />
          <Skeleton className="h-4 w-16 rounded-sm" />
        </div>
      </div>
      {showDivider ? <Divider className="mt-6" /> : null}
    </article>
  );
}

export default function FeedPage() {
  const [entries, setEntries] = useState<FeedEntry[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadFeed() {
      setError(null);
      setEntries(null);
      try {
        const nextEntries = await getFeed();
        if (cancelled) return;
        setEntries(nextEntries);
      } catch {
        if (cancelled) return;
        setError("Unable to load feed right now.");
      }
    }

    loadFeed();

    return () => {
      cancelled = true;
    };
  }, [retryKey]);

  return (
    <SafeArea className="mx-auto max-w-3xl py-8">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className="inline-flex items-center justify-center w-10 h-10 rounded-full"
            style={{ backgroundColor: "var(--sys-color-surface-secondary)" }}
          >
            <Icon name="flag" size={20} className="text-text-primary" />
          </span>
          <Text variant="section" as="h1" className="font-semibold">
            GreenBook
          </Text>
        </div>
      </header>
      <Divider className="mt-6" />
      <div className="mt-4">
        {error ? (
          <ErrorView
            message={error}
            onRetry={() => setRetryKey((value) => value + 1)}
          />
        ) : entries ? (
          entries.length > 0 ? (
            entries.map((entry, index) => (
            <FeedItem
              key={entry.id}
              username={entry.username}
              action={entry.action}
              courseName={entry.courseName}
              courseId={entry.courseId}
              city={entry.city}
              state={entry.state}
              timestamp={entry.timestamp}
              showDivider={index < entries.length - 1}
            />
            ))
          ) : (
            <div className="flex min-h-56 flex-col items-center justify-center gap-y-2 text-center">
              <Text variant="courseTitle">No activity yet</Text>
              <Text variant="body" className="text-text-muted">
                Follow golfers to see their rounds here.
              </Text>
            </div>
          )
        ) : (
          Array.from({ length: 6 }).map((_, index) => (
            <FeedItemSkeleton key={`feed-skeleton-${index}`} showDivider={index < 5} />
          ))
        )}
      </div>
    </SafeArea>
  );
}
