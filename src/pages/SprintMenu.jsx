//TODO: Sprint Menu page to display all sprints in a list
import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import SprintRow from "../components/Sprint/SprintRow";
import Navbar from "../components/common/Navbar";
import SprintForm from "../components/Sprint/SprintForm";
import axios from "axios";
import { useLocation } from "react-router-dom";
import BASE_URL from "../config";
import { Alert } from "@mui/material";
import SprintCreateForm from "../components/Sprint/SprintCreateForm";

export const SprintMenuContext = React.createContext();

function SprintMenu() {

    const [sprints, setSprints] = useState([]);
    const [alert, setAlert] = useState(null);
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

    const getSprint = () => {
        axios.get(`${BASE_URL}/api/sprints`)
        .then((response) => {
            setSprints(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const updateSprint = (_id, sprintName, startDate, endDate) => {

        // parse yyyy-mm-dd to dd-mm-yyyy
        let parsedStartDate = startDate.split('-').reverse().join('-');
        let parsedEndDate = endDate.split('-').reverse().join('-');

        axios.patch(`${BASE_URL}/api/OneSprint?_id=${_id}`, {
            sprintName: sprintName,
            startDate: parsedStartDate,
            endDate: parsedEndDate,
        }).then(response => {
            console.log(response.data);
            setAlert('success-modify')
        }).catch(error => {
            setAlert('error-modify');
            console.log(error);
        });

    }

    async function isStartDateValid (_id, startDate, endDate) {

        // parse yyyy-mm-dd to dd-mm-yyyy
        const parsedStartDate = startDate.split('-').reverse().join('-');
        const parsedEndDate = endDate.split('-').reverse().join('-');

        try {
            const res = await axios.get(`${BASE_URL}/api/sprints/date?_id=${_id}&startDate=${parsedStartDate}&endDate=${parsedEndDate}&forceStart=false`);
            console.log(res.data);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }

    }

    useEffect(() => {
        getSprint()
    }, [location, alert])

    useEffect(() => {
        if (alert) {
          const timer = setTimeout(() => {
            setAlert(false);
          }, 3000);
          return () => clearTimeout(timer);
        }
      }, [alert]);

    return(

        <SprintMenuContext.Provider value={{
            isStartDateValid,
            deleteSprint,
            updateSprint,
            createSprint,
            }}>
        <>

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
                    <SprintCreateForm/>
                </div>

                {/* Divider */}
                <hr className="border-t-2 border-gray-300 w-full" />

                {/* Rows representing sprint */}
                <div className="flex flex-col gap-4 mt-4 ">
                    {sprints.map((sprint) => (
                        <SprintRow
                            key={sprint._id}
                            {...sprint}
                            deleteSprint={deleteSprint}
                        />
                    ))}
                </div>
            </div>
        </div>

        {alert === 'success-modify' &&
        <Alert
        severity="success"
        className="fixed top-0 left-1/2 transform -translate-x-1/2" >
            Sprint modified successfully!
        </Alert>
        }

        {alert === 'error-modify' &&
        <Alert severity="error"
            className="fixed top-0 left-1/2 transform -translate-x-1/2" >
            Sprint could not be modified!
            </Alert>
        }

        {alert === 'success-create' &&
        <Alert
        severity="success"
        className="fixed top-0 left-1/2 transform -translate-x-1/2" >
            Sprint created successfully!
        </Alert>
        }

        {alert === 'error-create' &&
        <Alert severity="error"
            className="fixed top-0 left-1/2 transform -translate-x-1/2" >
            Sprint could not be created!
            </Alert>
        }
        </>
        </SprintMenuContext.Provider>
    )

    function createSprint(sprintName, startDate, endDate) {

        // parse yyyy-mm-dd to dd-mm-yyyy
        let parsedStartDate = startDate.split('-').reverse().join('-');
        let parsedEndDate = endDate.split('-').reverse().join('-');

        // make a post request to the backend to retrieve sprint with the given id, status and tasks
        axios.post(`${BASE_URL}/api/sprints`, {
            sprintName: sprintName,
            startDate: parsedStartDate,
            endDate: parsedEndDate
        }).then((response) => {
            console.log(response.data)
            setAlert('success-create')
        }).catch((error) => {
            console.log(error)
            setAlert('error-create')
        })
    }
}

export default SprintMenu;

