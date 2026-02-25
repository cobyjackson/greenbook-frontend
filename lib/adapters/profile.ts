import type { UserProfile } from "../types";

export type BackendMeResponse = {
  id?: number;
  username?: string | null;
  bio?: string | null;
  name?: string | null;
};

export function adaptUserProfile(params: {
  me: BackendMeResponse;
  played: UserProfile["played"];
  wishlist: UserProfile["wishlist"];
}): UserProfile {
  const { me, played, wishlist } = params;

  return {
    name: me.name?.trim() || me.username?.trim() || "Unknown User",
    username: me.username?.trim() || "unknown",
    played,
    wishlist,
  };
}
