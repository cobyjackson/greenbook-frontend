"use client";

import Link from "next/link";
import type { CourseResult as CourseResultData } from "@/lib/api";
import Divider from "@/components/ui/Divider";
import Text from "@/components/ui/Text";
import Icon from "@/components/ui/Icon";

type CourseResultProps = {
  result: CourseResultData;
  showDivider?: boolean;
};

export default function CourseResult({
  result,
  showDivider = true,
}: CourseResultProps) {
  return (
    <article className="w-full py-5 group">
      <Link href={`/course/${result.id}`} className="block">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-y-2">
            <Text
              variant="courseTitle"
              className="font-medium group-hover:underline underline-offset-2"
            >
              {result.name}
            </Text>
            <div className="flex items-center gap-1.5">
              <Icon name="map-pin" size={14} className="text-text-muted shrink-0" />
              <Text variant="body" className="text-text-secondary">
                {result.city}, {result.state}
              </Text>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 pt-1">
            {result.meta ? (
              <span
                className="inline-flex items-center px-2 py-0.5 rounded-md text-xs"
                style={{
                  backgroundColor: "var(--sys-color-surface-secondary)",
                  fontFamily: "var(--sys-typography-family-sans)",
                  color: "var(--sys-color-text-secondary)",
                }}
              >
                {result.meta}
              </span>
            ) : null}
            <Icon
              name="arrow-right"
              size={16}
              className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </Link>
      {showDivider ? <Divider className="mt-5" /> : null}
    </article>
  );
}
