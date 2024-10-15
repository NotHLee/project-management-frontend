import React from 'react'
import Navbar from '../components/common/Navbar'
import Button from '../components/common/Button'
import { RiTeamFill } from "react-icons/ri";
import { IoMdPersonAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import AddUserForm from '../components/Team/AddUserForm';

export default function AdminPanel() {
    const navigate = useNavigate();

    const renderAdminView = () =>{
      navigate('/adminView')
    }

  return (
    <div className="
            container
            flex
            flex-row
            overflow-x-hidden
    ">

      <Navbar/>
      <div className="flex flex-col flex-grow">

        {/* Header */}
      <div className="flex  gap-x-7 p-4 border-b-2 border-gray-800">
          <div className="w-auto font-bold text-3xl">
              Admin Panel
          </div>

          <a className='bg-rose-500 text-white ml-12 rounded-md px-7 py-2 hover:bg-red-500 duration-500 ease-in-out'
              href = "/team">
                          Exit From Admin Panel
          </a>

      </div>

      <div className='px-4 mr-10 flex w-11/12 justify-center gap-32 items-center h-full'>
          <Button title='View All Members' Logo = {RiTeamFill }onClick={renderAdminView}/>
          <AddUserForm/>
      </div>

      </div>
    </div>

  )
}
