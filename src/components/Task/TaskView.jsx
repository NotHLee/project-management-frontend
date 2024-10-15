import PropTypes from 'prop-types';
import { MdDeleteOutline } from "react-icons/md";
import { TbProgressCheck } from "react-icons/tb";
import { CiEdit } from "react-icons/ci";
import { useState, useEffect, useContext } from 'react';
import TaskModify from './TaskModify';
import { MdDateRange } from "react-icons/md";
import {
    FaShapes,
    FaTag,
    FaSquareCheck,
    FaCircleExclamation,
    FaCircleUser,
    FaClock,
    FaX} from "react-icons/fa6";
import LogTime from './LogTime';
import axios from 'axios';
import BASE_URL from '../../config';
import { Backdrop } from '@mui/material';
import { createPortal } from 'react-dom';
import { TaskContext } from '../../pages/TaskDashboard';
import History from './History';

export default function TaskView(props) {

    // extract task data from props
    const {
        _id,
        taskName,
        storyType,
        storyPoints,
        tags,
        priority,
        assignee,
        status,
        description,
        progress,
        creationDate,
        sprint,
        history
    } = props;

    const { deleteTask, updateTask } = useContext(TaskContext) || {};
    const [toggleLogTime, setToggleLogTime] = useState(false)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [assigneeName, setAssigneeName] = useState('')
    const [open, setOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [showHistory, setShowHistory] = useState(false)
    const [sprintIsComplete, setSprintIsComplete] = useState(false)
    const [totalTime, setTotalTime] = useState(0)

    const selfID = sessionStorage.getItem('sessionToken')

    useEffect(() => {
        axios.get(`${BASE_URL}/api/members?memberId=${assignee}`)
        .then(response => {
            console.log(response.data)
            setAssigneeName(response.data.memberName)
        })
        .catch(error => {
            console.log(error)
        })
    }, [assignee])

    useEffect(() => {
        axios.get(`${BASE_URL}/api/sprints/complete?sprintID=${sprint}`)
        .then(response => {
            setSprintIsComplete(response.data.isComplete)
        })
        .catch(error => {
            console.log(error)
        })
    }, [sprint])

    useEffect(() => {
        axios.get(`${BASE_URL}/api/logTime?taskID=${_id}`)
        .then(response => {
            console.log(response.data)
            setTotalTime(response.data.message)
        })
        .catch(error => {
            console.log(error)
        })
    }, [totalTime, hours])

    useEffect(() => {
        axios.get(`${BASE_URL}/api/logTime?taskID=${_id}&memberID=${selfID}`)
        .then(response => {
            console.log(response.data)
            setHours(response.data.message)
        })
        .catch(error => {
            console.log(error)
        })
    }, [hours])

    const updateLogTime = (addHours, addMinutes) => {
        let newHours = parseInt(hours) + parseInt(addHours);
        let newMinutes = parseInt(minutes) + parseInt(addMinutes);

        if (newMinutes >= 60) {
          newHours += Math.floor(newMinutes / 60);
          newMinutes = newMinutes % 60;
        }

        setHours(newHours);
        setMinutes(newMinutes);
      };
    const showHistories = () => {
       setShowHistory(true)
    }

    return (
        <>
        <button
            onClick={() => setOpen(true)}
            className='
            flex
            font-bold
            text-center
            text-lg
            cursor-pointer
            justify-center
        '>
            <h1 >
            {taskName}
            </h1>
        </button>

        {createPortal(
            <Backdrop open={open} onClick={() => setOpen(false)}>
                <div
                onClick={(e) => e.stopPropagation()}
                className='
                    mx-auto
                    p-4
                    h-3/4
                    w-1/2
                    flex
                    flex-col
                    bg-primaryColor
                    rounded-xl
                    divide-y-8
                    divide-primaryColor
                    overflow-y-scroll
                    overflow-x-hidden
                    shadow-lg
                    gap-y-1

                '>
                    {/* Exit button */}
                    <button
                        onClick={() => setOpen(false)}
                        className='
                            flex
                            self-end
                    '>
                        <FaX />
                    </button>

                    <div className='flex justify-center'>

                        {editMode &&
                            <button
                                className='p-4 flex bg-red-400 rounded-lg font-semibold hover:bg-red-500 ease-in-out duration-500'
                                onClick={() => setEditMode(false)}
                            >
                                Cancel
                            </button>
                        }

                        {/* Buttons above header conditionally rendered if deleteTask and updateTask is present */}
                        {!editMode && deleteTask && updateTask && (
                            <div className='flex gap-x-4 text-center'>

                                {/* Delete button */}
                                <button onClick={()=>{
                                    deleteTask(_id);
                                    setOpen(false)
                                }}>
                                    <MdDeleteOutline className='text-3xl border-2 rounded hover:bg-amber-100 ease-in-out duration-500  '/>
                                </button>

                                {/* Edit button */}
                                <button onClick={() => setEditMode(true)}>
                                    <CiEdit className='text-3xl border-2 rounded hover:bg-amber-100 ease-in-out duration-500  '/>
                                </button>

                            </div>
                        )}

                    </div>
                        {!editMode &&
                            <>
                                <div className='
                                    flex
                                    w-full
                                    bg-secondaryColor
                                    justify-center
                                    font-bold
                                    text-2xl
                                    rounded-lg
                                    p-2
                                '>
                                    {taskName}
                                </div>

                                <div className='
                                    grid
                                    grid-cols-2
                                    gap-y-4
                                    text-xl
                                    p-4
                                    rounded-lg
                                    items-center
                                    bg-secondaryColor
                                '>
                                    <div className='task-view-icons'>
                                        <FaShapes />
                                        Story Type: {storyType}
                                    </div>
                                    <div className='task-view-icons'>
                                        <FaSquareCheck />
                                        Story Points: {storyPoints}
                                    </div>
                                    <div className='task-view-icons'>
                                        <FaTag />
                                        Tags: {tags.join(', ')}
                                    </div>
                                    <div className='task-view-icons'>
                                        <FaCircleExclamation/>
                                        Priority: {priority}
                                    </div>
                                    <div className='task-view-icons'>
                                        <FaCircleUser/>
                                        Assignee: {assigneeName}
                                    </div>
                                    <div className='task-view-icons'>
                                        <FaClock/>
                                        Status: {status}
                                    </div>
                                    <div className='task-view-icons'>
                                        <TbProgressCheck />
                                        Project Progress: {progress}
                                    </div>
                                    <div className='task-view-icons'>
                                    <MdDateRange />
                                        Creation Date: {creationDate}
                                    </div>
                                </div>

                                <div className='
                                    flex
                                    flex-col
                                    text-xl
                                    gap-y-2
                                    bg-secondaryColor
                                    p-4
                                    rounded-lg
                                '>
                                    <div className='font-semibold'>Description</div>
                                    <div>{description}</div>
                                </div>
                            </>
                        }

                    {editMode &&
                        <TaskModify {...props} exitModify={() => setEditMode(false)}/>
                    }

                    {!editMode &&
                        <div className='
                            flex
                            flex-col
                            text-xl
                            gap-y-2
                            rounded-lg
                            bg-secondaryColor
                            p-4
                            flex-grow
                        '>
                            <div className='font-semibold'>Task History</div>
                            {history.slice(0,2).map((item, index) => (
                                <div key={index} className='flex'>

                                    <p className='w-1/2'>{item.description}</p>

                                    <p className='w-1/2 text-slate-700'>{item.date}</p>
                                </div>
                            ))}
                            {history.length > 2 &&
                            <button className='bg-red-300 rounded ml-2 p-0.5 font-semibold hover:bg-red-400'
                            onClick={()=>{
                                showHistories()
                            }}>
                                View More
                            </button>}
                        </div>
                    }

                        <div className='
                            flex
                            flex-col
                            text-xl
                            gap-y-2
                            rounded-lg
                            bg-secondaryColor
                            p-4
                            flex-grow
                        '>

                            <div className='flex flex-row justify-between font-semibold'>
                                <p>Log Time Spent</p>
                                {sprint && !sprintIsComplete && (status === 'In Progress' || status === 'Completed') &&
                                    <button onClick={()=>setToggleLogTime((prev) => !prev)} className='bg-red-300 rounded ml-2 p-0.5 hover:bg-red-400'>
                                        Update Time
                                    </button>
                                }
                            </div>

                            <div className=' flex'>
                                <p className='w-1/2 font-semibold '>Personal Time Logged</p>
                                <p className='w-1/2 text-slate-700'>{hours}</p>
                            </div>

                      


                            <div className=' flex'>
                                <p className='w-1/2 font-semibold'>Team Total Hours</p>
                                <p className='w-1/2 text-slate-700'>{totalTime}</p>
                            </div>
                           

                            {toggleLogTime && (
                                <LogTime closeLogTime={()=>setToggleLogTime(false)} updateLogTime={updateLogTime} taskID={_id}/>)
                            }
                        </div>

                </div>
                {showHistory && <History history={history} setHistory={setShowHistory}/>}

            </Backdrop>
        ,document.getElementById('portal-root'))}
        </>
    )
}

TaskView.propTypes = {
    _id: PropTypes.string,
    taskName: PropTypes.string,
    storyType: PropTypes.string,
    storyPoints: PropTypes.number,
    tags: PropTypes.array,
    priority: PropTypes.string,
    assignee: PropTypes.string,
    status: PropTypes.string,
    description: PropTypes.string,
    progress: PropTypes.string,
    exitViewTask: PropTypes.func,
    deleteTask: PropTypes.func,
    updateTask: PropTypes.func,
    creationDate: PropTypes.string,
    sprint: PropTypes.string,
}