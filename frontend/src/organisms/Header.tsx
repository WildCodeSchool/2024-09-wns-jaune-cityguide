import { useState } from "react";
import logo from "../assets/logo_city_guide_good.png";

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="primary-bg">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img className="h-14 w-auto" src={logo} alt="City Guide" />
          </div>

          {/* 🔹 Searchbar bien positionnée (centrée en desktop et présente en mobile) */}
          <div className="flex-grow mx-4 sm:mx-8">
            <input
              className="w-full sm:w-96 px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white border border-gray-300"
              type="search"
              placeholder="Search..."
            />
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
                <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>

          {/* Boutons de connexion (uniquement en version desktop) */}
          <div className="hidden sm:flex space-x-4">
            <a href="#" className="rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:text-black">
              Se connecter
            </a>
            <a href="#" className="rounded-md px-3 py-2 text-sm font-medium bg-gray-700 text-gray-300 hover:secondary-bg hover:text-white">
              S'inscrire
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden secondary-bg" id="mobile-menu">
          <div className="space-y-1 px-2 pt-2 pb-3">
            <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-white">
              Se connecter
            </a>
            <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-white">
              S'inscrire
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
