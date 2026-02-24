import Divider from "@/components/ui/Divider";
import Text from "@/components/ui/Text";

type ProfileTab = "played" | "wishlist";

type ProfileHeaderProps = {
  name: string;
  username: string;
  followers: number;
  following: number;
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
};

function ToggleButton({
  label,
  tab,
  activeTab,
  onTabChange,
}: {
  label: string;
  tab: ProfileTab;
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
}) {
  const isActive = activeTab === tab;

  return (
    <button
      type="button"
      onClick={() => onTabChange(tab)}
      className={
        isActive
          ? "border-b-2 border-text-primary pb-2"
          : "border-b-2 border-transparent pb-2"
      }
    >
      <Text
        variant="body"
        as="span"
        className={isActive ? "font-medium text-text-primary" : "text-text-secondary"}
      >
        {label}
      </Text>
    </button>
  );
}

export default function ProfileHeader({
  name,
  username,
  followers,
  following,
  activeTab,
  onTabChange,
}: ProfileHeaderProps) {
  return (
    <section className="w-full pt-2">
      <div className="flex flex-col gap-y-2">
        <Text variant="section" className="font-semibold">
          {name}
        </Text>
        <Text variant="meta" className="text-text-muted">
          @{username}
        </Text>
      </div>

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
        <Text variant="body" as="span">
          {followers} followers
        </Text>
        <Text variant="body" as="span">
          {following} following
        </Text>
      </div>

      <div className="mt-8 flex items-end gap-6">
        <ToggleButton
          label="Played"
          tab="played"
          activeTab={activeTab}
          onTabChange={onTabChange}
        />
        <ToggleButton
          label="Wishlist"
          tab="wishlist"
          activeTab={activeTab}
          onTabChange={onTabChange}
        />
      </div>

      <Divider className="mt-2" />
    </section>
  );
}
