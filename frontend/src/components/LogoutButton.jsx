import React from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { clearUserData } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'

const LogoutButton = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

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
    <button
      onClick={handleLogout}
      className='bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-red-600 transition cursor-pointer'
    >
      Logout
    </button>
  )
}

export default LogoutButton