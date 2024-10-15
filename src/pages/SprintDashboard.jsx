import { DndContext,
    DragOverlay,
    useSensor,
    PointerSensor,
    useSensors,
    closestCorners } from "@dnd-kit/core";
import Navbar from "../components/common/Navbar";
import Column from "../components/Sprint/Column";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Card from "../components/common/Card/Card";
import { arrayMove } from "@dnd-kit/sortable";
import TaskView from "../components/Task/TaskView";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../config";
export default function SprintDashboard()   {

    const params = useParams()

    const navigate = useNavigate()

    const isSprintEnd = params.status === "Completed" ? true : false

    const [tasks, setTasks] = useState([]);

    const [columns, setColumns] = useState([
        {
            headerText: 'Not Started',
            headerStyle: ['bg-black', 'text-white']
        },
        {
            headerText: 'In Progress',
            headerStyle: ['bg-blue-500', 'text-black']
        },
        {
            headerText: 'Completed',
            headerStyle: ['bg-red-500', 'text-black']
        }
    ]);

    const[ activeCard, setActiveCard] = useState(null);

    const [taskInView, setTaskInView] = useState(null);

    const [sprintEnd, setSprintEnd] = useState(null)

    // function to get all tasks of a specific sprint based on sprint id
    const getTasks = () => {
        axios.get(`${BASE_URL}/api/sprints/tasks?sprintID=${params._id}`)
        .then((response) => {
            console.log(response.data)
            setTasks(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const forceEnd = () => {

        console.log(params._id, tasks)

        axios.patch(`${BASE_URL}/api/sprints/force_end?sprintID=${params._id}`)
        .then((response) => {
            console.log(response.data)
            getTasks()
            setSprintEnd(true)
        }).then(() => {
            navigate('/sprint')
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const updateTask = (task) => {

        axios.patch(`${BASE_URL}/api/sprints/tasks`, [task])
        .then((response) => {
            console.log(response.data)
            getTasks()
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getTasks()
    }, [])

    //updates when sprint status changes
    useEffect(() =>{
        //status get from the sprint status
        if(params.status === "Completed"){
            setSprintEnd(true)
        }else{
            setSprintEnd(false)
        }
    },[params.status])

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3,
            },
        })
    );

    return (
        <>

        {/* Content of page */}
        <div className="
            container
            flex
            flex-row
            overflow-x-hidden
            ">

            {/* Navbar / Left side of screen*/}
            <Navbar/>

            {/* Content / Right side of screen */}
            <div className="flex flex-col flex-grow">

                {/* Header */}
                <div className="flex gap-x-7 p-4 border-b-2 border-gray-800">
                    <div className="w-auto font-bold text-3xl">
                    {params.sprintName} Dashboard
                    </div>

                    <div className="w-auto flex gap-x-10 ">
                    <a href = "/sprint">
                    <button
                    className='
                        flex
                        gap-2
                        w-fit
                        items-center
                        justify-center
                        text-center
                        border-r-emerald-200
                        bg-lime-400
                        border-4
                        rounded-md
                        p-2
                        hover:bg-transparent
                        ease-in-out
                        duration-500
                        font-medium
                        text-xl
                    '

                    >
                        Back to Sprint Menu
                    </button>
                    </a>

                    {/* Render this only if sprint is not complete */}
                    {!isSprintEnd &&
                        <button
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
                        '
                        onClick={forceEnd}

                        >
                        Force End
                    </button>

                    }
                    </div>
                    <div className="flex flex-col font-semibold ">
                        <p>Start Date: {params.startDate}</p>
                        <p>End Date: {params.endDate}</p>
                    </div>

                </div>

                {/* Three columns representing Not Started, In Progress, Complete */}
                {!sprintEnd &&
                <DndContext
                    sensors={sensors}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    collisionDetection={closestCorners}
                >
                    <div className="
                        flex-shrink-0
                        flex
                        h-screen
                        gap-x-14
                    ">
                        {columns.map(column => (
                            <Column
                                key={column.headerText}
                                headerText={column.headerText}
                                headerStyle={column.headerStyle}
                                viewTask={viewTask}
                                tasks={tasks.filter(task => task.status === column.headerText)}
                            />
                        ))}
                    </div>

                    {createPortal(
                        <DragOverlay>
                            {activeCard && (<Card {...activeCard} />)}
                        </DragOverlay>,
                        document.body
                    )}
                </DndContext>}

                {taskInView && createPortal(
                    <TaskView {...taskInView} exitViewTask={exitViewTask} sprint={true}/>
                    ,document.body
                )}

                {sprintEnd &&
                    <div className="flex-shrink-0 flex
                    h-screen
                    gap-x-14">
                    {columns.map(column => (
                        <Column
                            key={column.headerText}
                            headerText={column.headerText}
                            headerStyle={column.headerStyle}
                            viewTask={viewTask}
                            tasks={tasks.filter(task => task.status === column.headerText)}
                        />
                    ))}
                </div>
                }


            </div>
        </div>
        </>
    )

    function handleDragStart(event) {

        // set the active card to the card being dragged
        setActiveCard(event.active.data.current.card);

    }

    function handleDragEnd(event) {

        const {active} = event;

        // update the task in database
        updateTask(active.data.current.card);

        // reset active card to null
        setActiveCard(null);

    }

    function handleDragOver(event) {

        const {active, over} = event;

        console.log(active, over);

        // return if it is not being dragged over anything
        if (!over) return;

        // return if it is on top of the same card
        if (active.id == over.id) return;

        // boolean value to check if the card is being dragged over a column/card
        const isActiveACard = active.data.current.type == "Card";
        const isOverACard = over.data.current.type == "Card";

        if (!isActiveACard) return;

        // dropping a card over another card
        if (isActiveACard && isOverACard) {
            setTasks(tasks => {
                const activeIndex = tasks.findIndex(task => task._id === active.id);
                const overIndex = tasks.findIndex(task => task._id === over.id);

                tasks[activeIndex].status = tasks[overIndex].status;

                return arrayMove(tasks, activeIndex, overIndex);
            });
        }

        const isOverAColumn = over.data.current.type == "Column";

        // dropping a card over a column
        if (isActiveACard && isOverAColumn) {
            setTasks(tasks => {
                const activeIndex = tasks.findIndex(task => task._id === active.id);

                tasks[activeIndex].status = over.id;

                return arrayMove(tasks, activeIndex, activeIndex);
            });
        }
    }

    function viewTask(task){
        setTaskInView(task);
    }

    function exitViewTask(){
        setTaskInView(null);
    }
}