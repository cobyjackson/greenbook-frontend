"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { getProfile, type CourseResult, type UserProfile } from "@/lib/api";
import ProfileHeader from "@/components/profile/ProfileHeader";
import Divider from "@/components/ui/Divider";
import ErrorView from "@/components/ui/ErrorView";
import SafeArea from "@/components/ui/SafeArea";
import Skeleton from "@/components/ui/Skeleton";
import Text from "@/components/ui/Text";
import Icon from "@/components/ui/Icon";

type ProfileTab = "played" | "wishlist";

function ProfileCourseRow({
  course,
  showDivider,
}: {
  course: CourseResult;
  showDivider: boolean;
}) {
  return (
    <article className="w-full py-5 group">
      <Link href={`/course/${course.id}`} className="block">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-y-2">
            <Text
              variant="courseTitle"
              className="font-medium group-hover:underline underline-offset-2"
            >
              {course.name}
            </Text>
            <div className="flex items-center gap-1.5">
              <Icon name="map-pin" size={14} className="text-text-muted shrink-0" />
              <Text variant="body" className="text-text-secondary">
                {course.city}, {course.state}
              </Text>
            </div>
          </div>
          <Icon
            name="arrow-right"
            size={16}
            className="text-text-muted mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
          />
        </div>
      </Link>
      {showDivider ? <Divider className="mt-5" /> : null}
    </article>
  );
}

function ProfileHeaderSkeleton() {
  return (
    <section className="w-full pt-4">
      <div className="flex items-center gap-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="flex flex-col gap-y-2">
          <Skeleton className="h-7 w-40 rounded-sm" />
          <Skeleton className="h-5 w-24 rounded-sm" />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
        <Skeleton className="h-5 w-28 rounded-sm" />
        <Skeleton className="h-5 w-28 rounded-sm" />
      </div>

      <div className="mt-8 flex items-center gap-3">
        <Skeleton className="h-10 w-28 rounded-lg" />
        <Skeleton className="h-10 w-28 rounded-lg" />
      </div>

      <Divider className="mt-6" />
    </section>
  );
}

function ProfileCourseRowSkeleton({ showDivider }: { showDivider: boolean }) {
  return (
    <article className="w-full py-5">
      <div className="flex flex-col gap-y-2">
        <Skeleton className="h-6 w-52 rounded-sm" />
        <Skeleton className="h-5 w-32 rounded-sm" />
      </div>
      {showDivider ? <Divider className="mt-5" /> : null}
    </article>
  );
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<ProfileTab>("played");
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      setError(null);
      setProfile(null);
      try {
        const nextProfile = await getProfile();
        if (cancelled) return;
        setProfile(nextProfile);
      } catch {
        if (cancelled) return;
        setError("Unable to load profile right now.");
      }
    }

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, [retryKey]);

  let content: ReactNode;

  if (!profile && !error) {
    content = (
      <>
        <ProfileHeaderSkeleton />
        <div className="mt-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <ProfileCourseRowSkeleton
              key={`profile-skeleton-${index}`}
              showDivider={index < 4}
            />
          ))}
        </div>
      </>
    );
  } else if (error) {
    content = (
      <ErrorView
        message={error}
        onRetry={() => setRetryKey((value) => value + 1)}
      />
    );
  } else {
    const resolvedProfile = profile!;
    const courses =
      activeTab === "played" ? resolvedProfile.played : resolvedProfile.wishlist;

    content = (
      <>
        <ProfileHeader
          name={resolvedProfile.name}
          username={resolvedProfile.username}
          followers={resolvedProfile.played.length * 19}
          following={resolvedProfile.wishlist.length * 7}
          playedCount={resolvedProfile.played.length}
          wishlistCount={resolvedProfile.wishlist.length}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="mt-2">
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <ProfileCourseRow
                key={course.id}
                course={course}
                showDivider={index < courses.length - 1}
              />
            ))
          ) : (
            <div className="flex min-h-56 flex-col items-center justify-center gap-y-3 text-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--sys-color-surface-secondary)" }}
              >
                <Icon
                  name={activeTab === "played" ? "check" : "bookmark"}
                  size={24}
                  className="text-text-muted"
                />
              </div>
              <Text variant="courseTitle">
                {activeTab === "played" ? "No courses played yet" : "No courses wishlisted"}
              </Text>
              <Text variant="body" className="text-text-muted max-w-xs">
                {activeTab === "played"
                  ? "Start tracking your golf journey by marking courses you've played."
                  : "Save courses you dream of playing to your wishlist."}
              </Text>
              <Link
                href="/search"
                className="mt-2 inline-flex items-center gap-2 font-medium text-text-primary underline underline-offset-4 hover:text-text-secondary transition-colors"
                style={{
                  fontFamily: "var(--sys-typography-family-sans)",
                  fontSize: "var(--sys-typography-body-size)",
                }}
              >
                Discover courses
              </Link>
            </div>
          )}
        </div>
      </>
    );
  }

  return <SafeArea className="mx-auto max-w-3xl py-8">{content}</SafeArea>;
}
