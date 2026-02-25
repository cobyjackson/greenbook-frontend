import type { CourseDetail, CourseResult } from "../mock-data";

type BackendLocation = {
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  latitude?: number | null;
  longitude?: number | null;
};

type BackendCourseSummary = {
  id: number;
  club_name?: string | null;
  course_name?: string | null;
  location?: BackendLocation | null;
};

export type BackendCourseSearchResponse = {
  courseSummaries?: BackendCourseSummary[] | null;
  nextCursor?: string | null;
};

export type BackendCourseDetailResponse = {
  id: number;
  club_name?: string | null;
  course_name?: string | null;
  location?: BackendLocation | null;
};

function fallbackString(value: string | null | undefined, fallback: string) {
  const normalized = value?.trim();
  return normalized ? normalized : fallback;
}

export function adaptCourseSearchResults(response: BackendCourseSearchResponse): CourseResult[] {
  const items = response.courseSummaries ?? [];

  return items.map((course) => {
    const name = fallbackString(course.course_name, fallbackString(course.club_name, "Unnamed Course"));
    const clubName = fallbackString(course.club_name, "");
    const city = fallbackString(course.location?.city, "Unknown");
    const state = fallbackString(course.location?.state, "Unknown");

    return {
      id: String(course.id),
      name,
      city,
      state,
      meta: clubName && clubName !== name ? clubName : "",
    };
  });
}

export function adaptCourseDetail(course: BackendCourseDetailResponse): CourseDetail {
  return {
    id: String(course.id),
    name: fallbackString(course.course_name, fallbackString(course.club_name, "Unnamed Course")),
    city: fallbackString(course.location?.city, "Unknown"),
    state: fallbackString(course.location?.state, "Unknown"),
    access: "Unknown",
    designer: "Unknown",
    yearOpened: 0,
    summary: "Course details are loaded from the backend API. Additional design metadata is not included in this response.",
  };
}
