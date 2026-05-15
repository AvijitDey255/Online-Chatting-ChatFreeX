import React, { useRef, useState } from 'react'
import dp from '../assets/empty_dp.png'
import { IoCameraOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { setUserData } from '../redux/userSlice';
import { useEffect } from 'react';
const Profile = () => {
  const navigate = useNavigate()
  const { userData } = useSelector(state => state.user)
  const [name, setName] = useState(userData?.name || "")
  const [frontendImage, setfrontendImage] = useState(userData?.image)
  const [backendImage, setBackendImage] = useState(null)
  const image = useRef()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  
useEffect(() => {

  if(userData){

    setName(userData.name || "")
    setfrontendImage(userData.image || dp)

  }

}, [userData])
  const handleImage = (e) => {
    e.preventDefault()
    const file = e.target.files[0]
    setBackendImage(file)
    setfrontendImage(URL.createObjectURL(file))
  }

  const handleProfile = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("name", name)
      if (backendImage) {
        formData.append("image", backendImage)
      }
      const result = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/user/profile`, formData, { withCredentials: true })
      dispatch(setUserData(result.data))
     
      setLoading(false)

    } catch (error) {
      console.log("handleProfile error")
      setLoading(false)

    }



  }


  return (
    <div className='w-full h-screen bg-slate-300 flex flex-col items-center justify-center relative'>
      <button
        onClick={() => navigate(-1)}
        className='absolute top-5 left-5 bg-white p-3 rounded-full shadow-lg hover:scale-110 transition cursor-pointer'
      >
        <IoArrowBack size={24} />
      </button>
      <div className='relative'>

        <div className='w-40 h-40 overflow-hidden rounded-full border-4 border-[#20c7ff] shadow-lg shadow-gray-400 bg-white flex items-center justify-center ' >
          <img
            src={frontendImage || userData?.image}
            alt="profile"
            className='w-full h-full object-cover'
          />
        </div>

        <button
          onClick={() => image.current.click()}
          type='button'
          className='absolute bottom-2 right-2 bg-[#20c7ff] p-2 rounded-full text-white shadow-md hover:scale-110 transition cursor-pointer'
        >
          <IoCameraOutline size={22} />
        </button>

      </div>

      <form className='mt-8 flex flex-col items-center justify-center gap-4 w-[300px]' onSubmit={handleProfile} >
        <input type="file" accept='image/*' hidden ref={image} onChange={handleImage} />
        <input
          type="text"
          placeholder='Enter Full Name'
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
          className='w-[90%] h-14 outline-none border-2 border-[#20c7ff] px-5 py-2.5 bg-white rounded-lg shadow-gray-400 shadow-lg text-gray-800'
        />

        <input
          type="text"
          value={userData?.userName || ""}
          readOnly
          className='w-[90%] h-14 outline-none border-2 border-[#20c7ff] px-5 py-2.5 bg-gray-100 rounded-lg shadow-gray-400 shadow-lg text-gray-500'
        />

        <input
          type="email"
          value={userData?.email || ""}
          readOnly
          className='w-[90%] h-14 outline-none border-2 border-[#20c7ff] px-5 py-2.5 bg-gray-100 rounded-lg shadow-gray-400 shadow-lg text-gray-500'
        />

        <button
          type='submit'
          className='bg-[#20c7ff] text-white px-6 py-3 rounded-lg hover:bg-[#0fb4ea] transition cursor-pointer shadow-lg'
        >
          {loading ? "saving..." : " Save Profile"}
        </button>

      </form>

    </div>
  )
}

export default Profile


