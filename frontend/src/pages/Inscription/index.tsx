import { Link } from "react-router-dom";
import './Inscription.css'

function Inscription() {
  return (
    <div>
      <h1>Page d'inscription</h1>
      <nav>
        <Link to="/">Aller à la page d'accueil</Link>
      </nav>
    </div>
  );
}

export default Inscription;