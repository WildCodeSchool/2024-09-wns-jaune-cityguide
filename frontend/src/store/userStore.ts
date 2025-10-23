import { create } from "zustand";
import type { UserRole } from "../libs/graphql/generated/graphql-types";
import { devtools, persist } from "zustand/middleware";
import { client } from "../main";
import { GET_USERS, UPDATE_USER_ROLE } from "../libs/graphql/operations";

export interface User {
	id: string;
	firstname: string;
	lastname: string;
	email: string;
	role: UserRole;
	city: {
		id: number;
		name: string;
	};
}

interface UserStore {
	user: User | null;
	users: User[] | [];
	setUser: (user: User | null) => void;
	updateUser: (data: Partial<User>) => void;
	fetchUsers: () => Promise<void>;
	clearUser: () => void;
	updateUserRole: (userId: string, role: UserRole) => Promise<void>;
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
				updateUser: (data) =>
					set((state) =>
						state.user ? { user: { ...state.user, ...data } } : state,
					),
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
							return data.getUsers;
						}
						set({ isLoading: false });
						return [];
					} catch (error) {
						console.error("Error occurred while fetching users:", error);
						set({ isLoading: false });
					}
				},
				clearUser: () => set({ user: null }),
				updateUserRole: async (userId, role) => {
					set({ isLoading: true });
					try {
						const { data } = await client.mutate({
							mutation: UPDATE_USER_ROLE,
							variables: { userId, data: { role } },
						});
						if (data?.updateUser) {
							set((state) => ({
								users: state.users.map((user) =>
									user.id === userId ? { ...user, role } : user,
								),
								isLoading: false,
							}));
							return data.getUsers;
						}
					} catch (error) {
						console.error("Error updating user role:", error);
						set({ isLoading: false });
						return [];
					}
				},
			}),
			{
				name: "user-store",
			},
		),
	),
);
