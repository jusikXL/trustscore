
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TrustScoreIndicatorProps {
  score: number;
}

const TrustScoreIndicator: React.FC<TrustScoreIndicatorProps> = ({ score }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  // Determine color based on score
  const getScoreColor = (value: number) => {
    if (value >= 70) return "text-green-500";
    if (value >= 40) return "text-yellow-500";
    return "text-red-500";
  };
  
  const getScoreBackground = (value: number) => {
    if (value >= 70) return "bg-green-100 dark:bg-green-950";
    if (value >= 40) return "bg-yellow-100 dark:bg-yellow-950";
    return "bg-red-100 dark:bg-red-950";
  };
  
  const getScoreMessage = (value: number) => {
    if (value >= 85) return "Highly Trusted";
    if (value >= 70) return "Trusted";
    if (value >= 50) return "Moderate Risk";
    if (value >= 30) return "High Risk";
    return "Critical Risk";
  };

  // Animate the score counter
  useEffect(() => {
    const duration = 1500; // ms
    const interval = 15; // ms
    const steps = duration / interval;
    const increment = score / steps;
    let currentScore = 0;
    
    const timer = setInterval(() => {
      currentScore += increment;
      if (currentScore >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(currentScore));
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, [score]);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={`flex items-center justify-center p-4 rounded-full ${getScoreBackground(score)}`}
    >
      <div className="text-center">
        <div className="relative">
          <motion.div
            className={`text-2xl font-bold ${getScoreColor(score)}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {animatedScore}
          </motion.div>
          <div className="text-xs mt-1 font-medium">{getScoreMessage(score)}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default TrustScoreIndicator;
