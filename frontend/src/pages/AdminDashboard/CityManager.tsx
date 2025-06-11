import { useEffect, useState } from "react";
import type { City } from "../../@types/types";
import type { User } from "../../store/userStore";
import { useCitiesStore } from "../../store/citiesStore";
import { useUserStore } from "../../store/userStore";
import { CityStatsCard } from "../../atoms/CityStatsCard";

export default function CityManager() {
	const { cities, isLoading } = useCitiesStore();
	const { users } = useUserStore() as { users: User[] };

	const [selectedCity, setSelectedCity] = useState<City | null>(null);

	const [mode, setMode] = useState("view");
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		if (cities.length > 0 && mode === "view") {
			setSelectedCity(cities[0]);
		}
	}, [cities, mode]);

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-64">
				Chargement des villes...
			</div>
		);
	}
	const filteredCities = cities.filter((city) =>
		city.name?.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<div className=" w-full flex flex-col min-h-full text-gray-800 h-full space-y-6 overflow-hidden">
			<div className="flex mb-4 p-6">
				<div className="w-1/2 flex flex-col items-center justify-center relative">
					<label
						className="px-4 py-2 text-[#706EEB] font-medium"
						htmlFor="city-search"
					>
						Rechercher une ville&nbsp;:
					</label>

					<div className="relative w-1/2">
						<input
							id="city-search"
							type="text"
							className="rounded-full p-3 w-full bg-white border-2 border-[#706eeb] placeholder:text-sm text-lg placeholder-gray-400 focus:outline-none focus:border-[#706eeb] pr-12"
							placeholder="Nom de la ville..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						{searchQuery && (
							<button
								type="button"
								className="absolute right-3 top-1/2 -translate-y-1/2 text-[#706eeb] font-bold text-lg ransition-transform duration-200 hover:scale-125"
								onClick={() => setSearchQuery("")}
								aria-label="Effacer la recherche"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="hover:cursor-pointer transition-colors duration-200"
								>
									<title>Annuler la recherche</title>
									<path d="M18 6 6 18" />
									<path d="m6 6 12 12" />
								</svg>
							</button>
						)}
					</div>
				</div>
				<div className="w-1/2 flex items-center justify-center">
					<div className="border-2 border-[#706eeb] text-[#706eeb] rounded-xl px-8 py-6 text-center">
						<div className="text-base mb-2">Nombre de villes&nbsp;:</div>
						<div className="text-3xl font-bold">{cities.length}</div>
					</div>
				</div>
			</div>

			<div className="flex justify-start p-3 w-full">
				<button
					type="button"
					className="bg-[#706EEB] text-white px-4 py-2 rounded-full shadow-md hover:bg-[#5a58d6] cursor-pointer transition"
					onClick={() => {
						setSelectedCity(null);
						setMode("add");
					}}
				>
					+ Ajouter une ville
				</button>
			</div>

			<div className="flex overflow-y-scroll">
				{filteredCities.length === 0 ? (
					<div className="w-full flex items-center justify-center p-12">
						<p className="text-gray-700 text-lg text-center">
							Aucune ville ne correspond à votre recherche.
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-auto p-6 h-[500px]">
						{filteredCities.map((city: City) => {
							const cityUsers = users.filter(
								(user) =>
									user.city.id === Number(city.id) && user.role !== "USER",
							);
							return (
								<CityStatsCard
									key={city.name}
									cityUsers={cityUsers}
									city={city}
								/>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}
