
import EditInterestPointModal from "../../organisms/EditInterestPointModal";
import { useEffect, useState } from "react";
import type { InterestPoint } from "../../@types/types";
import MapComponent from "../../organisms/MapComponent";
import { useInterestPointsStore } from "../../store/interestPointsStore";
import InterestPointDetails from "../../organisms/InterestPointDetails";
import SearchBar from "../../atoms/SearchBar";

export default function MapPage() {
	const [isOpen, setIsOpen] = useState(false);
	const { selectedInterestPoint, setSelectedInterestPoint } = useInterestPointsStore();
  const [editModalOpen, setEditModalOpen] = useState(false);
	const [sheetIsOpen, setSheetIsOpen] = useState(false);

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
		if (!selectedInterestPoint) {
			// setIsOpen(false);
		}
	}, [selectedInterestPoint]);

	return (
		<div className="map-page-container relative flex flex-col h-full w-full overflow-hidden">
			<div className="search-bar-container absolute z-10 w-1/2 top-5 left-1/2 -translate-x-1/2 flex items-center justify-center sm:w-1/2 sm:max-w-md">
				<SearchBar />
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
        <EditInterestPointModal
          interestPoint={selectedInterestPoint}
          onClose={() => setEditModalOpen(false)}
          onSave={handleSaveEdit}
        />
    )}
</div>
	);
}

