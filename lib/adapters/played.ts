import type { CourseResult } from "../types";
import { adaptCourseSummary, type BackendCourseSummary } from "./course";

export type BackendUserCoursePlayResponse = {
  id: number;
  userId?: number;
  courseSummary?: BackendCourseSummary | null;
  notes?: string | null;
  overallExperience?: number | null;
  courseCondition?: number | null;
  courseDifficulty?: number | null;
  played_at?: string | null;
  tee_time?: string | null;
};

export type BackendPlayedPageResponse = {
  userCoursePlays?: BackendUserCoursePlayResponse[] | null;
  nextCursor?: string | null;
};

export function adaptPlayedCourses(response: BackendPlayedPageResponse): CourseResult[] {
  return (response.userCoursePlays ?? [])
    .map((play) => play.courseSummary)
    .filter((course): course is BackendCourseSummary => Boolean(course))
    .map(adaptCourseSummary);
}
