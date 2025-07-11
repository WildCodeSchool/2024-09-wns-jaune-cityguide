import { AuthChecker } from "type-graphql";
import { User } from "../entities/User";
import { UserRole } from "../entities/User";

interface Context {
    user?: {id: string, role: UserRole};
}

export const customAuthChecker: AuthChecker<{ user?: User }> = ({ context }, roles) => {
  const currentUser = context.user;

  if (!currentUser) return false;

  // Si aucun rôle requis : autorisation par défaut
  if (roles.length === 0) return true;

  return roles.includes(currentUser.role);
};


// export const customAuthChecker: AuthChecker<Context> = ({ context }, roles) => {
//     const user = context.user;
//     if (!user) { return false; // utilisateur non connecté}; 

//     //  Si aucun rôle spécifique n'est exigé, le user est simplement authentifié
//     if (roles.length === 0) { return true; };

//     // Vérifie si le user a au moins un des rôles nécessaires
//     return roles.includes(user.role);
// }

export function requireRole(
  user: { id: string; role: UserRole } | undefined,
  roles: UserRole[]
): void {
  if (!user || !roles.includes(user.role)) {
    throw new Error("Access denied");
  }
}