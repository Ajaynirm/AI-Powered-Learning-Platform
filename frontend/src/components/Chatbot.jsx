import React, { useState, useRef, useEffect } from "react";
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

const api_key = import.meta.env.VITE_OPENAAI_KEYY;
const openai = new OpenAI({ apiKey: api_key, dangerouslyAllowBrowser: true });

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [learningPrompt, setLearningPrompt] = useState("");
  const [activePrompt, setActivePrompt] = useState("");
  const messagesEndRef = useRef(null);

  const promptMap = {
    slow: "Please explain this as if I’m a beginner with simple words.",
    medium:
      "Give me a moderate explanation suitable for someone with that respective background.",
    fast: "Explain it quickly and concisely, I understand fast.",
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userInput = learningPrompt ? `${learningPrompt} ${input}` : input;

    const newMessages = [...messages, { text: input, isUser: true }];
    setMessages([
      ...newMessages,
      { text: "Thinking...", isUser: false, loading: true },
    ]);
    setInput("");
    setLoading(true);
    setLearningPrompt("");
    setActivePrompt("");

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
      // Convert chat history into a single prompt
      const historyText = newMessages
        .map((msg) => `${msg.isUser ? "User" : "Assistant"}: ${msg.text}`)
        .join("\n");
    
      const prompt = `
    System: You are a helpful assistant.
    
    ${historyText}
    
    User: ${userInput}
    Assistant:
      `;
    
      const result = await model.generateContent(prompt);
    
      const aiReply = result.response.text().trim();
    
      setMessages([...newMessages, { text: aiReply, isUser: false }]);
    } catch (error) {
      console.error("Error fetching response: ", error);
    } finally {
      setLoading(false);
    }


  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) handleSendMessage();
  };

  const renderFormattedMessage = (text, isUser) => {
    if (isUser) return <div>{text}</div>;

    const lines = text.split("\n").filter(Boolean);
    const title = lines[0] || "";
    const content = lines.slice(1).join("\n");

    return (
      <div className="bg-black p-6 rounded-2xl">
        <div className="text-sm lg:text-lg text-gray-400">{title}</div>
        <div className="text-sm text-gray-500 whitespace-pre-line">{content}</div>
      </div>
    );
  };

  return (
    <>
      <div
        className={`h-screen flex flex-col justify-center items-center transition-all duration-300 px-2`}
      >
        {/* Header */}
        <div className="flex justify-center items-center px-6 py-4 border-b">
          <h1 className="text-2xl font-bold">AI Chatbot</h1>
        </div>

        {/* Chat Window */}
        <div className=" rounded-sm flex-1 w-full lg:w-200 text-sm lg:text-lg  overflow-y-auto px-6 py-4 space-y-6  pb-20 mb-40">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.isUser ? "justify-end" : "justify-start"
              } `}
            >
              <div
                className={`flex items-end gap-3 lg:w-full  ${
                  msg.isUser ? "flex-row-reverse" : ""
                }`}
              >
                <div className="avatar avatar-placeholder">
                  <div className="bg-neutral text-neutral-content w-8 rounded-full">
                    <span className="text-sm lg:text-lg">
                      {msg.isUser ? "AJ" : "AI"}
                    </span>
                  </div>
                </div>
                <div className={`max-w-[75%] p-4 rounded-2xl shadow `}>
                  {msg.loading ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    renderFormattedMessage(msg.text, msg.isUser)
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area (Medium Size, Bottom Centered) */}

        <div
          className={`flex items-center justify-around fixed bottom-5 text-sm lg:text-lg   z-10 w-[80%] lg:w-[50%] border-2 border-gray-500 p-1 lg:p-2 rounded-4xl`}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`w-[90%] rounded-full outline-none pl-4`}
            placeholder="Ask something..."
            disabled={loading}
          />
          <button
            onClick={handleSendMessage}
            disabled={loading}
            className={`p-2 rounded-full ${
              loading ? "opacity-50" : "bg-blue-500 hover:bg-blue-600"
            } transition`}
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.752 11.168l-9.456 5.478a1 1 0 01-1.496-.868V8.222a1 1 0 011.496-.868l9.456 5.478a1 1 0 010 1.736z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Floating Prompt Buttons Below Input Area */}
      <div className="fixed right-5 bottom-20 transform  text-sm lg:text-lg flex lg:flex-col gap-2 z-0">
        {["slow", "medium", "fast"].map((type) => (
          <button
            key={type}
            onClick={() => {
              setLearningPrompt(promptMap[type]);
              setActivePrompt(type);
            }}
            className={`px-4 py-2 rounded-full shadow transition ${
              activePrompt === type
                ? "bg-blue-700 text-white"
                : type === "slow"
                ? "bg-blue-400 text-black hover:bg-blue-500"
                : type === "medium"
                ? "bg-green-500 text-black hover:bg-green-600"
                : "bg-yellow-500 text-black hover:bg-yellow-600"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} Learner
          </button>
        ))}
      </div>
    </>
  );
};

export default Chatbot;
