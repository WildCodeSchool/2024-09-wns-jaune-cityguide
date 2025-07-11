import { GetUsersQuery, UserRole } from "../../../libs/graphql/generated/graphql-types";
import { forwardRef } from "react";

type Props = {
  user: GetUsersQuery["getUsers"][0];
  onClick: () => void;
};

const roleLabel: Record<UserRole, string> = {
  USER: "Utilisateur",
  CITY_ADMIN: "Admin de ville",
  SUPER_USER: "Super utilisateur",
  SUPER_ADMIN: "Super admin",
};

const UserCard = forwardRef<HTMLDivElement, Props>(({ user, onClick }, ref) => {
  return (
    <div
      ref={ref}
      onClick={onClick}
      className="border p-4 rounded-lg shadow hover:shadow-md hover:bg-gray-50 cursor-pointer transition duration-200 flex flex-col gap-2"
    >
      <p className="text-lg text-center font-semibold text-gray-800">
        {user.firstname} {user.lastname}
      </p>
      <span className="inline-block m-auto w-fit text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
        {roleLabel[user.role]}
      </span>
    </div>
  );
});

export default UserCard;
