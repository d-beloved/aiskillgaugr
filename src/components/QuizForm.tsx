import React, { useState } from "react";

const languages = ["JavaScript", "Python", "Java", "C++", "Ruby"];
const levels = ["Beginner", "Intermediate", "Advanced"];

const QuizForm = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [numberOfQuizzes, setNumberOfQuizzes] = useState(1);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here, e.g., navigate to the quiz page
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="language">Select Programming Language:</label>
        <select id="language" value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)} required>
          <option value="">--Select--</option>
          {languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="level">Select Level of Competence:</label>
        <select id="level" value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)} required>
          <option value="">--Select--</option>
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="numberOfQuizzes">Number of Quizzes:</label>
        <input
          type="number"
          id="numberOfQuizzes"
          value={numberOfQuizzes}
          onChange={(e) => setNumberOfQuizzes(+e.target.value)}
          min="1"
          required
        />
      </div>
      <button type="submit">Start Quiz</button>
    </form>
  );
};

export default QuizForm;
