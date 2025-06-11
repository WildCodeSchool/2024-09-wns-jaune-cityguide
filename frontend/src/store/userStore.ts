import { create } from "zustand";
import type { UserRole } from "../libs/graphql/generated/graphql-types";
import { devtools, persist } from "zustand/middleware";
import { client } from "../main";
import { GET_USERS } from "../libs/graphql/operations";

export interface User {
	id: string;
	firstname: string;
	lastname: string;
	role: UserRole;
	city: {
		id: number;
		name: string;
	};
}

interface UserStore {
	user: User | null;
	users: User[] | [];
	setUser: (user: User) => void;
	fetchUsers: () => Promise<void>;
	clearUser: () => void;
	isLoading: boolean;
}

export const useUserStore = create<UserStore>()(
	devtools(
		persist(
			(set) => ({
				user: null,
				users: [],
				isLoading: false,
				setUser: (user) => set({ user }),
				fetchUsers: async () => {
					set({ isLoading: false });
					try {
						const { data } = await client.query({
							query: GET_USERS,
							fetchPolicy: "network-only",
						});
						if (data?.getUsers) {
							set({
								users: data.getUsers,
								isLoading: false,
							});
						} else {
							set({ isLoading: false });
						}
					} catch (error) {
						console.error("Error occurred while fetching users:", error);
						set({ isLoading: false });
					}
				},
				clearUser: () => set({ user: null }),
			}),
			{
				name: "user-store",
			},
		),
	),
);
