
import React from 'react'
import SideBar from '../components/SideBar'
import MessageArea from '../components/MessageArea'
import { useSelector } from 'react-redux'

const Home = () => {

  const { selectedUser } = useSelector(state => state.user)

  return (

    <div className='w-full h-screen flex overflow-hidden'>

      <div
        className={`
          ${selectedUser ? "hidden" : "flex"}
          lg:flex
          lg:w-[30%]
          w-full
        `}
      >
        <SideBar />
      </div>

      <MessageArea />

    </div>

  )

}

export default Home