import "./TutorialPage.css";
import MapPage from "../../pages/Map/MapPage";
import InterestPointDetails from "../../organisms/InterestPointDetails";
import { useEffect, useState } from "react";
import { useInterestPointsStore } from "../../store/interestPointsStore";
import type { InterestPoint } from "../../@types/types";
import TutorialOverlay from "../../organisms/TutorialOverlay/TutorialOverlay";

export default function TutorialPage() {
	const [isOpen, setIsOpen] = useState(false);
	const [showTutorial, setShowTutorial] = useState(true); // à basculer selon besoin
	const isMobile = window.innerWidth < 640; // Pour déterminer si l'écran est mobile

	const { selectedInterestPoint, setSelectedInterestPoint } =
		useInterestPointsStore();

	const toggleDetails = () => {
		setIsOpen(!isOpen);
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

	const stepsDesktop = [
		{
			selector: ".connexion-button",
			title: "Bouton de connexion",
			description: "Si tu as déjà créer un compte, connectez-vous ici pour accéder à toutes les fonctionnalités.",
		},
		{
			selector: ".inscription-button",
			title: "Bouton d'inscription",
			description: "Inscrivez-vous pour accéder à toutes les fonctionnalités.",
			tooltipOffsetWidth: -200,
		},
		{
			selector: ".map-container",
			title: "Carte interactive",
			description: "Clique sur un point d'intérêt pour voir les détails.",
			tooltipOffsetHeight: -150,
		},
		{
			selector: ".search-bar-city",
			title: "Barre de recherche de ville",
			description: "Sélectionne la ville pour afficher les points d'intérêt.",
		},
		{
			selector: ".interest-point-details",
			title: "Fiche d'information",
			description: "Voici les détails d'un lieu sélectionné.",
			tooltipOffsetHeight: -150,
		},
	];

	const stepsMobile = [
		{
			selector: ".connexion-button-mobile ",
			title: "Bouton de connexion",
			description: "Si tu as déjà créer un compte, connectez-vous ici pour accéder à toutes les fonctionnalités.",
		},
		{
			selector: ".inscription-button-mobile",
			title: "Bouton d'inscription",
			description: "Inscrivez-vous pour accéder à toutes les fonctionnalités.",
		},
		{
			selector: ".map-container",
			title: "Carte interactive",
			description: "Clique sur un point d'intérêt pour voir les détails.",
			tooltipOffsetHeight: -250,
		},
		{
			selector: ".search-bar-city",
			title: "Barre de recherche de ville",
			description: "Sélectionne la ville pour afficher les points d'intérêt.",
		},
		{
			selector: ".interest-point-details",
			title: "Fiche d'information",
			description: "Voici les détails d'un lieu sélectionné.",
			tooltipOffsetHeight: -250,
		},
	];

	return (
		<div className="tutorial-container flex flex-col h-full relative grow">
			<MapPage />

			{(isOpen && selectedInterestPoint) && (
					<InterestPointDetails
						interestPoint={selectedInterestPoint}
						onClose={toggleDetails}
						isOpen={false}
					/>
			)}

			{showTutorial && (
				<TutorialOverlay
					steps={isMobile ? stepsMobile : stepsDesktop}
					onClose={() => {
						setShowTutorial(false);
						setSelectedInterestPoint(null); // Nettoyer le point forcé
					}}
				/>
			)}
		</div>
	);
}
