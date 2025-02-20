import React, { useEffect, useState } from 'react';
import CustomSidebar from '../ui-parts/quiz-page/CustomSidebar';
import Topbar from '../ui-parts/quiz-page/Topbar';
import Question from '../ui-parts/quiz-page/Question';
import { Button } from '../ui/button';
import { quizData } from '../../lib/constants';
import Scoreboard from '../ui-parts/quiz-page/Scoreboard';
import { initDB } from '@/lib/utils';

const Quiz = () => {
    const [userAnswers,setUserAnswers] = useState({});
    const [currentQuestion,setCurrentQuestion] = useState(0);
    const [showFeedback,setShowFeedback] = useState(false);
    const [isQuizCompleted,setIsQuizCompleted] = useState(false);
    const [answeredQns,setAnsweredQns] = useState([]);
    const [score,setScore] = useState(0);
    const [totalTime,setTotalTime] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
          setTotalTime(prev => prev + 1);
        }, 1000);
    
        return () => clearInterval(timer);
    }, []);

    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const calculateCategoryStats = () => {
        const stats = {};
        quizData.forEach((question, index) => {
            const category = question.category;
            if (!stats[category]) {
            stats[category] = { correct: 0, total: 0 };
            }
            stats[category].total += 1;
            if (userAnswers[question.id] === question.correctAnswer) {
            stats[category].correct += 1;
            }
        });
        console.log("score :",score);   
        return Object.entries(stats).map(([category, data]) => ({
            category,
            correct: data.correct,
            total: data.total
        }));
    };


    const saveQuizResult = async () => {
        try {
          const db = await initDB();
          const transaction = db.transaction(['quizHistory'], 'readwrite');
          const store = transaction.objectStore('quizHistory');
    
          const quizResult = {
            id: `quiz-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            duration: formatDuration(totalTime),
            score: Math.round((score / quizData.length) * 100),
            totalQuestions: quizData.length,
            correctAnswers: score+1,
            category: "Mixed", 
            details: calculateCategoryStats()
          };
    
          await store.add(quizResult);
        } catch (error) {
          console.error('Error saving quiz result:', error);
        }
    };

    const handleTimeUp = () => {
        handleUserAnswer('');
        handleCheckAnswer();
    };
    
    const handleUserAnswer = (answer) => {
        if(userAnswers[quizData[currentQuestion].id] !== answer)
            setUserAnswers({...userAnswers, [quizData[currentQuestion].id]: answer});
    }

    const handleNextQuestion = () => {
        const curQnData = quizData[currentQuestion];
        const isCorrect = userAnswers[currentQuestion+1] === curQnData.correctAnswer;
        if(isCorrect){
            setScore(score + 1);
        }
        setShowFeedback(false);
        setAnsweredQns([...answeredQns,curQnData.id]);
        if(currentQuestion < quizData.length - 1){
            setCurrentQuestion(currentQuestion + 1);
        }else{
            setIsQuizCompleted(true);
            saveQuizResult();
        }
    };

    const handleCheckAnswer = () => {
        setShowFeedback(true);
        setTimeout(() => {
            handleNextQuestion();
        },1500);
    };


    const handleRetry = () => {
        setIsQuizCompleted(false);
        setCurrentQuestion(0);
        setUserAnswers({});
        setScore(0);
        setAnsweredQns([]);
        setTotalTime(0);
    };

    return (
        <div className='w-full h-screen flex'>
        <CustomSidebar currentQn={currentQuestion}/>
        <div className='w-4/5 flex justify-start items-start flex-col gap-4 p-8'>
            {isQuizCompleted ? (
                <Scoreboard
                    score={score}
                    earnedPoints={score}
                    onRetry={handleRetry}
                    duration={formatDuration(totalTime)}
                />
            ) :
            <>
                <Topbar 
                    onTimeUp={handleTimeUp}
                    attemptedQns={currentQuestion}
                    isPaused={showFeedback}
                    questionId = {currentQuestion}
                />
                <Question
                    question = {quizData[currentQuestion]}
                    onAnswer={handleUserAnswer}
                    showFeedback={showFeedback}
                    userAnswer={userAnswers[quizData[currentQuestion].id]}
                />
                <div className='w-full flex justify-end'>
                    <Button className='px-6 text-lg py-6 rounded-xl'  onClick={handleCheckAnswer}>
                        {currentQuestion === quizData.length - 1 ? 'Finish' : 'Next Question'}
                    </Button>
                </div>
            </>
    }
        </div>
        </div>
    );
}

export default Quiz;
