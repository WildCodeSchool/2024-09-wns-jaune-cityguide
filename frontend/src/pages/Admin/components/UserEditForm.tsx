import { useEffect, useState } from "react";
import { useUpdateUserMutation, UserRole, GetUserByIdQuery, useDeleteUserByAdminMutation } from "../../../libs/graphql/generated/graphql-types";
import { motion } from "framer-motion";


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
  const [successUpdatePopup, setSuccessUpdatePopup] = useState(false);
  const [successUpdateMessage, setSuccessUpdateMessage] = useState("");

  const [updateUser] = useUpdateUserMutation();
  const [deleteUserByAdmin] = useDeleteUserByAdminMutation();;

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
      setSuccessUpdateMessage("Utilisateur mis à jour avec succès ! 🎉");
      setSuccessUpdatePopup(true);
      setTimeout(() => {
        setSuccessUpdatePopup(false);
      }, 3000);
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Es-tu sûr de vouloir supprimer cet utilisateur ?")) return;

    try {
      await deleteUserByAdmin({
        variables: {
          userId: user.id,
        },
      });

      setSuccessUpdateMessage("Utilisateur supprimé avec succès ! 🗑️");
      setSuccessUpdatePopup(true);
      setTimeout(() => {
        setSuccessUpdatePopup(false);
      }, 3000);

      onUserDeleted(user.id);
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-white border border-gray-200 rounded-xl shadow-md p-6 mx-auto max-w-2xl w-full space-y-5">
      
      <h2 className="text-xl font-bold text-gray-800 text-center">Modifier l’utilisateur</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Prénom</label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nom</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="text"
            value={user.email}
            readOnly
            className="mt-1 block w-full rounded-md bg-gray-100 border border-gray-300 px-3 py-2 text-sm text-gray-500"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Rôle</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={UserRole.User}>Utilisateur</option>
            <option value={UserRole.CityAdmin}>Admin de ville</option>
            <option value={UserRole.SuperUser}>Super utilisateur</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center sm:justify-between gap-3 pt-4">
        <button
          onClick={handleUpdate}
          className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded"
        >
          Sauvegarder
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 cursor-pointer hover:bg-red-700 text-white text-sm font-semibold py-2 px-4 rounded"
        >
          Supprimer l’utilisateur
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-200 cursor-pointer hover:bg-gray-300 text-gray-800 text-sm font-semibold py-2 px-4 rounded"
        >
          Annuler
        </button>
      </div>

      {successUpdatePopup && (
        <div className="fixed top-20 right-4 max-w-xs w-full bg-white border-l-4 border-[#706eeb] px-4 py-3 shadow-lg rounded-md flex items-start space-x-2 z-50">
          <div className="text-[#706eeb]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mt-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-sm text-[#706eeb] font-medium">{successUpdateMessage}</p>
        </div>
      )}
    </motion.div>
  );
}
