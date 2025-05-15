import "./TutorialPage.css";
import MapPage from "../../pages/Map/MapPage";
import InterestPointDetails from "../../organisms/InterestPointDetails";
import { useEffect, useState } from "react";
import { useInterestPointsStore } from "../../store/interestPointsStore";
import { useMenuStore } from '../../store/menuStore';
import TutorialOverlay from "../../organisms/TutorialOverlay/TutorialOverlay";

export default function TutorialPage() {
	const [isOpen, setIsOpenInterestPoint] = useState(false);
	const { setIsOpen } = useMenuStore();
	const [showTutorial, setShowTutorial] = useState(true);
	const isMobile = window.innerWidth < 640; // Pour déterminer si l'écran est mobile

	const { interestPoints, selectedInterestPoint, setSelectedInterestPoint, fetchInterestPoints } = useInterestPointsStore();

	const toggleDetails = () => {
		setIsOpenInterestPoint(!isOpen);
	};

	useEffect(() => {
		fetchInterestPoints();
	}, [fetchInterestPoints]);

	useEffect(() => {
		if (showTutorial && interestPoints.length > 0) {
			const firstPoint = interestPoints[1];
			setSelectedInterestPoint(firstPoint);
			setIsOpenInterestPoint(true);
			setIsOpen(true);
		}
	}, [setSelectedInterestPoint, showTutorial, interestPoints, setIsOpen]);

	const stepsDesktop = [
		{
			selector: ".tuto-connexion-button",
			title: "Bouton de connexion",
			description: "Déjà inscrit ? Connecte-toi pour profiter de toutes les fonctionnalités !",
			tooltipOffsetWidth: -50,
		},
		{
			selector: ".tuto-inscription-button",
			title: "Bouton d'inscription",
			description: "Rejoins-nous en quelques clics pour débloquer toutes les fonctionnalités du site.",
			tooltipOffsetWidth: -200,
		},
		{
			selector: ".map-container",
			title: "Carte interactive",
			description: "Explore la carte et clique sur un point d’intérêt pour en savoir plus. Chaque lieu cache des infos utiles, des anecdotes, et peut-être ta prochaine découverte coup de cœur.",
			tooltipOffsetHeight: -250,
		},
		{
			selector: ".search-bar-city",
			title: "Barre de recherche de ville",
			description: "Tu veux explorer une ville en particulier ? Tape son nom ici et découvre en un clin d'œil tous les lieux à ne pas manquer. Pratique pour organiser tes visites !",
		},
		{
			selector: ".interest-point-details",
			title: "Fiche d'information",
			description: "Tu as sélectionné un lieu ? Voici tous les détails qui le concernent : description, infos pratiques, et pourquoi il mérite le détour. L’idéal pour préparer ta visite ou simplement satisfaire ta curiosité.",
			tooltipOffsetHeight: -250,
			tooltipOffsetWidth: 75,
			leftAdjustment: 47,
		},
	];

	const stepsMobile = [
		{
			selector: ".tuto-connexion-button-mobile",
			title: "Bouton de connexion",
			description: "Déjà inscrit ? Connecte-toi pour profiter de toutes les fonctionnalités !",
			tooltipOffsetWidth: -100,
		},
		{
			selector: ".tuto-inscription-button-mobile",
			title: "Bouton d'inscription",
			description: "Rejoins-nous en quelques clics pour débloquer toutes les fonctionnalités du site.",
			tooltipOffsetWidth: -100,
			action: () => setIsOpen(false),
		},
		{
			selector: ".map-container",
			title: "Carte interactive",
			description: "Explore la carte et clique sur un point d’intérêt pour en savoir plus. Chaque lieu cache des infos utiles, des anecdotes, et peut-être ta prochaine découverte coup de cœur.",
			tooltipOffsetHeight: -250,
		},
		{
			selector: ".search-bar-city",
			title: "Barre de recherche de ville",
			description: "Tu veux explorer une ville en particulier ? Tape son nom ici et découvre en un clin d'œil tous les lieux à ne pas manquer. Pratique pour organiser tes visites !",
			tooltipOffsetWidth: -75,
		},
		{
			selector: ".interest-point-details",
			title: "Fiche d'information",
			description: "Tu as sélectionné un lieu ? Voici tous les détails qui le concernent : description, infos pratiques, et pourquoi il mérite le détour. L’idéal pour préparer ta visite ou simplement satisfaire ta curiosité.",
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
