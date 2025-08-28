// components/QuizControls.jsx
import {useEffect} from "react";
import { useAuthStore } from "../store/AuthStore.js";
import  { useNavigate } from "react-router-dom";

export default function QuizControls() {

    
    const {topic,setTopic,mode,setMode,difficulty,setDifficulty}=useAuthStore();
    const navigate = useNavigate();


    const topics = ["JavaScript", "Java", "Python","React","Type Script","HTML","CSS","Tailwind CSS", "Boot Strap",];
    const difficulties = ["easy", "medium", "hard"];


    useEffect(() => {
        if (mode && difficulty && topic) {
          navigate("/quiz");
        }
      }, [mode, difficulty, topic]);
     
    if (!topic) {
      return (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Select Topic</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-100">
            {topics.map((t) => (
              <button
                key={t}
                onClick={() => setTopic(t)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-2xl shadow-xl text-center animate-fade-in text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (!difficulty) {
      return (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Select Difficulty</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-38">
            {difficulties.map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (!mode) {
      return (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Select Mode</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 h-38 ">
            <button
              onClick={() => setMode("question-timer")}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Timer per Question
            </button>
            <button
              onClick={() => setMode("total-timer")}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Total Time Quiz
            </button>
          </div>
        </div>
      );
    }
    return null;
  }
  