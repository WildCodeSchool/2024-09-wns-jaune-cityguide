import type { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import twitter from "../assets/twitter.svg";
import linkedin from "../assets/linkedin.svg";
import instagram from "../assets/instagram.svg";

const Footer: FC = () => {
	const location = useLocation();
	const isMapPage = location.pathname === "/map";

	return (
		<footer
			className="bg-[rgb(112,110,235)] mt-auto text-white"
			style={{ display: isMapPage ? "none" : "block" }}
		>
			<div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md py-4 px-3 sm:py-9 sm:px-4">
				<div className="flex flex-col sm:flex-row justify-between items-center gap-y-4 sm:gap-y-0">
					<div className="flex gap-4">
						<Link
							to="#"
							className="bg-white hover:bg-primary rounded-full shadow-md p-1.5 transition-all"
						>
							<img src={twitter} alt="twitter" width={14} />
						</Link>
						<Link
							to="#"
							className="bg-white hover:bg-primary rounded-full shadow-md p-1.5 transition-all"
						>
							<img src={instagram} alt="instagram" width={14} />
						</Link>
						<Link
							to="#"
							className="bg-white hover:bg-primary rounded-full shadow-md p-1.5 transition-all"
						>
							<img src={linkedin} alt="linkedIn" width={14} />
						</Link>
					</div>

					<p className="hidden sm:block text-xs font-medium text-white/80 text-center">
						© 2025 - CityGuide
					</p>

					<div className="flex flex-row gap-4 text-[12px] sm:text-base items-center">
						<Link to="#" className="text-white/80 hover:text-white transition">
							Mentions légales
						</Link>
						<Link to="/about" className="text-white/80 hover:text-white transition">
							À propos
						</Link>
						<Link to="#" className="text-white/80 hover:text-white transition">
							Contact
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
