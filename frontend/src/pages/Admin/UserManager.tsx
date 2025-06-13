import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import SearchBar from "./components/SearchBar";
import UserStats from "./components/UserStats";
import UserList from "./components/UserList";
import UserEditForm from "./components/UserEditForm";
import { UserRole } from "../../libs/graphql/generated/graphql-types";

type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: UserRole;
};

const GET_USERS = gql`
  query {
    getUsers {
      id
      firstname
      lastname
      email
      role
    }
  }
`;

export default function UserManager() {
  const { data, loading, error, refetch } = useQuery(GET_USERS);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) return <p>Chargement des utilisateurs...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  const users: User[] = data?.getUsers || [];

  const filteredUsers = users.filter((user) =>
    `${user.firstname} ${user.lastname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  const handleUserUpdated = (updatedUser: User) => {
    setSelectedUser(updatedUser);
    refetch();
  };

  const handleUserDeleted = (userId: string) => {
    setSelectedUser(null);
    refetch(); // recharge les users
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-center">
        <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      </div>

      <div className="flex justify-center">
        <UserStats users={filteredUsers} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <UserList users={filteredUsers} onSelect={handleUserSelect} />
      </div>

      {selectedUser && (
        <UserEditForm
          user={selectedUser}
          onUserUpdated={handleUserUpdated}
          onUserDeleted={handleUserDeleted}
        />
      )}
    </div>
  );
}
