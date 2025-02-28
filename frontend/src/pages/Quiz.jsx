import { useState, useEffect } from "react";
import questionsData from "../questions/jsQuestions.js";

export default function Quiz() {
  const [topic, setTopic] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [mode, setMode] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [totalTime, setTotalTime] = useState(0);
  const [questionTimes, setQuestionTimes] = useState([]);

  const topics = ["JavaScript", "Java", "Python"];
  const difficulties = { easy: 60, medium: 120, hard: 180 };

  useEffect(() => {
    if (topic && difficulty && mode) {
      const selectedQuestions = questionsData[topic]?.[difficulty] || [];
      setQuestions(selectedQuestions);
      setTotalTime(selectedQuestions.length * (difficulties[difficulty] || 60));
      setTimeLeft(difficulties[difficulty] || 60);
    }
  }, [topic, difficulty, mode]);

  useEffect(() => {
    if ((mode === "question-timer" && timeLeft === 0) || (mode === "total-timer" && totalTime === 0)) {
      handleAnswer();
    }
    const timer = setInterval(() => {
      if (mode === "question-timer") {
        setTimeLeft((prev) => Math.max(prev - 1, 0));
      } else if (mode === "total-timer") {
        setTotalTime((prev) => Math.max(prev - 1, 0));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, totalTime, mode]);

  const handleAnswer = () => {
    if (!questions[currentQuestion]) return; // Prevent undefined access

    setQuestionTimes([...questionTimes, {
      question: questions[currentQuestion]?.question || "N/A",
      selected: selectedOption || "No Answer",
      correct: questions[currentQuestion]?.answer || "N/A",
      timeUsed: difficulties[difficulty] - timeLeft,
    }]);

    if (selectedOption === questions[currentQuestion]?.answer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setTimeLeft(difficulties[difficulty]);
    } else {
      setQuizCompleted(true);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl text-center font-serif md:max-w-6xl">
        {!topic ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Select Topic</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topics.map((t) => (
                <button key={t} className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600" onClick={() => setTopic(t)}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        ) : !difficulty ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Select Difficulty</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.keys(difficulties).map((diff) => (
                <button key={diff} className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600" onClick={() => setDifficulty(diff)}>
                  {diff.charAt(0).toUpperCase() + diff.slice(1)}
                </button>
              ))}
            </div>
          </div>
        ) : !mode ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Select Mode</h2>
            <div className="flex gap-4 justify-center">
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600" onClick={() => setMode("question-timer")}>Timer per Question</button>
              <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600" onClick={() => setMode("total-timer")}>Total Time Quiz</button>
            </div>
          </div>
        ) : quizCompleted ? (
          <div>
            <h2 className="text-2xl font-bold">Quiz Completed!</h2>
            <p className="text-lg mt-4">Your Score: {score} / {questions.length}</p>
            <table className="mt-4 w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Question</th>
                  <th className="border p-2">Your Answer</th>
                  <th className="border p-2">Correct Answer</th>

                  <th className="border p-2">Time Used</th>
                </tr>
              </thead>
              <tbody>
                {questionTimes.map((entry, index) => (
                  <tr key={index} className="border">
                    <td className="border p-2">{entry.question}</td>
                    <td className={`border p-2 ${entry.selected === entry.correct ? 'text-green-500' : 'text-red-500'}`}>{entry.selected}</td>
                    <td className="border p-2 text-green-500 font-bold">{entry.correct}</td>

                    <td className="border p-2">{entry.timeUsed}s</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600" onClick={() => {
              setTopic(null);
              setDifficulty(null);
              setMode(null);
              setQuizCompleted(false);
              setScore(0);
              setCurrentQuestion(0);
              setQuestions([]);
              setTimeLeft(60);
              setTotalTime(0);
              setQuestionTimes([]);
            }}>Choose New Topic</button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold">{topic} Quiz - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</h2>
            <p className="text-lg text-red-500 mt-2">{mode === "question-timer" ? `Time Left: ${timeLeft}s` : `Total Time Left: ${totalTime}s`}</p>
            {questions.length > 0 && questions[currentQuestion] ? (
              <>
                <h3 className="font-semibold">{questions[currentQuestion].question}</h3>
                {questions[currentQuestion].options.map((option, i) => (
                  <button key={i} className={`block w-full text-left px-4 py-2 border rounded-lg ${selectedOption === option ? "bg-green-300" : "bg-white"}`} onClick={() => setSelectedOption(option)}>
                    {option}
                  </button>
                ))}
              </>
            ) : (
              <h3 className="font-semibold text-red-500">No question available</h3>
            )}
            <button className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600" onClick={handleAnswer} disabled={!selectedOption}>Next</button>
          </div>
        )}
      </div>
    </div>
  );
}
