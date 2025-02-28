import { Routes,Route,Navigate } from "react-router-dom"

import Chatbot from "./components/Chatbot";
import Navbar from "./components/Navbar";
import Courses from "./pages/Courses";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Quiz from "./pages/Quiz";


function App() {
  return (
    <>

      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/login" element={<Login/>} /> 
      <Route path="/profile" element={<Profile/>} /> 
      <Route path="/dashboard" element={<Dashboard/>} /> 
      <Route path="/course" element={<Courses/>} /> 
      <Route path="/quiz" element={<Quiz/>} /> 

      <Route path="/chatbot" element={<Chatbot />} /> 

      </Routes>
      
    </>
  );
}

export default App;
