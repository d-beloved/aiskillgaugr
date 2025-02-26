import React, { useState, useEffect, FC } from "react";
import { useData } from "vike-react/useData";
import { navigate } from "vike/client/router";
import { Data } from "@/pages/index/+data";
import { useQuiz } from "@/contexts/QuizContext";

interface QuizOptionsModalProps {
  showModal: boolean;
  onClose: () => void;
}

const QuizOptionsModal: FC<QuizOptionsModalProps> = ({ showModal, onClose }) => {
  const { languages, levels, quizCounts } = useData<Data>();
  const { startNewQuiz, isLoading, error, quizPreferences } = useQuiz();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const modal = document.getElementById("quizOptionsModal") as HTMLDialogElement;
    if (modal && showModal) {
      modal.showModal();
    }
  }, [showModal]);

  // const handlePreferenceChange = (key: string, value: string) => {
  //   setQuizPreferences((prev) => ({
  //     ...prev,
  //     [key]: value,
  //   }));
  // };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const preferences = {
      language: formData.get("language") as string,
      level: formData.get("level") as string,
      quizCount: formData.get("quizCount") as string,
    };

    try {
      await startNewQuiz(preferences);
      navigate("/quiz");
    } catch (error) {
      console.error("Failed to start quiz");
    } finally {
      setLoading(false);
    }
  };

  const { language, level, quizCount } = quizPreferences || {};

  return (
    <dialog id="quizOptionsModal" className="modal">
      {isLoading && <div className="loading loading-spinner"></div>}
      {error && <div className="alert alert-error">{error}</div>}
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
                name="language"
                value={language}
                // onChange={(e) => handlePreferenceChange("language", e.target.value)}
                required
                className="mt-1 block w-full"
              >
                <option value="">--Select--</option>
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
                name="level"
                value={level}
                // onChange={(e) => handlePreferenceChange("level", e.target.value)}
                required
                className="mt-1 block w-full"
              >
                <option value="">--Select--</option>
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
                name="quizCount"
                value={quizCount}
                // onChange={(e) => handlePreferenceChange("quizCount", e.target.value)}
                required
                className="mt-1 block w-full"
              >
                <option value="">--Select--</option>
                {quizCounts.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary" disabled={!language || !level || !quizCount || loading}>
              Start Quiz
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default QuizOptionsModal;
