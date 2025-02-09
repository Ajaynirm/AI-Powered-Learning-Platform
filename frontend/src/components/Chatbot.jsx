import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null); // Ref for the end of the messages

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, isUser: true },
      { text: "AI response will go here", isUser: false }, // Replace with actual AI response
    ]);
    setInput('');
  };

  // Scroll to the bottom of the chat whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 h-[80vh] flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 p-2">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs p-2 rounded-lg ${message.isUser ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
                  {message.text}
                </div>
              </div>
            ))}
            {/* Ref element to scroll to the bottom */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="flex items-center space-x-2 mt-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Ask something..."
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

