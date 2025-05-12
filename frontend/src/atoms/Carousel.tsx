import { useEffect, useState } from "react";
import { useInterestPointsStore } from "../store/interestPointsStore";

export function Carousel() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const { selectedInterestPoint } = useInterestPointsStore();

	const prevSlide = () => {
		setCurrentIndex((prev) =>
			prev === 0
				? (selectedInterestPoint?.pictures?.length ?? 0) - 1
				: prev - 1,
		);
	};

	const nextSlide = () => {
		setCurrentIndex((prev) =>
			prev === (selectedInterestPoint?.pictures?.length ?? 0) - 1
				? 0
				: prev + 1,
		);
	};

	useEffect(() => {
		const nbOfPictures = selectedInterestPoint?.pictures?.length ?? 0;
		if (currentIndex >= nbOfPictures) {
			setCurrentIndex(0);
		}
	}, [currentIndex, selectedInterestPoint]);

	return (
		<div className="relative w-full sm:w-96 lg:w-110 h-36 lg:h-60 overflow-hidden rounded-xl">
			{(selectedInterestPoint?.pictures?.length ?? 0) > 0 &&
			selectedInterestPoint?.pictures[currentIndex] ? (
				<>
					<img
						src={selectedInterestPoint?.pictures[currentIndex].url}
						alt={selectedInterestPoint?.name}
						className="w-full h-full object-cover"
					/>
					{(selectedInterestPoint?.pictures?.length ?? 0) > 1 && (
						<>
							<button
								type="button"
								className="absolute top-1/2 left-2 transform -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 shadow text-white hover:cursor-pointer hover:bg-gray-700"
								onClick={prevSlide}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="lucide lucide-chevron-left-icon lucide-chevron-left"
								>
									<title>Précédent</title>
									<path d="m15 18-6-6 6-6" />
								</svg>
							</button>
							<button
								type="button"
								className="absolute top-1/2 right-2 transform -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 shadow text-white hover:cursor-pointer hover:bg-gray-700"
								onClick={nextSlide}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="lucide lucide-chevron-right-icon lucide-chevron-right"
								>
									<title>Suivant</title>
									<path d="m9 18 6-6-6-6" />
								</svg>
							</button>
						</>
					)}
				</>
			) : (
				<img
					src="https://placehold.co/200x300"
					alt="Alternative"
					className="w-full h-full object-cover"
				/>
			)}
		</div>
	);
}
