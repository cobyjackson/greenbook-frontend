"use client";

type SegmentedToggleItem = {
  value: string;
  label: string;
};

type SegmentedToggleProps = {
  items: SegmentedToggleItem[];
  value: string;
  onChange: (value: string) => void;
};

export default function SegmentedToggle({
  items,
  value,
  onChange,
}: SegmentedToggleProps) {
  return (
    <div className="inline-flex gap-2 rounded-md border border-divider-primary bg-surface-secondary p-2">
      {items.map((item) => {
        const selected = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onChange(item.value)}
            aria-pressed={selected}
            className={
              selected
                ? "rounded-sm border border-divider-primary bg-surface-primary px-4 py-2 font-medium text-text-primary"
                : "rounded-sm px-4 py-2 font-normal text-text-secondary"
            }
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
