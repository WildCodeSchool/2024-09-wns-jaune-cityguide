import { Link } from "react-router-dom";
import "./Home.css";
import InterestPointDetails from "../../organisms/InterestPointDetails";
import { useState } from "react";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <h1>Page d'accueil</h1>
      <div>
        <Link to="/about">Aller à la page À propos</Link>
        <div>
          <button onClick={toggleDetails}>Détails du point d'intérêt</button>
          {isOpen && <InterestPointDetails onClose={toggleDetails} />}
        </div>
      </div>
    </div>
  );
}
