import React, { useEffect, useState } from 'react'
import Navbar from '../components/common/Navbar'
import { BarChart } from '@mui/x-charts'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import BASE_URL from '../config'
import axios from 'axios'
import MemberModify from '../components/Team/MemberModify';
import dayjs from 'dayjs';

export const UserProfileContext = React.createContext();

function UserProfile() {

    const [update, setUpdate] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const _id = sessionStorage.getItem('sessionToken');
    const [user, setUser] = useState({});
    const [userStatistics, setUserStatistics] = useState({
        averageEffort: 0,
        dates: [],
        timeSpent: [],
        totalEffort: 0
    });

    const handleOnChange = (newValue,set) => {
        set(newValue);
        console.log(newValue)
    }

    // fetch user data from backend
    useEffect(() => {
        axios.get(`${BASE_URL}/api/members?memberId=${_id}`)
            .then((response) => {
                console.log(response.data);
                setUser(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [update]);

    // fetch statistics of user from backend
    useEffect(() => {

        if (startDate && endDate) {

            let parsedStartDate = dayjs(startDate).format('DD/MM/YYYY')
            let parsedEndDate = dayjs(endDate).format('DD/MM/YYYY')

            axios.get(`${BASE_URL}/api/member/hours?memberID=${_id}&startDate=${parsedStartDate}&endDate=${parsedEndDate}`)
            .then((response) => {
                console.log(response.data)
                setUserStatistics(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }, [startDate, endDate])

    return (
        <UserProfileContext.Provider value={{user, update, setUpdate}}>
            <div className='flex flex-row'>
                <Navbar/>

                {/* Content */}
                <div className='flex flex-col w-full'>

                    {/* Header */}
                    <div className='flex flex-row justify-between border-b-2 border-black p-4'>
                        <h1 className='text-2xl font-bold'>User Profile</h1>
                        <div className='flex flex-row gap-3'>
                        <MemberModify/>

                        <a className='bg-rose-500 text-white rounded-md px-4 py-2 hover:bg-red-500 duration-500 ease-in-out'
                        href = "/team">
                            Exit From User Profile
                        </a>
                        </div>
                    </div>

                    {/* Upper Body */}

                    <div className='flex gap-9'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <div className='flex flex-row p-4 gap-10'>
                                <DatePicker
                                    format='DD-MM-YYYY'
                                    label='Select Date'
                                    className='bg-slate-50 rounded'
                                    onChange={(e)=>{
                                        handleOnChange(e,setStartDate)
                                    }}/>
                                <DatePicker
                                    format='DD-MM-YYYY'
                                    label='Select Date'
                                    className='bg-slate-50 rounded'
                                    onChange={(e)=>{
                                    handleOnChange(e,setEndDate)}}
                                    minDate={startDate}
                                    />
                            </div>
                        </LocalizationProvider>
                        </div>
                        {/* Member info */}


                        <div className='flex flex-row justify-between p-4 space-x-2 gap-2'>
                        <div className='flex flex-col flex-grow bg-white p-4 gap-2 shadow-xl rounded-xl'>
                            <h1 className='text-2xl font-bold border-b-2 border-black border-spacing-y-4'>Member Info</h1>
                            <h2 className='text-lg'> <strong>Name:</strong> {user.memberName}</h2>
                            <h2 className='text-lg'> <strong>Join Date:</strong> {user.joinDate}</h2>
                            <h2 className='text-lg'> <strong>Access:</strong> {user.access}</h2>
                        </div>

                        {/* Statistics */}
                        <div className='flex flex-col flex-grow bg-white p-4 mb-0 gap-2 shadow-xl rounded-xl'>
                            <h1 className='text-2xl font-bold border-b-2 border-black border-spacing-y-4'>Statistics</h1>
                            <h2 className='text-lg'> <strong>Total time spent:</strong> {userStatistics.totalEffort}</h2>
                            <h2 className='text-lg'> <strong>Average time spent (per day):</strong> {userStatistics.averageEffort}</h2>
                        </div>
                    </div>

                    {/* Lower Body */}
                    <div className='flex flex-grow flex-col bg-white m-4 gap-2 shadow-xl rounded-xl'>

                    <div className='flex flex-row justify-between items-center'>
                        <h1 className='text-2xl font-bold p-4 mx-auto'>Time spent on project</h1>


                    </div>
                        <BarChart
                            xAxis={[{ scaleType: 'band', data: userStatistics.dates, label: 'Dates' }]}
                            series={[{data: userStatistics.timeSpent}]}
                            yAxis={[{label: 'Hours'}]}
                            height={500}
                        />
                    </div>
                </div>
            </div>
        </UserProfileContext.Provider>
    )
}

export default UserProfile
