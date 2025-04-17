import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo_city_guide_good.png";
import { FormEvent, useState } from "react";
import { useLoginUserMutation, UserInput } from "../../libs/graphql/generated/graphql-types";
import { useUserStore } from "../../store/userStore";


const Login = () => {

  const [login] = useLoginUserMutation();
  const navigate = useNavigate();
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);
  const setUser = useUserStore((state) => state.setUser);


  const handleLogin = async (evt: FormEvent) => {
    evt.preventDefault();

    const form = evt.target;
    const formData = new FormData(form as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries()) as UserInput;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formJson.email)) {
      setMessage({ type: "error", text: "Le format de l'email est invalide." });
      return;
    };

    try {
      const { data } = await login({
        variables: { data: formJson },
      });

      if (data?.loginUser) {
        const parsed = JSON.parse(data.loginUser);
        
        setUser({
          id: parsed.id,
          firstname: parsed.firstname,
          role: parsed.role,
        });

        setMessage({ type: "success", text: "Connexion réussie ! Redirection..." });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      };
    } catch (error: any) {
      const code = error?.graphQLErrors?.[0]?.extensions?.code;

      switch (code) {
        case "USER_NOT_FOUND":
          setMessage({ type: "error", text: "Le compte avec cet email n'existe pas." });
          break;

        case "INVALID_PASSWORD":
          setMessage({ type: "error", text: "Email ou mot de passe invalide." });
          break;

        default:
          setMessage({ type: "error", text: "Erreur lors de la connexion." });
      };
    };
  };

  return (
    <>
      <div className="form-container flex flex-col items-center justify-center h-200 secondary-bg">
        <form onSubmit={handleLogin} className="shadow-xl relative h-120 rounded-xl bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm">
          {/* Logo et titre */}
          <img className="h-18 w-18 absolute -top-10 left-40" src={logo} alt="City Guide" />
          <h2 className="text-center text-2xl font-semibold text-[#706EEB] mt-4 mb-6">Se connecter</h2>

          {/* Formulaire de connexion */}
          <div className="mb-5">
            <div className="shadow-lg border rounded-full flex items-center p-2">
              <span className="material-symbols-outlined">
                mail
              </span>
              <input className="py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" type="email" placeholder="Email" required />
            </div>
          </div>
          <div className="text-xs mb-1 text-end">
            <Link to={"#"} className="text-blue-500 hover:text-blue-800">
              Mot de passe oublié ?
            </Link>
          </div>
          <div className="mb-6">
            <div className="shadow-lg border rounded-full flex items-center p-2">
              <span className="material-symbols-outlined">
                lock
              </span>
              <input className="py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="password" type="password" placeholder="Mot de passe" required />
            </div>
          </div>

          {/* Bouton de connexion */}
          <div className="flex items-center justify-between">
            <button className="border rounded-full m-auto cursor-pointer bg-black hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Se connecter
            </button>
          </div>

          {/* Message d'erreur ou de succès */}
          {message && (
            <div
              className={`mt-4 text-sm text-center flex items-center justify-center gap-2 ${message.type === "error" ? "text-red-600" : "text-green-600"
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
        </form>
      </div>
    </>
  )
}

export default Login