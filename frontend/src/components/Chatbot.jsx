import React, { useState, useRef, useEffect } from 'react';
import OpenAI from "openai";

const api_key = import.meta.env.VITE_OPENAI_KEY;
const openai = new OpenAI({ apiKey: api_key, dangerouslyAllowBrowser: true });

const userIcon = "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png";
const botIcon = "https://cdn-icons-png.flaticon.com/512/6134/6134346.png";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { text: input, isUser: true }];
    setMessages([...newMessages, { text: "Thinking...", isUser: false, loading: true }]);
    setInput('');
    setLoading(true);

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          ...newMessages.map(msg => ({ role: msg.isUser ? "user" : "assistant", content: msg.text }))
        ],
        store: true,
      });

      setMessages([...newMessages, { text: completion.choices[0].message.content, isUser: false }]);
    } catch (error) {
      console.error("Error fetching response: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !loading) {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white p-4 md:p-10">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl h-[80vh] flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 p-2">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex items-center ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                {!message.isUser && <img src={botIcon} alt="Bot" className="w-10 h-10 mr-4" />}
                <div className={`p-4 rounded-lg text-lg ${message.isUser ? 'bg-gray-700 text-white text-right w-2/3 self-end' : 'bg-black text-white text-left w-full'}`}>
                  {message.loading ? <span className="animate-pulse">...</span> : message.text}
                </div>
                {message.isUser && <img src={userIcon} alt="User" className="w-10 h-10 ml-4" />}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="flex items-center space-x-2 mt-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-3 border border-gray-600 bg-gray-700 rounded-md text-lg text-white"
            placeholder="Ask something..."
            disabled={loading}
          />
          <button
            onClick={handleSendMessage}
            className={`bg-blue-500 text-white p-3 rounded-md text-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
