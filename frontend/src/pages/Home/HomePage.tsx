// HomePage.tsx
import "./Home.css";
import MapComponent from "../../organisms/MapComponent";
import InterestPointDetails from "../../organisms/InterestPointDetails";
import EditPointModal from "../../organisms/EditPointModal";
import { useState } from "react";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const toggleDetails = () => setIsOpen(!isOpen);
  const handleSelectPoint = (point) => {
    setSelectedPoint(point);
    setIsOpen(true);
  };

  const handleSaveEdit = (updatedPoint) => {
    setSelectedPoint(updatedPoint);
    setEditModalOpen(false);
  };

  return (
    <div className="flex flex-col flex-1 relative z-0">
      <MapComponent onSelectPoint={handleSelectPoint} />

      <div className="w-full mx-auto z-10">
        {isOpen && selectedPoint && (
          <div className="top-full left-0 w-full h-[75vh] overflow-y-auto">
            <InterestPointDetails
              point={selectedPoint}
              onClose={toggleDetails}
              onEdit={() => setEditModalOpen(true)}
            />
          </div>
        )}
      </div>

      {editModalOpen && selectedPoint && (
        <EditPointModal
          point={selectedPoint}
          onClose={() => setEditModalOpen(false)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}