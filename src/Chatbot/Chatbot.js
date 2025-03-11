import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "I'm just a chatbot. How can I help?", sender: "bot" },
      ]);
    }, 1000);
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col" >
      {/* Chat Messages Area */}
      <div className="flex-1 p-12 overflow-y-auto space-y-2" style={{marginTop:"50px"}}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`w-fit max-w-[75%] p-3 rounded-lg text-gray-900 ${
                msg.sender === "user"
                  ? "bg-red-50 text-gray-800"
                  : "bg-blue-50 text-gray-900"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="p-4 bg-gray-200 flex items-center">
        <input
          type="text"
          className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="ml-3 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
