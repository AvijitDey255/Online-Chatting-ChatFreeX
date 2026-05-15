
import { Navigate, Route, Routes } from "react-router-dom"

import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import Home from "./pages/Home"

import { useDispatch, useSelector } from "react-redux"

import useGetCurrentUser from "./customHooks/getCurrentUser"
import useGetOtherUsers from "./customHooks/getOtherUsers"

import { useEffect, useRef } from "react"

import { io } from 'socket.io-client'

import { setOnlineUsers } from "./redux/userSlice"
import SendOtp from "./pages/SendOtp"

function App() {

  const dispatch = useDispatch()

  const socketRef = useRef(null)

  const { userData } = useSelector(state => state.user)

  useGetCurrentUser()

  useGetOtherUsers()




useEffect(() => {

  if (!userData?._id) return

  // prevent multiple socket connections
  if (window.socket) {
    window.socket.disconnect()
  }

  window.socket = io(import.meta.env.VITE_SERVER_URL, {
    query: {
      userId: userData._id
    },
    withCredentials: true
  })

  window.socket.on("connect", () => {
    console.log("Socket Connected:", window.socket.id)
  })

  window.socket.on("getOnlineUser", (users) => {
    dispatch(setOnlineUsers(users))
  })

  return () => {

    if (window.socket) {
      window.socket.disconnect()
    }

  }

}, [userData?._id])

  return (

    <Routes>

      <Route
        path="/login"
        element={!userData ? <LogIn /> : <Navigate to="/" />}
      />

      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to="/" />}
      />

      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/otp"
        element={!userData ? <SendOtp /> : <Navigate to="/" />}
      />

    </Routes>

  )

}

export default App