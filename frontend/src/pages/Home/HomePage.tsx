import "./Home.css";
import MapComponent from "../../organisms/MapComponent";
import InterestPointDetails from "../../organisms/InterestPointDetails";
import { useEffect, useState } from "react";
import { useInterestPointsStore } from "../../store/interestPointsStore";
import type { InterestPoint } from "../../@types/types";

export default function HomePage() {
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
		<div className="home-container flex flex-col h-full relative grow">
			<div className="map-container flex grow items-center">
				<MapComponent onSelectPoint={handleSelectPoint} />
			</div>

			{isOpen && selectedInterestPoint && (
				<InterestPointDetails
					interestPoint={selectedInterestPoint}
					onClose={toggleDetails}
				/>
			)}
		</div>
	);
}
