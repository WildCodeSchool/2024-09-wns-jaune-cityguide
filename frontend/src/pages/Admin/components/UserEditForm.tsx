import { useEffect, useState } from "react";
import { useUpdateUserMutation, UserRole, GetUserByIdQuery, useDeleteUserMutation } from "../../../libs/graphql/generated/graphql-types";


// --- Types ---
type Props = {
  user: GetUserByIdQuery["getUserById"];
  onUserUpdated: (updatedUser: GetUserByIdQuery["getUserById"]) => void;
  onUserDeleted: (userId: string) => void;
  onCancel: () => void;
};

// --- Component ---
export default function UserEditForm({
  user,
  onUserUpdated,
  onUserDeleted,
  onCancel,
}: Props) {
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [role, setRole] = useState<UserRole>(user.role);

  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  useEffect(() => {
    setFirstname(user.firstname);
    setLastname(user.lastname);
    setRole(user.role);
  }, [user]);

  const handleUpdate = async () => {
    try {
      const { data } = await updateUser({
        variables: {
          userId: user.id,
          data: {
            firstname,
            lastname,
            role,
          },
        },
      });

      if (data?.updateUser) {
        onUserUpdated(data.updateUser as Props["user"]);
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Es-tu sûr de vouloir supprimer cet utilisateur ?")) return;

    try {
      await deleteUser({
        variables: {
          userId: user.id,
        },
      });

      onUserDeleted(user.id);
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 space-y-4 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800">
        Modifier l’utilisateur
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Prénom
          </label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nom</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="text"
            value={user.email}
            readOnly
            className="p-2 mt-1 block w-full rounded-md border-gray-300 bg-gray-100 text-gray-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Rôle
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value={UserRole.User}>Utilisateur</option>
            <option value={UserRole.CityAdmin}>Admin de ville</option>
            <option value={UserRole.SuperUser}>Super utilisateur</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={handleUpdate}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Sauvegarder
        </button>

        <button
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
        >
          Annuler
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
        >
          Supprimer l’utilisateur
        </button>
      </div>
    </div>
  );
}
