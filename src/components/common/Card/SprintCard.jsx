// TODO: Card component that can store many information as its content (should be draggable)
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Tag from '../Tag'
import { IoPricetagsOutline, IoPerson } from 'react-icons/io5'
import { CiSquareCheck } from 'react-icons/ci'
import { useSortable } from '@dnd-kit/sortable'
import {CSS} from "@dnd-kit/utilities"

export default function SprintCard(props) {

  const {
    id,
    task,
    taskName,
    storyType,
    storyPoints,
    tags,
    priority,
    assignee,
    status,
    description,
    progress,
    // viewTask
    } = props

    const [mouseIsOver, setMouseIsOver] = useState(false)
    const {setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable({
        id: id,
        data:{
            type: "SprintCard",
            task,
            
        }
    })


    

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    if(isDragging){
        return <div 
        ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
        className='
        bg-white
        p-2
        w-64
        rounded-xl
        border-2
        border-rose-300
        h-44
        opacity-35
        
        '/>
    }



  return (
    <div
    className='
    flex
    flex-col
    bg-white
    p-2
    w-64
    max-h-44
    h-auto
    rounded-xl
    hover:ring
    ring-inset
    ring-rose-100
    hover:shadow-lg
    hover:scale-105
    ease-in-out
    duration-300
    justify-center
    '
    ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
    >
      <div
        // onClick={() => viewTask(props)}
        className='
          font-bold
          text-center
          p-2
          text-lg
          cursor-pointer'
          

          >
        <h1>
        {taskName}
        </h1>
      </div>

      <div className='flex flex-wrap'>
            <Tag nameTag={priority} priority={true} />
            <Tag nameTag={storyPoints} priority={false} extraText="pts" Logo={CiSquareCheck} />
            <Tag nameTag={tags} Logo={IoPricetagsOutline} Multiple={true}/>
           
            <Tag nameTag={assignee} Logo={IoPerson}/>
        </div>
    </div>

  )
}

SprintCard.propTypes = {
  id: PropTypes.number,
  taskName: PropTypes.string,
  storyType: PropTypes.string,
  storyPoints: PropTypes.string,
  tags: PropTypes.array,
  priority: PropTypes.string,
  assignee: PropTypes.string,
  status: PropTypes.string,
  viewTask: PropTypes.func,
}


