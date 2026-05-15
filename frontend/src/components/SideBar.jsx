
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import dp from '../assets/empty_dp.png'
import { FiUser, FiSearch } from "react-icons/fi"
import { FaUserPlus } from 'react-icons/fa';
import { TbLogout2 } from "react-icons/tb";
import ProfileModal from './ProfileModal '
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { clearUserData, setSelectedUser, setOtherConversationUsers } from '../redux/userSlice'
import useGetOtherUsers from '../customHooks/getOtherUsers';
import useGetCurrentUser from '../customHooks/getCurrentUser';
import useGetOtherConversationUsers from '../customHooks/useGetOtherConversationUsers';

const SideBar = () => {
    useGetCurrentUser()
    useGetOtherUsers()
    useGetOtherConversationUsers()

    const { userData, otherUsers, otherConversationUsers, selectedUser } = useSelector(state => state.user)

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)

    const [search, setSearch] = useState("")

    const [searchUsers, setSearchUsers] = useState([])
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

            console.log("handleLogout error")

        }

    }



    const handleSearch = async () => {

        try {

            if (!search) return

            setLoading(true)

            const result = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/user/search/${search}`,
                {
                    withCredentials: true
                }
            )

            setSearchUsers(result.data)

            setLoading(false)

        } catch (error) {

            console.log("handleSearch error")

            setLoading(false)

        }

    }

    const handleSearchKeyDown = async (e) => {

        if (e.key === "Enter") {

            handleSearch()

        }

    }




    useEffect(() => {

        if (!window.socket) return

        const handleSidebarUser = (newMessage) => {

            const senderId = newMessage.sender


            const alreadyExist = otherConversationUsers?.some(
                (user) => user._id === senderId
            )

            if (alreadyExist) return


            const senderUser = otherUsers.find(
                (user) => user._id === senderId
            )

            if (senderUser) {

                dispatch(
                    setOtherConversationUsers([
                        senderUser,
                        ...otherConversationUsers
                    ])
                )

            }

        }

        window.socket.on("newMessage", handleSidebarUser)

        return () => {

            window.socket.off("newMessage", handleSidebarUser)

        }

    }, [otherConversationUsers, otherUsers])

    return (
        <div className='w-full h-screen bg-gradient-to-b from-slate-100 to-slate-200 border-r border-slate-300 flex flex-col'>


            <div className='p-5 bg-[#20c7ff] text-white rounded-b-3xl shadow-lg flex items-center justify-between'>

                <div>
                    <h1 className='text-2xl font-bold'>ChatFreeX</h1>
                    <p className='text-sm opacity-90'>Connect instantly</p>
                </div>

                <button
                    onClick={() => setSearchOpen(true)}
                    className='bg-white text-[#20c7ff] p-3 rounded-xl cursor-pointer hover:scale-105 transition'
                >
                    <FiSearch size={20} />
                </button>

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


                {

                    otherConversationUsers?.length === 0 ? (

                        <div className='w-full h-full flex items-center justify-center text-gray-400 text-lg font-semibold'>
                            Search users to start chatting
                        </div>

                    ) : (
                        otherConversationUsers?.map((user) => (


                            <div key={user._id} onClick={() => dispatch(setSelectedUser(user))} className='flex items-center justify-between bg-sky-100 py-2 px-3 rounded-2xl hover:bg-sky-200 cursor-pointer' >
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

                            </div>


                        ))
                    )}

            </div>





            {
                searchOpen && (

                    <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>

                        <div className='w-[95%] max-w-md bg-white rounded-3xl p-5 shadow-2xl'>



                            <div className='flex justify-between items-center mb-5'>

                                <h1 className='text-2xl font-bold text-gray-700'>
                                    Search User
                                </h1>

                                <button
                                    onClick={() => {

                                        setSearchOpen(false)

                                        setSearch("")

                                        setSearchUsers([])

                                    }}
                                    className='text-2xl text-red-500 cursor-pointer'
                                >
                                    ×
                                </button>

                            </div>


                            <div className='flex gap-2 mb-5'>

                                <input
                                    type="text"
                                    placeholder='Search by username'
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={handleSearchKeyDown}
                                    className='flex-1 h-12 border-2 border-[#20c7ff] rounded-xl px-4 outline-none'
                                />

                                <button
                                    onClick={handleSearch}
                                    className='bg-[#20c7ff] text-white px-5 rounded-xl cursor-pointer'
                                >
                                    {
                                        loading ? "..." : "Search"
                                    }
                                </button>

                            </div>



                            <div className='flex flex-col gap-3 max-h-[400px] overflow-y-auto users-scroll'>

                                {
                                    searchUsers?.length > 0 ? (

                                        searchUsers.map((user) => (

                                            <div
                                                key={user._id}
                                                onClick={() => {

                                                    dispatch(setSelectedUser(user))

                                                    setSearchOpen(false)

                                                    setSearch("")

                                                    setSearchUsers([])

                                                }}
                                                className='flex items-center gap-3 bg-slate-100 hover:bg-slate-200 p-3 rounded-2xl cursor-pointer transition'
                                            >

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

                                                    <p className='text-sm text-gray-500'>
                                                        @{user?.userName}
                                                    </p>

                                                </div>

                                            </div>

                                        ))

                                    ) : (

                                        <div className='text-center text-gray-400 mt-5'>
                                            Search users by username
                                        </div>

                                    )
                                }

                            </div>

                        </div>

                    </div>

                )
            }

            <ProfileModal open={open} onClose={() => setOpen(false)} />

        </div >
    )
}

export default SideBar








