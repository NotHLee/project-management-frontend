import { Backdrop } from '@mui/material'
import React from 'react'

export default function History(props) {
  const {history} = props;
  return (
    <Backdrop
    open={true}
    >
        <div className='bg-orange-300 rounded-lg w-1/2 overflow-auto' onClick={(e)=>{
            e.stopPropagation()
        }}>
         <div className='flex flex-row justify-between p-4 bg-red-200 rounded-lg text-center '>
                <h1 className='text-2xl font-bold'>History</h1>
                <button className='bg-rose-400 text-white rounded-md px-4 py-2 hover:bg-rose-300 duration-500 ease-in-out'
                onClick={()=>{props.setHistory(false)}}>
                    Close
                </button>  

               
        </div>
        <div className='flex flex-col gap-4 p-4 '>
            <div className='flex flex-row justify-between '>
                <h1 className='text-lg font-bold w-1/2'>Action</h1>
                <h1 className='text-lg font-bold w-1/2'>Date</h1>
            </div>
            {history.map((item,index)=>{
                return(
                    <div className='flex flex-row justify-between' key={index}>
                        <h1 className='text-lg w-1/2'>{item.description}</h1>
                        <h1 className='text-lg w-1/2'>{item.date}</h1>
                    </div>
                )
            })}
            </div>
        </div>
    </Backdrop>
  )
}
