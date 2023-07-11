import React from 'react'
import { Link } from 'react-router-dom'

function MainHeading() {
    return (
        <div class="lg:col-span-3">
            <h1 class="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl lg:text-6xl dark:text-white">Video Chat Application</h1>
            <p class="mt-3 text-lg text-gray-800 dark:text-gray-400">Introducing a new way for your brand to reach the creative community.</p>

            <div class="mt-5 lg:mt-8 flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
                {/* <div class="w-full sm:w-auto">
                                <label for="hero-input" class="sr-only">Search</label>
                                <input type="text" id="hero-input" name="hero-input" class="py-3 px-4 block w-full xl:min-w-[18rem] border-gray-200 shadow-sm rounded-md focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="Enter work email" />
                            </div> */}
                <Link to="/login" class="w-full sm:w-auto inline-flex justify-center items-center gap-x-3 text-center bg-[#AE3BCB] hover:bg-blue-700 border border-transparent text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800">
                    Login
                </Link>
                <Link to="/register" class="w-full sm:w-auto inline-flex justify-center items-center gap-x-3 text-center bg-[#AE3BCB] hover:bg-blue-700 border border-transparent text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800">
                    Register
                </Link>
            </div>
        </div>

    )
}

export default MainHeading