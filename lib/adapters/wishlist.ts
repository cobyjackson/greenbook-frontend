import type { CourseResult } from "../types";
import { adaptCourseSummary, type BackendCourseSummary } from "./course";

export type BackendWishlistPageResponse = {
  courseSummaries?: BackendCourseSummary[] | null;
  nextCursor?: string | null;
};

export function adaptWishlistCourses(response: BackendWishlistPageResponse): CourseResult[] {
  return (response.courseSummaries ?? []).map(adaptCourseSummary);
}
