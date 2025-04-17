import "./Home.css";
import MapComponent from "../../organisms/MapComponent";
import InterestPointDetails from "../../organisms/InterestPointDetails";
import { useEffect, useState } from "react";
import { useInterestPointsStore } from "../../store/interestPointsStore";
import type { InterestPoint } from "../../@types/types";
import TutorialOverlay from "../../organisms/TutorialOverlay/TutorialOverlay";

export default function HomePage() {
	const [isOpen, setIsOpen] = useState(false);
	const [showTutorial, setShowTutorial] = useState(true); // à basculer selon besoin

	const { selectedInterestPoint, setSelectedInterestPoint } =
		useInterestPointsStore();

	const toggleDetails = () => {
		setIsOpen(!isOpen);
	};

	const handleSelectPoint = (interestPoint: InterestPoint) => {
		setSelectedInterestPoint(interestPoint);
		setIsOpen(true);
	};

	// Forcer un point d’intérêt fictif pour le tuto
	useEffect(() => {
		if (showTutorial) {
			const fakePoint = {
				id: "demo",
				name: "Point de démonstration",
				description: "Ceci est un exemple.",
				coordinates: [0, 0],
			} as InterestPoint;
			setSelectedInterestPoint(fakePoint);
			setIsOpen(true);
		}
	}, [showTutorial]);

	const steps = [
		{
			selector: ".map-container",
			title: "Carte interactive",
			description: "Clique sur un point d'intérêt pour voir les détails.",
		},
		{
			selector: ".interest-point-details",
			title: "Fiche d'information",
			description: "Voici les détails d'un lieu sélectionné.",
		},
	];

	return (
		<div className="home-container flex flex-col h-full relative grow">
			<div className="map-container flex grow items-center">
				<MapComponent onSelectPoint={handleSelectPoint} />
			</div>

			{(isOpen && selectedInterestPoint) && (
				<div className="interest-point-details">
					<InterestPointDetails
						interestPoint={selectedInterestPoint}
						onClose={toggleDetails} 
						isOpen={false}					/>
				</div>
			)}

			{showTutorial && (
				<TutorialOverlay
					steps={steps}
					onClose={() => {
						setShowTutorial(false);
						setSelectedInterestPoint(null); // Nettoyer le point forcé
					}}
				/>
			)}
		</div>
	);
}
