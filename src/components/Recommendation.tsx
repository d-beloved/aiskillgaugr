import React from "react";

interface RecommendationProps {
  score: number;
  language: string;
  level: string;
}

const Recommendation: React.FC<RecommendationProps> = ({ score, language, level }) => {
  const getRecommendation = () => {
    if (score >= 80) {
      return `Great job! You have a strong understanding of ${language} at the ${level} level. Consider contributing to open-source projects or teaching others.`;
    } else if (score >= 50) {
      return `Good effort! You have a decent grasp of ${language} at the ${level} level. Try to practice more and explore advanced topics.`;
    } else {
      return `Keep learning! It might be helpful to revisit the basics of ${language} at the ${level} level. Consider online courses or tutorials.`;
    }
  };

  return (
    <div className="recommendation">
      <h2>Recommendations</h2>
      <p>{getRecommendation()}</p>
    </div>
  );
};

export default Recommendation;
