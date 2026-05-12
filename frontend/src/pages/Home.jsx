import React from 'react'
import LogoutButton from '../components/LogoutButton'
import SideBar from '../components/SideBar'
import MessageArea from '../components/MessageArea'

const Home = () => {
  return (
    <div className='w-full h-screen flex'>
      <SideBar/>
      <MessageArea/>
    </div>
  )
}

export default Home
