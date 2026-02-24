import type { ReactNode } from "react";

type SafeAreaProps = {
  children: ReactNode;
  className?: string;
  disableBottomPadding?: boolean;
};

function joinClasses(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

export default function SafeArea({
  children,
  className,
  disableBottomPadding = false,
}: SafeAreaProps) {
  return (
    <div
      className={joinClasses(className)}
      style={{
        paddingLeft: "var(--sys-spacing-6)",
        paddingRight: "var(--sys-spacing-6)",
        paddingBottom: disableBottomPadding
          ? undefined
          : "var(--sys-spacing-safeBottom)",
      }}
    >
      {children}
    </div>
  );
}
