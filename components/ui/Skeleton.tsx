type SkeletonProps = {
  className?: string;
};

function joinClasses(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <>
      <div
        aria-hidden="true"
        className={joinClasses("bg-surface-secondary", className)}
        style={{ animation: "gb-skeleton-shimmer 1.8s ease-in-out infinite" }}
      />
      <style jsx global>{`
        @keyframes gb-skeleton-shimmer {
          0%,
          100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
