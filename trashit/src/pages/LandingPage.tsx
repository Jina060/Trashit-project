import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const LandingPage = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate(); //Navigate programmatically

    const handleRoleSelect = (role: string) => {
      navigate(`/signup?role=${role}`); //navigate with role as a query param
    }
    return (
        <>
        <div className="min-h-screen bg-[linear-gradient(to_top_left,_#43E487_15%,_#ffffff_85%)]">
      
         {/*popup*/}
{showModal && (
        <div className="w-screen h-screen fixed inset-0 bg-black bg-opacity-35 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full text-center shadow-lg relative">
            {/*close*/}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-trashBlue hover:text-red-500 text-2xl font-bold"
            >
              &times;
            </button>

            {/*popup content*/}
            <h2 className="text-2xl font-bold mb-4 text-trashBlue">
              Welcome to Trash<span className="text-trashGreen">it!</span>
            </h2>
            <p className="text-trashBlue mb-6"> 
              Choose how you'd like to continue
            </p>

            <div className="flex flex-col gap-4">
              <button
                className="px-4 py-2 bg-trashBlue text-white rounded-2xl hover:bg-trashGreen transition"
                onClick={() => handleRoleSelect("customer") }
                  //user dashboard
              >
                User
              </button>

              <button
                className="px-4 py-2 bg-trashBlue text-white rounded-2xl hover:bg-trashGreen transition"
                onClick={() => handleRoleSelect("collector")}
                  //Trash Collector dashboard
                
              >
                Trash Collector
              </button>
            </div>
          </div>
        </div>
      )}
         <Navbar />
         <HeroSection onGetStartedClick={() => setShowModal(true)} />

        </div>
        </>
    )
}
export default LandingPage;