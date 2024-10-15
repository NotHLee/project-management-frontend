//TODO: Task Card component that can store information about a task
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export default function TaskCard(props) {

  const { content, id, columnId, deleteTask, updateTask} = props

  const [mouseIsOver, setMouseIsOver] = useState(false)
  const [editMode, setEditMode] = useState(false)

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging }
    = useSortable({
        id: id,
        data: {
            type: "Task",
            props
        },
        disabled: editMode,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    };


  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
};

if(isDragging) {
    return (
        <div
            ref={setNodeRef}
            style={style}
            className='
                opacity-30
                bg-primaryColor
                p-2.5
                h-[100px]
                min-h-[100px]
                items-center
                flex
                text-left
                rounded-xl
                border-2
                border-rose-500
                cursor-grab
                relative
                task
        '>
        </div>
    );
}

if(editMode) {
    return (
        <div
            ref = {setNodeRef}
            style = {style}
            {...attributes}
            {...listeners}
            className='
                bg-primaryColor
                p-2.5
                h-[100px]
                min-h-[100px]
                items-center
                flex
                text-left
                rounded-xl
                hover:ring-2
                hover:ring-inset
                hover:ring-rose-500
                cursor-grab
                relative'>
            <textarea
                value={content}
                autoFocus
                placeholder="Task content here"
                onBlur={toggleEditMode}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.shiftKey) toggleEditMode();
                }}
                onChange={e => updateTask(id, e.target.value)}
                className='
                    h-[90%]
                    w-full
                    resize-none
                    border-none
                    rounded
                    bg-transparent
                    text-black
                    focus:outline-none'>
            </textarea>
        </div>
    )
};

  return (
    <div
        ref = {setNodeRef}
        style = {style}
        {...attributes}
        {...listeners}
        onClick={toggleEditMode}
        onMouseEnter = {() => setMouseIsOver(true)}
        onMouseLeave = {() => setMouseIsOver(false)}
        className='
            bg-primaryColor
            p-2.5
            h-[100px]
            min-h-[100px]
            items-center
            flex
            text-left
            rounded-xl
            hover:ring-2
            hover:ring-inset
            hover:ring-rose-500
            cursor-grab
            relative
            task
        '>
        <p
            className='
                my-auto
                h-[90%]
                w-full
                overflow-y-auto
                overflow-x-hidden
                whitespace-pre-wrap
        '>
            {content}
        </p>
        {mouseIsOver &&
            <button
                onClick={() => deleteTask(id)}
                className='
                    font-bold
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    bg-secondaryColor
                    p-2
                    rounded
                    opacity-60
                    hover:opacity-100'>
                Delete
            </button>}
    </div>
  )

}

TaskCard.propTypes = {
  content: PropTypes.string,
  id: PropTypes.number,
  columnId: PropTypes.number,
  deleteTask: PropTypes.func,
  updateTask: PropTypes.func,
}
