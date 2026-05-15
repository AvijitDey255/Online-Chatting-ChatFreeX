

import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setUserData } from "../redux/userSlice"

const useGetCurrentUser = () => {

    const dispatch = useDispatch()

    useEffect(() => {

        const fetchUser = async () => {

            try {

                const result = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/user/current`,
                    {
                        withCredentials: true
                    }
                )

                dispatch(setUserData(result.data))

            } catch (error) {

                console.log("fetchUser erroe")

            }

        }

        fetchUser()

    }, [])

}

export default useGetCurrentUser