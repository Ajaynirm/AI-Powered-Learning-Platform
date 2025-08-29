import React from "react";

export default function SelectMode({ setMode }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Select Mode</h2>
      <div className="flex gap-4 justify-center">
        <button
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 shadow-xl hover:bg-blue-900"
          onClick={() => setMode("question-timer")}
        >
          Timer per Question
        </button>
        <button
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 shadow-xl hover:bg-blue-900"
          onClick={() => setMode("total-timer")}
        >
          Total Time Quiz
        </button>
      </div>
    </div>
  );
}


