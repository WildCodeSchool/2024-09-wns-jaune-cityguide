import { useMutation } from "@apollo/client";
import { DELETE_CITY } from "../../../libs/graphql/operations";
import { useCitiesStore } from "../../../store/citiesStore";
import { useUserStore } from "../../../store/userStore";
import { useState } from "react";
import {
	type City,
	UserRole,
} from "../../../libs/graphql/generated/graphql-types";

interface EditFormProps {
	city: City;
}

export function EditCityForm({ city }: EditFormProps) {
	const [deleteCity, { loading }] = useMutation(DELETE_CITY);
	const { fetchCities } = useCitiesStore();
	const { updateUserRole } = useUserStore();

	const [userInput, setUserInput] = useState<string>("");
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const { users, fetchUsers } = useUserStore();

	const cityUsers = users.filter(
		(user) => Number(user.city?.id) === Number(city.id),
	);
	const cityAdmins = users.filter(
		(user) =>
			Number(user.city.id) === Number(city.id) &&
			user.role === UserRole.CityAdmin,
	);

	const filteredUsers = cityUsers.filter((user) => {
		const displayedResult =
			`${user.firstname} ${user.lastname} (${user.email})`.toLowerCase();
		return displayedResult.includes(userInput.toLowerCase());
	});

	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (!city.id) return;
		setErrorMessage(null);
		try {
			const { data } = await deleteCity({
				variables: {
					cityId: city.id.toString(),
				},
			});
			console.log("Deleting city with ID:", city.id);
			fetchCities();
			return data.deleteCity;
		} catch (error) {
			console.error("Error deleting city:", error);
			setErrorMessage(
				"Une erreur est survenue lors de la suppression de la ville.",
			);
		}
	};

	const handleAssignAdminRole = async (userId: string) => {
		try {
			await updateUserRole(userId, UserRole.CityAdmin);
			console.log("User role updated for user:", userId);
			fetchUsers();
		} catch (error) {
			console.error("Error updating user role:", error);
		}
	};

	const handleAssignUserRole = async (userId: string) => {
		try {
			await updateUserRole(userId, UserRole.User);
			console.log("User role updated for user:", userId);
			fetchUsers();
		} catch (error) {
			console.error("Error updating user role:", error);
		}
	};

	return (
		<form className="new-city-form relative flex flex-col w-full space-y-3">
			<div className="form-header flex w-full items-center justify-center p-4">
				<h3 className="text-2xl font-medium">{city.name}</h3>
			</div>

			<div className="form-body flex flex-col space-y-4">
				<div className="form-group flex flex-col space-y-2 relative">
					<label htmlFor="search">Ajouter un administrateur</label>
					<input
						id="search"
						type="text"
						placeholder="Rechercher un utilisateur par nom ou prénom"
						value={userInput}
						onChange={(e) => {
							setUserInput(e.target.value);
							setIsDropdownOpen(true);
						}}
						onBlur={() => setTimeout(() => setIsDropdownOpen(false), 150)}
						className="border border-[#706eeb] bg-white rounded-sm px-4 py-2 text-sm"
					/>
					{isDropdownOpen && filteredUsers.length > 0 && (
						<ul className="absolute z-10 top-20 max-h-48 overflow-y-auto w-full border border-[#706eeb] bg-white rounded shadow-md text-sm">
							{filteredUsers.map((user) => (
								<li
									key={user.id}
									className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
								>
									<button
										type="button"
										className="w-full text-left"
										onClick={() => {
											handleAssignAdminRole(user.id);
											setUserInput("");
											setIsDropdownOpen(false);
										}}
									>
										{user.firstname} {user.lastname} ({user.email})
									</button>
								</li>
							))}
						</ul>
					)}
				</div>
				<div className="form-group flex flex-col space-y-2">
					<p>Administrateurs actuels ({cityAdmins.length})</p>
					<div className="rounded-sm space-y-2 min-h-[40px]">
						{cityAdmins.length === 0 ? (
							<p className="text-sm italic text-gray-500">
								Aucun administrateur trouvé pour cette ville.
							</p>
						) : (
							cityAdmins.map((admin) => (
								<div
									key={admin.id}
									className="flex justify-between items-center mb-1"
								>
									<div className="flex items-center gap-2">
										👑
										<span>
											{admin.firstname} {admin.lastname} ({admin.email})
										</span>
									</div>
									<button
										type="button"
										onClick={() => handleAssignUserRole(admin.id)}
										className="text-red-500 hover:text-red-700 hover:cursor-pointer"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
											className=""
										>
											<title>Fermer</title>
											<path d="M18 6 6 18" />
											<path d="m6 6 12 12" />
										</svg>
									</button>
								</div>
							))
						)}
					</div>
				</div>
				<div className="form-group flex flex-col space-y-2">
					<label htmlFor="postalCode">Code postal</label>
					<input
						id="postalCode"
						name="postalCode"
						type="text"
						placeholder="Code postal"
						disabled
						value={city.postalCode}
						className="border border-[#706eeb] bg-gray-100 rounded-sm w-full px-4 py-2 placeholder:text-sm"
					/>
				</div>

				<div className="coordinates flex gap-6">
					<div className="form-group flex flex-col space-y-2 w-1/2">
						<label htmlFor="latitude">Latitude</label>
						<input
							id="latitude"
							name="latitude"
							type="text"
							disabled
							value={city.latitude}
							placeholder="Latitude"
							className="border border-[#706eeb] bg-gray-100 rounded-sm w-full px-4 py-2 placeholder:text-sm"
						/>
					</div>
					<div className="form-group flex flex-col space-y-2 w-1/2">
						<label htmlFor="longitude">Longitude</label>
						<input
							id="longitude"
							name="longitude"
							type="text"
							disabled
							placeholder="Longitude"
							value={city.longitude}
							className="border border-[#706eeb] bg-gray-100 rounded-sm w-full px-4 py-2 placeholder:text-sm"
						/>
					</div>
				</div>
				{errorMessage && (
					<p className="text-center text-sm text-red-600">{errorMessage}</p>
				)}
			</div>

			<div className="form-footer flex justify-around items-center p-4">
				<button
					type="button"
					onClick={handleDelete}
					className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-400 transition-colors hover:cursor-pointer"
				>
					<span>{loading ? "En cours..." : "Supprimer"}</span>
				</button>
			</div>
		</form>
	);
}
