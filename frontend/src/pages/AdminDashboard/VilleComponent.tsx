import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { User } from "../../@types/types";
import { City } from "../../@types/types";

const GET_USERS = gql`
  query getUsers {
    getUsers {
      id
      firstname
      lastname
      role
    }
  }
`;

const GET_CITIES = gql`
  query GetCities {
    getCities {
      id
      name
      postalCode
      latitude
      longitude
      users {
        id
        firstname
        lastname
        role
      }
    }
  }
`;

export default function VilleComponent() {
  const { data: citiesData, loading: citiesLoading } = useQuery(GET_CITIES);
  const { data: usersData } = useQuery(GET_USERS);

  const cities = citiesData?.getCities ?? [];
  const totalCity = cities.length;

  const users = usersData?.getUsers ?? [];

  const [selectedCity, setSelectedCity] = useState<City>({
    name: "",
    postalCode: "",
    latitude: "",
    longitude: "",
  });

  const [mode, setMode] = useState("view");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showUsers, setShowUsers] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (cities.length > 0 && mode === "view") {
      setSelectedCity(cities[0]);
    }
  }, [cities, mode]);

  // Afficher/masquer la liste des utilisateurs
  const toggleUsersList = (cityId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowUsers((prev) => ({
      ...prev,
      [cityId]: !prev[cityId],
    }));
  };

  if (citiesLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        Chargement des villes...
      </div>
    );
  }

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
                  className="rounded-full p-3 w-full bg-white text-gray-800 text-lg placeholder-gray-800 border-1 border-white"
                  placeholder="Nom de la ville"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800 font-bold text-lg"
                    onClick={() => {
                      setSearchQuery("");
                    }}
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
              <div className="text-xl mb-2 text-gray-800">
                Nombre total de villes :
              </div>
              <div className="text-3xl font-bold">{totalCity}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bouton Ajouter */}
      <div className="flex w-1/2 justify-start p-6">
        <button
          className="bg-[#706eeb] text-white rounded-full px-4 py-2 text-lg flex items-center w-80 hover:cursor-pointer hover:text-gray-800"
          onClick={() => {
            setSelectedCity({
              name: "",
              postalCode: "",
              latitude: "",
              longitude: "",
            });
            setMode("add");
          }}
        >
          Ajouter une ville
        </button>
      </div>

      {/* Grille des villes avec affichage des utilisateurs */}
      <div className="flex flex-wrap justify-center gap-8 p-6">
        {cities.map((city: City) => (
          <div
            key={city.id}
            className="w-64 border border-[#706eeb] rounded-2xl flex flex-col bg-white
              transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"
            onClick={() => {
              setSelectedCity(city);
              setMode("view");
            }}
          >
            <div className="text-center p-4 border-b border-[#706eeb]">
              <div className="text-lg font-medium text-gray-800">
                {city.name || "Sans nom"}
              </div>
              <div className="text-sm text-gray-600">
                {city.postalCode || "Code postal non disponible"}
              </div>
            </div>

            <div className="p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  {city.users?.length || 0} utilisateur
                  {(city.users?.length || 0) > 1 ? "s" : ""}
                </span>
                <button
                  className="text-xs px-2 py-1 bg-[#706eeb] text-white rounded-md hover:bg-[#5755c8]"
                  onClick={(e) => toggleUsersList(city.id || "", e)}
                >
                  {showUsers[city.id || ""] ? "Masquer" : "Afficher"}
                </button>
              </div>

              {showUsers[city.id || ""] &&
                city.users &&
                (() => {
                  const filteredUsers = city.users.filter(
                    (user: User) => user.role !== "USER"
                  );

                  return (
                    <div className="mt-3 max-h-40 overflow-y-auto">
                      {filteredUsers.length > 0 ? (
                        <ul className="text-sm">
                          {filteredUsers.map((user: User) => (
                            <li
                              key={user.id}
                              className="py-1 border-b border-gray-100 last:border-0"
                            >
                              <span className="font-medium">
                                {user.firstname} {user.lastname}
                              </span>
                              <span className="ml-2 text-xs text-gray-500">
                                ({user.role})
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500">
                          Aucun utilisateur avec un rôle différent de "USER"
                          dans cette ville
                        </p>
                      )}
                    </div>
                  );
                })()}
            </div>
          </div>
        ))}
      </div>

      {/* Section détaillée de la ville sélectionnée */}
      <div className="bg-[#b0afe4] p-6">
        <div className="flex items-center mb-4">
          <div className="bg-white w-80 rounded-full px-4 py-2 text-lg">
            {mode === "add"
              ? "Ajouter une ville"
              : `Ville sélectionnée : ${selectedCity?.name || ""}`}
          </div>
        </div>

        {/* Informations ville */}
        <div className="flex flex-row bg-white rounded-lg mx-60 my-12 p-12 gap-8">
          <div className="flex flex-col w-1/3 gap-8">
            <div className="w-full">
              <div className="text-lg mb-1">Nom de la ville :</div>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={selectedCity?.name || ""}
                onChange={(e) =>
                  setSelectedCity({ ...selectedCity, name: e.target.value })
                }
              />
            </div>

            <div className="w-full">
              <div className="text-lg mb-1">Code postal :</div>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={selectedCity?.postalCode || ""}
                onChange={(e) =>
                  setSelectedCity({
                    ...selectedCity,
                    postalCode: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="flex flex-col w-1/3 gap-8">
            <div className="w-full">
              <div className="text-lg mb-1">Latitude :</div>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={selectedCity?.latitude || ""}
                onChange={(e) =>
                  setSelectedCity({ ...selectedCity, latitude: e.target.value })
                }
              />
            </div>

            <div className="w-full">
              <div className="text-lg mb-1">Longitude :</div>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={selectedCity?.longitude || ""}
                onChange={(e) =>
                  setSelectedCity({
                    ...selectedCity,
                    longitude: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="flex flex-col w-1/3 gap-16">
            <div className="w-full">
              <div className="text-lg mb-1">Ajouter un admin de ville :</div>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
              >
                <option value="">-- Sélectionnez un utilisateur --</option>

                {mode === "add"
                  ? users.map((user) => {
                      const userCity = cities.find((city) =>
                        city.users?.some((cityUser) => cityUser.id === user.id)
                      );

                      return (
                        <option key={user.id} value={user.id}>
                          {user.lastname.toUpperCase()} {user.firstname} -{" "}
                          {user.role.toLowerCase()}{" "}
                          {userCity ? `(${userCity.name})` : ""}
                        </option>
                      );
                    })
                  : users
                      .filter((user) =>
                        selectedCity.users?.some(
                          (cityUser) => cityUser.id === user.id
                        )
                      )
                      .map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.lastname.toUpperCase()} {user.firstname} -{" "}
                          {user.role.toLowerCase()}
                        </option>
                      ))}
              </select>
            </div>

            <div className="flex flex-row justify-center gap-8">
              <button className="bg-[#706eeb] text-white rounded-full px-4 py-2 text-lg flex justify-center items-center w-35 h-12 hover:cursor-pointer hover:text-gray-800">
                Sauvegarder
              </button>

              <button className="bg-[#b0afe4] text-white rounded-full px-4 py-2 text-lg flex justify-center items-center w-35 h-12 hover:cursor-pointer hover:text-gray-800">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-10 bg-white"></div>
    </div>
  );
}
