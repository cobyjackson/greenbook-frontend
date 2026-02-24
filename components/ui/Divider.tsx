type DividerProps = {
  className?: string;
};

export default function Divider({ className }: DividerProps) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{ borderBottom: "1px solid var(--sys-color-divider-primary)" }}
    />
  );
}
