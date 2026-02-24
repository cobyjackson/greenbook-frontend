import type { ReactNode } from "react";
import BottomTabBar from "@/components/navigation/BottomTabBar";

export default function TabsLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-surface-primary text-text-primary">
      {children}
      <BottomTabBar />
    </main>
  );
}
