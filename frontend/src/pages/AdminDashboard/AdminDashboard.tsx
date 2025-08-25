import { useState } from "react";
import UserManager from "../Admin/UserManager";
import CityManager from "./CityManager/CityManager";
import CategoryManager from "../CategoryManager/CategoryManager";
import { UserRole } from "../../libs/graphql/generated/graphql-types";
import { useUserStore } from "../../store/userStore";

const tabs = [
	{ id: "cities", label: "Villes", roles: [UserRole.SuperAdmin, UserRole.CityAdmin] },
	{
		id: "users",
		label: "Utilisateurs",
		roles: [UserRole.SuperAdmin, UserRole.CityAdmin],
	},
  { id: "categories", label: "Catégories", roles: [UserRole.SuperAdmin] },
];

export default function Dashboard() {
  const user = useUserStore((state) => state.user);

	const accessibleTabs = user 
  ? tabs.filter((tab) => tab.roles.includes(user.role)) 
  : [];
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
      
				{activeTab === "users" && <UserManager />}
         
        {activeTab === "categories" && <CategoryManager />}
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
