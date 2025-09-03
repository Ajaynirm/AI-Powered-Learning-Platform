import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore.js";
import LogoutButton from "./auth/Logout.jsx";
import { useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const {user}=useUser();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const navigate = useNavigate();
  const location = useLocation();
  const { authUser, logout } = useAuthStore();

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Topics", path: "/course" },
    { label: "Quiz", path: "/quiz" },
    { label: "Chatbot", path: "/chatbot" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/profile" },
  ];

 
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="navbar  px-6 shadow-md">
      {/* Left Section */}
      <div className="flex-1">
        <Link to="/" className="text-xl lg:text-2xl font-bold">
          AI Learning Platform
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-4">
        <ul className="menu menu-horizontal px-1 space-x-2">
          
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={` ${
                  location.pathname === item.path
                    ? "underline font-semibold"
                    : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          {user ? (
            <li>
              <LogoutButton />
            </li>
          ) : (
            <li>
              <button
                className=""
                onClick={() => navigate("/auth/sign-in")}
              >
                Login
              </button>
             
            </li>
          )}
        </ul>

        <label className="swap swap-rotate cursor-pointer">
      {/* Checkbox to toggle */}
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />

      {/* Sun icon (light mode) */}
      <svg
        className="swap-off fill-current w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="m17.66 17.66 1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="m6.34 17.66-1.41 1.41"></path>
          <path d="m19.07 4.93-1.41 1.41"></path>
        </g>
      </svg>

      {/* Moon icon (dark mode) */}
      <svg
        className="swap-on fill-current w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </g>
      </svg>
    </label>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center space-x-2">
      <label className="swap swap-rotate cursor-pointer">
      {/* Checkbox to toggle */}
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />

      {/* Sun icon (light mode) */}
      <svg
        className="swap-off fill-current w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="m17.66 17.66 1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="m6.34 17.66-1.41 1.41"></path>
          <path d="m19.07 4.93-1.41 1.41"></path>
        </g>
      </svg>

      {/* Moon icon (dark mode) */}
      <svg
        className="swap-on fill-current w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </g>
      </svg>
    </label>

        {/* Hamburger Dropdown (WORKS with DaisyUI) */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 text-base-content rounded-box w-52"
          >
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`hover:bg-base-200 rounded-lg ${
                    location.pathname === item.path
                      ? "font-semibold text-primary"
                      : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {user ? (
              <li>
                <LogoutButton />
              </li>
            ) : (
              <li>
                <button
                  className="hover:bg-base-200 rounded-lg"
                  onClick={() => navigate("/auth/sign-in")}
                >
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
