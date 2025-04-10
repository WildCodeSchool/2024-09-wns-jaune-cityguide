import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  type InterestPoint,
  type InterestPointInput,
  useDeleteInterestPointByIdMutation,
  useGetCategoriesQuery,
  useReplaceInterestPointByIdMutation,
} from "../libs/graphql/generated/graphql-types";

type EditInterestPointModalProps = {
  point: InterestPoint;
  onClose: () => void;
};

export default function EditInterestPointModal({ point, onClose }: EditInterestPointModalProps) {
  console.log('point', point);
  console.log('point.id', point?.id);
  console.log('point.name', point?.name);
  console.log('point.description', point?.description);

  const { loading, error, data } = useGetCategoriesQuery();
  const navigate = useNavigate();
  const [replaceInterestPoint] = useReplaceInterestPointByIdMutation();
  const [deleteInterestPoint] = useDeleteInterestPointByIdMutation();

  // Gestion du formulaire de soumission
  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    const form = evt.target;
    const formData = new FormData(form as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());

    // Formatage des données
    const formattedData = {
      ...formJson,
      latitude: parseFloat(formJson.latitude as string),
      longitude: parseFloat(formJson.longitude as string),
    };

    // Appel à la mutation GraphQL
    replaceInterestPoint({
      variables: {
        data: formattedData as InterestPointInput,
        interestPointId: point.id.toString()  // Utilisation de point.id pour la mutation
      },
    });
  };

  // Suppression du point d'intérêt
  const handleDelete = async () => {
    await deleteInterestPoint({ variables: { interestPointId: point.id.toString() } });
    navigate("/");  // Redirection après suppression
  };

  // Gestion des erreurs et chargement
  if (error) return <>Error!</>;
  if (loading) return <>Loading...</>;
  if (!data) return <>We couldn't find anything to display</>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay gris semi-transparent - z-40 pour être sous la modale */}
      <div
        className="absolute inset-0 bg-black/50 z-40"
        onClick={onClose}  // Appel de la méthode onClose passée en prop
      ></div>

      {/* Modale - z-50 pour passer au-dessus de l’overlay */}
      <div className="relative bg-white p-6 rounded-xl w-11/12 max-w-lg shadow-xl z-50">
        <h2 className="text-xl font-bold mb-4 text-center">Modifier le point d'intérêt</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Champs du formulaire */}
          <div>
            <label className="block font-semibold mb-1">Nom</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              name="name"
              defaultValue={point.name}  // Valeur par défaut venant des point
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Description</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              name="description"
              defaultValue={point.description}  // Valeur par défaut venant des point
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Adresse</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              name="address"
              defaultValue={point.address}  // Valeur par défaut venant des point
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Latitude</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              name="latitude"
              type="number"
              defaultValue={point.latitude}  // Valeur par défaut venant des point
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Longitude</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              name="longitude"
              type="number"
              defaultValue={point.longitude}  // Valeur par défaut venant des point
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">URL du lien</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              name="link_url"
              defaultValue={point.link_url}  // Valeur par défaut venant des point
            />
          </div>

          {/* Sélecteur de catégorie */}
          <div>
            <label className="block font-semibold mb-1">Catégorie</label>
            <select
              name="category"
              className="w-full border border-gray-300 rounded px-3 py-2"
              defaultValue={point.category.id}  // Valeur par défaut venant des point
            >
              {data?.getCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sélecteur de ville */}
          <div>
            <label className="block font-semibold mb-1">Ville</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              name="city"
              defaultValue={point.city.id}  // Valeur par défaut venant des point
            />
          </div>

          {/* Boutons de soumission */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Sauvegarder
            </button>
          </div>
        </form>

        {/* Bouton de suppression */}
        <div className="flex justify-end pt-2">
          <button
            type="button"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={handleDelete}  // Suppression du point d'intérêt
          >
            Supprimer le point
          </button>
        </div>
      </div>
    </div>
  );
}
