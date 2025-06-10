import type { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import twitter from "../assets/twitter.svg";
import linkedin from "../assets/linkedin.svg";
import instagram from "../assets/instagram.svg";

const Footer: FC = () => {
	// How to hide a component based on the url: https://medium.com/@PikoCanFly/react-js-conditionally-hide-components-according-the-current-relative-url-6012a187794a
	const location = useLocation();
	const isMapPage = location.pathname === "/map";
	return (
		<footer
			className="bg-[rgb(112,110,235)] mt-auto"
			style={{ display: isMapPage ? "none" : "block" }}
		>
			<div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md py-9 px-4">
				<div className="flex flex-col sm:flex-row justify-between items-center h-full gap-y-6 sm:gap-y-0">
					<div className="flex gap-8">
						<Link
							to="#"
							className="group bg-white hover:bg-primary rounded-full shadow-xl p-3"
						>
							<img src={twitter} alt="twitter" width={18} />
						</Link>
						<Link
							to="#"
							className="group bg-white hover:bg-primary rounded-full shadow-xl p-3"
						>
							<img src={instagram} alt="instagram" width={18} />
						</Link>
						<Link
							to="#"
							className="group bg-white hover:bg-primary rounded-full shadow-xl p-3"
						>
							<img src={linkedin} alt="linkedIn" width={18} />
						</Link>
					</div>

					<p className="text-xs font-medium text-grey dark:text-white/50 text-center my-0">
						© 2025 - CityGuide
					</p>

					<div className="flex flex-wrap justify-center gap-6">
						<Link
							to="#"
							className="text-black/70 dark:text-white/70 hover:text-primary dark:hover:text-primary text-base"
						>
							Mentions légales
						</Link>
						<Link
							to="#"
							className="text-black/70 dark:text-white/70 hover:text-primary dark:hover:text-primary text-base"
						>
							À propos
						</Link>
						<Link
							to="#"
							className="text-black/70 dark:text-white/70 hover:text-primary dark:hover:text-primary text-base"
						>
							Contact
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
