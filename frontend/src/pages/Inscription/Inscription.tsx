import logo from "../../assets/logo.png";

function Inscription() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#B0AFE4]">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-80">
        <div className="flex justify-center -mt-12">
          <img
            src={logo}
            alt="City Guide logo"
            className="w-16 h-16 rounded-full border-4 border-white"
          />
        </div>
        <h2 className="text-center text-xl font-semibold text-gray-800 mt-4">
          Créer votre compte
        </h2>
        <form className="mt-4 space-y-3 flex flex-col items-center">
          <div className="flex items-center border border-gray-300 rounded-[25px] p-2 space-x-2 w-full">
            <input
              type="text"
              placeholder="Nom"
              className="w-full outline-none p-1 rounded-[25px] text-gray-800"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-[25px] p-2 space-x-2 w-full">
            <input
              type="text"
              placeholder="Prénom"
              className="w-full outline-none p-1 rounded-[25px] text-gray-800"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-[25px] p-2 space-x-2 w-full">
            <input
              type="email"
              placeholder="Email"
              className="w-full outline-none p-1 rounded-[25px] text-gray-800"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-[25px] p-2 space-x-2 w-full">
            <input
              type="password"
              placeholder="Mot de passe"
              className="w-full outline-none p-1 rounded-[25px] text-gray-800"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-[25px] p-2 space-x-2 w-full">
            <input
              type="password"
              placeholder="Confirmer mot de passe"
              className="w-full outline-none p-1 rounded-[25px] text-gray-800"
            />
          </div>
          <button className="w-full max-w-[150px] bg-black text-white py-1 rounded-[25px] hover:bg-gray-800 transition">
            S’inscrire
          </button>
        </form>
      </div>
    </div>
  );
}

export default Inscription;
