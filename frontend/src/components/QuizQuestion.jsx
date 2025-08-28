// components/QuizQuestion.jsx
import { useAuthStore } from "../store/AuthStore.js";
export default function QuizQuestion({
    question,
    selectedOption,
    setSelectedOption,
    handleAnswer,
    timeLeft,
    totalTime,
    mode,
  }) {
    if (!question) return <p className="text-red-500">No question available.</p>;
  
    return (
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <div className="mb-2 text-lg text-red-600 font-semibold">
          {mode === "question-timer"
            ? `Time Left: ${timeLeft}s`
            : `Total Time Left: ${totalTime}s`}
        </div>
        <h3 className="font-bold text-xl mb-4">{question.question}</h3>
        <div className="space-y-2">
          {question.options.map((option, i) => (
            <button
              key={i}
              onClick={() => setSelectedOption(option)}
              className={`w-full px-4 py-2 border rounded-lg text-left ${
                selectedOption === option ? "bg-green-200" : "bg-gray-100"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        <button
          onClick={handleAnswer}
          disabled={!selectedOption}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    );
  }
  