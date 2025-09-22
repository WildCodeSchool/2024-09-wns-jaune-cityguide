import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { InterestPoint } from "../libs/graphql/generated/graphql-types";
import { useInterestPointsStore } from "../store/interestPointsStore";
import { Carousel } from "../atoms/Carousel";
import EditInterestPointForm from "../organisms/EditInterestPointForm";
import DeleteConfirmationModal from "../organisms/DeleteConfirmationModal";
import { useDeleteInterestPointByIdMutation } from "../libs/graphql/generated/graphql-types";
import { UserRole } from "../libs/graphql/generated/graphql-types";
import { useUserStore } from "../store/userStore";

type InterestPointSheetProps = {
	isOpen: boolean;
	interestPoint: InterestPoint | null;
	onClose: () => void;
};

export default function InterestPointDetails({
	isOpen,
	onClose,
	interestPoint,
}: InterestPointSheetProps) {
	const user = useUserStore((state) => state.user);
	const { selectedInterestPoint } = useInterestPointsStore();
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [showDeletedPopup, setShowDeletedPopup] = useState(false);
	const [deletePoint, { data: deletedData }] =
		useDeleteInterestPointByIdMutation();
	const navigate = useNavigate();

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
		try {
			await deletePoint({ variables: { interestPointId: interestPoint.id } });
		} catch (error) {
			console.error("Erreur suppression :", error);
		}
	};

	useEffect(() => {
		if (deletedData?.deleteInterestPointById) {
			setShowConfirm(false);
			setShowDeletedPopup(true);
			setTimeout(() => {
				setShowDeletedPopup(false);
				onClose?.();
				navigate("/map");
			}, 3000);
		}
	}, [deletedData]);

	return (
		<>
			<aside
				className={`interest-point-details absolute top-0 right-0 h-full w-full sm:w-1/4 max-w-3xl bg-gray-50 text-black p-4 transform transition-transform duration-300 z-[900] ${
					isOpen ? "translate-x-0" : "translate-x-full"
				} rounded-tl-xl rounded-bl-xl p-6 shadow-xl flex flex-col gap-4 content-center`}
			>
				{isEditing ? (
					<EditInterestPointForm
						interestPoint={selectedInterestPoint}
						onClose={() => setIsEditing(false)}
					/>
				) : (
					<>
						<div className="flex justify-between items-center w-full">
							<div className="flex gap-2">
								{(user?.role === UserRole.SuperAdmin ||
									user?.role === UserRole.CityAdmin) && (
									<button
										type="button"
										onClick={() => setIsEditing(true)}
										className="cursor-pointer text-gray-600 hover:text-gray-800 flex items-center gap-1 text-sm"
									>
										<span className="material-symbols-outlined text-xs">
											edit
										</span>
										Modifier
									</button>
								)}
								{(user?.role === UserRole.SuperAdmin ||
									user?.role === UserRole.CityAdmin) && (
									<button
										type="button"
										onClick={() => setShowConfirm(true)}
										className="cursor-pointer text-red-600 flex items-center gap-1 text-sm"
									>
										<span className="material-symbols-outlined text-xs">
											delete
										</span>
										Supprimer
									</button>
								)}
							</div>
							<button
								type="button"
								onClick={onClose}
								className="text-gray-500 hover:text-gray-700 hover:cursor-pointer text-lg"
								aria-label="Fermer"
							>
								✕
							</button>
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
									<h4 className="font-semibold text-[#706eeb]">
										📍&nbsp;Adresse
									</h4>
									<p>{selectedInterestPoint.address}</p>
								</div>
							)}

							<div className="grid grid-cols-2 gap-4">
								{selectedInterestPoint?.city && (
									<div>
										<h4 className="font-semibold text-[#706eeb]">
											🏙️&nbsp;Ville
										</h4>
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
			{showConfirm && (
				<DeleteConfirmationModal
					onConfirm={handleDelete}
					onCancel={() => setShowConfirm(false)}
				/>
			)}
			{showDeletedPopup && (
				<div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-[999]">
					Point d’intérêt supprimé avec succès.
				</div>
			)}
		</>
	);
}
