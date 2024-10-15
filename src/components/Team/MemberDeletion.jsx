import React, { useCallback, useEffect, useState } from 'react'
import { Backdrop, Container} from '@mui/material'
import Slider from "react-slick";
import TaskModifyAssignee from './TaskModifyAssignee';
import axios from 'axios'
import BASE_URL from '../../config'
import { MdDelete } from "react-icons/md";
import DeletionConfirmation from './DeletionConfirmation';
import { AdminViewContext } from '../../pages/AdminView';

export const MemberDeletionContext = React.createContext()

export default function MemberDeletion(props) {

    const { memberId} = props
    const { getTeamMembers } = React.useContext(AdminViewContext)

    // use GET api to fetch tasks
    const [tasks, setTasks] = useState([])

    const getTasks = useCallback(() => {

        console.log("!")

        axios.get(`${BASE_URL}/api/tasks/member?memberID=${memberId}`)
            .then(response => {setTasks(response.data.tasks)})
            .catch(error => console.log(error))
    }, [memberId])

    // use GET api to fetch members
    const [remainingMembers, setRemainingMembers] = useState([])

    const getRemainingMembers = useCallback(() => {
        axios.get(`${BASE_URL}/api/members/remaining_members?memberId=${memberId}`)
            .then(response => setRemainingMembers(response.data))
            .catch(error => console.log(error))
    }, [memberId])

    const fetchData = () => {
        getTasks();
        getRemainingMembers();
    };

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {

        // Fetch data initially
        fetchData();

        // Set interval to fetch data every 5 seconds (5000 milliseconds)
        const intervalId = setInterval(fetchData, 5000);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, [getTasks, getRemainingMembers]);

    // updatedTasks is used to store the updated tasks from TaskModifyAssignee
    const [updatedTasks, setUpdatedTasks] = useState([])

    // handle backdrop opening and closing state
    const [open, setOpen] = useState(false)

    // handle which modal to show
    const [modal, setModal] = useState(1)

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const handleClose = () => {
        setOpen(false)
        setModal(1)
        setUpdatedTasks([])
    }

    return (
        <MemberDeletionContext.Provider value={{open, handleClose, setModal, memberId, updatedTasks, setUpdatedTasks, tasks, removeMember}}>
            <>
            <button onClick={() => setOpen(true)}>
                <MdDelete className='text-2xl hover:bg-red-400 rounded  ease-in-out duration-500'/>
            </button>

                <Backdrop
                    open={open}
                    onClick={() => handleClose()}
                >
                {modal === 1 &&
                    <DeletionConfirmation  onClick={e => e.stopPropagation()}/>
                }

                {modal === 2 &&
                    <Container
                        className='items-center flex-col justify-center flex gap-y-4'
                        maxWidth='lg'
                        onClick={e => e.stopPropagation()}
                    >

                    <button
                        onClick={() => handleClose()}
                        className="bg-red-500 text-black font-bold py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-200"
                    >
                        Cancel
                    </button>

                        <Slider
                            {...sliderSettings}
                            className='w-full'

                        >
                            {tasks.map((task) => (
                                <TaskModifyAssignee
                                    key={task._id}
                                    members={remainingMembers}
                                    task={task}
                                    backdrop = {open}
                                />
                            ))}
                        </Slider>

                        {/* Only show delete button if all tasks are reassigned */}
                        {updatedTasks.length === tasks.length ?
                            <button
                                className='flex bg-red-500 text-white p-2 rounded-lg self-center mx-auto my-8'
                                onClick={deleteMember}>
                                Delete
                            </button>
                        :
                            <p className=' text-3xl bg-red-400 p-1 rounded font-semibold'>Cannot delete member until all tasks are reassigned</p>
                        }

                    </Container>}
                </Backdrop>
            </>
        </MemberDeletionContext.Provider>
    )

    function removeMember(memberId) {
        axios.delete(`${BASE_URL}/api/members?memberId=${memberId}`)
        .then(response => {
            console.log(response)
            getTeamMembers()
            getRemainingMembers()
        })
        .catch(error => console.log(error))
    }

    async function deleteMember() {

        handleClose()

        let adminId = sessionStorage.getItem('sessionToken')

        // only include assignee and _id in updatedTasks
        let parsedUpdatedTasks = updatedTasks.map(task => {
            return {
                _id: task._id,
                assignee: task.assignee
            }
        })

        // use DELETE api to delete member
        removeMember(memberId)

        axios.patch(`${BASE_URL}/api/tasks?memberId=${adminId}`, parsedUpdatedTasks)
            .then(response => {
                console.log(response)
                getTasks()
            })
            .catch(error => console.log(error))
    }
}
