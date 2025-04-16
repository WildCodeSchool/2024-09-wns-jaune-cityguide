import { useState } from "react";
import type { InterestPoint } from "../@types/types";
import { useInterestPointsStore } from "../store/interestPointsStore";

type InterestPointSheetProps = {
	isOpen: boolean;
	interestPoint: InterestPoint | null;
	onClose: () => void;
};

export default function InterestPointDetails({
	isOpen,
	onClose,
}: InterestPointSheetProps) {
	return (
		<>
			{isOpen && (
				<div
					className="absolute inset-0 transition-opacity duration-300"
					onClick={onClose}
					onKeyUp={(e) => {
						if (e.key === "Escape") {
							onClose();
						}
					}}
					tabIndex={0}
					role="button"
					aria-label="Close"
				/>
			)}
			<aside
				className={`absolute top-0 right-0 h-full w-full sm:w-1/4 max-w-3xl bg-white text-black p-4 transform transition-transform duration-300 z-50 ${
					isOpen ? "translate-x-0" : "translate-x-[100%]"
				} rounded-tl-xl rounded-bl-xl p-6 shadow-xl`}
			>
				<button
					type="button"
					onClick={onClose}
					className="text-gray-800 transform pr-0 rounded-full flex justify-end absolute top-6 right-6 sm:top-2 sm:right-2 hover:cursor-pointer hover:bg-gray-200 hover:text-gray-500"
					aria-label="Fermer les détails"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						className="lucide lucide-x-icon lucide-x"
					>
						<path d="M18 6 6 18" />
						<path d="m6 6 12 12" />
						<title>Fermer les détails</title>
					</svg>
				</button>

				<p className="text-black">Interest point details</p>
			</aside>
		</>
	);
}
