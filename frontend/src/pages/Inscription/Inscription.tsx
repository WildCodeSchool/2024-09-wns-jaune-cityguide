import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import {
	type NewUserInput,
	useRegisterUserMutation,
} from "../../libs/graphql/generated/graphql-types";
import { Link, useNavigate } from "react-router-dom";
import { useCitiesStore } from "../../store/citiesStore";
import { useUserStore } from "../../store/userStore";
import background_form from "../../assets/background_form.png";
import { useInterestPointsStore } from "../../store/interestPointsStore";

type FormDataType = {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	confirmPassword?: string;
	cityId: string;
};

type ErrorsType = {
	firstname?: string;
	lastname?: string;
	email?: string;
	password?: string;
	confirmPassword?: string;
	cityId?: string;
};

function Inscription() {
	const [formData, setFormData] = useState<FormDataType>({
		firstname: "",
		lastname: "",
		email: "",
		password: "",
		confirmPassword: "",
		cityId: "",
	});

	const [errors, setErrors] = useState<ErrorsType>({});
	const [apiError, setApiError] = useState("");

	const [register] = useRegisterUserMutation();
	const navigate = useNavigate();

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const [showPopup, setShowPopup] = useState(false);
	const [popupMessage, setPopupMessage] = useState<string[]>([]);

	const { cities, fetchCities, setSelectedCity } = useCitiesStore();
	const { fetchInterestPointsByCity } = useInterestPointsStore();

	const { setUser } = useUserStore();

	useEffect(() => {
		fetchCities();
	}, []);

	const validate = (): ErrorsType => {
		const newErrors: ErrorsType = {};

		if (!formData.firstname.trim())
			newErrors.firstname = "Le prénom est requis.";
		if (!formData.lastname.trim()) newErrors.lastname = "Le nom est requis.";

		if (!formData.email.trim()) {
			newErrors.email = "L’email est requis.";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Format d’email invalide.";
		}

		if (!formData.password) {
			newErrors.password = "Le mot de passe est requis.";
		}

		if (!formData.confirmPassword) {
			newErrors.confirmPassword = "Confirmez le mot de passe.";
		} else if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
		}

		if (!formData.cityId) {
			newErrors.cityId = "La ville est requise.";
		}

		return newErrors;
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		setErrors((prev) => ({ ...prev, [name]: "" }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const validationErrors = validate();
		setErrors(validationErrors);

		if (Object.keys(validationErrors).length > 0) return;

		try {
			const { confirmPassword, ...dataToSend } = formData;

			const { data } = await register({
				variables: { data: dataToSend as NewUserInput },
			});
			if (data?.registerUser) {
				const parsed = JSON.parse(data.registerUser);
				console.log("parsed", parsed);
				setUser({
					id: parsed.id,
					firstname: parsed.firstname,
					role: parsed.role,
				});

				setPopupMessage([
					"Félicitations, votre compte a été créé avec succès ! 🎉",
					"Vous pouvez désormais profiter de toutes les fonctionnalités de notre site.",
				]);

				setSelectedCity(parsed.city);
				fetchInterestPointsByCity(parsed.city.id.toString());

				setShowPopup(true);

				setTimeout(() => {
					setShowPopup(false);
					navigate("/map");
				}, 3000);
			}
		} catch (error) {
			console.log(error);
			if (error instanceof Error) {
				if (error.message === "Cet email est déjà utilisé.") {
					setApiError("Cet email est déjà utilisé.");
				} else {
					setApiError("Erreur lors de l’inscription.");
				}
			}
		}
	};

	const fields: (keyof FormDataType)[] = [
		"firstname",
		"lastname",
		"email",
		"password",
		"confirmPassword",
	];

	return (
		<div
			className="flex flex-col items-center justify-center min-h-[80vh] bg-[#B0AFE4]"
			style={{
				backgroundImage: `url(${background_form})`,
			}}
		>
			<div className="flex justify-center z-2 mb-[-2rem]">
				<Link to={"/"}>
					<img
						src={logo}
						alt="City Guide logo"
						className="w-16 h-16 rounded-full border-4 border-white lg:w-22 lg:h-22"
					/>
				</Link>
			</div>
			<div className=" bg-white p-6 rounded-2xl shadow-lg w-80 lg:w-[60vh] max-h-[75vh] overflow-y-auto z-1">
				<h2 className="text-center text-2xl font-semibold text-[#706EEB] mt-1.5 mb-6">
					Créer votre compte
				</h2>

				{apiError && (
					<p className="text-red-600 text-center text-sm mb-4">{apiError}</p>
				)}

				{showPopup && (
					<div className="fixed top-20 right-3 max-w-[350px] w-auto bg-white border-3 border-[#706eeb] px-6 py-4 rounded-xl shadow-lg flex items-center justify-start space-x-3 transition-all ease-in-out duration-300 transform opacity-100 scale-100">
						<div className="absolute top-[-12px] left-[-12px] bg-[#706eeb] p-1 rounded-full text-white">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</div>
						<div
							className="text-sm text-[#706eeb] font-medium"
							data-testid="popup-message"
						>
							{popupMessage.map((line, index) => (
								<p key={index} className="mb-2">
									{line}
								</p>
							))}
						</div>
					</div>
				)}

				<form
					onSubmit={handleSubmit}
					className="space-y-5 flex flex-col items-center"
				>
					{fields.map((field) => (
						<div key={field} className="w-full">
							<div className="border border-gray-300 rounded-[25px] px-2 py-2 flex items-center justify-between w-full">
								<input
									type={
										field === "password"
											? showPassword
												? "text"
												: "password"
											: field === "confirmPassword"
												? showConfirmPassword
													? "text"
													: "password"
												: "text"
									}
									name={field}
									placeholder={
										field === "password"
											? "Mot de passe"
											: field === "confirmPassword"
												? "Confirmer mot de passe"
												: field === "firstname"
													? "Prénom"
													: field === "lastname"
														? "Nom"
														: field.charAt(0).toUpperCase() + field.slice(1)
									}
									value={formData[field]}
									onChange={handleChange}
									className="w-full outline-none text-gray-800 bg-transparent"
									role="textbox"
								/>
								{(field === "password" || field === "confirmPassword") && (
									<button
										type="button"
										onClick={() =>
											field === "password"
												? setShowPassword(!showPassword)
												: setShowConfirmPassword(!showConfirmPassword)
										}
										className="text-sm text-gray-500 ml-2 cursor-pointer"
									>
										{field === "password"
											? showPassword
												? "Cacher"
												: "Afficher"
											: showConfirmPassword
												? "Cacher"
												: "Afficher"}
									</button>
								)}
							</div>
							{errors[field] && (
								<p className="text-red-500 text-xs mt-1 ml-2">
									{errors[field]}
								</p>
							)}
						</div>
					))}

					<div className="w-full">
						<div className="border border-gray-300 rounded-[25px] px-3 py-2">
							<select
								name="cityId"
								value={formData.cityId || ""}
								onChange={(e) =>
									setFormData((prev) => ({ ...prev, cityId: e.target.value }))
								}
								className="w-full outline-none bg-transparent text-gray-800"
							>
								<option value="" disabled>
									Sélectionnez votre ville
								</option>
								{cities.map((city) => (
									<option key={city.id} value={city.id}>
										{city.name}
									</option>
								))}
							</select>
						</div>
						{errors.cityId && (
							<p className="text-red-500 text-xs mt-1 ml-2">{errors.cityId}</p>
						)}
					</div>

					<button
						type="submit"
						className="w-full max-w-[150px] text-white py-1 rounded-[25px] bg-[#706eeb] hover:bg-[#b0afe4] mt-5"
					>
						M'inscrire
					</button>
					<Link to={"/map"} style={{ color: "#b0afe4" }}>
						Continuer en tant qu'invité
					</Link>
				</form>
			</div>
		</div>
	);
}

export default Inscription;
