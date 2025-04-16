import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import HomePage from "./pages/Home/HomePage.tsx";
import Inscription from "./pages/Inscription/Inscription.tsx";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard.tsx";
import Login from "./pages/Login/Login.tsx";
import MapPage from "./pages/Map/MapPage.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/inscription",
				element: <Inscription />,
			},
			{
				path: "/carte",
				element: <MapPage />,
			},
			{
				path: "/dashboard",
				element: <AdminDashboard userRole={"superAdmin"} />, // Une fois le role mis dans le contexte il faudra passer la props à ce composant
			},
			{
				path: "/login",
				element: <Login />,
			},
		],
	},
]);

export const client = new ApolloClient({
	uri: `http://localhost:${import.meta.env.VITE_GATEWAY_PORT}/api`,
	cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ApolloProvider client={client}>
			<RouterProvider router={router} />
		</ApolloProvider>
	</StrictMode>,
);
