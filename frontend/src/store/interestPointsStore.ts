import { create } from "zustand";
import { client } from "../main";
import {
	GET_INTEREST_POINTS,
	GET_INTEREST_POINTS_BY_CITY,
	GET_INTEREST_POINT_BY_ID
} from "../libs/graphql/operations";
import type { InterestPoint } from "../libs/graphql/generated/graphql-types";

type InterestPointsState = {
	isLoading: boolean;
	interestPoints: InterestPoint[] | [];
	interestPointsByCity: InterestPoint[] | [];
	selectedInterestPoint: InterestPoint | null;
	fetchInterestPoints: () => Promise<void>;
	fetchInterestPointsByCity: (cityId: string) => Promise<void>;
	fetchInterestPointById: (pointId: string) => Promise<void>;
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
	
	fetchInterestPointById: async (pointId) => {
		set({ isLoading: true });
		try {
			const { data } = await client.query({
				query: GET_INTEREST_POINT_BY_ID,
				variables: { pointId },
				fetchPolicy: "network-only",
			})
			if (data?.getInterestPointById) {
				set({
					selectedInterestPoint: data.getInterestPointById,
					isLoading: false,
				});
				console.log(
					"Interest point by ID fetched successfully:",
					data.getInterestPointById,
				);
			} else {
				set({ isLoading: false });
			}
		} catch (error) { 
			console.error(
				"Error occurred while fetching interest point:",
				error,
			);
			set({ isLoading: false });
		}
	},
	setSelectedInterestPoint: (interestPoint) =>
		set({ selectedInterestPoint: interestPoint }),
}));
