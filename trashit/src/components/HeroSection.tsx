import React from "react";

type HeroSectionProps ={
  onGetStartedClick: () => void;
};

const HeroSection = ({ onGetStartedClick}: HeroSectionProps) => {
  
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between md:px-16 py-2 mt-4">
      <div className="md:w-3/5 text-center md:text-left flex flex-col justify-between md:items-start h-full ml-2">
        <div className="space-y-8 mb-20">
          <h1 className="text-3xl md:text-5xl font-bold text-trashBlue leading-tight">
            Reliable <span className="text-trashGreen">Waste Collection</span> 
            <h1 className="text-3xl md:text-5xl font-bold text-trashBlue mt-2">
              at your FingerTips
            </h1>
          </h1>
          <p className="text-trashBlue text-xl max-w-md">
            Subscribe to affordable waste pickup services or earn by becoming a
            verified trash collector
          </p>
        </div>

        <div className="mb-2 justify-center flex">
          <button
            onClick={onGetStartedClick}
            className="bg-trashBlue text-trashGreen px-6 py-3 rounded-2xl hover:bg-trashGreen hover:text-trashBlue w-[180px] h-[60px] text-xl"
          >
            Get Started
          </button>
        </div>
      </div>

      
      <div className="md:w-2/5 w-full h-full items-end justify-center">
        <img src="/heropic2.png" alt="Heropic" className="w-full h-full" />
      </div>

    </section>
  );
};
export default HeroSection;
