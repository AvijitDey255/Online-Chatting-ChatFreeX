import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import dp from '../assets/empty_dp.png'
import { FiUser } from "react-icons/fi"
import { FaUserPlus} from 'react-icons/fa';
import { TbLogout2 } from "react-icons/tb";
import ProfileModal from './ProfileModal '
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { clearUserData, setSelectedUser } from '../redux/userSlice'
import useGetOtherUsers from '../customHooks/getOtherUsers';
import useGetCurrentUser from '../customHooks/getCurrentUser';

const SideBar = () => {
    useGetCurrentUser()
    useGetOtherUsers()
    const { userData, otherUsers } = useSelector(state => state.user)
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
     const dispatch = useDispatch()
     
    const handleLogout = async () => {

    try {

      await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/logout`,
        {
          withCredentials: true
        }
      )

      dispatch(clearUserData())

      navigate("/login")

    } catch (error) {

      console.log(error)

    }

  }

    return (
        <div className='w-full  lg:w-[30%] h-screen bg-gradient-to-b from-slate-100 to-slate-200 border-r border-slate-300 flex flex-col'>

            <div className='p-5 bg-[#20c7ff] text-white rounded-b-3xl shadow-lg'>
                <h1 className='text-2xl font-bold'>ChatFreeX</h1>
                <p className='text-sm opacity-90'>Connect instantly</p>
            </div>

            <div className=' p-5 bg-white m-4 rounded-2xl shadow-md hover:shadow-lg transition'>

                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-3'>
                        <div className='w-14 h-14 rounded-full overflow-hidden border-2 border-[#20c7ff]'>
                            <img
                                src={userData?.image || dp}
                                alt="profile"
                                className='w-full h-full object-cover'
                            />
                        </div>

                        <div>
                            <h2 className='font-semibold text-gray-800'>
                                {userData?.name || userData?.userName}
                            </h2>
                            <p className='text-sm font-semibold text-green-500'>Online</p>
                        </div>
                    </div>

                    <div className='flex gap-2'>

                    <button
                        onClick={() => setOpen(true)}
                        className='p-3 rounded-xl bg-[#20c7ff] text-white hover:scale-105 transition cursor-pointer'
                    >
                        <FiUser />
                    </button>
                    <button
                        onClick={handleLogout}
                        className='p-3 rounded-xl bg-red-500 text-white hover:scale-105 transition cursor-pointer'
                    >
                        <TbLogout2 />
                    </button>
                    </div>
                </div>

            </div>


           
            <div className='bg-white py-4 px-5 flex flex-col gap-3 mx-4 mb-4 rounded-2xl shadow-md hover:shadow-lg transition flex-1 overflow-y-auto users-scroll'>
                {otherUsers?.map((user) => (


                    <div key={user._id} onClick={()=> dispatch(setSelectedUser(user))} className='flex items-center justify-between bg-sky-100 py-2 px-3 rounded-2xl hover:bg-sky-200 cursor-pointer' >
                        <div className='flex items-center gap-3 '>

                            <div className='w-14 h-14 rounded-full overflow-hidden border-2 border-[#20c7ff]'>
                                <img
                                    src={user?.image || dp}
                                    alt="profile"
                                    className='w-full h-full object-cover'
                                />
                            </div>

                            <div>
                                <h2 className='font-semibold text-gray-800'>
                                    {user?.name || user?.userName}
                                </h2>
                                {false ? <p className='text-sm font-semibold text-green-500'>Online</p> : ""}
                            </div>
                        </div>
                        <button
                            onClick={() => setOpen(true)}
                            className='p-3 rounded-xl bg-[#20c7ff] text-white hover:scale-105 flex gap-1 items-center transition cursor-pointer'
                        >
                            <FaUserPlus/>
                            <span>Add</span>
                            
                        </button>
                    </div>


                ))}

            </div>



            <ProfileModal open={open} onClose={() => setOpen(false)} />

        </div >
    )
}

export default SideBar