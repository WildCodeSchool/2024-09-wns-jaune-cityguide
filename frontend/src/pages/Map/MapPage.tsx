
import { useEffect, useState } from "react";
import EditInterestPointForm from "../../organisms/EditInterestPointForm";
import InterestPointDetails from "../../organisms/InterestPointDetails";
import CreateInterestPointForm from "../../organisms/CreateInterestPointForm";
import MapComponent from "../../organisms/MapComponent";
import SearchBar from "../../atoms/SearchBar";
import type { InterestPoint } from "../../@types/types";
import { useInterestPointsStore } from "../../store/interestPointsStore";

export default function MapPage() {
	// const [isOpen, setIsOpen] = useState(false);
	const { selectedInterestPoint, setSelectedInterestPoint } = useInterestPointsStore();
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [sheetIsOpen, setSheetIsOpen] = useState(false);
	const [createModalOpen, setCreateModalOpen] = useState(false);

	const toggleDetails = () => {
		setSheetIsOpen(!sheetIsOpen);
	};

	const handleSelectPoint = (interestPoint: InterestPoint) => {
		setSelectedInterestPoint(interestPoint);
		setSheetIsOpen(true);
	};

	const handleSaveEdit = (updatedPoint) => {
		setSelectedInterestPoint(updatedPoint);
		setEditModalOpen(false);
	};

	useEffect(() => {
		if (selectedInterestPoint || editModalOpen) {
			setCreateModalOpen(false);
		}
	}, [selectedInterestPoint, editModalOpen]);

	return (
		<div className="map-page-container relative flex flex-col h-full w-full overflow-hidden">
			<div className="search-bar-container absolute z-10 w-1/2 top-5 left-1/2 -translate-x-1/2 flex items-center justify-center sm:w-1/2 sm:max-w-md">
				<SearchBar />
				<button
					onClick={() => {
						setCreateModalOpen(true);
					}}
					className="primary-bg text-white p-2 rounded-md text-sm hover:bg-indigo-700 hover:cursor-pointer"
				>
					+ Créer
				</button>
			</div>

			<div className="map-container flex grow items-center">
				<MapComponent onSelectPoint={handleSelectPoint} />
			</div>

			{selectedInterestPoint && (
				<InterestPointDetails
					isOpen={sheetIsOpen}
					interestPoint={selectedInterestPoint}
					onClose={toggleDetails}
					onEdit={() => setEditModalOpen(true)}
				/>
			)}

			{editModalOpen && selectedInterestPoint && (
				<EditInterestPointForm
					interestPoint={selectedInterestPoint}
					onClose={() => setEditModalOpen(false)}
					onSave={handleSaveEdit}
				/>

			)}

			{createModalOpen && (
				<CreateInterestPointForm
					isOpen={createModalOpen}
					onClose={() => setCreateModalOpen(false)} />
			)}
		</div>

	);
}

