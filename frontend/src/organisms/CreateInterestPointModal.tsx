import { FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateInterestPointMutation,
  useGetCategoriesQuery,
  type InterestPointInput,
} from "../libs/graphql/generated/graphql-types";

export default function CreateInterestPointModal() {
  const { loading, error, data } = useGetCategoriesQuery();
  const [createInterestPoint, { data: createdData, loading: submitting, error: createError }] =
    useCreateInterestPointMutation();

  const navigate = useNavigate();

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    const form = evt.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    const formattedData = {
      ...formJson,
      latitude: parseFloat(formJson.latitude as string),
      longitude: parseFloat(formJson.longitude as string),
    };

    createInterestPoint({
      variables: {
        data: formattedData as InterestPointInput,
      },
    });
  };

  useEffect(() => {
    if (!createdData) return;

    //a check redirection comme c'est une modal
    navigate(`/map/${createdData.createInterestPoint.id}`);
  }, [createdData, navigate]);

  if (error || createError) return <>Error!</>;
  if (loading) return <>Loading...</>;
  if (!data) return <>We couldn't find anything to display</>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 z-40" />
      <div className="relative bg-white p-6 rounded-xl w-11/12 max-w-lg shadow-xl z-50">
        <h2 className="text-xl font-bold mb-4 text-center">Créer un point d'intérêt</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Nom</label>
            <input name="name" className="w-full border px-3 py-2 rounded" required />
          </div>

          <div>
            <label className="block font-semibold mb-1">Description</label>
            <input name="description" className="w-full border px-3 py-2 rounded" required />
          </div>

          <div>
            <label className="block font-semibold mb-1">Adresse</label>
            <input name="address" className="w-full border px-3 py-2 rounded" required />
          </div>

          <div>
            <label className="block font-semibold mb-1">Latitude</label>
            <input name="latitude" type="number" step="any" className="w-full border px-3 py-2 rounded" required />
          </div>

          <div>
            <label className="block font-semibold mb-1">Longitude</label>
            <input name="longitude" type="number" step="any" className="w-full border px-3 py-2 rounded" required />
          </div>

          <div>
            <label className="block font-semibold mb-1">URL du lien</label>
            <input name="link_url" className="w-full border px-3 py-2 rounded" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Catégorie</label>
            <select name="category" className="w-full border px-3 py-2 rounded" required>
              {data.getCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Ville</label>
            <input name="city" className="w-full border px-3 py-2 rounded" required />
          </div>

					<div>
            <label className="block font-semibold mb-1">Photos</label>
            <input name="picture" className="w-full border px-3 py-2 rounded" required />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              disabled={submitting}
            >
              Créer le point d'intérêt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
