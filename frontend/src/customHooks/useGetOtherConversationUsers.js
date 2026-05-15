import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setOtherConversationUsers } from "../redux/userSlice"

const useGetOtherConversationUsers = () => {

    const dispatch = useDispatch()

    useEffect(() => {

        const fetchUsers = async () => {

            try {

                const result = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/user/conversation-users`,
                    {
                        withCredentials: true
                    }
                )

                console.log("otherConversationUsers result=> ",result)

                dispatch(setOtherConversationUsers(result.data))

            } catch (error) {

                console.log("fetchUsers error")

            }

        }

        fetchUsers()

    }, [])

}

export default useGetOtherConversationUsers