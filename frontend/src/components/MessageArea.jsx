

import React, { useRef, useState } from 'react'
import dp from '../assets/empty_dp.png'

import { IoMdArrowRoundBack } from "react-icons/io"
import { RiEmojiStickerLine } from "react-icons/ri"
import { FaRegImages } from "react-icons/fa6"

import { useSelector } from 'react-redux'
import EmojiPicker from 'emoji-picker-react'
import axios from 'axios'

import SenderMessages from './SenderMessage'
import ReceiverMessage from './ReceiverMessage'

const MessageArea = () => {

  const { selectedUser } = useSelector(state => state.user)
const [loading, setLoading] = useState(false)
  const [showPicker, setshowPicker] = useState(false)
  const [input, setInput] = useState("")
  const [frontendImage, setfrontendImage] = useState(null)
  const [backendImage, setBackendImage] = useState(null)

  const imageRef = useRef()

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
      console.log(result)
      setInput("")
      setBackendImage(null)
      setfrontendImage(null)
      setshowPicker(false)
      setLoading(false)

    } catch (error) {

      console.log(error)
      setLoading(false)

    }

  }

  return (

    <div className='lg:w-[70%] w-full h-screen bg-slate-300 lg:block relative overflow-hidden'>

      {

        selectedUser ? (

          <div className='w-full h-[650px] flex flex-col'>

            <div className='p-3 lg:p-5 bg-[#0ca4d6] text-white rounded-b-3xl shadow-lg z-20'>

              <div className='flex items-center gap-3'>

                <div className='mr-2 lg:hidden cursor-pointer text-2xl'>
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

              <SenderMessages />
              <ReceiverMessage />
              <SenderMessages />
              <ReceiverMessage />
              <SenderMessages />
              <SenderMessages />
              <ReceiverMessage />

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
                disabled={loading}
                type='submit'
                className='bg-[#0ca4d6] text-white lg:px-5 lg:py-2 px-3 py-2 rounded-xl hover:scale-105 transition cursor-pointer'
              >
                
                {loading ? "Sending...":"Send"}
              </button>

            </form>

          </div>

        )

      }

    </div>

  )

}

export default MessageArea