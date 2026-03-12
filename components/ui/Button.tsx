import type { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function joinClasses(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-text-primary text-surface-primary hover:bg-opacity-90 active:bg-opacity-80",
  secondary:
    "bg-surface-secondary text-text-primary border border-divider-primary hover:bg-opacity-80",
  ghost:
    "bg-transparent text-text-primary hover:bg-surface-secondary",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={joinClasses(
        "inline-flex items-center justify-center rounded-md font-medium transition-all duration-150",
        variantStyles[variant],
        sizeStyles[size],
        disabled ? "cursor-not-allowed opacity-50" : "",
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
