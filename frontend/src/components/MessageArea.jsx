

import React, { useRef, useState } from 'react'
import dp from '../assets/empty_dp.png'

import { IoMdArrowRoundBack } from "react-icons/io"
import { RiEmojiStickerLine } from "react-icons/ri"
import { FaRegImages } from "react-icons/fa6"

import { useDispatch, useSelector } from 'react-redux'
import EmojiPicker from 'emoji-picker-react'
import axios from 'axios'

import SenderMessages from './SenderMessage'
import ReceiverMessage from './ReceiverMessage'
import { setMessages } from '../redux/messageSlice'
import useGetMessages from '../customHooks/getMessages'
import { useEffect } from 'react'
import { setSelectedUser } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'
const MessageArea = () => {
  useGetMessages()
  const dispatch = useDispatch()
  

  const { selectedUser, userData, onlineUsers } = useSelector(state => state.user)
  const [loading, setLoading] = useState(false)
  const [showPicker, setshowPicker] = useState(false)
  const [input, setInput] = useState("")
  const [frontendImage, setfrontendImage] = useState(null)
  const [backendImage, setBackendImage] = useState(null)
  const { messages } = useSelector(state => state.message)
  const imageRef = useRef()
const navigate = useNavigate()
  const onEmojiClicks = (emojiData) => {

    setInput(prev => prev + emojiData.emoji)

  }

  const handelImage = (e) => {

    const file = e.target.files[0]

    if (!file) return

    setBackendImage(file)

    setfrontendImage(URL.createObjectURL(file))

  }

  const handleSendMessage = async () => {

    try {
      setLoading(true)

      if (!input && !backendImage) return

      const formData = new FormData()

      formData.append("message", input)

      if (backendImage) {

        formData.append("image", backendImage)

      }

      const result = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/message/send/${selectedUser._id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      )
      dispatch(setMessages([...messages, result.data]))
      setInput("")
      setBackendImage(null)
      setfrontendImage(null)
      setshowPicker(false)
      setLoading(false)

    } catch (error) {

      console.log("message error")
      setLoading(false)

    }

  }


  useEffect(() => {

    if (!window.socket) return

    const handleNewMessage = (newMessage) => {

      if (
        newMessage.sender === selectedUser?._id ||
        newMessage.receiver === selectedUser?._id
      ) {

        dispatch(setMessages([...messages, newMessage]))

      }

    }

    window.socket.on("newMessage", handleNewMessage)

    return () => {

      window.socket.off("newMessage", handleNewMessage)

    }

  }, [messages, selectedUser])


  return (

    

    <div
      className={`
    ${selectedUser ? "flex" : "hidden"}
    lg:flex
    flex-col
    
    w-full
    h-screen
    bg-slate-300
    relative
    overflow-hidden
  `}
    >

      {

        selectedUser ? (

          <div className='w-full h-[650px] flex flex-col'>

            <div className='p-3 lg:p-5 bg-[#0ca4d6] text-white rounded-b-3xl shadow-lg z-20'>

              <div className='flex items-center gap-3'>

               

                <div
                  onClick={() => {
                    dispatch(setSelectedUser(null))
                    navigate("/")
                  }}
                  className='mr-2 lg:hidden cursor-pointer text-2xl'
                >
                  <IoMdArrowRoundBack />
                </div>

                <div className='w-14 h-14 rounded-full overflow-hidden border-2 border-[#20c7ff]'>

                  <img
                    src={selectedUser?.image || dp}
                    alt="profile"
                    className='w-full h-full object-cover'
                  />

                </div>

                <div>

                  <h2 className='font-semibold text-white text-lg'>
                    {selectedUser?.name || selectedUser?.userName}
                  </h2>

                  <p className='text-sm font-semibold text-green-200'>
                    Online
                  </p>

                </div>

              </div>

            </div>

            <div className='flex-1  overflow-y-auto users-scroll p-4 pb-28'>


              {

                messages?.map((mess) => (
                  mess.sender == userData._id ? <SenderMessages key={mess._id} dp_image={userData?.image} image={mess.image} message={mess.message} /> : <ReceiverMessage key={mess._id} dp_image={selectedUser?.image} image={mess.image} message={mess.message} />
                ))
              }

            </div>

          </div>

        ) : (

          <div className='flex items-center justify-center w-full h-full flex-col'>

            <h1 className='text-5xl font-bold text-gray-700'>
              Welcome to Chat
            </h1>

            <p className='text-2xl font-semibold text-gray-500 mt-3'>
              Let's Chat with your Friends
            </p>

          </div>

        )

      }

      {

        selectedUser && (

          <div className='absolute bottom-0 left-0 w-full p-4'>

            {

              frontendImage && (

                <div className='absolute bottom-24 right-5 z-40'>

                  <img
                    src={frontendImage}
                    alt="preview"
                    className='w-32 h-32 object-cover rounded-2xl shadow-lg border-2 border-white'
                  />

                  <button
                    type='button'
                    onClick={() => {
                      setfrontendImage(null)
                      setBackendImage(null)
                    }}
                    className='absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full cursor-pointer'
                  >
                    ×
                  </button>

                </div>

              )

            }

            {

              showPicker && (

                <div className='absolute bottom-20 left-5 z-50'>

                  <EmojiPicker onEmojiClick={onEmojiClicks} />

                </div>

              )

            }

            <form
              className='w-full flex items-center lg:gap-4 gap-2 bg-white p-3 rounded-2xl shadow-lg'
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
            >

              <button
                type='button'
                onClick={() => setshowPicker(prev => !prev)}
                className='text-2xl text-gray-500 hover:text-[#0ca4d6] transition cursor-pointer'
              >

                <RiEmojiStickerLine />

              </button>

              <input
                type="file"
                hidden
                accept='image/*'
                ref={imageRef}
                onChange={handelImage}
              />

              <input
                type="text"
                placeholder='Type a message...'
                className='flex-1 outline-none bg-transparent text-gray-700'
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />

              <button
                type='button'
                onClick={() => imageRef.current.click()}
                className='text-2xl text-gray-500 hover:text-[#0ca4d6] transition cursor-pointer'
              >

                <FaRegImages />

              </button>

              <button
                disabled={loading || (!input.trim() && !backendImage)}
                type='submit'
                className={`text-white lg:px-5 lg:py-2 px-3 py-2 rounded-xl transition cursor-pointer
    ${(!input.trim() && !backendImage)
                    ? "bg-[#98a0a2] cursor-not-allowed"
                    : "bg-[#0ca4d6] hover:scale-105"
                  }`}
              >

                {loading ? "Sending..." : "Send"}

              </button>

            </form>

          </div>

        )

      }

    </div>

  )

}

export default MessageArea