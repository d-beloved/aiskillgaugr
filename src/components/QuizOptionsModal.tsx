import React, { useState, useEffect, FC } from "react";
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const modal = document.getElementById("quizOptionsModal") as HTMLDialogElement;
    if (modal && showModal) {
      modal.showModal();
    }
  }, [showModal]);

  const handlePreferenceChange = (key: string, value: string) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [key]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      await startNewQuiz(preferences);
      navigate("/quiz");
    } catch (error) {
      console.error("Failed to start quiz");
    } finally {
      setLoading(false);
    }
  };

  const { language, level, quizCount } = preferences;
  const isReady = language && level && quizCount;

  return (
    <dialog id="quizOptionsModal" className="modal">
      {/* {isLoading && <div className="loading loading-spinner"></div>} */}
      <div className="modal-box">
        <form method="dialog" onSubmit={handleSubmit}>
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>
            ✕
          </button>
          <h3 className="font-bold text-lg text-center">Select Quiz Options</h3>
          <div className="py-4">
            <div className="mb-4">
              <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                Select Programming Language:
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => handlePreferenceChange("language", e.target.value)}
                required
                className="mt-1 block w-full"
              >
                <option value="" disabled>
                  --Select--
                </option>
                {languages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                Select Level of Competence:
              </label>
              <select
                id="level"
                value={level}
                onChange={(e) => handlePreferenceChange("level", e.target.value)}
                required
                className="mt-1 block w-full"
              >
                <option value="" disabled>
                  --Select--
                </option>
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="numberOfQuizzes" className="block text-sm font-medium text-gray-700">
                Number of Quizzes:
              </label>
              <select
                id="quizCount"
                value={quizCount}
                onChange={(e) => handlePreferenceChange("quizCount", e.target.value)}
                required
                className="mt-1 block w-full"
              >
                <option value="" disabled>
                  --Select--
                </option>
                {quizCounts.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary" disabled={!isReady || loading}>
              Start Quiz
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default QuizOptionsModal;
