import type { FC } from "react";
import { Link } from "react-router-dom";
import twitter from "../assets/twitter.svg";
import linkedin from "../assets/linkedin.svg";
import instagram from "../assets/instagram.svg";
import youtube from "../assets/youtube.svg";

const Footer: FC = () => {
	return (
		<footer className="pt-16 bg-[rgb(112,110,235)] mt-auto">
			<div className="container mx-auto h-52 lg:max-w-screen-xl md:max-w-screen-md px-4">
				<div className="grid grid-cols-1 sm:grid-cols-5 lg:gap-20 md:gap-6 sm:gap-12 gap-6  pb-16">
					<div className="col-span-2">
						<p className="text-xs font-medium text-grey dark:text-white/50 mt-5 mb-16 max-w-70%">
							Open an city in minutes, get full interest point with premium
							account
						</p>
						<div className="flex gap-6 items-center">
							<Link
								to="#"
								className="group bg-white hover:bg-primary rounded-full shadow-xl p-3"
							>
								<img src={twitter} alt="" width={20} />
							</Link>
							<Link
								to="#"
								className="group bg-white hover:bg-primary rounded-full shadow-xl p-3"
							>
								<img src={instagram} alt="" width={20} />
							</Link>
							<Link
								to="#"
								className="group bg-white hover:bg-primary rounded-full shadow-xl p-3"
							>
								<img src={youtube} alt="" width={20} />
							</Link>
							<Link
								to="#"
								className="group bg-white hover:bg-primary rounded-full shadow-xl p-3"
							>
								<img src={linkedin} alt="" width={20} />
							</Link>
						</div>
					</div>
					<div className="">
						<h4 className="text-black dark:text-white mb-9 font-semibold text-xl">
							Use cases
						</h4>
						<ul>
							<li className="pb-5">
								<Link
									to="#"
									className="text-black/70 dark:text-white/70 hover:text-primary dark:hover:text-primary text-base"
								>
									UI design
								</Link>
							</li>
							<li className="pb-5">
								<Link
									to="#"
									className="text-black/70 dark:text-white/70 hover:text-primary dark:hover:text-primary text-base"
								>
									UX design
								</Link>
							</li>
							<li className="pb-5">
								<Link
									to="#"
									className="text-black/70 dark:text-white/70 hover:text-primary dark:hover:text-primary text-base"
								>
									Wireframing
								</Link>
							</li>
						</ul>
					</div>
					<div className="">
						<h4 className="text-black dark:text-white mb-9 font-semibold text-xl">
							Explore
						</h4>
						<ul>
							<li className="pb-5">
								<Link
									to="#"
									className="text-black/70 dark:text-white/70 dark:hover:text-primary hover:text-primary text-base"
								>
									Design
								</Link>
							</li>
							<li className="pb-5">
								<Link
									to="#"
									className="text-black/70 dark:text-white/70 dark:hover:text-primary hover:text-primary text-base"
								>
									Prototyping
								</Link>
							</li>
							<li className="pb-5">
								<Link
									to="#"
									className="text-black/70 dark:text-white/70 hover:text-primary dark:hover:text-primary text-base"
								>
									Development features
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
