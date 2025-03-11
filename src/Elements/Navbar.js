import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className=" bg-center"
      >
      <nav className="bg-gray-200 bg-opacity-90 p-2  fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[80%] rounded-3xl shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          {/* App Name */}
          <div className="text-xl font-bold  px-4">AI Chatbot</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 mx-auto">
          <Link to="/chatbot"><button className="px-4 py-2 rounded hover:text-gray-400">Chat with Bot</button></Link>   
            <Link to="/nearby-clinics"><button className="px-4 py-2 rounded hover:text-gray-400">Nearby Clinics</button></Link>
            <button className="px-4 py-2 rounded hover:text-gray-400">Appointments</button>
            <button className="px-4 py-2 rounded hover:text-gray-400">About Us</button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? (
                <span className="text-2xl">&#x2715;</span> // Cross icon (✕)
              ) : (
                <span className="text-2xl">&#9776;</span> // Hamburger icon (☰)
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col items-center space-y-2 mt-3">
           <Link to="/chatbot"><button className="px-4 py-2 rounded hover:text-gray-400">Chat with Bot</button></Link>  
            <Link to="/nearby-clinics"><button className="px-4 py-2 rounded hover:text-gray-400">Nearby Clinics</button></Link>
            <button className="px-4 py-2 rounded hover:text-gray-400">Appointments</button>
            <button className="px-4 py-2 rounded hover:text-gray-400">About Us</button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
