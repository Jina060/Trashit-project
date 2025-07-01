import React from "react";
import HeroSection from "../components/HeroSection";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Testcarousel from "../components/Testcarousel";
import Footer from "../components/Footer";
import CTA from "../components/CTA";

const LandingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleRoleSelect = (role: string) => {
    navigate(`/signup?role=${role}`);
  };
    
  return (
    <div className="bg-white text-gray-800">
      {showModal && (
        <div className="w-screen h-screen fixed inset-0 bg-black bg-opacity-35 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full text-center shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-trashBlue hover:text-red-500 text-2xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-trashBlue">
              Welcome to Trash<span className="text-trashGreen">it!</span>
            </h2>
            <p className="text-trashBlue mb-6">
              Choose how you'd like to continue
            </p>
            <div className="flex flex-col gap-4">
              <button
                className="px-4 py-2 bg-trashBlue text-white rounded-2xl hover:bg-trashGreen transition"
                onClick={() => handleRoleSelect("customer")}
              >
                User
              </button>
              <button
                className="px-4 py-2 bg-trashBlue text-white rounded-2xl hover:bg-trashGreen transition"
                onClick={() => handleRoleSelect("collector")}
              >
                Trash Collector
              </button>
            </div>
          </div>
        </div>
      )}

      
      <HeroSection onGetStartedClick={() => setShowModal(true)} />

      {/* Why TrashIt Section */}
      <section className="bg-white pb-20 pt-16 px-4 text-center">
        <h1 className="text-4xl font-black mb-6 text-trashBlue">Why Trash<span className="text-trashGreen">It</span>?</h1>
        <p className="max-w-xl mx-auto text-trashBlue mb-16">
          TrashIt connects you to verified trash collectors making waste disposal easier, faster, and more reliable.
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          {[
            { img: "SignUpBglast.png", title: "Flexible Subscriptions" },
            { img: "/features/tracker.png", title: "Track your Trash Collector" },
            { img: "/features/payment.png", title: "Secure Mobile Payments" },
          ].map(({ img, title }) => (
            <div key={title} className="bg-trashBlue rounded-xl shadow-md p-4 w-full max-w-xs mx-auto">
              <img src={img} alt={title} className="w-full h-28 mx-auto mb-4" />
              <h3 className="text-lg text-white font-normal">{title}</h3>
            </div>
          ))}
        </div>
      </section>

     {/* === Join as a Trash Collector Section === */}
<section className="w-full px-6 md:px-24">
  <div className="bg-green-100 max-w-6xl h-[470px] flex flex-col md:flex-row items-center gap-2 rounded-3xl ">
    {/* Image */}
    <div className="md:w-2/5 flex justify-center pb-12">
      <img
        src="/Trash Collector.png"
        alt="Trash Collector"
        className="w-[300px] md:w-[350px] lg:w-[350px]"
      />
    </div>

    {/* Text Content */} 
    <div className="md:w-3/5 text-center md:text-left">
      <h2 className="text-3xl sm:text-4xl font-black text-trashBlue mb-4">
        Join as a <span className="text-trashGreen">Trash Collector</span>
      </h2>
      <p className="text-gray-800 mb-6 max-w-xl">
        Help keep your community clean while earning from it. Join our network
        of trusted trash collectors and connect with users who need regular
        waste collection services near you.
      </p>

      {/* Numbered List */}
      <ul className="space-y-3 text-left">
        {[
          "Get discovered by users around you",
          "Flexible collection schedules",
          "Real-time AI map and route optimization",
          "Fast and secure payments",
          "Ratings to build your reputation",
        ].map((item, index) => (
          <li key={index} className="flex items-start">
            <div className="w-6 h-6 flex items-center justify-center bg-trashGreen text-white rounded-full mr-4 font-semibold">
              {index + 1}
            </div>
            <span className="text-gray-800">{item}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <div className="mt-8">
        <button
          className="bg-trashBlue text-trashGreen px-4 py-2 rounded-xl text-lg font-normal shadow-md hover:bg-green-900 hover:text-white transition duration-300"
        >
          Become a Collector
        </button>
      </div>
    </div>
  </div>
</section>

<Testcarousel />
<CTA />
<Footer />
    </div>
  );
};

export default LandingPage;