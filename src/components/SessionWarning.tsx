import { useEffect, useState } from "react";
import { useQuiz } from "@/contexts/QuizContext";

export default function SessionWarning() {
  const { session } = useQuiz();
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    if (!session) return;

    const interval = setInterval(() => {
      const timeRemaining = session.timestamp + session.expiresIn - Date.now();
      setTimeLeft(Math.max(0, timeRemaining));
    }, 1000);

    return () => clearInterval(interval);
  }, [session]);

  if (!session || timeLeft === 0) return null;
  // const timeUp = !session || timeLeft === 0;

  const minutes = Math.floor(timeLeft / (60 * 1000));
  const seconds = Math.floor((timeLeft % (60 * 1000)) / 1000);
  const isLowTime = minutes < 13;

  {
    /* TODO: it should automatically submit once time is up */
  }
  return (
    <div
      className={`flex items-center gap-3 rounded-lg p-3 shadow-lg ${
        isLowTime ? "bg-error/10 text-error" : "bg-warning/10 text-warning"
      }`}
    >
      <div className="flex-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 ${isLowTime ? "animate-pulse" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div className="flex flex-col">
        <div className="font-semibold">
          Time Remaining:{" "}
          <span className="font-mono">
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </span>
        </div>
        <p className="text-sm opacity-75">Please don't close this tab or navigate away</p>
      </div>
    </div>
  );
}
