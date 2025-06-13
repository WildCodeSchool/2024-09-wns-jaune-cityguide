import "./About.css";
import antho from "../../images/team/anthony.png";
import raph from "../../images/team/raph.jpg";
import caro from "../../images/team/caro.jpg";
import noellie from "../../images/team/noellie.jpg";
import bech from "../../images/team/bech-juge.jpg";
import linkedin from "../../assets/linkedin.svg";
import { Link } from "react-router-dom";
import traveller_nature from "../../assets/tourist-nature.jpg";
import accessibility from "../../assets/accessibility.png";
import authenticity from "../../assets/authenticity.png";
import collaboration from "../../assets/collaboration.png";
import innovation from "../../assets/project-management.png";


const About = () => {
  return (
    <div className="landing-page flex flex-col grow overflow-scroll">
      <div className="container mx-auto px-6 py-20 relative">
        <div className="company-bio shadow-lg">
          <h2>Nous sommes amoureux d'exploration💗</h2>
          <div>
            <p>Chez CityGuide, nous croyons que chaque ville a une histoire à raconter.</p>
            <p>Notre mission : faciliter l’exploration urbaine en rendant les points d’intérêt accessibles en un clin d'œil grâce à une carte interactive intuitive.</p>
            <p>Pensée pour les curieux, les voyageurs et les amoureux du patrimoine, CityGuide permet de découvrir les lieux emblématiques d’une ville — monuments, restaurants, bars, ou encore sites culturels — en quelques clics. Chaque point d’intérêt est enrichi d'informations précises, de photos, de notes et de commentaires, pour une expérience immersive et personnalisée.</p>
            <p>CityGuide, c’est aussi une plateforme collaborative, où les administrateurs locaux et les utilisateurs peuvent contribuer à mettre en valeur leur ville.</p>
            <p>Développée dans le cadre d’un projet commun, l’application incarne notre vision d’un tourisme moderne, accessible et intelligent. Et ce n’est qu’un début.</p>
          </div>
        </div>
        <div className="about-img absolute top-110 bottom-0 left-270 z-0">
          <img src={traveller_nature} alt="Tourist Nature" className="w-80 h-auto object-cover rounded-lg" />
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className="about-page-header flex flex-col items-center gap-8">
          <p className="tracking-wide">NOTRE EQUIPE</p>
          <h1 className="about-title flex flex-col items-center text-3xl lg:text-3xl font-bold text-gray-800 text-center">
            <span>5 développeurs passionnés</span>
            <span>à votre service</span>
          </h1>
          <span>Chez CityGuide, notre réussite repose sur l’alliance de talents <br /> d’exception, tous animés par une même passion : le voyage et l’innovation.<br /> Découvrez celles et ceux qui, chaque jour, réinventent l’exploration <br /> des destinations.</span>
        </div>
        <div className="max-w-6xl m-auto mt-10">
          <div className="team-members bg-[#B0AFE4] shadow-lg shadow-indigo-500/50">
            <h2 className="text-2xl font-bold text-gray-800 lg:text-4xl text-center py-4">Les membres</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              <div className="team-member bg-white p-4 rounded-lg shadow-md text-center">
                <img src={antho} alt="Anthony" className="w-full h-48 object-cover rounded-t-lg" />
                <div className="flex justify-center items-center gap-2 mt-2">
                  <h3 className="text-xl font-semibold">Anthony</h3>
                  <Link
                    to="https://www.linkedin.com/in/anthony-schwarz/"
                    className="bg-[rgb(112,110,235)] hover:bg-primary rounded-full shadow-md p-1.5 transition-all"
                  >
                    <img src={linkedin} alt="linkedIn" width={14} />
                  </Link>
                </div>
                <p className="text-gray-600">Développeur Rageux</p>
              </div>
              <div className="team-member bg-white p-4 rounded-lg shadow-md text-center">
                <img src={raph} alt="Raphael" className="w-full h-48 object-cover rounded-t-lg" />
                <div className="flex justify-center items-center gap-2 mt-2">
                  <h3 className="text-xl font-semibold">Raphael</h3>
                  <Link
                    to="https://www.linkedin.com/in/raphael-marion-8b4425292/"
                    className="bg-[rgb(112,110,235)] hover:bg-primary rounded-full shadow-md p-1.5 transition-all"
                  >
                    <img src={linkedin} alt="linkedIn" width={14} />
                  </Link>
                </div>
                <p className="text-gray-600">Développeur Bencheur (par son chat)</p>
              </div>
              <div className="team-member bg-white p-4 rounded-lg shadow-md text-center">
                <img src={caro} alt="Caroline" className="w-full h-48 object-cover rounded-t-lg" />
                <div className="flex justify-center items-center gap-2 mt-2">
                  <h3 className="text-xl font-semibold">Caroline</h3>
                  <Link
                    to="https://www.linkedin.com/in/caroline-gensac/"
                    className="bg-[rgb(112,110,235)] hover:bg-primary rounded-full shadow-md p-1.5 transition-all"
                  >
                    <img src={linkedin} alt="linkedIn" width={14} />
                  </Link>
                </div>
                <p className="text-gray-600">Développeuse, aka Dory</p>
              </div>
              <div className="team-member bg-white p-4 rounded-lg shadow-md text-center">
                <img src={noellie} alt="Noellie" className="w-full h-48 object-cover rounded-t-lg" />
                <div className="flex justify-center items-center gap-2 mt-2">
                  <h3 className="text-xl font-semibold">Noellie</h3>
                  <Link
                    to="https://www.linkedin.com/in/no%C3%ABllie-chatain-six/"
                    className="bg-[rgb(112,110,235)] hover:bg-primary rounded-full shadow-md p-1.5 transition-all"
                  >
                    <img src={linkedin} alt="linkedIn" width={14} />
                  </Link>
                </div>
                <p className="text-gray-600">Développeuse, soumise par son chat</p>
              </div>
              <div className="team-member bg-white p-4 rounded-lg shadow-md text-center">
                <img src={bech} alt="Bechir" className="w-full h-48 object-cover rounded-t-lg" />
                <div className="flex justify-center items-center gap-2 mt-2">
                  <h3 className="text-xl font-semibold">Bechir</h3>
                  <Link
                    to="https://www.linkedin.com/in/bechir-el-yammouni/"
                    className="bg-[rgb(112,110,235)] hover:bg-primary rounded-full shadow-md p-1.5 transition-all"
                  >
                    <img src={linkedin} alt="linkedIn" width={14} />
                  </Link>
                </div>
                <p className="text-gray-600">Développeur, juge et dictateur</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20 relative">
        <div className="our-values shadow-lg">
          <h2>Nos valeurs</h2>
          <div>
            <p className="text-center">Les valeurs qui nous animent sont celles de l'authenticité, de l'accessibilité, de la collaboration et de l'innovation, qui portent les rêves et les aspirations de notre communauté vers des horizons prometteurs.</p>
          </div>
          <div className="company-values flex flex-col gap-4 md:grid md:grid-cols-2 md:grid-rows-2">
            <div className="value-content flex flex-col items-center text-center md:items-start md:text-left">
              <div className="rounded-lg flex justify-center items-center size-8">
                <img src={authenticity} alt="Authenticity icon" />
              </div>
              <h3 className="text-xl font-semibold mt-6 mb-3">Authenticité</h3>
              <p className="mb-4">Mettre en avant des contenus fiables, ancrés dans la réalité locale et culturelle des territoires.</p>
              <p className="bg-white rounded-full text-center p-2 font-medium text-base/6 text-[#706eeb]">
                Parce que les plus belles histoires sont celles qui sont vraies 🏙️
              </p>
            </div>
            <div className="value-content flex flex-col items-center text-center md:items-start md:text-left">
              <div className="rounded-lg flex justify-center items-center size-8">
                <img src={accessibility} alt="Accessibility icon" />
              </div>
              <h3 className="text-xl font-semibold mt-6 mb-3">Accessibilité</h3>
              <p className="mb-4">Offrir une navigation simple, intuitive et ouverte au plus grand nombre, pour un tourisme sans barrières.</p>
              <p className="bg-white rounded-full text-center p-2 font-medium text-base/6 text-[#706eeb]">
                Chaque ville se découvre à cœur ouvert 🧡
              </p>
            </div>
            <div className="value-content flex flex-col items-center text-center md:items-start md:text-left">
              <div className="rounded-lg flex justify-center items-center size-8">
                <img src={collaboration} alt="Collaboration icon" />
              </div>
              <h3 className="text-xl font-semibold mt-6 mb-3">Collaboration</h3>
              <p className="mb-4">Valoriser la contribution des utilisateurs, des administrateurs locaux et des communautés pour enrichir les contenus.</p>
              <p className="bg-white rounded-full text-center p-2 font-medium text-base/6 text-[#706eeb]">
                Ensemble, on révèle les secrets des villes 🤝
              </p>
            </div>
            <div className="value-content flex flex-col items-center text-center md:items-start md:text-left">
              <div className="rounded-lg flex justify-center items-center size-8">
                <img src={innovation} alt="Innovation icon" />
              </div>
              <h3 className="text-xl font-semibold mt-6 mb-3">Innovation</h3>
              <p className="mb-4">Utiliser les technologies web et mobiles pour transformer l’exploration urbaine en une expérience moderne et connectée.</p>
              <p className="bg-white rounded-full text-center p-2 font-medium text-base/6 text-[#706eeb]">
                Explorer demain avec des idées d’aujourd’hui 🚀️
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About