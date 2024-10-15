import React, { useContext } from 'react'
import { FaEdit } from 'react-icons/fa'
import { Tooltip, Backdrop } from '@mui/material'
import { createPortal } from 'react-dom'
import { FaX } from "react-icons/fa6";
import dayjs from 'dayjs';
import { SprintMenuContext } from '../../pages/SprintMenu';
import { IoIosAddCircleOutline } from 'react-icons/io';

export default function SprintCreateForm(props) {

    const { isStartDateValid, createSprint } = useContext(SprintMenuContext);

    const formRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);
    const [check, setCheck] = React.useState(false);
    const [valid, setValid] = React.useState(false);

    const [startDate, setStartDate] = React.useState(dayjs().format('YYYY-MM-DD'));
    const [endDate, setEndDate] = React.useState(dayjs().format('YYYY-MM-DD'));

    const handleOnChange = () => {
        setCheck(prev => !prev);
    }

    const handleClose = () => {
        setOpen(false);
        setStartDate(dayjs().format('YYYY-MM-DD'));
        setEndDate(dayjs().format('YYYY-MM-DD'));
        formRef.current.reset();
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let newSprintName = formRef.current[0].value;
        let newStartDate = formRef.current[1].value;
        let newEndDate = formRef.current[2].value;

        createSprint(newSprintName, newStartDate, newEndDate);
        handleClose();
    }

    React.useEffect(() => {

        let newStartDate = formRef.current[1].value;
        let newEndDate = formRef.current[2].value;

        if (newStartDate && newEndDate) {
            isStartDateValid(null, newStartDate, newEndDate).then((result) => {
                console.log(result);
                setValid(result);
            });;
        }
    }, [check, open])

    return (
        <>
        <button
            onClick={() => setOpen(true)}
            className="
                h-max
                w-max
                cursor-pointer
                rounded-lg
                bg-primaryColor
                border-2
                border-secondaryColor
                p-4
                ring-rose-500
                hover:ring-2
                hover:ring-inset
                flex
                items-center
                gap-2
                font-semibold
                ">
                    <IoIosAddCircleOutline/>
                    Create New Sprint
        </button>


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
                    <p>Create new sprint</p>
                </div>

                <div className='text-black'>
                    <p className="font-bold my-1">Sprint Name:</p>
                    <input className="p-1
                                        border-2
                                        border-gray-300
                                        rounded
                                        w-full"
                            autoFocus
                        required/>

                    <p className="font-bold my-1"> Start Date:</p>
                    <input  type="date"
                            defaultValue={dayjs().format('YYYY-MM-DD')}
                            className="p-1 border-2 border-gray-300 rounded w-full"
                            onChange={(e) => {
                                setStartDate(e.target.value)
                                handleOnChange()
                            }}
                            min={dayjs().format('YYYY-MM-DD')}
                        required/>
                    <p className="font-bold my-1">End Date:</p>
                    <input  type="date"
                            className="p-1 border-2 border-gray-300 w-full"
                            onChange={(e) => {
                                setEndDate(e.target.value)
                                handleOnChange()
                            }}
                            min={startDate}
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