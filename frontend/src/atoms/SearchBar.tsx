import { useState, useRef, useEffect } from "react";
import { useCitiesStore } from "../store/citiesStore";
import { useInterestPointsStore } from "../store/interestPointsStore";
import type { City } from "../@types/types";

export default function SearchBar() {
	const { cities, selectedCity, setSelectedCity } = useCitiesStore();
	const { fetchInterestPointsByCity } = useInterestPointsStore();

	const [inputText, setInputText] = useState<string>("");
	const [dropdownIsOpen, setDropdownIsOpen] = useState<boolean>(false);
	const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

	const inputRef = useRef<HTMLInputElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const resultRefs = useRef<(HTMLLIElement | null)[]>([]);

	const filteredCities = cities.filter((city) =>
		city.name.toLowerCase().includes(inputText.toLowerCase()),
	);

	const handleCitySelect = (city: City) => {
		setInputText(`${city.name} (${city.postalCode})`);
		setSelectedCity(city);
		setDropdownIsOpen(false);
		fetchInterestPointsByCity(city.id);
	};

	// Implement navigating the dropdown with keyboard arrows: https://dev.to/fsniraj/live-search-in-react-js-select-with-mouse-or-keyboard-54nf
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const key = e.key;
		if (!dropdownIsOpen || filteredCities.length === 0) return;
		if (key === "ArrowDown") {
			e.preventDefault();
			const nextIndex = (highlightedIndex + 1) % filteredCities.length;
			setHighlightedIndex(nextIndex);
		}
		if (key === "ArrowUp") {
			e.preventDefault();
			const nextIndex =
				(highlightedIndex + filteredCities.length - 1) % filteredCities.length;
			setHighlightedIndex(nextIndex);
		}
		if (key === "Enter") {
			e.preventDefault();
			if (highlightedIndex >= 0 && highlightedIndex < filteredCities.length) {
				handleCitySelect(filteredCities[highlightedIndex]);
			}
		}
		if (key === "Escape") {
			setDropdownIsOpen(false);
		}
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

	useEffect(() => {
		const element = resultRefs.current[highlightedIndex];
		if (element) {
			element.scrollIntoView({
				block: "nearest",
				behavior: "smooth",
			});
		}
	}, [highlightedIndex]);

	useEffect(() => {
		if (selectedCity) {
			setInputText(`${selectedCity.name} (${selectedCity.postalCode})`);
		}
	}, [selectedCity]);

	return (
		<div ref={containerRef} className="relative w-full sm:w-96">
			<input
				ref={inputRef}
				className="search-bar-city w-full px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white border border-gray-300 shadow-xl transition-all duration-300"
				type="search"
				placeholder="Rechercher une ville..."
				value={inputText}
				onChange={(e) => {
					setInputText(e.target.value);
					setDropdownIsOpen(true);
					setHighlightedIndex(-1);
				}}
				onFocus={() => setDropdownIsOpen(true)}
				onKeyDown={handleKeyDown}
				data-testid="search-bar-input"
			/>
			{dropdownIsOpen && (
				<ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-30 overflow-y-auto shadow-lg">
					{filteredCities.length > 0 ? (
						filteredCities.map((city, index) => (
							<li
								key={city.id}
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
									onClick={() => handleCitySelect(city)}
									data-testid={`city-option-${city.name.toLowerCase()}`}
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
