import { useState } from "react";
import SearchBar from "./components/SearchBar";
import UserStats from "./components/UserStats";
import UserList from "./components/UserList";
import UserEditForm from "./components/UserEditForm";
import { GetUserByIdQuery, GetUsersQuery, useGetUserByIdQuery, useGetUsersQuery } from "../../libs/graphql/generated/graphql-types";

export default function UserManager() {
  const { data, loading, error, refetch } = useGetUsersQuery();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [searchUser, setSearchUser] = useState("");

  const { data: selectedUserData } = useGetUserByIdQuery({
    variables: { userId: selectedUser || "" },
    skip: !selectedUser, // Ne pas exécuter la requête si aucun utilisateur n'est sélectionné
  });

  if (loading) return <p>Chargement des utilisateurs...</p>;
  if (error) return <p>Erreur : {error.message}</p>;
  if (!data) return <p>Aucun utilisateur trouvé.</p>;

  const users = data?.getUsers || [];

  const filteredUsers = users.filter((user) =>
    `${user.firstname} ${user.lastname}`
      .toLowerCase()
      .includes(searchUser.toLowerCase())
  );

  const handleUserSelect = (user: GetUsersQuery["getUsers"][0]) => {
    setSelectedUser(user.id);
  };

  const handleUserUpdated = async (updatedUser: GetUserByIdQuery["getUserById"]) => {
    setSelectedUser(updatedUser.id);
    await refetch();
  };

  const handleUserDeleted = async () => {
    setSelectedUser(null);
    await refetch();
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-center">
        <SearchBar searchTerm={searchUser} onSearch={setSearchUser} />
      </div>

      <div className="flex justify-center">
        <UserStats users={filteredUsers} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <UserList users={filteredUsers} onSelect={handleUserSelect} />
      </div>

      {selectedUser && selectedUserData?.getUserById && (
        <UserEditForm
          user={selectedUserData.getUserById}
          onUserUpdated={handleUserUpdated}
          onUserDeleted={handleUserDeleted}
        />
      )}
    </div>
  );
}
