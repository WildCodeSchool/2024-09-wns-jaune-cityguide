import React from "react";

type Props = {
  user: {
    id: string;
    firstname: string;
    lastname: string;
    role: string;
  };
  onClick: () => void;
};

const roleLabel: Record<string, string> = {
  user: "Utilisateur",
  cityadmin: "Admin de ville",
  superuser: "Super utilisateur",
  superadmin: "Super admin",
};

export default function UserCard({ user, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="border p-4 rounded-lg shadow hover:shadow-md hover:bg-gray-50 cursor-pointer transition duration-200 flex flex-col gap-2"
    >
      <p className="text-lg font-semibold text-gray-800">
        {user.firstname} {user.lastname}
      </p>
      <span className="inline-block w-fit text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
        {user.role}
      </span>
    </div>
  );
}
