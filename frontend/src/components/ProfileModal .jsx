import React, { useEffect, useRef, useState } from 'react'
import dp from '../assets/empty_dp.png'
import { IoCameraOutline } from "react-icons/io5"
import { IoClose } from "react-icons/io5"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setUserData } from '../redux/userSlice'

const ProfileModal = ({ open, onClose }) => {

  const { userData } = useSelector(state => state.user)

  const [name, setName] = useState("")
  const [frontendImage, setfrontendImage] = useState(dp)
  const [backendImage, setBackendImage] = useState(null)

  const imageRef = useRef()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (userData) {
      setName(userData.name || "")
      setfrontendImage(userData.image || dp)
    }
  }, [userData])

  const handleImage = (e) => {
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

      const result = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/user/profile`,
        formData,
        { withCredentials: true }
      )

      dispatch(setUserData(result.data))
      setLoading(false)
      onClose()

    } catch (error) {
      console.log("profile error")
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>

      <div className='bg-white w-[350px] rounded-2xl shadow-xl p-5 relative'>

        <button
          onClick={onClose}
          className=' text-gray-600 hover:text-black cursor-pointer w-5 h-5 mr-2'
        >
          <IoClose size={30} />
        </button>

        <div className='flex justify-center mb-4 relative'>
          <div className='w-28 h-28 rounded-full overflow-hidden border-4 border-[#20c7ff]'>
            <img src={frontendImage} className='w-full h-full object-cover' />
          </div>

          <button
            onClick={() => imageRef.current.click()}
            className='absolute bottom-0 right-[100px] bg-[#20c7ff] p-2 rounded-full text-white'
          >
            <IoCameraOutline size={18} />
          </button>
        </div>

        <input
          type="file"
          hidden
          ref={imageRef}
          onChange={handleImage}
          accept='image/*'
        />

        <form onSubmit={handleProfile} className='flex flex-col gap-3'>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border p-2 rounded-lg outline-none'
            placeholder='Full Name'
          />

          <input
            value={userData?.userName || ""}
            readOnly
            className='border p-2 rounded-lg bg-gray-100'
          />

          <input
            value={userData?.email || ""}
            readOnly
            className='border p-2 rounded-lg bg-gray-100'
          />

          <button
            className='bg-[#20c7ff] text-white p-2 rounded-lg'
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>

        </form>

      </div>
    </div>
  )
}

export default ProfileModal