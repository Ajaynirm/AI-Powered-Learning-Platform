import React, { useState } from "react";

export default function SelectTopic({ setTopic }) {
  const [topics, setTopics] = useState([
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
  ]);

  const [query, setQuery] = useState("");

  const filteredTopics = topics.filter((topic) =>
    topic.toLowerCase().includes(query.toLowerCase())
  );

  const handleAddTopic = () => {
    const newTopic = query.trim();

    if (!newTopic) return;

    // Check if it already exists
    if (topics.some((t) => t.toLowerCase() === newTopic.toLowerCase())) return;

    setTopics((prev) => [newTopic, ...prev]); // add to top
    setTopic(newTopic); // auto select new topic
    setQuery(""); // clear search box
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Select Topic</h2>

      {/* Search Bar */}
      <div className="flex items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Search or add a topic..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Add Button Appears ONLY when topic not found */}
        {query.trim() !== "" &&
          !topics.some(
            (t) => t.toLowerCase() === query.trim().toLowerCase()
          ) && (
            <button
              onClick={handleAddTopic}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Generate
            </button>
          )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredTopics.length === 0 && (
          <p className="text-gray-600 col-span-3">No topics found</p>
        )}

        {filteredTopics.map((topic) => (
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

