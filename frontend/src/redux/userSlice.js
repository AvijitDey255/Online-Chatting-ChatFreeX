import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "user",

    initialState: {
        userData: null,
        otherUsers:null,
        selectedUser:null,
        socket:null,
        onlineUsers:null,
        otherConversationUsers:null
    },

    reducers: {

        setUserData: (state, action) => {
            state.userData = action.payload
        },

        setOtherUsers: (state, action) => {
            state.otherUsers = action.payload
        },
        setSocket: (state, action) => {
            state.socket = action.payload
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload
        },
        setOtherConversationUsers:(state, action) => {
            state.otherConversationUsers = action.payload
        },

        clearUserData: (state) => {
            state.userData = null,
            state.otherUsers = null

        }

    }
})

export const {
    setUserData,
    clearUserData,
    setOtherUsers,
    setSelectedUser,
    setOnlineUsers,
    setSocket,
    setOtherConversationUsers

} = userSlice.actions

export default userSlice.reducer