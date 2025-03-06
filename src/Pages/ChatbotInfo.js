import React from "react";
// Remove this import since we'll render the map in Home.js instead
// import GoogleMapWithPlaces from "../GMAP/nearestLocMap";

function ChatbotInfo() {
  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto p-6 md:p-12">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            HOW CHATBOT WORKS
          </h2>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
            Our AI-powered chatbot makes healthcare assistance simple and accessible. 
            Just type your symptoms into the chat, and our system will analyze them 
            to provide reliable medical advice. If further care is needed, the chatbot 
            will suggest nearby clinics within a 100-meter radius.
          </p>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed mt-4">
            With real-time responses and smart recommendations, you get instant 
            guidance for better health decisions—anytime, anywhere.
          </p>
          <button className="mt-6 px-8 py-4 bg-black text-white font-semibold rounded-full text-lg">
            Try out now
          </button>
        </div>
        <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
          <img 
            src="https://images.contentstack.io/v3/assets/blt48e9deb40787970b/blt4e5f941c48842086/668c16f7c9848823905e4cac/how-an-ai-chatbot-works.png" 
            alt="Chatbot" 
            className="w-72 sm:w-96 md:w-[400px] lg:w-[500px] xl:w-[590px] max-w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default ChatbotInfo;
