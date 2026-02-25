"use client";

import Link from "next/link";
import type { CourseResult as CourseResultData } from "@/lib/api";
import Divider from "@/components/ui/Divider";
import Text from "@/components/ui/Text";

type CourseResultProps = {
  result: CourseResultData;
  showDivider?: boolean;
};

export default function CourseResult({
  result,
  showDivider = true,
}: CourseResultProps) {
  return (
    <article className="w-full py-8">
      <Link href={`/course/${result.id}`} className="block">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-y-2">
            <Text variant="courseTitle" className="font-medium">
              {result.name}
            </Text>
            <Text variant="body">
              {result.city}, {result.state}
            </Text>
          </div>
          {result.meta ? (
            <Text variant="meta" as="span" className="shrink-0 text-text-muted">
              {result.meta}
            </Text>
          ) : null}
        </div>
      </Link>
      {showDivider ? <Divider className="mt-8" /> : null}
    </article>
  );
}
