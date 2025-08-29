import React from "react";

const topics = [
  "JavaScript",
  "Java",
  "Python",
  "TypeScript",
  "React",
  "Bootstrap",
  "Tailwind CSS",
  "CSS",
  "HTML",
  "Angular",
  "Spring",
  "Spring Boot",
  "jQuery",
  "Vue",
  "Computer Networks",
  "Operating System",
  "OOPS",
  "DBMS",
];

export default function SelectTopic({ setTopic }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Select Topic</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topics.map((topic) => (
          <button
            key={topic}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 shadow-xl hover:animate-pulse hover:duration-75"
            onClick={() => setTopic(topic)}
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
}
