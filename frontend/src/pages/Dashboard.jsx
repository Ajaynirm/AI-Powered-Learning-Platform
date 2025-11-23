import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore.js";
import React, { useEffect, useState } from "react";

import {
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { axiosInstance } from "../lib/axios.js";

export default function Dashboard() {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();
  const [totalTest, setTotalTest] = useState(0);
  const [testId, setTestId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [testData, setTestData] = useState([]);

  const [openDropdown, setOpenDropdown] = useState(null);
  const [detailedReports, setDetailedReports] = useState({});

  const formattedData = testData.map((test, index) => ({
    name: `${test.testName} #${test.id}`,
    score: parseFloat(test.score),
    totalMarks: parseFloat(test.totalMarks || 0),
    difficulty: test.difficulty,
    date: new Date(test.dateTaken).toLocaleDateString().substring(3),
  }));

  const handleReportClick = async (testId) => {
    if (openDropdown === testId) {
      setOpenDropdown(null);
    } else {
      if (!detailedReports[testId]) {
        setLoading(true);

        try {
          const res = await axiosInstance.get(
            `/report/get-test-report/${testId}}`
          );

          setDetailedReports((prev) => ({ ...prev, [testId]: res.data }));
      
        } catch (error) {
          console.error("Error fetching detailed report:", error);
        }
        finally{
          setLoading(false);
        }
      }

      setOpenDropdown(testId);
    }
  };

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const res = await axiosInstance.get(
          `/report/get-user-test-data`
        );
        setTestData(res.data);
        setTotalTest(res.data.length);
      } catch (err) {
        console.error("Error fetching test data1:", err);
        setError("Failed to load test data");
      } finally {
        setLoading(false);
      }
    };

    fetchTestData();
  }, []);


  if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;
  if (!authUser) {
    return (
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-neutral-900 dark:to-neutral-800 p-4">
      <div className="bg-white dark:bg-neutral-800/90 backdrop-blur-md shadow-xl rounded-2xl p-8 sm:p-12 max-w-md w-full text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 dark:text-gray-100">
          Login to access your Dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
          You need to be signed in to view your personalized dashboard, track progress, and manage your account.
        </p>

        <button
          onClick={() => navigate("/auth/sign-in")}
          className="w-full sm:w-auto px-6 py-3 sm:px-10 sm:py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-xl transition-all text-sm sm:text-base"
        >
          Go to Login 
        </button>
      </div>
    </div>

    );
  } else {
    return (
      <div className=" min-h-screen p-6">
        {/* Dashboard Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-2xl shadow-xl text-center animate-fade-in">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Welcome to Your Dashboard
            <span className="text-red-400 pl-5">{authUser?.firstName}</span>
          </h1>
          <p className="text-lg mt-3 opacity-90">
            Track your progress and manage your learning journey effortlessly.
          </p>
        </div>

        {/* Stats Section */}
        <div className="max-w-5xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className=" p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 text-center">
            <h2 className="text-lg font-semibold  mb-1">Tests Taken</h2>
            <p className="text-3xl font-bold text-blue-600">{totalTest}</p>
          </div>
          <div className=" p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 text-center">
            <h2 className="text-lg font-semibold  mb-1">Tests Completed</h2>
            <p className="text-3xl font-bold text-green-500">{totalTest}</p>
          </div>
          <div className=" p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 text-center">
            <h2 className="text-lg font-semibold  mb-1">Overall Progress</h2>
            <p className="text-3xl font-bold text-purple-500">
              {(totalTest / totalTest) * 100}%
            </p>
          </div>
        </div>

        {/* bar chart start */}

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formattedData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#10b981"
              strokeWidth={3} // ✅ Bolder green line
            />
            <Line
              type="monotone"
              dataKey="totalMarks"
              stroke="#3b82f6"
              strokeWidth={3} // ✅ Bolder blue line
            />
          </LineChart>
        </ResponsiveContainer>

        {/* bar end */}

        {/* Recent Activity */}
        <div className="max-w-4xl mx-auto mt-6  p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Test Summary</h2>
            <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
              <table className="min-w-full divide-y ">
                <thead className="">
                  <tr>
                    {[
                      "S.No",
                      "ID",
                      "Test Name",
                      "Difficulty",
                      "Total Marks",
                      "Score",
                      "Date Taken",
                      "View Report",
                    ].map((title, idx) => (
                      <th
                        key={idx}
                        className="px-4 py-3 text-left text-sm font-semibold "
                      >
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y ">
                  {testData.map((test, index) => (
                    <React.Fragment key={test.id}>
                      <tr className="transition">
                        <td className="px-4 py-2 text-sm text-center">
                          {index + 1}
                        </td>
                        <td className="px-4 py-2 text-sm text-center">
                          {test.id}
                        </td>
                        <td className="px-4 py-2 text-sm">{test.testName}</td>
                        <td className="px-4 py-2 text-sm capitalize">
                          {test.difficulty}
                        </td>
                        <td className="px-4 py-2 text-sm text-center">
                          {test.totalMarks}
                        </td>
                        <td className="px-4 py-2 text-sm text-center">
                          {test.score}
                        </td>
                        <td className="px-4 py-2 text-sm text-center">
                          {new Date(test.dateTaken).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 text-sm text-center">
                          <button
                            className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                            onClick={() => handleReportClick(test.id)}
                          >
                            {openDropdown === test.id
                              ? "Hide Report"
                              : "View Report"}
                          </button>
                        </td>
                      </tr>

                      {openDropdown === test.id && (
                        <tr>
                          <td colSpan="8" className="px-4 py-4">
                            {detailedReports[test.id] ? (
                              (() => {
                                // Parse JSON string
                                const parsed = JSON.parse(
                                  detailedReports[test.id].report
                                );

                                return (
                                  <div className="space-y-4">
                                    <div className="p-4 rounded-md shadow-sm">
                                      <div className="font-semibold text-blue-500">
                                        Learner Type
                                      </div>
                                      <div className="">
                                        {parsed.learnerType}
                                      </div>
                                    </div>

                                    <div className="p-4 rounded-md shadow-sm">
                                      <div className="font-semibold text-blue-500">
                                        Test Accuracy
                                      </div>
                                      <div className="">
                                        {parsed.testAccuracy}%
                                      </div>
                                    </div>

                                    <div className="p-4 rounded-md shadow-sm">
                                      <div className="font-semibold text-blue-500">
                                        Difficulty Level
                                      </div>
                                      <div className="">
                                        {parsed.difficultyLevel}
                                      </div>
                                    </div>

                                    <div className="p-4 rounded-md shadow-sm">
                                      <div className="font-semibold text-blue-500">
                                        Performance Summary
                                      </div>
                                      <div className=" whitespace-pre-wrap">
                                        {parsed.performanceSummary}
                                      </div>
                                    </div>

                                    <div className="p-4 rounded-md shadow-sm">
                                      <div className="font-semibold text-blue-500">
                                        Strengths
                                      </div>
                                      <ul className="list-disc ml-5 ">
                                        {parsed.strengths?.map((s, i) => (
                                          <li key={i}>{s}</li>
                                        ))}
                                      </ul>
                                    </div>

                                    <div className="p-4 rounded-md shadow-sm">
                                      <div className="font-semibold text-blue-500">
                                        Weaknesses
                                      </div>
                                      <ul className="list-disc ml-5 ">
                                        {parsed.weaknesses?.map((w, i) => (
                                          <li key={i}>{w}</li>
                                        ))}
                                      </ul>
                                    </div>

                                    <div className="p-4 rounded-md shadow-sm">
                                      <div className="font-semibold text-blue-500">
                                        Recommended Topics
                                      </div>
                                      <ul className="list-disc ml-5 ">
                                        {parsed.topicRecommendations?.map(
                                          (t, i) => (
                                            <li key={i}>{t}</li>
                                          )
                                        )}
                                      </ul>
                                    </div>

                                    <div className="p-4 rounded-md shadow-sm">
                                      <div className="font-semibold text-blue-500">
                                        Motivation Message
                                      </div>
                                      <div className="">
                                        {parsed.motivationMessage}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })()
                            ) : (
                              <p className="text-sm text-red-500">
                                No report found
                              </p>
                            )}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-6">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600"
            onClick={() => {
              navigate("/");
            }}
          >
            Explore App
          </button>
        </div>
      </div>
    );
  }
}
