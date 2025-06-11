import { GetUsersQuery } from "../../../libs/graphql/generated/graphql-types";
import UserCard from "./UserCard";



type Props = {
  users: GetUsersQuery["getUsers"];
  onSelect: (user: GetUsersQuery["getUsers"][0]) => void;
};

export default function UserList({ users, onSelect }: Props) {
  return (
    <>
      {users.map((user) => (
        <UserCard key={user.id} user={user} onClick={() => onSelect(user)} />
      ))}
    </>
  );
}
