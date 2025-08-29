import { useState } from "react";
import SelectTopic from "./quiz/SelectTopic.jsx";
import SelectDifficulty from "./quiz/SelectDifficulty.jsx";
import SelectMode from "./quiz/SelectMode.jsx";
import QuestionPage from "./quiz/QuestionPage.jsx";
import QuizResult from "./quiz/QuizResult.jsx";
import { useAuthStore } from "../store/AuthStore.js";

export default function Quiz() {
  const { topic, difficulty, mode, setTopic, setDifficulty, setMode } =
    useAuthStore();

  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [questionTimes, setQuestionTimes] = useState([]);
  const [result, setResult] = useState(null);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl text-center font-serif md:max-w-6xl">
        {!topic && <SelectTopic setTopic={setTopic} />}

        {topic && !difficulty && (
          <SelectDifficulty setDifficulty={setDifficulty} />
        )}

        {topic && difficulty && !mode && <SelectMode setMode={setMode} />}

        {topic && difficulty && mode && !quizCompleted && (
          <QuestionPage
            topic={topic}
            difficulty={difficulty}
            mode={mode}
            questions={questions}
            setQuestions={setQuestions}
            score={score}
            setScore={setScore}
            questionTimes={questionTimes}
            setQuestionTimes={setQuestionTimes}
            setQuizCompleted={setQuizCompleted}
          />
        )}

        {quizCompleted && (
          <QuizResult
            score={score}
            questions={questions}
            questionTimes={questionTimes}
            topic={topic}
            difficulty={difficulty}
            resetQuiz={() => {
              setTopic(null);
              setDifficulty(null);
              setMode(null);
              setQuizCompleted(false);
              setScore(0);
              setQuestions([]);
              setQuestionTimes([]);
              setResult(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
