import "./Contact.css"
import mail from "../../assets/mail-icon.png";
import phone from "../../assets/Phone.webp";
import { Link } from "react-router-dom";
import twitter from "../../assets/twitter.svg";
import linkedin from "../../assets/linkedin.svg";
import instagram from "../../assets/instagram.svg";

const Contact = () => {
  return (
    <div className="landing-page flex flex-col grow overflow-scroll">
      <div className="contact-page container mx-auto px-6 py-20">
        <h2>Vous avez une question ?</h2>
        <div className="mb-8 flex flex-col md:flex-row gap-8 justify-center">
          <div className="flex-1 rounded-lg max-w-96">
            <div className="bg-[#b0afe4] rounded-t-lg py-4 border-2 border-indigo-500">
              <img src={mail} alt="Mail icon" className="w-40 justify-self-center" />
            </div>
            <div className="p-4 rounded-b-lg shadow-lg">
              <p className="text-xl font-semibold">Echangeons par mail</p>
              <p className="mt-2">Afin d'avoir une réponse rapide à toutes vos questions</p>
              <div className="mt-4">
                <a href="mailto:cityguideadm@gmail.com" className="font-medium text-indigo-500 hover:text-indigo-700 flex items-center gap-2">
                  Envoyer un mail
                  <span className="material-symbols-outlined">
                    arrow_right_alt
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="flex-1 rounded-lg max-w-96">
            <div className="bg-[#b0afe4] rounded-t-lg py-4 border-2 border-indigo-500">
              <img src={phone} alt="Phone icon" className="w-40 justify-self-center" />
            </div>
            <div className="p-4 rounded-b-lg shadow-lg">
              <p className="text-xl font-semibold">Discutons par téléphone</p>
              <p className="mt-2">Notre équipe est à votre disposition pour vous aider et vous accompgner</p>
              <div className="mt-4">
                <p className="font-medium text-indigo-500">04 32 45 89 62</p>
              </div>
            </div>
          </div>
        </div>

        <div className="social-medias container flex flex-col items-center">
          <h2 className="mt-8">Pensez à consulter nos réseaux sociaux</h2>
          <div className="grid grid-cols-3 grid-rows-1 gap-4">
            <Link
              to="#"
              className="bg-white hover:bg-primary rounded-full shadow-lg p-1.5 transition-all"
            >
              <img src={twitter} alt="twitter" width={20} />
            </Link>
            <Link
              to="#"
              className="bg-white hover:bg-primary rounded-full shadow-lg p-1.5 transition-all"
            >
              <img src={instagram} alt="instagram" width={20} />
            </Link>
            <Link
              to="#"
              className="bg-white hover:bg-primary rounded-full shadow-lg p-1.5 transition-all"
            >
              <img src={linkedin} alt="linkedIn" width={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact