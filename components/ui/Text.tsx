import type { CSSProperties, ElementType, ReactNode } from "react";

type TextVariant = "hero" | "section" | "courseTitle" | "body" | "meta";

type TextProps = {
  variant: TextVariant;
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

type VariantConfig = {
  as: ElementType;
  fontFamily: string;
  fontSize: string;
  lineHeight: string;
  letterSpacing?: string;
  color: string;
};

const VARIANT_STYLES: Record<TextVariant, VariantConfig> = {
  hero: {
    as: "h1",
    fontFamily: "var(--sys-typography-family-serif)",
    fontSize: "var(--sys-typography-hero-size)",
    lineHeight: "var(--sys-typography-hero-lineHeight)",
    letterSpacing: "var(--sys-typography-hero-letterSpacing)",
    color: "var(--sys-color-text-primary)",
  },
  section: {
    as: "h2",
    fontFamily: "var(--sys-typography-family-serif)",
    fontSize: "var(--sys-typography-section-size)",
    lineHeight: "var(--sys-typography-section-lineHeight)",
    color: "var(--sys-color-text-primary)",
  },
  courseTitle: {
    as: "h3",
    fontFamily: "var(--sys-typography-family-serif)",
    fontSize: "var(--sys-typography-courseTitle-size)",
    lineHeight: "var(--sys-typography-courseTitle-lineHeight)",
    color: "var(--sys-color-text-primary)",
  },
  body: {
    as: "p",
    fontFamily: "var(--sys-typography-family-sans)",
    fontSize: "var(--sys-typography-body-size)",
    lineHeight: "var(--sys-typography-body-lineHeight)",
    color: "var(--sys-color-text-primary)",
  },
  meta: {
    as: "span",
    fontFamily: "var(--sys-typography-family-sans)",
    fontSize: "var(--sys-typography-meta-size)",
    lineHeight: "var(--sys-typography-meta-lineHeight)",
    letterSpacing: "var(--sys-typography-meta-letterSpacing)",
    color: "var(--sys-color-text-secondary)",
  },
};

function joinClasses(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

export default function Text({
  variant,
  as,
  className,
  children,
}: TextProps) {
  const config = VARIANT_STYLES[variant];
  const Component = as ?? config.as;

  const style: CSSProperties = {
    fontFamily: config.fontFamily,
    fontSize: config.fontSize,
    lineHeight: config.lineHeight,
    color: config.color,
  };

  if (config.letterSpacing) {
    style.letterSpacing = config.letterSpacing;
  }

  return (
    <Component className={joinClasses(className)} style={style}>
      {children}
    </Component>
  );
}
