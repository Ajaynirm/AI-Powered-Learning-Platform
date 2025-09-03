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
  const [result, setResult] = useState(null);
  const {authUser} =useAuthStore();

  useEffect(() => {
    const generateReport = async () => {
      console.log(topic,difficulty,score,questions)
      try {
        setLoading(true);
        setUpdate("AI Generating Report ...");
        const res = await axiosInstance.post("/report/generate-report", {
          topic,
          questions,
          score,
          questionTimes,
          difficulty,
        });
        setResult(res.data);
        setUpdate("Report Generated Successfully ");
      } catch (err) {
        setUpdate("Report Generating Failed");
      } finally {
        setLoading(false);
      }
    };
    generateReport();
  }, []);

  useEffect(() => {
    const saveReport = async () => {
      try {
        await axiosInstance.post("/report/send-report", {
          id: authUser.id, 
          report: result,
          topic,
          score,
          difficulty,
          totalMarks: questions.length
        });
        console.log("Report saved successfully");
      } catch (err) {
        console.error("Failed to save report", err);
      }
    };
  
    if (authUser && result) {
      saveReport();
    }
  }, [authUser, result]);


  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 rounded shadow">
    <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
      Quiz Completed!
    </h2>
  
    <p className="text-base sm:text-lg font-semibold mb-4 text-center sm:text-left">
      Score: {score} / {questions.length}
    </p>
  
    {/* ✅ Responsive Table */}
    <div className="overflow-x-auto">
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
      result?.report && (
        <div className="flex flex-col justify-center items-center border rounded p-3 sm:p-4 space-y-2">
          <div className="text-sm sm:text-base">{update}</div>
          {result.report
            .split(/\d+\.\s*/)
            .filter(Boolean)
            .map((section, index) => {
              const [title, ...content] = section.trim().split(":");
              return (
                <div key={index}>
                  <div className="font-bold text-blue-500">
                    {title?.replace(/\*\*/g, "")}
                  </div>
                  <div className="text-gray-300 text-sm sm:text-base">
                    {content.join(":").replace(/\*\*/g, "")}
                  </div>
                </div>
              );
            })}
          <div className="flex justify-center items-center">
            <button
              onClick={()=>{window.location.href = "/quiz"}}
              className="bg-white text-blue-600 px-6 sm:px-8 py-2 mt-10  sm:py-3 rounded-lg font-semibold hover:bg-gray-200 transition duration-300"
            >
              Take New Test
            </button>
          </div>
        </div>
      )
    )}
  </div>
  
  );
}



