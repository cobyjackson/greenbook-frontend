"use client";

import { useEffect, useState, type ReactNode } from "react";
import { getProfile, type CourseResult, type UserProfile } from "@/lib/api";
import ProfileHeader from "@/components/profile/ProfileHeader";
import Divider from "@/components/ui/Divider";
import ErrorView from "@/components/ui/ErrorView";
import SafeArea from "@/components/ui/SafeArea";
import Skeleton from "@/components/ui/Skeleton";
import Text from "@/components/ui/Text";

type ProfileTab = "played" | "wishlist";

function ProfileCourseRow({
  course,
  showDivider,
}: {
  course: CourseResult;
  showDivider: boolean;
}) {
  return (
    <article className="w-full py-8">
      <div className="flex flex-col gap-y-2">
        <Text variant="courseTitle" className="font-medium">
          {course.name}
        </Text>
        <Text variant="body">
          {course.city}, {course.state}
        </Text>
      </div>
      {showDivider ? <Divider className="mt-8" /> : null}
    </article>
  );
}

function ProfileHeaderSkeleton() {
  return (
    <section className="w-full pt-2">
      <div className="flex flex-col gap-y-2">
        <Skeleton className="h-8 w-52 rounded-sm" />
        <Skeleton className="h-4 w-20 rounded-sm" />
      </div>

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
        <Skeleton className="h-5 w-28 rounded-sm" />
        <Skeleton className="h-5 w-28 rounded-sm" />
      </div>

      <div className="mt-8 flex items-end gap-6">
        <div className="border-b-2 border-transparent pb-2">
          <Skeleton className="h-5 w-14 rounded-sm" />
        </div>
        <div className="border-b-2 border-transparent pb-2">
          <Skeleton className="h-5 w-16 rounded-sm" />
        </div>
      </div>

      <Divider className="mt-2" />
    </section>
  );
}

function ProfileCourseRowSkeleton({ showDivider }: { showDivider: boolean }) {
  return (
    <article className="w-full py-8">
      <div className="flex flex-col gap-y-2">
        <Skeleton className="h-6 w-52 rounded-sm" />
        <Skeleton className="h-5 w-32 rounded-sm" />
      </div>
      {showDivider ? <Divider className="mt-8" /> : null}
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
            <div className="flex min-h-56 flex-col items-center justify-center gap-y-2 text-center">
              <Text variant="courseTitle">
                {activeTab === "played" ? "No courses played" : "No courses wishlisted"}
              </Text>
              <Text variant="body" className="text-text-muted">
                {activeTab === "played"
                  ? "Your rounds will appear here."
                  : "Courses you want to play will appear here."}
              </Text>
            </div>
          )}
        </div>
      </>
    );
  }

  return <SafeArea className="mx-auto max-w-3xl py-12">{content}</SafeArea>;
}
