import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import { RxCross2 } from "react-icons/rx";
import BASE_URL from '../../config';
import axios from 'axios';

function LogTime(props) {
   const {closeLogTime, updateLogTime, taskID} = props;
   const [hours, setHours] = React.useState(0);
   const [minutes, setMinutes] = React.useState(0);

      function onSubmit(e){
        e.preventDefault()

        // parse hours and minutes to HH:MM
        const pad = (num) => String(num).padStart(2, '0');

        axios.post(`${BASE_URL}/api/logTime`,{
          taskID: taskID,
          memberID: sessionStorage.getItem('sessionToken'),
          hours: `${pad(hours)}:${pad(minutes)}`
        })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })

        updateLogTime(hours, minutes)
        closeLogTime()
    }

  return (
    <>
        <form onSubmit={onSubmit}>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={true}>
                <div className='p-4 border-2 w-fit gap-y-5 bg-yellow-100 text-black font-semibold rounded'>
                    <div className='flex justify-end pr-2'>
                        <button className=' p-1 hover:bg-amber-200 rounded border-e-slate-500'
                        onClick={closeLogTime}>
                        <RxCross2 />
                        </button>
                    </div>


                    <div className='flex gap-2 p-2 '>
                        <input type="number" min={0}  className='w-20 rounded border-2 border-gray-600' onChange={(event)=>setHours(event.target.value)}/>
                          <p>hours</p>
                        <input type="number" min={0} max={60}className='w-20 rounded border-2 border-gray-600' onChange={(event)=>setMinutes(event.target.value)}/>
                          <p>mins</p>
                    </div>

                    <div className='flex mt-4 justify-end '>

                          <button className='border-2 p-2 bg-red-400 border-red-300 hover:bg-red-300 rounded-lg ease-in-out duration-300'
                          type="submit">
                              Update Time
                          </button>
                    </div>
                </div>
            </Backdrop>
        </form>
    </>
  )
}

export default LogTime
