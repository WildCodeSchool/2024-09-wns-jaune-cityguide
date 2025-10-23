type Props = {
	users: {
		role: string;
	}[];
};

export default function UserStats({ users }: Props) {
	const total = users.length;
	const cityAdmins = users.filter((u) => u.role === "CITY_ADMIN").length;

	return (
		<div className="flex gap-6">
			<div className="bg-white p-4 rounded-xl shadow-md text-center">
				<p className="text-sm text-gray-500">Nombre total d’utilisateurs</p>
				<h2 className="text-2xl font-bold text-gray-800">{total}</h2>
			</div>
			<div className="bg-white p-4 rounded-xl shadow-md text-center">
				<p className="text-sm text-gray-500">Nombre total d'admins de ville</p>
				<h2 className="text-2xl font-bold text-gray-800">{cityAdmins}</h2>
			</div>
		</div>
	);
}
