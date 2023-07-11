import React from 'react'
import Login from './Login'
import MainHeading from '../MainHeading'

function LoginPage() {
    return (
        <div>
        <div class="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 bg-[#190C2E] h-[100vh] pt-10">
            <div class="grid grid-cols-2">
                <div className='flex items-center justify-center col-span-1'>
                    <MainHeading></MainHeading>
                </div>
                <div className='col-span-1'>
                    <Login></Login>
                </div>
            </div>
        </div>
    </div>
    )
}

export default LoginPage