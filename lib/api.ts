"use client";

import {
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
import { apiGet } from "./api-client";
import {
  adaptCourseDetail,
  adaptCourseSearchResults,
  type BackendCourseDetailResponse,
  type BackendCourseSearchResponse,
} from "./adapters/course";

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
  const normalized = query.trim();
  if (!normalized) return [];

  const response = await apiGet<BackendCourseSearchResponse>(
    `/courses/search?query=${encodeURIComponent(normalized)}`,
  );
  return adaptCourseSearchResults(response);
}

export async function getProfile(): Promise<UserProfile> {
  await delay(DELAY_MS);
  return userProfile;
}

export async function getCourseDetail(id: string): Promise<CourseDetail | null> {
  const normalizedId = id.trim();
  if (!normalizedId) return null;

  try {
    const response = await apiGet<BackendCourseDetailResponse>(`/courses/${encodeURIComponent(normalizedId)}`);
    return adaptCourseDetail(response);
  } catch (error) {
    if (error instanceof Error && "status" in error && (error as { status?: number }).status === 404) {
      return null;
    }
    throw error;
  }
}
