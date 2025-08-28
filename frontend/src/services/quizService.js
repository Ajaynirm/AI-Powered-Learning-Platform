//Quiz API calls

import axios from "axios";

export const fetchQuestions = async (topic, difficulty) => {
  return axios.get("/api/questions", {
    params: { topic, difficulty },
  });
};
