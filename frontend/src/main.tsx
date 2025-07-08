import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import TutorialPage from "./pages/Tutorial/TutorialPage.tsx";
import Inscription from "./pages/Inscription/Inscription.tsx";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard.tsx";
import Login from './pages/Login/Login.tsx';
import LandingPage from "./pages/LandingPage/LandingPage.tsx";
import MapPage from "./pages/Map/MapPage.tsx";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.tsx";
import ResetPassword from "./pages/ResetPassword/ResetPassword.tsx";
import CategoryManager from "./pages/CategoryManager/CategoryManager.tsx";
import ModificationProfile from "./pages/ModificationProfile/ModificationProfile.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <LandingPage />,
			},
			{
				path: "/tutorial",
				element: <TutorialPage />,
			},
			{
				path: "/inscription",
				element: <Inscription />,
			},
			{
				path: "/map",
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
			{
				path: "/modificationProfile",
				element: <ModificationProfile />,
			},
			{
				path: "/forgotPassword",
				element: <ForgotPassword />
			},
			{
				path: "/resetPassword",
				element: <ResetPassword />
			},
		],
	},
]);

export const client = new ApolloClient({
	uri: `http://localhost:${import.meta.env.VITE_GATEWAY_PORT}/api`,
	cache: new InMemoryCache(),
	credentials: "include",
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ApolloProvider client={client}>
			<RouterProvider router={router} />
		</ApolloProvider>
	</StrictMode>,
);
