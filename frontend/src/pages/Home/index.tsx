import { Link } from "react-router-dom";
import './Home.css'

function Home() {
  return (
    <div>
      <h1>Page d'accueil</h1>
      <nav>
        <Link to="/register">Aller à la page À propos</Link>
      </nav>
    </div>
  );
}

export default Home;