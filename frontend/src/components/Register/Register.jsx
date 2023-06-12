import React, { useState } from 'react'
import axios from 'axios';

function Register() {
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");

    const firstNameHandler = (e) => {
        setfirstName(e.target.value)
    }
    const lastNameHandler = (e) => {
        setlastName(e.target.value)
    }
    const passwordHandler = (e) => {
        setpassword(e.target.value)
    }
    const emailHandler = (e) => {
        setemail(e.target.value)
    }
    const phoneHandler = (e) => {
        setphone(e.target.value)
    }

    const registerHandler = () => {
        axios.post("http://localhost:8010/users/signup", {
            first_name: firstName,
            last_name: lastName,
            email: email,
            Password: password,
            phone: phone,
            user_type: "USER"
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div class="relative py-3 sm:w-96 mx-auto text-center">
            <span class="text-2xl font-light ">Login to your account</span>
            <div class="mt-4 bg-white shadow-md rounded-lg text-left">
                <div class="h-2 bg-purple-400 rounded-t-md"></div>
                <div class="px-8 py-6 ">
                    <label class="block font-semibold"> First Name </label>
                    <input onChange={firstNameHandler} type="text" placeholder="First Name" class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                    <label class="block mt-3 font-semibold"> Last Name </label>
                    <input onChange={lastNameHandler} type="text" placeholder="Last Name" class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                    <label class="block font-semibold"> Password </label>
                    <input onChange={passwordHandler} type="Password" placeholder="Password" class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                    <label class="block font-semibold"> Email </label>
                    <input onChange={emailHandler} type="text" placeholder="Email" class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                    <label class="block font-semibold"> Phone </label>
                    <input onChange={phoneHandler} type="text" placeholder="Phone" class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                    <div class="flex justify-between items-baseline">
                        <button onClick={registerHandler} class="mt-4 bg-purple-500 text-white py-2 px-6 rounded-md hover:bg-purple-600 ">Register</button>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Register