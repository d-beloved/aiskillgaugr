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
  const { startNewQuiz, isLoading, quizPreferences } = useQuiz();

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
      <div className="modal-box bg-gray-800 text-white">
        <h3 className="font-bold text-2xl mb-6">Quiz Preferences</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <select
              id="language"
              value={language}
              onChange={(e) => handlePreferenceChange("language", e.target.value)}
              required
              className="select select-bordered w-full bg-gray-700 focus:outline-none"
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

          <div className="form-control">
            <select
              id="level"
              value={level}
              onChange={(e) => handlePreferenceChange("level", e.target.value)}
              required
              className="select select-bordered w-full bg-gray-700 focus:outline-none"
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

          <div className="form-control">
            <select
              id="quizCount"
              value={quizCount}
              onChange={(e) => handlePreferenceChange("quizCount", e.target.value)}
              required
              className="select select-bordered w-full bg-gray-700 focus:outline-none"
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

          <div className="modal-action">
            <button type="button" className="btn btn-ghost" onClick={onClose} disabled={isLoading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={!isReady || isLoading}>
              {isLoading ? <span className="loading loading-spinner"></span> : "Start Quiz"}
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

export default QuizOptionsModal;
