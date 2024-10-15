//TODO: Sprint Dashboard page to display all tasks in a sprint
import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import ColumnDemo from './ColumnDemo';
import { DndContext, DragOverlay, PointerSensor, useSensors, useSensor } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import TaskCard from './TaskCardDemo';
import Navbar from '../components/common/Navbar';

export default function SprintDashboard() {

    const [columns, setColumns] = useState([]);
    const columnsId = useMemo(() => columns.map(col => col.id), [columns]);

    const [tasks, setTasks] = useState([]);

    const [activeColumn, setActiveColumn] = useState(null);
    const [activeTask, setActiveTask] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3,
            },
        })
    );

  return (
    <div>
        <Navbar>
    <div
        className='
            m-auto
            flex
            min-h-screen
            w-full
            items-center
            overflow-x-auto
            overflow-y-hidden
            px-[40px]
            
    '>
        <DndContext
            sensors={sensors}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
        >
            <div className='m-auto flex gap-4'>
                <div className="flex gap-4">
                    <SortableContext items={columnsId}>
                        {columns.map(col =>
                            <ColumnDemo
                            key={col.id}
                            title={col.title}
                            id={col.id}
                            deleteColumn={deleteColumn}
                            updateColumn={updateColumn}
                            createTask={createTask}
                            deleteTask={deleteTask}
                            updateTask={updateTask}
                            tasks={tasks.filter((task) => task.columnId === col.id)}
                            />
                        )}
                    </SortableContext>
                </div>
                <button
                    onClick={() => createNewColumn()}
                    className="
                        h-[60px]
                        w-[350px]
                        min-w-[350px]
                        cursor-pointer
                        rounded-lg
                        bg-primaryColor
                        border-2
                        border-secondaryColor
                        p-4
                        ring-rose-500
                        hover:ring-2
                        flex
                        gap-2
                ">
                    Add column
                </button>
            </div>

            {createPortal(
                <DragOverlay>
                    {activeColumn && (<ColumnDemo {...activeColumn} deleteColumn={deleteColumn}/>)}
                    {activeTask && (<TaskCard {...activeTask} deleteTask={deleteTask} updateTask={updateTask}/>)}
                </DragOverlay>,
            document.body
            )}
        </DndContext>
    </div>
    </Navbar>
    </div>
  )

  function createTask(columnId) {
    const newTask = {
        id: generateId(),
        columnId,
        content: `Task ${tasks.length + 1}`,
    }

    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  }

  function updateTask(id, content) {
    const newTasks = tasks.map(task => {
        if (task.id !== id) return task;
        return {...task, content};
    });

    setTasks(newTasks);
  }

  function createNewColumn() {
    const columnToAdd = {
        id: generateId(),
        title: `Column ${columns.length + 1}`,
    }

    setColumns([...columns, columnToAdd]);
  }

  function generateId() {
    /* Generate a random id */
    return Math.floor(Math.random() * 1000000);
  }

  function deleteColumn(id) {
    const filteredColumn = columns.filter(col => col.id !== id);
    setColumns(filteredColumn);

    const newTasks = tasks.filter(task => task.columnId !== id);
    setTasks(newTasks);
  }

  function updateColumn(id, title) {
    const newColumns = columns.map(col => {
        if (col.id !== id) return col;
        return {...col, title};
    });

    setColumns(newColumns);

    }

  function onDragStart(event) {
    console.log('Drag started', event);
    if (event.active.data.current.type === "Column") {
        setActiveColumn(event.active.data.current.props);
        return;
    }

    if (event.active.data.current.type === "Task") {
        setActiveTask(event.active.data.current.props);
        return;
    }
  }

  function onDragEnd(event) {
    setActiveColumn(null);
    setActiveTask(null);

    const {active, over} = event;
    if(!over) return;

    const activeId = active.id;
    const overId = over.id;

    if(activeId === overId) return;

    setColumns(columns => {
        const activeColumnIndex = columns.findIndex(col => col.id === activeId);
        const overColumnIndex = columns.findIndex(col => col.id === overId);

        return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event) {
    const {active, over} = event;
    if(!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current.type === "Task";
    const isOverATask = over.data.current.type === "Task";

    if(!isActiveATask) return;

    // dropping a task over another task
    if (isActiveATask && isOverATask) {
        setTasks(tasks => {
            const activeIndex = tasks.findIndex(task => task.id === activeId);
            const overIndex = tasks.findIndex(task => task.id === overId);

            tasks[activeIndex].columnId = tasks[overIndex].columnId;

            return arrayMove(tasks, activeIndex, overIndex);
        })
    }

    const isOverAColumn = over.data.current.type === "Column";

    // dropping a task over a column
    if (isActiveATask && isOverAColumn) {
        setTasks(tasks => {
            const activeIndex = tasks.findIndex(task => task.id === activeId);

            tasks[activeIndex].columnId = overId;

            return arrayMove(tasks, activeIndex, activeIndex);
        })
    }

  }

}
