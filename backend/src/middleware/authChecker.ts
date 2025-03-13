import { AuthChecker } from "type-graphql";
import { UserRole } from "../entities/User";

interface Context {
    user?: {id: string, role: UserRole};
}


export const customAuthChecker: AuthChecker<Context> = ({ context }, roles) => {
    const user = context.user;
    if (!user) {
        return false; // utilisateur non connecté
    };

    //  Si aucun rôle spécifique n'est exigé, le user est simplement authentifié
    if (roles.length === 0) {
        return true;
    };

    // Vérifie si le user a au moins un des rôles nécessaires
    return roles.includes(user.role);
}