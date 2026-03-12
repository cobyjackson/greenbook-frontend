import Divider from "@/components/ui/Divider";
import Text from "@/components/ui/Text";
import Icon from "@/components/ui/Icon";

type ProfileTab = "played" | "wishlist";

type ProfileHeaderProps = {
  name: string;
  username: string;
  followers: number;
  following: number;
  playedCount: number;
  wishlistCount: number;
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
};

function ToggleButton({
  label,
  count,
  tab,
  activeTab,
  onTabChange,
  icon,
}: {
  label: string;
  count: number;
  tab: ProfileTab;
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
  icon: "check" | "bookmark";
}) {
  const isActive = activeTab === tab;

  return (
    <button
      type="button"
      onClick={() => onTabChange(tab)}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-150 ${
        isActive
          ? "bg-text-primary text-surface-primary"
          : "bg-surface-secondary text-text-secondary hover:text-text-primary"
      }`}
    >
      <Icon name={icon} size={16} />
      <span
        className="font-medium"
        style={{
          fontFamily: "var(--sys-typography-family-sans)",
          fontSize: "14px",
        }}
      >
        {label}
      </span>
      <span
        className={`px-1.5 py-0.5 rounded text-xs font-medium ${
          isActive ? "bg-surface-primary/20 text-surface-primary" : "bg-surface-primary text-text-secondary"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

export default function ProfileHeader({
  name,
  username,
  followers,
  following,
  playedCount,
  wishlistCount,
  activeTab,
  onTabChange,
}: ProfileHeaderProps) {
  return (
    <section className="w-full pt-4">
      {/* Avatar and name */}
      <div className="flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: "var(--sys-color-surface-secondary)" }}
        >
          <Icon name="user" size={32} className="text-text-secondary" />
        </div>
        <div className="flex flex-col gap-y-1">
          <Text variant="section" className="font-semibold">
            {name}
          </Text>
          <Text variant="body" className="text-text-muted">
            @{username}
          </Text>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
        <div className="flex items-center gap-1.5">
          <Icon name="users" size={16} className="text-text-muted" />
          <Text variant="body" as="span">
            <span className="font-medium">{followers.toLocaleString()}</span>
            <span className="text-text-secondary"> followers</span>
          </Text>
        </div>
        <div className="flex items-center gap-1.5">
          <Text variant="body" as="span">
            <span className="font-medium">{following.toLocaleString()}</span>
            <span className="text-text-secondary"> following</span>
          </Text>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <ToggleButton
          label="Played"
          count={playedCount}
          tab="played"
          activeTab={activeTab}
          onTabChange={onTabChange}
          icon="check"
        />
        <ToggleButton
          label="Wishlist"
          count={wishlistCount}
          tab="wishlist"
          activeTab={activeTab}
          onTabChange={onTabChange}
          icon="bookmark"
        />
      </div>

      <Divider className="mt-6" />
    </section>
  );
}
