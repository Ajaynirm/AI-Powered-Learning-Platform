import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios.js";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "../../store/AuthStore.js";

export default function QuizResult({
  topic,
  difficulty,
  score,
  questions,
  questionTimes,
}) {
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState("");
  const [result, setResult] = useState(null); //
  const { authUser } = useAuthStore();

  useEffect(() => {
    const generateReport = async () => {
      console.log(topic, difficulty, score, questions);
      try {
        setLoading(true);
        setUpdate("AI Generating Report ...");
        const res = await axiosInstance.post("/report/generate-report", {
          topic,
          questions,
          totalMarks: questions.length,
          score,
          questionTimes,
          difficulty,
        });

        let data = res.data.report;
        console.log(data);
        // If it's a string, convert it to JSON
        if (typeof data === "string") {
          try {
            data = JSON.parse(data);
            console.log(data);
          } catch (e) {
            console.error("Invalid JSON from AI:", e);
          }
        }
        setResult(data);

        setUpdate("Report Generated Successfully ");
      } catch (err) {
        setUpdate("Report Generating Failed");
      } finally {
        setLoading(false);
      }
    };
    generateReport();
  }, []);

  // useEffect(() => {
  //   const saveReport = async () => {
  //     try {
  //       await axiosInstance.post("/report/send-report", {
  //         id: authUser.id,
  //         report: result,
  //         topic,
  //         score,
  //         difficulty,
  //         totalMarks: questions.length,
  //       });
  //       console.log("Report saved successfully");
  //     } catch (err) {
  //       console.error("Failed to save report", err);
  //     }
  //   };

  //   if (authUser && result) {
  //     saveReport();
  //   }
  // }, [authUser, result]);



  return (
    <div className="flex flex-col gap-10 p-4 sm:p-6 rounded shadow">
      {/* ✅ Responsive Table */}
      <div className="overflow-x-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
          Quiz Completed!
        </h2>

        <p className="text-base sm:text-lg font-semibold mb-4 text-center sm:text-left">
          Score: {score} / {questions.length}
        </p>
        <table className="min-w-full border text-sm sm:text-base mb-6">
          <thead>
            <tr>
              <th className="border p-2">Question</th>
              <th className="border p-2">Your Answer</th>
              <th className="border p-2">Correct</th>
              <th className="border p-2">Time Used (s)</th>
            </tr>
          </thead>
          <tbody>
            {questionTimes.map((q, idx) => (
              <tr key={idx}>
                <td className="border p-2">{q.question}</td>
                <td
                  className={`border p-2 ${
                    q.selected === q.correct ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {q.selected}
                </td>
                <td className="border p-2 font-bold text-green-600">
                  {q.correct}
                </td>
                <td className="border p-2">{q.timeUsed}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="text-sm sm:text-base">{update}</div>
          <Loader2 className="size-8 sm:size-10 animate-spin" />
        </div>
      ) : (
        result && (
          <div className="w-full max-w-xl mx-auto mt-4">
            <div className=" shadow-lg rounded-2xl p-6 space-y-4 border border-gray-100">
              {/* Header */}
              <h2 className="text-2xl font-bold text-blue-400 text-center animate-pulse">
                📘 AI Report
              </h2>

              {/* Learner Type Badge */}
              <div className="flex justify-center">
                <span className="px-4 py-1 rounded-full text-sm font-medium border-2 p-2 m-2">
                  {result.learnerType}
                </span>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3  rounded-lg border">
                  <p className="font-semibold ">Test Accuracy</p>
                  <p className=" text-lg font-bold">{result.testAccuracy}%</p>
                </div>

                <div className="p-3  rounded-lg border">
                  <p className="font-semibold ">Difficulty Level</p>
                  <p className=" text-lg font-bold">{result.difficultyLevel}</p>
                </div>
              </div>

              {/* Performance Summary */}
              <div className="p-4  border-2  rounded">
                <h3 className="font-bold text-blue-400 mb-1">
                  📊 Performance Summary
                </h3>
                <p className="">{result.performanceSummary}</p>
              </div>

              {/* Strengths */}
              {result.strengths && (
                <div className="p-4  border-2  rounded">
                  <h3 className="font-bold text-green-400 mb-1">
                    💪 Strengths
                  </h3>
                  <p className="">{result.strengths}</p>
                </div>
              )}

              {/* Weaknesses */}
              {result.weaknesses && (
                <div className="p-4  border-2 rounded">
                  <h3 className="font-bold text-red-400 mb-1">⚠️ Weaknesses</h3>
                  <p className="">
                    {result.weaknesses.length == 0
                      ? "No Weakness"
                      : result.weaknesses}
                  </p>
                </div>
              )}

              {/* Topic Recommendations */}
              {result.topicRecommendations && (
                <div className="p-4  border-2  rounded">
                  <h3 className="font-bold text-yellow-400 mb-1">
                    📚 Topic-wise Recommendations
                  </h3>
                  <p className="">{result.topicRecommendations}</p>
                </div>
              )}

              {/* Motivation Message */}
              <div className="p-4  border-2  rounded">
                <h3 className="font-bold text-purple-400 mb-1">
                  ✨ Motivation
                </h3>
                <p className=" italic">“{result.motivationMessage}”</p>
              </div>
            </div>
          </div>
        )
      )}
      <div className="flex justify-center items-center">
          <button
            onClick={() => {
              window.location.href = "/quiz";
            }}
            className=" text-blue-400 px-6 sm:px-8 py-2  border-2 animate-bounce border-gray-400  sm:py-3 rounded-lg font-semibold transition duration-300"
          >
            Take New Test
          </button>
        </div>
    </div>
  );
}
