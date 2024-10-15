import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaX } from "react-icons/fa6";
import axios from 'axios';
import BASE_URL from '../../config';

export default function SprintForm(
    {createSprint,
    toggleForm,
    modifySprint,
    _id,
    name,
    DateStart,
    DateEnd,
    setShowSprintForm}) {

    const [sprintName, setSprintName] = useState(name);
    const [startDate, setStartDate] = useState(DateStart);
    const [endDate, setEndDate] = useState(DateEnd);
    const [validDate, setValidDate] = useState(false);

    function handleSubmit(e) {

        e.preventDefault();

        if (modifySprint) {

            // parse start and end date to dd-mm-yyyy
            const parsedStartDate = startDate.split('-').reverse().join('-');
            const parsedEndDate = endDate.split('-').reverse().join('-');

            //update here
            axios.patch(`${BASE_URL}/api/OneSprint?_id=${_id}`, {
                sprintName: sprintName,
                startDate: parsedStartDate,
                endDate: parsedEndDate
            }).then(response => {
                console.log(response.data);
                setShowSprintForm(false);
            }).catch(error => {
                console.log(error);
            });

        }

        else {
            createSprint({sprintName, startDate, endDate});
            toggleForm();
        }
    }

    function handleOnChange(e, setValue) {
        setValue(e.target.value);
    }

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const isStartDateValid = () => {

        // parse yyyy-mm-dd to dd-mm-yyyy
        const parsedStartDate = startDate.split('-').reverse().join('-');
        const parsedEndDate = endDate.split('-').reverse().join('-');

        axios.get(`${BASE_URL}/api/sprints/date?_id=${_id}&startDate=${parsedStartDate}&endDate=${parsedEndDate}&forceStart=false`)
            .then(response  => {
                console.log(response.data);
                setValidDate(true);
            })
            .catch(error => {
                console.log(error)
                setValidDate(false)
            });
        }


    useEffect(() => {
        if (startDate && endDate) {
            isStartDateValid();
        }
    }, [startDate, endDate])


    return (
        <div className="
            fixed
            top-0
            left-0
            w-screen
            h-screen
            bg-black
            bg-opacity-40
            flex
            items-center
        ">
            <div className="
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
                mx-auto
            ">




                {/* Exit button*/}
                <button onClick={() => modifySprint?setShowSprintForm(false):toggleForm()} className="flex slef-end mb-2">
                    <FaX />
                </button>

                {/* Content of Form*/}
                <form onSubmit={handleSubmit}>



                    {/* Header */}
                    {/* Form inputs */}
                    {! modifySprint &&
                    <>
                        <div className="justify-center
                                        border-2
                                        border-gray-100
                                        rounded
                                        text-center
                                        font-bold
                                        text-xl
                                        ">
                            <p>New Sprint Form</p>
                        </div>


                    <div>
                        <p className="font-bold my-1">Sprint Name:</p>
                        <input className="p-1
                                            border-2
                                            border-gray-300
                                            rounded
                                            w-full"
                                onChange={(event) => handleOnChange(event, setSprintName)}
                                value={(sprintName)}
                                required/>

                            <p className="font-bold my-1"> Start Date:</p>
                            <input  type="date"
                                    className="p-1 border-2 border-gray-300 rounded w-full"
                                    onChange={(event) => handleOnChange(event, setStartDate) }
                                    value={startDate}
                                    min={getCurrentDate()}
                                    max={endDate}
                                    required/>
                            <p className="font-bold my-1">End Date:</p>
                            <input  type="date"
                                    className="p-1 border-2 border-gray-300 w-full"
                                    onChange={(event) => handleOnChange(event, setEndDate)}
                                    value={endDate}
                                    min={startDate}
                                    required/>

                            {/* Only render submit button if date is valid */}
                            {validDate && (
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
                            )}{(!validDate && startDate && endDate)&&
                                <div className='mt-2 bg-red-600 border-dotted border-2 border-black font-bold text-center rounded mb-2'> Error: Sprint date has conflict with other spirnt

                                </div>}


                        </div>
                    </>}

                    {modifySprint &&
                    <>
                    <div className="justify-center
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
                            onChange={(event) => handleOnChange(event, setSprintName)}
                            defaultValue={sprintName}
                            autoFocus

                            required/>

                    <p className="font-bold my-1"> Start Date:</p>
                    <input  type="date"
                            className="p-1 border-2 border-gray-300 rounded w-full"
                            onChange={(event) => handleOnChange(event, setStartDate) }
                            defaultValue={startDate}

                            min={getCurrentDate()}
                            max={endDate}
                            required/>
                    <p className="font-bold my-1">End Date:</p>
                    <input  type="date"
                            className="p-1 border-2 border-gray-300 w-full"
                            onChange={(event) => handleOnChange(event, setEndDate)}
                            defaultValue={endDate}

                            min={startDate}
                            required/>

                    {/* Only render submit button if date is valid */}
                    {validDate && (
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
                        )}{(!validDate && startDate && endDate)&&
                            <div className='mt-2 bg-red-600 border-dotted border-2 border-black font-bold text-center rounded mb-2'> Error: Sprint date has conflict with other spirnt

                            </div>}




                </div>

                    </>

                    }
                </form>
            </div>
        </div>
    );
}

SprintForm.propTypes ={
    createSprint: PropTypes.func,
    toggleForm: PropTypes.func,
    modifySprint: PropTypes.bool,
    _id: PropTypes.string,
    name: PropTypes.string,
    DateStart: PropTypes.string,
    DateEnd: PropTypes.string,
    setShowSprintForm: PropTypes.func
};

