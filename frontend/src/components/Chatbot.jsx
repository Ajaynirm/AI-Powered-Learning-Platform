import React, { useState, useRef, useEffect } from "react";
import OpenAI from "openai";

const api_key = import.meta.env.VITE_OPENAAI_KEYY;
const openai = new OpenAI({ apiKey: api_key, dangerouslyAllowBrowser: true });

const userIcon =
  "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png";
const botIcon = "https://cdn-icons-png.flaticon.com/512/6134/6134346.png";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLightMode, setIsLightMode] = useState(true);
  const [learningPrompt, setLearningPrompt] = useState("");
  const [activePrompt, setActivePrompt] = useState("");
  const messagesEndRef = useRef(null);

  const promptMap = {
    slow: "Please explain this as if I’m a beginner with simple words.",
    medium:
      "Give me a moderate explanation suitable for someone with some background.",
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
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          ...newMessages.map((msg) => ({
            role: msg.isUser ? "user" : "assistant",
            content: msg.text,
          })),
          { role: "user", content: userInput },
        ],
        store: true,
      });

      const aiReply = completion.choices[0].message.content.trim();
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
      <div>
        <div className="text-xl font-bold text-blue-600 mb-2">{title}</div>
        <div className="whitespace-pre-line">{content}</div>
      </div>
    );
  };

  return (
    <div
      className={`${
        isLightMode ? "bg-white text-black" : "bg-gray-900 text-white"
      } min-h-screen flex flex-col transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <h1 className="text-2xl font-bold">AI Chatbot</h1>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isLightMode}
            onChange={() => setIsLightMode(!isLightMode)}
          />
          <span className="text-sm">
            {isLightMode ? "Light Mode" : "Dark Mode"}
          </span>
        </label>
      </div>

      {/* Chat Window */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 bg-opacity-30">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`flex items-end gap-3 ${
                msg.isUser ? "flex-row-reverse" : ""
              }`}
            >
              <img
                src={msg.isUser ? userIcon : botIcon}
                className="w-8 h-8 rounded-full"
              />
              <div
                className={`max-w-[75%] p-4 rounded-2xl shadow ${
                  msg.isUser
                    ? "bg-blue-600 text-white rounded-br-none"
                    : isLightMode
                    ? "bg-gray-100 text-black rounded-bl-none"
                    : "bg-gray-700 text-white rounded-bl-none"
                }`}
              >
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
        className={`${
          isLightMode
            ? "bg-gray-100 bg-white/10 backdrop-blur-lg p-4  rounded-full flex items-center w-full max-w-2xl mx-auto shadow-lg"
            : "bg-gray-800"
        } px-6 py-4 flex items-center gap-4 border-t fixed bottom-0 left-1/2 transform -translate-x-1/2 z-10 w-[85%]`}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`flex-1 px-4 py-3 rounded-full outline-none ${
            isLightMode ? "bg-white text-black" : "bg-gray-700 text-white"
          } focus:ring-2 focus:ring-blue-500`}
          placeholder="Ask something..."
          disabled={loading}
        />
        <button
          onClick={handleSendMessage}
          disabled={loading}
          className={`p-3 rounded-full ${
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

      {/* Floating Prompt Buttons Below Input Area */}
      <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 flex gap-4 z-0">
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
                ? "bg-yellow-400 text-black hover:bg-yellow-500"
                : type === "medium"
                ? "bg-green-400 text-black hover:bg-green-500"
                : "bg-blue-400 text-black hover:bg-blue-500"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} Learner
          </button>
        ))}
      </div>
    </div>
  );
};

export default Chatbot;
