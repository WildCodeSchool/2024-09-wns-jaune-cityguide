import { useEffect, useState } from "react";
import type { InterestPoint } from "../../@types/types";
import MapComponent from "../../organisms/MapComponent";
import { useInterestPointsStore } from "../../store/interestPointsStore";
import InterestPointDetails from "../../organisms/InterestPointDetails";
import SearchBar from "../../atoms/SearchBar";

export default function MapPage() {
	const [sheetIsOpen, setSheetIsOpen] = useState(false);
	const { selectedInterestPoint, setSelectedInterestPoint } =
		useInterestPointsStore();

	const toggleDetails = () => {
		setSheetIsOpen(!sheetIsOpen);
	};

	const handleSelectPoint = (interestPoint: InterestPoint) => {
		setSelectedInterestPoint(interestPoint);
		setSheetIsOpen(true);
	};

	useEffect(() => {
		if (!selectedInterestPoint) {
			// setIsOpen(false);
		}
	}, [selectedInterestPoint]);

	return (
		<div className="map-page-container relative flex flex-col h-full w-full overflow-hidden">
			<div className="search-bar-container absolute z-10 w-1/2 top-5 left-1/2 -translate-x-1/2 flex items-center justify-center sm:w-1/2 sm:max-w-md">
				<SearchBar />
			</div>
			<div className="map-container flex grow items-center">
				<MapComponent onSelectPoint={handleSelectPoint} />
			</div>

			{selectedInterestPoint && (
				<InterestPointDetails
					isOpen={sheetIsOpen}
					interestPoint={selectedInterestPoint}
					onClose={toggleDetails}
				/>
			)}
		</div>
	);
}
