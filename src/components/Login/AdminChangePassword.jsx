import React from 'react'
import Question from './Question'
import { RxCross2 } from "react-icons/rx";
import { Backdrop } from '@mui/material';
import { LoginContext } from '../../pages/Login';
import BASE_URL from '../../config';
import axios from 'axios';

function AdminChangePassword(props) {

  const {closePopUp} = props
  const [opentoggle, setOpentoggle] = React.useState(true)
  const [toggleChangePassword, setToggleChangePassword] = React.useState(false)
  const { memberId, showSuccessPasswordChangeModal, showFailurePasswordChangeModal } = React.useContext(LoginContext);

  function close(){
    setOpentoggle(false)
    setToggleChangePassword(true)
  }

  function exit(){
    setOpentoggle(false)
    closePopUp(false)

  }
  function changePassword(e){
    e.preventDefault()

    console.log(e.target.elements.question.value)
    console.log(memberId)

    axios.patch(`${BASE_URL}/api/login`, {
      _id: memberId,
      password: e.target.elements.question.value
    })
    .then(res => {
      console.log(res.data)
      showSuccessPasswordChangeModal()
    })
    .catch(err => {
      console.log(err)
      showFailurePasswordChangeModal()
    })
  }

  return (

    <div>
        {opentoggle &&
          <Question close={close} exit={exit}/>
        }
        {toggleChangePassword &&
          <Backdrop
          open={true}
          >
            <div className='bg-amber-200 w-2/4 rounded-lg'>
                <div className='flex justify-end'>
                    <button className='p-1 hover:bg-red-300 ease-in-out duration-500 rounded'
                    onClick={()=>{
                        closePopUp(false)
                    }}>
                        < RxCross2 className='text-xl'  />

                    </button>
                </div>

                <form className='flex flex-col p-4 gap-y-2' onSubmit={(e) => changePassword(e)}>
                  <label htmlFor='question' className='font-bold text-center text-xl'>New Password:</label>
                  <input type='text' id='question' className='p-1'/>
                    <button type='submit' className='p-2 bg-red-400 rounded font-bold hover:bg-red-300 ease-in-out duration-500'>
                        Change Password
                    </button>
                </form>
              </div>
              </Backdrop>
          }


    </div>
  )
}

export default AdminChangePassword
