import React from "react";
import Navbar from "../Elements/Navbar";
import ChatbotInfo from "./ChatbotInfo";
import GoogleMapWithPlaces from "../GMAP/nearestLocMap";
import HealthTips from "./HealthTips";
import FAQs from "./FAQs";

function Home() {
  return (
    <>
      <Navbar />

      <div 
        className="h-screen bg-cover bg-center flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-20 pt-24"
        style={{ backgroundImage: "url('./BG.jpg')" }}
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                    <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              AI CHAT FOR INSTANT MEDICAL GUIDANCE
            </h1>
            <p className="text-lg md:text-xl">
              Describe your symptoms, get expert medical advice, and find nearby clinics within 100m—all in one chat.
            </p>

             <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
   <button className="px-6 py-3 bg-black text-white font-semibold 
    rounded-tr-3xl rounded-tl-3xl rounded-br-3xl w-full sm:w-auto">
    Try it - It's free
  </button>

   <button className="px-6 py-3 bg-black text-white font-semibold rounded-3xl w-full sm:w-auto">
    Find Clinics
  </button>
</div>

          </div>

           <div className="w-full md:w-1/2 flex justify-center">
            <img 
              src="https://www.folio3.ai/wp-content/uploads/2024/05/Frame-1410085048-692x468.webp" 
              alt="Medical Chat" 
              className="w-48 sm:w-64 md:w-[400px] lg:w-[400px] xl:w-[620px] 2xl:w-[600px] max-w-full"
            />
          </div>

        </div>
      </div>
      <ChatbotInfo />
      <GoogleMapWithPlaces />
      <HealthTips />
      <FAQs />
    </>
  );
}

export default Home;
