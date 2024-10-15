import PropTypes from 'prop-types';
import React from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import BurndownChartModal from './BurndownChartModal';
import { Backdrop } from '@mui/material';
import SprintForm from './SprintForm';
import { Tooltip } from '@mui/material';
import { SprintMenuContext } from '../../pages/SprintMenu';
import SprintModifyForm from './SprintModifyForm';

function SprintRow({_id, sprintName, startDate, endDate, status, deleteSprint}) {


    const priorityColour =(name) =>{

        let bgColour;

        if (name === "Not Started"){
          bgColour = "bg-red-500"
        }

        else if(name === "In Progress"){
          bgColour = "bg-orange-400"
        }

        else if(name === "Completed"){
          bgColour = "bg-blue-500"
        }

        return bgColour
      }

    const renderButton = () =>{

      if (status == "Not Started" ){
        return (
          <div className='flex gap-2 items-center'>

            <BurndownChartModal _id={_id}/>

            <Tooltip title='Delete Sprint' arrow>
            <button onClick={()=>{
              deleteSprint(_id);
              }}>
              <MdDeleteOutline className='text-4xl p-1 rounded hover:ring-2 hover:ring-rose-500 ease-in-out duration-500'/>
            </button>
            </Tooltip>

            <SprintModifyForm _id={_id} sprintName={sprintName} startDate={startDate} endDate={endDate}/>
          </div>
        )
      }

      else{
        return (
          <div>
            <BurndownChartModal _id={_id}/>
        </div>
        )
      }
    }

    const renderPage = () =>{
      let page = "/sprint";
      if (status === "Not Started"){
        page = `/sprintPlanning/${_id}/${sprintName}/${startDate}/${endDate}`

      }
      else {
        page = `/sprintDashboard/${_id}/${status}/${sprintName}/${startDate}/${endDate}`
      }

      return page

    }

    const progress = () =>{
      let min;
      let max;
      let value
      if (status === "Not Started"){
        min = 0
        max =0
        value =0

      }
      else if (status === "In Progress"){
        let startDates = new Date(startDate)
        let endDates = new Date(endDate)

        let currentDate = new Date()
        const totalDays = endDates-startDates
        const currentProgress = currentDate - startDates

        min = 0
        max= 100
        value = Math.min(Math.max((currentProgress / totalDays) * 100, 0), 100);



      }
      else if(status === "Completed"){
        min = 0
        value = 100
        max = 100

      }
      return (<progress id="progress"
        className="w-full [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg
         [&::-webkit-progress-bar]:bg-slate-300
         [&::-webkit-progress-value]:bg-red-400
         [&::-moz-progress-bar]:bg-red-400"

         min={min}
         value={value}
         max={max}

        />)
    }

    return (
    <>
    <div className=

    ' hover:scale-100 scale-95 ease-in-out duration-500 overflow-y-hidden overflow-x-hidden'>

          <div
          className ="bg-primaryColor
                                  w-full
                                  h-[100px]

                                  rounded-md
                                  flex
                                  flex-row



                                  " >

          <div className=' p-2 border-2 w-5/6 h-full bg-slate-100 border-transparent rounded '>


              <div className='flex flex-row gap-x-8 text-xl font-bold mb-1 w-full '>

                  <div className='w-5/6'>
                  <Tooltip title='View Sprint' arrow placement='right'>
                    <a href ={renderPage()} >
                    {sprintName}
                    </a>
                  </Tooltip>
                  </div>

                  <div className=' w-1/6 flex justify-end gap-2'>

                      {renderButton()}

                  </div>
              </div>


              <div className='flex-col '>
                <p>Start Date: {startDate}</p>
                <p>End Date: {endDate}</p>

              </div>
          </div>


          <div className={`flex ${priorityColour(status)} rounded w-3/6 text-center font-bold justify-center items-center`}>
              <p>{status}</p>


          </div>


          </div>
          <div className='h-auto text-s bg-yellow-400 rounded-b-md flex flex-row w-full self-center '>
                      <div className='ml-1 font-bold'>
                        Time Left:
                      </div>
                      <div className='w-11/12  ml-2 p-1 border-blue h-full' >
                          {progress()}
                      </div>
          </div>




    </div>
    </>
    )
}

export default SprintRow;

SprintRow.propTypes = {
    _id: PropTypes.string,
    sprintName: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    status: PropTypes.string,
    tasks: PropTypes.array,
    deleteSprint: PropTypes.func,
    updateSprint: PropTypes.func
}
