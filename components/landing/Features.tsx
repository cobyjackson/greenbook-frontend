import Text from "@/components/ui/Text";
import Icon from "@/components/ui/Icon";
import Divider from "@/components/ui/Divider";

type FeatureCardProps = {
  icon: "flag" | "search" | "users" | "bookmark";
  title: string;
  description: string;
};

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-start p-6 rounded-md transition-all duration-200 hover:bg-surface-secondary">
      <div
        className="flex items-center justify-center w-12 h-12 rounded-md mb-4"
        style={{ backgroundColor: "var(--sys-color-surface-secondary)" }}
      >
        <Icon name={icon} size={24} className="text-text-primary" />
      </div>
      <Text variant="courseTitle" as="h3" className="font-medium mb-2">
        {title}
      </Text>
      <Text variant="body" className="text-text-secondary">
        {description}
      </Text>
    </div>
  );
}

export default function Features() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <Divider className="mb-16" />

        <div className="text-center mb-12">
          <Text variant="section" as="h2" className="font-semibold">
            Everything You Need
          </Text>
          <Text variant="body" className="mt-3 text-text-secondary max-w-lg mx-auto">
            GreenBook gives you the tools to track your golf journey with elegance and precision.
          </Text>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FeatureCard
            icon="flag"
            title="Track Rounds"
            description="Log every course you play with detailed notes about your experience and performance."
          />
          <FeatureCard
            icon="search"
            title="Discover Courses"
            description="Search through thousands of courses with rich details about designers, layouts, and character."
          />
          <FeatureCard
            icon="bookmark"
            title="Build Your Wishlist"
            description="Save courses you dream of playing and plan your next golf adventure."
          />
          <FeatureCard
            icon="users"
            title="Connect with Golfers"
            description="Follow friends and discover what courses they're playing and recommending."
          />
        </div>
      </div>
    </section>
  );
}
