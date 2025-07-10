import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetCitiesQuery,
  useCreateInterestPointMutation,
  useGetCategoriesQuery,
  type InterestPointInput,
} from "../libs/graphql/generated/graphql-types";
import { useInterestPointsStore } from "../store/interestPointsStore";
import { useCitiesStore } from "../store/citiesStore";

type NewInterestPointFormProps = {
  isOpen: boolean;
  onClose?: () => void;
};

export default function CreateInterestPointForm({
  isOpen,
  onClose,
}: NewInterestPointFormProps) {

  const { loading, error, data } = useGetCategoriesQuery();
  const [createInterestPoint, { data: createdData, loading: submitting, error: createError }] =
    useCreateInterestPointMutation();
  const { data: cityData } = useGetCitiesQuery();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string[]>([]);
  const { selectedCity } = useCitiesStore();
  const { fetchInterestPointsByCity } = useInterestPointsStore();

  const navigate = useNavigate();

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    const form = evt.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    const formattedData = {
      ...formJson,
      latitude: parseFloat(formJson.latitude as string),
      longitude: parseFloat(formJson.longitude as string),
    };
    try {
      const result = await createInterestPoint({
        variables: {
          data: formattedData as InterestPointInput,
        },
      });

      if (result?.data?.createInterestPoint) {
        console.log("point créé1")
        if (selectedCity) {
        fetchInterestPointsByCity(selectedCity.id); // Récupérer les points mis à jour
      }
      onClose?.();
      }
    } catch (err) {
      console.error("Erreur lors de la création :", err);
    }
  };

  useEffect(() => {
    if (!createdData) return;

    setPopupMessage(["Félicitations, point d'intérêt créé avec succès ! 🎉"]);
    setShowPopup(true);

    const timer = setTimeout(() => {
      setShowPopup(false);
      onClose?.();
      navigate("/map");
    }, 3000);

    return () => clearTimeout(timer);
  }, [createdData]);

  if (error || createError) return <>Error!</>;
  if (loading) return <>Loading...</>;
  if (!data) return <>We couldn't find anything to display</>;

  return (

    <aside
      className={`interest-point-details absolute top-0 right-0 h-full w-full sm:w-1/4 max-w-3xl bg-gray-50 text-black p-4 transform transition-transform duration-300 z-[900] ${isOpen ? "translate-x-0" : "translate-x-full"
        } rounded-tl-xl rounded-bl-xl p-6 shadow-xl flex flex-col gap-4 content-center`}
    >
      {showPopup && (
        <div className="fixed bottom-4 right-4 bg-white border border-[#706eeb] px-6 py-3 rounded-xl shadow-xl z-[900]">
          <div className="absolute top-[-12px] left-[-12px] bg-[#706eeb] p-1 rounded-full text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div className="text-sm text-[#706eeb] font-medium">
            {popupMessage.map((line, index) => (
              <p key={index} className="mb-2">
                {line}
              </p>
            ))}
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold text-gray-800">Créer un point d’intérêt</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 hover:cursor-pointer"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Photos</label>
          <input
            name="pictures"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
            placeholder="URL de l'image"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input
              name="name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500"
              required
              placeholder="Ex: Tour Eiffel"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
            <select
              name="category"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500"
              required
            >
              {data.getCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            rows={3}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500"
            placeholder="Brève description du lieu"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
          <input
            name="address"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500"
            required
            placeholder="Adresse complète"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
            <input
              name="latitude"
              type="number"
              step="any"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500"
              required
              placeholder="Ex: 48.8584"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
            <input
              name="longitude"
              type="number"
              step="any"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500"
              required
              placeholder="Ex: 2.2945"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
            <select
              name="city"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500"
              required
            >
              {cityData?.getCities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name} ({city.postalCode})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lien (site officiel)</label>
            <input
              name="link_url"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500"
              placeholder="https://..."
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex justify-center items-center w-full text-sm px-4 py-2 rounded-md primary-bg text-white hover:bg-purple-700 transition hover:cursor-pointer hover:text-gray-100"
          disabled={submitting}
        >
          {submitting ? "Création en cours..." : "Créer"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex justify-center items-center w-full border border-gray-300 px-3 py-2 text-sm px-4 py-2 rounded-md  hover:cursor-pointer hover:text-gray-500"
          aria-label="Annuler la création"
        >
          Annuler
        </button>

      </form>
    </aside>
  )
}