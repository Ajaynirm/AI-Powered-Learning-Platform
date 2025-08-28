// components/QuizResult.jsx
import { useAuthStore } from "../store/AuthStore.js";
export default function QuizResult({ score, questions, questionTimes, result }) {
    return (
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
        <p className="text-lg font-semibold mb-4">
          Score: {score} / {questions.length}
        </p>
        <table className="w-full border border-gray-300 mb-6">
          <thead>
            <tr className="bg-gray-100">
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
                <td className={`border p-2 ${q.selected === q.correct ? "text-green-600" : "text-red-500"}`}>
                  {q.selected}
                </td>
                <td className="border p-2 font-bold text-green-600">{q.correct}</td>
                <td className="border p-2">{q.timeUsed}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {result?.report && (
          <div className="bg-gray-50 border rounded p-4 space-y-2">
            {result.report
              .split(/\d+\.\s*/)
              .filter(Boolean)
              .map((section, index) => {
                const [title, ...content] = section.trim().split(":");
                return (
                  <div key={index}>
                    <div className="font-bold text-blue-700">
                      {title?.replace(/\*\*/g, "")}
                    </div>
                    <div className="text-gray-700">{content.join(":").replace(/\*\*/g, "")}</div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    );
  }
  