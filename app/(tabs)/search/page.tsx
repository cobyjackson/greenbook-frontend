"use client";

import { useEffect, useState } from "react";
import { searchCourses } from "@/lib/api";
import CourseResult from "@/components/search/CourseResult";
import Divider from "@/components/ui/Divider";
import ErrorView from "@/components/ui/ErrorView";
import SafeArea from "@/components/ui/SafeArea";
import Skeleton from "@/components/ui/Skeleton";
import Text from "@/components/ui/Text";

function SearchRowSkeleton({ showDivider }: { showDivider: boolean }) {
  return (
    <article className="w-full py-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-y-2">
          <Skeleton className="h-6 w-56 rounded-sm" />
          <Skeleton className="h-5 w-32 rounded-sm" />
        </div>
        <Skeleton className="mt-1 h-4 w-16 shrink-0 rounded-sm" />
      </div>
      {showDivider ? <Divider className="mt-8" /> : null}
    </article>
  );
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState<Awaited<ReturnType<typeof searchCourses>>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    let cancelled = false;

    async function runSearch() {
      setIsLoading(true);
      setError(null);
      try {
        const nextResults = await searchCourses(debouncedQuery);
        if (cancelled) return;
        setResults(nextResults);
      } catch {
        if (cancelled) return;
        setError("Unable to search courses right now.");
      } finally {
        if (cancelled) return;
        setIsLoading(false);
      }
    }

    runSearch();

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, retryKey]);

  return (
    <SafeArea className="mx-auto max-w-3xl py-12">
      <Text variant="hero" as="h1" className="font-semibold">
        Search
      </Text>

      <div className="mt-8">
        <label htmlFor="course-search" className="sr-only">
          Search courses
        </label>
        <input
          id="course-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search courses"
          className="w-full rounded-md border border-divider-primary bg-surface-primary px-4 py-3 text-text-primary placeholder:text-text-secondary outline-none"
        />
      </div>

      <Divider className="mt-8" />

      <div className="mt-2">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <SearchRowSkeleton key={`search-skeleton-${index}`} showDivider={index < 4} />
          ))
        ) : error ? (
          <ErrorView
            message={error}
            onRetry={() => setRetryKey((value) => value + 1)}
          />
        ) : results.length > 0 ? (
          results.map((result, index) => (
            <CourseResult
              key={result.id}
              result={result}
              showDivider={index < results.length - 1}
            />
          ))
        ) : (
          <div className="flex min-h-56 flex-col items-center justify-center gap-y-2 text-center">
            <Text variant="courseTitle">No courses found</Text>
            <Text variant="body" className="text-text-muted">
              Try a different search.
            </Text>
          </div>
        )}
      </div>
    </SafeArea>
  );
}
