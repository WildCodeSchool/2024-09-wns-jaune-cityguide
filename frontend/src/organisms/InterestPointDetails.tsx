import { useState } from "react";
import EditInterestPointModal from "./EditInterestPointModal"; // Assurez-vous d'importer la modal
import type { InterestPoint } from "../@types/types";
import { useInterestPointsStore } from "../store/interestPointsStore";

type InterestPointCardProps = {
	interestPoint: InterestPoint | null;
	onClose: () => void;
};

export default function InterestPointDetails({
	onClose,
}: InterestPointCardProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); 
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

  const handleEditClick = () => {
    setIsModalOpen(true); 
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Fermer la modal
  };

	// TODO: fix mobile view
	return (
		<div className="bg-[#706EEB]/80 flex justify-around h-80 absolute w-full z-10 bottom-0 border-b-2 border-b-white p-3">
			<button
				type="button"
				className="text-white transform pr-0 rounded-full flex justify-end absolute top-3 right-3 sm:top-2 sm:right-2 hover:cursor-pointer hover:bg-gray-200 hover:text-gray-500"
				onClick={onClose}
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
					className="lucide lucide-x-icon lucide-x"
				>
					<title>Fermer le bandeau</title>
					<path d="M18 6 6 18" />
					<path d="m6 6 12 12" />
				</svg>
			</button>
			<div className="carousel-container m-auto">
				<div className="relative w-full sm:w-96 lg:w-110 h-36 lg:h-60 overflow-hidden rounded-xl">
					{(selectedInterestPoint?.pictures?.length ?? 0) > 0 ? (
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
			</div>
			<div className="card-container m-auto flex-col w-full sm:w-96 lg:min-w-110 lg:min-h-60 bg-gray-100 rounded-2xl overflow-y-auto p-3 sm:p-5">
				<div className="card-header flex flex-col bg-gray-300 h-12">
					<p className="text-center font-semibold text-xl max-sm:text-sm m-auto">
						{selectedInterestPoint?.name}
            <span
              className="material-symbols-outlined text-sm absolute right-3 cursor-pointer"
              onClick={handleEditClick} 
            >
              edit
            </span>
						<p className="text-gray-500 text-sm m-auto">
							{selectedInterestPoint?.address}
						</p>
					</p>
				</div>
				<div className="flex flex-col space-y-3">
					<p className="text-base">{selectedInterestPoint?.description}</p>
					<p className="text-sm flex mt-auto">
						Site internet&nbsp;: &nbsp;
						<span>
							<a
								href={selectedInterestPoint?.link_url || "#"}
								target="_blank"
								rel="noopener noreferrer"
							>
								{selectedInterestPoint?.link_url}
							</a>
						</span>
					</p>
				</div>
			</div>
      
      {/* Modal d'édition */}
        {isModalOpen && (
          <EditInterestPointModal
          InterestPointCardProps={InterestPointCardProps} // Passer le point d'intérêt à la modal
            onClose={handleModalClose}
          />
        )}
		</div>
	);
}
