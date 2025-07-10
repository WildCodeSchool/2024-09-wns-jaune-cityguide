import { type FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	useCreateInterestPointMutation,
	useGetCategoriesQuery,
	type InterestPointInput,
} from "../libs/graphql/generated/graphql-types";
import type { AddressAutocompleteAPIResult } from "../@types/types";
import { useCitiesStore } from "../store/citiesStore";

type NewInterestPointFormProps = {
	isOpen: boolean;
	onClose?: () => void;
};

export default function CreateInterestPointForm({
	isOpen,
	onClose,
}: NewInterestPointFormProps) {
	const { loading, error, data } = useGetCategoriesQuery();
	const { cities } = useCitiesStore();
	const [
		createInterestPoint,
		{ data: createdData, loading: submitting, error: createError },
	] = useCreateInterestPointMutation();

	const [errorMessage, setErrorMessage] = useState<string>("");
	const [userInput, setUserInput] = useState<string>("");
	const [suggestions, setSuggestions] = useState<
		AddressAutocompleteAPIResult[]
	>([]);
	const [dropdownIsOpen, setDropdownIsOpen] = useState<boolean>(false);
	const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
	const [selectedAddress, setSelectedAddress] =
		useState<AddressAutocompleteAPIResult | null>(null);
	const [formCityId, setFormCityId] = useState<string>("");

	const [showPopup, setShowPopup] = useState(false);
	const [popupMessage, setPopupMessage] = useState<string[]>([]);

	const inputRef = useRef<HTMLInputElement>(null);
	const resultRefs = useRef<(HTMLLIElement | null)[]>([]);
	const isFromSelectionRef = useRef(false);

	const navigate = useNavigate();

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
					}&terr=DOMTOM%2CMETROPOLE&type=StreetAddress&maximumResponses=10`,
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

	const handleSelect = (address: AddressAutocompleteAPIResult) => {
		isFromSelectionRef.current = true;
		setErrorMessage("");
		setSelectedAddress(address);
		setUserInput(address.fulltext);
		setDropdownIsOpen(false);

		const matchedCity = cities.find((city) => {
			const cityNameMatch =
				city.name.toLowerCase().trim() === address.city.toLowerCase().trim();
			const postalCodeMatch =
				city.postalCode.slice(0, 2) === address.zipcode.slice(0, 2);
			return cityNameMatch && postalCodeMatch;
		});

		if (matchedCity) {
			setFormCityId(matchedCity.id);
		} else {
			setErrorMessage(
				"La ville sélectionnée n'existe pas dans la base de données.",
			);
			setFormCityId("");
			console.log("City not found in the database:", address.city);
		}
	};

	const handleSubmit = async (evt: FormEvent) => {
		evt.preventDefault();
		const form = evt.target as HTMLFormElement;
		const formData = new FormData(form);
		const formJson = Object.fromEntries(formData.entries());

		const formattedData = {
			...formJson,
			latitude: Number.parseFloat(formJson.latitude as string),
			longitude: Number.parseFloat(formJson.longitude as string),
			city: formCityId,
			address: selectedAddress?.fulltext,
		};

		console.log(formattedData);
		try {
			const result = await createInterestPoint({
				variables: {
					data: formattedData as InterestPointInput,
				},
			});

			if (result?.data?.createInterestPoint) {
				console.log("Interest point created successfully");
			}
		} catch (err) {
			console.error("Erreur lors de la création :", err);
		}
	};

	useEffect(() => {
		if (!createdData) return;

		setPopupMessage(["Félicitations, point d'intérêt créé avec succès ! 🎉"]);
		setShowPopup(true);

		const timer = setTimeout(() => {
			setShowPopup(false);
			onClose?.();
			navigate("/map");
		}, 3000);

		return () => clearTimeout(timer);
	}, [createdData, navigate, onClose]);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (!dropdownIsOpen || suggestions.length === 0) return;
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setHighlightedIndex((prev) => (prev + 1) % suggestions.length);
		}
		if (e.key === "ArrowUp") {
			e.preventDefault();
			setHighlightedIndex(
				(prev) => (prev + suggestions.length - 1) % suggestions.length,
			);
		}
		if (e.key === "Enter") {
			e.preventDefault();
			if (highlightedIndex >= 0) {
				handleSelect(suggestions[highlightedIndex]);
			}
		}
		if (e.key === "Escape") {
			setDropdownIsOpen(false);
		}
	};

	if (error || createError) return <>Error!</>;
	if (loading) return <>Loading...</>;
	if (!data) return <>We couldn't find anything to display</>;

	return (
		<aside
			className={`interest-point-details absolute top-0 right-0 h-full w-full sm:w-1/4 max-w-3xl bg-gray-50 text-black p-4 transform transition-transform duration-300 z-[900] ${
				isOpen ? "translate-x-0" : "translate-x-full"
			} rounded-tl-xl rounded-bl-xl p-6 shadow-xl flex flex-col gap-4 content-center`}
		>
			{showPopup && (
				<div className="fixed bottom-4 right-4 bg-white border border-[#706eeb] px-6 py-3 rounded-xl shadow-xl z-[900]">
					<div className="absolute top-[-12px] left-[-12px] bg-[#706eeb] p-1 rounded-full text-white">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>
					<div className="text-sm text-[#706eeb] font-medium">
						{popupMessage.map((line) => (
							<p key={line} className="mb-2">
								{line}
							</p>
						))}
					</div>
				</div>
			)}
			<form onSubmit={handleSubmit} className="space-y-4 overflow-auto p-2">
				<div className="flex justify-between items-start">
					<h2 className="text-xl font-semibold text-gray-800">
						Créer un point d&rsquo;intérêt
					</h2>
					<button
						type="button"
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700 hover:cursor-pointer"
						aria-label="Fermer"
					>
						✕
					</button>
				</div>

				<div>
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Nom
						</label>
						<input
							name="name"
							className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500 placeholder:text-xs"
							required
							placeholder="Ex : Tour Eiffel"
						/>
					</div>
				</div>

				<div>
					<label
						htmlFor="category"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Catégorie
					</label>
					<select
						name="category"
						className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500"
						required
					>
						<option value="" disabled selected className="text-gray-400">
							Sélectionner une catégorie...
						</option>
						{data.getCategories.map((category) => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))}
					</select>
				</div>

				<div>
					<label
						htmlFor="address"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Adresse
					</label>
					<input
						type="text"
						ref={inputRef}
						value={userInput}
						onChange={(e) => setUserInput(e.target.value)}
						onKeyDown={handleKeyDown}
						className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500 focus:outline-none placeholder:text-xs"
						placeholder="Rechercher une adresse (min. 3 caractères)..."
						required
					/>
					{dropdownIsOpen && suggestions.length > 0 && (
						<ul className="absolute z-10 w-full bg-white border border-gray-400 mt-1 rounded shadow max-h-60 overflow-auto">
							{suggestions.map((item, index) => (
								<li
									key={item.fulltext}
									ref={(el) => {
										resultRefs.current[index] = el;
									}}
									className={`px-4 py-2 cursor-pointer ${highlightedIndex === index ? "bg-indigo-100" : ""}`}
									onClick={() => handleSelect(item)}
									onKeyDown={(e) => {
										if (e.key === "Enter" || e.key === " ") {
											e.preventDefault();
											handleSelect(item);
										}
									}}
								>
									{item.fulltext}
								</li>
							))}
						</ul>
					)}
				</div>
				<div>
					<label
						htmlFor="city"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Ville
					</label>
					<input
						name="city"
						className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100 text-gray-500 cursor-not-allowed placeholder:text-xs"
						required
						disabled
						placeholder="Ville"
						value={selectedAddress?.city || ""}
					/>
					<p className="text-xs text-red-600">{errorMessage}</p>
				</div>

				<div>
					<label
						htmlFor="pictures"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Photos
					</label>
					<input
						name="pictures"
						className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 placeholder:text-xs"
						placeholder="URL de l'image"
					/>
				</div>

				<div>
					<label
						htmlFor="description"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Description
					</label>
					<textarea
						name="description"
						rows={3}
						className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500 placeholder:text-xs"
						placeholder="Brève description du lieu"
						required
					/>
				</div>

				<div>
					<label
						htmlFor="link_url"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Lien (site officiel)
					</label>
					<input
						name="link_url"
						className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500 placeholder:text-xs"
						placeholder="https://..."
					/>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div>
						<input
							type="hidden"
							name="latitude"
							value={selectedAddress?.y ?? ""}
						/>
					</div>

					<div>
						<input
							type="hidden"
							name="longitude"
							value={selectedAddress?.x ?? ""}
						/>
					</div>
				</div>

				<div className="flex justify-between items-center pt-4">
					<button
						type="button"
						onClick={onClose}
						className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100 hover:cursor-pointer"
					>
						Annuler
					</button>

					<button
						type="submit"
						className="bg-indigo-600 text-white px-6 py-2 rounded-md text-sm hover:bg-indigo-700 hover:cursor-pointer"
						disabled={submitting}
					>
						{submitting ? "Création en cours..." : "Créer"}
					</button>
				</div>
			</form>
		</aside>
	);
}
