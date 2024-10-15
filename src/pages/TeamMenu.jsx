//TODO: Menu for team page (either login as admin or team member)
import React from 'react'
import Navbar from '../components/common/Navbar'
import { FaRegUserCircle } from "react-icons/fa";
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';
import AdminPanelLogin from '../components/Team/AdminPanelLogin';

export default function TeamMenu() {
  const navigate = useNavigate();

  const renderUserProfile = () =>{
    navigate('/userProfile')
  }

  return (
    <div className='flex'>


      <Navbar/>
      <div className=' px-4 flex w-full gap-28 justify-center items-center h-screen'>
      <Button title='User Profile' Logo={FaRegUserCircle} onClick = {renderUserProfile}/>
      <AdminPanelLogin/>
      </div>



    </div>
  )
}
