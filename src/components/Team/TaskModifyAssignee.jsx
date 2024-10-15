import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TbProgressCheck } from "react-icons/tb";
import { MdDateRange } from "react-icons/md";
import {
    FaShapes,
    FaTag,
    FaSquareCheck,
    FaCircleExclamation,
    FaCircleUser,
    FaClock} from "react-icons/fa6";
import { Box } from '@mui/material';
import { MemberDeletionContext } from './MemberDeletion';

export default function TaskModifyAssignee(props) {

    const selectRef = React.createRef();
    const { open, setUpdatedTasks, updatedTasks } = useContext(MemberDeletionContext);
    const { members, updateTasks, task } = props;

    useEffect(() => {
        selectRef.current.value = "";
    }, [open])

    const [isFirstSelection, setIsFirstSelection] = useState(true);

    const updateTask = (e) => {

        let assignee = e.target.value;

        if (isFirstSelection) {
            console.log('first selection');
            setIsFirstSelection(false);
        }

        // first, update the task locally
        const updatedTask = {
            ...task,
            assignee: assignee
        }

        setUpdatedTasks(prev => {
            // Check if the task is already in the list
            const isTaskInList = prev.some(task => task._id === updatedTask._id);

            // If the task is not in the list, add it
            if (!isTaskInList) {
                return [...prev, updatedTask];
            }

            // Otherwise, replace the task in the list
            return prev.map(task => task._id === updatedTask._id ? updatedTask : task);
        });

        console.log(updatedTasks);

    }

    return (
        <Box
            onClick={e => e.stopPropagation()}
            className='flex flex-col gap-y-4 bg-primaryColor p-4 rounded-xl shadow-md w-4/5 mx-auto'>
            {/* Task header */}
            <div className='
                flex
                w-full
                bg-secondaryColor
                justify-center
                font-bold
                text-2xl
                rounded-lg
                p-2
                shadow-inner
            '>
                {task.taskName}
            </div>

            {/* Task attributes */}
            <div className='
                grid
                grid-cols-2
                gap-y-4
                text-xl
                p-4
                rounded-lg
                items-center
                bg-secondaryColor
                shadow-inner
            '>
                <div className='task-view-icons'>
                    <FaShapes />
                    Story Type: {task.storyType}
                </div>
                <div className='task-view-icons'>
                    <FaSquareCheck />
                    Story Points: {task.storyPoints}
                </div>
                <div className='task-view-icons'>
                    <FaTag />
                    Tags: {task.tags.join(', ')}
                </div>
                <div className='task-view-icons'>
                    <FaCircleExclamation/>
                    Priority: {task.priority}
                </div>

                {/* Modify assignee */}
                <div className='task-view-icons'>
                    <FaCircleUser/>
                    Assignee:
                    <select
                        ref={selectRef}
                        id='assignee'
                        onChange = {(e) => updateTask(e)}
                        className='p-1 w-auto text-sm border-2 border-gray-300 rounded  h-8 mt-1 '
                        defaultValue=""
                        required
                    >
                        <option value="" disabled>Select an assignee</option>
                        {members.map(members => (
                            <option key={members._id} value={members._id}>{members.memberName}</option>
                        ))}
                    </select>
                </div>

                <div className='task-view-icons'>
                    <FaClock/>
                    Status: {task.status}
                </div>
                <div className='task-view-icons'>
                    <TbProgressCheck />
                    Project Progress: {task.progress}
                </div>
                <div className='task-view-icons'>
                <MdDateRange />
                    Creation Date: {task.creationDate}
                </div>
            </div>

            {/* Task description */}
            <div className='
                flex
                flex-col
                text-xl
                gap-y-2
                bg-secondaryColor
                p-4
                rounded-lg
                shadow-inner
            '>
                <div className='font-semibold'>Description</div>
                <div>{task.description}</div>
            </div>

            {/* Task history */}
            <div className='
                flex
                flex-col
                text-xl
                gap-y-2
                rounded-lg
                bg-secondaryColor
                p-4
                flex-grow
                shadow-inner
            '>
                <div className='font-semibold'>Task History</div>
                <div>insert history here</div>
            </div>
        </Box>
    )
}

TaskModifyAssignee.propTypes = {
    id: PropTypes.string,
    taskName: PropTypes.string,
    storyType: PropTypes.string,
    storyPoints: PropTypes.number,
    tags: PropTypes.array,
    priority: PropTypes.string,
    assignee: PropTypes.string,
    status: PropTypes.string,
    description: PropTypes.string,
    progress: PropTypes.string,
    creationDate: PropTypes.string,
    members: PropTypes.array,
}