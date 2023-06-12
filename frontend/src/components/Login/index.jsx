import React from 'react'
import Login from './Login'
import MainHeading from '../MainHeading'

function LoginPage() {
    return (
        <div>
            <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 bg-[#190C2E] h-[100vh] pt-10">
                <div class="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">
                    <MainHeading></MainHeading>
                    <div className='lg:col-span-4'>
                        <Login></Login>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage