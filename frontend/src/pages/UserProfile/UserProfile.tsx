import "./UserProfile.css";
import background_form from "../../assets/background_form.png";
import { useRef, useState } from "react";
import { useUserStore } from "../../store/userStore";
import {
	useDeleteUserMutation,
	useUpdateUserMutation,
} from "../../libs/graphql/generated/graphql-types";
import { useNavigate } from "react-router-dom";
import { ApolloError } from "@apollo/client";

const UserProfile = () => {
	const navigate = useNavigate();
	const user = useUserStore((state) => state.user);
	const { updateUser: updateUserInStore } = useUserStore();

	const [updateUser] = useUpdateUserMutation();
	const [deleteUser] = useDeleteUserMutation();

	const [openModal, setOpenModal] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [message, setMessage] = useState<{ type: string; text: string } | null>(
		null,
	);

	const [editLastname, setEditLastname] = useState(false);
	const [editFirstname, setEditFirstname] = useState(false);
	const [editEmail, setEditEmail] = useState(false);

	const lastnameRef = useRef<HTMLInputElement>(null);
	const firstnameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);

	const [lastname, setLastname] = useState(user?.lastname || "");
	const [firstname, setFirstname] = useState(user?.firstname || "");
	const [email, setEmail] = useState(user?.email || "");

	const userId = user?.id;

	const handleEdit = (field: "lastname" | "firstname" | "email") => {
		if (field === "lastname") {
			setEditLastname(true);
			setTimeout(() => lastnameRef.current?.focus(), 0);
		} else if (field === "firstname") {
			setEditFirstname(true);
			setTimeout(() => firstnameRef.current?.focus(), 0);
		} else if (field === "email") {
			setEditEmail(true);
			setTimeout(() => emailRef.current?.focus(), 0);
		}
	};

	const handleCancel = (field: "lastname" | "firstname" | "email") => {
		if (!user) return;
		if (field === "lastname") {
			setLastname(user.lastname || "");
			setEditLastname(false);
		} else if (field === "firstname") {
			setFirstname(user.firstname || "");
			setEditFirstname(false);
		} else if (field === "email") {
			setEmail(user.email || "");
			setEditEmail(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!userId) {
			setMessage({ type: "error", text: "Utilisateur introuvable." });
			return;
		}
		try {
			await updateUser({
				variables: {
					data: { firstname, lastname, email },
					userId: String(userId),
				},
			});
			updateUserInStore({ firstname, lastname, email });
			setMessage({ type: "success", text: "Informations mises à jour." });
			setTimeout(() => setMessage(null), 3000);
			setEditFirstname(false);
			setEditLastname(false);
			setEditEmail(false);
		} catch (error) {
			console.error("Error updating user:", error);
			setMessage({ type: "error", text: "Erreur lors de la mise à jour." });
		}
	};

	const handleDeleteAccount = async () => {
		if (!userId) {
			setMessage({ type: "error", text: "Utilisateur introuvable." });
			return;
		}
		try {
			await deleteUser({
				variables: { userId: String(userId), password },
			});

			useUserStore.getState().clearUser();
			localStorage.removeItem("token");

			setMessage({ type: "success", text: "Compte supprimé avec succès." });
			setTimeout(() => {
				setOpenModal(false);
				setMessage(null);
				navigate("/");
			}, 3000);
		} catch (error) {
			if (error instanceof ApolloError) {
				if (error.graphQLErrors?.[0]?.extensions?.code === "INVALID_PASSWORD") {
					setError("Mot de passe invalide. Veuillez réessayer.");
				} else {
					setError("Erreur lors de la suppression du compte.");
				}
			} else {
				setError("Une erreur inattendue est survenue.");
			}
		}
	};

	const openSmoothModal = () => {
		setShowModal(true);
		setTimeout(() => setOpenModal(true), 10);
	};

	const closeSmoothModal = () => {
		setOpenModal(false);
		setTimeout(() => setShowModal(false), 300);
		setPassword("");
		setError("");
	};

	if (!user) {
		return (
			<div className="flex items-center justify-center h-screen text-gray-500">
				<p>Veuillez vous connecter pour accéder à votre profil.</p>
			</div>
		);
	}
	return (
		<>
			<div
				className="flex flex-col items-center justify-center min-h-[82vh] bg-[#B0AFE4] p-3"
				style={{
					backgroundImage: `url(${background_form})`,
				}}
			>
				<div className=" p-6 rounded-2xl overflow-y-auto z-1 container">
					<div className="flex items-center justify-between mb-4">
						<div className="shadow-md rounded-xl p-3 bg-white w-2xl">
							<h3 className="font-bold text-center mb-5">Informations</h3>

							<form
								onSubmit={handleSubmit}
								className="space-y-5 flex flex-col items-center"
							>
								<div className="flex items-center justify-between w-full">
									<div className="border border-gray-300 rounded-[25px] px-3 py-2 flex items-center justify-between w-full mr-2">
										<span className="material-symbols-outlined">
											account_circle
										</span>
										<input
											className="w-full outline-none text-gray-800 bg-transparent pl-2"
											name="lastname"
											type="text"
											placeholder="Votre nom"
											value={lastname}
											disabled={!editLastname}
											onChange={(e) => setLastname(e.target.value)}
											ref={lastnameRef}
										/>
									</div>
									{!editLastname ? (
										<span
											className="material-symbols-outlined cursor-pointer hover:bg-[#B0AFE4] transition ease-in-out duration-200 p-2 rounded-full"
											onClick={() => handleEdit("lastname")}
										>
											edit_square
										</span>
									) : (
										<button
											type="button"
											onClick={() => handleCancel("lastname")}
											className="text-sm text-red-500 underline ml-2 cursor-pointer"
										>
											Annuler
										</button>
									)}
								</div>

								<div className="flex items-center justify-between w-full">
									<div className="border border-gray-300 rounded-[25px] px-3 py-2 flex items-center justify-between w-full mr-2">
										<span className="material-symbols-outlined">
											account_circle
										</span>
										<input
											className="w-full outline-none text-gray-800 bg-transparent pl-2"
											name="firstname"
											type="text"
											placeholder="Votre prénom"
											value={firstname}
											disabled={!editFirstname}
											onChange={(e) => setFirstname(e.target.value)}
											ref={firstnameRef}
										/>
									</div>
									{!editFirstname ? (
										<span
											className="material-symbols-outlined cursor-pointer hover:bg-[#B0AFE4] transition ease-in-out duration-200 p-2 rounded-full"
											onClick={() => handleEdit("firstname")}
										>
											edit_square
										</span>
									) : (
										<button
											type="button"
											onClick={() => handleCancel("firstname")}
											className="text-sm text-red-500 underline ml-2 cursor-pointer"
										>
											Annuler
										</button>
									)}
								</div>

								<div className="flex items-center justify-between w-full">
									<div className="border border-gray-300 rounded-[25px] px-3 py-2 flex items-center justify-between w-full mr-2">
										<span className="material-symbols-outlined">mail</span>
										<input
											className="w-full outline-none text-gray-800 bg-transparent pl-2"
											name="email"
											type="email"
											placeholder="Email"
											value={email}
											disabled={!editEmail}
											onChange={(e) => setEmail(e.target.value)}
											ref={emailRef}
										/>
									</div>
									{!editEmail ? (
										<span
											className="material-symbols-outlined cursor-pointer hover:bg-[#B0AFE4] transition ease-in-out duration-200 p-2 rounded-full"
											onClick={() => handleEdit("email")}
										>
											edit_square
										</span>
									) : (
										<button
											type="button"
											onClick={() => handleCancel("email")}
											className="text-sm text-red-500 underline ml-2 cursor-pointer"
										>
											Annuler
										</button>
									)}
								</div>

								<button
									className={`w-full max-w-[150px] text-white py-1 rounded-[25px] bg-[#706eeb] hover:bg-[#b0afe4] transition ease-in-out duration-200 ${
										message ? "mt-0" : "mt-5"
									}`}
									type="submit"
									style={{ marginBottom: message ? "0" : "20px" }}
								>
									Enregistrer
								</button>

								<p
									style={{ color: "red", textDecoration: "underline" }}
									className="text-sm cursor-pointer"
									onClick={openSmoothModal}
								>
									Supprimer mon compte
								</p>

								{showModal && (
									<div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50 transition-opacity duration-300">
										<div
											className={`
                              bg-white p-6 rounded-lg shadow-xl w-full max-w-md
                              transform transition-all duration-300 scale-95 opacity-0
                              ${openModal ? "scale-100 opacity-100" : "scale-95 opacity-0"}
                            `}
										>
											<h2 className="text-lg font-bold mb-4">
												Confirmation de suppression
											</h2>
											<p className="mb-2">
												Veuillez entrer votre mot de passe pour confirmer :
											</p>

											<input
												type="password"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
												className="border border-gray-300 rounded-md w-full p-2 mb-3"
												placeholder="Mot de passe"
											/>

											{error && (
												<p className="text-red-600 text-sm mb-2">{error}</p>
											)}
											{message && (
												<p className="text-green-600 text-sm mb-2">
													{message.text}
												</p>
											)}

											<div className="flex justify-end gap-2">
												<button
													type="button"
													className="text-gray-600 hover:underline cursor-pointer"
													onClick={closeSmoothModal}
												>
													Annuler
												</button>
												<button
													type="button"
													onClick={handleDeleteAccount}
													className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 cursor-pointer"
												>
													Supprimer
												</button>
											</div>
										</div>
									</div>
								)}

								{message && (
									<div
										className={`mt-1 text-sm text-center flex items-center justify-center gap-2 ${
											message.type === "error"
												? "text-red-500"
												: "text-green-600"
										}`}
									>
										{message.type === "success" && (
											<span className="material-symbols-outlined">
												check_circle
											</span>
										)}
										{message.text}
									</div>
								)}
							</form>
						</div>
						<div className="flex flex-col items-center w-2xl">
							<div className="shadow-md rounded-xl p-3 bg-white w-2xl px-7 mb-5">
								<h3 className="font-bold text-center mb-5">
									Ville de rattachement
								</h3>
								<div>
									<div className="flex items-center justify-center w-full mr-2 mb-3">
										<span className="material-symbols-outlined">
											location_on
										</span>
										<h4 className="font-bold">{user.city.name}</h4>
									</div>
								</div>
							</div>

							<div className="shadow-md rounded-xl p-3 bg-white w-2xl px-7">
								<div className="flex flex-col items-center justify-center w-full mr-2 mb-3">
									<span className="material-symbols-outlined mr-1">
										assignment_ind
									</span>
									<h3 className="font-bold">Statut utilisateur</h3>
									{user.role}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserProfile;
