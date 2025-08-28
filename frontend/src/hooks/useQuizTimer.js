import { useEffect } from "react";
import { useAuthStore } from "../store/AuthStore.js";
export const useQuizTimer = (mode, timeLeft, setTimeLeft, totalTime, setTotalTime, onTimeUp) => {
  useEffect(() => {
    const timer = setInterval(() => {
      if (mode === "question-timer" && timeLeft > 0) {
        setTimeLeft((prev) => Math.max(prev - 1, 0));
      } else if (mode === "total-timer" && totalTime > 0) {
        setTotalTime((prev) => Math.max(prev - 1, 0));
      }
    }, 1000);

    if ((mode === "question-timer" && timeLeft === 0) || 
        (mode === "total-timer" && totalTime === 0)) {
      onTimeUp();
    }

    return () => clearInterval(timer);
  }, [mode, timeLeft, totalTime, onTimeUp]);
};
