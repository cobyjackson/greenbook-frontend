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
};

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function course(
  name: string,
  city: string,
  state: string,
  meta: string,
): CourseResult {
  return {
    id: slugify(name),
    name,
    city,
    state,
    meta,
  };
}

export const courseResults: CourseResult[] = [
  course("Pine Valley", "Pine Hill", "NJ", "Private"),
  course("National Golf Links of America", "Southampton", "NY", "Private"),
  course("Bethpage Black", "Farmingdale", "NY", "Public"),
  course("Shinnecock Hills", "Southampton", "NY", "Private"),
  course("Cypress Point Club", "Pebble Beach", "CA", "Private"),
  course("Bandon Dunes", "Bandon", "OR", "Resort"),
  course("Oakmont Country Club", "Oakmont", "PA", "Private"),
  course("Sand Hills Golf Club", "Mullen", "NE", "Private"),
  course("Seminole Golf Club", "Juno Beach", "FL", "Private"),
  course("Friar's Head", "Baiting Hollow", "NY", "Private"),
  course("Merion Golf Club (East)", "Ardmore", "PA", "Private"),
  course("Chicago Golf Club", "Wheaton", "IL", "Private"),
];

const courseById = Object.fromEntries(courseResults.map((c) => [c.id, c])) as Record<
  string,
  CourseResult
>;

export const feedEntries: FeedEntry[] = [
  {
    id: "feed-1",
    username: "coby",
    action: "played",
    courseId: slugify("Pine Valley"),
    courseName: "Pine Valley",
    city: "Pine Hill",
    state: "NJ",
    timestamp: "2h",
  },
  {
    id: "feed-2",
    username: "coby",
    action: "wishlisted",
    courseId: slugify("National Golf Links of America"),
    courseName: "National Golf Links of America",
    city: "Southampton",
    state: "NY",
    timestamp: "Yesterday",
  },
  {
    id: "feed-3",
    username: "shaka",
    action: "played",
    courseId: slugify("Bethpage Black"),
    courseName: "Bethpage Black",
    city: "Farmingdale",
    state: "NY",
    timestamp: "3d",
  },
  {
    id: "feed-4",
    username: "coby",
    action: "played",
    courseId: slugify("Shinnecock Hills"),
    courseName: "Shinnecock Hills",
    city: "Southampton",
    state: "NY",
    timestamp: "4d",
  },
  {
    id: "feed-5",
    username: "katie",
    action: "wishlisted",
    courseId: slugify("Cypress Point Club"),
    courseName: "Cypress Point Club",
    city: "Pebble Beach",
    state: "CA",
    timestamp: "Last week",
  },
  {
    id: "feed-6",
    username: "miles",
    action: "played",
    courseId: slugify("Bandon Dunes"),
    courseName: "Bandon Dunes",
    city: "Bandon",
    state: "OR",
    timestamp: "Jan 28",
  },
  {
    id: "feed-7",
    username: "ana",
    action: "played",
    courseId: slugify("Oakmont Country Club"),
    courseName: "Oakmont Country Club",
    city: "Oakmont",
    state: "PA",
    timestamp: "Jan 19",
  },
  {
    id: "feed-8",
    username: "leo",
    action: "wishlisted",
    courseId: slugify("Sand Hills Golf Club"),
    courseName: "Sand Hills Golf Club",
    city: "Mullen",
    state: "NE",
    timestamp: "Jan 14",
  },
  {
    id: "feed-9",
    username: "maya",
    action: "played",
    courseId: slugify("Seminole Golf Club"),
    courseName: "Seminole Golf Club",
    city: "Juno Beach",
    state: "FL",
    timestamp: "Jan 8",
  },
  {
    id: "feed-10",
    username: "jules",
    action: "wishlisted",
    courseId: slugify("Friar's Head"),
    courseName: "Friar's Head",
    city: "Baiting Hollow",
    state: "NY",
    timestamp: "Dec 30",
  },
];

export const userProfile: UserProfile = {
  name: "Coby Antinoro",
  username: "coby",
  played: [
    courseById[slugify("Pine Valley")],
    courseById[slugify("Bethpage Black")],
    courseById[slugify("Shinnecock Hills")],
    courseById[slugify("Bandon Dunes")],
    courseById[slugify("Oakmont Country Club")],
  ],
  wishlist: [
    courseById[slugify("National Golf Links of America")],
    courseById[slugify("Cypress Point Club")],
    courseById[slugify("Sand Hills Golf Club")],
    courseById[slugify("Friar's Head")],
  ],
};

function courseDetail(
  name: string,
  city: string,
  state: string,
  access: string,
  designer: string,
  yearOpened: number,
  summary: string,
): CourseDetail {
  return {
    id: slugify(name),
    name,
    city,
    state,
    access,
    designer,
    yearOpened,
    summary,
  };
}

export const courseDetails: CourseDetail[] = [
  courseDetail(
    "Pine Valley",
    "Pine Hill",
    "NJ",
    "Private",
    "George Crump / H.S. Colt",
    1918,
    "A strategic inland classic known for exacting greenside hazards and demanding angles.",
  ),
  courseDetail(
    "Bethpage Black",
    "Farmingdale",
    "NY",
    "Public",
    "A.W. Tillinghast",
    1936,
    "Championship municipal course with long corridors, deep bunkering, and tournament-scale difficulty.",
  ),
  courseDetail(
    "Bandon Dunes",
    "Bandon",
    "OR",
    "Resort",
    "David McLay Kidd",
    1999,
    "Pacific Northwest links-style golf with firm conditions, wind exposure, and broad strategic options.",
  ),
  courseDetail(
    "Shinnecock Hills",
    "Southampton",
    "NY",
    "Private",
    "William Flynn",
    1931,
    "Historic championship venue with open landscapes, contour-driven greens, and wind-sensitive setup.",
  ),
];
