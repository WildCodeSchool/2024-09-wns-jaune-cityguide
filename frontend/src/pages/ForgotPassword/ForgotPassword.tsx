import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import forgot_password from "../../assets/forgot-password.png";
import { useForgotPasswordMutation } from "../../libs/graphql/generated/graphql-types";
import { FormEvent, useState } from "react";

const ForgotPassword = () => {

  const [forgotPassword] = useForgotPasswordMutation();
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);
  const [error, setError] = useState<{ type: string; text: string } | null>(null);

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();

    const form = evt.target;
    const formData = new FormData(form as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());

    try {
      const { data } = await forgotPassword({
        variables: { email: formJson.email as string },
      });

      if (data?.forgotPassword) {
        setMessage({ type: "success", text: "Un email de réinitialisation a été envoyé." });
      }
    } catch (error: any) {
      const code = error?.graphQLErrors?.[0]?.extensions?.code;

      switch (code) {
        case "USER_NOT_FOUND":
          setError({
            type: "error",
            text: "Le compte avec cet email n'existe pas.",
          });
          break;

        default:
          setError({
            type: "error",
            text: "Une erreur est survenue. Veuillez réessayer.",
          });
          break;
      }
    }
  }

  return (
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
          Mot de passe oublié
        </h2>

        <div className="flex flex-col justify-center items-center mb-8">
          <img
            className="w-32 h-32 rounded-full lg:w-44 lg:h-44"
            src={forgot_password}
            alt="City Guide connexion"
          />
          <p className="italic text-[#B0AFE4] text-sm lg:text-lg">
            Pas de panique, nous allons vous aider à le réinitialiser !
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
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

          <button
            className="w-full max-w-[200px] cursor-pointer text-white py-1 rounded-[25px] bg-[#706eeb] hover:bg-[#b0afe4]"
            type="submit"
          >
            Envoyer le lien de réinitialisation
          </button>
        </form>

        {message && (
          <div className="w-full text-center text-green-600 font-medium mt-6">
            {message.text}
          </div>
        )}

        {error && (
          <div className="w-full text-center text-red-500 font-medium mt-6">
            {error.text}
          </div>
        )}
      </div>
    </div>
  )
}

export default ForgotPassword