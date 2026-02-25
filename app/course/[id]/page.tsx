"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCourseDetail, type CourseDetail } from "@/lib/api";
import Divider from "@/components/ui/Divider";
import SafeArea from "@/components/ui/SafeArea";
import Skeleton from "@/components/ui/Skeleton";
import Text from "@/components/ui/Text";

function formatYards(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function DetailSection({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <section className="mt-10">
      <Text variant="section" className="font-semibold">
        {title}
      </Text>
      <Text variant="body" className="mt-3 text-text-secondary">
        {body}
      </Text>
    </section>
  );
}

function CourseDetailSkeleton() {
  return (
    <SafeArea disableBottomPadding className="mx-auto max-w-3xl py-12">
      <Skeleton className="h-5 w-16 rounded-sm" />

      <div className="mt-8">
        <Skeleton className="h-12 w-2/3 rounded-sm" />
        <Divider className="mt-6" />
      </div>

      <div className="mt-8">
        <Skeleton className="h-5 w-72 rounded-sm" />
      </div>

      <section className="mt-10">
        <Skeleton className="h-8 w-44 rounded-sm" />
        <Skeleton className="mt-3 h-4 w-full rounded-sm" />
        <Skeleton className="mt-2 h-4 w-11/12 rounded-sm" />
        <Skeleton className="mt-2 h-4 w-5/6 rounded-sm" />
      </section>

      <section className="mt-10">
        <Skeleton className="h-8 w-36 rounded-sm" />
        <Skeleton className="mt-3 h-4 w-full rounded-sm" />
        <Skeleton className="mt-2 h-4 w-10/12 rounded-sm" />
        <Skeleton className="mt-2 h-4 w-4/5 rounded-sm" />
      </section>

      <section className="mt-12">
        <Skeleton className="h-8 w-28 rounded-sm" />
        <Skeleton className="mt-3 h-4 w-2/3 rounded-sm" />
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
      <SafeArea disableBottomPadding className="mx-auto max-w-3xl py-12">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center"
        >
          <Text variant="body" as="span" className="text-text-secondary">
            ← Back
          </Text>
        </button>
        <div className="mt-12">
          <Text variant="section" className="font-semibold">
            {error ? "Course details unavailable" : "Course not found"}
          </Text>
          <Text variant="body" className="mt-3 text-text-muted">
            {error ? error : "This course page is not available yet."}
          </Text>
        </div>
      </SafeArea>
    );
  }

  return (
    <SafeArea disableBottomPadding className="mx-auto max-w-3xl py-12">
      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex items-center"
      >
        <Text variant="body" as="span" className="text-text-secondary">
          ← Back
        </Text>
      </button>

      <div className="mt-8">
        <Text variant="hero" className="font-semibold">
          {detail.name}
        </Text>
        <Divider className="mt-6" />
      </div>

      <div className="mt-8">
        <Text variant="body" className="text-text-secondary">
          {detail.city}, {detail.state} · Par {detail.par ?? 72} · {formatYards(detail.yards ?? 7000)} yards
        </Text>
      </div>

      <DetailSection
        title="Course Character"
        body={`${detail.summary} Access: ${detail.access}.`}
      />

      <DetailSection
        title="The Layout"
        body={`Designed by ${detail.designer} and opened in ${detail.yearOpened}. Routing and shot values are shaped by terrain, wind, and green contours.`}
      />

      <section className="mt-12">
        <Text variant="section" className="font-semibold">
          Location
        </Text>
        <Text variant="body" className="mt-3 text-text-secondary">
          {detail.name} is located in {detail.city}, {detail.state}.
        </Text>
      </section>
    </SafeArea>
  );
}
