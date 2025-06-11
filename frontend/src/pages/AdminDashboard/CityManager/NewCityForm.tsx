interface NewCityFormProps {
	onCancel: () => void;
}

export function NewCityForm({ onCancel }: NewCityFormProps) {
	return (
		<form className="new-city-form flex flex-col w-full space-y-3">
			<div className="form-header flex w-full items-center justify-center p-4">
				<h3 className="text-2xl font-medium">Ajouter une ville</h3>
			</div>
			<div className="form-body flex flex-col space-y-4">
				<div className="form-group flex flex-col space-y-2">
					<label htmlFor="search">Rechercher par nom ou code postal</label>
					<input
						id="search"
						name="search"
						type="text"
						className="border border-[#706eeb] rounded-sm w-full px-4 py-2 placeholder:text-sm"
						placeholder="Rechercher..."
					/>
				</div>
				<div className="form-group flex flex-col space-y-2">
					<label htmlFor="name">Ville</label>
					<input
						id="name"
						name="name"
						type="text"
						placeholder="Code postal"
						disabled
						className="border border-[#706eeb] bg-gray-100 rounded-sm w-full px-4 py-2 placeholder:text-sm"
					/>
				</div>

				<div className="form-group flex flex-col space-y-2">
					<label htmlFor="postalCode">Code postal</label>
					<input
						id="postalCode"
						name="postalCode"
						type="text"
						placeholder="Code postal"
						disabled
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
							className="border border-[#706eeb] bg-gray-100 rounded-sm w-full px-4 py-2 placeholder:text-sm"
						/>
					</div>
				</div>
			</div>
			<div className="form-footer flex justify-around items-center p-4">
				<button
					type="submit"
					className="bg-[#706eeb] text-white px-6 py-2 rounded-md hover:bg-[#5c5acf] transition-colors"
				>
					Valider
				</button>
				<button
					type="button"
					onClick={() => {
						onCancel();
					}}
					className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-400 transition-colors"
				>
					Annuler
				</button>
			</div>
		</form>
	);
}
