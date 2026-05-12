

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { HiOutlineMail } from "react-icons/hi"
import { RiLockPasswordLine } from "react-icons/ri"
import { FiEye, FiEyeOff, FiUser } from "react-icons/fi"
import { IoChatbubbleEllipsesOutline } from "react-icons/io5"

const Signup = () => {

  const navigate = useNavigate()

  const [show, setShow] = useState(false)

  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, seterror] = useState("")

  const handleSignUp = async (e) => {

    e.preventDefault()

    setLoading(true)

    try {

      const server_url = import.meta.env.VITE_SERVER_URL

      await axios.post(
        `${server_url}/api/auth/signup`,
        {
          userName,
          email,
          password
        },
        {
          withCredentials: true
        }
      )

      setUserName("")
      setEmail("")
      setPassword("")
      seterror("")

      navigate("/login")

    } catch (error) {

      seterror(error?.response?.data?.message || "Signup Failed")

    } finally {

      setLoading(false)

    }

  }

  return (

    <div className='w-full min-h-screen bg-gradient-to-br from-sky-100 via-slate-100 to-cyan-100 flex items-center justify-center p-4 overflow-hidden'>

      <div className='absolute w-[300px] h-[300px] bg-sky-300 rounded-full blur-[120px] top-[-50px] left-[-50px] opacity-40'></div>

      <div className='absolute w-[300px] h-[300px] bg-cyan-300 rounded-full blur-[120px] bottom-[-50px] right-[-50px] opacity-40'></div>

      <div className='relative z-10 w-full max-w-[430px] bg-white/70 backdrop-blur-xl border border-white/40 rounded-[35px] shadow-2xl overflow-hidden'>

        <div className='bg-gradient-to-r from-[#20c7ff] to-cyan-400 px-8 py-10 flex flex-col items-center justify-center'>

          <div className='w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg mb-5'>

            <IoChatbubbleEllipsesOutline className='text-5xl text-[#20c7ff]' />

          </div>

          <h1 className='text-3xl font-bold text-white'>
            Create Account
          </h1>

          <p className='text-white/80 mt-2 text-sm'>
            Join and start chatting instantly
          </p>

        </div>

        <form
          onSubmit={handleSignUp}
          className='px-7 py-8 flex flex-col gap-5'
        >

          <div className='w-full h-[60px] bg-white rounded-2xl border border-slate-200 flex items-center px-4 shadow-sm focus-within:border-[#20c7ff] transition'>

            <FiUser className='text-2xl text-[#20c7ff]' />

            <input
              type="text"
              placeholder='Enter username'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className='w-full h-full bg-transparent outline-none px-3 text-gray-700'
            />

          </div>

          <div className='w-full h-[60px] bg-white rounded-2xl border border-slate-200 flex items-center px-4 shadow-sm focus-within:border-[#20c7ff] transition'>

            <HiOutlineMail className='text-2xl text-[#20c7ff]' />

            <input
              type="email"
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full h-full bg-transparent outline-none px-3 text-gray-700'
            />

          </div>

          <div className='w-full h-[60px] bg-white rounded-2xl border border-slate-200 flex items-center px-4 shadow-sm focus-within:border-[#20c7ff] transition'>

            <RiLockPasswordLine className='text-2xl text-[#20c7ff]' />

            <input
              type={show ? "text" : "password"}
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full h-full bg-transparent outline-none px-3 text-gray-700'
            />

            <button
              type='button'
              onClick={() => setShow(!show)}
              className='text-xl text-gray-500 hover:text-[#20c7ff] transition cursor-pointer'
            >

              {
                show ? <FiEyeOff /> : <FiEye />
              }

            </button>

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
              loading ? "Creating Account..." : "Signup"
            }

          </button>

          <p className='text-center text-gray-600 mt-2'>

            Already have an account ?

            <span
              onClick={() => navigate("/login")}
              className='text-[#20c7ff] font-semibold ml-2 cursor-pointer hover:underline'
            >
              Login
            </span>

          </p>

        </form>

      </div>

    </div>

  )

}

export default Signup
