export type FeedEntry = {
  id: string;
  username: string;
  action: "played" | "wishlisted";
  courseId: string;
  courseName: string;
  city: string;
  state: string;
  timestamp: string;
};

export type CourseResult = {
  id: string;
  name: string;
  city: string;
  state: string;
  meta: string;
};

export type UserProfile = {
  name: string;
  username: string;
  played: CourseResult[];
  wishlist: CourseResult[];
};

export type CourseDetail = {
  id: string;
  name: string;
  city: string;
  state: string;
  access: string;
  designer: string;
  yearOpened: number;
  summary: string;
  par?: number;
  yards?: number;
};
