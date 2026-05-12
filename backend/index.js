import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import dns from 'dns'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import userRouter from './routes/user.route.js'
import messageRouter from './routes/message.route.js'
dns.setServers(['1.1.1.1','8.8.8.8'])
const app = express()
const port = process.env.PORT

app.use(cors({
    origin:process.env.ORIGIN,
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.get("/health",(req,res)=>{
    res.send("Server health is OKAY")
})
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/message",messageRouter)

app.listen(port,()=>{
    connectDB()
    console.log("server started")
})