import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode, useState } from "react";
import type { City } from "../../../@types/types";
import { CityStatsCard } from "../../../atoms/CityStatsCard";
import { UserRole } from "../../../libs/graphql/generated/graphql-types";
import { useCitiesStore } from "../../../store/citiesStore";
import type { User } from "../../../store/userStore";
import { useUserStore } from "../../../store/userStore";

import { Modal } from "../../../organisms/Modal";
import { NewCityForm } from "./NewCityForm";

export default function CityManager() {
	const [modalContent, setModalContent] = useState<ReactNode>(null);
	const [formIsOpen, setFormIsOpen] = useState<boolean>(false);
	const [sortBy, setSortBy] = useState<"name" | "postalCode">("name");

	const { cities, isLoading } = useCitiesStore();
	const { users } = useUserStore() as { users: User[] };
	// const [selectedCity, setSelectedCity] = useState<City | null>(null);

	const openModalWithComponent = (component: ReactNode) => {
		setModalContent(component);
		setFormIsOpen(true);
	};

	const closeModal = () => {
		setModalContent(null);
		setFormIsOpen(false);
	};

	const [searchQuery, setSearchQuery] = useState("");

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-64">
				Chargement des villes...
			</div>
		);
	}
	const filteredCities = cities
		.filter((city) =>
			city.name?.toLowerCase().includes(searchQuery.toLowerCase()),
		)
		.sort((a, b) => {
			if (sortBy === "name") {
				return (a.name ?? "").localeCompare(b.name ?? "");
			}
			if (sortBy === "postalCode") {
				return (a.postalCode ?? "").localeCompare(b.postalCode ?? "");
			}
			return 0;
		});

	return (
		<div className="w-full flex flex-col h-full overflow-auto text-gray-800 space-y-3 md:space-y-6 p-3">
			<div className="flex flex-col md:flex-row p-4 md:gap-0">
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
					<div className="w-full flex items-center justify-center md:hidden">
						<div className="text-[#706eeb] rounded-lg px-3 py-2 text-center text-sm w-fit mx-auto">
							<span className="font-medium">Nombre de villes&nbsp;:</span>{" "}
							{cities.length}
						</div>
					</div>
					<div className="w-full hidden md:flex items-center justify-center">
						<div className="border-2 border-[#706eeb] text-[#706eeb] rounded-xl px-6 py-4 text-center w-full max-w-xs mx-auto">
							<div className="text-base mb-1">Nombre de villes&nbsp;:</div>
							<div className="text-3xl font-bold">{cities.length}</div>
						</div>
					</div>
				</div>
			</div>

			<div className="flex flex-wrap justify-between items-center w-full px-12 sm:px-6">
				<button
					type="button"
					className="bg-[#706EEB] text-white sm:px-2 sm:py-1 px-4 py-2 rounded-full shadow-md hover:bg-[#5a58d6] cursor-pointer transition"
					onClick={() => {
						openModalWithComponent(<NewCityForm onCancel={closeModal} />);
					}}
				>
					+ Ajouter une ville
				</button>
				<div className="mt-4 max-w-md space-y-2">
					<label
						htmlFor="sort-select"
						className="block text-sm font-medium text-gray-600"
					>
						Trier par&nbsp;:
					</label>
					<select
						id="sort-select"
						value={sortBy}
						onChange={(e) => setSortBy(e.target.value as "name" | "postalCode")}
						className="w-full p-2 border-2 border-[#706eeb] rounded-lg bg-white text-gray-800 focus:outline-none"
					>
						<option className="text-sm" value="name">
							Nom de la ville
						</option>
						<option className="text-sm" value="postalCode">
							Code postal
						</option>
					</select>
				</div>
			</div>

			<div className="w-full px-4 sm:px-6 py-3 grow ">
				{filteredCities.length === 0 ? (
					<div className="w-full flex items-center justify-center p-12">
						<p className="text-gray-700 text-lg text-center">
							Aucune ville ne correspond à votre recherche.
						</p>
					</div>
				) : (
					<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2 py-4 sm:px-4 sm:py-6 w-full max-w-screen-xl mx-auto">
						<AnimatePresence>
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
									<motion.div
										key={city.name}
										initial={{ opacity: 0, scale: 0.95 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.95 }}
										transition={{ duration: 0.2 }}
									>
										<CityStatsCard
											cityUsers={cityUsers}
											cityAdmins={cityAdmins}
											city={city}
										/>
									</motion.div>
								);
							})}
						</AnimatePresence>
					</div>
				)}
			</div>
			<Modal isOpen={formIsOpen} onClose={closeModal}>
				{modalContent}
			</Modal>
		</div>
	);
}
