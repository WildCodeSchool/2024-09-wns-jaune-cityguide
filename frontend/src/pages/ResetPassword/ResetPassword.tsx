import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import resetPasswordPic from '../../assets/reset-password.png';
import logo from '../../assets/logo.png';
import { useState } from 'react';
import { useResetPasswordMutation } from '../../libs/graphql/generated/graphql-types';
import './ResetPassword.css'

const ResetPassword = () => {

  const [resetPassword] = useResetPasswordMutation();
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);
  const [error, setError] = useState<{ type: string; text: string } | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    const form = evt.target;
    const formData = new FormData(form as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries()) as { password: string; confirmPassword: string };

    if (formJson.password !== formJson.confirmPassword) {
      setError({ type: 'error', text: 'Les mots de passe ne correspondent pas.' });
      setMessage(null);
      return;
    }

    try {
      const token = searchParams.get('token');

      if (!token) {
        setError({ type: 'error', text: 'Token de réinitialisation manquant.' });
        return;
      };

      const { data } = await resetPassword({
        variables: { token, newPassword: formJson.password },
      });

      if (data?.resetPassword) {
        setMessage({
          type: "success",
          text: "Mot de passe réinitialisé avec succès ! Redirection...",
        });
        setError(null);
        setTimeout(() => {
          navigate("/login");
        }, 4000);
      }
    } catch (error: any) {
      const code = error?.graphQLErrors?.[0]?.extensions?.code;

      switch (code) {
        case 'TOKEN_NOT_FOUND':
          setError({ type: 'error', text: 'Token invalide ou expiré.' });
          setMessage(null);
          break;
        default:
          setError({ type: 'error', text: 'Une erreur est survenue. Veuillez réessayer.' });
          setMessage(null);
          break;
      }
    }

  };


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
          Réinitialisation de mot de passe
        </h2>

        <div className="flex flex-col justify-center items-center mb-8">
          <img
            className="w-32 h-32 rounded-full lg:w-44 lg:h-44"
            src={resetPasswordPic}
            alt="City Guide connexion"
          />
          <p className="italic text-[#B0AFE4] text-sm lg:text-lg">
            Réinitialisez votre mot de passe en toute simplicité
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 flex flex-col items-center"
        >
          <div className="border border-gray-300 rounded-[25px] px-3 py-2 flex items-center justify-between w-full">
            <span className="material-symbols-outlined">lock</span>
            <input
              className="w-full outline-none text-gray-800 bg-transparent pl-2"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Nouveau mot de passe"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-sm text-[#706EEB] cursor-pointer"
            >
              {showPassword ? "Cacher" : "Afficher"}
            </button>
          </div>

          <div className="border border-gray-300 rounded-[25px] px-3 py-2 flex items-center justify-between w-full">
            <span className="material-symbols-outlined">lock</span>
            <input
              className="w-full outline-none text-gray-800 bg-transparent pl-2"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirmez votre nouveau mot de passe"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-sm text-[#706EEB] cursor-pointer"
            >
              {showConfirmPassword ? "Cacher" : "Afficher"}
            </button>
          </div>

          <button
            className="w-full max-w-[300px] cursor-pointer text-white py-1 rounded-[25px] bg-[#706eeb] hover:bg-[#b0afe4]"
            type="submit"
          >
            Réinitialiser le mot de passe
          </button>
        </form>

        {message && (
          <div className="w-full text-center text-green-600 font-medium mt-6 success-message">
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

        {error && (
          <div className="w-full text-center text-red-500 font-medium mt-6">
            {error.text}
          </div>
        )}
      </div>
    </div>
  )
}

export default ResetPassword