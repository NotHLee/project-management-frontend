import React, { useState } from 'react'
import { ImCross } from 'react-icons/im';
import { Backdrop } from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../../config';
import { LoginContext } from '../../pages/Login';

export default function Register(props) {

    const { setUpdate } = React.useContext(LoginContext);
    const {closeModal,change,existAdmin} = props;
    const [open, setOpen] = React.useState(true);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [questionOne, setQuestionOne] = React.useState(1);
    const [questionTwo, setQuestionTwo] = React.useState(1);
    const [questionThree, setQuestionThree] = React.useState(1);
    const [answerOne, setAnswerOne] = React.useState('');
    const [answerTwo, setAnswerTwo] = React.useState('');
    const [answerThree, setAnswerThree] = React.useState('');

    const addAdmin = (e) => {

        e.preventDefault();

        let q1 = security[questionOne-1].question;
        let q2 = security[questionTwo-1].question;
        let q3 = security[questionThree-1].question;

        axios.post(`${BASE_URL}/api/members`, {
            memberName: name,
            password: password,
            email: email,
            access: "Admin",
            securityQuestions: {
                [q1]: answerOne,
                [q2]: answerTwo,
                [q3]: answerThree,
            }})
        .then((response) => {
                console.log(response)

                setTimeout(() => {
                    setUpdate(prev => !prev)
                    setOpen(false);
                }, 1000);
            })
        .catch((error) => {
            console.log(error)
        })
    }


    const [security, setSecurity] = React.useState([
        { id: 1, question: 'What was the name of your first pet?' },
        { id: 2, question: 'What is your mother’s maiden name?' },
        { id: 3, question: 'What was the name of your elementary school?' },
        { id: 4, question: 'What is your favorite book?' },
        { id: 5, question: 'What is your favorite movie?' },
        { id: 6, question: 'What is your favorite food?' },
        { id: 7, question: 'What city were you born in?' },
        { id: 8, question: 'What is your favorite color?' }
    ]);


    const onHandleChange = (e,set) => {
        set(e.target.value);
        console.log(name, email, password,"wwdsad");
        console.log(answerOne,answerTwo,answerThree);
    }

    return (
        <>
        <Backdrop
        open={open}>
        <div className='bg-orange-300 w-4/12 rounded-lg h-3/4 overflow-auto'>
            <div className='bg-orange-200 rounded-lg p-2'>

                <h1 className='text-2xl font-bold text-center bg-orange-200 rounded p-1'>
                    Registration
                </h1>
            </div>
            <form className='flex flex-col p-3 rounded gap-2' onSubmit={(e) => addAdmin(e)}>

                <label className='font-semibold' htmlFor='name'>Name:</label>
                <input  className="rounded  p-1"type='text' id='name' name='name' required
                onChange={(e)=>{
                    onHandleChange(e,setName);
                }}/>


                <label className='font-semibold' htmlFor='email'>Email:</label>
                <input className="rounded p-1" type='email' id='email' name='email' required
                onChange={(e)=>{
                    onHandleChange(e,setEmail);
                }}/>


                <label  className='font-semibold' htmlFor='password'>Password:</label>

                <input className="rounded p-1" type='password' id='password' name='password' required
                onChange={(e)=>{
                    onHandleChange(e,setPassword);
                }}/>


                <label  className='font-semibold' htmlFor='security'>Security Question:</label>

                <p className='font-semibold'>Question 1:</p>
                <select className="rounded p-1" name='security' id='security1' required
                onChange={e=>{
                    onHandleChange(e,setQuestionOne);
                }}>
                    {security.map((question) => (
                        <option key={question.id} value={question.id} >{question.question}</option>
                    ))}
                </select>
                <input className="rounded p-1" type='text' id='answerOne' name='answerOne' required onChange={e =>{
                    onHandleChange(e,setAnswerOne);
                }}/>

                <p className='font-semibold'>Question 2:</p>
                <select className="rounded p-1" name='security' id='security2' required
                onChange={e=>{
                    onHandleChange(e,setQuestionTwo);
                }}>
                    {security.map((question) => (

                    <option key={question.id} value={question.id}>{question.question}</option>

                ))}
                </select>
                <input className="rounded p-1" type='text' id='answerTwo' name='answerTwo' required
                onChange={e => {
                    onHandleChange(e,setAnswerTwo);
                }}>
                </input>


                <p className='font-semibold'>Question 3:</p>
                <select className="rounded p-1" name='security' id='security3' required
                onChange={e=>{
                    onHandleChange(e,setQuestionThree);
                }}>
                    {security.map((question) => (
                        <option key={question.id} value={question.id}
                        >{question.question}</option>
                    ))}
                </select>
                <input className="rounded p-1" type='text' id='answerThree' name='answerThree' required
                onChange={e =>{
                    onHandleChange(e,setAnswerThree);
                }}/>

            {
            (questionOne !== questionTwo && questionOne !== questionThree && questionTwo !== questionThree) &&
                <button className='bg-red-400 font-semibold rounded p-2 mt-2 hover:bg-red-500 ease-in-out duration-500' type="submit"
                >
                    Create Account
                </button>
            }
            {
            (questionOne === questionTwo || questionOne === questionThree || questionTwo === questionThree) &&
                <div className='bg-red-500 border-2 border-dotted border-red-900 rounded p-2'>
                    <p className='text-black font-semibold text-center'>Please select different security questions</p>
                </div>
            }

            </form>
        </div>
        </Backdrop>
        </>
    )
}
