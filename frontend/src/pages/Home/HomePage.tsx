import { Link } from "react-router-dom";
import './Home.css'

export default function HomePage() {
  return (
    <div>
      <h1>Page d'accueil</h1>
      <nav>
        <Link to="/about">Aller à la page À propos</Link>
      </nav>
    </div>
  );
}
