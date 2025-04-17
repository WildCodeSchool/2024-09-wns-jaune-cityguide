import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  type InterestPoint,
  type InterestPointInput,
  useDeleteInterestPointByIdMutation,
  useGetCategoriesQuery,
  useReplaceInterestPointByIdMutation,
} from "../libs/graphql/generated/graphql-types";

type EditInterestPointModalProps = {
  interestPoint: InterestPoint | null;
  onClose: () => void;
};

export default function EditInterestPointModal({ interestPoint, onClose }: EditInterestPointModalProps) {
  const { loading, error, data } = useGetCategoriesQuery();
  const navigate = useNavigate();
  const [replaceInterestPoint] = useReplaceInterestPointByIdMutation();
  const [deleteInterestPoint] = useDeleteInterestPointByIdMutation();

  const [showAddImageInput, setShowAddImageInput] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");

  if (!interestPoint) return null;

  const handleSubmit = (evt: FormEvent) => {
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

    replaceInterestPoint({
      variables: {
        data: formattedData as InterestPointInput,
        interestPointId: interestPoint.id,
      },
    });
    onClose();
    navigate("/");
  };

  const handleDelete = async () => {
    await deleteInterestPoint({ variables: { interestPointId: interestPoint.id.toString() } });
    onClose();
    navigate("/");
  };

  if (error) return <>Error!</>;
  if (loading) return <>Loading...</>;
  if (!data) return <>We couldn't find anything to display</>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={onClose}></div>

      <div className="relative bg-white rounded-2xl shadow-2xl z-50 w-full max-w-2xl p-6 sm:p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Modifier le point d’intérêt</h2>

        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Images */}
          <div className="w-full sm:w-2/3 space-y-2 mx-auto">
            <label className="text-sm font-medium text-gray-700">Photos</label>

            {/* Responsive grid */}
            <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(6rem, 1fr))" }}>
              {interestPoint.pictures?.map((pic) => (
                <div
                  key={pic.id}
                  className="relative w-24 h-24 rounded-xl overflow-hidden border border-gray-200 shadow-sm"
                >
                  <img src={pic.url} alt={pic.name} className="object-cover w-full h-full" />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-white text-red-600 hover:bg-red-500 hover:text-white rounded-full w-6 h-6 flex items-center justify-center shadow"
                  >
                    ✕
                  </button>
                </div>
              ))}

              {/* Add image button */}
              <button
                type="button"
                onClick={() => setShowAddImageInput(!showAddImageInput)}
                className="flex flex-col items-center justify-center w-24 h-24 rounded-xl border-2 border-dashed border-blue-500 text-blue-500 hover:bg-blue-50 transition"
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
                className="w-full mt-2 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            )}
          </div>

          {/* Nom, Description, Catégorie */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-full sm:w-2/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input
                name="name"
                defaultValue={interestPoint.name || ""}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="w-full sm:w-2/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                defaultValue={interestPoint.description || ""}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            {/* Adresse + URL lien */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                <input
                  name="address"
                  defaultValue={interestPoint.address || ""}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL du lien</label>
                <input
                  name="link_url"
                  defaultValue={interestPoint.link_url || ""}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Catégorie */}
            <div className="w-full sm:w-2/3 ">
              <label className="block text-xs font-medium text-gray-600 mb-1">Catégorie</label>
              <select
                name="category"
                defaultValue={interestPoint.category?.id || ""}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
              >
                {data.getCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Boutons */}
          <div className="w-full sm:w-2/3 mx-auto pt-4 flex justify-between">
            <button
              type="button"
              onClick={handleDelete}
              className="text-sm px-4 py-2 rounded-md text-red-600 border border-red-600 hover:bg-gray-100 transition"
            >
              Supprimer
            </button>
            <button
              type="submit"
              className="text-sm px-4 py-2 rounded-md primary-bg text-white hover:bg-purple-700 transition"
            >
              Modifier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
