import React from "react";
import Navbar from "./Navbar";

type HeroSectionProps ={
  onGetStartedClick: () => void;
};

const HeroSection = ({ onGetStartedClick}: HeroSectionProps) => {
  
  return (
    <div className="bg-[linear-gradient(to_top_left,_#86efac_20%,_#ffffff_80%)] pt-12">
      <Navbar/>
    <section className="flex flex-col-reverse md:flex-row items-center justify-between md:px-16 py-2">
      <div className="md:w-3/5 text-center md:text-left flex flex-col justify-between md:items-start h-full ml-4 mt-16 mb-4">
        <div className="space-y-6 mb-28 mt-6">
          <h1 className="text-3xl md:text-5xl font-black text-trashBlue leading-tight">
            Simplify Waste 
            <h1 className="text-3xl md:text-5xl font-black text-trashBlue mt-2">
              Collection with Trash<span className="text-green-500">It</span>
            </h1>
          </h1>
          <p className="text-trashBlue text-xl max-w-md mt-4">
            Subscribe to affordable waste pickup services or earn by becoming a
            verified trash collector
          </p>
        </div>

        <div className="mb-8 justify-center flex">
          <button
            onClick={onGetStartedClick}
            className="bg-trashBlue text-trashGreen px-6 py-3 rounded-2xl hover:bg-trashGreen hover:text-trashBlue w-[180px] h-[60px] text-xl"
          >
            Get Started
          </button>
        </div>
      </div>

      
      <div className="md:w-3/5 items-end justify-center">
        <img src="/chat4.png" alt="Heropic" className="" />
      </div>

    </section>
    </div>
  );
};
export default HeroSection;
