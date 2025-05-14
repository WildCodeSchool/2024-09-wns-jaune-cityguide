import { useState } from "react";

export default function VilleComponent() {
  const [cities] = useState([
    {
      id: 1,
      name: "Paris",
      latitude: 48.8566,
      longitude: 2.3522,
    },
    {
      id: 2,
      name: "Lyon",
      latitude: 45.764,
      longitude: 4.8357,
    },
    {
      id: 3,
      name: "Caen",
      latitude: 49.1829,
      longitude: -0.3707,
    },
    {
      id: 4,
      name: "Marseille",
      latitude: 43.2965,
      longitude: 5.3698,
    },
    {
      id: 5,
      name: "Bordeaux",
      latitude: 44.8378,
      longitude: -0.5792,
    },
    {
      id: 6,
      name: "Toulouse",
      latitude: 43.6047,
      longitude: 1.4442,
    },
    {
      id: 7,
      name: "Lille",
      latitude: 50.6292,
      longitude: 3.0573,
    },
    {
      id: 8,
      name: "Nice",
      latitude: 43.7102,
      longitude: 7.262,
    },
    {
      id: 9,
      name: "Nantes",
      latitude: 47.2184,
      longitude: -1.5536,
    },
    {
      id: 10,
      name: "Strasbourg",
      latitude: 48.5734,
      longitude: 7.7521,
    },
    {
      id: 11,
      name: "Montpellier",
      latitude: 43.6119,
      longitude: 3.8777,
    },
    {
      id: 12,
      name: "Rennes",
      latitude: 48.1173,
      longitude: -1.6778,
    },
    {
      id: 13,
      name: "Le Havre",
      latitude: 49.4944,
      longitude: 0.1079,
    },
    {
      id: 14,
      name: "Reims",
      latitude: 49.2583,
      longitude: 4.0317,
    },
  ]);

  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const totalCity = cities.length;

  return (
    <div className="flex flex-col bg-white text-gray-800 overflow-scroll">
      {/* Section principale */}
      <div className="flex flex-col mb-8 gap-8">
        <div className="flex flex-row mb-8 gap-8 w-full">
          {/* Colonne gauche : Barre de recherche */}
          <div className="w-1/2 flex flex-col items-center justify-center">
            <div className="text-[#706eeb] text-xl px-4 py-2 mb-4">
              Rechercher une ville :
            </div>
            <div className="bg-[#706eeb] rounded-full w-1/2 max-w-md flex items-center justify-center p-1">
              <div className="relative w-full">
                <input
                  type="text"
                  className="rounded-full p-3 w-full bg-white text-gray-800 text-xl placeholder-[#706eeb] border-2 border-white "
                  placeholder="Nom de la ville"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800 font-bold text-xl"
                    onClick={() => setSearchQuery("")}
                  >
                    X
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Colonne droite : Statistiques */}
          <div className="w-1/2 flex items-center justify-center">
            <div className="border-2 border-[#706eeb] text-[#706eeb] rounded-xl px-8 py-6 text-center w-60">
              <div className="text-xl mb-2">Nombre total de villes : </div>
              <div className="text-6xl font-bold">{totalCity}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bouton Ajouter */}
      <div className="flex w-1/2 justify-start p-6 ">
        <button className="bg-[#706eeb] text-white rounded-full p-3 m-6 text-lg flex items-center w-1/3 hover:cursor-pointer">
          + Ajouter d'une ville
        </button>
      </div>

      {/* Grille des villes */}
      <div className="flex flex-wrap justify-center gap-8 p-6">
        {cities.map((city) => (
          <div
            key={city.id}
            className="w-40 h-36 border border-[#706eeb] rounded-2xl flex items-center justify-center cursor-pointer bg-white
                    transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"
            onClick={() => setSelectedCity(city)}
          >
            <div className="text-center p-2">
              <div className="w-12 h-12 rounded-full bg-gray-200 mx-auto mb-2"></div>
              <div className="text-lg font-medium text-gray-800">
                {city.name}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Section détaillée de l'utilisateur sélectionné */}
      <div className="bg-indigo-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="bg-white rounded-full px-4 py-2 shadow-sm">
            Ville sélectionnée : {selectedCity.name}
          </div>
          <button className="bg-black text-white rounded-full px-6 py-2">
            Sauvegarder
          </button>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex">
            {/* Informations ville */}
            <div className="flex-1 border-r border-gray-200 pr-4">
              <div className="mb-4">
                <div className="text-sm mb-1">Nom de l'utilisateur :</div>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={selectedCity.name}
                  readOnly
                />
              </div>

              <div className="mb-4">
                <div className="text-sm mb-1">Ajouter un admin de ville :</div>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={""}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
