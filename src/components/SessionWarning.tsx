import { FC, useEffect, useState } from "react";
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

  const minutes = Math.floor(timeLeft / (60 * 1000));
  const seconds = Math.floor((timeLeft % (60 * 1000)) / 1000);

  return (
    <div className="alert alert-warning">
      <span>
        Quiz Session expires in {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </span>
    </div>
  );
}
