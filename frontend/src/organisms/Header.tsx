import { useState } from "react";
import logo from "../assets/logo_city_guide_good.png";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../atoms/SearchBar";
import { useUserStore } from "../store/userStore";
import { useMutationMutation } from "../libs/graphql/generated/graphql-types";

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, clearUser } = useUserStore();
  const [logout] = useMutationMutation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);


  const handleLogout = async () => {
    try {
      await logout();
      clearUser();
      navigate("/");
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  return (
    <nav className="primary-bg z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/">
              <img className="h-14 w-auto" src={logo} alt="City Guide" />
            </a>
          </div>
          {/* Search bar */}
          <SearchBar />
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
                  <title>Close menu</title>
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
                  <title>Open menu</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Boutons de connexion (uniquement en version desktop) */}
          <div className="hidden sm:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-white text-base font-bold">Bonjour, {user.firstname}</span>

                <div className="relative inline-block text-left">
                  {/* Bouton d'ouverture */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setIsOpen(!isOpen)}
                      className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                    >
                      <span className="material-symbols-outlined">
                        account_circle
                      </span>
                      Menu
                      <svg
                        className="-mr-1 size-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Dropdown */}
                  <div
                    className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none transform transition-all duration-100 ${isOpen
                      ? "scale-100 opacity-100"
                      : "scale-95 opacity-0 pointer-events-none"
                      }`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex={-1}
                  >
                    <div className="py-1" role="none">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        tabIndex={-1}
                        id="menu-item-0"
                      >
                        Mon profil
                      </a>

                      {user.role === "SUPER_ADMIN" && (
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                          tabIndex={-1}
                          id="menu-item-2"
                        >
                          Dashboard
                        </a>
                        )}

                      <button
                        onClick={handleLogout}
                        className="block w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        tabIndex={-1}
                        id="menu-item-3"
                      >
                        Déconnexion
                      </button>

                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to={"/login"} className="rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:text-black">
                  Connexion
                </Link>
                <a
                  href="/inscription"
                  className="rounded-md px-3 py-2 text-sm font-medium bg-gray-700 text-gray-300 hover:secondary-bg hover:text-white"
                >
                  Inscription
                </a>
              </>
            )}
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

      {/* Mobile Menu */}
      {
        isMobileMenuOpen && (
          <div className="sm:hidden secondary-bg" id="mobile-menu">
            <div className="space-y-1 px-2 pt-2 pb-3">
              <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-white">
                Se connecter
              </a>
              <a href="/inscription" className="block rounded-md px-3 py-2 text-base font-medium text-white">
                S'inscrire
              </a>
            </div>
          </div>
        )
      }
    </nav >
  );
}
