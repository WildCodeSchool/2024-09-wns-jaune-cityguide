import { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="nav-container primary-bg z-50 flex flex-col sm:flex-row items-start sm:items-center justify-between h-auto sm:h-20">
        <div className="desktop-nav hidden sm:flex items-center justify-between h-full w-full p-14">
          {/* Logo */}
          <div className="flex justify-center -mt-12 lg:mt-12">
            <a href="/" className="flex-shrink-0">
              <img
                className="rounded-full border-5 lg:w-28 lg:h-28"
                style={{ borderColor: "#706EEB" }}
                src={logo}
                alt="City Guide"
              />
            </a>
          </div>

          {/* Boutons de connexion (uniquement en version desktop) */}
          <div>
            <div className="hidden sm:flex space-x-4">
              <Link
                to={"/login"}
                className="rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:text-black"
              >
                <button type="button">CONNEXION</button>
              </Link>
              <Link
                to={"/inscription"}
                className="rounded-md px-3 py-2 text-sm font-medium bg-gray-700 text-gray-300 hover:secondary-bg hover:text-white"
              >
                <button type="button" className="">
                  INSCRIPTION
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Menu Burger */}
        <div className="w-full h-14 sm:hidden px-1 py-2">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="relative inline-flex items-center justify-center p-2 text-white hover:text-gray-400"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
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
                  strokeWidth="2.5"
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

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="sm:hidden" id="mobile-menu">
                <div className="space-x-2 px-2 flex">
                  <Link
                    to={"/login"}
                    className="block rounded-md bg-white px-2 py-2 text-sm font-small text-gray-500 hover:text-black"
                  >
                    <button type="button">CONNEXION</button>
                  </Link>
                  <a
                    href="/inscription"
                    className="block rounded-md px-2 py-2 text-sm font-small bg-gray-700 text-gray-300 hover:text-white"
                  >
                    <button type="button">INSCRIPTION</button>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
