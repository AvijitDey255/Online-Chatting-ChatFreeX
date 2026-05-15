import React from 'react'
import dp from '../assets/empty_dp.png'
import { useRef } from 'react'
import { useEffect } from 'react'

const SenderMessages = ({dp_image,image,message}) => {
    const scroll = useRef()
    useEffect(()=>{
        scroll?.current.scrollIntoView({behavior:"smooth"})

    },[image,message])
    return (

        <div className='flex justify-end mb-4 px-4' ref={scroll}>

            <div className='flex items-end gap-2 max-w-[55%]'>

                
                <div className='bg-[#0ca4d6] text-white px-4 py-2 rounded-2xl rounded-br-md break-words shadow-md'>
                    {image && <img src={image} alt="" />}
                    
                    <p className='text-sm'>
                        {message}
                    </p>

                </div>

                <img
                    src={dp_image || dp}
                    alt="profile"
                    className='w-10 h-10 rounded-full object-cover'
                />

            </div>

        </div>

    )
}

export default SenderMessages