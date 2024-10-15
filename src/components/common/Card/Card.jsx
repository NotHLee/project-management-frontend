// TODO: Card component that can store many information as its content (should be draggable)
import PropTypes from 'prop-types'
import Tag from '../Tag'
import { IoPricetagsOutline, IoPerson } from 'react-icons/io5'
import { CiSquareCheck } from 'react-icons/ci'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import axios from 'axios'
import BASE_URL from '../../../config'
import { useEffect } from 'react'
import { useState } from 'react'
import TaskView from '../../Task/TaskView'

export default function Card(props) {

    const {
        _id,
        storyPoints,
        tags,
        priority,
        assignee,
        handleDragStart,
        handleDragEnd,
        handleDragOver}
        = props

    const [assigneeName, setAssigneeName] = useState('')

    useEffect(() => {
        axios.get(`${BASE_URL}/api/members?memberId=${assignee}`)
        .then(response => {
            setAssigneeName(response.data.memberName)
        })
        .catch(error => {
            console.log(error)
        })
    }, [assignee])

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: _id,
        data: {
            type: "Card",
            card: props
        }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };


    if(isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className='
                    opacity-40
                    bg-white
                    p-2
                    h-48
                    w-64
                    min-h-48
                    rounded-xl
                    border-2
                    border-rose-500
                    cursor-grab
                    relative
            '>
            </div>
        );
    }

    return (
        <div
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            ref={setNodeRef}
            style = {style}
            {...attributes}
            {...listeners}
            className='
                    flex
                    flex-col
                    bg-white
                    p-4
                    w-64
                    h-48
                    rounded-xl
                    hover:ring
                    ring-inset
                    ring-rose-500
                    shadow-lg
                    hover:scale-105
                    ease-in-out
                    duration-300

                    gap-2
                    cursor-grab
        '>
            {/* Card header */}
            <TaskView key={_id} {...props}/>

            {/* Card body */}
            <div className=''>
            <div className='flex flex-wrap'>
                <Tag key={1} nameTag={priority} priority={true} />
                <Tag key={2} nameTag={storyPoints} priority={false} extraText="pts" Logo={CiSquareCheck} />

            </div>
            <div >
            <Tag key={3} nameTag={tags} Logo={IoPricetagsOutline} Multiple={true}/>
            </div>


            {/* Card footer */}
            <div className='flex flex-row self-start items-center space-x-2'>
                <IoPerson className='size-4 items ml-1'/>
                <p className='font-semibold text-'>{assigneeName}</p>
            </div>
            </div>
        </div>
    )

}

    Card.propTypes = {
        _id: PropTypes.string,
        taskName: PropTypes.string,
        storyType: PropTypes.string,
        storyPoints: PropTypes.number,
        tags: PropTypes.array,
        priority: PropTypes.string,
        assignee: PropTypes.string,
        status: PropTypes.string,
        description: PropTypes.string,
        progress: PropTypes.string,
        creationDate: PropTypes.string,
        viewTask: PropTypes.func,
        handleDragStart: PropTypes.func,
        handleDragEnd: PropTypes.func,
        handleDragOver: PropTypes.func
    }


