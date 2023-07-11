import React, { useContext } from 'react'
import axios from "axios";
import { MyContext } from '../MyContext';
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";


function Home() {
    const navigate = useNavigate()
    const { roomid, setroomid } = useContext(MyContext);
    const createRoom = () => {
        const room_id = uuidv4();
        console.log(room_id)
        setroomid(room_id)
        navigate(`/room/${room_id}`)
    }

    console.log(roomid)
    return (
        <>
            <div className='grid place-content-center grid-cols-2 max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 bg-[#190C2E] h-[100vh] pt-10'>
                <div>
                    <div>
                        <h1 class="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl lg:text-6xl dark:text-white">Video Chat Application</h1>
                        <p class="mt-3 text-lg text-gray-800 dark:text-gray-400">Introducing a new way for your brand to reach the creative community.</p>
                    </div>
                    <div className='grid grid-cols-3 w-100 mt-10'>
                        <div class="flex justify-between items-baseline">
                            <button onClick={createRoom} type="submit" class="bg-purple-500 text-white py-2 px-6 rounded-md hover:bg-purple-600 ">New Meeting</button>
                        </div>
                        <input type="Password" placeholder="Enter Room Link" class="border h-5 px-3 py-5 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />

                        <div class="flex justify-between items-baseline ml-2">
                            <button type="submit" class="bg-purple-500 text-white py-2 px-6 rounded-md hover:bg-purple-600 ">Join</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home