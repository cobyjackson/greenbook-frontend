import type { FeedEntry } from "../types";
import { adaptCourseSummary, type BackendCourseSummary } from "./course";

type BackendFeedType = "COURSE_PLAYED" | "COURSE_WISHLISTED" | "REVIEW_POSTED";

type BackendFeedItem = {
  id?: number;
  userId?: number;
  username?: string | null;
  happenedAt?: string | null;
  type?: BackendFeedType | string | null;
  payload?: unknown;
};

export type BackendFeedPageResponse = {
  items?: BackendFeedItem[] | null;
  nextCursor?: string | null;
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asCourseSummaryFromUnknown(value: unknown): BackendCourseSummary | null {
  if (!isObject(value)) return null;
  if (typeof value.id !== "number") return null;

  return {
    id: value.id,
    club_name: typeof value.club_name === "string" ? value.club_name : null,
    course_name: typeof value.course_name === "string" ? value.course_name : null,
    location: isObject(value.location)
      ? {
          address: typeof value.location.address === "string" ? value.location.address : null,
          city: typeof value.location.city === "string" ? value.location.city : null,
          state: typeof value.location.state === "string" ? value.location.state : null,
          country: typeof value.location.country === "string" ? value.location.country : null,
          latitude: typeof value.location.latitude === "number" ? value.location.latitude : null,
          longitude: typeof value.location.longitude === "number" ? value.location.longitude : null,
        }
      : null,
  };
}

function extractFeedCourseSummary(item: BackendFeedItem): BackendCourseSummary {
  const payload = item.payload;

  const directCourseSummary = asCourseSummaryFromUnknown(payload);
  if (directCourseSummary) return directCourseSummary;

  if (isObject(payload)) {
    const nestedCourseSummary = asCourseSummaryFromUnknown(payload.courseSummary);
    if (nestedCourseSummary) return nestedCourseSummary;
  }

  throw new Error(`Unsupported backend feed payload shape for item ${String(item.id ?? "unknown")}`);
}

function toFeedAction(value: BackendFeedItem["type"]): FeedEntry["action"] {
  if (value === "COURSE_PLAYED") return "played";
  if (value === "COURSE_WISHLISTED") return "wishlisted";
  throw new Error(`Unsupported backend feed type for current UI: ${String(value)}`);
}

export function adaptFeed(response: BackendFeedPageResponse): FeedEntry[] {
  return (response.items ?? []).map((item) => {
    const courseSummary = extractFeedCourseSummary(item);
    const course = adaptCourseSummary(courseSummary);

    return {
      id: String(item.id ?? `${courseSummary.id}-${item.happenedAt ?? "unknown"}`),
      username: item.username?.trim() || "unknown",
      action: toFeedAction(item.type),
      courseId: String(courseSummary.id),
      courseName: course.name,
      city: course.city,
      state: course.state,
      timestamp: item.happenedAt?.trim() || "",
    };
  });
}
