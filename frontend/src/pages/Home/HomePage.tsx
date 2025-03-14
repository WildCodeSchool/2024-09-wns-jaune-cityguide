import "./Home.css";
import MapComponent from "../../organisms/MapComponent";
import InterestPointDetails from "../../organisms/InterestPointDetails";
import { useState } from "react";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };
	return (
		<div>
			<MapComponent />
      <div>
          <button onClick={toggleDetails}>Détails du point d'intérêt</button>
          {isOpen && <InterestPointDetails onClose={toggleDetails} />}
        </div>
		</div>
	);
}
