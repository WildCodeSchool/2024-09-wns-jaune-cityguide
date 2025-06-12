import type { User } from "../../../store/userStore";

interface EditFormProps {
	city: {
		id: string | null;
		name: string;
		postalCode: string;
		latitude: number;
		longitude: number;
	};
	cityUsers: User[];
}

// TODO: handle adding admin user

export function EditCityForm({ city }: EditFormProps) {
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("");
	};

	return (
		<form
			className="new-city-form relative flex flex-col w-full space-y-3"
			onSubmit={handleSubmit}
		>
			<div className="form-header flex w-full items-center justify-center p-4">
				<h3 className="text-2xl font-medium">{city.name}</h3>
			</div>

			<div className="form-body flex flex-col space-y-4">
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
			</div>

			<div className="form-footer flex justify-around items-center p-4">
				<button
					type="button"
					className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-400 transition-colors hover:cursor-pointer"
				>
					Supprimer
				</button>
			</div>
		</form>
	);
}
