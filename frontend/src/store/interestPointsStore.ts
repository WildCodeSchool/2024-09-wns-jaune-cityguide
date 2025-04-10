import { create } from "zustand";
import { client } from "../main";
import {
	GET_INTEREST_POINTS,
	GET_INTEREST_POINTS_BY_CITY,
} from "../libs/graphql/operations";
import type { InterestPoint } from "../@types/types";

type InterestPointsState = {
	isLoading: boolean;
	interestPoints: InterestPoint[] | [];
	interestPointsByCity: InterestPoint[] | [];
	selectedInterestPoint: InterestPoint | null;
	fetchInterestPoints: () => Promise<void>;
	fetchInterestPointsByCity: (cityId: string) => Promise<void>;
	setSelectedInterestPoint: (point: InterestPoint | null) => void;
};

export const useInterestPointsStore = create<InterestPointsState>((set) => ({
	isLoading: false,
	interestPoints: [],
	interestPointsByCity: [],
	selectedInterestPoint: null,
	fetchInterestPoints: async () => {
		set({ isLoading: true });
		try {
			const { data } = await client.query({
				query: GET_INTEREST_POINTS,
				fetchPolicy: "network-only",
			});
			if (data?.getInterestPoints) {
				set({
					interestPoints: data.getInterestPoints,
					isLoading: false,
				});
				console.log(
					"Interest points fetched successfully:",
					data.getInterestPoints,
				);
			} else {
				set({ isLoading: false });
			}
		} catch (error) {
			console.error("Error occurred while fetching interest points:", error);
			set({ isLoading: false });
		}
	},
	fetchInterestPointsByCity: async (cityId) => {
		set({ isLoading: true });
		try {
			const { data } = await client.query({
				query: GET_INTEREST_POINTS_BY_CITY,
				variables: { cityId },
				fetchPolicy: "network-only",
			});
			if (data?.getInterestPointsByCity) {
				set({
					interestPointsByCity: data.getInterestPointsByCity,
					isLoading: false,
				});
				console.log(
					"Interest points by city fetched successfully:",
					data.getInterestPointsByCity,
				);
			} else {
				set({ isLoading: false });
			}
		} catch (error) {
			console.error(
				"Error occurred while fetching interest points by city:",
				error,
			);
			set({ isLoading: false });
		}
	},
	setSelectedInterestPoint: (interestPoint) =>
		set({ selectedInterestPoint: interestPoint }),
}));
