import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { InterestPoint } from "../@types/types";
import { useInterestPointsStore } from "../store/interestPointsStore";
import { Carousel } from "../atoms/Carousel";
import EditInterestPointForm from "../organisms/EditInterestPointForm"
import { useDeleteInterestPointByIdMutation } from "../libs/graphql/generated/graphql-types";

type InterestPointSheetProps = {
	isOpen: boolean;
	interestPoint: InterestPoint | null;
	onClose: () => void;
};

export default function InterestPointDetails({
	isOpen,
	onClose,
}: InterestPointSheetProps) {
	const { selectedInterestPoint } = useInterestPointsStore();
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const navigate = useNavigate();
	const [deleteInterestPoint] = useDeleteInterestPointByIdMutation();

	// Handling click outside of the sheet: https://dev.to/rashed_iqbal/how-to-handle-outside-clicks-in-react-with-typescript-4lmc
	const sheetRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			const currentSheet = sheetRef.current;
			if (currentSheet && !currentSheet.contains(event.target as Node)) {
				onClose();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen, onClose]);

	const handleDelete = async () => {
		if (!selectedInterestPoint) return;
		await deleteInterestPoint({
			variables: { interestPointId: selectedInterestPoint.id.toString() },
		});
		onClose();
		navigate("/map");
	};

	return (
		<>
			<aside
				className={`interest-point-details absolute top-0 right-0 h-full w-full sm:w-1/4 max-w-3xl bg-gray-50 text-black p-4 transform transition-transform duration-300 z-50 ${isOpen ? "translate-x-0" : "translate-x-full"
					} rounded-tl-xl rounded-bl-xl p-6 shadow-xl flex flex-col gap-4 content-center`}
			>
				{isEditing ? (
					<EditInterestPointForm
						interestPoint={selectedInterestPoint}
						onClose={() => setIsEditing(false)} />
				) : (
					<>
						<div className="flex justify-between items-start w-full">
							<button
								type="button"
								onClick={onClose}
								className="cursor-pointer text-gray-800 rounded-full hover:bg-gray-200 hover:text-gray-500 p-1"
								aria-label="Fermer les détails"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="w-4 h-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<path d="M18 6 6 18" />
									<path d="m6 6 12 12" />

								</svg>
							</button>
							<div className="flex gap-2">
								<button
									type="button"
									onClick={() => setIsEditing(true)}
									className="cursor-pointer text-gray-600 hover:text-gray-800 flex items-center gap-1 text-sm"
								><span className="material-symbols-outlined text-xs">
										edit
									</span>

									Modifier
								</button>
								<button
									type="button"
									onClick={handleDelete}
									className="cursor-pointer text-red-600 flex items-center gap-1 text-sm"
								>
									<span className="material-symbols-outlined text-xs">
										delete
									</span>
									Supprimer
								</button>
							</div>
						</div>
						<div className="sheet-header w-full flex items-center justify-center space-x-4 py-4 text-gray-600">
							<div className="h-[1.5px] w-full bg-gray-600 rounded-full flex-grow" />
							<h3 className="text-2xl font-semibold whitespace-nowrap">
								{selectedInterestPoint?.name}
							</h3>
							<div className="h-[1.5px] w-full  bg-gray-600 rounded-full flex-grow" />
						</div>

						<div className="carousel-container w-full flex justify-center">
							<Carousel />
						</div>
						<div className="details-content space-y-4 text-sm sm:text-base">
							{selectedInterestPoint?.description && (
								<p className="text-gray-700 italic">
									{selectedInterestPoint.description}
								</p>
							)}

							{selectedInterestPoint?.address && (
								<div>
									<h4 className="font-semibold text-[#706eeb]">📍&nbsp;Adresse</h4>
									<p>{selectedInterestPoint.address}</p>
								</div>
							)}

							<div className="grid grid-cols-2 gap-4">
								{selectedInterestPoint?.city && (
									<div>
										<h4 className="font-semibold text-[#706eeb]">🏙️&nbsp;Ville</h4>
										<p>{selectedInterestPoint?.city.name}</p>
									</div>
								)}
								{selectedInterestPoint?.category && (
									<div>
										<h4 className="font-semibold text-[#706eeb]">
											📁&nbsp;Catégorie
										</h4>
										<p>{selectedInterestPoint.category.name}</p>
									</div>
								)}
							</div>

							{selectedInterestPoint?.link_url && (
								<div>
									<h4 className="font-semibold text-[#706eeb]">
										🔗&nbsp;Site officiel
									</h4>
									<a
										href={selectedInterestPoint.link_url}
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-600 underline hover:text-blue-800"
									>
										{selectedInterestPoint.link_url}
									</a>
								</div>
							)}
						</div>
					</>
				)}
			</aside>
		</>
	);
}
