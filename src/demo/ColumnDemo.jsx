import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TaskCard from './TaskCardDemo';


export default function Column(props) {
    const { title, id, deleteColumn, updateColumn, createTask, deleteTask, updateTask, tasks } = props;

    const [editMode, setEditMode] = useState(false);

    const tasksIds = useMemo(() => tasks.map(task => task.id), [tasks]);

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
            type: "Column",
            props
        },
        disabled: editMode,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    };

    if (isDragging) {
        return (
        <div
            ref={ setNodeRef }
            style = { style }
            className='
                bg-secondaryColor
                opacity-40
                border-2
                border-rose-500
                w-[350px]
                h-[500px]
                max-h-[500px]
                rounded-md
                flex
                flex-col
        '></div>
        );
    }

    return (
        <div
            ref={ setNodeRef }
            style = { style }
            className='
                bg-secondaryColor
                w-[350px]
                h-[500px]
                max-h-[500px]
                rounded-md
                flex
                flex-col
        '>
            {/* Column title*/}
            <div
                {...attributes}
                {...listeners}
                onClick={() => setEditMode(true)}
                className='
                    bg-primaryColor
                    text-md
                    h-[60px]
                    cursor-grab
                    rounded-md
                    rounded-b-none
                    p-3
                    font-bold
                    border-secondaryColor
                    border-4
                    flex
                    items-center
                    justify-between
            '>
                <div className='flex gap-2'>
                    <div
                        className='
                            flex
                            justify-center
                            items-center
                            bg-secondaryColor
                            px-2
                            py-1
                            text-sm
                            rounded-full
                    '>
                        0
                    </div>
                    {!editMode && title}
                    {editMode && (
                        <input
                            className="
                                bg-yellow-500
                                focus:border-rose-500
                                border
                                rounded
                                outline-none
                                px-2
                                "
                            value={title}
                            onChange={e => updateColumn(id, e.target.value)}
                            autoFocus
                            onBlur={() => setEditMode(false)}
                            onKeyDown={e => {
                                if (e.key !== "Enter") return;
                                setEditMode(false);
                            }}
                        />
                    )}
                </div>
                <button
                    onClick={() => deleteColumn(id)}
                    className='
                        rounded
                        px-1
                        py-2
                        z-100
                '>
                    Delete
                </button>
            </div>

            {/* Column tasks */}
            <div className='flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto'>
                <SortableContext items={tasksIds}>
                    {tasks.map(task => (
                        <TaskCard
                            key={task.id}
                            id={task.id}
                            {...task}
                            deleteTask={deleteTask}
                            updateTask={updateTask}/>
                    ))}
                </SortableContext>
            </div>

            {/* Column footer */}
            <button
                onClick={() => createTask(id)}
                className="
                    flex gap-2
                    items-center
                    border-secondaryColor
                    border-2
                    rounded-md
                    p-4
                    border-x-secondaryColor
                    hover:bg-primaryColor
                    hover:text-rose-500
                    active:bg-yellow-500">
                Add task
            </button>
        </div>
    );

}

Column.propTypes = {
    title: PropTypes.string,
    id: PropTypes.number,
    deleteColumn: PropTypes.func,
    updateColumn: PropTypes.func,
    createTask: PropTypes.func,
    tasks: PropTypes.array,
    deleteTask: PropTypes.func,
    updateTask: PropTypes.func,
}