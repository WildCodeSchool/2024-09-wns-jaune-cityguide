import type { User } from "../store/userStore";

interface CityCardProps {
	city: {
		id: string | null;
		name: string;
		postalCode: string;
	};
	cityUsers: User[];
}

export function CityStatsCard({ city, cityUsers }: CityCardProps) {
	return (
		<div className="w-full max-w-xs sm:max-w-sm md:max-w-xs border border-[#706eeb] rounded-2xl bg-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out cursor-pointer">
			<div className="p-4 border-b border-[#706eeb] text-center">
				<h2 className="text-lg md:text-xl font-semibold text-[#333]">
					{city.name}
				</h2>
				<p className="text-sm text-gray-500">{city.postalCode}</p>
			</div>

			<div className="p-4 flex items-center justify-between text-sm sm:text-base">
				<div className="flex items-center gap-2 text-[#706eeb] font-medium">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						className=""
					>
						<title>Utilisateurs</title>
						<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
						<circle cx="12" cy="7" r="4" />
					</svg>
					<span>
						{cityUsers.length} utilisateur{cityUsers.length > 1 ? "s" : ""}
					</span>
				</div>
			</div>
		</div>
	);
}
