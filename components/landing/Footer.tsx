import Link from "next/link";
import Text from "@/components/ui/Text";
import Divider from "@/components/ui/Divider";
import Icon from "@/components/ui/Icon";

export default function Footer() {
  return (
    <footer className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <Divider className="mb-16" />

        <div className="flex flex-col sm:flex-row items-start justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span
                className="inline-flex items-center justify-center w-10 h-10 rounded-full"
                style={{ backgroundColor: "var(--sys-color-surface-secondary)" }}
              >
                <Icon name="flag" size={20} className="text-text-primary" />
              </span>
              <Text variant="courseTitle" as="span" className="font-medium">
                GreenBook
              </Text>
            </div>
            <Text variant="body" className="text-text-muted max-w-xs">
              Track your golf journey with elegance.
            </Text>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-12 gap-y-6">
            <div className="flex flex-col gap-3">
              <Text variant="meta" as="span" className="font-medium text-text-primary uppercase tracking-wider">
                Product
              </Text>
              <Link href="/feed" className="text-text-secondary hover:text-text-primary transition-colors">
                <Text variant="body" as="span">Feed</Text>
              </Link>
              <Link href="/search" className="text-text-secondary hover:text-text-primary transition-colors">
                <Text variant="body" as="span">Search</Text>
              </Link>
              <Link href="/profile" className="text-text-secondary hover:text-text-primary transition-colors">
                <Text variant="body" as="span">Profile</Text>
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <Text variant="meta" as="span" className="font-medium text-text-primary uppercase tracking-wider">
                Account
              </Text>
              <Link href="/login" className="text-text-secondary hover:text-text-primary transition-colors">
                <Text variant="body" as="span">Sign In</Text>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8" style={{ borderTop: "1px solid var(--sys-color-divider-primary)" }}>
          <Text variant="meta" className="text-text-muted">
            &copy; {new Date().getFullYear()} GreenBook. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  );
}
