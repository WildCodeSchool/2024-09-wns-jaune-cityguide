import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./organisms/Footer";
import Header from "./organisms/Header";
import { useCitiesStore } from "./store/citiesStore";
import { useEffect } from "react";
import { useUserStore } from "./store/userStore";

export function App() {
	const { fetchCities } = useCitiesStore();
	const { fetchUsers } = useUserStore();

	useEffect(() => {
		fetchCities();
		fetchUsers();
	}, [fetchCities, fetchUsers]);

	return (
		<div className="flex flex-col min-h-screen max-h-screen overflow-y-hidden">
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
}
