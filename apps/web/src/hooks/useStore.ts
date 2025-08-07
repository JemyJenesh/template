import type { User } from "@repo/shared/schemas";
import { create } from "zustand";

type UserWithToken = User & {
  token: string;
};

type State = {
  loading: boolean;
  user?: UserWithToken;
  updateUser: (user: UserWithToken) => void;
  removeUser: () => void;
  updateLoading: (loading: boolean) => void;
};

export const useAppStore = create<State>()((set) => ({
  loading: true,
  user: undefined,
  updateUser: (user) => set(() => ({ user })),
  removeUser: () => set(() => ({ user: undefined })),
  updateLoading: (loading) =>
    set(() => ({
      loading,
    })),
}));
