import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import { ImCross } from "react-icons/im";

function ForgetPasswordMember(props) {
    const {handleOpen,close} = props;
const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
      
      <Backdrop
          sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
          open={true}
          onClick={handleClose}
        >
          <div className='bg-lime-300 rounded w-64'>
            <div>
              <div className='flex justify-end'>
                <button className='p-2  hover:bg-lime-400 text-slate-500 ease-linear duration-500'
                onClick={()=>{
                  close(false)
                }}>
                  <ImCross />
                </button>
              </div>
            
                <p>
                    <h1 className='text-xl text-center font-semibold w-64 p-4 bg-secondaryColor text-black rounded shadow-sm'>
                        Please contact your admin to reset your password
                    </h1>
                </p>
            </div>
          </div>
      </Backdrop>
    </>
    
  )
}

export default ForgetPasswordMember;
