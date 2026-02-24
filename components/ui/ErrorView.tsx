import Text from "@/components/ui/Text";

type ErrorViewProps = {
  message: string;
  onRetry?: () => void;
  className?: string;
};

function joinClasses(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

export default function ErrorView({
  message,
  onRetry,
  className,
}: ErrorViewProps) {
  return (
    <div
      className={joinClasses(
        "flex min-h-56 flex-col items-center justify-center gap-y-3 text-center",
        className,
      )}
    >
      <Text variant="body" className="text-text-secondary">
        {message}
      </Text>
      {onRetry ? (
        <button type="button" onClick={onRetry}>
          <Text variant="meta" as="span" className="font-medium text-text-primary">
            Try again
          </Text>
        </button>
      ) : null}
    </div>
  );
}
