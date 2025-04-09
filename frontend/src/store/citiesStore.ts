import { create } from "zustand";
import { client } from "../main";
import { GET_CITIES } from "../libs/graphql/operations";
import type { City } from "../@types/types";

type State = {
	cities: City[];
	isLoaded: boolean;
	isLoading: boolean;
	fetchCities: () => Promise<void>;
};

export const useCitiesStore = create<State>((set, get) => ({
	cities: [],
	isLoaded: false,
	isLoading: false,

	fetchCities: async () => {
		const { isLoaded } = get();
		if (isLoaded) return;
		set({ isLoading: true });
		try {
			const { data } = await client.query({
				query: GET_CITIES,
				fetchPolicy: "network-only",
			});
			if (data?.getCities) {
				set({
					cities: data.getCities,
					isLoaded: true,
					isLoading: false,
				});
				console.log("Cities fetched successfully:", data.getCities);
			} else {
				set({ isLoading: false });
			}
		} catch (error) {
			console.error("Error occurred while fetching cities:", error);
			set({ isLoading: false });
		}
	},
}));
