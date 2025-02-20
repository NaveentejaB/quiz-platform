import React from 'react';
import { Progress } from "@/components/ui/progress"
import QuestionTimer from './QuestionTimer';
import { quizData } from '@/lib/constants';

const Topbar = ({onTimeUp, attemptedQns, isPaused, questionId}) => {
  const progress = Math.floor((attemptedQns/quizData.length)*100);
  return (
    <div className='w-full flex flex-col p-4 gap-10'>
        <div className='w-full flex justify-between items-center'>
            <h1 className='text-2xl font-bold'>{quizData[attemptedQns].type === 'multipleChoice' ? 'Multiple Chocie Questions' : 'Numerical Questions'}</h1>
            <QuestionTimer 
              onTimeUp={onTimeUp} 
              isPaused={isPaused}
              questionId={questionId}
            />
        </div>
        <div className='w-full flex justify-between items-center'>
          <Progress value={progress}/>
          <p className='ml-6 mr-2 text-lg font-semibold'>{attemptedQns}/{quizData.length}</p>
          <p className='text-lg font-semibold'>Questions</p>
        </div>
    </div>
  );
}
export default Topbar;
