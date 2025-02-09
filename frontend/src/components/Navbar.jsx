import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <a href="#home" className="hover:text-blue-200">Home</a>
            <a href="#about" className="hover:text-blue-200">About</a>
            <a href="#services" className="hover:text-blue-200">Services</a>
            <a href="#contact" className="hover:text-blue-200">Contact</a>
            <a href="#chatbot" className="hover:text-blue-200">Chatbot</a>
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
          <a href="#home" className="block hover:text-blue-200">Home</a>
          <a href="#about" className="block hover:text-blue-200">About</a>
          <a href="#services" className="block hover:text-blue-200">Services</a>
          <a href="#contact" className="block hover:text-blue-200">Contact</a>
          <a href="#chatbot" className="block hover:text-blue-200">Chatbot</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
