import React, { useState, useEffect, useRef } from 'react';
import { Clock } from 'lucide-react';

const QuestionTimer = ({ onTimeUp, duration = 30, isPaused = false, questionId }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const startTimeRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    // Reset timer when question changes
    setTimeLeft(duration);
    startTimeRef.current = null;
  }, [questionId, duration]);

  useEffect(() => {
    let lastUpdateTime = performance.now();
    
    const updateTimer = (currentTime) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
        lastUpdateTime = currentTime;
      }

      const deltaTime = (currentTime - lastUpdateTime) / 1000; // Convert to seconds
      
      setTimeLeft((prevTime) => {
        const newTime = Math.max(0, prevTime - deltaTime);
        if (newTime <= 0) {
          onTimeUp();
          return 0;
        }
        return newTime;
      });

      lastUpdateTime = currentTime;
      
      if (!isPaused) {
        animationFrameRef.current = requestAnimationFrame(updateTimer);
      }
    };

    if (!isPaused && timeLeft > 0) {
      animationFrameRef.current = requestAnimationFrame(updateTimer);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPaused, onTimeUp, timeLeft]);

  // Determine color based on remaining time
  let timerColor = 'text-green-500';
  if (timeLeft <= 10) timerColor = 'text-red-500';
  else if (timeLeft <= 20) timerColor = 'text-yellow-500';

  return (
    <div className="flex items-center gap-2">
      <Clock className={`h-5 w-5 ${timerColor}`} />
      <span className={`font-mono font-bold text-lg ${timerColor}`}>
        Time left: {Math.ceil(timeLeft)}s
      </span>
    </div>
  );
};

export default QuestionTimer;