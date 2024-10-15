import React, { useEffect } from 'react'
import axios from 'axios';
import BASE_URL from '../../config';
import { Backdrop } from '@mui/material';
import Button from '../common/Button';
import { RiAdminFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

export default function AdminPanelLogin() {

    const [open, setOpen] = React.useState(false);
    const [showCredentialsError, setShowCredentialsError] = React.useState(false);
    const [showAccessError, setShowAccessError] = React.useState(false);
    const [isUserAnAdmin, setIsUserAnAdmin] = React.useState(false);

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/api/login`, {
                memberName: username,
                password: password,
            });

            const { _id } = response.data;

            checkAdmin(_id)
                .then((access) => {
                    access === "Admin" ? navigate("/adminPanel") : setShowAccessError(true);
                }
            );

        } catch (error) {
            console.error(error);
            setShowCredentialsError(true);
                setTimeout(() => {
                    setShowCredentialsError(false);
                }, 3000);
        }
    }

    const checkAdmin = async (_id) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/members?memberId=${_id}`);
            const { access } = response.data;
            return access;
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        checkAdmin(sessionStorage.getItem("sessionToken"))
            .then((access) => {
                access === "Admin" ? setIsUserAnAdmin(true) : setIsUserAnAdmin(false);
            }
        );
        setUsername("");
        setPassword("");
    }, [open])

    return (
        <>
        <Button title='Admin Panel'
            Logo={RiAdminFill}
            onClick={() => {
                setOpen(true);
            }}
        />

        <Backdrop
            open={open}
            onClick={() => setOpen(false)}
        >

            {!isUserAnAdmin &&
                <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-sm">
                    <p className="text-red-500 text-sm mb-4">Access denied</p>
                </div>
            }

            {isUserAnAdmin &&
            <div
                className="bg-white p-10 rounded-lg shadow-lg w-full max-w-sm"
                onClick={(e) => e.stopPropagation()}
            >
            <h2 className="text-3xl
                        font-semibold
                        text-center
                        mb-6">
            Log In
            </h2>

            <form className ="flex flex-col">
                <label className="text-left mb-1 text-sm">Username</label>
                <input
                    type="text"
                    id = "username"
                    className="mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required/>

                <label htmlFor="password" className="text-left mb-1 text-sm">Password</label>
                <input
                    type="password"
                    id="password"
                    className="mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />

                <div className='h-4 flex items-center'>
                    {showCredentialsError && <p className="text-red-500 text-sm mb-4">Invalid username or password</p>}
                    {showAccessError && <p className="text-red-500 text-sm mb-4">Access denied</p>}
                </div>

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
            </div>
        }
        </Backdrop>
        </>
    );
}

