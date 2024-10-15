import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FaX } from "react-icons/fa6";

export default function TaskForm(props) {

    const { assignees, createTask, toggleForm } = props

    const[taskName,setTaskName] = useState("")
    const[description, setDescription] = useState("")
    const[storyPoints,setStoryPoints] = useState("")
    const[tags,setTags] = useState([])
    const[priority,setPriority] = useState("")
    const[storyType,setStoryType] = useState("")
    const[status,setStatus] = useState("Not Started")
    const[assignee,setAssignee] = useState("")
    const[progress,setProgress] = useState("")
    const[errorMessage, setErrorMessage] = useState(null)

    function handleSubmit(e){
        e.preventDefault()

        if (tags.length===0){
            setErrorMessage("Must at least have one role")
            return
        }else{
            setErrorMessage(null)
        }

        toggleForm()
        createTask({
            taskName,
            description,
            storyPoints,
            priority,
            tags,
            storyType,
            status,
            assignee,
            progress
        })
        console.log(taskName,description,storyPoints,priority,status,assignee,progress)
    }

    function rolesCheck(e,roleNames){
        if(e.target.checked){
            setTags([...tags,roleNames])
        }else{
            setTags(tags.filter((role)=> role !== roleNames))
        }


    }
    function handleOnChange(e,sets){
        sets(e.target.value)
    }
    useEffect(()=>{
        if (errorMessage){
            const timer = setTimeout(()=>{
                setErrorMessage(null)
            },3000)
            return () => clearTimeout(timer)
        }

    },[errorMessage])

  return (

    <div
        className='
            fixed
            top-0
            left-0
            w-screen
            h-screen
            bg-black
            bg-opacity-70
            flex
            items-center
    '>
        <div className='
            flex
            flex-col
            w-[630px]
            p-5
            bg-red-300
            h-3/4
            overflow-y-auto
            z-1
            rounded-md
            shadow-slate-500
            mx-auto
        '>
            {/* Exit button */}
            <button
                onClick={() => toggleForm()}
                className='
                    flex
                    self-end
                    mb-2
            '>
                <FaX />
            </button>

            <form onSubmit={handleSubmit}>
            <div className='justify-center border-2 border-gray-100 rounded text-center font-bold text-xl'><p>New Task form </p></div>

            <div className='flex-wrap '>

                <p className='font-bold my-1'>Task Name:</p>
                <input
                className =
                "p-1 border-2  border-gray-300 rounded w-full"
                onChange={(event)=>handleOnChange(event,setTaskName)}
                required/>


                <p className='font-bold my-1'>Description:</p>
                <textarea
                onChange={(event)=>handleOnChange(event,setDescription)}
                className = "p-1 w-full h-44 resize-none border-2 border-gray-300 rounded"></textarea>


                <div className=' w-full flex flex-wrap gap-y-2 gap-x-12'>

                        <div className=''>
                            <p className='font-bold my-1'>Story Points:</p>

                            <input className='p-1 border-2 border-gray-300 rounded w-1/2 min-w-60 h-13'
                            id="quantity"
                            type="number"
                            name="quantity"
                            min="1"
                            max="10"
                            onChange={(event)=>handleOnChange(event,setStoryPoints)}
                            required/>
                        </div>

                        <div>
                        <p className='font-bold my-1'>Priority:</p>
                            <select
                            name="priorities"
                            id="priority"
                            className='p-1 w-1/2 border-2 border-gray-300 rounded min-w-60 h-13'
                            onChange = {(event)=>handleOnChange(event,setPriority)}
                            required>
                                <option value="" >Select an Option</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="Important">Important</option>
                                <option value="Urgent">Urgent</option>

                            </select>
                        </div>

                        <div className='flex-wrap'>
                            <p className='font-bold my-1'>Type:</p>
                            <select
                            name="Tasktype"
                            id="Tasktype"
                            className='p-1 w-1/2 border-2 border-gray-300 rounded min-w-60 h-13'
                            onChange = {(event)=>handleOnChange(event,setStoryType)}
                            required>
                                <option value="" >Select an Option</option>
                                <option value="Story">Story Type</option>
                                <option value="Bug">Bug Type</option>
                            </select>
                        </div>
                        <div>
                            <p className='font-bold my-1'>Status:</p>
                            <input
                            className='p-1 w-1/2  rounded border-2 border-gray-200 min-w-60 h-13'
                            onChange = {(event)=>handleOnChange(event,setStatus)}
                            name="Status"
                            id="Status"
                            value={status}
                            readOnly

                            />

                        </div>
                        <div>



                        </div>
                </div>
                <p className='font-bold my-1'>Project Progress:</p>
                    <select
                    name="Project Progress"
                    id="Project Progress"
                    className='p-1 rounded border-2 border-gray-200 w-full h-13'
                    onChange = {(event)=>handleOnChange(event,setProgress)}
                    required>
                        <option value="" >Select an Option</option>
                        <option value="Planning">Planning</option>
                        <option value="Development">Development</option>
                        <option value="Testing">Testing</option>
                        <option value="Integration">Integration</option>
                    </select>




                <p className='font-bold my-1 '>Roles:</p>


                <div className='
                    flex
                    flex-wrap
                    p-1
                    border-2
                    border-gray-300
                    gap-x-1
                    rounded
                    bg-white


                    '>
                    <input
                    type="checkbox"
                    id="backend"
                    name="backend"
                    value="backend"
                    onChange={(e)=>rolesCheck(e,"Backend")}
                    />
                    <label htmlFor="backend"> Backend</label><br/>

                    <input
                    type="checkbox"
                    id="api"
                    name="api"
                    value="api"
                    onChange={(e)=>rolesCheck(e,"API")}
                    />
                    <label htmlFor="api"> API</label><br/>

                    <input
                    type="checkbox"
                    id="ui"
                    name="ui"
                    value="ui"
                    onChange={(e)=>rolesCheck(e,"UI/UX")}
                    />
                    <label htmlFor="ui"> UI/UX</label><br/>

                    <input type="checkbox" id="testing" name="testing" value="testing" onChange={(e)=>rolesCheck(e,"Testing")}/>
                    <label htmlFor="testing"> Testing</label><br/>

                    <input type="checkbox" id="frontend" name="frontend" value="frontend" onChange={(e)=>rolesCheck(e,"Frontend")}/>
                    <label htmlFor="frontend"> Frontend</label><br/>

                    <input type="checkbox" id="database" name="database" value="database" onChange={(e)=>rolesCheck(e,"Database")}/>
                    <label htmlFor="database"> Database</label><br/>

                    <input type="checkbox" id="framework" name="framework" value="framework" onChange={(e)=>rolesCheck(e,"Framework")}/>

                    <label htmlFor="framework"> Framework</label><br/>
                    {errorMessage && <div className='ml-5 border-2 border-red-400 bg-red-500 rounded font-bold'>{errorMessage}!</div>}
                </div>

                <p className='font-bold my-1'>Assignee:</p>
                <select
                name="Assignee"
                id="Assignee"
                className='p-1  rounded border-2 border-gray-200 w-full '
                onChange = {(event)=>handleOnChange(event,setAssignee)}
                required>
                <option value="" >Select an Assignee</option>
                {assignees.map((assignee)=>(
                    <option key={assignee._id} value={assignee._id}>
                        {assignee.memberName}
                    </option>
                ))}
                </select>

                <div className=
                "flex p-1 w-full text-center rounded mt-3 justify-end">
                    <button
                        className='
                            justify-end
                            w-36
                            h-10
                            bg-red-400
                            border-2
                            rounded
                            border-gray-400
                            text-center
                            font-bold
                            hover:bg-red-100
                            hover:ease-in-out
                            duration-1000s

                            '
                            type="submit"
                    >
                        Submit
                    </button>
                </div>
            </div>
            </form>
        </div>
    </div>
  )
}

TaskForm.propTypes = {
    assignees: PropTypes.array,
    createTask: PropTypes.func,
    toggleForm: PropTypes.func,
}