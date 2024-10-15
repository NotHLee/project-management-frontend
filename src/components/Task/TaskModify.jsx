import { TbProgressCheck } from "react-icons/tb";
import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { TaskContext } from "../../pages/TaskDashboard";

import {
    FaShapes,
    FaTag,
    FaSquareCheck,
    FaCircleExclamation,
    FaCircleUser,
    FaClock,
    FaX} from "react-icons/fa6";

export default function TaskModify(props) {

    const { exitModify } = props

    const [task, setTask] = useState({...props})
    const { assignees, updateTask } = useContext(TaskContext)

    const handleSubmit = (e) => {

        const tags = ["Backend", "API", "UI/UX", "Testing", "Frontend", "Database", "Framework"];
        const modifiedTask = {
            _id: task._id,
            taskName: e.target["taskName"].value,
            storyType: e.target["storyType"].value,
            storyPoints: e.target["storyPoints"].value,
            assignee: e.target["assignee"].value,
            priority: e.target["priority"].value,
            progress: e.target["progress"].value,
            status: e.target["status"].value,
            tags: tags.filter(key => e.target[key].checked)
        }

        updateTask(modifiedTask)
        exitModify()
    }

    return (
        <form onSubmit={(e) => {handleSubmit(e)}}>

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
                <input
                    id="taskName"
                    className="
                        p-1
                        border-2
                        border-gray-300
                        rounded
                        w-full
                        text-center
                        focus:text-left
                    "
                    autoFocus
                    type="text"
                    defaultValue={task.taskName}
                    required
                />
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
            '>

                {/* Modify story type */}
                <div className='task-view-icons'>
                    <FaShapes />
                    <p className='font-bold my-1'>Type:</p>
                        <select
                            id="storyType"
                            className='p-1 w-auto text-sm border-2 border-gray-300 rounded  h-8 mt-1'
                            defaultValue={task.storyType}
                            required
                        >
                            <option value="Story">Story Type</option>
                            <option value="Bug">Bug Type</option>
                        </select>
                </div>

                {/* Modify story points */}
                <div className='task-view-icons'>
                    <FaSquareCheck />
                    Story Points:
                    <input
                        id="storyPoints"
                        className='p-1 w-auto text-sm border-2 border-gray-300 rounded  h-8 mt-1'
                        type="number"
                        min="1"
                        max="10"
                        defaultValue={task.storyPoints}
                        required
                    />
                </div>

                {/* Modify assignee */}
                <div className='task-view-icons'>
                    <FaCircleUser/>
                    Assignee:
                    <select
                        id="assignee"
                        className='p-1 w-auto text-sm border-2 border-gray-300 rounded  h-8 mt-1 '
                        defaultValue={task.assignee}
                        required
                    >
                        {assignees.map((assignee)=>(
                            <option key={assignee._id} value={assignee._id}>
                                {assignee.memberName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Modify priority */}
                <div className='task-view-icons'>
                    <FaCircleExclamation/>
                    Priority:
                    <select
                        id="priority"
                        className='p-1 w-auto text-sm border-2 border-gray-300 rounded  h-8 mt-1'
                        defaultValue={task.priority}
                        required
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="Important">Important</option>
                        <option value="Urgent">Urgent</option>
                    </select>
                </div>

                {/* Modify project progress */}
                <div className='task-view-icons'>
                    <TbProgressCheck />
                    Project Progress:
                    <select
                        id="progress"
                        className='p-1 w-auto text-sm border-2 border-gray-300 rounded  h-8 mt-1'
                        defaultValue={task.progress}
                        required>
                            <option value="Planning">Planning</option>
                            <option value="Development">Development</option>
                            <option value="Testing">Testing</option>
                            <option value="Integration">Integration</option>
                    </select>
                </div>

                {/* Modify status */}
                <div className='task-view-icons'>
                    <FaClock/>
                    Status:
                    <input
                    id="status"
                    className="p-1 w-auto text-sm border-2 border-gray-300 rounded  h-8 mt-1"
                    value={task.status}
                    readOnly
                    />


                </div>

                {/* Modify tags */}
                <div className='task-view-icons'>

                    <div className='flex'>
                        <FaTag className='mt-1 mr-2' />
                        Tags:
                    </div>

                    <div className='
                        flex
                        flex-row
                        p-1
                        border-2
                        border-gray-300
                        gap-1
                        w-auto
                        rounded
                        bg-white
                        text-sm
                    '>
                            {/* Backend label */}
                            <input className='inputCheckBox'
                                type="checkbox"
                                id="Backend"
                                defaultChecked={task.tags.includes('Backend')}
                            />
                            <label htmlFor="Backend"> Backend</label>

                            {/* API label */}
                            <input className='inputCheckBox'
                                type="checkbox"
                                id="API"
                                defaultChecked={task.tags.includes('API')}
                            />
                            <label htmlFor="API"> API</label>

                            {/* UI/UX label */}
                            <input className='inputCheckBox'
                                type="checkbox"
                                id="UI/UX"
                                defaultChecked={task.tags.includes('UI/UX')}
                            />
                            <label htmlFor="UI/UX"> UI/UX</label>

                            {/* Testing label */}
                            <input className='inputCheckBox'
                                type="checkbox"
                                id="Testing"
                                defaultChecked={task.tags.includes('Testing')}
                            />
                            <label htmlFor="Testing"> Testing</label>

                            {/* Frontend label */}
                            <input className='inputCheckBox'
                                type="checkbox"
                                id="Frontend"
                                defaultChecked={task.tags.includes('Frontend')}
                            />
                            <label htmlFor="Frontend"> Frontend</label>

                            {/* Database label */}
                            <input className='inputCheckBox'
                                type="checkbox"
                                id="Database"
                                defaultChecked={task.tags.includes('Database')}
                            />
                            <label htmlFor="Database"> Database</label><br/>

                            {/* Framework label */}
                            <input className='inputCheckBox'
                                type="checkbox"
                                id="Framework"
                                defaultChecked={task.tags.includes('Framework')}
                            />
                            <label htmlFor="Framework"> Framework</label><br/>
                    </div>
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
            '>
                <div className='font-semibold'>Description</div>
                    <div>
                        <textarea
                            type="text"
                            onChange = {e => setTask({...task, description: e.target.value})}
                            className = "p-1 w-full h-44 resize-none border-2 border-gray-300 rounded"
                            defaultValue={task.description}>
                        </textarea>
                    </div>
                </div>

            {/* Save changes button */}
            <button
                type="submit"
                className='
                    border-2
                    border-yellow-400
                    p-2 rounded-lg
                    bg-yellow-200
                    font-bold
                    hover:bg-red-400
                    ease-in-out
                    duration-500
                '
            >
                Save Changes
            </button>
        </form>
    )
}

TaskModify.propTypes = {
    listAssignee: PropTypes.array,
    toggleEditMode: PropTypes.func,
    updateTask: PropTypes.func,
    exitViewTask: PropTypes.func
}


