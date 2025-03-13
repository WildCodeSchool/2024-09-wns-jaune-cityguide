import { useState } from "react";

const images = [
  "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtiQ_Pcwlc6qydBsUKAmQwTUsiq1TIZkMOXezMfCXBxmqlDwM&s",
];

export default function InterestPointDetails({ onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className=" bg-[#706EEB] flex flex-col md: items-center lg:flex-row lg:justify-center p-2 lg:p-0 m-1 lg:m-0 rounded-3xl lg:rounded-none  md:w-auto">
      <div className="bg-[#FFFFFF] lg:bg-transparent flex flex-col md:flex-row items-center lg:justify-center gap-6 pt-5 pb-10 px-10 lg:pb-5 rounded-3xl w-90 lg:w-full lg:max-w-5xl">
        <div className="pb-6 border-b-2 border-[#706EEB] flex flex-col lg:border-0 lg:w-100">
          <button
            className="static text-black transform pr-0 rounded-full flex justify-end lg:hidden"
            onClick={onClose}
          >
            <span className="text-lg font-bold">X</span>
          </button>
          <div className="relative w-70 h-36 lg:w-100 lg:h-50 overflow-hidden rounded-xl">
            <img
              src={images[currentIndex]}
              alt="Point d'intérêt"
              className="w-full h-full object-cover"
            />
            <button
              className="absolute top-1/2 left-2 transform -translate-y-1/2 w-7 h-7 rounded-full border-2 shadow"
              onClick={prevSlide}
            >
              ←
            </button>
            <button
              className="absolute top-1/2 right-2 transform -translate-y-1/2 w-7 h-7 rounded-full border-2 shadow"
              onClick={nextSlide}
            >
              →
            </button>
          </div>
        </div>

        <div className="flex flex-col w-70 lg:w-100 lg:h-50 bg-gray-100 rounded-xl overflow-hidden border-1">
          <div className="bg-gray-300 h-11 p-2 text-center font-semibold border-b-1">
            Tour Eiffel
          </div>
          <div className="p-2 text-center h-auto text-sm">
            La Tour Eiffel est un monument emblématique de Paris, construit par
            Gustave Eiffel en 1889. Haute de 330 mètres, elle offre une vue
            panoramique sur la ville.
          </div>
        </div>
      </div>
    </div>
  );
}
