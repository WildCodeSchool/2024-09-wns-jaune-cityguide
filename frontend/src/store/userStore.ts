import { create } from "zustand";
import { UserRole } from "../libs/graphql/generated/graphql-types";
import { devtools, persist } from "zustand/middleware";

interface User {
  id: string;
  firstname: string;
  role: UserRole;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
        clearUser: () => set({ user: null }),
      }),
      {
        name: "user-store",
      }
    )
  )
);
