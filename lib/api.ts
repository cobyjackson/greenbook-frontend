import {
  courseDetails,
  courseResults,
  feedEntries,
  slugify,
  userProfile,
} from "./mock-data";
import type {
  CourseDetail,
  CourseResult,
  FeedEntry,
  UserProfile,
} from "./mock-data";

export type { CourseDetail, CourseResult, FeedEntry, UserProfile };
export { slugify };

const DELAY_MS = 500;

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function getFeed(): Promise<FeedEntry[]> {
  await delay(DELAY_MS);
  return feedEntries;
}

export async function searchCourses(query: string): Promise<CourseResult[]> {
  await delay(DELAY_MS);

  const normalized = query.trim().toLowerCase();
  if (!normalized) return courseResults;

  return courseResults.filter((course) => {
    const haystack = `${course.name} ${course.city} ${course.state} ${course.meta}`.toLowerCase();
    return haystack.includes(normalized);
  });
}

export async function getProfile(): Promise<UserProfile> {
  await delay(DELAY_MS);
  return userProfile;
}

export async function getCourseDetail(id: string): Promise<CourseDetail | null> {
  await delay(DELAY_MS);
  const normalizedId = slugify(id);
  return courseDetails.find((detail) => detail.id === normalizedId) ?? null;
}
