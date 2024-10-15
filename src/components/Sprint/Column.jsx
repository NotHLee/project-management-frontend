import { twMerge } from "tailwind-merge"
import PropTypes from 'prop-types'
import Card from "../common/Card/Card";
import { SortableContext } from "@dnd-kit/sortable";
import { useMemo } from "react";
import { useDroppable } from "@dnd-kit/core";

export default function Column({ headerStyle, headerText, tasks, viewTask }) {

    const headerClass = twMerge(headerStyle,
        'h-12',
        'flex',
        'items-center',
        'justify-center',
        'text-lg',
        'font-bold',
        'rounded-xl',
        'rounded-b-none',
        'w-full',
        'p-4');

    const taskIds = useMemo(() => tasks.map(task => task._id), [tasks]);

    const {
        setNodeRef,
        attributes,
        listeners,
    }
    = useDroppable({
        id: headerText,
        data: {
            type: "Column",
            props: { headerText, tasks }
        },
    });

  return (
    <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="
            bg-primaryColor
            flex
            flex-col
            border
            border-black
            rounded-xl
            shadow-md
            m-8
            h-[90%]
            w-72
            items-center
        ">

        {/* Column Title */}
        <div className={headerClass}>
            {headerText}
        </div>

        {/* Column Content */}
        <div className="
            flex
            flex-grow
            flex-col
            gap-4
            p-4
            overflow-x-hidden
            overflow-y-auto'
            ">
            <SortableContext items={taskIds}>
                {tasks.map(task => (
                    <Card key={task._id} {...task} viewTask={viewTask}/>
                ))}
            </SortableContext>
        </div>
      </div>
    )
}

Column.propTypes = {
    headerStyle: PropTypes.arrayOf(PropTypes.string),
    headerText: PropTypes.string,
    tasks: PropTypes.array,
    viewTask: PropTypes.func
}