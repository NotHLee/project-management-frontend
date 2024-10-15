//TODO: Create a button component that will be used in the application
import React from 'react'

export default function Button(props) {
  const {title,Logo, onClick} = props
  
  
  return(
    
    <div 
    className='border-4  h-4/5 border-red-300 bg-red-400 w-1/3 hover:bg-red-200 rounded-lg ease-in-out duration-500'
    onClick={onClick}>
      
      <div className='w-full h-full flex items-center justify-center cursor-pointer'>
        <button className='flex flex-col items-center gap-2'>
        <Logo  className='text-6xl'/>
          <p className='text-3xl font-bold'>{title}</p>
        </button>
      </div>
   
    </div>
  )

}
