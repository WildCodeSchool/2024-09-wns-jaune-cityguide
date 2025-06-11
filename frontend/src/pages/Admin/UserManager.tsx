import { useState, useRef, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import UserStats from "./components/UserStats";
import UserList from "./components/UserList";
import UserEditForm from "./components/UserEditForm";
import { AnimatePresence, motion } from "framer-motion";
import { GetUserByIdQuery, useGetUserByIdQuery, useGetUsersQuery } from "../../libs/graphql/generated/graphql-types";

export default function UserManager() {
  const { data, loading, error, refetch } = useGetUsersQuery();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedCardRef, setSelectedCardRef] = useState<HTMLDivElement | null>(null);
  const [searchUser, setSearchUser] = useState("");
  const formRef = useRef<HTMLDivElement | null>(null);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const userRefs = useRef<Record<string, HTMLDivElement | null>>({});


  const { data: selectedUserData } = useGetUserByIdQuery({
    variables: { userId: selectedUser || "" },
    skip: !selectedUser, // Ne pas exécuter la requête si aucun utilisateur n'est sélectionné
  });

  useEffect(() => {
    if (selectedUser && selectedUserData?.getUserById && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedUser, selectedUserData]);

  if (loading) return <p>Chargement des utilisateurs...</p>;
  if (error) return <p>Erreur : {error.message}</p>;
  if (!data) return <p>Aucun utilisateur trouvé.</p>;

  const users = data?.getUsers || [];

  const filteredUsers = users.filter((user) =>
    `${user.firstname} ${user.lastname}`
      .toLowerCase()
      .includes(searchUser.toLowerCase())
  );

  const handleUserUpdated = async (updatedUser: GetUserByIdQuery["getUserById"]) => {
    setSelectedUser(updatedUser.id);
    await refetch();
  };

  const handleUserDeleted = async () => {
    setSelectedUser(null);
    await refetch();
  };

  const handleCancel = () => {
    setSelectedUser(null);
    if (selectedCardRef) {
      selectedCardRef.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-center">
        <SearchBar searchTerm={searchUser} onSearch={setSearchUser} />
      </div>

      <div className="flex justify-center">
        <UserStats users={filteredUsers} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <UserList
          users={filteredUsers}
          onSelect={(id) => setSelectedUser(id)}
          showAll={showAllUsers}
          onShowMore={() => setShowAllUsers(true)}
          onShowLess={() => setShowAllUsers(false)}
          userRefs={userRefs}
        />
      </div>

      <AnimatePresence>
        {selectedUser && selectedUserData?.getUserById && (
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}>
              
            <UserEditForm
              user={selectedUserData.getUserById}
              onUserUpdated={handleUserUpdated}
              onUserDeleted={handleUserDeleted}
              onCancel={handleCancel}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
