import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore.js";
import React, { useEffect, useState } from "react";

import axios from "axios";
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
    date: new Date(test.dateTaken).toLocaleDateString(),
  }));

  const handleReportClick = async (testId) => {
    if (openDropdown === testId) {
      setOpenDropdown(null);
    } else {
      if (!detailedReports[testId]) {
        try {
          const res = await axiosInstance.get(
            `/${testId}}`
          );
          setDetailedReports((prev) => ({ ...prev, [testId]: res.data }));
          console.log(detailedReports);
        } catch (error) {
          console.error("Error fetching detailed report:", error);
        }
      }
      setOpenDropdown(testId);
    }
  };

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const res = await axiosInstance.get(
          `/${authUser.id}`
        );
        setTestData(res.data);
        setTotalTest(res.data.length);
      } catch (err) {
        console.error("Error fetching test data:", err);
        setError("Failed to load test data");
      } finally {
        setLoading(false);
      }
    };

    fetchTestData();
  }, []);
  // useEffect(() => {
  //   const fetchReport = async () => {
  //     try {
  //       const res = await axios.get(
  //         `/${testId}`
  //       );
  //       setTestData(res.data);
  //     } catch (error) {
  //       console.error("Error fetching test data:", error);
  //     }
  //   };

  //   fetchReport();
  // }, []);

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;
  if (!authUser) {
    return (
      <div className="flex flex-col">
        <div className="flex flex-row justify-center p-10 m-5 font-extrabold font-stretch-90% btn h-10">
          Login to see Dashboard
        </div>
        <button
          className="flex flex-row justify-center p-10 m-10 "
          onClick={() => navigate("/login")}
        >
          Go to Login
        </button>
      </div>
    );
  } else {
    return (
      <div className="bg-gray-100 min-h-screen p-6">
        {/* Dashboard Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-2xl shadow-xl text-center animate-fade-in">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Welcome to Your Dashboard
          </h1>
          <p className="text-lg mt-3 opacity-90">
            Track your progress and manage your learning journey effortlessly.
          </p>
        </div>

        {/* Stats Section */}
        <div className="max-w-5xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 text-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-1">
              Tests Taken
            </h2>
            <p className="text-3xl font-bold text-blue-600">{totalTest}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 text-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-1">
              Tests Completed
            </h2>
            <p className="text-3xl font-bold text-green-500">{totalTest}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 text-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-1">
              Overall Progress
            </h2>
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
        <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Test Summary</h2>
            <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
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
                        className="px-4 py-3 text-left text-sm font-semibold text-gray-700"
                      >
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {testData.map((test, index) => (
                    <React.Fragment key={test.id}>
                      <tr className="hover:bg-gray-50 transition">
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
                          <td colSpan="8" className="px-4 py-4 bg-gray-50">
                            <div className="space-y-2">
                              {detailedReports[test.id]?.length > 0 ? (
                                (() => {
                                  const parsed = JSON.parse(
                                    detailedReports[test.id][0].result
                                  );
                                  return parsed?.report
                                    ?.split(/\d+\.\s*/)
                                    .filter(Boolean)
                                    .map((section, idx) => {
                                      const [title, ...rest] =
                                        section.split(":");
                                      return (
                                        <div
                                          key={idx}
                                          className="bg-white border border-gray-200 rounded-md p-4 shadow-sm"
                                        >
                                          <div className="font-semibold text-blue-700 mb-1">
                                            {title
                                              ?.replace(/\*\*/g, "")
                                              .trim() || "Untitled"}
                                          </div>
                                          <div className="text-gray-700 text-sm whitespace-pre-wrap">
                                            {rest
                                              .join(":")
                                              .replace(/\*\*/g, "")
                                              .trim()}
                                          </div>
                                        </div>
                                      );
                                    });
                                })()
                              ) : (
                                <p className="text-sm text-red-500">
                                  No report found
                                </p>
                              )}
                            </div>
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
