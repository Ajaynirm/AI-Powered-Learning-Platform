import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate=useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">AI Learning</h1>
          </div>
          <div className="hidden md:flex space-x-6">
            <a  className="hover:text-blue-200" onClick={()=>navigate('/')}>Home</a>
            <a  className="hover:text-blue-200" onClick={()=>navigate('/course')}>Course</a>
            
            <a  className="hover:text-blue-200" onClick={()=>navigate('/quiz')}>Quiz</a>
            <a  className="hover:text-blue-200" onClick={()=>navigate('/chatbot')}>Chatbot</a>
            
            <a  className="hover:text-blue-200" onClick={ ()=>navigate('/dashboard')}>Dashboard</a>
            <a  className="hover:text-blue-200" onClick={()=>navigate('/profile')}>Profile</a>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-600 text-white px-4 py-2 space-y-2">
          <a  className="block hover:text-blue-200" onClick={()=>navigate('/')}>Home</a>
          <a  className="block hover:text-blue-200" onClick={()=>navigate('/course')}>Course</a>
          <a  className="block hover:text-blue-200" onClick={ ()=>navigate('/dashboard')}>Dashboard</a>
          <a  className="block hover:text-blue-200" onClick={()=>navigate('/quiz')}>Quiz</a>
          <a  className="block hover:text-blue-200" onClick={()=>navigate('/chatbot')}>Chatbot</a>
          <a  className="block hover:text-blue-200" onClick={()=>navigate('/profile')}>Profile</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
