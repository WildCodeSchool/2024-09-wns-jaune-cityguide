import { motion } from "framer-motion";
import { type ReactNode, useState } from "react";
import { type City, UserRole } from "../libs/graphql/generated/graphql-types";
import { Modal } from "../organisms/Modal";
import { EditCityForm } from "../pages/AdminDashboard/CityManager/EditCityForm";
import { useUserStore } from "../store/userStore";

interface CityCardProps {
	city: City;
}

export function CityStatsCard({ city }: CityCardProps) {
	const { users } = useUserStore();
	const [showDetails, setShowDetails] = useState<boolean>(false);
	const [formIsOpen, setFormIsOpen] = useState<boolean>(false);
	const [modalContent, setModalContent] = useState<ReactNode>(null);

	const cityUsers = users.filter(
		(user) => Number(user.city?.id) === Number(city.id),
	);
	const standardCityUsers = cityUsers.filter(
		(user) => user.role === UserRole.User,
	);
	const cityAdmins = cityUsers.filter(
		(user) => user.role === UserRole.CityAdmin,
	);
	const totalUsers = standardCityUsers.length + cityAdmins.length;

	const openModalWithComponent = (component: ReactNode) => {
		setModalContent(component);
		setFormIsOpen(true);
	};

	const closeModal = () => {
		setModalContent(null);
		setFormIsOpen(false);
	};

	return (
		<motion.div
			layout
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{
				layout: { duration: 0.3, ease: "easeInOut" },
				opacity: { duration: 0.2 },
			}}
			className="relative w-full max-w-xs sm:max-w-sm md:max-w-xs border border-[#706eeb] rounded-2xl bg-white shadow-xl cursor-pointer"
		>
			<button
				type="button"
				className="absolute top-2 right-2 p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:cursor-pointer hover:scale-125 transition-transform duration-200"
				title="Afficher les informations détaillées"
				onClick={() => {
					openModalWithComponent(<EditCityForm city={city} />);
				}}
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
				>
					<title>Afficher les informations détaillées</title>
					<circle cx="11" cy="11" r="8" />
					<line x1="21" y1="21" x2="16.65" y2="16.65" />
				</svg>
			</button>

			<div className="p-4 border-b border-[#706eeb] text-center">
				<h2 className="text-lg md:text-xl font-semibold text-[#333]">
					{city.name}
				</h2>
				<p className="text-sm text-gray-500">{city.postalCode}</p>
			</div>

			<div className="p-4 text-sm sm:text-base flex flex-col gap-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2 text-[#706eeb] font-medium">
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
						>
							<title>Utilisateurs</title>
							<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
							<circle cx="12" cy="7" r="4" />
						</svg>
						<span>
							{totalUsers}
							<span className="hidden sm:inline">
								{" "}
								utilisateur{totalUsers > 1 ? "s" : ""}
							</span>
						</span>
					</div>

					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							setShowDetails(!showDetails);
						}}
						className="px-3 py-1 text-xs bg-[#706eeb] text-white rounded-full hover:bg-[#5c5acf] transition-colors hover: cursor-pointer"
					>
						<span className="block sm:hidden">{showDetails ? "−" : "＋"}</span>
						<span className="hidden sm:block">
							{showDetails ? "− Masquer" : "＋ Détails"}
						</span>
					</button>
				</div>

				{showDetails && (
					<div className="ml-1 mt-1 text-xs text-gray-600 space-y-1">
						<div>
							👑 <strong>{cityAdmins.length}</strong>
							<span className="hidden sm:inline">
								{" "}
								administrateur{cityAdmins.length > 1 ? "s" : ""}
							</span>
							<span className="sm:hidden">
								{" "}
								admin{cityAdmins.length > 1 ? "s" : ""}
							</span>
						</div>
						<div>
							👤 <strong>{standardCityUsers.length}</strong>
							<span className="sm:hidden">
								{" "}
								utilisateur{standardCityUsers.length > 1 ? "s" : ""}
							</span>
							<span className="hidden sm:inline">
								{" "}
								utilisateur{standardCityUsers.length > 1 ? "s" : ""} standard
							</span>
						</div>
					</div>
				)}
			</div>
			<Modal isOpen={formIsOpen} onClose={closeModal}>
				{modalContent}
			</Modal>
		</motion.div>
	);
}
