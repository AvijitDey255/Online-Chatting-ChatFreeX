import React from 'react'
import dp from '../assets/empty_dp.png'
import { useEffect } from 'react'
import { useRef } from 'react'

const ReceiverMessage = ({dp_image,image,message}) => {
    const scroll = useRef()
        useEffect(()=>{
            scroll?.current.scrollIntoView({behavior:"smooth"})
    
        },[image,message])
    return (

        <div className='flex justify-start mb-4 px-4' ref={scroll}>

            <div className='flex items-end gap-2 max-w-[55%]'>

                <img
                    src={dp_image || dp}
                    alt="profile"
                    className='w-10 h-10 rounded-full object-cover flex-shrink-0'
                />

                
                <div className='bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-bl-md shadow-md break-words'>
                    {image && <img src={image} alt="" />}
                    <p className='text-sm leading-6 whitespace-pre-wrap break-words'>

                        {message}
                        

                    </p>

                </div>

            </div>

        </div>

    )
}

export default ReceiverMessage