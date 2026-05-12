import React from 'react'
import dp from '../assets/empty_dp.png'

const ReceiverMessage = () => {
    return (

        <div className='flex justify-start mb-4 px-4'>

            <div className='flex items-end gap-2 max-w-[55%]'>

                <img
                    src={dp}
                    alt="profile"
                    className='w-10 h-10 rounded-full object-cover flex-shrink-0'
                />

                
                <div className='bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-bl-md shadow-md break-words'>

                    <p className='text-sm leading-6 whitespace-pre-wrap break-words'>

                        hcsdfvfvfvfvfvfvfvfvfssVcnbc s,mzc csj c cscscsvdgbcsc sn csc sh c s chsc sh
                        hcsdfvfvfvfvfvfvfvfvfssVcnbc s,mzc csj c cscscsvdgbcsc sn csc sh c s chsc sh
                        hcsdfvfvfvfvfvfvfvfvfssVcnbc s,mzc csj c cscscsvdgbcsc sn csc sh c s chsc 
                        

                    </p>

                </div>

            </div>

        </div>

    )
}

export default ReceiverMessage