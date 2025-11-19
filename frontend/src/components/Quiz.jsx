import { useState } from "react";
import SelectTopic from "./quiz/SelectTopic.jsx";
import SelectDifficulty from "./quiz/SelectDifficulty.jsx";

import QuestionPage from "./quiz/QuestionPage.jsx";
import QuizResult from "./quiz/QuizResult.jsx";
import { useAuthStore } from "../store/AuthStore.js";
// import SelectMode from "./quiz/SelectMode.jsx";

export default function Quiz() {
  const { topic, difficulty, setTopic, setDifficulty} =
    useAuthStore();

  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [questionTimes, setQuestionTimes] = useState([]);
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen flex  justify-center pb-2">
      <div className=" p-6 rounded-lg shadow-lg w-full max-w-4xl text-center font-serif md:max-w-6xl">
        {!topic && <SelectTopic setTopic={setTopic} />}

        {topic && !difficulty && (
          <SelectDifficulty setDifficulty={setDifficulty} />
        )}

        {/* {topic && difficulty && !mode && <SelectMode setMode={setMode} />} */}

        {topic && difficulty && !quizCompleted && (
          <QuestionPage
            topic={topic}
            difficulty={difficulty}
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
