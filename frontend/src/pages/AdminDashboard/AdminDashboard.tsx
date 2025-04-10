import { useState } from 'react';
// import VilleComponent from './VilleComponent';  // Composant bidon en attendant le vrai composant Ville
// import CategorieComponent from './CategorieComponent';  // Composant bidon en attendant le vrai composant Catégorie
// import UtilisateurComponent from './UtilisateurComponent';  // Composant bidon en attendant le vrai composant Utilisateur

// L'utilisateur sera passé en prop ou stocké dans un contexte (par exemple `role`)
// Ici, on suppose que le rôle de l'utilisateur est "superAdmin", "adminVille", ou "user"
// Si l'utilisateur est "user" il verra une page blanche
export default function Dashboard({ userRole }: { userRole: string }) {
  // État pour suivre le bouton cliqué et afficher le bon élément en conséquence
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  // Fonction pour afficher le composant en fonction du bouton sélectionné
  const handleClick = (component: string) => {
    setActiveComponent(component);
  };

  return (
    <div className="w-full">
      <span className="block mb-4">Administrateur</span>
      <div className="w-full">
        <div className="flex justify-between w-full">
          {/* Onglet Ville : visible pour tous les admins, mais seulement accessible pour adminVille et superAdmin */}
          {(userRole === 'superAdmin' || userRole === 'adminVille') && (
            <button
              onClick={() => handleClick('ville')}
              className="text-black hover:text-gray-700 border-gray-300 px-3 py-2 text-sm font-medium last:border-none"
            >
              Ville
            </button>
          )}

          {/* Onglet Catégorie : visible uniquement pour superAdmin */}
          {userRole === 'superAdmin' && (
            <button
              onClick={() => handleClick('categorie')}
              className="text-black hover:text-gray-700 border-gray-300 px-3 py-2 text-sm font-medium last:border-none"
            >
              Catégorie
            </button>
          )}

          {/* Onglet Utilisateur : visible uniquement pour superAdmin */}
          {(userRole === 'superAdmin' || userRole === 'adminVille') && (
            <button
              onClick={() => handleClick('utilisateur')}
              className="text-black hover:text-gray-700 last:border-none px-3 py-2 text-sm font-medium"
            >
              Utilisateur
            </button>
          )}
        </div>
      </div>

      {/* Affichage conditionnel des composants */}
      {/* <div className="mt-4">
        {activeComponent === 'ville' && <VilleComponent />}
        {activeComponent === 'categorie' && <CategorieComponent />}
        {activeComponent === 'utilisateur' && <UtilisateurComponent />}
      </div> */}
    </div>
  );
}
