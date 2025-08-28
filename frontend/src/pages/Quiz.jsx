

// import { useState, useEffect } from "react";
// import questionsData from "../questions/jsQuestions.js";
// import axios from "axios";
// import { useAuthStore } from "../store/AuthStore.js";

// export default function Quiz() {
//   const {
//     authUser,
//     questions,
//     topic,
//     difficulty,
//     setDifficulty,
//     setTopic,
//     setQuestions,
//   } = useAuthStore();

//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [score, setScore] = useState(0);
//   const [quizCompleted, setQuizCompleted] = useState(false);
//   const [mode, setMode] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(60);
//   const [totalTime, setTotalTime] = useState(0);
//   const [questionTimes, setQuestionTimes] = useState([]);
//   const [result, setResult] = useState(null);
//   const topics = ["JavaScript", "Java", "Python"];
//   const difficulties = { easy: 60, medium: 120, hard: 180 };
//   useEffect(() => {
//     const saveReport = async () => {
//       try {
//         console.log("Saving report...");
//         const resultString = JSON.stringify(result);

//         const res = await axios.post(
//           "http://localhost:10000/api/report/send-report",
//           {
//             result: resultString,
//             id: authUser.id,
//             topic: topic,
//             score: score,
//             totalMarks: questions.length,
//             difficulty: difficulty,
//           }
//         );
//         console.log("Report saved with status:", res.status);
//       } catch (error) {
//         console.error("Error while storing report in db:", error.message);
//       }
//     };

//     // Only call when result is a valid report object
//     if (result && typeof result === "object") {
//       saveReport();
//     }
//   }, [result]);

//   useEffect(() => {
//     if (quizCompleted) {
//       const generateReport = async () => {
//         try {
//           // console.log(`score: ${score} , question:${questionTimes} , diff:${difficulty}`);
//           const res = await axios.post(
//             "http://localhost:10000/api/report/generate-report",
//             {
//               topic: topic,
//               score: score,
//               queestionTimes: questionTimes,
//               difficulty: difficulty,
//             }
//           );
//           setResult(res.data);
//           console.log(res.data);
//         } catch (error) {
//           setResult("Error while generating report");
//           console.log("error");
//         }
//       };

//       generateReport();
//     }
//   }, [quizCompleted]);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         console.log(1)
//         const res = await axios.get(`http://localhost:10000/api/questions/${topic}/${difficulty}`);
//        console.log(res.data)
//         // If res.data.questions is already a parsed array, skip JSON.parse
//         const quizData = res.data.questions
        
//         console.log(quizData)
//         setQuestions(quizData || []);
//         setTotalTime(60);
//         setTimeLeft(60);
//       } catch (err) {
//         console.error("Failed to load questions:", err.message);
//       }
//     };
  
//     if (topic && difficulty && mode) {
//       fetchQuestions();
//     }
//   }, [topic, difficulty, mode]);
  
//   useEffect(() => {
//     if (
//       (mode === "question-timer" && timeLeft === 0) ||
//       (mode === "total-timer" && totalTime === 0)
//     ) {
//       handleAnswer();
//     }
//     const timer = setInterval(() => {
//       if (mode === "question-timer") {
//         setTimeLeft((prev) => Math.max(prev - 1, 0));
//       } else if (mode === "total-timer") {
//         setTotalTime((prev) => Math.max(prev - 1, 0));
//       }
//     }, 1000);
//     return () => clearInterval(timer);
//   }, [timeLeft, totalTime, mode]);

//   const handleAnswer = () => {
//     if (!questions[currentQuestion]) return; // Prevent undefined access

//     setQuestionTimes([
//       ...questionTimes,
//       {
//         question: questions[currentQuestion]?.question || "N/A",
//         selected: selectedOption || "No Answer",
//         correct: questions[currentQuestion]?.answer || "N/A",
//         timeUsed: 60 - timeLeft,
//       },
//     ]);

//     if (selectedOption === questions[currentQuestion]?.answer) {
//       setScore(score + 1);
//     }

//     if (currentQuestion + 1 < questions.length) {
//       setCurrentQuestion(currentQuestion + 1);
//       setSelectedOption(null);
//       setTimeLeft(60);
//     } else {
//       setQuizCompleted(true);
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl text-center font-serif md:max-w-6xl">
//         {!topic ? (
//           <div>
//             <h2 className="text-2xl font-bold mb-4">Select Topic</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {topics.map((t) => (
//                 <button
//                   key={t}
//                   className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600"
//                   onClick={() => setTopic(t)}
//                 >
//                   {t}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ) : !difficulty ? (
//           <div>
//             <h2 className="text-2xl font-bold mb-4">Select Difficulty</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {Object.keys(difficulties).map((diff) => (
//                 <button
//                   key={diff}
//                   className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600"
//                   onClick={() => setDifficulty(diff)}
//                 >
//                   {diff.charAt(0).toUpperCase() + diff.slice(1)}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ) : !mode ? (
//           <div>
//             <h2 className="text-2xl font-bold mb-4">Select Mode</h2>
//             <div className="flex gap-4 justify-center">
//               <button
//                 className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600"
//                 onClick={() => setMode("question-timer")}
//               >
//                 Timer per Question
//               </button>
//               <button
//                 className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600"
//                 onClick={() => setMode("total-timer")}
//               >
//                 Total Time Quiz
//               </button>
//             </div>
//           </div>
//         ) : quizCompleted ? (
//           <div>
//             <h2 className="text-2xl font-bold">Quiz Completed!</h2>
//             <p className="text-lg mt-4">
//               Your Score: {score} / {questions.length}
//             </p>
//             <table className="mt-4 w-full border-collapse border border-gray-300">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="border p-2">Question</th>
//                   <th className="border p-2">Your Answer</th>
//                   <th className="border p-2">Correct Answer</th>

//                   <th className="border p-2">Time Used</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {questionTimes.map((entry, index) => (
//                   <tr key={index} className="border">
//                     <td className="border p-2">{entry.question}</td>
//                     <td
//                       className={`border p-2 ${
//                         entry.selected === entry.correct
//                           ? "text-green-500"
//                           : "text-red-500"
//                       }`}
//                     >
//                       {entry.selected}
//                     </td>
//                     <td className="border p-2 text-green-500 font-bold">
//                       {entry.correct}
//                     </td>

//                     <td className="border p-2">{entry.timeUsed}s</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <button
//               className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 p-4"
//               onClick={() => {
//                 setTopic(null);
//                 setDifficulty(null);
//                 setMode(null);
//                 setQuizCompleted(false);
//                 setScore(0);
//                 setCurrentQuestion(0);
//                 setQuestions([]);
//                 setTimeLeft(60);
//                 setTotalTime(0);
//                 setQuestionTimes([]);
//                 setResult(null);
//               }}
//             >
//               Choose New Topic
//             </button>
//           </div>
//         ) : (
//           <div>
//             <h2 className="text-2xl font-bold">
//               {topic} Quiz -{" "}
//               {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
//             </h2>
//             <p className="text-lg text-red-500 mt-2">
//               {mode === "question-timer"
//                 ? `Time Left: ${timeLeft}s`
//                 : `Total Time Left: ${totalTime}s`}
//             </p>
//             {questions.length > 0 && questions[currentQuestion] ? (
//               <>
//                 <h3 className="font-semibold">
//                   {questions[currentQuestion].question}
//                 </h3>
//                 {questions[currentQuestion].options.map((option, i) => (
//                   <button
//                     key={i}
//                     className={`block w-full text-left px-4 py-2 border rounded-lg ${
//                       selectedOption === option ? "bg-green-300" : "bg-white"
//                     }`}
//                     onClick={() => setSelectedOption(option)}
//                   >
//                     {option}
//                   </button>
//                 ))}
//               </>
//             ) : (
//               <h3 className="font-semibold text-red-500">
//                 No question available
//               </h3>
//             )}
//             <button
//               className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600"
//               onClick={handleAnswer}
//               disabled={!selectedOption}
//             >
//               Next
//             </button>
//           </div>
//         )}
//         {quizCompleted && result === null ? (
//           <div>Loading...</div>
//         ) : (
//           <div className="space-y-4 text-left">
//             {result?.report
//               ?.split(/\d+\.\s*/) // Split by numbered sections
//               .filter(Boolean)
//               .map((section, index) => {
//                 const [title, ...rest] = section.trim().split(":");
//                 return (
//                   <div key={index} className="border p-4 rounded bg-gray-100">
//                     <div className="font-bold text-blue-700 mb-1">
//                       {title?.replace(/\*\*/g, "").trim()}
//                     </div>
//                     <div className="text-gray-700">
//                       {rest.join(":").replace(/\*\*/g, "").trim()}
//                     </div>
//                   </div>
//                 );
//               })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }





import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "../store/AuthStore.js";
import { Loader2 } from "lucide-react";

export default function Quiz() {
  const {
    authUser,
    topic,
    difficulty,
    setDifficulty,
    setTopic,
    
  } = useAuthStore();
  const [questions,setQuestions]=useState([]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [mode, setMode] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [totalTime, setTotalTime] = useState(0);
  const [questionTimes, setQuestionTimes] = useState([]);
  const [result, setResult] = useState(null);
  const topics = ["JavaScript", "Java", "Python", "TypeScript","React","Boot Strap","Tailwind CSS","CSS","HTML","Angular",
    "Spring","Spring Boot","JQuery","Vue","Computer Networls","Operating system","OOPS","DBMS"
  ];
  const difficulties = { easy: 60, medium: 120, hard: 180 };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`http://localhost:10000/api/questions/${topic}/${difficulty}`);
        console.log(res)

        setQuestions(res.data.questions || []);
        console.log(questions)
        setTotalTime(difficulties[difficulty]);
        setTimeLeft(60);
      } catch (err) {
        console.error("Failed to load questions:", err.message);
      }
    };
  
    if (topic && difficulty && mode) {
      fetchQuestions(); 
    }
  }, [topic, difficulty, mode]);
  

  useEffect(() => {
    if (
      (mode === "question-timer" && timeLeft === 0) ||
      (mode === "total-timer" && totalTime === 0)
    ) {
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
    const current = questions[currentQuestion];

    setQuestionTimes((prev) => [
      ...prev,
      {
        question: current?.question || "N/A",
        selected: selectedOption || "No Answer",
        correct: current?.answer || "N/A",
        timeUsed: 60 - timeLeft,
      },
    ]);

    if (selectedOption === current?.answer) {
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

  useEffect(() => {
    if (quizCompleted) {
      const generateReport = async () => {
        try {
          const res = await axios.post(
            "http://localhost:10000/api/report/generate-report",
            {
              topic,
              score,
              queestionTimes: questionTimes,
              difficulty,
            }
          );
          setResult(res.data);
        } catch (error) {
          setResult("Error while generating report");
        }finally{

        }
      };

      generateReport();
    }
  }, [quizCompleted]);

  useEffect(() => {
    const saveReport = async () => {
      try {
        const resultString = JSON.stringify(result);
        await axios.post("http://localhost:10000/api/report/send-report", {
          result: resultString,
          id: authUser.id,
          topic,
          score,
          totalMarks: questions.length,
          difficulty,
        });
      } catch (error) {
        console.error("Error while storing report in db:", error.message);
      }
    };

    if (result && typeof result === "object") {
      saveReport();
    }
  }, [result]);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl text-center font-serif md:max-w-6xl">
        {!topic ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Select Topic</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topics.map((t) => (
                <button
                  key={t}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8  shadow-xl text-center hover:animate-bounce hover:duration-75 "
                  onClick={() => setTopic(t)}
                >
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
                <button
                  key={diff}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8  shadow-xl text-center hover:animate-bounce hover:duration-75 "
                  onClick={() => setDifficulty(diff)}
                >
                  {diff.charAt(0).toUpperCase() + diff.slice(1)}
                </button>
              ))}
            </div>
          </div>
        ) : !mode ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Select Mode</h2>
            <div className="flex gap-4 justify-center">
              <button
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8  shadow-xl text-center hover:animate-bounce hover:duration-75 "
                onClick={() => setMode("question-timer")}
              >
                Timer per Question
              </button>
              <button
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8  shadow-xl text-center hover:animate-pulse"
                onClick={() => setMode("total-timer")}
              >
                Total Time Quiz
              </button>
            </div>
          </div>
        ) : quizCompleted ? (
          <div>
            <h2 className="text-2xl font-bold">Quiz Completed!</h2>
            <p className="text-lg mt-4">
              Your Score: {score} / {questions.length}
            </p>
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
                    <td
                      className={`border p-2 ${
                        entry.selected === entry.correct
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {entry.selected}
                    </td>
                    <td className="border p-2 text-green-500 font-bold">
                      {entry.correct}
                    </td>
                    <td className="border p-2">{entry.timeUsed}s</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 p-4"
              onClick={() => {
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
                setResult(null);
              }}
            >
              Choose New Topic
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold">
              {topic} Quiz -{" "}
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </h2>
            <p className="text-lg text-red-500 mt-2">
              {mode === "question-timer"
                ? `Time Left: ${timeLeft}s`
                : `Total Time Left: ${totalTime}s`}
            </p>
            {questions.length > 0 && questions[currentQuestion] ? (
              <>
                <h3 className="font-semibold mb-4">
                  {questions[currentQuestion].question}
                </h3>
                {Object.entries(questions[currentQuestion].options).map(
                  ([key, value]) => (
                    <button
                      key={key}
                      className={`block w-full text-left px-4 py-2 border rounded-lg mb-2 ${
                        selectedOption === key
                          ? "bg-green-300"
                          : "bg-white hover:bg-gray-100"
                      }`}
                      onClick={() => setSelectedOption(key)}
                    >
                      <strong>{key}.</strong> {value}
                    </button>
                  )
                )}
              </>
            ) : (
              <h3 className="font-semibold ">
                <div className="flex items-center justify-center m-5">
          <Loader2 className="size-10 animate-spin" />
      </div>
      
           
              </h3>
            )}
            <button
              className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600"
              onClick={handleAnswer}
              disabled={!selectedOption}
            >
              Next
            </button>
          </div>
        )}
        {quizCompleted && result === null ? (
          
          <div className="flex items-center justify-center m-5">
          <Loader2 className="size-10 animate-spin" />
      </div>
          
        ) : (
          <div className="space-y-4 text-left mt-6">
            {result?.report
              ?.split(/\d+\.\s*/)
              .filter(Boolean)
              .map((section, index) => {
                const [title, ...rest] = section.trim().split(":");
                return (
                  <div key={index} className="border p-4 rounded bg-gray-100">
                    <div className="font-bold text-blue-700 mb-1">
                      {title?.replace(/\*\*/g, "").trim()}
                    </div>
                    <div className="text-gray-700">
                      {rest.join(":").replace(/\*\*/g, "").trim()}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}








// import { useState } from "react";
// import { useFetchQuestions } from "../hooks/useFetchQuestions";
// import { useQuizTimer } from "../hooks/useQuizTimer";
// import QuizControls from "../components/QuizControls";
// import QuizQuestion from "../components/QuizQuestion";
// import QuizResult from "../components/QuizResult";
// import { generateReport, sendReport } from "../services/reportService";

// export default function Quiz() {
//   const [topic, setTopic] = useState(null);
//   const [difficulty, setDifficulty] = useState(null);
//   const [mode, setMode] = useState(null);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [score, setScore] = useState(0);
//   const [questionTimes, setQuestionTimes] = useState([]);
//   const [quizCompleted, setQuizCompleted] = useState(false);
//   const [result, setResult] = useState(null);

//   const [timeLeft, setTimeLeft] = useState(60);
//   const [totalTime, setTotalTime] = useState(0);
//   const difficulties = { easy: 60, medium: 120, hard: 180 };

//   const { questions, loading } = useFetchQuestions(topic, difficulty);

//   useQuizTimer(
//     mode,
//     timeLeft,
//     setTimeLeft,
//     totalTime,
//     setTotalTime,
//     () => handleAnswer()
//   );

//   const handleAnswer = () => {
//     const current = questions[currentQuestion];
//     setQuestionTimes([
//       ...questionTimes,
//       {
//         question: current?.question,
//         selected: selectedOption,
//         correct: current?.answer,
//         timeUsed: difficulties[difficulty] - timeLeft,
//       },
//     ]);

//     if (selectedOption === current?.answer) {
//       setScore((s) => s + 1);
//     }

//     if (currentQuestion + 1 < questions.length) {
//       setCurrentQuestion((q) => q + 1);
//       setSelectedOption(null);
//       setTimeLeft(difficulties[difficulty]);
//     } else {
//       setQuizCompleted(true);
//       generateReport({
//         topic,
//         score,
//         questionTimes,
//         difficulty,
//       }).then((res) => setResult(res.data));
//     }
//   };

//   return (
//     <div className="p-4">
//       <QuizControls {...{ topic, setTopic, difficulty, setDifficulty, mode, setMode }} />
//       {loading && <p>Loading questions...</p>}
//       {quizCompleted ? (
//         <QuizResult {...{ score, questions, questionTimes, result }} />
//       ) : (
//         <QuizQuestion
//           {...{
//             question: questions[currentQuestion],
//             selectedOption,
//             setSelectedOption,
//             handleAnswer,
//             timeLeft,
//             totalTime,
//             mode,
//           }}
//         />
//       )}
//     </div>
//   );
// }
