import React from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { quizData } from '@/lib/constants';
import { useNavigate } from 'react-router-dom';

const Scoreboard = ({ score, earnedPoints, onRetry }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };
  return (
    <Card className="w-full text-center">
      <CardHeader>
        <CardTitle className='text-3xl'>Quiz Completed!</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-around mb-4">
          <div>
            <p className="text-lg font-semibold">Questions</p>
            <p className="text-3xl font-bold">
              {score} / {quizData.length}
            </p>
          </div>
          <div>
            <p className="text-lg font-semibold">Points</p>
            <p className="text-3xl font-bold">
              {earnedPoints} / {quizData.length}
            </p>
          </div>
        </div>
        <Progress value={(earnedPoints / quizData.length) * 100} className="w-full" />
      </CardContent>
      <CardFooter className="flex justify-center items-center gap-4">
        <Button className='rounded-xl px-6 py-6 text-lg' onClick={onRetry}>Try Again</Button>
        <Button className='rounded-xl px-6 py-6 text-lg' onClick={handleGoHome}>Go Back to Home</Button>
      </CardFooter>
    </Card>
  );
}

export default Scoreboard;

