import React from 'react';
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { ScrollArea } from "@/components/ui/scroll-area"
import { quizData } from '@/lib/constants';



// const questions = ['Question 1', 'Question 2', 'Question 3', 'Question 4', 'Question 5']
// const qns = [
//   {
//     catergory : 'Multiple Choice Questions',
//     questions : ['Question 1', 'Question 2', 'Question 3', 'Question 4', 'Question 5']
//   },
//   {
//     catergory : 'Numerical Type Questions',
//     questions : ['Question 1', 'Question 2', 'Question 3', 'Question 4', 'Question 5']
//   },
// ]

const CustomSidebar = ({currentQn}) => {

  const qns = [
    {
      type: 'Multiple Choice Questions',
      questions: quizData.filter(q => q.type === 'multipleChoice').map(q => q.id)
    },
    {
      type: 'Numerical Type Questions',
      questions: quizData.filter(q => q.type === 'numericalType').map(q =>  q.id)
    }
  ]
  return (
    <nav className='w-1/5 bg-gray-100 h-screen py-8'>
      <div className='flex flex-col justify-center items-center gap-2'>
        <h2 className='text-black text-4xl font-bold'>Quiz</h2>
        <p className='text-gray-400 font-medium'>Test your knowledge</p>
      </div>
      <div className='flex flex-col gap-4 mt-7 px-4'>
        <h3 className='text-xl font-semibold '>Your Progress</h3>
        <ScrollArea className='flex-grow'>
          {qns.map((q, index) => (
            <div key={index} className='flex flex-col gap-2  pb-2'>
              <h4>{q.type}</h4>
              {q.questions.map((question, index) => (
                <div key={index} className={`flex justify-between items-center py-2 px-3 ${question === currentQn +1 ? 'bg-black rounded-xl shadow-sm' : ''}`}> 
                  <p className={`${question !== currentQn+1 ? 'text-gray-500': 'text-white'}`}>{`Question ${question}`}</p>
                  {question > currentQn+1 && <LockClosedIcon className='h-5 w-5 text-gray-500'/>}
                </div>
              ))}
            </div>
          ))}
        </ScrollArea>
      </div>
    </nav>
  );
}

export default CustomSidebar;
