
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setOtherUsers } from "../redux/userSlice"

const useGetOtherUsers = () => {

    const dispatch = useDispatch()

    useEffect(() => {

        const fetchUser = async () => {

            try {

                const result = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/user/others`,
                    {
                        withCredentials: true
                    }
                )

                dispatch(setOtherUsers(result.data))

            } catch (error) {

                console.log(error)

            }

        }

        fetchUser()

    }, [])

}

export default useGetOtherUsers