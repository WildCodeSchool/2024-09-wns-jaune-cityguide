import { useEffect, useState } from "react";
import type { InterestPoint } from "../../@types/types";
import MapComponent from "../../organisms/MapComponent";
import { useInterestPointsStore } from "../../store/interestPointsStore";
import InterestPointDetails from "../../organisms/InterestPointDetails";

export default function MapPage() {
	const [isOpen, setIsOpen] = useState(false);
	const { selectedInterestPoint, setSelectedInterestPoint } =
		useInterestPointsStore();

	const toggleDetails = () => {
		setIsOpen(!isOpen);
	};

	const handleSelectPoint = (interestPoint: InterestPoint) => {
		setSelectedInterestPoint(interestPoint);
		setIsOpen(true);
	};

	useEffect(() => {
		if (!selectedInterestPoint) {
			setIsOpen(false);
		}
	}, [selectedInterestPoint]);

	return (
		<>
			<div className="map-container flex grow items-center">
				<MapComponent onSelectPoint={handleSelectPoint} />
			</div>

			<div className="home-container flex flex-col h-full relative grow">
				{isOpen && selectedInterestPoint && (
					<InterestPointDetails
						interestPoint={selectedInterestPoint}
						onClose={toggleDetails}
					/>
				)}
			</div>
		</>
	);
}
