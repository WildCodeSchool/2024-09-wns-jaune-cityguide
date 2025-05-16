import UserCard from "./UserCard";

type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
};

type Props = {
  users: User[];
  onSelect: (user: User) => void;
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
