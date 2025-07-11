
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { UserRole } from "../libs/graphql/generated/graphql-types";

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
  children: ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const user = useUserStore((state) => state.user);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string[]>([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const isUnauthorized = !user || !allowedRoles.includes(user.role);

  useEffect(() => {
    if (isUnauthorized) {
      setPopupMessage([
        "Accès non autorisé. Vous n’avez pas les permissions requises.",
      ]);
      setShowPopup(true);

      const timer = setTimeout(() => {
        setShowPopup(false);
        setShouldRedirect(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isUnauthorized]);

  if (isUnauthorized) {
    if (shouldRedirect) {
      return <Navigate to="/map" replace />;
    }

    return (
      <>
         {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-[999] pointer-events-none">
            <div className="bg-white border border-red-300 px-6 py-4 rounded-xl shadow-xl text-center max-w-sm">
              <div className="flex justify-center mb-2">
                <div className="bg-red-500 p-2 rounded-full text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18.364 5.636l-1.414-1.414L12 9.172 7.05 4.222l-1.414 1.414L10.828 12l-5.192 5.192 1.414 1.414L12 14.828l4.95 4.95 1.414-1.414L13.172 12z"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-sm text-red-500 font-medium">
                {popupMessage.map((line, index) => (
                  <p key={index} className="mb-1">{line}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
