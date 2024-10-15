import {useEffect, useMemo}from 'react'

import PropTypes from 'prop-types';
import { SortableContext } from '@dnd-kit/sortable';
import Card from '../common/Card/Card';
import { useDroppable } from '@dnd-kit/core';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BASE_URL from '../../config';

function SprintPlanningBox(props) {

    const{ title, tasks, _id, sprint, forceStart, startDate, endDate} = props
    const params = useParams();
    const [validDate, setValidDate] = useState(false)
    const { location } = useLocation();

    const {setNodeRef}= useDroppable({
        id: sprint ? 'sprint_backlog' : 'product_backlog',
        data: {
            type: "Box",
            title,
            tasks,
            sprint
        },
      });

    const renderTaskCards =()=>{
        return(
            tasks.map((task) =>(
                <Card key={task._id} {...task}/>
            ))
        )}

    const cardId = useMemo(()=> tasks.map((task)=> task._id),[tasks])

    const isStartDateValid = () => {

        // parse yyyy-mm-dd to dd-mm-yyyy
        const parsedStartDate = params.startDate.split('-').reverse().join('-');
        const parsedEndDate = params.endDate.split('-').reverse().join('-');

        axios.get(`${BASE_URL}/api/sprints/date?_id=${_id}&startDate=${parsedStartDate}&endDate=${parsedEndDate}&forceStart=true`)
            .then(response  => {
                console.log(response.data);
                setValidDate(true);
            })
            .catch(error => {
                console.log(error)
                setValidDate(false)
            });
        }

    useEffect(() => {
        if (startDate && endDate) {
            isStartDateValid();
        }
    }, [location])

  return (

    <div
    className={`flex flex-col border-2 border-black rounded-lg bg-yellow-100 h-[600px]`}
    ref={setNodeRef}
    >

        {/* Header */}
        <div className='h-min w-full border-b-2 text-center border-black border align-middle bg-yellow-200'>
            <p className='mt-2 rounded-t-sm rounded-b-none  text-3xl font-semibold text-center'>
                {title}
            </p>
        </div>

        {/* Container content for product backlog */}
        {(!sprint &&
            <div className='flex overflow-y-auto sm:w-[276px] lg:w-[552px] xl:w-[828px] 2xl:w-[1104px]'>
                <div className='flex flex-wrap h-full p-2 gap-4'>
                    <SortableContext items={cardId}>
                        {renderTaskCards()}
                    </SortableContext>
                </div>
            </div>
        )}

        {/* Container content for sprint backlog */}
        {(sprint &&
            <div className='flex h-full overflow-y-auto sm:w-[276px] 2.5xl:w-[552px]'>
                <div className='flex flex-wrap h-min p-2 gap-4'>
                    <SortableContext items={cardId}>
                        {renderTaskCards()}
                    </SortableContext>
                </div>
            </div>
        )}

        {/* Conditionally rendered footer */}
        {(sprint &&(

            <div className='flex border-y-2 border-black min-w-full justify-between p-2'>

                {/* Sprint start and end dates */}
                <div className='gap-2 pl-2'>

                    <p className='font-bold '>
                        Planned Duration:
                    </p>

                    <div className='flex flex-col'>
                        <p className=''>Start: {startDate}</p>
                        <p className=''>End: {endDate}</p>
                    </div>

                    <div className=' flex gap-3 items-center p-2 '>
                        <a href ="/sprint" >
                        <button
                            className='
                            flex
                            gap-2

                            items-center
                            justify-center
                            text-center
                            border-green-300
                            bg-green-400
                            border-4
                            rounded-md
                            p-2
                            hover:bg-transparent
                            ease-in-out
                            duration-500
                            font-medium text-xl
                        '
                        >
                            Done
                        </button>
                        </a>

                    {/* Conditonally render if validDate is true */}
                        {validDate && (
                            <button
                            onClick={forceStart}
                            className='
                                flex
                                gap-2
                                w-fit
                                items-center
                                justify-center
                                text-center
                                border-red-400
                                bg-red-500
                                border-4
                                rounded-md
                                p-2
                                hover:bg-transparent
                                ease-in-out
                                duration-500
                                font-medium
                                text-xl
                            '>
                                Force Start
                            </button>
                        )}
                </div>

                </div>

                {/* Buttons to force start sprint and save the sprint backlog */}

            </div>
        ))}
    </div>
  )
}

export default SprintPlanningBox

SprintPlanningBox.propTypes = {
    title: PropTypes.string.isRequired,
    tasks: PropTypes.array.isRequired,
    _id: PropTypes.string.isRequired,
    sprint: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.oneOf([undefined])
      ]),
    handleSubmission: PropTypes.func,
    forceStart: PropTypes.func,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
}