import { FormEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  type InterestPoint,
  type InterestPointInput,
  useGetCategoriesQuery,
  useReplaceInterestPointByIdMutation,
} from "../libs/graphql/generated/graphql-types";
import { useInterestPointsStore } from "../store/interestPointsStore";
import { useCitiesStore } from "../store/citiesStore";

type EditInterestPointFormProps = {
  interestPoint: InterestPoint;
  isOpen: boolean;
  onClose: () => void;
};

export default function EditInterestPointForm({ interestPoint, onClose, isOpen }: EditInterestPointFormProps) {
  const { loading, error, data } = useGetCategoriesQuery();
  const [replaceInterestPoint, { data: editedData, loading: submitting, error: editError }] =
    useReplaceInterestPointByIdMutation();

  const [showAddImageInput, setShowAddImageInput] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string[]>([]);
  const { selectedCity } = useCitiesStore();
  const { fetchInterestPointsByCity, fetchInterestPointById } = useInterestPointsStore();
  
  const navigate = useNavigate();

  if (!interestPoint) return null;

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    const form = evt.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    const formattedData = {
      ...formJson,
      latitude: interestPoint.latitude,
      longitude: interestPoint.longitude,
      city: String(interestPoint.city.id),
      category: String(formJson.category),
    };

    try {
      const result = await replaceInterestPoint({
        variables: {
          data: formattedData as InterestPointInput,
          interestPointId: interestPoint!.id,
        }
      });

      if (result?.data?.replaceInterestPointById) {
        console.log("Point modifié !");
        if (selectedCity) {
          fetchInterestPointsByCity(selectedCity.id);
        }
      }
      console.log("Type of POI id:", typeof interestPoint.id);
      fetchInterestPointById(String(interestPoint.id));
      onClose();
    } catch (err) {
      console.error("Erreur lors de la modification :", err);
    }
  };

  useEffect(() => {
    if (!editedData) return;

    setPopupMessage(["Modifications enregistrées avec succès ! 🎉"]);
    setShowPopup(true);

    const timer = setTimeout(() => {
      setShowPopup(false);
      onClose?.();
      navigate("/map");
    }, 2000);

    return () => clearTimeout(timer);
  }, [editedData, onClose]);

  if (!interestPoint) return null;
  if (error || editError) return <>Error!</>;
  if (loading) return <>Loading...</>;
  if (!data) return <>We couldn't find anything to display</>;

  return (
    <>
      {showPopup && (

        <aside
          className={`interest-point-details absolute top-0 right-0 h-full w-full sm:w-1/4 max-w-3xl bg-gray-50 text-black p-4 transform transition-transform duration-300 z-[900] ${isOpen ? "translate-x-0" : "translate-x-full"
            } rounded-tl-xl rounded-bl-xl p-6 shadow-xl flex flex-col gap-4 content-center`}
        >
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

          <div className="text-sm text-[#706eeb] font-medium">
            {popupMessage.map((line, index) => (
              <p key={index} className="mb-2">
                {line}
              </p>
            ))}
          </div>
        </aside>
      )}
      <div className="max-h-screen overflow-y-auto sm:overflow-visible sm:max-h-none px-4 pb-6">

        <form onSubmit={handleSubmit}>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 hover:cursor-pointer text-lg"
              aria-label="Fermer"
            >
              ✕
            </button>
          </div>
          <div className="sheet-header w-full flex items-center justify-center space-x-4 py-4 text-gray-600">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input
              name="name"
              defaultValue={interestPoint.name || ""}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />

          </div>

          {/* Pictures */}
          <div className="w-full sm:w-2/3 space-y-2 mx-auto">
            <label className="text-sm font-medium text-gray-700">Photos</label>
            {/* Responsive grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {interestPoint.pictures?.map((pic) => (
                <div
                  key={pic.id}
                  className="relative group w-full aspect-square rounded-lg overflow-hidden border border-gray-200 shadow-sm"
                >
                  <img
                    src={pic.url}
                    alt={pic.name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <button
                    type="button"
                    className="absolute top-1.5 right-1.5 bg-black/60 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                    aria-label="Supprimer l'image"
                  >
                    ✕
                  </button>
                </div>
              ))}

              {/* Add picture button */}
              <button
                type="button"
                onClick={() => setShowAddImageInput(!showAddImageInput)}
                className="flex flex-col items-center justify-center w-full aspect-square rounded-lg border-2 border-dashed border-blue-500 text-blue-500 hover:bg-blue-50 transition"
              >
                +
              </button>
            </div>

            {showAddImageInput && (
              <input
                type="url"
                name="new_picture_url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="https://exemple.com/photo.jpg"
                className="w-full mt-2 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            )}
          </div>

          <div className="details-content space-y-4 text-sm sm:text-base">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              defaultValue={interestPoint.description || ""}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
            <input
              name="address"
              defaultValue={interestPoint.address || ""}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100 text-gray-500 cursor-not-allowed focus:outline-none"
            />

            <div className="grid grid-cols-2 gap-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
              <input
                name="address"
                defaultValue={interestPoint.city.name || ""}
                disabled
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100 text-gray-500 cursor-not-allowed focus:outline-none"
              />
              <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
              <select
                name="category"
                defaultValue={interestPoint.category?.id || ""}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 text-center"
              >
                {data.getCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <label className="block text-sm font-medium text-gray-700 mb-1">Site officiel </label>
            <input
              name="link_url"
              defaultValue={interestPoint.link_url || ""}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />

            <button
              type="submit"
              className="flex justify-center items-center w-full text-sm px-4 py-2 rounded-md primary-bg text-white hover:bg-purple-700 transition hover:cursor-pointer hover:text-gray-100"
            >
              {submitting ? "Modification..." : "Valider"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex justify-center items-center w-full border border-gray-300 px-3 py-2 text-sm px-4 py-2 rounded-md  hover:cursor-pointer hover:text-gray-500"
              aria-label="Annuler les modifications"
            >
              Annuler
            </button>

          </div>
        </form>
      </div>
    </>
  );
}