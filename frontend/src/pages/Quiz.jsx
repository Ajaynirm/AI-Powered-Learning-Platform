import { useState } from "react";

export default function Quiz() {
  const questions = [
    {
      id: 1,
      question: "What does AI stand for?",
      options: ["Artificial Intelligence", "Automated Interface", "Advanced Internet", "Augmented Information"],
      answer: "Artificial Intelligence",
    },
    {
      id: 2,
      question: "Which language is commonly used for Machine Learning?",
      options: ["Java", "Python", "C++", "Ruby"],
      answer: "Python",
    },
    {
      id: 3,
      question: "What is the main purpose of an AI-powered chatbot?",
      options: ["Playing music", "Answering queries", "Sending emails", "Writing code"],
      answer: "Answering queries",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswer = () => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setQuizCompleted(true);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full text-center">
        {quizCompleted ? (
          <div>
            <h2 className="text-2xl font-bold">Quiz Completed!</h2>
            <p className="text-lg mt-4">Your Score: {score} / {questions.length}</p>
            <button
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600"
              onClick={() => {
                setCurrentQuestion(0);
                setScore(0);
                setQuizCompleted(false);
              }}
            >
              Restart Quiz
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold">{questions[currentQuestion].question}</h2>
            <div className="mt-4 text-left">
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="mb-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="option"
                      value={option}
                      checked={selectedOption === option}
                      onChange={() => setSelectedOption(option)}
                      className="w-4 h-4"
                    />
                    <span>{option}</span>
                  </label>
                </div>
              ))}
            </div>
            <button
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600"
              onClick={handleAnswer}
              disabled={!selectedOption}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
