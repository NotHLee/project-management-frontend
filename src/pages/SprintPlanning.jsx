//TODO: SprintPlanning page

import { useState, useEffect } from 'react';

import Card from '../components/common/Card/Card';
import { DndContext, DragOverlay} from '@dnd-kit/core';
import { arrayMove} from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import SprintPlanningBox from '../components/Sprint/SprintPlanningBox';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import BASE_URL from '../config';

export default function SprintPlanning() {

    const params = useParams();

    const [activeCard,setActiveCard] = useState(null)

    const navigate = useNavigate();

    // tasks that may have been modified
    const [tasks, setTasks] = useState([])

    const forceStart = () => {

        axios.patch(`${BASE_URL}/api/sprints/force_start?sprintID=${params._id}`).
            then(response => console.log(response.data)).
            then(() => navigate(`/sprint`)).
            catch(error => console.log(error));

    };

    const updateTask = (task) => {

        axios.patch(`${BASE_URL}/api/sprints/tasks`, [task])
        .then((response) => {
            console.log(response.data)
            getTasks()
        }).catch((error) => {
            console.log(error)
        })
    }

    const getTasks = () => {
        axios.get(`${BASE_URL}/api/tasks?keyName=priority&reverse=true`)
            .then(response => {

                // filter out tasks that are not in the current sprint or product backlog
                response.data = response.data.filter(task => task.sprint == params._id || task.sprint == null);

                // Set the tasks
                setTasks(response.data);

            })
            .catch(error => console.log(error));

    }

    useEffect(() => {
        getTasks();
    }, []);

    function onDragStart(event) {

        // set the active card to the card being dragged
        setActiveCard(event.active.data.current.card);

    }

    function onDragEnd(event) {

        const {active} = event;

        // update the task in database
        updateTask(active.data.current.card);

        // reset active card to null
        setActiveCard(null);

    }

    function onDragOver(event) {

        const {active, over} = event;

        // return if it is not being dragged over anything
        if (!over) return;

        // return if it is on top of the same card
        if (active.id == over.id) return;

        // boolean value to check if the card is being dragged over a column/card
        const isActiveACard = active.data.current.type == "Card";
        const isOverACard = over.data.current.type == "Card";

        if (!isActiveACard) return;

        // dropping a card over another card
        if (isActiveACard && isOverACard) {
            setTasks(tasks => {
                const activeIndex = tasks.findIndex(task => task._id === active.id);
                const overIndex = tasks.findIndex(task => task._id === over.id);

                tasks[activeIndex].sprint = tasks[overIndex].sprint;

                return arrayMove(tasks, activeIndex, overIndex);
            });
        }

        const isOverAColumn = over.data.current.type == "Box";

        // dropping a card over a column
        if (isActiveACard && isOverAColumn) {
            console.log('dropping a card over a column');
            setTasks(tasks => {
                const activeIndex = tasks.findIndex(task => task._id === active.id);

                tasks[activeIndex].sprint = over.data.current.sprint;

                return arrayMove(tasks, activeIndex, activeIndex);
            });
        }
    }

  return (

    <div className='p-3 h-screen overflow-y-auto '>
      <div className='p-2 text-3xl font-bold '>
        Sprint Planning
        <hr className='border-black mt-2'/>
      </div>
      <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
        <div className='flex justify-evenly gap-3'>
          <SprintPlanningBox
          title="Product Backlog"
          sprint={null}
          tasks = {tasks.filter((task) => task.sprint == null)}/>


          <SprintPlanningBox
          title="Sprint Backlog"
          tasks = {tasks.filter((task) => task.sprint == params._id)}
          sprint={params._id}
          startDate = {params.startDate}
          endDate = {params.endDate}
          forceStart={forceStart}/>


      </div>
          {createPortal (<DragOverlay>
            {activeCard && <Card {...activeCard} task={activeCard} />}

          </DragOverlay>, document.body)}
        </DndContext>
      </div>
  )
}

SprintPlanning.propTypes = {
  sprintName: PropTypes.string,
  sprintId: PropTypes.string,
  sprintTask: PropTypes.array
}