import React from 'react';

function FAQs() {
  return (
    <div className="relative bg-gradient-to-b from-[#33ccff] via-[#e6f7ff] to-white px-4 py-12  ">
      {/* Add an overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-t-[50px] md:rounded-t-[100px]"></div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
          EVERYTHING YOU NEED TO KNOW FOR YOUR INSTANT MEDICAL GUIDANCE
        </h2>

        <div className="space-y-4">
          {/* Details elements with enhanced styling */}
          <details className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg">
            <summary className="px-4 py-3 font-medium text-gray-800 hover:text-blue-600">
              How does the chatbot work?
            </summary>
            <div className="px-4 py-3 text-gray-600 border-t border-blue-100">
              Our AI-powered chatbot uses advanced natural language processing to understand your health concerns. It analyzes your symptoms and questions, comparing them with a vast database of medical knowledge to provide accurate, relevant responses and recommendations in real-time.
            </div>
          </details>

          {/* Repeat the same enhanced styling for other details elements */}
          <details className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg">
            <summary className="px-4 py-3 font-medium text-gray-800 hover:text-blue-600">
              Is the medical advice reliable?
            </summary>
            <div className="px-4 py-3 text-gray-600 border-t border-blue-100">
              Yes, our chatbot's medical information is sourced from verified medical databases and regularly reviewed by healthcare professionals. However, it's important to note that the chatbot is designed to provide general guidance and should not replace professional medical consultation for serious conditions.
            </div>
          </details>

          <details className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg">
            <summary className="px-4 py-3 font-medium text-gray-800 hover:text-blue-600">
              Can I book an appointment through the chatbot?
            </summary>
            <div className="px-4 py-3 text-gray-600 border-t border-blue-100">
              Yes, the chatbot can help you schedule appointments with nearby healthcare providers. It will guide you through the booking process and can even suggest available time slots based on your preferences and the urgency of your medical need.
            </div>
          </details>

          <details className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg">
            <summary className="px-4 py-3 font-medium text-gray-800 hover:text-blue-600">
              Does the chatbot store my health information?
            </summary>
            <div className="px-4 py-3 text-gray-600 border-t border-blue-100">
              Your privacy is our priority. While the chatbot temporarily processes your information to provide appropriate responses, we do not permanently store personal health data. All conversations are encrypted and automatically deleted after your session ends.
            </div>
          </details>

          <details className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg">
            <summary className="px-4 py-3 font-medium text-gray-800 hover:text-blue-600">
              Is the chatbot available 24/7?
            </summary>
            <div className="px-4 py-3 text-gray-600 border-t border-blue-100">
              Yes, our chatbot is available 24 hours a day, 7 days a week. You can access medical guidance and support whenever you need it, regardless of time zones or holidays.
            </div>
          </details>

          <details className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg">
            <summary className="px-4 py-3 font-medium text-gray-800 hover:text-blue-600">
              What types of symptoms can the chatbot help with?
            </summary>
            <div className="px-4 py-3 text-gray-600 border-t border-blue-100">
              The chatbot can help with a wide range of common symptoms including fever, cold, flu, allergies, digestive issues, and general wellness concerns. It can provide initial guidance for both acute and chronic conditions, though severe symptoms will always prompt a recommendation to seek immediate medical attention.
            </div>
          </details>

          <details className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg">
            <summary className="px-4 py-3 font-medium text-gray-800 hover:text-blue-600">
              Does it support multiple languages?
            </summary>
            <div className="px-4 py-3 text-gray-600 border-t border-blue-100">
              Yes, our chatbot supports multiple languages including English, Spanish, French, German, and Arabic. The language can be easily changed in the settings to ensure comfortable communication for all users.
            </div>
          </details>

          <details className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg">
            <summary className="px-4 py-3 font-medium text-gray-800 hover:text-blue-600">
              How do I find clinics near me?
            </summary>
            <div className="px-4 py-3 text-gray-600 border-t border-blue-100">
              The chatbot can use your location (with permission) to show nearby medical facilities. It provides a list of clinics, hospitals, and pharmacies within your area, complete with distance, ratings, and available services. You can also view these locations on an interactive map.
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}

export default FAQs;