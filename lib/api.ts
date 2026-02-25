"use client";

import type { CourseDetail, CourseResult, FeedEntry, UserProfile } from "./types";
import { apiGet } from "./api-client";
import {
  adaptCourseDetail,
  adaptCourseSearchResults,
  type BackendCourseDetailResponse,
  type BackendCourseSearchResponse,
} from "./adapters/course";
import { adaptFeed, type BackendFeedPageResponse } from "./adapters/feed";
import { adaptUserProfile, type BackendMeResponse } from "./adapters/profile";
import { adaptPlayedCourses, type BackendPlayedPageResponse } from "./adapters/played";
import { adaptWishlistCourses, type BackendWishlistPageResponse } from "./adapters/wishlist";

export type { CourseDetail, CourseResult, FeedEntry, UserProfile } from "./types";

export async function getFeed(): Promise<FeedEntry[]> {
  const response = await apiGet<BackendFeedPageResponse>("/feed");
  return adaptFeed(response);
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
  const [me, wishlistPage, playedPage] = await Promise.all([
    apiGet<BackendMeResponse>("/me"),
    apiGet<BackendWishlistPageResponse>("/me/wishlist"),
    apiGet<BackendPlayedPageResponse>("/me/courseplay"),
  ]);

  return adaptUserProfile({
    me,
    wishlist: adaptWishlistCourses(wishlistPage),
    played: adaptPlayedCourses(playedPage),
  });
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
