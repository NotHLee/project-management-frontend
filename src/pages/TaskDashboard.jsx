import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../components/common/Navbar";
import Card from "../components/common/Card/Card";
import { MdAddToPhotos } from "react-icons/md";
import { RiSortDesc } from "react-icons/ri";
import { BiSort } from "react-icons/bi";
import TaskForm from "../components/Task/TaskForm";
import { createPortal } from "react-dom";
import axios from "axios";
import BASE_URL from "../config";

export const TaskContext = React.createContext();

export default function TaskDashboard() {

    const [tasks, setTasks] = useState([]);
    const [taskForm, setTaskForm] = useState(false);
    const [sort, setSort] = useState({keyName: 'creationDate', reverse: false});
    const [assignees, setAssignees] = useState([]);
    const [update, setUpdate] = useState(false);

    const getTasks = () => {
        axios.get(`${BASE_URL}/api/tasks?keyName=${sort.keyName}&reverse=${sort.reverse}`)
            .then(response => {

                // filter out all tasks that are in sprints (sprint == null)
                response.data = response.data.filter(task => task.sprint === null);

                console.log(response.data)

                setTasks(response.data)
            })
            .catch(error => console.log(error));
    }

    const renderTaskCards = () =>{

        return(
            tasks.map((task) =>(
                <Card key={task._id} {...task}/>
            ))
        )
    }

    // rerender the tasks when we sort and modify tasks
    useEffect(() => {
        getTasks()
    }, [sort, update]);

    const handleSort = (keyName) => {
        setSort(prevSort => ({
            keyName: keyName,
            reverse: prevSort.keyName === keyName ? !prevSort.reverse : false
        }));
    };

    const getAssignees = useCallback(async () => {
        const response = await axios.get(`${BASE_URL}/api/members`);
        return response.data;
    }, []);

    useEffect(() => {
        getAssignees().then(data => setAssignees(data));
    }, [getAssignees]);

    return (
        <TaskContext.Provider value={{assignees, updateTask, deleteTask, update}}>
            <div className="flex">
                <Navbar/>
                <div className="p-4 h-screen w-screen ">
                    <div className="">
                        <h1 className="text-3xl font-bold">Task Dashboard</h1>
                        <hr className="border-b-1 border-gray-800 my-4"/>
                    </div>
                    <div className="flex mb-4">
                        <button onClick={toggleForm} className="task-dashboard-buttons">
                            <MdAddToPhotos className="mt-1 mr-1"/>
                            New Task
                        </button>
                        <button onClick={() => handleSort("priority")} className="task-dashboard-buttons"><RiSortDesc className="mt-1 mr-1" />Sort by Priority</button>
                        <button onClick={() => handleSort("creationDate")} className="task-dashboard-buttons"><BiSort className="mt-1 mr-1"/>Sort By Date</button>
                    </div>

                    <div className="flex flex-wrap justify-start gap-3">
                        {renderTaskCards()}
                    </div>

                    {taskForm && createPortal(
                        <TaskForm assignees={assignees} createTask={createTask} toggleForm={toggleForm}/>
                        ,document.getElementById('portal-root')
                    )}

                </div>
            </div>
        </TaskContext.Provider>
    );

    function createTask(task) {

        let memberId = sessionStorage.getItem('sessionToken');

        // retrieve the task from the server with id
        axios.post(`${BASE_URL}/api/tasks?memberID=${memberId}`, task)
            .then(response => {

                // update the tasks in our state
                setTasks([...tasks, response.data])
            })
            .catch(error => console.log(error))
    }

    function toggleForm(){
        setTaskForm(prev => !prev);
    }

    function deleteTask(_id){

        axios.delete(`${BASE_URL}/api/tasks`, {data: {_id}})
            .then(() => {setUpdate(prev => !prev)})
            .catch(error => console.log(error))
    }

    function updateTask(task){

        const memberId = sessionStorage.getItem('sessionToken');

        axios.patch(`${BASE_URL}/api/tasks?memberId=${memberId}`, [task])
            .then(response => console.log(response))
            .then(
                setTimeout(() => setUpdate(prev => !prev), 500)
            )
            .catch(error => console.log(error))
    };

}
