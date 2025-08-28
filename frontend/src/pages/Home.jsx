import {  useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/AuthStore.js";

export default function Home() {
  const { authUser } = useAuthStore();

  const navigate=useNavigate();
  
    return (
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8  shadow-xl text-center animate-fade-in ">
        {/* Hero Section */}
        <header className="bg-blue-500 text-white py-20 text-center">
          <h1 className="text-4xl font-bold">AI-Powered Personalized Learning</h1>
          <p className="mt-4 text-lg">Enhance your learning experience with AI-driven recommendations.</p>
          <button className="mt-6 bg-white text-blue-500 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200" onClick={()=>navigate("/quiz")}>
            Get Started
          </button>
        </header>
  
        {/* Features Section */}
        <section className="  container mx-auto py-16 px-6 text-center ">
          <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-500  font-bold p-6 shadow-lg rounded-lg ">
              <h3 className="text-xl font-bold ">AI-Based Recommendations</h3>
              <p className="mt-2 0">Personalized course suggestions based on your learning behavior.</p>
            </div>
            <div className="bg-blue-500  font-bold p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-bold">Adaptive Quizzes</h3>
              <p className="mt-2">AI dynamically adjusts quiz difficulty to match your skill level.</p>
            </div>
            <div className="bg-blue-500  font-bold p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-bold">AI Chatbot Support</h3>
              <p className="mt-2  ">Instant learning assistance from an AI-powered chatbot.</p>
            </div>
          </div>
        </section>
  
        {/* Testimonials Section */}
        <section className="py-16 text-center border-2">
          <h2 className="text-3xl font-bold mb-8">Top Learners</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-blue-500  font-bold p-6 shadow-lg rounded-lg">
              <p className="text-gray-700">"Future Updates"</p>
              <span className="block mt-4 font-semibold">- ....</span>
            </div>
          </div>
        </section>
  
  
        {/* Call to Action */}
        {!authUser &&
        <footer className="text-center py-12">
        <h2 className="text-2xl font-bold">Start Learning Today!</h2>
        <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600" onClick={()=>navigate('/login')}>
          Join Now
        </button>
      </footer>
        }
        

      </div>
    );
  }
  

