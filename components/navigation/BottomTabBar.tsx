"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Tab = "feed" | "search" | "profile";

type BottomTabBarProps = {
  activeTab?: Tab;
  onChange?: (tab: Tab) => void;
};

const tabs: Array<{ value: Tab; label: string; href: string }> = [
  { value: "feed", label: "Feed", href: "/feed" },
  { value: "search", label: "Search", href: "/search" },
  { value: "profile", label: "Profile", href: "/profile" },
];

export default function BottomTabBar({
  activeTab,
  onChange,
}: BottomTabBarProps) {
  const pathname = usePathname();
  const detectedTab: Tab = pathname.startsWith("/search")
    ? "search"
    : pathname.startsWith("/profile")
      ? "profile"
      : "feed";
  const currentTab = activeTab ?? detectedTab;

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-t border-divider-primary bg-surface-primary py-4">
      <div className="mx-auto flex max-w-3xl items-center justify-around px-6">
        {tabs.map((tab) => {
          const isActive = tab.value === currentTab;
          return (
            <Link
              key={tab.value}
              onClick={() => onChange?.(tab.value)}
              href={tab.href}
              aria-current={isActive ? "page" : undefined}
              className={
                isActive
                  ? "font-medium text-text-primary transition-colors duration-150"
                  : "font-normal text-text-secondary transition-colors duration-150"
              }
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
