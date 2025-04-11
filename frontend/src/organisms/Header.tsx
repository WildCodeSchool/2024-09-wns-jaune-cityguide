import { useState } from "react";
import logo from "../assets/logo_city_guide_good.png";
import { Link } from "react-router-dom";
import SearchBar from "../atoms/SearchBar";

export default function Navbar() {
	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<>
			<nav className="nav-container primary-bg z-50 h-20 flex items-center justify-between">
				<div className="desktop-nav hidden sm:flex items-center justify-between h-full w-full p-14">
					{/* Logo */}
					<div className="logo-container flex">
						<a href="/" className="flex-shrink-0">
							<img className="h-14 w-auto" src={logo} alt="City Guide" />
						</a>
					</div>
					{/* Search bar */}
					<div className="searchbar-container">
						<div className="flex-grow flex justify-center">
							<SearchBar />
						</div>
					</div>

					{/* Boutons de connexion (uniquement en version desktop) */}
					<div>
						<div className="hidden sm:flex space-x-4">
							<Link
								to={"/login"}
								className="rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:text-black"
							>
								<button type="button">Se connecter</button>
							</Link>
							<a
								href="/inscription"
								className="rounded-md px-3 py-2 text-sm font-medium bg-gray-700 text-gray-300 hover:secondary-bg hover:text-white"
							>
								<button type="button" className="">
									S'inscrire
								</button>
							</a>
						</div>
					</div>
				</div>

				{/* Menu Burger (droite) */}
				<div className="sm:hidden flex items-center">
					<button
						type="button"
						className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none"
						onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
					>
						<span className="sr-only">Open main menu</span>
						{isMobileMenuOpen ? (
							<svg
								className="size-6"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
							>
								<title>Fermer le menu</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						) : (
							<svg
								className="size-6"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
							>
								<title>Ouvrir le menu</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
								/>
							</svg>
						)}
					</button>
				</div>

				{/* Mobile Menu */}
				{isMobileMenuOpen && (
					<div className="sm:hidden" id="mobile-menu">
						<div className="space-x-2 px-2 pt-2 pb-3 flex">
							<Link
								to={"/login"}
								className="block rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:text-black"
							>
								<button type="button">Se connecter</button>
							</Link>
							<a
								href="/inscription"
								className="block rounded-md px-3 py-2 text-sm font-medium bg-gray-700 text-gray-300 hover:secondary-bg hover:text-white"
							>
								<button type="button">S&rsquo;inscrire</button>
							</a>
						</div>
					</div>
				)}
			</nav>
			{isMobileMenuOpen && (
				<div className="sm:hidden bg-white py-2 px-4 shadow-md z-40 relative">
					<SearchBar />
				</div>
			)}
		</>
	);
}
