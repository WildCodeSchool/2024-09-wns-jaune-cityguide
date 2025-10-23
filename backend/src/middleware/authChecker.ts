import type { AuthChecker } from "type-graphql";
import type { User, UserRole } from "../entities/User";

export interface Context {
	user?: { id: string; role: UserRole };
}

export const customAuthChecker: AuthChecker<{ user?: User }> = (
	{ context },
	roles,
) => {
	const currentUser = context.user;

	if (!currentUser) return false;

	if (roles.length === 0) return true;

	return roles.includes(currentUser.role);
};

export function requireRole(
	user: { id: string; role: UserRole } | undefined,
	roles: UserRole[],
): void {
	if (!user || !roles.includes(user.role)) {
		throw new Error("Access denied");
	}
}
