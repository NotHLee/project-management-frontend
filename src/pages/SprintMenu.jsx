//TODO: Sprint Menu page to display all sprints in a list
import { IoIosAddCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import SprintRow from "../components/Sprint/SprintRow";
import Navbar from "../components/common/Navbar";
import SprintForm from "../components/Sprint/SprintForm";
import axios from "axios";
import { useLocation } from "react-router-dom";
import BASE_URL from "../config";

function SprintMenu() {

    const [sprints, setSprints] = useState([]);
    const location = useLocation();

    function deleteSprint(_id){

        axios.delete(`${BASE_URL}/api/sprints`, {data: {_id: _id}})
            .then((response) => {
                console.log(response)
                getSprint()
            })
            .catch((error) => {
                console.log(error)
            })

    }

    const [showSprintForm, setShowSprintForm] = useState(false);

    const getSprint = () => {
        axios.get(`${BASE_URL}/api/sprints`)
        .then((response) => {
            setSprints(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getSprint()
    }, [location])

    return(

        <>
        {/* Conditionally render create sprint form on toggle */}
        {showSprintForm && createPortal(
            <SprintForm createSprint={createSprint} toggleForm={toggleSprintForm} modifySprint={false}/>,
            document.getElementById('portal-root'))}

        {/* Sprint menu container */}
        <div className="
            container
            flex
            min-h-screen
        ">

            {/* Left side / Navbar */}
            <Navbar/>

            {/* Right side / Content */}
            <div className="flex flex-col p-5 w-screen">

                {/* Header */}
                <div className="flex flex-row h-max w-full justify-between">

                    {/* Header text */}
                    <h1 className="text-4xl font-bold mb-5">Sprint Backlog</h1>

                    {/* Button to create new sprint */}
                    <button
                        onClick={toggleSprintForm}
                        className="
                            h-max
                            w-max
                            cursor-pointer
                            rounded-lg
                            bg-primaryColor
                            border-2
                            border-secondaryColor
                            p-4
                            ring-rose-500
                            hover:ring-2
                            hover:ring-inset
                            flex
                            items-center
                            gap-2
                            font-semibold
                            ">
                                <IoIosAddCircleOutline/>
                                Create New Sprint
                        </button>
                </div>

                {/* Divider */}
                <hr className="border-t-2 border-gray-300 w-full" />

                {/* Rows representing sprint */}
                <div className="flex flex-col gap-4 mt-4 ">
                    {sprints.map((sprint) => (
                        <SprintRow key={sprint._id} {...sprint} deleteSprint={deleteSprint}/>
                    ))}
                </div>
            </div>
        </div>
        </>
    )

    function toggleSprintForm() {
        setShowSprintForm(prevShowSprintForm => !prevShowSprintForm);
    }

    function createSprint({sprintName, startDate, endDate}) {

        // Convert yyyy-mm-dd strings to Date objects
        startDate = new Date(startDate);
        endDate = new Date(endDate);

        // Parse dates to MM-DD-YYYY format
        const formatDate = (date) => {
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        };

        startDate = formatDate(startDate);
        endDate = formatDate(endDate);

        // make a post request to the backend to retrieve sprint with the given id, status and tasks
        axios.post(`${BASE_URL}/api/sprints`, {
            sprintName: sprintName,
            startDate: startDate,
            endDate: endDate
        }).then((response) => {
            console.log(response.data)
            getSprint()
        }).catch((error) => {
            console.log(error)
        })

    }
}

export default SprintMenu;

