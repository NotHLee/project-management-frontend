import React, { useEffect } from 'react'
import Navbar from '../components/common/Navbar'
import Button from '../components/common/Button'
import { RiTeamFill } from "react-icons/ri";
import { IoMdPersonAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import AddUserForm from '../components/Team/AddUserForm';
import { Alert } from '@mui/material';

export default function AdminPanel() {
    const navigate = useNavigate();

    const [alert, setAlert] = React.useState(null)

    const renderAdminView = () =>{
      navigate('/adminView')
    }

    useEffect(() => {
      if (alert) {
        const timer = setTimeout(() => {
          setAlert(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }, [alert]);

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
          <AddUserForm setAlert={setAlert}/>
      </div>

      {alert === 'success' &&
        <Alert
        severity="success"
        className="fixed top-0 left-1/2 transform -translate-x-1/2" >
          Member added successfully!
        </Alert>
      }
      {alert === 'error' &&
      <Alert severity="error"
        className="fixed top-0 left-1/2 transform -translate-x-1/2" >
          Member could not be added!
        </Alert>
      }

      </div>
    </div>

  )
}
