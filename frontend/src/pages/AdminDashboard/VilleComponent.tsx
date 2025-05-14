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
            <div className="text-gray-800 text-xl px-4 py-2 mb-4">
              Rechercher une ville :
            </div>
            <div className="bg-[#706eeb] rounded-full w-1/2 max-w-md flex items-center justify-center p-1">
              <div className="relative w-full">
                <input
                  type="text"
                  className="rounded-full p-3 w-full bg-white text-gray-800 text-lg placeholder-gray-800 border-1 border-white "
                  placeholder="Nom de la ville"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800 font-bold text-lg"
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
            <div className="border-4 border-[#706eeb] text-[#706eeb] rounded-xl px-8 py-6 text-center w-70">
              <div className="text-xl mb-2 text-gray-800 ">
                Nombre total de villes :
              </div>
              <div className="text-3xl font-bold">{totalCity}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bouton Ajouter */}
      <div className="flex w-1/2 justify-start p-6 ">
        <button className="bg-[#706eeb] text-white rounded-full px-4 py-2 text-lg flex items-center w-80 hover:cursor-pointer hover:text-gray-800">
          Ajouter d'une ville
        </button>
      </div>

      {/* Grille des villes */}
      <div className="flex flex-wrap justify-center gap-8 p-6">
        {cities.map((city) => (
          <div
            key={city.id}
            className="w-38 h-32 border border-[#706eeb] rounded-2xl flex items-center justify-center cursor-pointer bg-white
                    transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"
            onClick={() => setSelectedCity(city)}
          >
            <div className="text-center p-2">
              <div className="text-lg font-medium text-gray-800">
                {city.name}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Section détaillée de la ville sélectionnée */}
      <div className="bg-[#b0afe4] p-6">
        <div className="flex items-center mb-4">
          <div className="bg-white w-80 rounded-full px-4 py-2 text-lg">
            Ville sélectionnée : {selectedCity.name}
          </div>
        </div>

        {/* Informations ville */}
        <div className="flex flex-row bg-white rounded-lg mx-60 my-12 p-12">
          <div className="flex flex-col w-1/3 gap-8">
            <div className=" w-full">
              <div className="text-lg mb-1">Nom de la ville :</div>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={selectedCity.name}
                readOnly
              />
            </div>

            <div className=" w-full">
              <div className="text-lg mb-1">Ajouter un admin de ville :</div>
              <input
                type="email"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={""}
                readOnly
              />
            </div>
          </div>

          <div className="flex flex-row w-2/3 justify-center items-center gap-8 p-3 ">
            <button className="bg-[#706eeb] text-white rounded-full px-4 py-2 text-lg flex justify-center items-center w-45 h-12 hover:cursor-pointer hover:text-gray-800">
              Sauvegarder
            </button>

            <button className="bg-[#b0afe4] text-white rounded-full px-4 py-2 text-lg flex justify-center items-center w-45 h-12 hover:cursor-pointer hover:text-gray-800">
              Supprimer
            </button>
          </div>
        </div>
      </div>
      <div className="h-10 bg-white"></div>
    </div>
  );
}
