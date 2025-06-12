import { useEffect, useRef, useState } from "react";

interface APIResult {
	fulltext: string;
	names: string[];
	zipcode?: string;
	x: number;
	y: number;
}

interface NewCityFormData {
	name: string;
	postalCode: string;
	latitude: number;
	longitude: number;
}

interface NewCityFormProps {
	onCancel: () => void;
}

export function NewCityForm({ onCancel }: NewCityFormProps) {
	const [userInput, setUserInput] = useState<string>("");
	const [suggestions, setSuggestions] = useState<APIResult[]>([]);
	const [dropdownIsOpen, setDropdownIsOpen] = useState<boolean>(false);
	const [selectedCity, setSelectedCity] = useState<APIResult | null>(null);

	const isFromSelectionRef = useRef(false);

	const [formData, setFormData] = useState<NewCityFormData>({
		name: "",
		postalCode: "",
		latitude: 0,
		longitude: 0,
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!selectedCity) return;
		console.log("Submitting city with data:", formData);
	};

	useEffect(() => {
		if (userInput.length < 3 || isFromSelectionRef.current) {
			setSuggestions([]);
			setDropdownIsOpen(false);
			isFromSelectionRef.current = false;
			return;
		}

		const fetchSuggestions = async () => {
			console.log("Fetching suggestions for:", userInput);
			try {
				const response = await fetch(
					`https://data.geopf.fr/geocodage/completion/?text=${
						userInput
					}&terr=METROPOLE&poiType=administratif&type=PositionOfInterest&maximumResponses=10`,
				);
				const data = await response.json();
				console.log("Data:", data);
				if (data?.results) {
					setSuggestions(data.results);
					setDropdownIsOpen(true);
				}
			} catch (error) {
				if (error instanceof Error) {
					console.error("Error fetching suggestions:", error.message);
				} else {
					console.error("Unknown error fetching suggestions:", error);
				}
			}
		};
		const debounce = setTimeout(fetchSuggestions, 300);
		return () => {
			clearTimeout(debounce);
		};
	}, [userInput]);

	const handleSelect = (city: APIResult) => {
		isFromSelectionRef.current = true;
		setSelectedCity(city);
		setUserInput(city.fulltext);
		setSuggestions([]);
		setDropdownIsOpen(false);
	};

	useEffect(() => {
		if (selectedCity) {
			setFormData({
				name: selectedCity.names[0],
				postalCode: selectedCity.zipcode ?? "",
				latitude: selectedCity.y,
				longitude: selectedCity.x,
			});
		}
	}, [selectedCity]);

	return (
		<form
			className="new-city-form flex flex-col w-full space-y-3"
			onSubmit={handleSubmit}
		>
			<div className="form-header flex w-full items-center justify-center p-4">
				<h3 className="text-2xl font-medium">Ajouter une ville</h3>
			</div>
			<div className="form-body flex flex-col space-y-4">
				<div className="form-group relative flex flex-col space-y-2">
					<label htmlFor="search">Rechercher par nom ou code postal</label>
					<input
						id="search"
						name="search"
						type="text"
						value={userInput}
						className="border border-[#706eeb] rounded-sm w-full px-4 py-2 placeholder:text-sm"
						placeholder="Rechercher..."
						autoComplete="off"
						onChange={(e) => setUserInput(e.target.value)}
					/>
					{dropdownIsOpen && suggestions.length > 0 && (
						<ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 z-10 max-h-60 overflow-auto">
							{suggestions.map((city) => (
								<li
									key={city.fulltext}
									className="cursor-pointer px-4 py-2 hover:bg-[#f1f1f1]"
									onClick={() => handleSelect(city)}
									onKeyDown={(e) => {
										if (e.key === "Enter" || e.key === " ") {
											handleSelect(city);
										}
									}}
								>
									<button type="button" onClick={() => handleSelect(city)}>
										{city.fulltext}
									</button>
								</li>
							))}
						</ul>
					)}
				</div>
				<div className="form-group flex flex-col space-y-2">
					<label htmlFor="name">Ville</label>
					<input
						id="name"
						name="name"
						type="text"
						placeholder="Nom de la ville"
						disabled
						value={formData.name}
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
						value={formData.postalCode.toString()}
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
							value={formData.latitude}
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
							value={formData.longitude}
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
