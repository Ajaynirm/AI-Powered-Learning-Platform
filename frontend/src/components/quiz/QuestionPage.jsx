import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../lib/axios.js";
import { Loader2 } from "lucide-react";

const difficulties = { easy: 60, medium: 120, hard: 180 };

export default function QuestionPage({
  topic,
  difficulty,
  mode,
  questions,
  setQuestions,
  setScore,
  setQuestionTimes,
  setQuizCompleted,
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [totalTime, setTotalTime] = useState(difficulties[difficulty] || 60);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  // Fetch questions from backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setMessage("Question Generating By AI");
        const res = await axiosInstance.get(
          `/questions/${topic}/${difficulty}`
        );
        setQuestions(res.data.questions || []);
      } catch (err) {
        setMessage("Failed to load questions:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [topic, difficulty, setQuestions]);

  // Timer logic
  useEffect(() => {
    if (loading || questions.length === 0) return;

    if (
      (mode === "question-timer" && timeLeft === 0) ||
      (mode === "total-timer" && totalTime === 0)
    ) {
      handleAnswer();
      return;
    }

    const timer = setInterval(() => {
      if (mode === "question-timer") {
        setTimeLeft((prev) => Math.max(prev - 1, 0));
      } else if (mode === "total-timer") {
        setTotalTime((prev) => Math.max(prev - 1, 0));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, totalTime, mode, loading, questions]);

  const handleAnswer = () => {
    const current = questions[currentQuestion];
    if (!current) return;

    setQuestionTimes((prev) => [
      ...prev,
      {
        question: current.question,
        selected: selectedOption || "No Answer",
        correct: current.answer,
        timeUsed: 60 - timeLeft,
      },
    ]);

    if (selectedOption === current.answer) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setTimeLeft(60);
    } else {
      setQuizCompleted(true);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center m-5 p-5">
        <div>{message}</div>
        <Loader2 className="size-10 animate-spin" />
      </div>
    );
  }

  const current = questions[currentQuestion];

  if (!current) {
    return<>
      <div className="text-red-500">No questions available for this topic/difficulty.</div>
      <div >
        <button className="mt-10 p-3 text-sm lg:text-lg lg:p-5 rounded-2xl text-white bg-blue-600"
        onClick={()=>{window.location.href = "/quiz";}}
        >Select New Topic</button>
      </div>
    </> 
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {topic} Quiz -{" "}
        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
      </h2>
      <p className="text-lg text-red-500 mt-2">
        {mode === "question-timer"
          ? `Time Left: ${timeLeft}s`
          : `Total Time Left: ${totalTime}s`}
      </p>
      <h3 className="font-semibold mb-4">{current.question}</h3>
      {Object.entries(current.options).map(([key, value]) => (
        <button
          key={key}
          className={`block w-full text-left px-4 py-2 border rounded-lg mb-2 ${
            selectedOption === key
              ? "bg-green-400"
              : ""
          }`}
          onClick={() => setSelectedOption(key)}
        >
          <strong>{key}.</strong> {value}
        </button>
      ))}
      <button
        className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600"
        onClick={handleAnswer}
        disabled={!selectedOption}
      >
        Next
      </button>
    </div>
  );
}
