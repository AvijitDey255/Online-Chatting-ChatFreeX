


import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setMessages } from "../redux/messageSlice"

const useGetMessages = () => {

    const dispatch = useDispatch()

    const { selectedUser } = useSelector(state => state.user)

    useEffect(() => {

        if (!selectedUser?._id) return

        dispatch(setMessages([]))

        const fetchMessages = async () => {

            try {

                const result = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/message/get/${selectedUser._id}`,
                    {
                        withCredentials: true
                    }
                )

                dispatch(setMessages(result.data))

            } catch (error) {

                console.log("fetchMessages error")

            }

        }

        fetchMessages()

    }, [selectedUser])

}

export default useGetMessages