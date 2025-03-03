import React, { useState, FC } from "react";
import { useData } from "vike-react/useData";
import { navigate } from "vike/client/router";
import { Data } from "@/pages/index/+data";
import { useQuiz } from "@/contexts/QuizContext";
import { QuizPreference } from "@/types";

interface QuizOptionsModalProps {
  showModal: boolean;
  onClose: () => void;
}

const QuizOptionsModal: FC<QuizOptionsModalProps> = ({ showModal, onClose }) => {
  const { languages, levels, quizCounts } = useData<Data>();
  const { startNewQuiz, isLoading, quizPreferences, quizResult } = useQuiz();

  const [preferences, setPreferences] = useState<QuizPreference>(
    quizPreferences
      ? quizPreferences
      : {
          language: "",
          level: "",
          quizCount: "",
        },
  );

  const handlePreferenceChange = (key: string, value: string) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [key]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await startNewQuiz(preferences);
      navigate("/quiz");
    } catch (error) {
      console.error("Failed to start quiz");
    }
  };

  const { language, level, quizCount } = preferences;
  const isReady = language && level && quizCount;

  return (
    <dialog className={`modal ${showModal ? "modal-open" : ""}`}>
      <div className="modal-box bg-slate-800/90 backdrop-blur-sm text-white animate-scale-in">
        <h3 className="font-bold text-2xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          Quiz Preferences
        </h3>
        {quizResult && (
          <div className="flex items-center gap-2 p-3 bg-red-500/10 rounded-lg mb-6 animate-fade-in">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 stroke-current hidden md:block"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
            <p className="text-sm text-red-400">
              Starting a new quiz will erase previous results. Please use the recommendations.
            </p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control animate-slide-up" style={{ "--delay": "100ms" } as React.CSSProperties}>
            <select
              className="select select-bordered w-full bg-slate-700/50 focus:outline-none 
                         border-slate-600 focus:border-primary transition-colors"
              value={language}
              onChange={(e) => handlePreferenceChange("language", e.target.value)}
            >
              <option value="" disabled>
                Select a Programming Language
              </option>
              {languages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control animate-slide-up" style={{ "--delay": "200ms" } as React.CSSProperties}>
            <select
              className="select select-bordered w-full bg-slate-700/50 focus:outline-none 
                         border-slate-600 focus:border-primary transition-colors"
              value={level}
              onChange={(e) => handlePreferenceChange("level", e.target.value)}
            >
              <option value="" disabled>
                Select a Difficulty Level
              </option>
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control animate-slide-up" style={{ "--delay": "300ms" } as React.CSSProperties}>
            <select
              value={quizCount}
              onChange={(e) => handlePreferenceChange("quizCount", e.target.value)}
              className="select select-bordered w-full bg-slate-700/50 focus:outline-none 
                         border-slate-600 focus:border-primary transition-colors"
            >
              <option value="" disabled>
                Select Number of Questions
              </option>
              {quizCounts.map((opt) => (
                <option key={opt} value={opt}>
                  {opt} Questions
                </option>
              ))}
            </select>
          </div>

          <div className="modal-action animate-slide-up" style={{ "--delay": "400ms" } as React.CSSProperties}>
            <button type="button" className="btn btn-ghost hover:bg-slate-700/50" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary sm:w-1/2 md:w-[29%]" disabled={!isReady || isLoading}>
              {isLoading ? <span className="loading loading-spinner"></span> : "Start Quiz"}
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop bg-slate-900/80">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

export default QuizOptionsModal;
