//TODO: Login page
import React, { useEffect } from 'react'
import { UserContext } from '../App';
import axios from 'axios';
import BASE_URL from '../config';
import ForgetPasswordMember from '../components/Login/ForgetPasswordMember';
import AdminChangePassword from '../components/Login/AdminChangePassword';
import { Alert } from '@mui/material';
import Register from '../components/Login/Register';

export const LoginContext = React.createContext()

export default function Login() {

    const { setSignedIn } = React.useContext(UserContext);

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [userType, setUserType] = React.useState("");
    const [forgetPassword, setForgetPassword] = React.useState(false);

    const [memberId, setMemberId] = React.useState('')
    const [success, setSuccess] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [existAdmin, setExistAdmin] = React.useState(false)

    const [update, setUpdate] = React.useState(false)

    useEffect(() => {
        axios.get(`${BASE_URL}/api/security_check`)
        .then(res => {
            console.log(res.data)
            // true means admin exists
            if (res.data === true) {
                setExistAdmin(true)
            }
            else if (res.data === false) {
                setExistAdmin(false)
            }
        })
        .catch(err => console.log(err))
    }, [update])


    const handleSignIn = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/api/login`, {
                memberName: username,
                password: password,
            });
            sessionStorage.setItem("sessionToken", response.data._id);
            setSignedIn(true);
        } catch (error) {
            console.error(error);
        }
    }

    const onChange = (e) => {
        setUserType(e.target.value);
        console.log(userType)
    }


    const renderButton = () => {
        console.log(userType)
       if(userType === 'admin'){
            return(
                <AdminChangePassword closePopUp={setForgetPassword}/>
            )
       }
        else if (userType === 'user'){
            console.log('user')
            return(
                <ForgetPasswordMember close={setForgetPassword}/>)
        }
    }

    const showSuccessPasswordChangeModal = () => {
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, 3000);
        setForgetPassword(false)
    }

    const showFailurePasswordChangeModal = () => {
        setError(true);
        setTimeout(() => {
            setError(false);
        }, 3000);
        setForgetPassword(false)
    }


    return (
        <>


        <LoginContext.Provider value={{memberId, setMemberId, showSuccessPasswordChangeModal, showFailurePasswordChangeModal, setUpdate}}>

        {existAdmin &&
            <>
            {success &&
                <Alert severity="success" className="fixed top-0 right-0">
                    Password changed successfully
                </Alert>
            }

            {error &&
                <Alert severity="error" className="fixed top-0 right-0">
                    Password change failed
                </Alert>
            }


            <div className="flex
                            items-center
                            justify-center
                            min-h-screen
                        bg-secondaryColor">
                <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-sm">

                <h2 className="text-3xl
                            font-semibold
                            text-center
                            mb-6">
                Log In
                </h2>

                <form className ="flex flex-col">
                    <label className="text-left mb-1 text-sm font-semibold">Login Type:</label>
                    <div className='flex gap-2 p-2'>
                    <input className=""type="radio" id="admin" name="loginType" value="admin" required
                    onChange={onChange}/>
                    <label className="text-left text-sm">Admin</label>
                    <input className=""type="radio" id="user" name="loginType" value="user" required
                    onChange={onChange}/>
                    <label className="text-left text-sm">User</label>
                    </div>
                    <label className="text-left mb-1 text-sm font-semibold">Username</label>
                    <input
                        type="text"
                        id = "username"
                        className="mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor"
                        onChange={(e) => setUsername(e.target.value)}
                        required/>

                    <label htmlFor="password" className="text-left mb-1 text-sm font-semibold">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />


                    <button
                        type="submit"
                        className="bg-primaryColor text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-500 transition duration-200"
                        onClick={(e) => {
                            e.preventDefault();
                            handleSignIn();
                        }}
                    >
                        Login
                    </button>


                </form>

                <div className='mb-1'>
                    <button className='text-red-600 font-bold'
                    onClick={()=>{
                        if (userType){
                            setForgetPassword(true)
                        }else{
                            alert('Please select user type')}
                    }}
                    >Forget password?</button>
                </div>
                <div className='flex flex-row'>
                {forgetPassword &&
                    renderButton()
                }



                </div>

                </div>
            </div>
            </>}

            {existAdmin === false &&
                <Register existAdmin={setExistAdmin} />
            }
        </LoginContext.Provider>
        </>
    );
};
