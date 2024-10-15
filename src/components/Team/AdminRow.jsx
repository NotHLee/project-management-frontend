//TODO: Use Card component to create a row in the AdminView of TeamMenu
import React from 'react'
// import { BsFileBarGraphFill } from "react-icons/bs";
import { FaPerson } from "react-icons/fa6";
import { IoTimer } from "react-icons/io5";
import PropTypes from 'prop-types';
import BarChartModal from './BarChartModal';
import MemberDeletion from './MemberDeletion';
import { FaUserEdit } from "react-icons/fa";
import BASE_URL from '../../config';
import axios from 'axios';

export default function AdminRow(props) {

    const{
        memberName,
        _id,
        averageEffort,
        totalEffort,
        timeSpent,
        dates,
        handleDelete,
        setAlert}
        = props;

    const resetPassword = () => {

        axios.patch(`${BASE_URL}/api/security_check?memberID=${_id}`)
        .then((response) => {
            console.log(response.data);
            setAlert("success");

            setTimeout(() => {
                setAlert(null);
            }, 3000);
        })
        .catch((error) => {
            console.log(error);

            if (error.response.data.error === 'No changes were made to the password.') {
                setAlert("success");

                setTimeout(() => {
                    setAlert(null);
                }, 3000);
                return;
            }

            setAlert("error");

            setTimeout(() => {
                setAlert(null);
            }, 3000);
        })
    }

    return (
        <div className=' flex p-4  gap-5 w-11/12 border-4 rounded-lg bg-red-300 '>
        <div className='w-11/12 flex  gap-3'>
            <div className='font-bold flex text-xl w-1/6 gap-0.5'>
            <FaPerson className='mt-0.5 text-2xl'/>Name:
            <p className='font-semibold'>
                {memberName}
            </p>
            </div>

            <div className='font-bold flex text-xl w-2.5/6 gap-0.5'>
                <IoTimer className='mt-0.5 text-xl'/>Average time spent (per day):
                <p className='font-semibold'>
                    {averageEffort}
                </p>
            </div>
            <div className='font-bold flex text-xl w-2.5/6 gap-0.5'>
                <IoTimer className='mt-1 text-xl'/>Total time spent:
                <p className='font-semibold'>
                    {totalEffort}
                </p>
            </div>

        </div>

        <div className='flex flex-row justify-end items-center w-1/12 gap-2 '>
            <BarChartModal timeSpent={timeSpent} dates={dates} className=""/>
            <FaUserEdit className='text-2xl hover:bg-red-400 rounded  cursor-pointer' onClick={()=>{
                resetPassword();
            }}/>
            {_id !== sessionStorage.getItem('sessionToken') &&
            <MemberDeletion memberId={_id} memberName={memberName}/>
            }

        </div>

        </div>
    )
}
AdminRow.propTypes = {
  memberName: PropTypes.string,
  handleDelete: PropTypes.func,
  handleStats: PropTypes.func,
  _id: PropTypes.string,
}

