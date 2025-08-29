import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore.js";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { authUser, logout } = useAuthStore();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4  shadow-xl text-center animate-fade-in cursor-pointer">
      <div className="max-w-7xl mx-auto px-4 py-3 ">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4 ">
            <h1 className="text-2xl font-bold">AI Learning Platform</h1>
          </div>
          <div className="hidden md:flex space-x-6">
            <a
              className="hover:text-blue-200"
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </a>
            <button
              className="hover:text-blue-200"
              onClick={() => navigate("/course")}
            >
              Topics
            </button>

            <button
              className="hover:text-blue-200"
              onClick={() => navigate("/quiz")}
            >
              Quiz
            </button>
            <button
              className="hover:text-blue-200"
              onClick={() => navigate("/chatbot")}
            >
              Chatbot
            </button>

            <button
              className="hover:text-blue-200"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </button>
            <button
              className="hover:text-blue-200"
              onClick={() => navigate("/profile")}
            >
              Profile
            </button>

            {authUser ? (
              <div>
                <button
                  className="hover:text-blue-200"
                  onClick={() => logout()}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div>
                <button
                  className="hover:text-blue-200"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </div>
            )}
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-600 text-white px-4 py-2 space-y-2">
          <a
            className="block hover:text-blue-200"
            onClick={() => navigate("/")}
          >
            Menu
          </a>
          <a
            className="block hover:text-blue-200"
            onClick={() => navigate("/")}
          >
            Home
          </a>
          <a
            className="block hover:text-blue-200"
            onClick={() => navigate("/course")}
          >
            Course
          </a>
          <a
            className="block hover:text-blue-200"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </a>
          <a
            className="block hover:text-blue-200"
            onClick={() => navigate("/quiz")}
          >
            Quiz
          </a>
          <a
            className="block hover:text-blue-200"
            onClick={() => navigate("/chatbot")}
          >
            Chatbot
          </a>
          <a
            className="block hover:text-blue-200"
            onClick={() => navigate("/profile")}
          >
            Profile
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
