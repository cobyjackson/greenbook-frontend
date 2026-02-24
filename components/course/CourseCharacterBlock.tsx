type CourseCharacterBlockProps = {
  title: string;
  body: string;
};

export default function CourseCharacterBlock({
  title,
  body,
}: CourseCharacterBlockProps) {
  return (
    <section className="w-full border-b border-divider-primary py-6">
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-medium text-text-primary">{title}</h2>
        <p className="text-text-secondary">{body}</p>
      </div>
    </section>
  );
}
