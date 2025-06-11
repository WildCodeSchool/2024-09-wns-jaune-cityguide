import { useState } from "react";
import type { User } from "../store/userStore";

interface CityCardProps {
	city: {
		id: string | null;
		name: string;
		postalCode: string;
	};
	cityUsers: User[];
	cityAdmins: User[];
}

export function CityStatsCard({ city, cityUsers, cityAdmins }: CityCardProps) {
	const [showDetails, setShowDetails] = useState(false);
	const totalUsers = cityUsers.length + cityAdmins.length;

	return (
		<div className="w-full max-w-xs sm:max-w-sm md:max-w-xs border border-[#706eeb] rounded-2xl bg-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out cursor-pointer">
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
						className="px-3 py-1 text-xs bg-[#706eeb] text-white rounded-full hover:bg-[#5c5acf] transition-colors"
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
							👑 <strong>{cityAdmins.length}</strong> administrateur
							{cityAdmins.length > 1 ? "s" : ""}
						</div>
						<div>
							👤 <strong>{cityUsers.length}</strong>{" "}
							<span className="sm:hidden">utilisateur</span>
							<span className="hidden sm:inline">
								{" "}
								utilisateur{cityUsers.length > 1 ? "s" : ""} standard
							</span>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
