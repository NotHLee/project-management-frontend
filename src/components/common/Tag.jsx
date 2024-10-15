//TODO: Some tag component that can be attached to other components to show some information
import React from 'react'

export default function Tag(props) {
  const {title,extraText,nameTag,priority,Logo, Multiple} = props
  //title- stands for "StoryPoints:
  //extraText- 8 "pts" pts is the extra text
  // nameTag - Story, Low, High
  //priority - (boolean) if true it will render a different kind of tag
  //Logo - if need to add a logo then just add it as props and it will render
  //Multiple- nameTag (prop) is a list

  const priorityColour =(name) =>{
    let bgColour;
    if (name === "Low"){
      bgColour = "bg-priority-low "
    }else if(name === "Medium"){
      bgColour = "bg-priority-medium"

    }else if(name === "Important"){
      bgColour = "bg-priority-high"

    }else if (name === "Urgent"){
      bgColour = "bg-priority-urgent"
    }
    return bgColour
  }

  const logoExists = () =>{
    if (Logo){
      return(<Logo className="text-xl mr-1"/>)
    }
  }

  const titleExists  =() =>{
    if (title){
      return(
      <p className='font-bold mr-1'>
      {title}:
      </p>)
    }
  }
  const check = ()=>{
    if (priority){
      return(
        <div className={`${priorityColour(nameTag) } mx-1 rounded p-0.5 text-white font-bold`}>
         {nameTag}
        </div>
      )
    }
    else if(Multiple){
      return(
      <>
      <div className='flex flex-row rounded p-0.5 gap-2 overflow-hidden h-10 items-center'>
        {titleExists()}
        {nameTag.slice(0,2).map((
          item,index) =>(

            <div key={index} className='flex  bg-slate-200 rounded p-1 h-7'>
                  {logoExists()}<p className='text-sm ml-1'>{item}</p>

          </div>

        ))}
        </div>

      {nameTag.length > 2 ?
        <p className='opacity-50 flex self-start text-sm'>... {nameTag.length - 2} more</p>
        :
        <p className='opacity-0 flex self-start text-sm'>dummy</p>
      }
      </>

      )
    }
    else{
      return(
      <div className='border flex rounded mx-1 p-0.5 bg-slate-200'>
        {logoExists()}

        {titleExists()}
        {nameTag}
        <p className='ml-1 mr-1'>
        {extraText }
        </p>

      </div>)
    }
  }
  return (
    <div className='text-s p-0.5 '>

      {check()}
    </div>
  )
}
