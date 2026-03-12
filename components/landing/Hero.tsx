import Link from "next/link";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231E2B22' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative px-6 py-20 mx-auto max-w-4xl text-center">
        {/* Logo */}
        <div className="mb-8">
          <span
            className="inline-flex items-center justify-center w-16 h-16 rounded-full"
            style={{ backgroundColor: "var(--sys-color-surface-secondary)" }}
          >
            <Icon name="flag" size={32} className="text-text-primary" />
          </span>
        </div>

        {/* Main heading */}
        <Text variant="hero" as="h1" className="font-semibold">
          Your Golf Journey,
          <br />
          <span className="text-text-secondary">Beautifully Tracked</span>
        </Text>

        {/* Subtitle */}
        <p
          className="mt-6 mx-auto max-w-xl"
          style={{
            fontFamily: "var(--sys-typography-family-sans)",
            fontSize: "18px",
            lineHeight: "28px",
            color: "var(--sys-color-text-secondary)",
          }}
        >
          GreenBook is the elegant way to track courses you&apos;ve played,
          discover new ones, and connect with fellow golfers who share your passion.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/feed">
            <Button variant="primary" size="lg" className="w-full sm:w-auto min-w-[180px]">
              Enter GreenBook
              <Icon name="arrow-right" size={18} className="ml-2" />
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto min-w-[180px]">
              Sign In
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-16">
          <div className="text-center">
            <div
              className="font-semibold"
              style={{
                fontFamily: "var(--sys-typography-family-serif)",
                fontSize: "32px",
                lineHeight: "38px",
                color: "var(--sys-color-text-primary)",
              }}
            >
              10K+
            </div>
            <Text variant="meta" className="mt-1 text-text-muted">
              Courses Tracked
            </Text>
          </div>
          <div className="text-center">
            <div
              className="font-semibold"
              style={{
                fontFamily: "var(--sys-typography-family-serif)",
                fontSize: "32px",
                lineHeight: "38px",
                color: "var(--sys-color-text-primary)",
              }}
            >
              5K+
            </div>
            <Text variant="meta" className="mt-1 text-text-muted">
              Active Golfers
            </Text>
          </div>
          <div className="text-center">
            <div
              className="font-semibold"
              style={{
                fontFamily: "var(--sys-typography-family-serif)",
                fontSize: "32px",
                lineHeight: "38px",
                color: "var(--sys-color-text-primary)",
              }}
            >
              50+
            </div>
            <Text variant="meta" className="mt-1 text-text-muted">
              States Covered
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
}
