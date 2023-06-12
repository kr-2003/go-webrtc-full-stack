import React, { useContext, useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { MyContext } from '../../MyContext';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");
    const { user, setuser } = useContext(MyContext)
    const navigate = useNavigate();

    const passwordHandler = (e) => {
        setpassword(e.target.value)
    }
    const emailHandler = (e) => {
        setemail(e.target.value)
    }

    const loginHandler = () => {
        axios.post("http://localhost:8010/users/login", {
            email: email,
            Password: password,
        }).then(res => {
            Cookies.set('token', res.data.token, { expires: 7 });
            setuser(res.data)
            navigate("/dashboard")
        }).catch(err => {
            alert(err.response.data.error)
        })
    }
    return (

        <div class="relative py-3 sm:w-96 mx-auto text-center">
            <span class="text-2xl font-light ">Login to your account</span>
            <div class="mt-4 bg-white shadow-md rounded-lg text-left">
                <div class="h-2 bg-purple-400 rounded-t-md"></div>
                <div class="px-8 py-6 ">
                    <label class="block font-semibold"> Email </label>
                    <input onChange={emailHandler} type="text" placeholder="Email" class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                    <label class="block mt-3 font-semibold"> Password </label>
                    <input onChange={passwordHandler} type="Password" placeholder="Password" class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                    <div class="flex justify-between items-baseline">
                        <button onClick={loginHandler} type="submit" class="mt-4 bg-purple-500 text-white py-2 px-6 rounded-md hover:bg-purple-600 ">Login</button>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Login