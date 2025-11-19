import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../lib/axios.js";
import { Loader2 } from "lucide-react";

const difficulties = { easy: 60, medium: 120, hard: 180 };

export default function QuestionPage({
  topic,
  difficulty,
  // mode,
  questions,
  setQuestions,
  setScore,
  setQuestionTimes,
  setQuizCompleted,
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  // const [timeLeft, setTimeLeft] = useState(60);
  // const [totalTime, setTotalTime] = useState(difficulties[difficulty] || 60);
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
        console.log(res.data.questions);
      } catch (err) {
        setMessage("Failed to load questions:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [topic, difficulty, setQuestions]);

  // Timer logic
  // useEffect(() => {
  //   if (loading || questions.length === 0) return;

  //   if (
  //     (mode === "question-timer" && timeLeft === 0) ||
  //     (mode === "total-timer" && totalTime === 0)
  //   ) {
  //     handleAnswer();
  //     return;
  //   }

  //   const timer = setInterval(() => {
  //     if (mode === "question-timer") {
  //       setTimeLeft((prev) => Math.max(prev - 1, 0));
  //     } else if (mode === "total-timer") {
  //       setTotalTime((prev) => Math.max(prev - 1, 0));
  //     }
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, [timeLeft, totalTime, mode, loading, questions]);

  const handleAnswer = () => {
    const current = questions[currentQuestion];
    if (!current) return;

    setQuestionTimes((prev) => [
      ...prev,
      {
        question: current.question,
        selected: selectedOption || "No Answer",
        correct: current.answer,
        timeUsed: 10,
      },
    ]);

    if (selectedOption === current.answer) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
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
    <div className="flex flex-col justify-start items-center">
      <h2 className="text-3xl lg:text-5xl font-bold  pb-10 text-gray-300">
        {topic} Quiz -{" "}
        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
      </h2>
      {/* <p className="text-lg text-red-500 mt-2">
        {mode === "question-timer"
          ? `Time Left: ${timeLeft}s`
          : `Total Time Left: ${totalTime}s`}
      </p> */}
      <div className="flex justify-center  rounded-lg  p-2  mb-4 w-full">
      <h3 className=" text-xl text-gray-400 md:text-3xl font-bold ">{currentQuestion+1}.{current.question}</h3>
      </div>
      
      {Object.entries(current.options).map(([key, value]) => (
        <div className="flex m-1  ">
               <button
          key={key}
          className={` md:h-15 w-100 md:w-200 text-left text-lg md:text-xl  px-4 py-2 border border-gray-600 rounded-sm mb-2 ${
            selectedOption === key
              ? "bg-gray-600"
              : ""
          }`}
          onClick={() => setSelectedOption(key)}
        >
          <strong>{key}.</strong> {value}
        </button>
        </div>
       
      ))}
      <button
        className="mt-4 w-20 md:w-40 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600"
        onClick={handleAnswer}
        disabled={!selectedOption}
      >
        Next
      </button>
    </div>
  );
}
