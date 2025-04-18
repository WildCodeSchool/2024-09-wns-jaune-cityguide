import { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { useMutationMutation } from "../libs/graphql/generated/graphql-types";

export default function Navbar() {
  const { user, clearUser } = useUserStore();
  const [logout] = useMutationMutation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);


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

          {/* Version desktop */}
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
                        onClick={() => setIsOpen(false)}
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
                          onClick={() => setIsOpen(false)}
                        >
                          Dashboard
                        </a>
                      )}

                      <button
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
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
                <div>
                  <div className="hidden sm:flex space-x-4">
                    <Link
                      to={"/login"}
                      className="connexion-button rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:text-black"
                      onClick={() => setIsOpen(false)}
                    >
                      CONNEXION
                    </Link>
                    <Link
                      to={"/inscription"}
                      className="inscription-button rounded-md px-3 py-2 text-sm font-medium bg-gray-700 text-gray-300 hover:secondary-bg hover:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                        INSCRIPTION
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="w-full h-14 sm:hidden px-1 py-2">
          <div className="flex items-center justify-end gap-4">
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
                      <Link
                        to={"#"}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        tabIndex={-1}
                        id="menu-item-0"
                        onClick={() => setIsOpen(false)}
                      >
                        Mon profil
                      </Link>

                      {user.role === "SUPER_ADMIN" && (
                        <Link
                          to={"#"}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                          tabIndex={-1}
                          id="menu-item-2"
                          onClick={() => setIsOpen(false)}
                        >
                          Dashboard
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
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
                      <Link
                        to={"/login"}
                        className="connexion-button-mobile block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        tabIndex={-1}
                        id="menu-item-0"
                        onClick={() => setIsOpen(false)}
                      >
                        CONNEXION
                      </Link>

                      <Link
                        to={"/inscription"}
                        className="inscription-button-mobile  block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        tabIndex={-1}
                        id="menu-item-0"
                        onClick={() => setIsOpen(false)}
                      >
                        INSCRIPTION
                      </Link>

                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
