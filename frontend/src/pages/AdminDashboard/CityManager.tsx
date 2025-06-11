import { useEffect, useState } from "react";
import type { City } from "../../@types/types";
import type { User } from "../../store/userStore";
import { useCitiesStore } from "../../store/citiesStore";
import { useUserStore } from "../../store/userStore";
import { CityStatsCard } from "../../atoms/CityStatsCard";
import { UserRole } from "../../libs/graphql/generated/graphql-types";

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
		<div className=" w-full flex flex-col min-h-full text-gray-800 h-full space-y-3 md:space-y-6 overflow-hidden">
			<div className="flex flex-col md:flex-row mb-4 p-4 gap-4 md:gap-0">
				<div className="w-full md:w-1/2 flex flex-col items-center justify-center relative px-4">
					<label
						className="px-4 py-2 text-[#706EEB] font-medium text-center"
						htmlFor="city-search"
					>
						Rechercher une ville&nbsp;:
					</label>
					<div className="relative w-full max-w-md">
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
								className="absolute right-3 top-1/2 -translate-y-1/2 text-[#706eeb] font-bold text-lg transition-transform duration-200 hover:scale-125"
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
				<div className="w-full md:w-1/2 flex items-center justify-center">
					<div className="border-2 border-[#706eeb] text-[#706eeb] rounded-xl px-4 py-3 md:px-6 md:py-4 text-center w-full max-w-xs mx-auto">
						<div className="text-base mb-1">Nombre de villes&nbsp;:</div>
						<div className="text-3xl font-bold">{cities.length}</div>
					</div>
				</div>
			</div>

			<div className="flex justify-start md:p-3 w-full">
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

			<div className="flex overflow-y-scroll h-[500px]">
				{filteredCities.length === 0 ? (
					<div className="w-full flex items-center justify-center p-12">
						<p className="text-gray-700 text-lg text-center">
							Aucune ville ne correspond à votre recherche.
						</p>
					</div>
				) : (
					<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 sm:px-6 py-6 w-full max-w-screen-xl mx-auto">
						{filteredCities.map((city: City) => {
							const cityUsers = users.filter(
								(user) =>
									Number(user.city.id) === Number(city.id) &&
									user.role === UserRole.User,
							);
							const cityAdmins = users.filter(
								(user) =>
									Number(user.city.id) === Number(city.id) &&
									user.role === UserRole.CityAdmin,
							);
							return (
								<CityStatsCard
									key={city.name}
									cityUsers={cityUsers}
									cityAdmins={cityAdmins}
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
