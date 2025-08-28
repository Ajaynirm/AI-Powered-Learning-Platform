import axios from "axios";


export const sendReport = async (report) => {
  return axios.post("http://localhost:10000/api/report/send-report", report);
};

export const generateReport = async (data) => {
  return axios.post("http://localhost:10000/api/report/generate-report", data);
};




