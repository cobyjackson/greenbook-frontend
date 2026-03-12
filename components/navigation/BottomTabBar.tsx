"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/ui/Icon";

type Tab = "feed" | "search" | "profile";

type BottomTabBarProps = {
  activeTab?: Tab;
  onChange?: (tab: Tab) => void;
};

const tabs: Array<{ value: Tab; label: string; href: string; icon: "feed" | "search" | "profile" }> = [
  { value: "feed", label: "Feed", href: "/feed", icon: "feed" },
  { value: "search", label: "Search", href: "/search", icon: "search" },
  { value: "profile", label: "Profile", href: "/profile", icon: "profile" },
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
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-t border-divider-primary bg-surface-primary">
      <div className="mx-auto flex max-w-3xl items-center justify-around px-6 py-3">
        {tabs.map((tab) => {
          const isActive = tab.value === currentTab;
          return (
            <Link
              key={tab.value}
              onClick={() => onChange?.(tab.value)}
              href={tab.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex flex-col items-center gap-1 py-1 px-4 rounded-lg transition-all duration-150 ${
                isActive
                  ? "text-text-primary"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <Icon
                name={tab.icon}
                size={22}
                className={isActive ? "opacity-100" : "opacity-70"}
              />
              <span
                className={`text-xs ${isActive ? "font-medium" : "font-normal"}`}
                style={{ fontFamily: "var(--sys-typography-family-sans)" }}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
