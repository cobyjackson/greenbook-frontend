"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCourseDetail, type CourseDetail } from "@/lib/api";
import Divider from "@/components/ui/Divider";
import SafeArea from "@/components/ui/SafeArea";
import Skeleton from "@/components/ui/Skeleton";
import Text from "@/components/ui/Text";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";

function formatYards(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex flex-col gap-1 p-4 rounded-lg"
      style={{ backgroundColor: "var(--sys-color-surface-secondary)" }}
    >
      <Text variant="meta" className="text-text-muted uppercase tracking-wider">
        {label}
      </Text>
      <span
        className="font-semibold"
        style={{
          fontFamily: "var(--sys-typography-family-serif)",
          fontSize: "20px",
          lineHeight: "24px",
          color: "var(--sys-color-text-primary)",
        }}
      >
        {value}
      </span>
    </div>
  );
}

function DetailSection({
  title,
  body,
  icon,
}: {
  title: string;
  body: string;
  icon?: "flag" | "map-pin" | "calendar" | "user";
}) {
  return (
    <section className="mt-8">
      <div className="flex items-center gap-2 mb-3">
        {icon && <Icon name={icon} size={20} className="text-text-secondary" />}
        <Text variant="courseTitle" as="h2" className="font-semibold">
          {title}
        </Text>
      </div>
      <Text variant="body" className="text-text-secondary leading-relaxed">
        {body}
      </Text>
    </section>
  );
}

function CourseDetailSkeleton() {
  return (
    <SafeArea disableBottomPadding className="mx-auto max-w-3xl py-8">
      <Skeleton className="h-5 w-16 rounded-sm" />

      <div className="mt-8">
        <Skeleton className="h-10 w-3/4 rounded-sm" />
        <div className="mt-4 flex items-center gap-2">
          <Skeleton className="h-5 w-40 rounded-sm" />
        </div>
        <Divider className="mt-6" />
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <Skeleton className="h-20 rounded-lg" />
        <Skeleton className="h-20 rounded-lg" />
        <Skeleton className="h-20 rounded-lg" />
      </div>

      <section className="mt-8">
        <Skeleton className="h-6 w-36 rounded-sm" />
        <Skeleton className="mt-3 h-4 w-full rounded-sm" />
        <Skeleton className="mt-2 h-4 w-11/12 rounded-sm" />
        <Skeleton className="mt-2 h-4 w-5/6 rounded-sm" />
      </section>

      <section className="mt-8">
        <Skeleton className="h-6 w-28 rounded-sm" />
        <Skeleton className="mt-3 h-4 w-full rounded-sm" />
        <Skeleton className="mt-2 h-4 w-10/12 rounded-sm" />
      </section>
    </SafeArea>
  );
}

export default function CourseDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [detail, setDetail] = useState<CourseDetail | null | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadDetail() {
      if (!id) {
        setDetail(null);
        return;
      }

      setError(null);
      try {
        const nextDetail = await getCourseDetail(id);
        if (cancelled) return;
        setDetail(nextDetail);
      } catch {
        if (cancelled) return;
        setError("Unable to load course details right now.");
        setDetail(null);
      }
    }

    loadDetail();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (detail === undefined) return <CourseDetailSkeleton />;

  if (detail === null) {
    return (
      <SafeArea disableBottomPadding className="mx-auto max-w-3xl py-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors"
        >
          <Icon name="arrow-left" size={16} />
          <Text variant="body" as="span">
            Back
          </Text>
        </button>
        <div className="mt-16 flex flex-col items-center text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: "var(--sys-color-surface-secondary)" }}
          >
            <Icon name="flag" size={32} className="text-text-muted" />
          </div>
          <Text variant="section" className="font-semibold">
            {error ? "Course details unavailable" : "Course not found"}
          </Text>
          <Text variant="body" className="mt-3 text-text-muted max-w-sm">
            {error ? error : "This course page is not available yet. Try searching for another course."}
          </Text>
          <Button
            variant="secondary"
            size="md"
            className="mt-6"
            onClick={() => router.push("/search")}
          >
            Search courses
          </Button>
        </div>
      </SafeArea>
    );
  }

  return (
    <SafeArea disableBottomPadding className="mx-auto max-w-3xl py-8">
      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors"
      >
        <Icon name="arrow-left" size={16} />
        <Text variant="body" as="span">
          Back
        </Text>
      </button>

      {/* Hero section */}
      <div className="mt-8">
        <Text variant="hero" className="font-semibold text-balance">
          {detail.name}
        </Text>
        <div className="mt-4 flex items-center gap-1.5">
          <Icon name="map-pin" size={16} className="text-text-secondary shrink-0" />
          <Text variant="body" className="text-text-secondary">
            {detail.city}, {detail.state}
          </Text>
        </div>
        <Divider className="mt-6" />
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        <StatCard label="Par" value={String(detail.par ?? 72)} />
        <StatCard label="Yards" value={formatYards(detail.yards ?? 7000)} />
        <StatCard label="Year" value={String(detail.yearOpened)} />
      </div>

      {/* Action buttons */}
      <div className="mt-6 flex flex-wrap gap-3">
        <Button variant="primary" size="md" className="flex-1 sm:flex-none">
          <Icon name="check" size={16} className="mr-2" />
          Mark as Played
        </Button>
        <Button variant="secondary" size="md" className="flex-1 sm:flex-none">
          <Icon name="bookmark" size={16} className="mr-2" />
          Add to Wishlist
        </Button>
      </div>

      {/* Course Character */}
      <DetailSection
        title="Course Character"
        icon="flag"
        body={`${detail.summary} Access: ${detail.access}.`}
      />

      {/* The Layout */}
      <DetailSection
        title="The Layout"
        icon="user"
        body={`Designed by ${detail.designer} and opened in ${detail.yearOpened}. Routing and shot values are shaped by terrain, wind, and green contours.`}
      />

      {/* Location */}
      <DetailSection
        title="Location"
        icon="map-pin"
        body={`${detail.name} is located in ${detail.city}, ${detail.state}.`}
      />

      {/* Spacer for bottom safe area */}
      <div className="h-8" />
    </SafeArea>
  );
}
