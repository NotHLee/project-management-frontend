import { Backdrop } from '@mui/material';
import React, { useEffect } from 'react'
import { ImCross } from "react-icons/im";
import { createPortal } from 'react-dom';
import { UserProfileContext } from '../../pages/UserProfile';
import axios from 'axios';
import BASE_URL from '../../config';

export default function MemberModify() {

    const { user, update, setUpdate } = React.useContext(UserProfileContext);
    const [open, setOpen] = React.useState(false);
    const formRef = React.useRef(null);

    const onHandleSubmit = (e) => {
        e.preventDefault();

        const modifications = {
            memberName: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value
        }

        modifyMember(modifications);

    }

    const handleClose = () => {

        if(formRef.current) {
            formRef.current.reset();
        }

        setOpen(false);
    }

    const modifyMember = (modifications) => {

        axios.patch(`${BASE_URL}/api/members?memberId=${user._id}`, modifications)
        .then((response) => {
            console.log(response.data);
            setUpdate(prev => !prev);
        })
        .then(handleClose)
        .catch((error) => {
            console.log(error);
        })

    }


    return (
        <>
        <button className='bg-rose-400 text-white rounded-md px-4 py-2 hover:bg-rose-300 duration-500 ease-in-out'
                onClick={() => setOpen(true)}>
                    Edit Profile
                </button>

        {createPortal(
        <Backdrop
            open={open} onClick={() => handleClose()}
        >
        <div className='bg-orange-300 w-4/12 rounded-lg' onClick={(e)=>{e.stopPropagation()}}>
            <div className='bg-orange-200 rounded-lg'>
                <div className='flex justify-end'>
                    <button className='p-2 hover:bg-orange-400 rounded ease-in-out duration-500'
                    onClick={()=>{
                        handleClose();
                    }}>
                        <ImCross className='text-xl'/>
                    </button>
                </div>
                <h1 className='text-2xl font-bold text-center bg-orange-200 rounded p-1'>
                    Edit Information
                </h1>
            </div>

            <form ref={formRef} className='flex flex-col p-3 rounded gap-2' onSubmit={onHandleSubmit}>

                <label className='font-semibold' htmlFor='name'>Name:</label>
                <input  className="rounded  p-1"type='text' id='name' name='name' required defaultValue={user.memberName}/>

                <label className='font-semibold' htmlFor='email'>Email:</label>
                <input className="rounded p-1" type='email' id='email' name='email' required defaultValue={user.email}/>

                <label  className='font-semibold' htmlFor='password'>Change Password:</label>
                <input className="rounded p-1" type='text' id='password' name='password' required defaultValue={user.password}/>

                <button className='bg-red-400 font-semibold rounded p-2 mt-2 hover:bg-red-500 ease-in-out duration-500'>
                    Save
                </button>

            </form>

        </div>
        </Backdrop>, document.getElementById('portal-root'))}
        </>

    )
}