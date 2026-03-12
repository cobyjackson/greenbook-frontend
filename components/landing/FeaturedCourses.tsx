import Link from "next/link";
import Text from "@/components/ui/Text";
import Divider from "@/components/ui/Divider";

type CoursePreviewProps = {
  name: string;
  location: string;
  designer: string;
  year: number;
};

function CoursePreview({ name, location, designer, year }: CoursePreviewProps) {
  return (
    <article
      className="p-6 rounded-md transition-all duration-200 hover:bg-surface-secondary group"
      style={{ backgroundColor: "transparent" }}
    >
      <Text variant="courseTitle" as="h3" className="font-medium group-hover:underline underline-offset-2">
        {name}
      </Text>
      <Text variant="body" className="mt-2 text-text-secondary">
        {location}
      </Text>
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
        <Text variant="meta" className="text-text-muted">
          {designer}
        </Text>
        <Text variant="meta" className="text-text-muted">
          Est. {year}
        </Text>
      </div>
    </article>
  );
}

export default function FeaturedCourses() {
  const courses = [
    {
      name: "Pebble Beach Golf Links",
      location: "Pebble Beach, California",
      designer: "Jack Neville & Douglas Grant",
      year: 1919,
    },
    {
      name: "Augusta National Golf Club",
      location: "Augusta, Georgia",
      designer: "Alister MacKenzie & Bobby Jones",
      year: 1933,
    },
    {
      name: "Pinehurst No. 2",
      location: "Pinehurst, North Carolina",
      designer: "Donald Ross",
      year: 1907,
    },
    {
      name: "Cypress Point Club",
      location: "Pebble Beach, California",
      designer: "Alister MacKenzie",
      year: 1928,
    },
  ];

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <Divider className="mb-16" />

        <div className="text-center mb-12">
          <Text variant="section" as="h2" className="font-semibold">
            Legendary Courses
          </Text>
          <Text variant="body" className="mt-3 text-text-secondary max-w-lg mx-auto">
            From championship venues to hidden gems, track your journey through golf&apos;s greatest courses.
          </Text>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {courses.map((course) => (
            <Link href="/search" key={course.name}>
              <CoursePreview {...course} />
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-text-primary font-medium underline underline-offset-4 hover:text-text-secondary transition-colors"
            style={{
              fontFamily: "var(--sys-typography-family-sans)",
              fontSize: "var(--sys-typography-body-size)",
            }}
          >
            Explore all courses
          </Link>
        </div>
      </div>
    </section>
  );
}
