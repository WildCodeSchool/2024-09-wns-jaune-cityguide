// HomePage.tsx
import "./Home.css";
import MapComponent from "../../organisms/MapComponent";
import InterestPointDetails from "../../organisms/InterestPointDetails";
import EditInterestPointModal from "../../organisms/EditInterestPointModal";
import { useEffect, useState } from "react";
import { useInterestPointsStore } from "../../store/interestPointsStore";
import type { InterestPoint } from "../../@types/types";

export default function HomePage() {
	const [isOpen, setIsOpen] = useState(false);
	const { selectedInterestPoint, setSelectedInterestPoint } = useInterestPointsStore();
  const [editModalOpen, setEditModalOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };
  const handleSelectPoint = (interestPoint: InterestPoint) => {
		setSelectedInterestPoint(interestPoint);
		setIsOpen(true);
	};

  const handleSaveEdit = (updatedPoint) => {
    setSelectedInterestPoint(updatedPoint);
    setEditModalOpen(false);
  };

  useEffect(() => {
		if (!selectedInterestPoint) {
			setIsOpen(false);
		}
	}, [selectedInterestPoint]);

	return (
		<div className="home-container flex flex-col h-full relative grow">
			<div className="map-container flex grow items-center">
				<MapComponent onSelectPoint={handleSelectPoint} />
			</div>

			{isOpen && selectedInterestPoint && (
				<InterestPointDetails
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

