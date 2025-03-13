import { Link } from "react-router-dom";
import './Home.css'

export default function HomePage() {
  return (
    <div>
      <h1>Page d'accueil</h1>
      <nav>
        <Link to="/inscription">Aller à la page Inscription</Link>
      </nav>
    </div>
  );
}
