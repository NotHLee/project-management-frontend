//TODO: Use Modal component to create a popup form for adding a user to a team
import { useEffect, useState } from 'react'
import { Backdrop } from '@mui/material'
import Button from '../common/Button'
import { IoMdPersonAdd } from "react-icons/io";
import axios from 'axios'
import BASE_URL from '../../config';

export default function AddUserForm(props) {

    const { setAlert } = props

    const [open, setOpen] = useState(false);

    const [name, setName] = useState(null);
    const [password, setPassword] = useState("password12345");
    const [email, setEmail] = useState(null);

    // whenever the backdrop is opened, the form should be reset
    useEffect (() => {
        if (open) {
            setName(null)
            setPassword('password12345')
            setEmail(null)
        }
    }, [open])

    function onHandleSubmit(e) {
        // e.stopPropagation()
        e.preventDefault()
        addMember(name, password, email)
        e.target.reset()
    }

    return (
    <>
    <Button title='Add Member' Logo = {IoMdPersonAdd } onClick={() => setOpen(true)}/>
    <Backdrop
        open={open}
        onClick={() => setOpen(false)}
        >
        <div
            className="bg-white p-10 rounded-lg shadow-lg w-full max-w-sm"
            onClick={(event) => event.stopPropagation()}>
            <h2 className="text-3xl
                        font-semibold
                        text-center
                        mb-6">
            Add Team Member
            </h2>

            <form className="flex flex-col" onSubmit={onHandleSubmit}>
            {/* Name Input */}
            <label className="text-left mb-1 text-sm">Name</label>
            <input
                type="text"
                id="name"
                className="mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            {/* Password Input */}
            <label htmlFor="password" className="text-left mb-1 text-sm">Password</label>
            <input
                type="text"
                id="password"
                defaultValue={password}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor"
                required
            />

            {/* Email Input */}
            <label htmlFor="email" className="text-left mb-1 text-sm">Email</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor"
                pattern=".*@.*"
                required
            />

            {/* Submit Button */}
            <button
                type="submit"
                className="bg-primaryColor text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-500 transition duration-200"
            >
                Add Member
            </button>
            </form>
        </div>
    </Backdrop>
    </>
)

    function addMember (name, password, email) {

        console.log(name,password,email)

        axios.post(`${BASE_URL}/api/members`, {
            memberName: name,
            password: password,
            email: email,
            access: "User"
        }).then((response) => {
            console.log(response)
            setOpen(false)
            setAlert('success')
        }).catch((error) => {
            console.log(error)
            setAlert('error')
        })

    }

}
