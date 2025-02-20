import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion } from "@/components/ui/accordion"
import {  ArrowRight, Brain } from "lucide-react"
import QuizHistoryItem from '../ui-parts/home-page/QuizHistoryItem';
import { useNavigate } from 'react-router-dom';
import { getQuizHistory } from '@/lib/utils';
import StartQuizDialog from '../ui-parts/dialogue-box/StartQuizDialog';


const Home = () => {
  const navigate = useNavigate();
  const [showStartDialog, setShowStartDialog] = useState(false);
  const [quizHistory, setQuizHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // To load quiz history from IndexedDB
  useEffect(() => {
    const loadQuizHistory = async () => {
      try {
        const history = await getQuizHistory();
        setQuizHistory(history);
      } catch (error) {
        console.error('Error loading quiz history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuizHistory();

    // Add event listener for database changes
    const handleStorageChange = () => {
      loadQuizHistory();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Calculate overall statistics
  const totalAttempts = quizHistory.length;
  const averageScore =  totalAttempts === 0 ? 0 : Math.round(quizHistory.reduce((acc, curr) => acc + curr.score, 0) / totalAttempts);
  const bestScore = totalAttempts === 0 ? 0 : Math.max(...quizHistory.map(attempt => attempt.score));

  const handleNavigateToQuiz = () => {
    setShowStartDialog(true);
  };

  const handleStartQuiz = () => {
    setShowStartDialog(false);
    navigate('/quiz');
  };
  return (
    <>
      <StartQuizDialog
        open={showStartDialog}
        onOpenChange={setShowStartDialog}
        onStart={handleStartQuiz}
      />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-[#18181a] text-gray-100">
          <div className="container mx-auto px-6 pl-14 py-16">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-gray-300">Test Your Knowledge</h1>
                <p className="text-lg text-gray-300">
                  Challenge yourself with our interactive quizzes and track your progress over time.
                </p>
                  <Button  className="gap-4 bg-gray-300 text-black px-8 py-6 rounded-xl text-lg" onClick={handleNavigateToQuiz}>
                    Take a Quiz <ArrowRight className="h-6 w-6" />
                  </Button>
              </div>
              <div className="hidden md:block">
                <Brain className="h-64 w-64 mx-auto opacity-20" />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className='text-3xl font-medium'>Total Attempts</CardTitle>
                <CardDescription >Number of quizzes taken</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{totalAttempts}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className='text-3xl font-medium'>Average Score</CardTitle>
                <CardDescription>Your typical performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{averageScore}%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className='text-3xl font-medium'>Average Score</CardTitle>
                <CardTitle >Best Score</CardTitle>
                <CardDescription>Your highest achievement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{bestScore}%</div>
              </CardContent>
            </Card>
          </div>

          {/* Quiz History Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-medium">Quiz History</CardTitle>
              <CardDescription>View detailed results of your previous attempts</CardDescription>
            </CardHeader>
            <CardContent>
              {totalAttempts === 0 ? (
                <div className='flex justify-center items-center h-32'>
                  <p className='text-xl font-semibold'>No Quizes Taken</p>
                </div>
              ) :
              <Accordion type="single" collapsible className="w-full">
                {quizHistory.slice().reverse().map((attempt) => (
                    <QuizHistoryItem key={attempt.id} attempt={attempt} />
                ))}
              </Accordion>
          }
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  )
}

export default Home;

