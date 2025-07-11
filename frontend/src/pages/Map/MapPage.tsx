
import { useEffect, useState } from "react";
import EditInterestPointForm from "../../organisms/EditInterestPointForm";
import InterestPointDetails from "../../organisms/InterestPointDetails";
import CreateInterestPointForm from "../../organisms/CreateInterestPointForm";
import MapComponent from "../../organisms/MapComponent";
import SearchBar from "../../atoms/SearchBar";
import type { InterestPoint } from "../../libs/graphql/generated/graphql-types";
import { useInterestPointsStore } from "../../store/interestPointsStore";
import { useUserStore } from "../../store/userStore";
import { UserRole } from "../../libs/graphql/generated/graphql-types";


export default function MapPage() {
	// const [isOpen, setIsOpen] = useState(false);
	const user = useUserStore((state) => state.user);
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

	console.log("user connecté :", user)
  console.log("role du user connecté", user?.role)

	return (
		<div className="map-page-container relative flex flex-col h-full w-full overflow-hidden">
			<div className="search-bar-container absolute z-10 top-5 left-1/2 -translate-x-1/2 w-11/12 max-w-md flex items-center justify-between gap-2 sm:w-1/2 sm:justify-center sm:gap-0">
				<div className="flex-grow">
					<SearchBar />
				</div>
				{(user?.role === UserRole.SuperAdmin || user?.role === UserRole.CityAdmin) && (
					<button
						onClick={() => setCreateModalOpen(true)}
						className="cursor-pointer primary-bg text-white px-4 py-2 h-10 rounded-md text-sm font-medium border border-gray-300 shadow-xl hover:bg-indigo-700 transition-all sm:ml-4 w-auto whitespace-nowrap"
					>
						+ Créer
					</button>
				)}

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
			(user?.role === UserRole.SuperAdmin || user?.role === UserRole.CityAdmin) && (
				<EditInterestPointForm
					interestPoint={selectedInterestPoint}
					onClose={() => setEditModalOpen(false)}
					onSave={handleSaveEdit}
				/>
			)
			)}

			{createModalOpen && (
				(user?.role === UserRole.SuperAdmin || user?.role === UserRole.CityAdmin) && (
				<CreateInterestPointForm
					isOpen={createModalOpen}
					onClose={() => setCreateModalOpen(false)} />
				)
			)}
		</div>

	);
}

