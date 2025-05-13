import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import Explorez from "../../assets/explorez.png";
import Fonctionnement from "../../assets/fonctionnement.png";
import { gql, useQuery } from "@apollo/client";

const GET_STATS = gql`
  query GetStats {
    getUserCount
    getCityCount
    getPlaceCount
  }
`;

export default function LandingPage() {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_STATS);

  return (
    <div className="landing-page flex flex-col grow overflow-scroll">
      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-5 w-full">
          <div className="flex-1 text-center lg:text-left lg:w-1/2">
            <h1 className="text-6xl font-bold text-[#706eeb] lg:text-7xl">
              CityGuide !
            </h1>
            <p className="text-2xl font-bold text-gray-800 lg:text-3xl ml-1">
              Explorez, partagez, découvrez.
            </p>
            <p className="mt-6 lg:text-lg text-gray-600 ml-1">
              Envie de sortir des sentiers battus&nbsp;? Grâce à notre
              application, trouvez et partagez les meilleurs coins à visiter
              pendant vos vacances. Des lieux insolites, des bonnes adresses,
              des panoramas à couper le souffle&nbsp;: tout ça sur une carte
              interactive, alimentée par la communauté.
            </p>
            <div className="mt-10 lg:text-right lg:w-1/2">
              <button
                type="button"
                onClick={() => navigate("/map")}
                className="rounded-md bg-[#706eeb] px-4 py-2 lg:px-6 lg:py-3 lg:text-lg font-medium text-white hover:bg-[#b0afe4] hover:cursor-pointer"
              >
                VOIR LA CARTE
              </button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 mt-10 lg:mt-0 flex justify-center items-center">
            <img
              src={Explorez}
              alt="Présentation de l'application"
              className="w-auto h-100 rounded-xl shadow-lg"
            />
          </div>
        </div>

        <div className="banner mt-20 flex justify-center w-full">
          <div className="w-full flex justify-center items-center">
            <div className="container flex flex-col mx-4 sm:mx-6 md:mx-0">
              <div className="bg-[#B0AFE4] rounded-xl w-full h-auto py-6 flex flex-row justify-between divide-x divide-solid divide-[#706eeb] shadow-md flex-wrap sm:flex-nowrap">
                <div className="relative flex-1 flex flex-col gap-1 px-2 sm:px-4 text-center">
                  <p className="text-gray-800 text-xl sm:text-3xl lg:text-4xl font-bold">
                    {loading ? "..." : error ? "Erreur" : data?.getUserCount}
                  </p>
                  <p className="text-gray-800 text-xs sm:text-base font-semibold">
                    Utilisateurs
                  </p>
                </div>
                <div className="relative flex-1 flex flex-col gap-1 px-2 sm:px-4 text-center">
                  <p className="text-gray-800 text-xl sm:text-3xl lg:text-4xl font-bold">
                    {loading ? "..." : error ? "Erreur" : data?.getCityCount}
                  </p>
                  <p className="text-gray-800 text-xs sm:text-base font-semibold">
                    Villes
                  </p>
                </div>
                <div className="relative flex-1 flex flex-col gap-1 px-2 sm:px-4 text-center">
                  <p className="text-gray-800 text-xl sm:text-3xl lg:text-4xl font-bold">
                    {loading ? "..." : error ? "Erreur" : data?.getPlaceCount}
                  </p>
                  <p className="text-gray-800 text-xs sm:text-base font-semibold">
                    Lieux
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <img
              src={Fonctionnement}
              alt="Fonctionnement de l'application"
              className="w-120 h-auto rounded-xl shadow-lg"
            />
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 ">
              Simplifiez votre expérience
            </h2>
            <p className="mt-6 lg:ext-lg text-gray-600">
              Découvrez en 3 étapes simples comment profiter au maximum de
              CityGuide :
              <br />
              1. Une inscription rapide
              <br />
              2. Une exploration intuitive via la carte
              <br />
              3. Le plaisir de partager vos trouvailles
              <br />
              <br />
              Rejoignez une communauté de voyageurs curieux et connectés&nbsp;!
            </p>

            <div className="mt-10 lg:text-right lg:w-1/2">
              <button
                type="button"
                onClick={() => navigate("/tutorial")}
                className="rounded-md bg-[#706eeb] px-4 py-2 lg:px-6 lg:py-3 lg:text-lg font-medium text-white hover:bg-[#b0afe4] hover:cursor-pointer"
              >
                TUTORIEL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
