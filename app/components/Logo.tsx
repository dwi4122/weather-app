import {  ThermometerSunIcon } from 'lucide-react'
import React from 'react'

function Logo() {
    return (
        <a href="https://github.com/dwi4122/weather-app" className='flex items-center gap-2 '>
            <ThermometerSunIcon className='stroke h-11 w-11 stroke-amber-500 stroke-[1.5] hover:stroke-amber-600'/>
            <p className='bg-gradient-to-r from-amber-400 to-red-300 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent hover:stroke-amber-600'>
                oWeather
            </p>
        </a>
    )
}

export default Logo;
