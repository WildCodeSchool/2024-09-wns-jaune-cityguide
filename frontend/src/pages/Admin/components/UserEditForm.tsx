import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";

// --- GraphQL Mutations ---
const UPDATE_USER = gql`
  mutation UpdateUser($data: UpdateUserInput!, $userId: String!) {
    updateUser(data: $data, userId: $userId) {
      id
      firstname
      lastname
      email
      role
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($userId: String!) {
    deleteUser(userId: $userId) {
      id
    }
  }
`;

// --- Types ---
type UserRole = "user" | "cityadmin" | "superuser";

type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: UserRole;
};

type Props = {
  user: User;
  onUserUpdated: (updatedUser: User) => void;
  onUserDeleted: (userId: string) => void;
};

// --- Component ---
export default function UserEditForm({
  user,
  onUserUpdated,
  onUserDeleted,
}: Props) {
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [role, setRole] = useState<UserRole>(user.role);

  const [updateUserMutation] = useMutation(UPDATE_USER);
  const [deleteUserMutation] = useMutation(DELETE_USER);

  useEffect(() => {
    setFirstname(user.firstname);
    setLastname(user.lastname);
    setRole(user.role);
  }, [user]);

  const toGraphQLEnumRole = {
    user: "USER",
    cityadmin: "CITY_ADMIN",
    superuser: "SUPER_USER",
    superadmin: "SUPER_ADMIN",
  } as const;

  const handleUpdate = async () => {
    try {
      const { data } = await updateUserMutation({
        variables: {
          userId: user.id,
          data: {
            firstname,
            lastname,
            role: toGraphQLEnumRole[role],
          },
        },
      });

      if (data?.updateUser) {
        onUserUpdated(data.updateUser);
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Es-tu sûr de vouloir supprimer cet utilisateur ?")) return;

    try {
      await deleteUserMutation({
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nom</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
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
            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 text-gray-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Rôle
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="user">Utilisateur</option>
            <option value="cityadmin">Admin de ville</option>
            <option value="superuser">Super utilisateur</option>
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
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
        >
          Supprimer l’utilisateur
        </button>
      </div>
    </div>
  );
}
