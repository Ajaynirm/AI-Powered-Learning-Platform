import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../store/AuthStore.js";

export function useFetchQuestions(topic, difficulty) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchQuestions = async () => {
  //     if (!topic || !difficulty) return;
  //     setLoading(true);
  //     try {
  //       const res = await axios.get(`http://localhost:10000/api/questions`, {
  //         params: { topic, difficulty },
  //       });
  //       const quizData = JSON.parse(res.data.questions);
  //       setQuestions(quizData || []);
  //     } catch (err) {
  //       console.error("Failed to load questions:", err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchQuestions();
  // }, [topic, difficulty]);

  return { questions, loading };
}
