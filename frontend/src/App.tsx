import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./organisms/Footer";
import Header from "./organisms/Header";
import { useCitiesStore } from "./store/citiesStore";
import { useEffect } from "react";

export function App() {
	const { fetchCities, isLoaded } = useCitiesStore();

	useEffect(() => {
		if (!isLoaded) {
			fetchCities();
		}
	}, [fetchCities, isLoaded]);

	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-1">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}
