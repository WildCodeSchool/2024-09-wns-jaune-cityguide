import { create } from "zustand";
import { client } from "../main";
import { GET_CITIES } from "../libs/graphql/operations";
import type { City } from "../@types/types";

type CitiesState = {
	cities: City[];
	selectedCity: City | null;
	isLoading: boolean;
	isLoaded: boolean;
	fetchCities: () => Promise<void>;
	setSelectedCity: (city: City | null) => void;
};

export const useCitiesStore = create<CitiesState>((set) => ({
	cities: [],
	selectedCity: null,
	isLoaded: false,
	isLoading: false,

	fetchCities: async () => {
		set({ isLoading: true });
		try {
			const { data } = await client.query({
				query: GET_CITIES,
				fetchPolicy: "network-only",
			});
			if (data?.getCities) {
				set({
					cities: data.getCities,
					isLoading: false,
				});
			} else {
				set({ isLoading: false });
			}
		} catch (error) {
			console.error("Error occurred while fetching cities:", error);
			set({ isLoading: false });
		}
	},
	setSelectedCity: (city) => set({ selectedCity: city }),
}));
