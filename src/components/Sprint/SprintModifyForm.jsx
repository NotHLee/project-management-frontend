import React, { useContext } from 'react'
import { FaEdit } from 'react-icons/fa'
import { Tooltip, Backdrop } from '@mui/material'
import { createPortal } from 'react-dom'
import { FaX } from "react-icons/fa6";
import dayjs from 'dayjs';
import { SprintMenuContext } from '../../pages/SprintMenu';

export default function SprintModifyForm(props) {

    const { isStartDateValid, updateSprint } = useContext(SprintMenuContext);

    const { _id, sprintName, startDate, endDate } = props;
    const formRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);
    const [check, setCheck] = React.useState(false);
    const [valid, setValid] = React.useState(false);

    const [newStartDate, setNewStartDate] = React.useState(startDate);
    const [newEndDate, setNewEndDate] = React.useState(endDate);

    const handleOnChange = () => {
        setCheck(prev => !prev);
    }

    const handleClose = () => {
        setOpen(false);
        setNewStartDate(dayjs().format('YYYY-MM-DD'));
        setNewEndDate(dayjs().format('YYYY-MM-DD'));
        formRef.current.reset();
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let newSprintName = formRef.current[0].value;
        let newStartDate = formRef.current[1].value;
        let newEndDate = formRef.current[2].value;

        updateSprint(_id, newSprintName, newStartDate, newEndDate);
        handleClose();
    }

    React.useEffect(() => {

        let newStartDate = formRef.current[1].value;
        let newEndDate = formRef.current[2].value;

        if (newStartDate && newEndDate) {
            isStartDateValid(_id, newStartDate, newEndDate).then((result) => {
                console.log(result);
                setValid(result);
            });;
        }
    }, [check, open])

    return (
        <>
        <Tooltip title='Modify Sprint' arrow>
        <button
            className='text-3xl p-1 rounded hover:ring-2 hover:ring-rose-500 ease-in-out duration-500'
            onClick={() => setOpen(true)}
        >
            <FaEdit/>
            </button>
        </Tooltip>

        {createPortal(
        <Backdrop open={open} onClick={() => handleClose()}>

            <div
            onClick={(e) => e.stopPropagation()}
            className='
                flex
                flex-col
                w-[600px]
                p-5
                bg-red-300
                h-3/4
                overflow-y-auto
                z-1
                rounded-md
                shadow-slate-500
                mx-auto'
            >

                <button onClick={() => setOpen(false)} className="flex slef-end mb-2">
                    <FaX />
                </button>

                <form ref={formRef} onSubmit={e => handleSubmit(e)}>

                <div className="
                    justify-center
                    border-2
                    border-gray-100
                    rounded
                    text-center
                    font-bold
                    text-xl
                    text-black
                ">
                    <p>Modify Sprint</p>
                </div>

                <div className='text-black'>
                    <p className="font-bold my-1">Sprint Name:</p>
                    <input className="p-1
                                        border-2
                                        border-gray-300
                                        rounded
                                        w-full"
                            defaultValue={sprintName}
                            autoFocus
                        required/>

                    <p className="font-bold my-1"> Start Date:</p>
                    <input  type="date"
                            className="p-1 border-2 border-gray-300 rounded w-full"
                            defaultValue={startDate}
                            onChange={(e) => {
                                handleOnChange()
                                setNewStartDate(e.target.value)
                            }}
                            min={dayjs().format('YYYY-MM-DD')}
                            max={newEndDate}
                        required/>
                    <p className="font-bold my-1">End Date:</p>
                    <input  type="date"
                            className="p-1 border-2 border-gray-300 w-full"
                            defaultValue={endDate}
                            onChange={(e) => {
                                handleOnChange()
                                setNewEndDate(e.target.value)
                            }}
                            min={newStartDate}
                        required/>

                    {valid && startDate && endDate &&
                    <div className="flex p-1 text-center rounded mt-3 justify-end">
                        <button
                            type="submit"
                            className="justify-end
                                        w-36
                                        h-10
                                    bg-red-400
                                        border-2
                                        rounded
                                        border-grey-400
                                        text-center
                                        font-bold
                                        hover:bg-red-100
                                        hover:ease-in-out
                                        duration-1000s">
                            Submit
                        </button>
                    </div>
                    }

                    {(!valid && startDate && endDate)&&
                    <div className='mt-2 bg-red-600 border-dotted border-2 border-black font-bold text-center rounded mb-2'>
                        Error: Sprint date has conflict with other spirnt
                    </div>}
                </div>
                </form>
            </div>
        </Backdrop>
        , document.getElementById('portal-root'))}
        </>
    )
}