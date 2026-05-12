import React from 'react'
import dp from '../assets/empty_dp.png'

const SenderMessages = () => {
    return (

        <div className='flex justify-end mb-4 px-4'>

            <div className='flex items-end gap-2 max-w-[55%]'>

                
                <div className='bg-[#0ca4d6] text-white px-4 py-2 rounded-2xl rounded-br-md break-words shadow-md'>

                    <p className='text-sm'>
                        hcsdfvfvfvfvfvfvfvfvfssVcnbc s,mzc csj c cscscsvdgbcsc sn csc sh c s chsc sh
                        hcsdfvfvfvfvfvfvfvfvfssVcnbc s,mzc csj c cscscsvdgbcsc sn csc sh c s chsc sh
                        hcsdfvfvfvfvfvfvfvfvfssVcnbc s,mzc csj c cscscsvdgbcsc sn csc sh c s chsc sh
                    </p>

                </div>

                <img
                    src={dp}
                    alt="profile"
                    className='w-10 h-10 rounded-full object-cover'
                />

            </div>

        </div>

    )
}

export default SenderMessages