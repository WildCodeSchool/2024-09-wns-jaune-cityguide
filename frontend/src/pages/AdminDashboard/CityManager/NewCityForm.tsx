import { useMutation } from "@apollo/client";
import { ApolloError } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { CREATE_CITY } from "../../../libs/graphql/operations";
import { useCitiesStore } from "../../../store/citiesStore";
import type { CityAutocompleteAPIResult } from "../../../@types/types";

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
	const [createCity, { loading }] = useMutation(CREATE_CITY);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const { fetchCities } = useCitiesStore();

	const [userInput, setUserInput] = useState<string>("");
	const [suggestions, setSuggestions] = useState<CityAutocompleteAPIResult[]>(
		[],
	);
	const [dropdownIsOpen, setDropdownIsOpen] = useState<boolean>(false);
	const [selectedCity, setSelectedCity] =
		useState<CityAutocompleteAPIResult | null>(null);
	const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

	const isFromSelectionRef = useRef(false);

	const inputRef = useRef<HTMLInputElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const resultRefs = useRef<(HTMLLIElement | null)[]>([]);

	const [formData, setFormData] = useState<NewCityFormData>({
		name: "",
		postalCode: "",
		latitude: 0,
		longitude: 0,
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrorMessage(null);
		if (!selectedCity) return;
		try {
			const { data } = await createCity({
				variables: {
					data: {
						...formData,
					},
				},
			});
			fetchCities();
			onCancel();
			return data.createCity;
		} catch (error) {
			if (error instanceof ApolloError) {

				if (error.graphQLErrors?.length) {
					const graphQLError = error.graphQLErrors[0];
					console.error("GraphQL Error:", graphQLError);
					if (graphQLError?.extensions?.code === "CITY_ALREADY_EXISTS") {
						setErrorMessage(
							"La ville sélectionnée existe déjà en base de données.",
						);
					} else {
						console.error("GraphQL Error:", graphQLError);
						setErrorMessage(
							"Une erreur est survenue lors de la création de la ville.",
						);
					}
				console.error("GraphQL error:", error.graphQLErrors[0]);
				const badInputError = error.graphQLErrors.find(
					(e) => e.extensions?.code === "BAD_USER_INPUT",
				);
				if (badInputError) {
					setErrorMessage(
						"La ville sélectionnée existe déjà en base de données.",
					);
				} else {
					setErrorMessage(
						"Une erreur est survenue lors de la création de la ville.",
					);
				}
			} else {
				console.error("Unexpected Error:", error);
				setErrorMessage("Une erreur inattendue est survenue.");
			}
		}
	};

	const handleSelect = (city: CityAutocompleteAPIResult) => {
		isFromSelectionRef.current = true;
		setSelectedCity(city);
		setUserInput(city.fulltext);
		setSuggestions([]);
		setDropdownIsOpen(false);
		setErrorMessage(null);
		if (!city.zipcode) {
			setErrorMessage("Le code postal est manquant.");
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const key = e.key;
		if (!dropdownIsOpen || suggestions.length === 0) return;
		if (key === "ArrowDown") {
			e.preventDefault();
			const nextIndex = (highlightedIndex + 1) % suggestions.length;
			setHighlightedIndex(nextIndex);
		}
		if (key === "ArrowUp") {
			e.preventDefault();
			const nextIndex =
				(highlightedIndex + suggestions.length - 1) % suggestions.length;
			setHighlightedIndex(nextIndex);
		}
		if (key === "Enter") {
			e.preventDefault();
			if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
				handleSelect(suggestions[highlightedIndex]);
			}
		}
		if (key === "Escape") {
			setDropdownIsOpen(false);
		}
	};

	useEffect(() => {
		if (userInput.length < 3 || isFromSelectionRef.current) {
			setSuggestions([]);
			setDropdownIsOpen(false);
			isFromSelectionRef.current = false;
			return;
		}

		const fetchSuggestions = async () => {
			try {
				const response = await fetch(
					`https://data.geopf.fr/geocodage/completion/?text=${
						userInput
					}&terr=METROPOLE&poiType=administratif&type=PositionOfInterest&maximumResponses=10`,
				);
				const data = await response.json();
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

	useEffect(() => {
		if (userInput === "") {
			setSelectedCity(null);
			setErrorMessage(null);
			setFormData({
				name: "",
				postalCode: "",
				latitude: 0,
				longitude: 0,
			});
		}
	}, [userInput]);

	return (
		<form
			className="new-city-form flex flex-col w-full space-y-3"
			onSubmit={handleSubmit}
		>
			<div className="form-header flex w-full items-center justify-center p-4">
				<h3 className="text-2xl font-medium">Ajouter une ville</h3>
			</div>
			<div className="form-body flex flex-col space-y-4">
				<div
					ref={containerRef}
					className="form-group relative flex flex-col space-y-2"
				>
					<label htmlFor="search">Rechercher par nom</label>
					<input
						id="search"
						name="search"
						type="text"
						ref={inputRef}
						value={userInput}
						className="border border-[#706eeb] rounded-sm w-full px-4 py-2 placeholder:text-sm"
						placeholder="Rechercher..."
						autoComplete="off"
						onChange={(e) => setUserInput(e.target.value)}
						onKeyDown={handleKeyDown}
					/>
					{dropdownIsOpen && suggestions.length > 0 && (
						<ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 z-10 max-h-60 overflow-auto">
							{suggestions.map((city, index) => (
								<li
									key={city.fulltext}
									className="cursor-pointer px-4 py-2 hover:bg-[#f1f1f1]"
									ref={(element) => {
										resultRefs.current[index] = element;
									}}
								>
									<button
										type="button"
										className={`w-full text-left px-4 py-2 cursor-pointer ${
											highlightedIndex === index
												? "bg-[#b0afe4]"
												: "hover:bg-gray-100"
										}`}
										onClick={() => handleSelect(city)}
									>
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
				{errorMessage && (
					<p className="text-center text-sm text-red-600">{errorMessage}</p>
				)}
			</div>
			<div className="form-footer flex justify-around items-center p-4">
				<button
					type="submit"
					disabled={formData.postalCode === "" || loading}
					className={`px-6 py-2 rounded-md transition-colors flex items-center justify-center gap-2
		${
			formData.postalCode === "" || loading
				? "bg-purple-200 text-gray-500 cursor-not-allowed"
				: "bg-[#706eeb] text-white hover:bg-[#5c5acf]"
		}
	`}
				>
					{loading && (
						<svg
							className="animate-spin h-4 w-4 text-white"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<title>Sauvegarde en cours</title>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							/>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8v8H4z"
							/>
						</svg>
					)}
					<span>{loading ? "En cours..." : "Valider"}</span>
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
