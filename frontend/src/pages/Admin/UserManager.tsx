import { useState, useRef, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import UserStats from "./components/UserStats";
import UserList from "./components/UserList";
import UserEditForm from "./components/UserEditForm";
import { AnimatePresence, motion } from "framer-motion";
import {
	type GetUserByIdQuery,
	useGetUserByIdQuery,
	useGetUsersQuery,
} from "../../libs/graphql/generated/graphql-types";
import { useUserStore } from "../../store/userStore";

export default function UserManager() {
	const { user: currentUser, fetchUsers } = useUserStore((state) => ({
		user: state.user,
		fetchUsers: state.fetchUsers,
	}));

	const { data, loading, error, refetch } = useGetUsersQuery();
	const [selectedUser, setSelectedUser] = useState<string | null>(null);
	const [selectedCardRef] = useState<HTMLDivElement | null>(null);
	const [searchUser, setSearchUser] = useState("");
	const formRef = useRef<HTMLDivElement | null>(null);
	const [showAllUsers, setShowAllUsers] = useState(false);
	const userRefs = useRef<Record<string, HTMLDivElement | null>>({});

	const { data: selectedUserData } = useGetUserByIdQuery({
		variables: { userId: selectedUser || "" },
		skip: !selectedUser,
	});

	useEffect(() => {
		if (selectedUser && selectedUserData?.getUserById && formRef.current) {
			formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	}, [selectedUser, selectedUserData]);

	if (!currentUser) {
		return (
			<div className="flex items-center justify-center h-screen text-gray-500">
				<p>
					Vous devez être connecté pour accéder à la gestion des utilisateurs.
				</p>
			</div>
		);
	}

	if (loading) return <p>Chargement des utilisateurs...</p>;
	if (error) return <p>Erreur : {error.message}</p>;
	if (!data) return <p>Aucun utilisateur trouvé.</p>;

	const users = data?.getUsers || [];

	const filteredUsers = users.filter((user) =>
		`${user.firstname} ${user.lastname}`
			.toLowerCase()
			.includes(searchUser.toLowerCase()),
	);

	const handleUserUpdated = async (
		updatedUser: GetUserByIdQuery["getUserById"],
	) => {
		setSelectedUser(updatedUser.id);
		await refetch();
		fetchUsers();
	};

	const handleUserDeletedByAdmin = async () => {
		setSelectedUser(null);
		await refetch();
		fetchUsers();
	};

	const handleCancel = () => {
		setSelectedUser(null);
		if (selectedCardRef) {
			selectedCardRef.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	};

	return (
		<div className="w-full p-6 space-y-6 bg-gray-50 min-h-screen">
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
						transition={{ duration: 0.3, ease: "easeInOut" }}
					>
						<UserEditForm
							user={selectedUserData.getUserById}
							onUserUpdated={handleUserUpdated}
							onUserDeleted={handleUserDeletedByAdmin}
							onCancel={handleCancel}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
