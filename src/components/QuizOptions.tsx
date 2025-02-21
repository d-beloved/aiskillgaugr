import { useData } from "vike-react/useData";
import { Data } from "@/pages/index/+data";
import startQuiz from "@/services/quiz.service";
import React, { useState, useEffect, FC } from "react";

interface QuizOptionsProps {
  showModal: boolean;
  onClose: () => void;
}

const QuizOptions: FC<QuizOptionsProps> = ({ showModal, onClose }) => {
  const { languages, levels, quizCounts } = useData<Data>();

  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [numberOfQuizzes, setNumberOfQuizzes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const modal = document.getElementById("quizOptionsModal") as HTMLDialogElement;
    if (modal && showModal) {
      modal.showModal();
    }
  }, [showModal]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      localStorage.setItem(
        "quizPreferences",
        JSON.stringify({
          language: selectedLanguage,
          level: selectedLevel,
          count: numberOfQuizzes,
        }),
      );

      await startQuiz(selectedLanguage, selectedLevel, +numberOfQuizzes);

      // window.location.href = "/quiz";
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog id="quizOptionsModal" className="modal">
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
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
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
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
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
                id="level"
                value={numberOfQuizzes}
                onChange={(e) => setNumberOfQuizzes(e.target.value)}
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
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!selectedLanguage || !selectedLevel || !numberOfQuizzes}
            >
              Start Quiz
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default QuizOptions;
