import "./Home.css";
import MapComponent from "../../organisms/MapComponent";
import InterestPointDetails from "../../organisms/InterestPointDetails";
import { useState } from "react";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };
  const handleSelectPoint = (point) => {
    setSelectedPoint(point);
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col flex-1">
      <MapComponent onSelectPoint={handleSelectPoint} />
      <div className="w-full mx-auto">
        {isOpen && (
          <div className="top-full left-0 w-full h-[75vh] overflow-y-auto">
            <InterestPointDetails
              point={selectedPoint}
              onClose={toggleDetails}
            />
          </div>
        )}
      </div>
    </div>
  );
}
