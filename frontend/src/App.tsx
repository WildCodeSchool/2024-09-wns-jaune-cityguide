import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./organisms/Footer";
import Header from "./organisms/Header";
import { useCitiesStore } from "./store/citiesStore";
import { useEffect } from "react";

export function App() {
	const { fetchCities } = useCitiesStore();

	useEffect(() => {
		fetchCities();
	}, [fetchCities]);

	return (
		<div className="flex flex-col min-h-screen max-h-screen overflow-y-hidden">
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
}
