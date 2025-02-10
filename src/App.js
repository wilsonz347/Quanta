import React from 'react';

function App() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm">
        <h1 className="text-2xl font-bold mb-4">Welcome to My App</h1>
        <p className="text-gray-700 mb-4">
          This is a sample card with some shadow and rounded corners.
        </p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;