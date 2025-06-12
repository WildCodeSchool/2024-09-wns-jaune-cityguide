import { useState } from "react";
import UserManager from "../Admin/UserManager";
import CityManager from "./CityManager/CityManager";
import CategoryManager from "../CategoryManager/CategoryManager";

type Props = {
	userRole: string;
};

// L'utilisateur sera passé en prop ou stocké dans un contexte (par exemple `role`)
// Ici, on suppose que le rôle de l'utilisateur est "superAdmin", "adminVille", ou "user"
// // Si l'utilisateur est "user" il verra une page blanche
const tabs = [
	{ id: "cities", label: "Villes", roles: ["superadmin", "cityadmin"] },
	{ id: "categories", label: "Catégories", roles: ["superadmin"] },
	{
		id: "users",
		label: "Utilisateurs",
		roles: ["superadmin", "cityadmin"],
	},
];

export default function Dashboard({ userRole }: Props) {
	// TODO: uncomment this when user role is implemented
	// const accessibleTabs = tabs.filter((tab) => tab.roles.includes(userRole));
	// const [activeTab, setActiveTab] = useState(
	// 	accessibleTabs.length > 0 ? accessibleTabs[0].id : null,
	// );

	const accessibleTabs = tabs;
	const [activeTab, setActiveTab] = useState(
		accessibleTabs.length > 0 ? accessibleTabs[0].id : null,
	);

	return (
		<div className="flex flex-col grow max-h-screen sm:h-full overflow-hidden w-full bg-gray-50">
			<header className="p-6 sm:p-9 bg-white">
				<h1 className="text-3xl font-bold text-gray-900">Administrateur</h1>
			</header>

			<nav className="bg-white border-b border-gray-300">
				<ul className="flex w-full">
					{accessibleTabs.map((tab) => (
						<li key={tab.id} className="flex-1">
							<button
								type="button"
								onClick={() => setActiveTab(tab.id)}
								className={`w-full cursor-pointer py-3 text-center text-lg font-medium 
                  ${
										activeTab === tab.id
											? "border-b-4 border-indigo-600 text-indigo-600"
											: "text-gray-600 hover:text-indigo-500"
									} transition-colors duration-300`}
								aria-current={activeTab === tab.id ? "page" : undefined}
							>
								{tab.label}
							</button>
						</li>
					))}
				</ul>
			</nav>

			<main className="flex grow p-3 w-full overflow-auto">
				{activeTab === "cities" && <CityManager />}
				{activeTab === "categories" && <CategoryManager />}
				{activeTab === "users" && <UserManager />}
				{!activeTab && (
					<div className="text-gray-500 text-lg flex grow text-justify">
						Vous n&rsquo;avez pas l&rsquo;autorisation d&rsquo;accéder à cette
						page.
					</div>
				)}
			</main>
		</div>
	);
}
