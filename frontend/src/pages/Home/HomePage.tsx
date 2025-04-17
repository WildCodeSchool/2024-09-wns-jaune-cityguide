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
			} as unknown as InterestPoint;
			setSelectedInterestPoint(fakePoint);
			setIsOpen(true);
		}
	}, [setSelectedInterestPoint, showTutorial]);

	const steps = [
		{
			selector: ".inscription-button",
			title: "Bouton d'inscription",
			description: "Inscrivez-vous pour accéder à toutes les fonctionnalités.",
		},
		{
			selector: ".connexion-button",
			title: "Bouton de connexion",
			description: "Si tu as déjà créer un compte, connectez-vous ici pour accéder à toutes les fonctionnalités.",
		},
		{
			selector: ".map-container",
			title: "Carte interactive",
			description: "Clique sur un point d'intérêt pour voir les détails.",
			tooltipOffset: -150,
		},
		{
			selector: ".interest-point-details",
			title: "Fiche d'information",
			description: "Voici les détails d'un lieu sélectionné.",
			tooltipOffset: -150,
		},
	];

	return (
		<div className="home-container flex flex-col h-full relative grow">
			<div className="map-container flex grow items-center">
				<MapComponent onSelectPoint={handleSelectPoint} />
			</div>

			{(isOpen && selectedInterestPoint) && (
					<InterestPointDetails
						interestPoint={selectedInterestPoint}
						onClose={toggleDetails}
						isOpen={false}					/>
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
