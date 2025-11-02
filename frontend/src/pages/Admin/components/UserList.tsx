import type { UserMapped } from "../../../store/userStore";
import UserCard from "./UserCard";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
	users: UserMapped[];
	onSelect: (userId: string) => void;
	showAll: boolean;
	onShowMore: () => void;
	onShowLess: () => void;
	userRefs: React.RefObject<Record<string, HTMLDivElement | null>>;
};

export default function UserList({
	users,
	onSelect,
	showAll,
	onShowMore,
	userRefs,
	onShowLess,
}: Props) {
	const visibleUsers = showAll ? users : users.slice(0, 19);
	const remainingCount = users.length - 19;

	return (
		<>
			<AnimatePresence>
				{visibleUsers.map((user) => (
					<motion.div
						key={user.id}
						ref={(el) => {
							userRefs.current[user.id] = el;
						}}
						layout
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						transition={{ duration: 0.2 }}
					>
						<UserCard user={user} onClick={() => onSelect(user.id)} />
					</motion.div>
				))}
			</AnimatePresence>

			{!showAll && users.length > 19 && (
				<motion.div
					layout
					onClick={onShowMore}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="border p-4 rounded-lg shadow hover:shadow-md hover:bg-gray-50 cursor-pointer transition duration-200 flex flex-col items-center justify-center text-blue-700 font-medium"
				>
					<div className="text-2xl">+</div>
					<div>Afficher plus ({remainingCount})</div>
				</motion.div>
			)}

			{showAll && users.length > 19 && (
				<motion.div
					layout
					onClick={onShowLess}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="border p-4 rounded-lg shadow hover:shadow-md hover:bg-gray-50 cursor-pointer transition duration-200 flex flex-col gap-2 items-center justify-center"
				>
					<span className="text-lg font-medium text-blue-600">
						Afficher moins
					</span>
					<span className="text-2xl text-blue-600 font-bold">−</span>
				</motion.div>
			)}
		</>
	);
}
