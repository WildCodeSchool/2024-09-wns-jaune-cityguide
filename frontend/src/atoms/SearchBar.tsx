import { useState, useRef, useEffect } from "react";
import { useCitiesStore } from "../store/citiesStore";
import { useInterestPointsStore } from "../store/interestPointsStore";
import type { City } from "../@types/types";

// Useful code snippets: how to build a search bar with dropdown menu in React
// https://dev.to/salehmubashar/search-bar-in-react-js-545l
// https://www.freecodecamp.org/news/build-a-dynamic-dropdown-component/

export default function SearchBar() {
	const { cities, setSelectedCity } = useCitiesStore();
	const { fetchInterestPointsByCity } = useInterestPointsStore();

	const [inputText, setInputText] = useState<string>("");
	const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const filteredCities = cities.filter((city) =>
		city.name.toLowerCase().includes(inputText.toLowerCase()),
	);

	const handleCitySelect = (city: City) => {
		setInputText(city.name);
		setSelectedCity(city);
		setDropdownIsOpen(false);
		fetchInterestPointsByCity(city.id);
	};

	useEffect(() => {
		// Useful code snippet: https://stackoverflow.com/questions/63359138/react-closing-a-dropdown-when-click-outside
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setDropdownIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div ref={containerRef} className="relative w-full sm:w-96">
			<input
				ref={inputRef}
				className="w-full px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white border border-gray-300"
				type="search"
				placeholder="Rechercher une ville..."
				value={inputText}
				onChange={(e) => {
					setInputText(e.target.value);
					setDropdownIsOpen(true);
				}}
				onFocus={() => setDropdownIsOpen(true)}
			/>
			{dropdownIsOpen && (
				<ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-30 overflow-y-auto shadow-lg">
					{filteredCities.length > 0 ? (
						filteredCities.map((city) => (
							<li key={city.id}>
								<button
									type="button"
									className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
									onClick={() => handleCitySelect(city)}
								>
									{city.name} ({city.postalCode})
								</button>
							</li>
						))
					) : (
						<li className="px-4 py-2 text-gray-400">Aucune ville trouvée</li>
					)}
				</ul>
			)}
		</div>
	);
}
