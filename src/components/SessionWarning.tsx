import { useCallback, useEffect, useRef, useState } from "react";
import { useQuiz } from "@/contexts/QuizContext";
import { TEN_MINUTES } from "@/utils/session";

interface SessionWarningProps {
  onTimeUp: () => void;
}

export default function SessionWarning({ onTimeUp }: SessionWarningProps) {
  const { session } = useQuiz();
  const timeupHandled = useRef(false);
  const [timeLeft, setTimeLeft] = useState<number>(TEN_MINUTES);

  const handleTimeUp = useCallback(() => {
    if (!timeupHandled.current) {
      timeupHandled.current = true;
      onTimeUp();
    }
  }, [onTimeUp]);

  useEffect(() => {
    if (!session) return;

    const interval = setInterval(() => {
      const timeRemaining = session.timestamp + session.expiresIn - Date.now();
      setTimeLeft(Math.max(0, timeRemaining));
    }, 1000);

    return () => clearInterval(interval);
  }, [session]);

  useEffect(() => {
    if (session && timeLeft === 0 && !timeupHandled.current) {
      handleTimeUp();
    }
  }, [timeLeft, handleTimeUp]);

  const minutes = Math.floor(timeLeft / (60 * 1000));
  const seconds = Math.floor((timeLeft % (60 * 1000)) / 1000);
  const isLowTime = minutes < 2;

  return (
    <div
      className={`flex items-center gap-3 rounded-lg p-3 shadow-lg
      ${isLowTime ? "bg-red-500/10 text-red-400" : "bg-yellow-500/10 text-yellow-400"}`}
    >
      <div className="flex-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 ${isLowTime ? "animate-pulse-slow" : ""}`}
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
          <span className={`font-mono ${isLowTime ? "animate-pulse-slow text-red-400" : "text-white"}`}>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </span>
        </div>
        <p className="text-sm opacity-75">
          {isLowTime
            ? "When the time is up, your answers will be submitted"
            : "Please don't close this tab or navigate away"}
        </p>
      </div>
    </div>
  );
}
