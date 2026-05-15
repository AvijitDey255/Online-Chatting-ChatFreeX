


import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useLocation } from "react-router-dom";

import { setUserData } from '../redux/userSlice'

import { HiOutlineMail } from "react-icons/hi"
import { RiLockPasswordLine } from "react-icons/ri"
import { FiEye, FiEyeOff } from "react-icons/fi"
import { IoChatbubbleEllipsesOutline } from "react-icons/io5"
import { AiOutlineSafety } from "react-icons/ai";
const SendOtp = () => {

    const navigate = useNavigate()
    const location = useLocation();
    const email = localStorage.getItem("verifyEmail")
    const [otp, setOtp] = useState("")


    const [loading, setLoading] = useState(false)
    const [error, seterror] = useState("")

    const handleOtp = async (e) => {

        e.preventDefault()

        setLoading(true)
        
        try {

            const server_url = import.meta.env.VITE_SERVER_URL



            const result = await axios.post(
                `${server_url}/api/auth/emailVarified`,
                {
                    email,
                    otp
                },
                {
                    withCredentials: true
                }
            )


            if (result.data.success) {
                setOtp("")
                seterror("")
                navigate("/")

            } else {

                navigate("/login")
            }



        } catch (error) {

            seterror(error?.response?.data?.message || "Otp Failed")

        } finally {

            setLoading(false)

        }

    }

    return (

        <div className='w-full  min-h-screen bg-gradient-to-br from-sky-100 via-slate-100 to-cyan-100 flex items-center justify-center p-4 overflow-hidden'>





            <div className='relative z-10 w-full max-w-[430px] bg-white/70 backdrop-blur-xl border border-white/40 rounded-[35px] shadow-2xl overflow-hidden'>


                <div className='bg-gradient-to-r from-[#20c7ff] to-cyan-400 px-8 py-10 flex flex-col items-center justify-center'>

                    <div className='w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg mb-5'>

                        <AiOutlineSafety className='text-5xl text-[#20c7ff]' />

                    </div>

                    <h1 className='text-3xl font-bold text-white'>
                        Email validation
                    </h1>

                    <p className='text-white/80 mt-2 text-sm'>
                        OTP in send into your email
                    </p>

                </div>


                <form
                    onSubmit={handleOtp}
                    className='px-7 py-8 flex flex-col gap-5'
                >


                    <div className='w-full h-[60px] bg-white rounded-2xl border border-slate-200 flex items-center px-4 shadow-sm focus-within:border-[#20c7ff] transition'>

                       
                        <input
                            type="tel"
                            maxLength={6}
                            placeholder='Enter your otp'
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className='w-full h-full bg-transparent outline-none px-3'
                        />

                    </div>





                    {
                        error && (

                            <div className='bg-red-100 text-red-500 text-sm px-4 py-3 rounded-xl text-center'>

                                {error}

                            </div>

                        )
                    }


                    <button
                        disabled={loading}
                        type='submit'
                        className='w-full h-[55px] rounded-2xl bg-gradient-to-r from-[#20c7ff] to-cyan-400 text-white font-bold text-lg shadow-lg hover:scale-[1.02] transition cursor-pointer disabled:opacity-70'
                    >

                        {
                            loading ? "Sending..." : "Send"
                        }

                    </button>




                </form>

            </div>

        </div>

    )

}

export default SendOtp