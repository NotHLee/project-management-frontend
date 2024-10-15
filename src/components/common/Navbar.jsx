// TODO: Create a Navbar component to use for navigation in the application
import { useState } from 'react'
import { RiTeamFill } from "react-icons/ri";
import { MdOutlineTask } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { GiSprint } from "react-icons/gi";
import { FaList } from "react-icons/fa";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import { Tooltip } from '@mui/material';

export default function Navbar() {

  const [active, setActive] = useState(false);

  const logOut = () => {
        sessionStorage.clear();
        window.location.href = '/';
    }

  return(

    <div className={`flex mr-4 bg-primaryColor ${active ? 'w-60' : 'w-16'} min-h-screen`}>

        {active &&
            <div className='w-56 p-5 items-center flex flex-col h-screen fixed bg-primaryColor min-h-screen z-10'>
                <ImCross className='text-3xl hover:bg-red-400 cursor-pointer self-start mb-5' onClick={()=>{
                    setActive(false)
                    }}/>
                <div className='flex flex-col space-y-8 text-l mt-4 items-center h-screen '>
                    <a href = '/' className='navbar-buttons'><MdOutlineTask className='text-xl mr-1'/>Task Dashboard</a>
                    <a href='/sprint'className='navbar-buttons'><GiSprint className='text-xl mr-1'/>Sprint Menu</a>
                    <a href='/team'className='navbar-buttons' ><RiTeamFill className='text-xl mr-1'/>Team Dashboard</a>
                    <a href='/helpCenter'className='navbar-buttons' ><IoMdHelpCircleOutline className='text-xl mr-1'/>Help Center</a>
                    <a onClick={logOut} className='navbar-buttons'><TbLogout className="text-xl mr-1 mt-1"/>Log Out</a>
                </div>
            </div>
        }

        {!active&&(
            <div className='p-0.5 items-center flex flex-col fixed bg-primaryColor min-h-screen justify-between'>
                <div className='flex flex-col h-full space-y-4'>

                    <FaList className="icon" onClick=
                    {()=>{
                        setActive(true)
                    }}/>

                    <Tooltip title='Task Dashboard' placement='right'>
                        <a href='/'><MdOutlineTask className="icon"/></a>
                    </Tooltip>

                    <Tooltip title='Sprint Menu' placement='right'>
                        <a href='/sprint'><GiSprint className="icon"/></a>
                    </Tooltip>

                    <Tooltip title='Team Dashboard' placement='right'>
                        <a href='/team'><RiTeamFill className="icon"/></a>
                    </Tooltip>

                    <Tooltip title='Help Center' placement='right'>
                        <a href='/helpCenter'><IoMdHelpCircleOutline className="icon"/></a>
                    </Tooltip>
                </div>
                <Tooltip title='Log Out' placement='right'>
                    <a onClick={logOut}><TbLogout className="icon ml-3"/></a>
                </Tooltip>
            </div>
        )}
    </div>

  )
}

