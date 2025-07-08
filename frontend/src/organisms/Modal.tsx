interface ModalProps {
	children: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
	if (!isOpen) return null;
	return (
		<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out animate-fade-in">
			<div className="relative bg-white max-w-md w-full px-6 py-5 rounded-xl shadow-lg border-2 border-[#706eeb] transform transition-all duration-300 ease-out scale-95 animate-scale-in">
				<button
					type="button"
					onClick={onClose}
					className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 hover:scale-125 transition-transform duration-200 cursor-pointer"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className=""
					>
						<title>Fermer</title>
						<path d="M18 6 6 18" />
						<path d="m6 6 12 12" />
					</svg>
				</button>
				<div className="mt-6">{children}</div>
			</div>
		</div>
	);
}
