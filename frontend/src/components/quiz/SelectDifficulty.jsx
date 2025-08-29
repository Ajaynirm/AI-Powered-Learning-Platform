import React from "react";

const difficulties = {
  easy: 60,
  medium: 120,
  hard: 180,
};

export default function SelectDifficulty({ setDifficulty }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Select Difficulty</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.keys(difficulties).map((diff) => (
          <button
            key={diff}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 shadow-xl hover:bg-blue-900"
            onClick={() => setDifficulty(diff)}
          >
            {diff.charAt(0).toUpperCase() + diff.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
