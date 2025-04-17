import "./LandingPage.css"
import { useNavigate } from "react-router-dom"

export default function LandingPage() {
  const navigate = useNavigate()
  return (
    <div className="landing-page">
        <div className="container mx-auto px-6 py-16 text-center">
            <div className="mx-auto max-w-lg mt-">
                <h1 className="text-3xl font-bold text-gray-800 lg:text-4xl">This is the tutorial page</h1>
                <p className="mt-6 text-gray-500 dark:text-gray-300">Afin de mieux naviguer sur notre site et facilement retrouver les informations, il est recommandé de suivre le tutoriel ci-dessous. Il vous guidera à travers les différentes sections du site et vous aidera à comprendre comment utiliser chaque fonctionnalité.</p>
                <p className="mt-6 text-gray-500 dark:text-gray-300"> Le tutoriel est divisé en plusieurs étapes, chacune expliquant une fonctionnalité spécifique du site. Suivez les instructions étape par étape et vous serez prêt à utiliser le site avec confiance.En arrivant sur la page d'accueil, vous verrez un bouton "Commencer le tutoriel". Cliquez dessus pour commencer. </p>
            </div>

            <div className="mt-10 flex justify-center">
                <div className="w-full flex justify-center items-center">
                    <div className="container flex flex-col gap-4 mx-8">
                        <div className="primary-bg rounded-xl w-full h-auto py-4 flex flex-row justify-between divide-x divide-solid divide-gray-400">
                            <div className="relative flex-1 flex flex-col gap-2 px-4">
                                <label className="text-gray-800 text-base font-semibold tracking-wider">Total Users</label>
                                <label className="text-white text-4xl font-bold">14K</label>
                            </div>
                            <div className="relative flex-1 flex flex-col gap-2 px-4">
                                <label className="text-gray-800 text-base font-semibold tracking-wider">Total City</label>
                                <label className="text-white text-4xl font-bold">120</label>
                            </div>
                            <div className="relative flex-1 flex flex-col gap-2 px-4">
                                <label className="text-gray-800 text-base font-semibold tracking-wider">Total interest Points</label>
                                <label className="text-white text-4xl font-bold">1.2k</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-lg mt-20">
                <h1 className="text-3xl font-bold text-gray-800 lg:text-4xl">Checking Your Next trip with our Awesome Cityguide Application</h1>
                <p className="mt-6 text-gray-500 dark:text-gray-300">Tu es ici pour trouver les meilleurs endroits à visiter dans ta ville. Nous avons des informations sur les restaurants, les musées, les parcs et bien plus encore.</p>
                <button
                onClick={() => navigate('/homepage')}
                className="mt-6 rounded-lg bg-blue-600 px-6 py-2.5 text-center text-sm font-medium capitalize leading-5 text-white hover:bg-blue-500 focus:outline-none lg:mx-0 lg:w-auto">Go to the homepage</button>
            </div>
        </div>
    </div>
  )
}
