import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../@types/types";

type AuthStore = {
  isAuthenticated: boolean;
  currentUser?: User;
  setAuthenticated: (auth: boolean, user?: User) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      currentUser: undefined,
      setAuthenticated: (auth, user) =>
        set({ isAuthenticated: auth, currentUser: user }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        currentUser: state.currentUser,
      }),
    }
  )
);
