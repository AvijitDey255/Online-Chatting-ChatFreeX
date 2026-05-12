import { Navigate, Route, Routes } from "react-router-dom"
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import getCurrentUser from "./customHooks/getCurrentUser"
import { useSelector } from "react-redux"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import useGetOtherUsers from "./customHooks/getOtherUsers"
import useGetCurrentUser from "./customHooks/getCurrentUser"
import { useEffect } from "react"

function App() {
  
    useGetCurrentUser()
    useGetOtherUsers()
  


  const { userData } = useSelector(state => state.user)

  return (
    <Routes>
      <Route path="/login" element={!userData ? <LogIn /> : <Navigate to="/" />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={userData ? <Home /> : <Navigate to="/login" />} />
     
    </Routes>
  )
}

export default App
