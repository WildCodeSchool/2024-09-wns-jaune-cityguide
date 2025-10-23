import { useState } from "react";
import {
	type CategoryInput,
	type UpdateCategoryInput,
	useCreateCategoryMutation,
	useDeleteCategoryByIdMutation,
	useGetCategoriesQuery,
	useGetCategoryByIdQuery,
	useReplaceCategoryByIdMutation,
} from "../../libs/graphql/generated/graphql-types";

const CategoryManager = () => {
	const { data, loading, error } = useGetCategoriesQuery();
	const [createCategory] = useCreateCategoryMutation();
	const [replaceCategory] = useReplaceCategoryByIdMutation();
	const [deleteCategory] = useDeleteCategoryByIdMutation();

	const [searchedCategory, setSearchedCategory] = useState("");

	const [showCreationPopup, setShowCreationPopup] = useState(false);
	const [successCreationPopup, setSuccessCreationPopup] = useState(false);
	const [successCreationMessage, setSuccessCreationMessage] = useState("");

	const [showUpdatePopup, setShowUpdatePopup] = useState(false);
	const [successUpdatePopup, setSuccessUpdatePopup] = useState(false);
	const [successUpdateMessage, setSuccessUpdateMessage] = useState("");

	const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
		null,
	);

	const { data: selectedCategoryData } = useGetCategoryByIdQuery({
		variables: { categoryId: selectedCategoryId || "" },
		skip: !selectedCategoryId,
	});

	const categories = data?.getCategories || [];
	const filteredCategories = categories.filter((category) =>
		category.name.toLowerCase().includes(searchedCategory.toLowerCase()),
	);

	if (loading) return <p className="text-center mt-10">Chargement...</p>;
	if (error)
		return (
			<p className="text-center text-red-500 mt-10">
				Erreur de chargement des catégories
			</p>
		);

	const handleShowPopup = () => {
		setShowCreationPopup(true);
	};

	const handleSelectCategory = (id: string) => {
		setSelectedCategoryId(id);
		setShowUpdatePopup(true);
	};

	const handleCreateCategory = async (evt: React.FormEvent) => {
		evt.preventDefault();
		const form = evt.target as HTMLFormElement;
		const formData = new FormData(form);
		const formJson = Object.fromEntries(formData.entries()) as CategoryInput;

		try {
			await createCategory({
				variables: {
					data: {
						name: formJson.name,
						description: formJson.description,
						color: formJson.color,
					},
				},
				refetchQueries: ["GetCategories"],
			});
			setSuccessCreationMessage("Catégorie créée avec succès ! 🎉");
			setSuccessCreationPopup(true);
			setTimeout(() => {
				setSuccessCreationPopup(false);
				setShowCreationPopup(false);
			}, 3000);
		} catch (error) {
			console.error("Erreur lors de la création de la catégorie :", error);
		}
	};

	const handleUpdateCategory = async (evt: React.FormEvent) => {
		evt.preventDefault();
		const form = evt.target as HTMLFormElement;
		const formData = new FormData(form);
		const formJson = Object.fromEntries(
			formData.entries(),
		) as UpdateCategoryInput;

		if (!selectedCategoryId) return;

		try {
			await replaceCategory({
				variables: {
					categoryId: selectedCategoryId,
					data: {
						name: formJson.name,
						description: formJson.description,
						color: formJson.color,
					},
				},
				refetchQueries: ["GetCategories"],
			});
			setSuccessUpdateMessage("Catégorie mise à jour avec succès ! 🎉");
			setSuccessUpdatePopup(true);
			setTimeout(() => {
				setSuccessUpdatePopup(false);
				setShowUpdatePopup(false);
				setSelectedCategoryId(null);
			}, 3000);
		} catch (error) {
			console.error("Erreur lors de la mise à jour :", error);
		}
	};

	const handleDeleteCategory = async (id: string | null) => {
		if (!id) return;

		try {
			await deleteCategory({
				variables: { categoryId: id },
				refetchQueries: ["GetCategories"],
			});
			setSuccessUpdateMessage("Catégorie supprimée avec succès ! 🎉");
			setSuccessUpdatePopup(true);
			setTimeout(() => {
				setSuccessUpdatePopup(false);
				setShowUpdatePopup(false);
				setSelectedCategoryId(null);
			}, 3000);
		} catch (error) {
			console.error("Erreur lors de la suppression :", error);
		}
	};

	return (
		<div className="w-full p-6 space-y-8 min-h-[80vh]">
			<div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
				<div className="w-full sm:w-auto">
					<label
						htmlFor="search-category"
						className="block text-[#706EEB] font-medium mb-2"
					>
						Rechercher une Catégorie :
					</label>
					<div className="flex items-center bg-white rounded-full border-2 border-[#706EEB] px-4 py-2 shadow-md">
						<input
							id="search-category"
							type="text"
							value={searchedCategory}
							onChange={(e) => setSearchedCategory(e.target.value)}
							placeholder="Catégorie"
							className="outline-none w-full text-gray-700 placeholder-gray-400"
						/>
						<span
							className="material-symbols-outlined text-[#706EEB] cursor-pointer ml-2"
							onClick={() => setSearchedCategory("")}
						>
							close
						</span>
					</div>
				</div>

				<div className="bg-white border-2 border-[#706EEB] px-6 py-2 rounded-xl shadow-md text-center">
					<p className="text-[#706EEB] text-sm font-medium">
						Nombre de catégories
					</p>
					<p className="text-3xl font-bold text-[#706EEB]">
						{categories.length}
					</p>
				</div>
			</div>

			<div>
				<button
					type="button"
					className="bg-[#706EEB] text-white px-4 py-2 rounded-full shadow-md hover:bg-[#5a58d6] cursor-pointer transition"
					onClick={handleShowPopup}
				>
					+ Ajouter une catégorie
				</button>
			</div>

			{showCreationPopup && (
				<div className="fixed inset-0 bg-black/20 my-0 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out animate-fade-in">
					<div className="relative bg-white max-w-md w-full px-6 py-5 rounded-xl shadow-lg border-2 border-[#706eeb] transform transition-all duration-300 ease-out scale-95 animate-scale-in">
						<button
							type="button"
							onClick={() => setShowCreationPopup(false)}
							className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition cursor-pointer"
						>
							Fermer
						</button>

						<div className="text-sm text-[#706eeb] font-medium space-y-2 mt-6">
							<form
								onSubmit={handleCreateCategory}
								className="space-y-5 flex flex-col"
							>
								<label
									htmlFor="name"
									className="block text-sm/6 font-medium text-gray-900 mb-1"
								>
									Catégorie
								</label>
								<div className="border border-gray-300 rounded-[25px] px-3 py-2">
									<input
										className="w-full outline-none text-gray-800 bg-transparent pl-2"
										name="name"
										type="text"
										placeholder="Nom de la catégorie"
										required={true}
									/>
								</div>

								<label
									htmlFor="color"
									className="block text-sm/6 font-medium text-gray-900 mb-1"
								>
									Couleur
								</label>
								<div className="border border-gray-300 rounded-[25px] px-3 py-2">
									<input
										className="w-full outline-none text-gray-800 bg-transparent pl-2"
										name="color"
										type="text"
										placeholder="Ajoutez un code couleur"
										required={true}
									/>
								</div>

								<label
									htmlFor="description"
									className="block text-sm/6 font-medium text-gray-900 mb-1"
								>
									Déscription
								</label>
								<textarea
									name="description"
									rows={4}
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
									required={true}
								/>

								<div className="flex items-center justify-between w-full">
									<button
										className="w-full max-w-[150px] text-white py-1 rounded-[25px] bg-[#706eeb] hover:bg-[#b0afe4] mt-0 cursor-pointer"
										type="submit"
									>
										Ajouter
									</button>

									<button
										type="button"
										className="w-full max-w-[150px] text-white py-1 rounded-[25px] bg-[#706eeb] hover:bg-[#b0afe4] mt-0 cursor-pointer"
										onClick={() => setShowCreationPopup(false)}
									>
										Annuler
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}

			{successCreationPopup && (
				<div className="fixed top-20 right-3 max-w-[350px] w-auto mt-5 bg-white border-3 border-[#706eeb] px-6 py-4 rounded-xl shadow-lg flex items-center justify-start space-x-3 transition-all ease-in-out duration-300 transform opacity-100 scale-100">
					<div className="absolute top-[-12px] left-[-12px] bg-[#706eeb] p-1 rounded-full text-white">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>
					<div className="text-sm text-[#706eeb] font-medium">
						{successCreationMessage}
					</div>
				</div>
			)}

			<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
				{filteredCategories.map((category) => (
					<button
						type="button"
						key={category.id}
						className="rounded-xl px-4 py-3 text-center shadow-md border-2 transition-all bg-white text-[#fff] font-semibold border-[#333] hover:bg-[#f5f5ff] cursor-pointer"
						onClick={() => handleSelectCategory(category.id)}
						style={{ backgroundColor: category.color }}
					>
						{category.name}
					</button>
				))}
			</div>
			{showUpdatePopup && selectedCategoryData && (
				<div className="fixed inset-0 bg-black/20 my-0 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out animate-fade-in">
					<div className="relative bg-white max-w-md w-full px-6 py-5 rounded-xl shadow-lg border-2 border-[#706eeb] transform transition-all duration-300 ease-out scale-95 animate-scale-in">
						<button
							type="button"
							onClick={() => {
								setShowUpdatePopup(false);
								setSelectedCategoryId(null);
							}}
							className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition cursor-pointer"
						>
							Fermer
						</button>

						<div className="text-sm text-[#706eeb] font-medium space-y-2 mt-6">
							<form
								onSubmit={handleUpdateCategory}
								className="space-y-5 flex flex-col"
							>
								<label
									htmlFor="name"
									className="block text-sm/6 font-medium text-gray-900 mb-1"
								>
									Catégorie
								</label>
								<div className="border border-gray-300 rounded-[25px] px-3 py-2">
									<input
										className="w-full outline-none text-gray-800 bg-transparent pl-2"
										name="name"
										type="text"
										placeholder="Nom de la catégorie"
										defaultValue={selectedCategoryData.getCategoryById.name}
									/>
								</div>

								<label
									htmlFor="color"
									className="block text-sm/6 font-medium text-gray-900 mb-1"
								>
									Couleur
								</label>
								<div className="border border-gray-300 rounded-[25px] px-3 py-2">
									<input
										className="w-full outline-none text-gray-800 bg-transparent pl-2"
										name="color"
										type="text"
										placeholder="Ajoutez un code couleur"
										defaultValue={selectedCategoryData.getCategoryById.color}
									/>
								</div>

								<label
									htmlFor="description"
									className="block text-sm/6 font-medium text-gray-900 mb-1"
								>
									Description
								</label>
								<textarea
									name="description"
									rows={4}
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
									defaultValue={
										selectedCategoryData.getCategoryById.description ?? ""
									}
								/>

								<div className="flex items-center justify-between w-full gap-4">
									<button
										className="w-full max-w-[150px] text-white py-1 rounded-[25px] bg-[#706eeb] hover:bg-[#b0afe4] mt-0 cursor-pointer"
										type="submit"
									>
										Modifier
									</button>

									<button
										type="button"
										className="w-full max-w-[150px] text-white py-1 rounded-[25px] bg-[#706eeb] hover:bg-[#b0afe4] mt-0 cursor-pointer"
										onClick={() => {
											setShowUpdatePopup(false);
											setSelectedCategoryId(null);
										}}
									>
										Annuler
									</button>

									<button
										type="button"
										className="w-full max-w-[150px] text-white py-1 rounded-[25px] bg-[#FF0000] hover:bg-[#b0afe4] mt-0 cursor-pointer"
										onClick={() => {
											setShowUpdatePopup(false);
											setSelectedCategoryId(null);
											handleDeleteCategory(selectedCategoryId);
										}}
									>
										Supprimer
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}

			{successUpdatePopup && (
				<div className="fixed top-20 right-3 max-w-[350px] w-auto mt-5 bg-white border-3 border-[#706eeb] px-6 py-4 rounded-xl shadow-lg flex items-center justify-start space-x-3 transition-all ease-in-out duration-300 transform opacity-100 scale-100">
					<div className="absolute top-[-12px] left-[-12px] bg-[#706eeb] p-1 rounded-full text-white">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>
					<div className="text-sm text-[#706eeb] font-medium">
						{successUpdateMessage}
					</div>
				</div>
			)}
		</div>
	);
};

export default CategoryManager;
