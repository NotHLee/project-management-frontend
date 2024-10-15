import React, { useState } from 'react'
import Navbar from '../components/common/Navbar'
import FAQs from '../components/common/FAQs'
import Delete from '../assets/Delete.mp4'
import Modify from '../assets/Modify.mp4'
import Sort from '../assets/Sort.mp4'
import SprintCreate from '../assets/SprintCreate.mp4'
import SprintForceEnd from '../assets/SprintForceEnd.mp4'
import Create from '../assets/Create.mp4'
import SprintForceStart from '../assets/SprintForceStart.mp4'
import AdminGraph from '../assets/AdminGraph.mp4'
import BurndownString from '../assets/BurndownString.mp4'
import UserGraph from '../assets/UserGraph.mp4'
import SprintDelete from '../assets/SprintDelete.mp4'
import ModifySprint from '../assets/ModifySprint.mp4'


function HelpCenter() {

    const [questions, setQuestions] = useState([
        { question: 'How to add a task to task dashboard/Product Backlog?', video: Create },
        { question: 'How to delete a task?', video: Delete },
        { question: 'How to modify a task that you have already created?', video: Modify },
        { question: 'How to sort your task according to its priority or start date?', video: Sort },
        { question: 'How to create a new sprint?', video: SprintCreate },
        { question: 'How to delete a sprint?', video: SprintDelete },
        { question: 'How to modify a sprint that is NOT STARTED?', video: ModifySprint },
        { question: 'How to view your burndown chart?', video: BurndownString },
        { question: 'How to Force Start a sprint?', video: SprintForceStart },
        { question: 'How to Force End a sprint?', video: SprintForceEnd },
        { question: 'How to view your own average time spent graph?', video: UserGraph },
        { question: 'How to view everyone\'s average time spent graph as an Admin?', video: AdminGraph },
      ]);
  return (
    <div className='flex'>
        <Navbar/>
        <div className='text-3xl font-bold w-full'>
        <p className='p-2 '>Help Center</p>
        <hr className='border-black'/>
        <p className='p-2 text-center'>FAQs:</p>
        <div className='p-1 gap-8 text-2xl flex flex-col items-center'>
        {questions.map((faq, index) => (
            <FAQs key={index} faq={faq} />
        ))}
        </div>
        </div>
    </div>
  )
}

export default HelpCenter