import React from 'react'
import { Link } from 'react-router-dom'
import MainHeading from './MainHeading'

function Hero() {
    return (
        <div>
            <div class="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 bg-[#190C2E] h-[100vh] pt-10">
                <div class="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">
                    <MainHeading></MainHeading>
                    <div class="lg:col-span-4 mt-10 lg:mt-0">
                        <img class="w-full rounded-xl" src="https://images.unsplash.com/photo-1665686376173-ada7a0031a85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&h=700&q=80" alt="Image Description" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero