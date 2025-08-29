import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "./store/AuthStore.js";
import Chatbot from "./components/Chatbot";
import Navbar from "./components/Navbar";
import Courses from "./pages/Courses";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Quiz from "./components/Quiz.jsx";
import SignUpPage from "./pages/Signup";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

function App() {
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  
  // if (isCheckingAuth && !authUser)
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <Loader className="size-10 animate-spin" />
  //     </div>
  //   );

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />

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
