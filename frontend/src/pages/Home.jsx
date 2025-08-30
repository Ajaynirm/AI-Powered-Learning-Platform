import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore.js";
import Footer from "./Footer.jsx";

export default function Home() {
  const { authUser } = useAuthStore();
  const navigate = useNavigate();

  const features = [
    {
      title: "AI-Based Recommendations",
      description: "Personalized course suggestions based on your learning behavior.",
    },
    {
      title: "Adaptive Quizzes",
      description: "AI dynamically adjusts quiz difficulty to match your skill level.",
    },
    {
      title: "AI Chatbot Support",
      description: "Instant learning assistance from an AI-powered chatbot.",
    },
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <header className="py-24 text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <h1 className="text-5xl font-extrabold mb-4 animate-fade-in">AI-Powered Personalized Learning</h1>
        <p className="text-lg mb-6 animate-fade-in">Enhance your learning experience with AI-driven tests and recommendations.</p>
        <button
          onClick={() => navigate("/quiz")}
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition duration-300"
        >
          Get Started
        </button>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-6 shadow-xl border-2 rounded-xl transition transform hover:-translate-y-2 hover:shadow-xl   cursor-pointer"
            >
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className=" ">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16   text-center">
        <h2 className="text-3xl font-bold mb-8">Top Learners</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="p-6 shadow-lg rounded-xl border-2 transition transform hover:-translate-y-1 hover:shadow-2xl">
            <p className="">"Future Updates"</p>
            <span className="block mt-4 font-semibold">....</span>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      {!authUser && (
        <footer className="text-center py-12  ">
          <h2 className="text-2xl font-bold mb-14">Start Learning Today!</h2>
          <button
            onClick={() => navigate("/login")}
            className=" bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition duration-300"
          >
            Explore Adaptive Learning
          </button>
        </footer>
      )}
      <Footer />
    </div>
  );
}


