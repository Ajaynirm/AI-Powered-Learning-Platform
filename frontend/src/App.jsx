import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "./store/AuthStore.js";
import Chatbot from "./components/Chatbot";
import Navbar from "./components/Navbar";
import Courses from "./pages/Courses";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

import Profile from "./pages/Profile";
import Quiz from "./components/Quiz.jsx";
import { Toaster } from "react-hot-toast";

import { useAuth } from "@clerk/clerk-react";

import Cookies from "js-cookie";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

function App() {
  const { getToken } = useAuth();
  const { checkAuth, authUser} = useAuthStore();

  useEffect(() => {
    const storeToken = async () => {
      
        const token = await getToken({ template: "default" });
        if (token) {
          Cookies.set("auth_token", token, { secure: true, sameSite: "strict" });
        }
      } 
    storeToken();
  }, []);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/auth/sign-up/*"
          element={!authUser ?  <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/auth/sign-in/*"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />

        {/* Clerk auth routes */}
        {/* <Route path="/auth/sign-in/*" element={<SignInPage routing="path" />} />
          <Route path="/auth/sign-up/*" element={<SignUpPage routing="path" />} /> */}

        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/course" element={<Courses />} />
        <Route path="/quiz" element={<Quiz />} />

        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
