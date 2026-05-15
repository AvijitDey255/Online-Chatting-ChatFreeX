// import http from 'http'
// import { Socket } from 'socket.io'
// import express from 'express'

// const app = express()
// const server = http.createServer(app)

// export default {app,server}



import http from 'http'
import express from 'express'
import { Server } from 'socket.io'

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: process.env.ORIGIN,
        credentials: true
    }
})
 const userSocketMap ={}
export const getReceiverSocketId = (receiver)=>{
    return userSocketMap[receiver]
}
io.on("connection", (socket) => {

    console.log("User Connected:", socket.id)
    

    const userId = socket.handshake.query.userId
    if(userId != undefined){
        userSocketMap[userId] = socket.id
        
    }

    io.emit("getOnlineUser",Object.keys(userSocketMap))

    socket.on("disconnect", () => {
        delete userSocketMap[userId]
        io.emit("getOnlineUser",Object.keys(userSocketMap))
        console.log("User Disconnected:", socket.id)

    })

})

export { app, server, io }