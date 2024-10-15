import { Backdrop } from '@mui/material';
import React from 'react'
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import BASE_URL from '../../config'
import { LoginContext } from '../../pages/Login';

export default function Question(props) {
  const {close, exit} = props
  const [admin, setAdmin] = React.useState('')
  const [next, setNext] = React.useState(false)
  const [error, setError] = React.useState(false)

  const { setMemberId } = React.useContext(LoginContext);

  const verifySecurityQuestions = (e) => {

    e.preventDefault()

    axios.post(`${BASE_URL}/api/security_check`, {
      _id: admin._id,
      [Object.keys(admin.securityQuestions)[2]]: e.target.elements.question[0].value,
      [Object.keys(admin.securityQuestions)[0]]: e.target.elements.question[1].value,
      [Object.keys(admin.securityQuestions)[1]]: e.target.elements.question[2].value
    })
      .then(res => {
        console.log(res.data)
        close()
      })
      .catch(err => {
        console.log(err)
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      })
  }

  const verifyAdmin = (e) => {
    e.preventDefault()
    console.log(e.target.elements.question.value)

    axios.get(`${BASE_URL}/api/members?memberName=${e.target.elements.question.value}`)
    .then(res => {
        console.log(res.data)

        if (res.data.length >= 0) {
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 3000);
        }

        else if (res.data.access === 'Admin') {
          setMemberId(res.data._id)
          setError(false);
          setAdmin(res.data)
          setNext(true);

        }
    })
    .catch(err => {
        console.log(err)
    })



  }

  return (
    <>
        <Backdrop
            open={open}
            >
            <div className='bg-amber-200 w-2/4 rounded-lg'>
                <div className='flex justify-end'>
                <button className='p-2 hover:bg-red-300 ease-in-out duration-500 rounded'
                onClick={()=>{
                    exit()
                }}>
                    < RxCross2 className='text-xl'  />

                </button>
                </div>

                {error && !next &&
                    <h1 className='text-2xl font-bold text-center bg-red-600 rounded '>This user is not an Admin</h1>
                }


                {!next &&
                    <>
                    <h1 className='text-2xl font-bold text-center'>Admin Password Reset</h1>

                    <form className='flex flex-col p-4 gap-y-2' onSubmit={(e) => verifyAdmin(e)}>
                      <label htmlFor='question' className='font-semibold'>What is your name?</label>
                      <input type='text' id='question' className='p-1'/>
                      <button type='submit' className='p-2 bg-red-400 rounded font-bold hover:bg-red-300 ease-in-out duration-500'>
                        Next
                      </button>
                    </form>
                    </>
                }


                {error && next &&
                    <h1 className='text-2xl font-bold text-center bg-red-600 rounded '>Wrong Answers</h1>
                }

                {next &&
                    <>
                    <h1 className='text-2xl font-bold text-center'>Security Question</h1>

                    <form className='flex flex-col p-4 gap-y-2  ' onSubmit={(e) => verifySecurityQuestions(e)}>
                        <label htmlFor='question' className='font-semibold'>{Object.keys(admin.securityQuestions)[2]}</label>
                        <input type='text' id='question' className='p-1'/>
                        <label htmlFor='question' className='font-semibold'>{Object.keys(admin.securityQuestions)[0]}</label>
                        <input type='text' id='question' className='p-1'/>
                        <label htmlFor='question' className='font-semibold'>{Object.keys(admin.securityQuestions)[1]}</label>
                        <input type='text' id='question' className='p-1'/>
                        <button type='submit' className='p-2 bg-red-400 rounded font-bold hover:bg-red-300 ease-in-out duration-500'>
                            Change Password
                        </button>
                    </form>
                    </>
                 }

            </div>

        </Backdrop>
    </>
  )
}
