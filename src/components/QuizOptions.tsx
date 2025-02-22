import React, { useState, useEffect, FC } from "react";
import { useData } from "vike-react/useData";
import { navigate } from "vike/client/router";
import { Data } from "@/pages/index/+data";
import startQuiz from "@/services/quiz.service";
import { QuizPreference } from "@/types";

interface QuizOptionsProps {
  showModal: boolean;
  onClose: () => void;
}

const QuizOptions: FC<QuizOptionsProps> = ({ showModal, onClose }) => {
  const { languages, levels, quizCounts } = useData<Data>();
  const [quizPreferences, setQuizPreferences] = useState<QuizPreference>({
    language: "",
    level: "",
    quizCount: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const quizPreferencesString = localStorage.getItem("quizPreferences");
    if (quizPreferencesString) {
      setQuizPreferences(JSON.parse(quizPreferencesString));
    }
    const modal = document.getElementById("quizOptionsModal") as HTMLDialogElement;
    if (modal && showModal) {
      modal.showModal();
    }
  }, [showModal]);

  const handlePreferenceChange = (key: string, value: string) => {
    setQuizPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const { language, level, quizCount } = quizPreferences;
    try {
      localStorage.setItem(
        "quizPreferences",
        JSON.stringify({
          language,
          level,
          quizCount,
        }),
      );

      await startQuiz(language, level, +quizCount);

      navigate("/quiz");
    } catch (error) {
      throw new Error("Failed to start quiz");
    } finally {
      setLoading(false);
    }
  };

  const { language, level, quizCount } = quizPreferences;

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
                value={language}
                onChange={(e) => handlePreferenceChange("language", e.target.value)}
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
                value={level}
                onChange={(e) => handlePreferenceChange("level", e.target.value)}
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
                value={quizCount}
                onChange={(e) => handlePreferenceChange("quizCount", e.target.value)}
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

export default QuizOptions;
