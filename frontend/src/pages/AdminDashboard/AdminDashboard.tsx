import { useState } from "react";
import UserManager from "../Admin/UserManager";
import VilleComponent from "./VilleComponent";
import CategoryManager from "../CategoryManager/CategoryManager";
import { UserRole } from "../../libs/graphql/generated/graphql-types";
import { useUserStore } from "../../store/userStore";

// L'utilisateur sera passé en prop ou stocké dans un contexte (par exemple `role`)
// Ici, on suppose que le rôle de l'utilisateur est "superAdmin", "adminVille", ou "user"
// Si l'utilisateur est "user" il verra une page blanche
export default function Dashboard( ) {
  // État pour suivre le bouton cliqué et afficher le bon élément en conséquence
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const user = useUserStore((state) => state.user);

  // Fonction pour afficher le composant en fonction du bouton sélectionné
  const handleClick = (component: string) => {
    setActiveComponent(component);
  };
  console.log(user)
  console.log(user?.role)
  
  return (
    <div className="w-full">
      <span className="block mb-4">Administrateur</span>
      <div className="w-full">
        <div className="flex justify-between w-full">
          {/* Onglet Ville : visible pour tous les admins, mais seulement accessible pour adminVille et superAdmin */}
          {(user?.role === UserRole.SuperAdmin || user?.role === UserRole.CityAdmin) && (
            <button
              onClick={() => handleClick("ville")}
              className="text-black hover:text-gray-700 border-gray-300 px-3 py-2 text-sm font-medium last:border-none"
            >
              Ville
            </button>
          )}

          {/* Onglet Catégorie : visible uniquement pour superAdmin */}
          {(user?.role === UserRole.SuperAdmin) && (
            <button
              onClick={() => handleClick("categorie")}
              className="text-black hover:text-gray-700 border-gray-300 px-3 py-2 text-sm font-medium last:border-none"
            >
              Catégorie
            </button>
          )}

          {/* Onglet Utilisateur : visible uniquement pour superAdmin et city admin*/}
          {(user?.role === UserRole.SuperAdmin || user?.role === UserRole.CityAdmin)  && (
            <button
              onClick={() => handleClick("utilisateur")}
              className="text-black hover:text-gray-700 last:border-none px-3 py-2 text-sm font-medium"
            >
              Utilisateur
            </button>
          )}
        </div>
      </div>

      <div className="mt-6">
        {activeComponent === "ville" && <VilleComponent />}

        {activeComponent === "categorie" && <CategoryManager />}

        {activeComponent === "utilisateur" && <UserManager />}
      </div>
    </div>
  );
}
