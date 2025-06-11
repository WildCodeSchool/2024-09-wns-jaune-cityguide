import type { User } from "../store/userStore";

interface CityCardProps {
	city: {
		id: string | null;
		name: string;
		postalCode: string;
	};
	cityUsers: User[];
	// showUsers: Record<string, boolean>;
	// toggleUsersList: () => void;
	// setSelectedCity: () => void;
}

export function CityStatsCard({ city, cityUsers }: CityCardProps) {
	return (
		<div className="w-64 border border-[#706eeb] rounded-2xl flex flex-col bg-white hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out hover:cursor-pointer">
			<div className="text-center p-4 border-b border-[#706eeb]">
				<div className="text-lg font-medium">{city.name}</div>
				<div className="text-sm text-gray-600">{city.postalCode}</div>
			</div>

			<div className="p-4">
				<div className="flex justify-between items-center">
					<span className="text-sm font-medium text-gray-700">
						{cityUsers.length} utilisateur
						{cityUsers.length > 1 ? "s" : ""}
					</span>
				</div>
			</div>
		</div>
	);
}
