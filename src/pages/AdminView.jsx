//TODO: Admin view page for TeamMenu page
import React, { useEffect } from 'react'
import Navbar from '../components/common/Navbar'
import { useState } from 'react';
import AdminRow from '../components/Team/AdminRow';
import MemberDeletion from '../components/Team/MemberDeletion';
import axios from 'axios';
import BASE_URL from '../config';import { IoArrowBackOutline } from "react-icons/io5";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

export const AdminViewContext = React.createContext();

export default function AdminView() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState("");
  const [deletedMember, setDeletedMember] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamStatistics, setTeamStatistics] = useState([]);
  const [alert, setAlert] = React.useState(null)


    // fetch team members
    const getTeamMembers = () => {

      axios.get(`${BASE_URL}/api/members`)
        .then((response) => {
            console.log(response.data);
            setTeamMembers(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    // fetch team members
    useEffect(() => {
        getTeamMembers();
    }, []);

    useEffect(() => {
      if (alert) {
        const timer = setTimeout(() => {
          setAlert(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }, [alert]);

    // get tasks of each member
    useEffect(() => {

        let parsedStartDate = dayjs(startDate).format('DD/MM/YYYY')
        let parsedEndDate = dayjs(endDate).format('DD/MM/YYYY')

        if (startDate && endDate) {
            axios.get(`${BASE_URL}/api/allMember/hours?startDate=${parsedStartDate}&endDate=${parsedEndDate}`)
            .then((response) => {
                console.log(response.data);
                setTeamStatistics(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        }

    }, [startDate, endDate]);

    //keep track of date change
    useEffect(() => {
      if (startDate && endDate) {
      console.log(startDate);
      console.log(endDate);
      }
    }, [startDate, endDate]);

    function renderMembers(){
      return(
        teamMembers.map((member) => (
          <AdminRow
            key={member._id}
            setAlert = {setAlert}
            {...member}
            {...teamStatistics.find((stat) => stat._id === member._id)}
            handleDelete={()=>handleDelete(member._id)

            }
          />
        )))
    }

    function handleOnChange(e, setValue) {
      console.log(e);
      setValue(e);
    }

    function handleDelete(_id) {
        console.log(_id);
        setDeletedMember(true)
    }

    return (
      <AdminViewContext.Provider value={{getTeamMembers}}>
        <div className="
                container
                flex
                flex-row
                overflow-x-hidden">
                    <Navbar/>


    <div className="flex flex-col flex-grow">

      {/* Header */}
      <div className="flex  gap-x-7 p-4 border-b-2 border-gray-800">
                    <div className="w-auto font-bold text-3xl">

                    Admin Panel
                    </div>
        <a className='flex bg-rose-500 text-white ml-12 rounded-md px-4 py-2 hover:bg-red-500 duration-500 ease-in-out'
            href = "/adminPanel">
                <IoArrowBackOutline className='mt-0.5 mr-2 text-xl' />
                Back
        </a>

    </div>

      <div className=' flex gap-10 mt-5  ml-2'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className='flex gap-x-2'>
          <DatePicker
            format='DD-MM-YYYY'
            label='Start Date'
            className='bg-slate-50 rounded'
            onChange={(e)=>{
                handleOnChange(e,setStartDate)
            }}/>
        </div>
        <div className='flex gap-x-2'>
          <DatePicker
            format='DD-MM-YYYY'
            label='End Date'
            className='bg-slate-50 rounded'
            minDate={startDate}
            onChange={(e)=>{
                  handleOnChange(e,setEndDate)
              }}/>
        </div>
      </LocalizationProvider>

      </div>
      {deletedMember &&
      <MemberDeletion  />}
      <div className='flex flex-col p-2 mt-5 mr-5 gap-5 '>
        {startDate && endDate &&
        renderMembers()}
      </div>

    </div>
        </div>

      {alert &&
        <Alert className="fixed top-0 left-1/2 transform -translate-x-1/2" severity={alert}>

            {alert === "success" &&
            <p>Password reset successfully</p>}

            {alert === "error" &&
            <p>Password reset unsuccessful</p>}

        </Alert>
      }
      </AdminViewContext.Provider>
  )
}