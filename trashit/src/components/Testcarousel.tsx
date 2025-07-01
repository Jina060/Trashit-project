import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Epie Courage",
    role: "TrashIt user",
    text: "TrashIt makes waste pickup so easy! I just schedule and relax.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Biche Precious",
    role: "TrashIt user",
    text: "TrashIt makes waste pickup so easy! I just schedule and relax.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Orock Ian Ojong",
    role: "TrashIt user",
    text: "TrashIt makes waste pickup so easy! I just schedule and relax.",
    image: "https://randomuser.me/api/portraits/men/47.jpg",
  },
  {
    name: "Lucy Tayo",
    role: "TrashIt user",
    text: "This service is amazing! Highly recommend to everyone.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Liam Kelly",
    role: "TrashIt user",
    text: "Effortless and reliable — TrashIt changed the game for me.",
    image: "https://randomuser.me/api/portraits/men/60.jpg",
  },
   {
    name: "Gana Jesse",
    role: "TrashIt user",
    text: "Effortless and reliable — TrashIt changed the game for me.",
    image: "https://randomuser.me/api/portraits/men/60.jpg",
  },
   {
    name: "Kumfa Nick",
    role: "TrashIt user",
    text: "Effortless and reliable — TrashIt changed the game for me.",
    image: "https://randomuser.me/api/portraits/men/60.jpg",
  },
];

const Testcarousel = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto pb-24 pt-16">
      <h1 className="text-center text-4xl font-black text-trashBlue">
        What our <span className="text-trashGreen">Users</span> Say!
      </h1>
      <p className="text-center mt-2 mb-16 text-lg text-trashBlue">
        Making an impact, one pickup at a time
      </p>
      <div className="relative flex items-center justify-center">
        <button
          className="absolute left-0 z-10 p-2 bg-trashGreen/50 ml-4 shadow-md rounded-full"
          onClick={handlePrev}
        >
          <ChevronLeft />
        </button>
        <div className="flex gap-6 transition-all duration-500">
          {testimonials.map((item, index) => {
            const isActive = index === activeIndex;
            const isSide = Math.abs(index - activeIndex) === 1 ||
              Math.abs(index - activeIndex) === testimonials.length - 1 ||
              Math.abs(index - activeIndex) === testimonials.length - 2;

            return (
              <div
                key={index}
                className={`rounded-xl px-6 py-4 shadow-md transition-all duration-300 w-64 shrink-0 bg-[#ffffff] border text-center ${
                  isActive
                    ? "scale-105 border-green-400 z-10"
                    : isSide
                    ? "opacity-70 scale-95"
                    : "opacity-0 hidden"
                }`}
              >
                <div className="flex items-center justify-center mb-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <div className="text-left">
                    <h3 className="text-sm font-semibold">{item.name}</h3>
                    <p className="text-xs text-green-500">{item.role}</p>
                  </div>
                </div>
                <p className="text-sm italic text-gray-700">“{item.text}”</p>
              </div>
            );
          })}
        </div>
        <button
          className="absolute right-0 z-10 p-2 bg-trashGreen/55 shadow-md rounded-full mr-4"
          onClick={handleNext}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Testcarousel;
