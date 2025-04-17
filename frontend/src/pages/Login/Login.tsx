import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import connexion from "../../assets/connexion.png";
import { FormEvent, useState } from "react";
import {
  useLoginUserMutation,
  UserInput,
} from "../../libs/graphql/generated/graphql-types";

const Login = () => {
  const [login] = useLoginUserMutation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(
    null
  );

  const handleLogin = async (evt: FormEvent) => {
    evt.preventDefault();

    const form = evt.target;
    const formData = new FormData(form as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries()) as UserInput;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formJson.email)) {
      setMessage({ type: "error", text: "Le format de l'email est invalide." });
      return;
    }

    try {
      const { data } = await login({
        variables: { data: formJson },
      });

      if (data) {
        setMessage({
          type: "success",
          text: "Connexion réussie ! Redirection...",
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error: any) {
      const code = error?.graphQLErrors?.[0]?.extensions?.code;

      switch (code) {
        case "USER_NOT_FOUND":
          setMessage({
            type: "error",
            text: "Le compte avec cet email n'existe pas.",
          });
          break;

        case "INVALID_PASSWORD":
          setMessage({
            type: "error",
            text: "Email ou mot de passe invalide.",
          });
          break;

        default:
          setMessage({ type: "error", text: "Erreur lors de la connexion." });
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-[80vh] secondary-bg">
        <div className="bg-white p-6 rounded-2xl shadow-lg w-80 lg:w-[60vh] h-140 lg:h-150">
          <div className="flex justify-center -mt-12 lg:-mt-16">
            <Link to={"/"}>
              <img
                className="w-16 h-16 rounded-full border-4 border-white lg:w-24 lg:h-24"
                src={logo}
                alt="City Guide"
              />
            </Link>
          </div>
          <h2 className="text-center text-2xl font-semibold text-[#706EEB] mt-4 mb-6">
            Connexion à votre compte
          </h2>

          <div className="flex flex-col justify-center items-center mb-8">
            <img
              className="w-32 h-32 rounded-full lg:w-44 lg:h-44"
              src={connexion}
              alt="City Guide connexion"
            />
            <p className="italic text-[#B0AFE4] text-sm lg:text-lg">
              "Découvrez les secrets de votre ville"
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-5 flex flex-col items-center"
          >
            <div className="border border-gray-300 rounded-[25px] px-3 py-2 flex items-center justify-between w-full">
              <span className="material-symbols-outlined">mail</span>
              <input
                className="w-full outline-none text-gray-800 bg-transparent pl-2"
                name="email"
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="border border-gray-300 rounded-[25px] px-3 py-2 flex items-center justify-between w-full">
              <span className="material-symbols-outlined">lock</span>
              <input
                className="w-full outline-none text-gray-800 bg-transparent pl-2"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-sm text-gray-500 ml-2"
              >
                {showPassword ? "Cacher" : "Afficher"}
              </button>
            </div>

            <div className="text-xs mb-1 ml-auto text-end">
              <Link to={"#"} className="text-[#B0AFE4] hover:text-blue-800">
                Mot de passe oublié ?
              </Link>
            </div>

            {message && (
              <div
                className={`mt-1 text-sm text-center flex items-center justify-center gap-2 ${
                  message.type === "error" ? "text-red-500" : "text-green-600"
                }`}
              >
                {message.type === "success" && (
                  <svg
                    className="mr-2 size-5 animate-spin text-green-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 11-8 8h4z"
                    ></path>
                  </svg>
                )}
                {message.text}
              </div>
            )}

            <button
              className={`w-full max-w-[150px] text-white py-1 rounded-[25px] bg-[#706eeb] hover:bg-[#b0afe4] ${
                message ? "mt-0" : "mt-5"
              }`}
              type="submit"
            >
              Me connecter
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
